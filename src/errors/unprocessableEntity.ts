import { BaseError } from 'src/errors/baseError';

export class UnprocessableEntity extends BaseError {
	details: Record<string, unknown>[];
	constructor(details: Record<string, unknown>[]) {
		super();
		this.details = details;
	}
}
