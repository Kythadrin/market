import {config} from 'dotenv';

config();

const API_URL = process.env.BACKEND_URL!;
const BOT_TOKEN = process.env.BOT_TOKEN!;


export const httpPostRequest = async (url: string, body: any): Promise<any> => {
    try {
        return await fetch(API_URL + url, {
            method: 'POST',
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