interface config {
    method: string;
    url: string;
    data: object;
    headers: object
}

interface error {
    config:config;
    response:response
}

interface response {
    config:config
    status:number
}
export type {
    config,
    error,
    response
}