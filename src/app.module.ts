import { Module } from '@nestjs/common';
import { DataSeriesModule } from './data-series/data-series.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files, DataSeries } from './typeorm';
import { DataSource } from 'typeorm';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DataSeriesModule,
    FilesModule,
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
