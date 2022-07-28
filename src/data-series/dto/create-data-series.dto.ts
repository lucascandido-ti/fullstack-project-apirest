import { IsString } from 'class-validator';

// 👍 Bom uso do pattern de validação com DTOs do Nest
export class CreateDataSeriesDto {

    @IsString()
    name: string;

}
