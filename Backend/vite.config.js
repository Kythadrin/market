import { defineConfig } from "vite";
import symfonyPlugin from "vite-plugin-symfony";

export default defineConfig({
    plugins: [
        symfonyPlugin(),
    ],
    server: {
        host: true,
        port: 5174,
    },
    build: {
        rollupOptions: {
            input: {
                app: "./assets/app.js",
                appCss: "./assets/styles/app.css",
            },
        },
        assetsInlineLimit: 0,
    },
});
