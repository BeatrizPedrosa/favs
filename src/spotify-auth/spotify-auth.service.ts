import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import * as qs from 'qs';

@Injectable()
export class SpotifyAuthService {
  constructor(
    private config: ConfigService,
    private httpService: HttpService,
  ) {}

  async getAccessToken(code: string) {
    const clientId = this.config.get('SPOTIFY_CLIENT_ID');
    const clientSecret = this.config.get('SPOTIFY_CLIENT_SECRET');
    const redirectUri = this.config.get('SPOTIFY_REDIRECT_URI');

    const body = qs.stringify({
      grant_type: 'autorization_code',
      code,
      redirect_uri: redirectUri,
    });

    const headers = {
      Authorization:
        'Basic ' +
        Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const response$ = this.httpService.post(
      'https://accounts.spotify.com/api/token',
      body,
      {
        headers,
      },
    );

    const response = await lastValueFrom(response$);
    return response.data;
  }
}
