"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = __importDefault(require("./_middleware/error-handler"));
const accounts_controller_1 = __importDefault(require("./accounts/accounts.controller"));
const swagger_1 = __importDefault(require("./_helpers/swagger"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
// CORS configuration for production
// CORS_ORIGIN can be a single URL or comma-separated list of URLs
// e.g. "https://your-app.vercel.app,https://your-old-app.onrender.com"
const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean)
    : [];
const corsOptions = {
    origin: allowedOrigins.length > 0
        ? (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error(`CORS: origin '${origin}' not allowed`));
            }
        }
        : true, // allow all origins if CORS_ORIGIN is not set
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
// api routes
app.use('/accounts', accounts_controller_1.default);
// swagger docs route
app.use('/api-docs', swagger_1.default);
// global error handler
app.use(error_handler_1.default);
// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => console.log('Server listening on port ' + port));
}
exports.default = app;
