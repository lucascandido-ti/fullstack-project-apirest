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
    // 👍 Boa demonstração de conhecimento do sistema de injeção de dependência do Nest
    FilesModule
  ],
  controllers: [DataSeriesController],
  providers: [
    DataSeriesService,
    {
      provide: APP_INTERCEPTOR,
      // 👍 Gostei do uso de caching do Nest para aliviar a API
      useClass: CacheInterceptor,
    }
  ]
})
export class DataSeriesModule { }
