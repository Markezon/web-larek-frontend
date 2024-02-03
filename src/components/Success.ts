import { Component } from './base/Component';
import { ensureElement } from './../utils/utils';
import { ISuccess, ISuccessActions } from '../types';
// Класс Success для отображения успешного выполнения операции
export class Success extends Component<ISuccess> {
	protected _close: HTMLElement; // Кнопка закрытия модального окна
	protected _total: HTMLElement; // Элемент для отображения итоговой информации

	constructor(container: HTMLElement, actions: ISuccessActions) {
		super(container);
		// Инициализация элементов интерфейса
		this._close = ensureElement<HTMLElement>(
			'.order-success__close',
			this.container
		);
		this._total = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);
		// Подключение обработчика события закрытия окна
		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}
	// Установка текста итоговой информации
	set total(value: string) {
		this._total.textContent = `Списано ${value} синапсов`;
	}
}
