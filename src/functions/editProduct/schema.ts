import { BadRequestResponse } from "@libs/api-gateway";
import * as Joi from "joi";
import { ErrorMessages } from "@libs/responses";

const schema = Joi.object({
    Name: Joi.string().required(),
    Description: Joi.string().required(),
    Price: Joi.number().required(),
    Category: Joi.string().required(),
    Stock: Joi.number().required(),
}).options({ allowUnknown: true });

export const validateRequest = async (object) => {
    try {
        const request = await schema.validateAsync(object);
        return Promise.resolve(request);
    } catch (error) {
        console.log(error);
        return Promise.reject(
            new BadRequestResponse({ message: ErrorMessages.INCORRECT_PAYLOAD })
        );
    }
};

export default schema;
