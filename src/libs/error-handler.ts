import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const middleware = (): middy.MiddlewareObj<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
> => {
    const onError: middy.MiddlewareFn = async (event) => {
        console.log(event);
        {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message:
                        event.response?.body?.message || event.error?.message,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Access-Control-Allow-Headers":
                        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                    "Access-Control-Allow-Credentials": true,
                },
            };
        }
    };

    return {
        onError,
    };
};

export default middleware;
