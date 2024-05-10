import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Db, MongoClient } from 'mongodb';

@Injectable()
export class MongodbService {
  private client: Db;

  constructor(private readonly configService: ConfigService) {}

  async getMongodb() {
    if (!this.client) {
      const uri: string =
        this.configService.get<string>('DATABASE_URI') ||
        'mongodb://localhost:27017';
      const conn = await new MongoClient(uri, {
        authSource: 'admin',
      }).connect();
      const dbName: string =
        this.configService.get<string>('DATABASE_NAME') || 'stock-management';
      this.client = conn.db(dbName);
    }

    return this.client;
  }
}
