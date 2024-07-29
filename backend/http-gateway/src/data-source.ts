import { DataSource } from "typeorm";

// const AppDataSource = new DataSource({
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'muaz',
//     password: '123',
//     database: 'medatafy_db',
//     entities: [__dirname + '/**/*.entity{.ts,.js}'],
//     synchronize: true,
// });

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: process.env.SYNCHRONIZE === 'true',
});

export default AppDataSource;