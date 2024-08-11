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
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [process.env.TYPEORM_ENTITIES],
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
});
export default AppDataSource;