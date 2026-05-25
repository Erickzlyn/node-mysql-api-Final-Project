import config from '../config.json';
import { Sequelize } from 'sequelize';
import accountModel from '../accounts/account.model';
import refreshTokenModel from '../accounts/refresh-token.model';

const db: any = {};
export default db;

initialize();

async function initialize() {
    const host = process.env.DB_HOST || config.database.host;
    const port = parseInt(String(process.env.DB_PORT || config.database.port));
    const user = process.env.DB_USER || config.database.user;
    const password = process.env.DB_PASSWORD || config.database.password;
    const database = process.env.DB_NAME || config.database.database;

    const sequelize = new Sequelize(database, user, password, {
        dialect: 'mysql',
        host: host,
        port: port,
        logging: false,
        dialectOptions: {
            connectTimeout: 10000
        }
    });

    db.Account = accountModel(sequelize);
    db.RefreshToken = refreshTokenModel(sequelize);

    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);

    try {
        await sequelize.sync();
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection failed:', err);
        // Don't crash the app — Vercel needs the server to stay up
    }
}