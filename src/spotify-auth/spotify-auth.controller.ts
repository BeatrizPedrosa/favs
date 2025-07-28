import { Controller, Post, Body } from '@nestjs/common';
import { SpotifyAuthService } from './spotify-auth.service';

@Controller('spotify-auth')
export class SpotifyAuthController {
  constructor(private readonly spotifyAuthService: SpotifyAuthService) {}

  @Post('token')
  async getToken(@Body('code') code: string) {
    return this.spotifyAuthService.getAccessToken(code);
  }
}
