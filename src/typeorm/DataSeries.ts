import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Files } from "./Files";

/**
 * Eu, pessoalmente chamei esta tabela de "DataSeriesPoints", 
 * pois ela contém os pontos das séries de dados.
 */
@Entity()
export class DataSeries{
    
    @PrimaryGeneratedColumn({
        type:'bigint',
        name:'data_series_id'
    })
    id: number;

    @Column()
    filename: string;

    @Column()
    date: Date;

    @Column()
    value: number;

    // 👍 Bom uso do "ON DELETE CASCADE" na Foreign Key
    @ManyToOne(type => Files, file => file.id, { onDelete: 'CASCADE' })
    file: Files;
}