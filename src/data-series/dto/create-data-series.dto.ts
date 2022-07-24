import { IsString } from 'class-validator';

export class CreateDataSeriesDto {

    @IsString()
    name: string;

}
