import 'reflect-metadata';
import { Request } from 'express';
import { UnprocessableEntity } from '../../errors/unprocessableEntity';
import { z } from 'zod';

export enum ValidationKeys {
	QUERY = 'query',
	BODY = 'body',
}

const MetadataValidationKeys = {
	QUERY: Symbol('validate-query'),
	BODY: Symbol('validate-body'),
};

function validationFactory(
	metadataKey: symbol,
	model: z.Schema,
	source: ValidationKeys,
): any {
	return function (
		target: any,
		propertyName: string,
		descriptor: TypedPropertyDescriptor<Function>,
	) {
		Reflect.defineMetadata(metadataKey, model, target, propertyName);

		const method = descriptor.value as Function;
		descriptor.value = async function (...args: any) {
			const model = Reflect.getOwnMetadata(
				metadataKey,
				target,
				propertyName,
			);
			const [req] = args as unknown as any;
			const result = (model as z.Schema).safeParse(
				(req as Request)[source],
			);
			if (!result.success) {
				throw new UnprocessableEntity(
					result.error.errors.map((item) => ({
						[item.path.join(', ')]: item.message,
					})),
				);
			}
			return method.apply(this, [...args]);
		};
	};
}

export const ValidateQuery = (dto: z.Schema) =>
	validationFactory(MetadataValidationKeys.QUERY, dto, ValidationKeys.QUERY);
export const ValidateBody = (dto: z.Schema) =>
	validationFactory(MetadataValidationKeys.BODY, dto, ValidationKeys.BODY);
