import { Module } from '@nestjs/common';
import { DataSeriesModule } from './data-series/data-series.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files, DataSeries } from './typeorm';
import { DataSource } from 'typeorm';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    DataSeriesModule,
    FilesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'api_rest_dashboard',
      entities: [DataSeries,Files],
      synchronize: true
    })],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
