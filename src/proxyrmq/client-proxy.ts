import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ProxyRmqConfig } from './proxyrmq.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientProxyRabbitMq {
  private configProxyRmq: ProxyRmqConfig;

  constructor(configService: ConfigService) {
    this.configProxyRmq = new ProxyRmqConfig(configService);
  }

  getClientProxyRabbitmq(queue: string): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [{ ...this.configProxyRmq }],
        queue: queue,
      },
    });
  }
}
