import {
    SuccessResponse,
    ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema, { validateRequest } from "./schema";
import { ProductTaxonomyService } from "@services/productTaxonomyAttributesService";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
    event
) => {
    try {
        const body = await validateRequest(event.body);

        const productTaxonomyServiceObject = new ProductTaxonomyService();
        await productTaxonomyServiceObject.createCategory(body);

        return new SuccessResponse({ message: "Category created" });
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const main = middyfy(handler);
