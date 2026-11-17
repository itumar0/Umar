/* =========================================================
   AZALIA — логика сайта (корзина, цены, конструктор, WhatsApp)
   ========================================================= */
(function () {
  "use strict";

  const D = window.AZALIA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const NBSP = " ";
  const fmt = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP) + NBSP + "сом";
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k, def) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* приватный режим */ } }
  };

  /* ---------- Время Бишкека ---------- */
  function bishkekParts() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: D.timezone, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(new Date());
    const get = (t) => (parts.find((p) => p.type === t) || {}).value;
    return { weekday: get("weekday"), hour: parseInt(get("hour"), 10) % 24, minute: parseInt(get("minute"), 10) };
  }
  // ?friday=1 / ?friday=0 — принудительно включить/выключить акцию (для проверки)
  const forced = new URLSearchParams(location.search).get("friday");
  const FRIDAY = forced === "1" ? true : forced === "0" ? false : bishkekParts().weekday === "Fri";

  /* ---------- Заглушки картинок (если файла ещё нет) ---------- */
  function svgUri(svg) { return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg); }
  function foxSvg(kind) {
    const sleep = kind === "sleep";
    const eyes = sleep
      ? '<path d="M70 98q10 8 20 0M110 98q10 8 20 0" stroke="#5A3D2E" stroke-width="4" fill="none" stroke-linecap="round"/>'
      : '<circle cx="80" cy="96" r="10" fill="#5A3D2E"/><circle cx="120" cy="96" r="10" fill="#5A3D2E"/><circle cx="83" cy="92" r="3.5" fill="#FAEADC"/><circle cx="123" cy="92" r="3.5" fill="#FAEADC"/>';
    const extra = {
      hero: '<rect x="20" y="168" width="160" height="10" rx="5" fill="#8E6E58"/><path d="M128 150h26v14a8 8 0 0 1-8 8h-10a8 8 0 0 1-8-8z" fill="#FAEADC"/><path d="M154 154a6 6 0 0 1 0 10" stroke="#FAEADC" stroke-width="3" fill="none"/><path d="M42 168l26-18 4 18z" fill="#F2D9C3"/><path d="M42 168l26-18 4 6z" fill="#C8A48A"/>',
      tray: '<ellipse cx="100" cy="160" rx="70" ry="9" fill="#8E6E58"/><rect x="62" y="138" width="20" height="18" rx="4" fill="#FAEADC"/><path d="M110 156l22-16 4 16z" fill="#F2D9C3"/>',
      coffee: '<rect x="128" y="132" width="28" height="38" rx="6" fill="#FAEADC"/><rect x="128" y="146" width="28" height="10" fill="#A47864"/><rect x="124" y="126" width="36" height="8" rx="4" fill="#E0BFA2"/>',
      sleep: '<text x="150" y="58" font-family="Georgia,serif" font-size="22" fill="#8E6E58">z</text><text x="166" y="40" font-family="Georgia,serif" font-size="16" fill="#8E6E58">z</text>'
    }[kind] || "";
    return svgUri(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">' +
      '<path d="M150 170c40-10 44-70 14-86-10 30-30 40-40 60z" fill="#A07761"/><path d="M158 158c22-8 26-34 14-50-4 18-12 30-24 40z" fill="#FAEADC"/>' +
      '<ellipse cx="100" cy="150" rx="44" ry="34" fill="#A07761"/><ellipse cx="100" cy="156" rx="24" ry="22" fill="#FAEADC"/>' +
      '<path d="M54 44l34 34-40 14z" fill="#A07761"/><path d="M146 44l-34 34 40 14z" fill="#A07761"/>' +
      '<path d="M60 56l18 20-20 6z" fill="#5A3D2E"/><path d="M140 56l-18 20 20 6z" fill="#5A3D2E"/>' +
      '<ellipse cx="100" cy="98" rx="50" ry="40" fill="#A07761"/><path d="M62 108q38 36 76 0q-8 26-38 28q-30-2-38-28z" fill="#FAEADC"/>' +
      eyes + '<ellipse cx="100" cy="112" rx="6" ry="4.5" fill="#5A3D2E"/>' +
      '<path d="M78 130l22 8-22 8zM122 130l-22 8 22 8z" fill="#6C4E3E"/><circle cx="100" cy="138" r="5" fill="#5A3D2E"/>' +
      extra + "</svg>"
    );
  }
  function cakeSvg(label) {
    return svgUri(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#5A3D2E"/>' +
      '<ellipse cx="150" cy="214" rx="96" ry="14" fill="#6C4E3E"/>' +
      '<path d="M70 200V150l150-46v96z" fill="#F2D9C3"/><path d="M70 150l150-46 0 10-150 46z" fill="#E0BFA2"/>' +
      '<path d="M70 186l150-14v28H70z" fill="#A07761"/><path d="M70 150l150-46" stroke="#A47864" stroke-width="10" stroke-linecap="round"/>' +
      '<circle cx="180" cy="104" r="10" fill="#A47864"/>' +
      '<text x="150" y="262" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="#E0BFA2">' + esc(label || "") + "</text></svg>"
    );
  }
  function loadImg(img, src, fallback) {
    img.decoding = "async";
    img.addEventListener("load", () => img.classList.add("loaded"), { once: true });
    img.addEventListener("error", () => { img.src = fallback; }, { once: true });
    img.src = src || fallback;
  }

  /* ---------- Каталог ---------- */
  const catalog = {};
  const P = D.cheesecakePricing;
  D.breakfast.forEach((it) => (catalog[it.id] = { ...it, cat: "breakfast" }));
  D.cheesecakes.forEach((it) => (catalog[it.id] = { ...it, cat: "cheesecake", prefix: "Чизкейк", price: it.special ? P.special : P.regular }));
  const drinkGroups = { milkshakes: "Милкшейк", smoothies: "Смузи", cold: "", tea: "Чай", coffee: "" };
  Object.keys(drinkGroups).forEach((g) => {
    D[g].items.forEach((it) => {
      catalog[it.id] = { ...it, cat: g, prefix: drinkGroups[g], variants: it.variants || D[g].variants };
    });
  });
  const fullName = (it) => (it.prefix ? it.prefix + " " + it.name : it.name);

  /* ---------- Корзина: состояние ---------- */
  const CART_KEY = "azalia-cart-v1";
  const FORM_KEY = "azalia-form-v1";
  let cart = store.get(CART_KEY, []).filter((l) => catalog[l.id] && l.qty > 0);

  function lineKey(id, variant) { return id + (variant ? "|" + variant : ""); }
  function addToCart(id, variant) {
    const key = lineKey(id, variant);
    const line = cart.find((l) => l.key === key);
    if (line) line.qty += 1; else cart.push({ key, id, variant: variant || null, qty: 1 });
    saveCart();
  }
  function setQty(key, qty) {
    const line = cart.find((l) => l.key === key);
    if (!line) return;
    if (qty <= 0) cart = cart.filter((l) => l.key !== key); else line.qty = qty;
    saveCart();
  }
  function saveCart() { store.set(CART_KEY, cart); renderCart(); }

  /* ---------- Цены ---------- */
  function cakeUnit(item, totalPieces) {
    const base = item.special ? P.special : P.regular;
    const opts = [{ base, unit: base, tag: null }];
    if (FRIDAY) opts.push({ base, unit: item.special ? P.fridaySpecial : P.fridayRegular, tag: "Пятничная акция" });
    if (totalPieces >= P.bulkFrom && (!item.special || P.bulkAppliesToSpecial)) opts.push({ base, unit: P.bulkPrice, tag: "Цена от " + P.bulkFrom + " шт" });
    // применяется самая выгодная для гостя цена
    return opts.reduce((a, b) => (b.unit < a.unit ? b : a));
  }
  function computeCart() {
    const pieces = cart.reduce((s, l) => s + (catalog[l.id].cat === "cheesecake" ? l.qty : 0), 0);
    let total = 0, count = 0;
    const lines = cart.map((l) => {
      const it = catalog[l.id];
      let unit = it.price, base = it.price, tag = null, vLabel = null;
      if (it.cat === "cheesecake") ({ unit, base, tag } = cakeUnit(it, pieces));
      else if (it.variants) {
        const v = it.variants.find((x) => x.key === l.variant) || it.variants[0];
        unit = base = v.price; vLabel = v.short;
      }
      const sum = unit * l.qty;
      total += sum; count += l.qty;
      return { ...l, item: it, unit, base, tag, vLabel, sum };
    });
    return { lines, total, count, pieces };
  }

  /* ---------- Рендер: завтраки ---------- */
  function renderBreakfast() {
    const grid = $("#breakfastGrid");
    grid.innerHTML = D.breakfast.map((it) => `
      <article class="card card--wide reveal">
        <div class="card__media"><img data-src="${esc(it.img)}" data-fallback="${esc(it.name)}" alt="${esc(it.name)}" loading="lazy" width="400" height="400"></div>
        <div class="card__body">
          <h3 class="card__title">${esc(it.name)}</h3>
          <p class="card__desc">${esc(it.desc)}</p>
          <div class="card__foot">
            <div class="price"><span class="price__now">${fmt(it.price)}</span></div>
            <button class="add-btn" data-add="${it.id}">В корзину</button>
          </div>
        </div>
      </article>`).join("");

    const { hour } = bishkekParts();
    const chip = $("#breakfastChip");
    if (hour >= 8 && hour < 12) { chip.classList.add("chip--live"); chip.textContent = "Сейчас · с 8:00 до 12:00"; }
  }

  /* ---------- Рендер: чизкейки ---------- */
  function cakePriceHtml(it) {
    const base = it.special ? P.special : P.regular;
    if (FRIDAY) {
      const now = it.special ? P.fridaySpecial : P.fridayRegular;
      return `<span class="price__old">${fmt(base)}</span><span class="price__now price__now--promo">${fmt(now)}</span>`;
    }
    return `<span class="price__now">${fmt(base)}</span><span class="price__unit">/ шт</span>`;
  }
  function renderCakes() {
    $("#cakesGrid").innerHTML = D.cheesecakes.map((it) => `
      <article class="card reveal">
        <div class="card__media">
          <img data-src="${esc(it.img)}" data-fallback="${esc(it.name)}" alt="Чизкейк ${esc(it.name)}" loading="lazy" width="400" height="400">
          ${FRIDAY ? '<span class="card__badge">Акция</span>' : ""}
        </div>
        <div class="card__body">
          <h3 class="card__title">${esc(it.name)}</h3>
          <div class="card__foot">
            <div class="price">${cakePriceHtml(it)}</div>
            <button class="add-btn" data-add="${it.id}">В корзину</button>
          </div>
        </div>
      </article>`).join("");
  }

  /* ---------- Рендер: напитки ---------- */
  let teaVariant = store.get("azalia-tea", "mug");
  const coffeeVariant = {};

  function drinkPrice(it, variantKey) {
    if (!it.variants) return it.price;
    return (it.variants.find((v) => v.key === variantKey) || it.variants[0]).price;
  }
  function renderDrinks(group) {
    const box = $(`[data-list="${group}"]`);
    box.innerHTML = D[group].items.map((raw) => {
      const it = catalog[raw.id];
      const isTea = group === "tea";
      const vKey = isTea ? teaVariant : it.variants ? (coffeeVariant[it.id] || it.variants[0].key) : null;
      const seg = !isTea && it.variants ? `
        <div class="seg seg--sm" role="radiogroup" aria-label="Объём">
          ${it.variants.map((v) => `<label class="seg__opt"><input type="radio" name="v-${it.id}" value="${v.key}" data-variant-for="${it.id}" ${v.key === vKey ? "checked" : ""}><span>${esc(v.label)}</span></label>`).join("")}
        </div>` : "";
      return `
        <article class="drink reveal">
          <h3 class="drink__title">${esc(it.name)}${it.badge ? `<span class="badge-new">${esc(it.badge)}</span>` : ""}</h3>
          ${it.desc ? `<p class="drink__desc">${esc(it.desc)}</p>` : ""}
          ${seg}
          <div class="drink__row">
            <div class="price"><span class="price__now" data-price-for="${it.id}">${fmt(drinkPrice(it, vKey))}</span></div>
            <button class="add-btn" data-add="${it.id}" data-variant="${vKey || ""}">В корзину</button>
          </div>
        </article>`;
    }).join("");
  }
  function renderTeaToggle() {
    $("#teaToggle").innerHTML = D.tea.variants.map((v) => `
      <label class="seg__opt"><input type="radio" name="teaSize" value="${v.key}" ${v.key === teaVariant ? "checked" : ""}><span>${esc(v.label)} · ${fmt(v.price)}</span></label>`).join("");
    $("#teaToggle").addEventListener("change", (e) => {
      teaVariant = e.target.value;
      store.set("azalia-tea", teaVariant);
      $$('[data-list="tea"] [data-add]').forEach((b) => {
        b.dataset.variant = teaVariant;
        $(`[data-price-for="${b.dataset.add}"]`).textContent = fmt(drinkPrice(catalog[b.dataset.add], teaVariant));
      });
    });
  }
  document.addEventListener("change", (e) => {
    const id = e.target.dataset && e.target.dataset.variantFor;
    if (!id) return;
    coffeeVariant[id] = e.target.value;
    const btn = $(`[data-add="${id}"]`);
    btn.dataset.variant = e.target.value;
    $(`[data-price-for="${id}"]`).textContent = fmt(drinkPrice(catalog[id], e.target.value));
  });

  /* ---------- Добавление в корзину ---------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    const it = catalog[btn.dataset.add];
    addToCart(it.id, btn.dataset.variant || null);
    btn.classList.add("added");
    btn.textContent = "Добавлено ✓";
    clearTimeout(btn._t);
    btn._t = setTimeout(() => { btn.classList.remove("added"); btn.textContent = "В корзину"; }, 1200);
    const cb = $("#cartOpen");
    cb.classList.remove("bump"); void cb.offsetWidth; cb.classList.add("bump");
    toast(fullName(it) + " — в корзине");
  });

  let toastT;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 1600);
  }

  /* ---------- Рендер корзины ---------- */
  function renderCart() {
    const { lines, total, count, pieces } = computeCart();
    const countEl = $("#cartCount");
    countEl.hidden = count === 0; countEl.textContent = count;
    $("#cartBar").hidden = count === 0 || sheetOpen;
    $("#cartBarCount").textContent = count;
    $("#cartBarSum").textContent = fmt(total);

    if (!thanksMode) {
      $("#cartEmpty").hidden = count > 0;
      $("#cartFull").hidden = count === 0;
      $("#sheetFoot").hidden = count === 0;
      $("#cartThanks").hidden = true;
    }
    $("#cartTotal").textContent = fmt(total);

    $("#cartList").innerHTML = lines.map((l) => {
      const it = l.item;
      const thumb = it.img ? `<img data-src="${esc(it.img)}" data-fallback="" alt="">` : esc(it.name.charAt(0));
      const meta = [l.vLabel, l.unit !== l.base ? `<s>${fmt(l.base)}</s> ${fmt(l.unit)} / шт` : `${fmt(l.unit)} / шт`].filter(Boolean).join(" · ");
      return `
        <li class="cart-item">
          <div class="cart-item__thumb">${thumb}</div>
          <div>
            <p class="cart-item__name">${esc(fullName(it))}</p>
            <p class="cart-item__meta">${meta}</p>
            ${l.tag ? `<span class="cart-item__tag">${esc(l.tag)}</span>` : ""}
          </div>
          <div class="cart-item__side">
            <span class="cart-item__sum">${fmt(l.sum)}</span>
            <div class="qty">
              <button aria-label="Меньше" data-qty="${l.key}" data-d="-1">−</button>
              <span>${l.qty}</span>
              <button aria-label="Больше" data-qty="${l.key}" data-d="1">+</button>
            </div>
            <button class="cart-item__del" data-del="${l.key}">Удалить</button>
          </div>
        </li>`;
    }).join("");
    hydrateImages($("#cartList"));

    const note = $("#cartNote");
    if (pieces > 0) {
      note.hidden = false;
      if (FRIDAY) note.innerHTML = `Пятничная акция: чизкейки по <b>${fmt(P.fridayRegular)}</b>, Сан-Себастьян — <b>${fmt(P.fridaySpecial)}</b>. Скидка 8% по личной карте сегодня не действует.`;
      else if (pieces >= P.bulkFrom) note.innerHTML = `Применена цена от ${P.bulkFrom} кусочков — <b>${fmt(P.bulkPrice)}</b> за чизкейк.`;
      else { const n = P.bulkFrom - pieces; note.innerHTML = `Добавьте ещё <b>${n}</b> ${plural(n, "кусочек", "кусочка", "кусочков")} — и чизкейки будут по <b>${fmt(P.bulkPrice)}</b>.`; }
    } else note.hidden = true;
  }
  function plural(n, a, b, c) { const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? a : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? b : c; }

  $("#cartList").addEventListener("click", (e) => {
    const q = e.target.closest("[data-qty]");
    if (q) { const l = cart.find((x) => x.key === q.dataset.qty); if (l) setQty(l.key, l.qty + Number(q.dataset.d)); return; }
    const d = e.target.closest("[data-del]");
    if (d) setQty(d.dataset.del, 0);
  });

  /* ---------- Bottom sheet ---------- */
  let sheetOpen = false, thanksMode = false, lastFocus = null;
  function openSheet(thanks) {
    thanksMode = !!thanks;
    if (thanksMode) {
      $("#cartEmpty").hidden = true; $("#cartFull").hidden = true; $("#sheetFoot").hidden = true;
      $("#cartThanks").hidden = false;
    }
    sheetOpen = true; lastFocus = document.activeElement;
    renderCart();
    $("#sheet").classList.add("is-open");
    $("#sheet").setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    setTimeout(() => $(".sheet__head .icon-btn").focus({ preventScroll: true }), 50);
  }
  function closeSheet() {
    sheetOpen = false;
    $("#sheet").classList.remove("is-open");
    $("#sheet").setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (thanksMode) { thanksMode = false; }
    renderCart();
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  $("#cartOpen").addEventListener("click", () => openSheet());
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-open-cart]")) openSheet();
    const c = e.target.closest("[data-close]");
    if (c && sheetOpen) {
      closeSheet();
      if (c.dataset.goto) setTimeout(() => $(c.dataset.goto).scrollIntoView(), 50);
    }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && sheetOpen) closeSheet(); });

  // свайп вниз по ручке/шапке закрывает корзину
  (function swipe() {
    const panel = $(".sheet__panel");
    let y0 = null;
    $(".sheet__head").addEventListener("touchstart", (e) => { y0 = e.touches[0].clientY; }, { passive: true });
    $(".sheet__grip").addEventListener("touchstart", (e) => { y0 = e.touches[0].clientY; }, { passive: true });
    panel.addEventListener("touchmove", (e) => {
      if (y0 === null) return;
      const dy = Math.max(0, e.touches[0].clientY - y0);
      panel.style.transition = "none"; panel.style.transform = `translateY(${dy}px)`;
    }, { passive: true });
    panel.addEventListener("touchend", (e) => {
      if (y0 === null) return;
      const dy = e.changedTouches[0].clientY - y0;
      panel.style.transition = ""; panel.style.transform = "";
      y0 = null;
      if (dy > 90) closeSheet();
    });
  })();

  /* ---------- Форма заказа ---------- */
  const form = store.get(FORM_KEY, {});
  $("#oName").value = form.name || "";
  $("#oPhone").value = form.phone || "";
  $("#oAddress").value = form.address || "";
  $("#oTime").value = form.time || "";
  if (form.type === "delivery") $('input[name="oType"][value="delivery"]').checked = true;
  function syncType() { $("#oAddressField").hidden = $('input[name="oType"]:checked').value !== "delivery"; }
  syncType();
  $("#orderForm").addEventListener("input", () => {
    syncType();
    store.set(FORM_KEY, {
      name: $("#oName").value, phone: $("#oPhone").value, address: $("#oAddress").value,
      time: $("#oTime").value, type: $('input[name="oType"]:checked').value
    });
  });
  $("#orderForm").addEventListener("submit", (e) => { e.preventDefault(); sendOrder(); });
  $("#orderSend").addEventListener("click", sendOrder);

  function fieldInvalid(el, bad) { el.closest(".field").classList.toggle("invalid", bad); return bad; }
  function sendOrder() {
    const { lines, total } = computeCart();
    if (!lines.length) return;
    const name = $("#oName").value.trim();
    const phone = $("#oPhone").value.trim();
    const type = $('input[name="oType"]:checked').value;
    const address = $("#oAddress").value.trim();
    const time = $("#oTime").value.trim();
    let bad = false;
    bad = fieldInvalid($("#oName"), !name) || bad;
    bad = fieldInvalid($("#oPhone"), phone.replace(/\D/g, "").length < 9) || bad;
    if (type === "delivery") bad = fieldInvalid($("#oAddress"), !address) || bad;
    const err = $("#oError");
    if (bad) {
      err.hidden = false; err.textContent = "Пожалуйста, заполните имя, телефон" + (type === "delivery" ? " и адрес доставки." : ".");
      $("#orderForm .field.invalid input").focus();
      return;
    }
    err.hidden = true;

    const rows = lines.map((l) => {
      const nm = fullName(l.item) + (l.vLabel ? ` (${l.vLabel})` : "");
      let s = `• ${nm} × ${l.qty} — ${plain(l.sum)}`;
      if (l.tag) s += ` (${plain(l.unit)}/шт, ${l.tag})`;
      return s;
    });
    const recv = type === "delivery" ? `Доставка, адрес: ${address}` : "Самовывоз";
    const msg = [
      "Здравствуйте! Заказ с сайта AZALIA:",
      ...rows,
      `Итого: ${plain(total)}`,
      "",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Получение: ${recv}`,
      time ? `Время: ${time}` : null
    ].filter((x) => x !== null).join("\n");

    openWhatsApp(msg);
    cart = []; saveCart();
    openSheet(true);
  }
  const plain = (n) => fmt(n).replace(/ /g, " ");

  function waLink(text) { return `https://wa.me/${D.whatsapp}` + (text ? `?text=${encodeURIComponent(text)}` : ""); }
  function openWhatsApp(text) {
    const url = waLink(text);
    const w = window.open(url, "_blank", "noopener");
    if (!w) location.href = url;
  }

  /* ---------- Конструктор ---------- */
  const B = D.builder;
  function optHtml(name, list, type, checkedKey, showSub) {
    return list.map((o) => `
      <label class="opt ${type === "checkbox" ? "opt--check" : ""}">
        <input type="${type}" name="${name}" value="${o.key}" ${o.key === checkedKey ? "checked" : ""}>
        <span class="opt__box">
          <span class="opt__label">${esc(o.label)}</span>
          ${showSub && o.sub ? `<span class="opt__sub">${esc(o.sub)}</span>` : ""}
          <span class="opt__price" data-opt-price="${name}:${o.key}"></span>
        </span>
      </label>`).join("");
  }
  function renderBuilder() {
    $("#bSize").innerHTML = optHtml("size", B.sizes, "radio", B.sizes[0].key, true);
    $("#bBase").innerHTML = optHtml("base", B.bases, "radio", B.bases[0].key);
    $("#bFilling").innerHTML = optHtml("filling", B.fillings, "radio", B.fillings[0].key);
    $("#bTopping").innerHTML = optHtml("topping", B.toppings, "checkbox", null);
    const today = new Date();
    const iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    $("#bDate").min = iso;
    $("#builderForm").addEventListener("change", updateBuilder);
    $("#builderForm").addEventListener("input", updateBuilder);
    $("#builderForm").addEventListener("submit", submitBuilder);
    updateBuilder();
  }
  function builderState() {
    const f = $("#builderForm");
    const pick = (n, list) => list.find((o) => o.key === (f.querySelector(`input[name="${n}"]:checked`) || {}).value);
    const size = pick("size", B.sizes), base = pick("base", B.bases), filling = pick("filling", B.fillings);
    const tops = $$('input[name="topping"]:checked', f).map((i) => B.toppings.find((o) => o.key === i.value));
    const add = (base.price + filling.price + tops.reduce((s, t) => s + t.price, 0)) * size.mult;
    return { size, base, filling, tops, total: size.price + add };
  }
  function updateBuilder() {
    const s = builderState();
    $("#bTotal").textContent = fmt(s.total);
    // цены опций под выбранный размер
    $$("[data-opt-price]").forEach((el) => {
      const [n, k] = el.dataset.optPrice.split(":");
      if (n === "size") { el.textContent = fmt(B.sizes.find((o) => o.key === k).price); return; }
      const list = n === "base" ? B.bases : n === "filling" ? B.fillings : B.toppings;
      const p = list.find((o) => o.key === k).price * s.size.mult;
      el.textContent = p ? "+" + fmt(p) : "включено";
    });
    const isPiece = s.size.key === "piece";
    $("#bText").disabled = isPiece;
    $("#bTextField").classList.toggle("is-disabled", isPiece);
    $("#bText").placeholder = isPiece ? "Надпись — только для тортов" : "Например: С днём рождения, Аня!";
  }
  function submitBuilder(e) {
    e.preventDefault();
    const s = builderState();
    const date = $("#bDate").value, time = $("#bTime").value;
    const err = $("#bError");
    const badD = fieldInvalid($("#bDate"), !date);
    const badT = fieldInvalid($("#bTime"), !time);
    if (badD || badT) { err.hidden = false; err.textContent = "Укажите дату и время получения."; $(".builder .field.invalid input").focus(); return; }
    err.hidden = true;
    const text = $("#bText").disabled ? "" : $("#bText").value.trim();
    const comment = $("#bComment").value.trim();
    const [y, m, d] = date.split("-");
    const msg = [
      "Здравствуйте! Хочу заказать авторский чизкейк с сайта AZALIA:",
      `• Размер: ${s.size.label}`,
      `• Основа: ${s.base.label}`,
      `• Начинка: ${s.filling.label}`,
      `• Топпинг и декор: ${s.tops.length ? s.tops.map((t) => t.label).join(", ") : "без декора"}`,
      text ? `• Надпись: «${text}»` : null,
      `• Получение: ${d}.${m}.${y}, ${time}`,
      comment ? `• Комментарий: ${comment}` : null,
      `Итого: ${plain(s.total)}`
    ].filter((x) => x !== null).join("\n");
    openWhatsApp(msg);
    openSheet(true);
  }

  /* ---------- Контакты ---------- */
  function renderContacts() {
    $("#cAddress").textContent = D.address;
    $("#cHours").textContent = D.hours;
    const ph = $("#cPhone"); ph.textContent = D.phoneDisplay; ph.href = "tel:+" + D.whatsapp;
    const ig = $("#cInsta"); ig.textContent = "@" + D.instagram; ig.href = "https://instagram.com/" + D.instagram;
    $("#cWa").href = waLink("Здравствуйте! Пишу с сайта AZALIA.");
    $("#fabWa").href = waLink("Здравствуйте! Пишу с сайта AZALIA.");
    $("#map").href = D.map2gis;
  }

  /* ---------- Картинки, анимации, табы ---------- */
  function hydrateImages(root) {
    $$("img[data-src]", root).forEach((img) => {
      const src = img.dataset.src; img.removeAttribute("data-src");
      loadImg(img, src, cakeSvg(img.dataset.fallback || ""));
    });
  }
  function hydrateMascots() {
    $$("img[data-mascot]").forEach((img) => loadImg(img, D.mascot[img.dataset.mascot], foxSvg(img.dataset.mascot)));
  }
  function setupReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    // небольшая лесенка для карточек в одной сетке
    $$(".grid").forEach((g) => Array.from(g.children).forEach((c, i) => c.style.setProperty("--d", (i % 4) * 0.06 + "s")));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach((e) => io.observe(e));
  }
  function setupTabs() {
    const header = $(".header");
    const setH = () => document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
    setH(); window.addEventListener("resize", setH);
    const tabs = $$(".tab");
    const track = $("#tabs");
    const sections = tabs.map((t) => $(t.getAttribute("href")));
    let current = null;
    function activate(id) {
      if (current === id) return; current = id;
      tabs.forEach((t) => {
        const on = t.getAttribute("href") === "#" + id;
        t.classList.toggle("is-active", on);
        if (on) {
          t.setAttribute("aria-current", "true");
          track.scrollTo({ left: t.offsetLeft - 16, behavior: "smooth" });
        } else t.removeAttribute("aria-current");
      });
    }
    function onScroll() {
      const line = header.offsetHeight + window.innerHeight * 0.25;
      let found = null;
      sections.forEach((s) => { if (s && s.getBoundingClientRect().top <= line) found = s.id; });
      // «Как заказать» относится к контактам / кофе — не меняем таб
      if (found) activate(found); else { current = null; tabs.forEach((t) => t.classList.remove("is-active")); }
    }
    let raf;
    window.addEventListener("scroll", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(onScroll); }, { passive: true });
    onScroll();
  }

  /* ---------- Пятница ---------- */
  function setupFriday() {
    $("#fridayBannerWrap").hidden = !FRIDAY;
    $("#fridayFine").hidden = !FRIDAY;
    $("#bulkStrip").hidden = false;
  }

  /* ---------- Старт ---------- */
  setupFriday();
  renderBreakfast();
  renderCakes();
  Object.keys(drinkGroups).forEach(renderDrinks);
  renderTeaToggle();
  renderBuilder();
  renderContacts();
  hydrateMascots();
  hydrateImages(document);
  renderCart();
  setupReveal();
  setupTabs();

  // скрываем плашку корзины, пока виден итог конструктора
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((en) => document.body.classList.toggle("in-builder", en[0].isIntersecting))
      .observe($("#builderForm"));
  }
})();
