import { connectDB } from "@/config/db";
import { seedAll } from "./seeder";
import mongoose from "mongoose";
import logger from "@/config/logger";

async function runSeed() {
    try {
        await connectDB();
        await seedAll();
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        logger.error(`[SEED] Execution failed: ${error}`);
        process.exit(1);
    }
}

runSeed();
