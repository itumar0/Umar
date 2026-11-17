/* =========================================================
   AZALIA — все данные меню.
   Редактируйте этот файл, чтобы менять цены, названия и фото.
   Пометка  [ЗАМЕНИТЬ]  — значения-заготовки, уточните их.
   ========================================================= */

window.AZALIA = {
  /* --- Контакты --- */
  whatsapp: "996707739707",                 // номер для wa.me (только цифры)
  phoneDisplay: "+996 707 739 707",
  address: "г. Бишкек, ул. Токтогула, 241",
  hours: "Ежедневно 8:00 — 22:00",
  instagram: "azalia.cheesecake",           // без @
  map2gis: "https://2gis.kg/bishkek/geo/70000001109779369", // карточка «Азалия» в 2ГИС
  timezone: "Asia/Bishkek",

  /* --- Маскот (images/mascot/) ---
     Сейчас: лисичка спереди и в 3/4 из листа персонажа.
     Когда появятся сцены (за столиком, с подносом, со стаканчиком, спящая) —
     положите файлы и замените пути. */
  mascot: {
    hero: "images/mascot/fox-front.png",    // главный экран
    tray: "images/mascot/fox-34.png",       // блок «Как заказать»
    coffee: "images/mascot/fox-front.png",  // у кнопки WhatsApp
    sleep: "images/mascot/fox-34.png"       // пустая корзина, «спасибо», пятничный баннер
  },

  /* --- Правила цен на чизкейки --- */
  cheesecakePricing: {
    regular: 250,
    special: 300,            // Сан-Себастьян
    bulkFrom: 10,            // от скольких кусочков
    bulkPrice: 210,
    bulkAppliesToSpecial: true,  // false — Сан-Себастьян не участвует в цене от 10 шт
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
     Названия и фото — по присланным файлам.
     special: true — цена Сан-Себастьяна (300 / 275 по пятницам). */
  cheesecakes: [
    { id: "c-mango-fistashka", name: "Манго фисташка", img: "images/cheesecakes/mango-fistashka.jpg" },
    { id: "c-klubnika-kokos", name: "Клубника кокос", img: "images/cheesecakes/klubnika-kokos.jpg" },
    { id: "c-milka", name: "Милка", img: "images/cheesecakes/milka.jpg" },
    { id: "c-yagodnyj", name: "Ягодный", img: "images/cheesecakes/yagodnyj.jpg" },
    { id: "c-limonnyj", name: "Лимонный", img: "images/cheesecakes/limonnyj.jpg" },
    { id: "c-kinder", name: "Киндер", img: "images/cheesecakes/kinder.jpg" },
    { id: "c-kinder-country", name: "Киндер country", img: "images/cheesecakes/kinder-country.jpg" },
    { id: "c-krem-bryule", name: "Крем брюле", img: "images/cheesecakes/krem-bryule.jpg" },
    { id: "c-malina-mindal", name: "Малина миндаль", img: "images/cheesecakes/malina-mindal.jpg" },
    { id: "c-shokolad-malina", name: "Шоколад малина", img: "images/cheesecakes/shokolad-malina.jpg" },
    { id: "c-bananovyj-puding", name: "Банановый пудинг", img: "images/cheesecakes/bananovyj-puding.jpg" },
    { id: "c-klubnika-ulun", name: "Клубника улун", img: "images/cheesecakes/klubnika-ulun.jpg" },
    { id: "c-yablochnyj", name: "Яблочный", img: "images/cheesecakes/yablochnyj.jpg" },
    { id: "c-oblepiha-sgushchenka", name: "Облепиха сгущёнка", img: "images/cheesecakes/oblepiha-sgushchenka.jpg" },
    { id: "c-matcha-shokolad", name: "Матча шоколад", img: "images/cheesecakes/matcha-shokolad.jpg" },
    { id: "c-san-sebastyan", name: "Сан-Себастьян", img: "images/cheesecakes/san-sebastyan.jpg", special: true },
    { id: "c-tviks", name: "Твикс", img: "images/cheesecakes/tviks.jpg" },
    { id: "c-medovik", name: "Медовик", img: "images/cheesecakes/medovik.jpg" },
    { id: "c-rafaello", name: "Рафаэлло", img: "images/cheesecakes/rafaello.jpg" },
    { id: "c-ferrero-rocher", name: "Ферреро Рошер", img: "images/cheesecakes/ferrero-rocher.jpg" },
    { id: "c-lotus", name: "Лотус", img: "images/cheesecakes/lotus.jpg" },
    { id: "c-snikers", name: "Сникерс", img: "images/cheesecakes/snikers.jpg" },
    { id: "c-oreo", name: "Орео", img: "images/cheesecakes/oreo.jpg" },
    { id: "c-mango-mohito", name: "Манго мохито", img: "images/cheesecakes/mango-mohito.jpg" },
    { id: "c-fistashka-malina", name: "Фисташка малина", img: "images/cheesecakes/fistashka-malina.jpg" },
    { id: "c-baunti", name: "Баунти", img: "images/cheesecakes/baunti.jpg" },
    { id: "c-dubajskij", name: "Дубайский", img: "images/cheesecakes/dubajskij.jpg" },
    { id: "c-babl-gam", name: "Бабл гам", img: "images/cheesecakes/babl-gam.jpg" },
    { id: "c-brauni", name: "Брауни", img: "images/cheesecakes/brauni.jpg" },
    { id: "c-tri-shokolada", name: "Три шоколада", img: "images/cheesecakes/tri-shokolada.jpg" },
    { id: "c-rafael-malina", name: "Рафаэль малина", img: "images/cheesecakes/rafael-malina.jpg" },
    { id: "c-mango-marakujya", name: "Манго маракуйя", img: "images/cheesecakes/mango-marakujya.jpg" },
    { id: "c-banoffi-paj", name: "Баноффи пай", img: "images/cheesecakes/banoffi-paj.jpg" },
    { id: "c-mars", name: "Марс", img: "images/cheesecakes/mars.jpg" },
    { id: "c-mango-shokolad", name: "Манго шоколад", img: "images/cheesecakes/mango-shokolad.jpg" },
    { id: "c-tary-talkan", name: "Тары талкан", img: "images/cheesecakes/tary-talkan.jpg" },
    { id: "c-chernichnyj", name: "Черничный", img: "images/cheesecakes/chernichnyj.jpg" }
  ],

  /* --- Напитки ---
     variants: варианты объёма с переключателем. */
  milkshakes: {
    note: "0,3 л",
    items: [
      { id: "m-choco", img: "images/drinks/m-choco.jpg", name: "Шоколадный", price: 300 },
      { id: "m-oreo", img: "images/drinks/m-oreo.jpg", name: "Орео милкшейк", price: 300 },
      { id: "m-banana", img: "images/drinks/m-banana.jpg", name: "Банановый", price: 300 }
    ]
  },
  smoothies: {
    note: "0,3 л",
    items: [
      { id: "s-berry", img: "images/drinks/s-berry.jpg", name: "Ягодный", price: 280, desc: "малина, клубника, смородина" },
      { id: "s-choco", img: "images/drinks/s-choco.jpg", name: "Шоколадная зима", price: 280, desc: "банан, арахис, какао, мёд" },
      { id: "s-tropic", img: "images/drinks/s-tropic.jpg", name: "Тропическая зима", price: 280, desc: "манговое пюре, кокосовое молоко, банан, ваниль" },
      { id: "s-pomegranate", img: "images/drinks/s-pomegranate.jpg", name: "Гранатовый поцелуй", price: 280, desc: "гранат, малина, бананы, яблочный сок" }
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
