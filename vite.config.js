import { defineConfig } from "vite";
import dotenv from "dotenv";

// Load environment variables from .env file
const env = dotenv.config().parsed;

export default defineConfig({
    plugins: [],
    define: {
        "process.env": env,
    },
});
