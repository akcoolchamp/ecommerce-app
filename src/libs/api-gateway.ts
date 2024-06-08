import type {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Handler,
} from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
    body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
    ValidatedAPIGatewayProxyEvent<S>,
    APIGatewayProxyResult
>;

export const formatJSONResponse = (response: Record<string, unknown>) => {
    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
};

export class GeneralApiResponse implements APIGatewayProxyResult {
    statusCode: number;
    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers":
            "Content-Type,X-Amz-Date,Authorization,IdToken,,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Credentials": true,
    };
    body: string;
    constructor(response: Record<string, unknown>) {
        this.body = JSON.stringify(response);
    }
}

export class SuccessResponse extends GeneralApiResponse {
    statusCode = 200;
}

export class PermanentRedirectResponse extends GeneralApiResponse {
    statusCode = 302;
}

export class TemporaryRedirectResponse extends GeneralApiResponse {
    statusCode = 307;
}

export class BadRequestResponse extends GeneralApiResponse {
    statusCode = 400;
}

export class ForbiddenResponse extends GeneralApiResponse {
    statusCode = 403;
}

export class NotFoundResponse extends GeneralApiResponse {
    statusCode = 404;
}

export class FoundResponse extends GeneralApiResponse {
    statusCode = 409;
}

export class ErrorResponse extends GeneralApiResponse {
    statusCode = 500;
}
