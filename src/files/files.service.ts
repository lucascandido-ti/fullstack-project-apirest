/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Files } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {

    constructor(
        @InjectRepository(Files)
        private readonly fileRepository: Repository<Files>
    ){}

    create(file: Express.Multer.File, name: string) {
        const fileData = this.fileRepository.create({
            name: name,
            encoding: file.encoding,
            mimetype: file.mimetype,
            destination: file.destination,
            filename: file.filename,
            path: file.path,
            size: file.size,
            originalName: file.originalname
        });
        return this.fileRepository.save(fileData);
    }

    remove(id:number){
        return this.fileRepository.delete(id);
    }

}
