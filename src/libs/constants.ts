export const corsConfig = {
    origin: "*",
    headers: [
        "Content-Type",
        "X-Amz-Date",
        "Authorization",
        "IdToken",
        "X-Api-Key",
        "X-Amz-Security-Token",
        "X-Amz-User-Agent",
        "X-Amzn-Trace-Id",
        "Id-Token",
    ],
    allowCredentials: true,
};
