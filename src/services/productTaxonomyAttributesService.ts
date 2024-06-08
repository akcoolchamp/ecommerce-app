import {
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
const client = new DynamoDBClient();
const CATEGORIES_TABLE = process.env.CATEGORIES_TABLE;

class ProductTaxonomyService {
    async createCategory(category) {
        const params = {
            TableName: CATEGORIES_TABLE,
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
            throw new Error("Could not create category");
        }
    }

    async getCategory(taxonomyId) {
        const params = {
            TableName: CATEGORIES_TABLE,
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

module.exports = ProductTaxonomyService;
