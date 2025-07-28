import { Module } from '@nestjs/common';
import { SpotifyAuthService } from './spotify-auth/spotify-auth.service';
import { SpotifyAuthController } from './spotify-auth/spotify-auth.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule],
  controllers: [SpotifyAuthController],
  providers: [SpotifyAuthService],
})
export class AppModule {}
