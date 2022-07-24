/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from 'src/typeorm';
import { FilesService } from './files.service';

@Module({
    imports: [TypeOrmModule.forFeature([Files])],
    controllers: [],
    providers: [FilesService],
    exports:[FilesService]
})
export class FilesModule { }
