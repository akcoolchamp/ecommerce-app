import {
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { config } from "src/config";
const client = new DynamoDBClient();
const PRODUCT_TAXONOMY_TABLE = config.PRODUCT_TAXONOMY_TABLE;

export class ProductTaxonomyService {
    async createCategory(category) {
        const params = {
            TableName: PRODUCT_TAXONOMY_TABLE,
            Item: marshall({
                TaxonomyId: category.TaxonomyId,
                Name: category.Name,
                Description: category.Description,
                ParentId: category.ParentId || "root",
                Type: category.Type,
            }),
        };

        try {
            await client.send(new PutItemCommand(params));
            return unmarshall(params.Item);
        } catch (error) {
            console.error(error);
            throw new Error("Could not create category");
        }
    }

    async getCategory(taxonomyId) {
        const params = {
            TableName: PRODUCT_TAXONOMY_TABLE,
            Key: marshall({
                TaxonomyId: taxonomyId,
            }),
        };

        try {
            const data = await client.send(new GetItemCommand(params));
            return unmarshall(data.Item);
        } catch (error) {
            throw new Error("Could not retrieve category");
        }
    }
}
