import {config} from 'dotenv';

config();

const API_URL = process.env.BACKEND_URL!;

const request = async (method: string, url: string, body?: any): Promise<any> => {
    try {
        return fetch(API_URL + url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

export const httpPostRequest = async (url: string, body: any): Promise<any> => {
    return await request('POST', url, body);
}

export const httpGetRequest = async (url: string): Promise<any> => {
    return await request('GET', url);
}