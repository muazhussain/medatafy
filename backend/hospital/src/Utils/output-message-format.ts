import { HttpException, HttpStatus } from '@nestjs/common';

export function commonResponse(success: boolean, message: string, payload: any = null) {
    if (success) {
        return { success, message, data: payload };
    } else {
        return { success, message, error: payload.response };
    }
}

export function listFilterResponse(
    success: boolean,
    message: string,
    total: number,
    take: number,
    page: number,
    data: any,
) {
    const res = {
        success,
        message,
        total,
        page,
        take,
        data,
    };
    return res;
}