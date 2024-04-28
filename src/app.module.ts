import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './config/config.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { GuardsModule } from './guards/guards.module';

@Module({
  imports: [
    ConfigurationModule,
    PostsModule,
    PrismaModule,
    AuthModule,
    GuardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
