import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.client = new Redis({
      host: this.configService.get<string>('REDIS_HOST', 'localhost'),
      port: this.configService.get<number>('REDIS_PORT', 6379),
    })
  }

  onModuleDestroy() {
    this.client.disconnect()
  }

  set(key: string, value: string, ttlSeconds: number): Promise<string | null> {
    return this.client.set(key, value, 'EX', ttlSeconds)
  }

  get(key: string): Promise<string | null> {
    return this.client.get(key)
  }

  del(key: string): Promise<number> {
    return this.client.del(key)
  }
}
