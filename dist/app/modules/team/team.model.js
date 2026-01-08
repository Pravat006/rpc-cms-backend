"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMember = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongooseToJSON_1 = __importDefault(require("../../utils/mongooseToJSON"));
const teamMemberSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    bio: [{ type: String }],
    order: { type: Number, default: 0 },
    category: { type: String, enum: ["leadership", "placement"], required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
(0, mongooseToJSON_1.default)(teamMemberSchema);
teamMemberSchema.index({ category: 1 });
teamMemberSchema.index({ order: 1 });
teamMemberSchema.index({ isActive: 1 });
exports.TeamMember = mongoose_1.default.models.TeamMember || mongoose_1.default.model("TeamMember", teamMemberSchema);
//# sourceMappingURL=team.model.js.map