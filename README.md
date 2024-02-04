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

  <h2>LarekAPI</h2>
  <p>LarekAPI расширяет базовый класс Api, предоставляя специфические методы для работы с API магазина. Он обеспечивает функциональность для получения списка продуктов, детальной информации о продуктах и оформления заказов.</p>
  <h3>Свойства:</h3>
  <ul>
    <li>cdn(string): Базовый URL для загрузки изображений продуктов.</li>
  </ul>
  <p>Конструктор</p>
  <p>constructor(cdn: string, baseUrl: string, options?: RequestInit) - Устанавливает базовый URL для API и CDN для изображений.</p>
  <h3>Методы:</h3>
  <ul>
    <li>getProductList(): Promise&lt;IProduct[]&gt;: Получение списка всех продуктов с сервера.</li>
    <li>getProductItem(id: string): Promise&lt;IProduct&gt;: Получение детальной информации о продукте по его ID.</li>
    <li>orderProducts(order: IOrder): Promise&lt;IOrderResult&gt;: Отправка информации о заказе на сервер и получение результата.</li>
  </ul>

<h2>Компоненты моделей данных бизнес-логики</h2>

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

<h2>Общие компоненты представления</h2>

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

<h2>Компоненты представления:</h2>
  <h2>Класс Page</h2>
  <p>Класс Page управляет основными элементами интерфейса страницы, включая счетчик корзины, каталог продуктов и обертку страницы. Наследуется от Component&lt;IPage&gt;.</p>
  <h3>Свойства:</h3>
  <ul>
    <li>_counter: Элемент счетчика корзины.</li>
    <li>_catalog: Контейнер для элементов каталога продуктов.</li>
    <li>_wrapper: Обертка страницы.</li>
    <li>_basket: Элемент корзины.</li>
  </ul>
  <p>constructor(container: HTMLElement, events: IEvents) - Инициализирует элементы страницы и назначает обработчики событий.</p>
  <h3>Методы:</h3>
  <ul>
    <li>set counter(value: number) - Обновляет счетчик товаров в корзине;</li>
    <li>set catalog(items: HTMLElement[]) - Заполняет каталог продуктов;</li>
    <li>set locked(value: boolean) - Управляет блокировкой страницы.</li>
  </ul>

  <h2>Класс Card</h2>
  <p>Класс предназначенный для отображения и управления карточками товара. Он управляет отображением информации о продукте, включая название, описание, цену и изображение. Реализует интерфейс IProduct. Наследуется от Component&lt;ICard&gt;</p>
  <h3>Свойства:</h3>
  <ul>
    <li>_index: Индикатор порядкового номера продукта в корзине.</li>
    <li>_title: Название продукта.</li>
    <li>_description: Описание продукта.</li>
    <li>_category: Категория продукта.</li>
    <li>_price: Цена продукта.</li>
    <li>_image: Изображение продукта.</li>
    <li>_button: Кнопка действия на карточке продукта.</li>
    <li>_buttonTitle: Название кнопки.</li>
  </ul>
  <p>constructor(container: HTMLElement, actions?: IActions) - Инициализирует элементы карточки и устанавливает обработчики событий для кнопок.</p>
  <h3>Методы:</h3>
  <ul>
    <li>disablePriceButton - проверяет цену и делает кнопку покупки неактивной если цена не указана.</li>
    <li>set/get id - управляет индификатором карточки.</li>
    <li>set/get title - управляет названием товара.</li>
    <li>set/get price - управляет ценой товара.</li>
    <li>set/get category - управляет категорией и ее цветом.</li>
    <li>set image - устанавливает изображение товара.</li>
    <li>set description - устанавливает описание товара.</li>
    <li>set buttonTitle - устанавливает textContent кнопки.</li>
  </ul>

  <h2>Класс Basket</h2>
  <p>Класс для отображения и управления компонентом корзины покупок. Обеспечивает отображение товаров, управление их выбором и общей стоимостью.</p>
  <h3>Свойства:</h3>
  <ul>
    <li>_list: HTMLElement: Список товаров в корзине.</li>
    <li>_total: HTMLElement: Элемент для отображения общей стоимости товаров.</li>
    <li>_button: HTMLButtonElement: Кнопка для перехода к оформлению заказа.</li>
  </ul>
  <p>constructor(container: HTMLElement, events: EventEmitter) - Инициализирует элементы управления корзины и подписывается на события. Наследуется от Component&lt;IBasketView&gt;.</p>
  <h3>Методы:</h3>
  <ul>
    <li>toggleButton - Включает или выключает кнопку оформления заказа в зависимости от наличия товаров в корзине;</li>
    <li>set items - устанавливает товары в корзине;</li>
    <li>set total - Устанавливает и отображает общую стоимость товаров в корзине.</li>
  </ul>

  <h2>Класс DeliveryForm</h2>
  <p>Класс для отображения и управления формой доставки. Класс включает в себя элементы управления для выбора способа оплаты и ввода адреса доставки. Наследуется от Form&lt;IDeliveryForm&gt;.</p>
  <h3>Свойства:</h3>
  <ul>
    <li>_cardButton: Кнопка выбора оплаты картой;</li>
    <li>_cashButton: Кнопка выбора оплаты наличными.</li>
  </ul>
  <p>constructor(container: HTMLFormElement, events: IEvents, actions?: IActions) - Инициализирует элементы управления формы и устанавливает обработчики событий.</p>
  <h3>Методы:</h3>
  <ul>
    <li>toggleButtons - Переключает активное состояние кнопок способа оплаты;</li>
    <li>set address - устанавливает адрес доставки.</li>
  </ul>

  <h2>Класс ContactForm</h2>
  <p>Класс для отображения и управления формой контактных данных, включая ввод телефона и электронной почты. Наследуется от Form&lt;IContactForm&gt;.</p>
  <p>constructor(container: HTMLFormElement, events: IEvents) - принимает контейнер формы доставки и объект для управления событиями.</p>
  <h3>Методы:</h3>
  <ul>
    <li>set phone - устанавливает номер телефона;</li>
    <li>set email - устанавливает адрес электронной почты.</li>
  </ul>

  <h2>Класс Success</h2>
  <p>Класс для отображения и управления компонентом, отображающим сообщение об успешной операции, например, после оформления заказа. Наследуется от Component&lt;ISuccess&gt;.</p>
  <h3>Свойства:</h3>
  <ul>
    <li>_close: HTMLElement: Кнопка для закрытия сообщения об успехе.</li>
    <li>_total: HTMLElement: Элемент для отображения информации о списанных средствах или других деталях успешной операции.</li>
  </ul>
  <p>constructor(container: HTMLElement, actions: ISuccessActions) - Инициализирует элементы интерфейса и назначает обработчики событий.</p>
  <h3>Методы:</h3>
  <ul>
    <li>set total - Устанавливает текст, отображаемый в элементе _totalElement. Используется для обновления информации о стоимости или других данных, связанных с успешным завершением операции.</li>
  </ul>

<!-- типы данных -->
<h2>Ключевые типы данных</h2>

  <h2>Типы данных для базовых классов:</h2>

  <h3>Общие методы события</h3>
  <pre>
export interface IEvents {
    on&lt;T extends object&gt;(event: EventName, callback: (data: T) =&gt; void): void; // обработчик события
    emit&lt;T extends object&gt;(event: string, data?: T): void; // инициатор события
    trigger&lt;T extends object&gt;(event: string, context?: Partial&lt;T&gt;): (data: T) =&gt; void; // колбек триггер события
}
  </pre>

  <h3>Данные ответа от сервера</h3>
  <pre>
export type ApiListResponse&lt;Type&gt; = {
    total: number, // общая стоимость товаров
    items: Type[] // список заказанных товаров
};
  </pre>

  <h3>Методы запросов к серверу</h3>
  <pre>
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
  </pre>

  <h2>Типы данных для общих компонентов:</h2>

  <h3>Данные обработчика валидности формы</h3>
  <pre>
export interface IFormState {
    valid: boolean; // валидность всей формы
    errors: string[]; // ошибки валидации формы
}
  </pre>

  <h3>Данные контента для отрисовки внутри модального окна</h3>
  <pre>
export interface IModalData {
    content: HTMLElement; // контейнер, обрисовываемый в модальном окне
}
  </pre>

  <h2>Остальные типы данных:</h2>

  <h3>Товар</h3>
  <pre>
export interface IProduct {
    id: string; // id товара
    title: string; // имя товара
    price: number | null; // цена товара
    description: string; // описание товара
    category: string; // категория товара
    image: string; // изображение товара
}
  </pre>

  <h3>Состояние приложения</h3>
  <pre>
export interface IAppState {
    catalog: IProduct[]; // все товары в каталоге
    basket: IProduct[]; // все id товаров в корзине
    preview: string | null; // id товара в окне детального просмотра
    order: IOrder | null; // данные о заказе
}
  </pre>

  <h3>Данные доставки</h3>
  <pre>
export interface IDeliveryForm {
    payment: string; // способ оплаты
    address: string; // адрес доставки
}
  </pre>

  <h3>Контактные данные</h3>
  <pre>
export interface IContactForm {
    email: string; // электронная почта
    phone: string; //
}
  </pre>

  <h3>Данные всего заказа</h3>
  <pre>
export interface IOrder extends IDeliveryForm, IContactForm {
    total: number; // общая сумма заказа
    items: string[]; // id всех товаров в заказе
}
  </pre>

  <h3>Данные ответа сервера на заказ</h3>
  <pre>
export interface IOrderResult {
    id: string; // id заказа
    total: number; // общая сумма заказа
}
  </pre>

  <h3>Ошибки Форм</h3>
  <pre>
export type FormErrors = Partial&lt;Record&lt;keyof IOrder, string&gt;&gt;;
  </pre>

  <h3>Данные для отображения карточки</h3>
  <pre>
export interface ICard extends IProduct{
    index?: string; // индекс товара в корзине(опционально)
    buttonTitle? : string; // textContent для кнопки покупки
}
  </pre>

  <h3>Данные для отображения корзины</h3>
  <pre>
export interface IBasketView {
    items: HTMLElement[]; // список карточек в корзине
    total: number; // итоговая стоимость товаров в корзине
}
  </pre>

  <h3>Данные для отображения главной страницы</h3>
  <pre>
export interface IPage{
    counter: number; // значение счетчика корзины
    catalog: HTMLElement[]; // список карточек в каталоге
}
  </pre>

  <h3>Данные для отображения успешного заказа</h3>
  <pre>
export interface ISuccess {
    total: number; // итоговая стоимость товара
}
  </pre>

  <h3>Действия передаваемые в конструктор</h3>
  <pre>
export interface IActions {
    onClick: (event: MouseEvent) =&gt; void; // действие нажатия мышки
}
  </pre>

  <h3>Действия передаваемые в конструктор успешного заказа</h3>
  <pre>
export interface ISuccessActions {
    onClick: () =&gt; void; // любое действие
}
  </pre>

  <h2>Список событий:</h2>
  <pre>
items:changed // изменение продуктов в каталоге
card:select // выбор карточки из каталога
preview:changed // изменение окна детального просмотра
product:toggle // переключение продукта в корзине
product:add // добавление продукта в корзину
product:delete // удаление продукта из корзины
basket:changed // изменение корзины
counter:changed // изменение счетчика корзины
basket:open // открытие окна корзины
