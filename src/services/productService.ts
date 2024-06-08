import {
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
    UpdateItemCommand,
    DeleteItemCommand,
    UpdateItemCommandInput,
    UpdateItemCommandOutput,
    PutItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
const client = new DynamoDBClient();
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;

export class ProductService {
    async createProduct(product) {
        const params: PutItemCommandInput = {
            TableName: PRODUCTS_TABLE,
            Item: marshall({
                ProductId: product.ProductId,
                Name: product.Name,
                Description: product.Description,
                Price: product.Price,
                Category: product.Category,
                Stock: product.Stock,
                CreatedAt: new Date().toISOString(),
                UpdatedAt: new Date().toISOString(),
            }),
        };

        try {
            await client.send(new PutItemCommand(params));
            return unmarshall(params.Item);
        } catch (error) {
            throw new Error("Could not create product");
        }
    }

    async getProduct(productId) {
        const params = {
            TableName: PRODUCTS_TABLE,
            Key: marshall({
                ProductId: productId,
            }),
        };

        try {
            const data = await client.send(new GetItemCommand(params));
            return unmarshall(data.Item);
        } catch (error) {
            throw new Error("Could not retrieve product");
        }
    }

    async updateProduct(productId, product) {
        const params: UpdateItemCommandInput = {
            TableName: PRODUCTS_TABLE,
            Key: marshall({
                ProductId: productId,
            }),
            UpdateExpression:
                "set #name = :name, #description = :description, #price = :price, #category = :category, #stock = :stock, #updatedAt = :updatedAt",
            ExpressionAttributeNames: {
                "#name": "Name",
                "#description": "Description",
                "#price": "Price",
                "#category": "Category",
                "#stock": "Stock",
                "#updatedAt": "UpdatedAt",
            },
            ExpressionAttributeValues: marshall({
                ":name": product.Name,
                ":description": product.Description,
                ":price": product.Price,
                ":category": product.Category,
                ":stock": product.Stock,
                ":updatedAt": new Date().toISOString(),
            }),
            ReturnValues: "ALL_NEW",
        };

        try {
            const data: UpdateItemCommandOutput = await client.send(
                new UpdateItemCommand(params)
            );
            return unmarshall(data.Attributes);
        } catch (error) {
            throw new Error("Could not update product");
        }
    }

    async deleteProduct(productId) {
        const params = {
            TableName: PRODUCTS_TABLE,
            Key: marshall({
                ProductId: productId,
            }),
        };

        try {
            await client.send(new DeleteItemCommand(params));
            return {};
        } catch (error) {
            throw new Error("Could not delete product");
        }
    }
}
