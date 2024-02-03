/// Types for implementing the base Events class
export type EventName = string | RegExp;
export type Subscriber = Function;
export type EmitterEvent = {
	eventName: string;
	data: unknown;
};

/// Common event methods
export interface IEvents {
	on<T extends object>(event: EventName, callback: (data: T) => void): void;
	emit<T extends object>(event: string, data?: T): void;
	trigger<T extends object>(
		event: string,
		context?: Partial<T>
	): (data: T) => void;
}

/// Server response data
export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

/// Server request methods
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

/// Content data for rendering inside the modal window
export interface IModalData {
	content: HTMLElement;
}

/// Form validity handler data
export interface IFormState {
	valid: boolean;
	errors: string[];
}

/// Product Data
export interface IProduct {
	id: string;
	title: string;
	price: number | null;
	description: string;
	category: string;
	image: string;
}

/// Application Status
export interface IAppState {
	catalog: IProduct[];
	basket: IProduct[];
	preview: string | null;
	delivery: IDeliveryForm | null;
	contact: IContactForm | null;
	order: IOrder | null;
}

/// Delivery Information
export interface IDeliveryForm {
	payment: string;
	address: string;
}

/// Contact Information
export interface IContactForm {
	email: string;
	phone: string;
}

/// Overall Order Data
export interface IOrder extends IDeliveryForm, IContactForm {
	total: number;
	items: string[];
}

/// Server Response Data for the Order
export interface IOrderResult {
	id: string;
	total: number;
}

/// Form Errors
export type FormErrors = Partial<Record<keyof IOrder, string>>;

/// Data for displaying the main page
export interface IPage {
	counter: number;
	catalog: HTMLElement[];
}

/// Data for displaying the card
export interface ICard extends IProduct {
	index?: string;
	buttonTitle?: string;
}

/// Data for displaying a successful order
export interface ISuccess {
	total: number;
}

/// Actions passed to the constructor
export interface IActions {
	onClick: (event: MouseEvent) => void;
}

/// Actions passed to the constructor of a successful order
export interface ISuccessActions {
	onClick: () => void;
}

/// Data for displaying the shopping cart
export interface IBasketView {
	items: HTMLElement[];
	total: number;
}
