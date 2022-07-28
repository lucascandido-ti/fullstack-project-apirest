import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { FilesService } from 'src/files/files.service';
import { Files, DataSeries } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateDataSeriesDto } from './dto/create-data-series.dto';

@Injectable()
export class DataSeriesService {

  constructor(
    @InjectRepository(DataSeries)
    private readonly dataRepository: Repository<DataSeries>,
    private readonly fileServices: FilesService,
  ) { }

  // 👍 Gostei da demonstração de uso da API de QueryBuilder do TypeORM
  findAll() {
    /**
     * 👎 O método de cálculo da média não está correto
     * 
     * Será que é suficiente apenas dividir a soma dos pontos pelo total?
     * Por se tratar de uma série de dados temporal, a diferença de tempo entre 2 pontos 
     * consecutivos deveria ser levada em consideração no cálculo.
     * 
     * Por exemplo, para a série do arquivo "aee613210da0a66a185526a3785e5c7b", a média da série 
     * deveria ser -50.1319444444444, porém o resultado utilizando o método abaixo é -50 cravado.
     */
    return this.dataRepository.createQueryBuilder('files')
      .innerJoinAndSelect('files.file', 'data_series')
      .select([
        'file_id                            as fileId',
        'name                               as name',
        'count(value)                       as qtdpoint',
        'ROUND((SUM(value)/count(value)),2) as average',
        'MAX(date)	 	                      as maxdate',
        'MIN(date)	 			  				        as mindate',
        'created_at	 			  				        as create_at',
        'original_name                       as originalName'
      ])
      .groupBy('file_id')
      .getRawMany();
  }

  async findOne(id: number) {
    var series = await this.findAll();

    var data_series = await this.dataRepository.createQueryBuilder('data_series')
      .leftJoinAndSelect('data_series.file', 'files')
      .select(['data_series.*', 'max(name) as file_name'])
      .where("data_series.fileId = :fileId", { fileId: id })
      .groupBy('data_series_id')
      .getRawMany();

    var serie;
    data_series.map(item => {
      serie = series.filter(serie => serie.fileId == item.fileId);
    })

    return { serie, data_series }
  }

  remove(id: number) {
    return this.fileServices.remove(id);
  }

  async readFile(file: Express.Multer.File, createDataDto: CreateDataSeriesDto): Promise<Files> {
    /**
     * 👎 Esta sequência de operações não é atômica
     * 
     * O que acontece se a aplicação salvar o arquivo na tabela "files", mas não
     * conseguir salvar as séries de dados?
     * 
     * Isto poderia ser feito dentro de uma transação, e o TypeORM já faz isso ao
     * se usar a API de [cascades](https://typeorm.io/relations#cascades).
     */
    const csvFile = readFileSync(file.path);
    var fileSaved = await this.fileServices.create(file, createDataDto.name);

    var content = csvFile.toString().split('\n');

    content.map(item => {
      var data = item.split(',');
      if ((new Date(data[0])).toString() !== 'Invalid Date') {
        var Dataseries = this.dataRepository.create({
          file: fileSaved,
          filename: file.originalname,
          date: new Date(data[0]),
          value: parseFloat(data[1]),
        })
        this.dataRepository.save(Dataseries);
      }
    })

    return fileSaved;
  }
}
