import './scss/styles.scss';

import { LarekAPI } from './components/LarekAPI';
import { API_URL, CDN_URL, PaymentMethods } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { AppState, CatalogChangeEvent, Product } from './components/AppData';
import { Page } from './components/Page';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { IContactForm, IDeliveryForm, IOrder } from './types';
import { Card } from './components/Card';
import { Basket } from './components/Basket';
import { DeliveryForm, ContactForm } from './components/Order';
import { Success } from './components/Success';
// Создание объектов для управления событиями и API
const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

// Шаблоны верстки элементов страницы
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const deliveryTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Создание основных компонентов приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const delivery = new DeliveryForm(cloneTemplate(deliveryTemplate), events, {
	onClick: (ev: Event) => events.emit('payment:toggle', ev.target),
});
const contact = new ContactForm(cloneTemplate(contactTemplate), events);

///Обработка событий///

// Обновления каталога товаров
events.on<CatalogChangeEvent>('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
});

// Открытие товара
events.on('card:select', (item: Product) => {
	appData.setPreview(item);
});

events.on('preview:changed', (item: Product) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			events.emit('product:toggle', item);
			card.buttonTitle =
				appData.basket.indexOf(item) < 0 ? 'Купить' : 'Удалить из корзины';
		},
	});
	modal.render({
		content: card.render({
			title: item.title,
			description: item.description,
			image: item.image,
			price: item.price,
			category: item.category,
			buttonTitle:
				appData.basket.indexOf(item) < 0 ? 'Купить' : 'Удалить из корзины',
		}),
	});
});
