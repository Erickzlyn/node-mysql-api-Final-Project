import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandler from './_middleware/error-handler';
import accountsController from './accounts/accounts.controller';
import swaggerDocs from './_helpers/swagger';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// CORS configuration for production
// CORS_ORIGIN can be a single URL or comma-separated list of URLs
// e.g. "https://your-app.vercel.app,https://your-old-app.onrender.com"
const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((o: string) => o.trim()).filter(Boolean)
    : [];

const corsOptions = {
    origin: allowedOrigins.length > 0
        ? (origin: any, callback: any) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`CORS: origin '${origin}' not allowed`));
            }
          }
        : true,   // allow all origins if CORS_ORIGIN is not set
    credentials: true
};

app.use(cors(corsOptions));

// api routes
app.use('/accounts', accountsController);

// swagger docs route
app.use('/api-docs', swaggerDocs);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
