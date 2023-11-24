interface Options {
    baseUrl: string;
}
interface RequestArguments {
    path: string;
    headers?: HeadersInit;
    params?: Record<string, string | undefined>;
}
interface PostArguments extends RequestArguments {
    body?: Record<string, unknown>;
}
export declare class FetchUtil {
    baseUrl: Options['baseUrl'];
    constructor({ baseUrl }: Options);
    get<T>({ headers, ...args }: RequestArguments): Promise<T>;
    getBlob({ headers, ...args }: RequestArguments): Promise<Blob>;
    post<T>({ body, headers, ...args }: PostArguments): Promise<T>;
    put<T>({ body, headers, ...args }: PostArguments): Promise<T>;
    delete<T>({ body, headers, ...args }: PostArguments): Promise<T>;
    private createUrl;
}
export {};
