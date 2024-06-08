import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema, { validateRequest } from "./schema";
import { ProductService } from "@services/productService";
import { randomUUID } from "crypto";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
    event
) => {
    try {
        const body = await validateRequest(event.body);
        const ProductId = randomUUID();
        const params = {
            ...body,
            ProductId,
        };
        console.log(params);
        const productServiceObject = new ProductService();
        const response = await productServiceObject.createProduct(params);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const main = middyfy(handler);
