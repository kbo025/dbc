import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClientExtended } from './pirsma.conf';

@Injectable()
export class PrismaService
  extends PrismaClientExtended
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
