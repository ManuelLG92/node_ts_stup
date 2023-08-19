export abstract class BaseError extends Error {
	abstract readonly message: string;
	abstract readonly details: Array<Record<string, unknown>>;
}
