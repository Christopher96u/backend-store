import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  @Inject(ConfigService) public configService: ConfigService;
  getHello(): string {
    const mode = this.configService.get('MODE');

    return `Running on ${mode} mode in port ${this.configService.get('PORT')}`;
  }
}
