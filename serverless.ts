const NODE_ENV = process.env.NODE_ENV || "dev";
import type { AWS } from "@serverless/typescript";
import createProduct from "@functions/createProduct";
import getProduct from "@functions/getProduct";
import editProduct from "@functions/editProduct";
import deleteProduct from "@functions/deleteProduct";

const serverlessConfiguration: AWS = {
    service: "ecommerce-application",
    frameworkVersion: "3",
    plugins: [
        "serverless-esbuild",
        "serverless-offline",
        "serverless-dotenv-plugin",
        "serverless-appsync-plugin",
    ],
    provider: {
        name: "aws",
        runtime: "nodejs18.x",
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
            NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
            PRODUCT_TABLE: process.env.PRODUCT_TABLE,
            PRODUCT_TAXONOMY_TABLE: process.env.PRODUCT_TAXONOMY_TABLE,
        },
        deploymentBucket: process.env.DEPLOYMENT_BUCKET,
        deploymentMethod: "direct",
        versionFunctions: false,
        iamRoleStatements: [
            {
                Effect: "Allow",
                Action: [
                    "dynamodb:PutItem",
                    "dynamodb:GetItem",
                    "dynamodb:UpdateItem",
                    "dynamodb:DeleteItem",
                ],
                Resource: "*",
            },
        ],
    },
    // import the function via paths
    functions: {
        createProduct,
        getProduct,
        editProduct,
        deleteProduct,
    },
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ["aws-sdk"],
            target: "node14",
            define: { "require.resolve": undefined },
            platform: "node",
            concurrency: 10,
        },
        dotenv: {
            path: `./config/.env.${NODE_ENV}`,
        },
        appSync: {
            name: "EcommerceAppSync",
            authenticationType: "API_KEY",
            apiKeys: ["EcommerceKey"],
            schema: ["./schema.graphql"],
            dataSources: [
                {
                    type: "AWS_LAMBDA",
                    name: "createProduct",
                    description: "Lambda",
                    config: {
                        functionName: "createProduct",
                    },
                },
                {
                    type: "AWS_LAMBDA",
                    name: "editProduct",
                    description: "Lambda",
                    config: {
                        functionName: "editProduct",
                    },
                },
                {
                    type: "AWS_LAMBDA",
                    name: "getProduct",
                    description: "Lambda",
                    config: {
                        functionName: "getProduct",
                    },
                },
                {
                    type: "AWS_LAMBDA",
                    name: "deleteProduct",
                    description: "Lambda",
                    config: {
                        functionName: "deleteProduct",
                    },
                },
            ],
        },
    },
};

module.exports = serverlessConfiguration;
