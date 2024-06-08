import { BadRequestResponse } from "@libs/api-gateway";
import * as Joi from "joi";
import { ErrorMessages } from "@libs/responses";

const schema = Joi.object({
    Name: Joi.string().required(),
    Description: Joi.string().required(),
    ParentId: Joi.string().allow(null), // Allow null or string values
    Type: Joi.string().valid("category", "tag").required(), // Assuming valid types are 'category' or 'tag'
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
