import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, BadRequestException, CacheInterceptor } from '@nestjs/common';
import { DataSeriesService } from './data-series.service';
import { CreateDataSeriesDto } from './dto/create-data-series.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileTypeFilter } from 'src/common/helper/FileTypeValidation';

@Controller('data-series')
@UseInterceptors(CacheInterceptor)
export class DataSeriesController {
  constructor(private readonly dataSeriesService: DataSeriesService) { }

  @Post('upload')
  // 👍 Boa demonstração de conhecimento do upload de arquivos com o FileInterceptor / multer
  @UseInterceptors(FileInterceptor('file', { storage: diskStorage({ destination: './files' }), fileFilter: fileTypeFilter }))
  uploadFile(@Req() req, @UploadedFile() file: Express.Multer.File, @Body() createDataSeriesDto: CreateDataSeriesDto) {
    if (!file || req.fileTypeValidationError) {
      throw new BadRequestException('Arquivo de formatação inválida');
    }
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
