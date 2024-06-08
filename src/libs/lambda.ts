import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import errorHandler from "./error-handler";

export const middyfy = (handler) => {
    return middy(handler).use(errorHandler()).use(middyJsonBodyParser());
};
