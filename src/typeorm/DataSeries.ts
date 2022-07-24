import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Files } from "./Files";

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

    @ManyToOne(type => Files, file => file.id, { onDelete: 'CASCADE' })
    file: Files;
}