const NODE_ENV = process.env.NODE_ENV || "dev";

import createCategory from "@functions/createCategory";
import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
    service: "ecommerce-application",
    frameworkVersion: "3",
    plugins: [
        "serverless-esbuild",
        "serverless-offline",
        "serverless-dotenv-plugin",
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
    },
    // import the function via paths
    functions: {
        createCategory,
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
    },
};

module.exports = serverlessConfiguration;
