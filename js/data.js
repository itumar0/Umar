/* =========================================================
   AZALIA — все данные меню.
   Редактируйте этот файл, чтобы менять цены, названия и фото.
   Пометка  [ЗАМЕНИТЬ]  — значения-заготовки, уточните их.
   ========================================================= */

window.AZALIA = {
  /* --- Контакты --- */
  whatsapp: "996707739707",                 // номер для wa.me (только цифры)
  phoneDisplay: "+996 707 739 707",
  address: "г. Бишкек, ул. Примерная, 1",   // [ЗАМЕНИТЬ]
  hours: "Ежедневно 8:00 — 22:00",          // [ЗАМЕНИТЬ]
  instagram: "azalia.kg",                   // [ЗАМЕНИТЬ] без @
  mapQuery: "Бишкек",                       // [ЗАМЕНИТЬ] адрес/координаты для карты
  timezone: "Asia/Bishkek",

  /* --- Маскот (положите файлы в images/mascot/) --- */
  mascot: {
    hero: "images/mascot/fox-table.png",     // за столиком с капучино и чизкейком
    tray: "images/mascot/fox-tray.png",      // с подносом
    coffee: "images/mascot/fox-coffee.png",  // со стаканчиком кофе
    sleep: "images/mascot/fox-sleep.png"     // спящая
  },

  /* --- Правила цен на чизкейки --- */
  cheesecakePricing: {
    regular: 250,
    special: 300,            // Сан-Себастьян
    bulkFrom: 10,            // от скольких кусочков
    bulkPrice: 210,
    bulkAppliesToSpecial: false, // true — Сан-Себастьян тоже по 210 от 10 шт
    fridayRegular: 200,
    fridaySpecial: 275
  },

  /* --- Завтраки --- */
  breakfast: [
    { id: "b-joker", name: "Джокер", price: 430, img: "images/breakfast/joker.jpg",
      desc: "3 классических сырника с фисташковым и черносмородиновым кремом, с фисташковой посыпкой." },
    { id: "b-classic", name: "Классические сырники", price: 380, img: "images/breakfast/classic.jpg",
      desc: "3 сырника (можно с семенами чиа) со сметанным и клубничным соусом." }
  ],

  /* --- Чизкейки ---
     [ЗАМЕНИТЬ] названия и файлы — по загруженным фото, без изменений.
     special: true — цена Сан-Себастьяна (300 / 275 по пятницам). */
  cheesecakes: [
    { id: "c-sansebastian", name: "Сан-Себастьян", img: "images/cheesecakes/san-sebastian.jpg", special: true },
    { id: "c-lotus", name: "Lotus", img: "images/cheesecakes/lotus.jpg" },
    { id: "c-classic", name: "Классический", img: "images/cheesecakes/classic.jpg" },
    { id: "c-pistachio", name: "Фисташковый", img: "images/cheesecakes/pistachio.jpg" },
    { id: "c-chocolate", name: "Шоколадный", img: "images/cheesecakes/chocolate.jpg" },
    { id: "c-raspberry", name: "Малиновый", img: "images/cheesecakes/raspberry.jpg" },
    { id: "c-mango", name: "Манго-маракуйя", img: "images/cheesecakes/mango.jpg" },
    { id: "c-caramel", name: "Солёная карамель", img: "images/cheesecakes/caramel.jpg" }
  ],

  /* --- Напитки ---
     variants: варианты объёма с переключателем. */
  milkshakes: {
    note: "0,3 л",
    items: [
      { id: "m-choco", name: "Шоколадный", price: 300 },
      { id: "m-oreo", name: "Орео милкшейк", price: 300 },
      { id: "m-banana", name: "Банановый", price: 300 }
    ]
  },
  smoothies: {
    note: "0,3 л",
    items: [
      { id: "s-berry", name: "Ягодный", price: 280, desc: "малина, клубника, смородина" },
      { id: "s-choco", name: "Шоколадная зима", price: 280, desc: "банан, арахис, какао, мёд" },
      { id: "s-tropic", name: "Тропическая зима", price: 280, desc: "манговое пюре, кокосовое молоко, банан, ваниль" },
      { id: "s-pomegranate", name: "Гранатовый поцелуй", price: 280, desc: "гранат, малина, бананы, яблочный сок" }
    ]
  },
  cold: {
    note: "0,3 л",
    items: [
      { id: "d-mojito", name: "Мохито", price: 250 },
      { id: "d-coconut", name: "Кокосовый снег", price: 250, desc: "ананасовый сок, кокосовое молоко" },
      { id: "d-cherry", name: "Cherry night", price: 250 },
      { id: "d-blueberry", name: "Черничная метель", price: 250 }
    ]
  },
  tea: {
    note: "кружка 0,3 л / чайник 600 мл",
    variants: [
      { key: "mug", label: "Кружка 0,3 л", short: "кружка", price: 200 },
      { key: "pot", label: "Чайник 600 мл", short: "чайник", price: 300 }
    ],
    items: [
      { id: "t-berry", name: "Ягодный", desc: "малина, смородина, клубника, лимон, апельсин, ягодный сироп, мята" },
      { id: "t-buckthorn", name: "Облепиха", desc: "облепиха, мёд, зелёный чай, апельсин" },
      { id: "t-tashkent", name: "Ташкентский", desc: "чёрный и зелёный чай, лимон, мята, яблоко, корица, мохито-сироп, нават" },
      { id: "t-currant", name: "Смородина имбирь", desc: "смородина, имбирь, мёд, мята, чёрный чай, лимон" },
      { id: "t-fruit", name: "Фруктовый чай", badge: "Новинка", desc: "апельсин, лимон, яблоко, корица, ананас, сироп нават, чёрный чай" }
    ]
  },
  /* [ЗАМЕНИТЬ] список и цены кофе */
  coffee: {
    note: "",
    items: [
      { id: "k-espresso", name: "Эспрессо", price: 120 },
      { id: "k-americano", name: "Американо", variants: [{ key: "s", label: "0,25 л", short: "0,25", price: 150 }, { key: "l", label: "0,35 л", short: "0,35", price: 180 }] },
      { id: "k-cappuccino", name: "Капучино", variants: [{ key: "s", label: "0,25 л", short: "0,25", price: 180 }, { key: "l", label: "0,35 л", short: "0,35", price: 220 }] },
      { id: "k-latte", name: "Латте", variants: [{ key: "s", label: "0,25 л", short: "0,25", price: 190 }, { key: "l", label: "0,35 л", short: "0,35", price: 230 }] },
      { id: "k-flatwhite", name: "Флэт уайт", price: 220 },
      { id: "k-raf", name: "Раф", desc: "ванильный, карамельный, лавандовый", variants: [{ key: "s", label: "0,25 л", short: "0,25", price: 230 }, { key: "l", label: "0,35 л", short: "0,35", price: 270 }] },
      { id: "k-mocha", name: "Мокко", price: 240 },
      { id: "k-cocoa", name: "Какао", price: 180 }
    ]
  },

  /* --- Конструктор авторского чизкейка ---
     [ЗАМЕНИТЬ] цены и списки.
     Доплаты за основу/начинку/декор умножаются на коэффициент размера (mult). */
  builder: {
    sizes: [
      { key: "piece", label: "Кусочек", sub: "≈150 г", price: 290, mult: 1 },
      { key: "1kg", label: "Торт 1 кг", sub: "6–8 порций", price: 2200, mult: 6 },
      { key: "2kg", label: "Торт 2 кг", sub: "12–16 порций", price: 4200, mult: 11 }
    ],
    bases: [
      { key: "classic", label: "Классическая песочная", price: 0 },
      { key: "choco", label: "Шоколадная", price: 20 }
    ],
    fillings: [
      { key: "vanilla", label: "Сливочно-ванильная", price: 0 },
      { key: "strawberry", label: "Клубника", price: 30 },
      { key: "raspberry", label: "Малина", price: 30 },
      { key: "currant", label: "Чёрная смородина", price: 30 },
      { key: "caramel", label: "Солёная карамель", price: 30 },
      { key: "pistachio", label: "Фисташка", price: 50 },
      { key: "lotus", label: "Lotus", price: 40 },
      { key: "mango", label: "Манго-маракуйя", price: 40 }
    ],
    toppings: [
      { key: "berries", label: "Свежие ягоды", price: 40 },
      { key: "ganache", label: "Шоколадный ганаш", price: 30 },
      { key: "caramel", label: "Карамельный соус", price: 20 },
      { key: "pistachio", label: "Фисташковая крошка", price: 40 },
      { key: "lotus", label: "Печенье Lotus", price: 30 },
      { key: "macarons", label: "Макаруны", price: 50 },
      { key: "flowers", label: "Съедобные цветы", price: 50 },
      { key: "gold", label: "Золотая поталь", price: 60 }
    ]
  }
};
