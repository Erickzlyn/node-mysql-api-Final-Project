import config from '../config.json';
import { Sequelize } from 'sequelize';
import accountModel from '../accounts/account.model';
import refreshTokenModel from '../accounts/refresh-token.model';

const db: any = {};
export default db;

initialize();

async function initialize() {
    // Read from environment variables with fallback to config.json
    const host = process.env.DB_HOST || config.database.host;
    const port = parseInt(process.env.DB_PORT || config.database.port);
    const user = process.env.DB_USER || config.database.user;
    const password = process.env.DB_PASSWORD || config.database.password;
    const database = process.env.DB_NAME || config.database.database;

    // Connect directly — DB already exists on FreeSQLDatabase
    const sequelize = new Sequelize(database, user, password, {
        dialect: 'mysql',
        host: host,
        port: port,
    });

    // Init models
    db.Account = accountModel(sequelize);
    db.RefreshToken = refreshTokenModel(sequelize);

    // Define relationships
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);

    // Sync models with database
    await sequelize.sync();
}