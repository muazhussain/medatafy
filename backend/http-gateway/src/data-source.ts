import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: 'postgres',
    port: 5432,
    username: 'muaz',
    password: '123',
    database: 'medatafy_db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
});

export default AppDataSource;