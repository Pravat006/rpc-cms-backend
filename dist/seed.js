"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./app/config/db");
const seeder_1 = require("./seeder");
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./app/config/logger"));
async function runSeed() {
    try {
        await (0, db_1.connectDB)();
        await (0, seeder_1.seedAll)();
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
    catch (error) {
        logger_1.default.error(`[SEED] Execution failed: ${error}`);
        process.exit(1);
    }
}
runSeed();
//# sourceMappingURL=seed.js.map