const config = {
  // Словари для проверки орфографии
  dictionaryDefinitions: [
    { name: "project-words", path: "./project-words.txt" }
  ],
  dictionaries: ["project-words"],

  // Файлы для игнорирования при проверке орфографии
  ignorePaths: [
    "ai_readme.txt",
    ".gitignore",
    "node_modules/**",
    "dist/**",
    "build/**",
    ".next/**",
    "coverage/**",
    "*.min.js",
    "*.min.css"
  ],

  // Файлы для проверки
  files: [
    "**/*.{ts,tsx,js,jsx,md,mdx,txt,json,yaml,yml}"
  ],

  // Настройки проверки
  ignoreRegExpList: [
    // Игнорировать URL
    /https?:\/\/[^\s]*/g,
    // Игнорировать email адреса
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    // Игнорировать пути к файлам
    /[\/\\][a-zA-Z0-9._\/\\-]+\.(tsx?|jsx?|json|md|mdx)/g
  ],

  // Правила для определенных слов
  words: [
    // Добавьте специфичные для проекта слова здесь
  ],

  // Настройки отображения
  showStatus: true,
  showSuggestions: true
};

module.exports = config;