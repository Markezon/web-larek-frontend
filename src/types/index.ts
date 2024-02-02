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
