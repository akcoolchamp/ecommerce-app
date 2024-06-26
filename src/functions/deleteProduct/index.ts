import { corsConfig } from "@libs/constants";
import { handlerPath } from "@libs/handler-resolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: "delete",
                path: "/products/{productId}",
                cors: corsConfig,
            },
        },
    ],
};
