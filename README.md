## Проектная работа: "Mesto". Создана в рамках учебы в [Яндекс.Практикум](https://praktikum.yandex.ru/) на курсе ["Веб-разработчик плюс"](https://practicum.yandex.ru/web-plus/).

<h1 align="center"><a  href="" target="_blank"><img src="./gif/mesto_header.png" width="100%" alt="место фото"></a></h1>


## Краткое описание:

<p align="center"> "Mesto" - это интерактивная страница, где пользователи могут публиковать фотографии и лайкать их.</p>

### Функционал:

- Добавление и удаление фотографии
- "Лайк" для фотографии
- Редактирование профиля пользователя

### Технологии, использованные при создании\*\*

- Flexbox
- Grid Layout
- CSS - animation
- Методология BEM
- Файловая структура BEM Nested
- JavaScript (Asynchronous JS, DOM API, Fetch API)
- Валидация форм на стороне пользователя
- Webpack

  Проект сверстан по методологии BEM. При верстке приоритетно использована технология Grid Layout, местами используется flexbox. Все интерактивные элементы анимированы. Все контентные блоки, включая блок с карточками, контентонезависимы.

### Языки:

- JavaScript

### Внешние компоненты
Для работы с проектом вам понадобятся git, NodeJS
* [Как установить git.](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Как установить NodeJS.](https://nodejs.org/en/download/package-manager/)
* Инструкция по установке Webpack ниже:

### Локальная установка:
В командной строке перейдите в папку, где будет развернут проект. После чего скопируйте его с GitHub:
`$ git clone git@github.com:RoChernikov/mesto-project.git`

Далее переходим в папку с проектом и устанавливаем компоненты:
`$ npm install`

После этого нужно собрать проект:
`$ npm run build`

Далее можно запускать проект на локальном сервере:
`$ npm run dev`

### В конфигурационном файле package.json настроены два варианта запуска сборки проекта:
`$ npm run build` - для компиляции. Проект собирается локально, продукты сборки сохряняются в указанной директории.

`$ npm run dev` - для отладки. Помимо сборки, запускает на локальном сервере с автоматической <<горячей>> перезагрузкой при детектировании изменений в исходных кодах.

### Установка сборщика (Webpack)

`npm init` - *добаляет конфигурационный файл package.json по умолчанию*

`npm i webpack --save-dev` - *устанавливает  пакет webpack в проект, записывает его в зависимости для разработки*

`npm i webpack-cli --save-dev` - *устанавливает пакет интерфейса командной строки для webpack'а*

`npm i webpack-dev-server --save-dev` - *устанавливает пакет локального сервера*

### Установка транспилятора (Babel)

`npm i babel-loader --save-dev` - *устанавливает пакет транспилятора*

Дополнительные пакеты для работы с транспилятором:

`npm i @babel/cli --save-dev`

`npm i @babel/core --save-dev`

`npm i @babel/preset-env --save-dev`

`npm i core-js@3.4.1 --save`

`npm install --save babel-polyfill` - *устанавливает полифилы для транспилятора*

### Установка минификатора

`npm i mini-css-extract-plugin --save-dev` - *устанавливает пакет минификатора*

`npm i css-loader --save-dev` - *устанавливает пакет CSS-загрузчика*

### Установка "горячей" перезагрузки

`npm i webpack-md5-hash --save-dev` - *устанавливает пакет подсчёта хеша*

### Установка обработчика CSS-загрузчика

`npm i postcss-loader --save-dev` - *устанавливает пакет подключения плагина PostCSS к Webpack'у*

`npm i autoprefixer --save-dev` - *установщик вендорных префиксов*

`npm i cssnano --save-dev` - *минификатор CSS*

## Ссылки:

[Макет 1](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)

[Макет 2](https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1)

[Макет 3](https://www.figma.com/file/kRVLKwYG3d1HGLvh7JFWRT/JavaScript.-Sprint-6?node-id=0%3A1)

[Макет 4](https://www.figma.com/file/PSdQFRHoxXJFs2FH8IXViF/JavaScript-9-sprint?node-id=0%3A1)

- [Ссылка на GitHub Pages](http://rochernikov.github.io/mesto-project/)

- [По вопросам доработки сайта](https://t.me/ro_runner)

# Пример работы popup:
![alt gif](https://github.com/RoChernikov/mesto-project/blob/master/gif/mesto_presentation.gif)
