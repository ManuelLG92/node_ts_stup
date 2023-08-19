import { BaseError } from './baseError';

export class UnprocessableEntity extends BaseError {
	message: string;
	details: Record<string, unknown>[];
	constructor(details: Record<string, unknown>[]) {
		super();
		this.message = this.constructor.name;
		this.details = details;
	}
}
