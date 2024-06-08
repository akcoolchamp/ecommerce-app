import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema, { validateRequest } from "./schema";
import { ProductService } from "@services/productService";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
    event
) => {
    try {
        const productId = event.pathParameters.productId;
        const body = await validateRequest(event.body);
        //Check if product exists
        const productServiceObject = new ProductService();
        const response = await productServiceObject.updateProduct(
            productId,
            body
        );
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const main = middyfy(handler);
