import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { DataSeriesService } from './data-series.service';
import { CreateDataSeriesDto } from './dto/create-data-series.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('data-series')
export class DataSeriesController {
  constructor(private readonly dataSeriesService: DataSeriesService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: diskStorage({ destination: './files' }) }))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createDataSeriesDto: CreateDataSeriesDto) {
    return this.dataSeriesService.readFile(file, createDataSeriesDto);
  }

  @Get()
  findAll() {
    return this.dataSeriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataSeriesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataSeriesService.remove(+id);
  }
}
