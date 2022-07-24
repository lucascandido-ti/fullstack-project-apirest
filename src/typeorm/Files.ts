import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DataSeries } from "./DataSeries";

@Entity()
export class Files{
    
    @PrimaryGeneratedColumn({
        type:'bigint',
        name:'file_id'
    })
    id: number;

    @Column()
    name: string;

    @Column()
    originalName: string;

    @Column()
    encoding: string;

    @Column()
    mimetype: string;

    @Column()
    destination: string;

    @Column()
    filename: string;

    @Column()
    path: string;

    @Column()
    size: number;
    
    @CreateDateColumn()
    created_at: Date;
        
    @UpdateDateColumn()
    updated_at: Date;
    
    @OneToMany(type => DataSeries, data => data.id)
    data_serie: DataSeries;
}