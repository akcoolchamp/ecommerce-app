import { BadRequestResponse } from "@libs/api-gateway";
import * as Joi from "joi";
import { ErrorMessages } from "@libs/responses";

const schema = Joi.object({
    productId: Joi.string().required(),
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
