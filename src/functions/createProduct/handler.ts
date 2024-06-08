import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema, { validateRequest } from "./schema";
import { ProductService } from "@services/productService";
import { randomUUID } from "crypto";
import moment from "moment";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
    event
) => {
    try {
        const body = await validateRequest(event.body);
        const productId = randomUUID();
        const params = {
            ...body,
            productId,
        };
        const productServiceObject = new ProductService();
        const response = await productServiceObject.createProduct(params);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const main = middyfy(handler);
