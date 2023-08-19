import 'reflect-metadata';
import { Request } from 'express';
import Joi from 'joi';
import { UnprocessableEntity } from '../../errors/unprocessableEntity';

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
	model: Joi.Schema,
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
			const { error } = (model as Joi.Schema).validate(
				(req as Request)[source],
			);
			if (error) {
				throw new UnprocessableEntity(
					error.details.map((item) => ({
						[item.path.join(', ')]: item.message,
					})),
				);
			}
			return method.apply(this, [...args]);
		};
	};
}

export const ValidateQuery = (dto: Joi.Schema) =>
	validationFactory(MetadataValidationKeys.QUERY, dto, ValidationKeys.QUERY);
export const ValidateBody = (dto: Joi.Schema) =>
	validationFactory(MetadataValidationKeys.BODY, dto, ValidationKeys.BODY);
