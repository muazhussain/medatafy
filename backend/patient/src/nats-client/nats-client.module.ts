import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'NATS_CLIENT',
                transport: Transport.NATS,
                options: {
                    url: 'nats://nats',
                },
            },
        ]),
    ],
    exports: [
        ClientsModule.register([
            {
                name: 'NATS_CLIENT',
                transport: Transport.NATS,
                options: {
                    url: 'nats://nats',
                },
            },
        ]),
    ],
})
export class NatsClientModule { }
