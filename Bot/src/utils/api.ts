import { config } from 'dotenv';

config();

const API_URL = process.env.BACKEND_URL!;
const BOT_TOKEN = process.env.BOT_TOKEN!;

export const createUser = async (telegramId: string): Promise<string> => {
    try {
        const response = await fetch(API_URL + "/client", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                telegramId: telegramId
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        return await response.text();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};