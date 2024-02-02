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
