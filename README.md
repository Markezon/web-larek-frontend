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

<h1>Архитектура</h1>

<h2>BASE:</h2>
<h3>Класс Api</h3>
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

<h2>COMMON</h2>
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

<h2>Класс Modal</h2>
<p>Класс для отображения элемента модального окна, открытия, закрытия, управления его содержимым. Наследуется от Component&lt;IModalData&gt;.</p>
<ul>
<li><code>constructor(container: HTMLElement, events: IEvents)</code> - принимает элемент-контейнер для модального окна и объект для управления событиями.</li>
</ul>
<h3>Методы:</h3>
<ul>
<li><code>content</code> - Задает содержимое модального окна.</li>
<li><code>open</code> - Открывает модальное окно и вызывает событие его открытия.</li>
<li><code>close</code> - Закрывает модальное окно и вызывает событие его закрытия.</li>
<li><code>render</code> - Рендерит модальное окно с переданным содержимым и открывает его.</li>
</ul>

<h2>Класс Form</h2>
<p>Класс, предназначенный для формирования и управления формами. Обрабатывает события ввода и отправки, а также управляет состоянием валидности и отображением формы. Наследуется от Component&lt;IFormState&gt;.</p>
<ul>
<li><code>constructor(container: HTMLFormElement, events: IEvents)</code> - принимает контейнер формы и объект для управления событиями.</li>
</ul>
<h3>Методы:</h3>
<ul>
<li><code>InInputChange</code> - Обработчик событий ввода, который генерирует события изменения для каждого поля в форме.</li>
<li><code>set valid</code> - Контролирует активность кнопки отправки в зависимости от валидности формы.</li>
<li><code>set errors</code> - Устанавливает и отображает ошибки валидации формы.</li>
<li><code>render</code> - Отображает состояние формы, устанавливая ее валидность, обрабатывая ошибки и устанавливая значения полей.</li>
</ul>

<h2>КОМПОНЕНТЫ МОДЕЛЕЙ ДАННЫХ БИЗНЕС-ЛОГИКИ</h2>

<h3>Класс Product</h3>
<p>Наследуется от Model&lt;IProduct&gt;.</p>
<p>Этот класс создан для формирования и управления данными о продукте. Он предоставляет способ представления информации о продукте, который может быть применен для отображения или обработки в бизнес-логике.</p>
<p><code>constructor()</code> наследуется от Model</p>

<h4>Свойства :</h4>
<ul>
    <li><code>id (string)</code> : Уникальный идентификатор продукта;</li>
    <li><code>title (string)</code> : Название продукта;</li>
    <li><code>price (number | null)</code> : Цена продукта. Может быть не указана;</li>
    <li><code>description (string)</code> : Описание продукта;</li>
    <li><code>category (string)</code> : Категория продукта;</li>
    <li><code>image (string)</code> : Ссылка на изображение продукта.</li>
</ul>

<h4>Методы:</h4>
<p>Наследуется из Model.</p>

<h3>Класс AppState</h3>
<p>Наследуется от Model&lt;IAppState&gt;.</p>
<p>Класс, представляющий центральную модель для управления состоянием проекта, включая данные каталога продуктов, корзину, информацию о заказе и ошибки валидации форм.</p>
<p><code>constructor()</code> наследуется от Model</p>

<h4>Свойства :</h4>
<ul>
    <li><code>catalog: Product[]</code> : Массив товаров в каталоге;</li>
    <li><code>basket: Product[]</code> : Массив товаров в корзине;</li>
    <li><code>order: IOrder</code> : Объект данных о заказе;</li>
    <li><code>preview: string | null</code> : ID товара для предпросмотра;</li>
    <li><code>formErrors: FormErrors</code> : Объект с ошибками форм.</li>
</ul>

<h4>Методы:</h4>
<p>наследует методы из Model</p>
<ul>
    <li><code>clearBasket</code> - Очищает корзину и генерирует соответствующие события;</li>
    <li><code>clearOrder</code> - очищает данные заказа;</li>
    <li><code>setCatalog</code> - устанавливает каталог продуктов, преобразуя каждый элемент в экземпляр Product и инициализирует событие изменения каталога;</li>
    <li><code>setPreview</code> - устанавливает предпросомотр продукта и инициализирует событие об изменении предпросмотра;</li>
    <li><code>addToBasket</code> - добавляет товар в корзину;</li>
    <li><code>removeFromBasket</code> - удаляет товар из корзины;</li>
    <li><code>updateBasket</code> - Обновляет состояние корзины;</li>
    <li><code>setDeliveryField</code> - устанавливает значения в данные доставки, при успешной валидации инициализирует события готовности данных;</li>
    <li><code>setContactField</code> - устанавливает значения в данные контактов заказа, при успешной валидации инициализирует события готовности данных;</li>
    <li><code>ValidateDelivery</code> - проверяет значения данных доставки;</li>
    <li><code>ValidateContact</code> - проверяет значения данных контактов.</li>
</ul>
