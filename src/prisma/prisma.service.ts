import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    const databaseUrl = config.get<string>('database.url');
    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });
  }
}
