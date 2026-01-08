"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./app/config"));
const logger_1 = __importDefault(require("./app/config/logger"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./app/config/db");
const seeder_1 = require("./seeder");
async function main() {
    try {
        await (0, db_1.connectDB)();
        await (0, seeder_1.seedDefaultAdmin)();
        const server = app_1.default.listen(config_1.default.PORT, () => {
            logger_1.default.info(`[APP] Server is running on port ${config_1.default.PORT}`);
        });
        let isShuttingDown = false;
        const shutdown = () => {
            if (isShuttingDown)
                return;
            isShuttingDown = true;
            logger_1.default.info('[APP] Shutting down gracefully...');
            server.close(async () => {
                logger_1.default.info('[APP] HTTP server closed.');
                await mongoose_1.default.disconnect();
                logger_1.default.info('[DB] Mongoose disconnected.');
                process.exit(0);
            });
        };
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    }
    catch (err) {
        logger_1.default.error(`[APP] Application startup error: ${err}`);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map