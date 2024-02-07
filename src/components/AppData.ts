import { Model } from './base/Model';
import {
	IProduct,
	IOrder,
	IDeliveryForm,
	IAppState,
	FormErrors,
	IContactForm,
} from '../types';

export type CatalogChangeEvent = {
	catalog: IProduct[];
};

export class AppState extends Model<IAppState> {
	catalog: IProduct[];
	basket: IProduct[] = [];
	order: IOrder = {
		payment: 'online',
		address: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	};
	preview: string | null;
	formErrors: FormErrors = {};

	clearBasket() {
		this.basket = [];
		this.updateBasket();
	}

	clearOrder() {
		this.order = {
			payment: 'online',
			address: '',
			email: '',
			phone: '',
			total: 0,
			items: [],
		};
	}

	setCatalog(items: IProduct[]) {
		this.catalog = items;
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setPreview(item: IProduct) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	addToBasket(item: IProduct) {
		if (this.basket.indexOf(item) < 0) {
			this.basket.push(item);
			this.updateBasket();
		}
	}

	removeFromBasket(item: IProduct) {
		this.basket = this.basket.filter((it) => it != item);
		this.updateBasket();
	}

	updateBasket() {
		this.emitChanges('counter:changed', this.basket);
		this.emitChanges('basket:changed', this.basket);
	}

	setDeliveryField(field: keyof IDeliveryForm, value: string) {
		this.order[field] = value;
		if (this.validateDelivery()) {
			this.events.emit('delivery:ready', this.order);
		}
	}

	setContactField(field: keyof IContactForm, value: string) {
		this.order[field] = value;
		if (this.validateContact()) {
			this.events.emit('contact:ready', this.order);
		}
	}

	validateDelivery() {
		const errors: typeof this.formErrors = {};
		const deliveryRegex = /^[а-яА-ЯёЁa-zA-Z0-9\s\/.,-]{10,}$/;
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		} else if (!deliveryRegex.test(this.order.address)) {
			errors.address =
				'Адрес должен содержать только буквы, цифры, пробелы, точки, запятые и "/", состоять как минимум из 10 символов';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateContact() {
		const errors: typeof this.formErrors = {};
		const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		const phoneRegex = /^\+7[0-9]{10}$/;
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		} else if (!emailRegex.test(this.order.email)) {
			errors.email = 'Некорректный адрес электронной почты';
		}
		let phoneValue = this.order.phone;
		if (phoneValue.startsWith('8')) {
			phoneValue = '+7' + phoneValue.slice(1);
		}
		if (!phoneValue) {
			errors.phone = 'Необходимо указать телефон';
		} else if (!phoneRegex.test(phoneValue)) {
			errors.phone =
				'Некорректный формат номера телефона, номер следует указывать в формате +7ХХХХХХХХХХ';
		} else {
			this.order.phone = phoneValue;
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
