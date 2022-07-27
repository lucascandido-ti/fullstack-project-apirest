import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { DataSeriesService } from './data-series.service';
import { DataSeriesController } from './data-series.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSeries } from 'src/typeorm';
import { FilesModule } from 'src/files/files.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([DataSeries]),
    FilesModule
  ],
  controllers: [DataSeriesController],
  providers: [
    DataSeriesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }
  ]
})
export class DataSeriesModule { }
