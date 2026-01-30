export type Lang = "ru" | "en";

export const copy = {
  ru: {
    nav: {
      home: "Главная",
      movies: "Фильмы",
      add: "Добавить",
      about: "О проекте",
    },
    hero: {
      title: "RuFlix: короткое кино из России",
      subtitle:
        "Новый русский стриминг коротких фильмов с акцентом на авторские истории, фестивальные подборки и свежие таланты.",
      ctaPrimary: "Смотреть коллекцию",
      ctaSecondary: "Добавить фильм",
    },
    sections: {
      focusTitle: "Фокус на российском кино",
      focusText:
        "Собираем короткометражки из регионов, крупных студий и независимых мастерских.",
      nextGenTitle: "Новый визуальный язык",
      nextGenText:
        "Минимализм, световые поля и контрастная типографика с дневным и ночным режимом.",
      techTitle: "Поиск и пополнение базы",
      techText: "Поиск по названию, жанрам и описанию. Добавляйте новые фильмы.",
    },
    movies: {
      title: "Каталог коротких фильмов",
      searchPlaceholder: "Поиск по названию, жанрам или описанию",
      empty: "Пока нет фильмов. Добавьте первый!",
      searchButton: "Искать",
      resetButton: "Сбросить",
    },
    form: {
      title: "Добавить короткий фильм",
      titleRu: "Название (RU)",
      titleEn: "Название (EN)",
      descRu: "Описание (RU)",
      descEn: "Описание (EN)",
      year: "Год",
      duration: "Длительность (мин)",
      country: "Страна",
      tags: "Жанры/теги через запятую",
      image: "Постер (локальный файл)",
      submit: "Сохранить фильм",
      success: "Фильм добавлен.",
      error: "Не удалось сохранить. Проверьте данные.",
    },
    about: {
      title: "О RuFlix",
      text: "RuFlix — это витрина нового российского короткого кино. Мы собираем редкие истории, студенческие работы и фестивальные премьеры.",
    },
    misc: {
      duration: "мин",
      countryDefault: "Россия",
      noDesc: "Описание скоро появится.",
    },
  },
  en: {
    nav: {
      home: "Home",
      movies: "Movies",
      add: "Add",
      about: "About",
    },
    hero: {
      title: "RuFlix: short cinema from Russia",
      subtitle:
        "A next-gen Russian platform for shorts, focused on author films, festival picks, and new voices.",
      ctaPrimary: "Explore collection",
      ctaSecondary: "Add a film",
    },
    sections: {
      focusTitle: "Russian cinema focus",
      focusText:
        "Curated shorts from regions, studios, and independent workshops.",
      nextGenTitle: "New visual language",
      nextGenText:
        "Minimalism, light fields, and high-contrast type with day/night mode.",
      techTitle: "Search and grow the library",
      techText: "Search by title, tags, and description. Add new films easily.",
    },
    movies: {
      title: "Short film catalog",
      searchPlaceholder: "Search by title, tags, or description",
      empty: "No films yet. Add the first one!",
      searchButton: "Search",
      resetButton: "Reset",
    },
    form: {
      title: "Add a short film",
      titleRu: "Title (RU)",
      titleEn: "Title (EN)",
      descRu: "Description (RU)",
      descEn: "Description (EN)",
      year: "Year",
      duration: "Duration (min)",
      country: "Country",
      tags: "Tags/genres separated by commas",
      image: "Poster (local file)",
      submit: "Save film",
      success: "Film added.",
      error: "Save failed. Check the fields.",
    },
    about: {
      title: "About RuFlix",
      text: "RuFlix is a showcase for new Russian short cinema, from student works to festival premieres.",
    },
    misc: {
      duration: "min",
      countryDefault: "Russia",
      noDesc: "Description is coming soon.",
    },
  },
};
