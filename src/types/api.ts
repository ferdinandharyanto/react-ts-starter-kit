/* eslint-disable @typescript-eslint/no-explicit-any */

export interface BaseAll {
    params?: any,
    signal?: AbortSignal
}

export interface BaseApis<T> {
    token: any;
    message: string;
    response?: any;
    data: T;
    metadata?: BaseApisMetadata;
    total?: number;
}

export interface BaseApisMetadata {
    page?: number;
    limit?: number;
    totalPage?: number;
    totalData?: number;
}