# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

Архитектура:
BASE:
Класс Api
Реализует базовые HTTP-запросы.
constructor(baseUrl: string, options: RequestInit = {})- принимает базовый URL
Свойства:
readonly baseUrl: string — базовый url для запросов к API.
protected options: RequestInit — параметры запроса для fetch к API, заданы по умолчанию, при передаче - включаются в options.
Методы:
protected handleResponse(response: Response) - обрабатывает ответы, если ok, то структурирует и возвращает JSON-ответ, если не ok, то выдает сообщение об ошибке;
get(uri: string), - формирование HTTP-запросов методом «GET»
post(uri: string, data: object, method: ApiPostMethods = «POST») — формирование HTTP-запросов к серверу одним из методов перечисленных в типе ApiPostMethods – «POST», «PUT», «DELETE».

Класс EventEmitter implements IEvents
Брокер событий необходим для реализации кастомных событий. Позволяет делать группировку компонентов внутри приложения, выстраивать иерархию из событийных пространств и гибко ими управлять.
Свойства:
events: Map — список событий.
Методы:
оn - добавляет события;
off — убирает события;
emit — вызывает событие;
onAll — подписывает на все события;
ofAll —сбрасывает все обработчики событий;
trigger — создает заданное событие с заданными аргументами.

Класс Component
Абстрактный класс компонентов представления (Наследуется всеми классами представления View). Предназначен для создания компонентов пользовательского интерфейса.
Свойства:
readonly корневой DOM-элемент: HTMLElement — корневой DOM-элемент
Конструктор:
constructor(container: HTMLElement) - принимает элемент контейнера, в который будет помещен компонент.
Методы:
toggleClass(element: HTMLElement, class: string), - Переключение класса;
setText(element: HTMLElement, value: string) — Установление текстового содержимого;
setDisabled(element: HTMLElement, state: boolean) — Изменение статуса блокировки;
protected setHidden(element: HTMLElement) — Скрытие элемента;
setVisible(element: HTMLElement) — Показ элемента;
setImage(element: HTMLElement, src: string, alt?: string) — Установить изображение с альтернативным текстом;
render(data?: any) — рендерит компонент, используя переданные данные.

Класс Model
Абстрактный класс для создания модельных данных.
Свойства:
protected readonly component: HTMLElement — корневой DOM-элемент
protected readonly component: HTMLElement — корневой DOM-элемент
Конструктор: (data:Partial<T>, events: IEvenets) принимает начальный данные для модели и объект событий для уведомления об изменениях в модели.
Методы:
emitChanges(event: string, payload?: object) запускает событие с переданным названием и данными, уведомляя подписчиков в изменении модели

  <h1>Архитектура</h1>

<h2>BASE: Класс Api</h2>
<p>Реализует базовые HTTP-запросы.</p>
<ul>
    <li><code>constructor(baseUrl: string, options: RequestInit = {})</code> - принимает базовый URL</li>
</ul>
<h3>Свойства:</h3>
<ul>
    <li><code>readonly baseUrl: string</code> — базовый url для запросов к API.</li>
    <li><code>protected options: RequestInit</code> — параметры запроса для fetch к API, заданы по умолчанию, при передаче - включаются в options.</li>
</ul>
<h3>Методы:</h3>
<ul>
    <li><code>protected handleResponse(response: Response)</code> - обрабатывает ответы, если ok, то структурирует и возвращает JSON-ответ, если не ok, то выдает сообщение об ошибке;</li>
    <li><code>get(uri: string)</code> - формирование HTTP-запросов методом «GET»</li>
    <li><code>post(uri: string, data: object, method: ApiPostMethods = «POST»)</code> — формирование HTTP-запросов к серверу одним из методов перечисленных в типе ApiPostMethods – «POST», «PUT», «DELETE».</li>
</ul>

<h2>Класс EventEmitter implements IEvents</h2>
<p>Брокер событий необходим для реализации кастомных событий. Позволяет делать группировку компонентов внутри приложения, выстраивать иерархию из событийных пространств и гибко ими управлять.</p>
<h3>Свойства:</h3>
<ul>
    <li><code>events: Map</code> — список событий.</li>
</ul>
<h3>Методы:</h3>
<ul>
    <li><code>оn</code> - добавляет события;</li>
    <li><code>off</code> — убирает события;</li>
    <li><code>emit</code> — вызывает событие;</li>
    <li><code>onAll</code> — подписывает на все события;</li>
    <li><code>ofAll</code> — сбрасывает все обработчики событий;</li>
    <li><code>trigger</code> — создает заданное событие с заданными аргументами.</li>
</ul>

<h2>Класс Component</h2>
<p>Абстрактный класс компонентов представления (Наследуется всеми классами представления View). Предназначен для создания компонентов пользовательского интерфейса.</p>
<h3>Свойства:</h3>
<ul>
    <li><code>readonly корневой DOM-элемент: HTMLElement</code> — корневой DOM-элемент</li>
</ul>
<h3>Конструктор:</h3>
<ul>
    <li><code>constructor(container: HTMLElement)</code> - принимает элемент контейнера, в который будет помещен компонент.</li>
</ul>
<h3>Методы:</h3>
<ul>
    <li><code>toggleClass(element: HTMLElement, class: string)</code> - Переключение класса;</li>
    <li><code>setText(element: HTMLElement, value: string)</code> — Установление текстового содержимого;</li>
    <li><code>setDisabled(element: HTMLElement, state: boolean)</code> — Изменение статуса блокировки;</li>
    <li><code>protected setHidden(element: HTMLElement)</code> — Скрытие элемента;</li>
    <li><code>setVisible(element: HTMLElement)</code> — Показ элемента;</li>
    <li><code>setImage(element: HTMLElement, src: string, alt?: string)</code> — Установить изображение с альтернативным текстом;</li>
    <li><code>render(data?: any)</code> — рендерит компонент, используя переданные данные.</li>
</ul>

<h2>Класс Model</h2>
<p>Абстрактный класс для создания модельных данных.</p>
<h3>Свойства:</h3>
<ul>
    <li><code>protected readonly component: HTMLElement</code> — корневой DOM-элемент</li>
    <li><code>protected readonly component: HTMLElement</code> — корневой DOM-элемент</li>
</ul>
<h3>Конструктор:</h3>
<ul>
    <li><code>(data:Partial<T>, events: IEvenets)</code> — принимает начальный данные для модели и объект событий для уведомления об изменениях в модели.</li>
</ul>
<h3>Методы:</h3>
<ul>
    <li><code>emitChanges(event: string, payload?: object)</code> — запускает событие с переданным названием и данными, уведомляя подписчиков в изменении модели</li>
</ul>
