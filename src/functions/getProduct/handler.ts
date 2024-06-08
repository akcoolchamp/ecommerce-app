import {
    SuccessResponse,
    ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema, { validateRequest } from "./schema";
import { ProductService } from "@services/productService";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
    event
) => {
    try {
        const { productId: ProductId } = await validateRequest(
            event.pathParameters
        );

        const productServiceObject = new ProductService();
        const response = await productServiceObject.getProduct(ProductId);
        return new SuccessResponse({ message: "Product", data: response });
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const main = middyfy(handler);
