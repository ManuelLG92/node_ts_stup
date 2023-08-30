export abstract class BaseError extends Error {
	readonly message: string;
	abstract readonly details: Array<Record<string, unknown>>;

	constructor(message?: string){
		super()
		this.message = message ?? this.constructor.name
	}
}
