import { Module } from '@nestjs/common';
import { DataSeriesService } from './data-series.service';
import { DataSeriesController } from './data-series.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSeries } from 'src/typeorm';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([DataSeries]),FilesModule],
  controllers: [DataSeriesController],
  providers: [DataSeriesService]
})
export class DataSeriesModule { }
