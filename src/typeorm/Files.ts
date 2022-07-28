import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DataSeries } from "./DataSeries";

/**
 * Não sei se concordo com a nomenclatura das entidades aqui.
 * 
 * Na minha opinião, esta entidade está misturando informações sobre a série de dados em si, 
 * e o formato (i.e. arquivo) através do qual ela foi cadastrada.
 * 
 * Eu, pessoalmente chamei esta tabela de "DataSeries", 
 * pois ela contém as informações das séries de dados.
 */
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
    original_name: string;

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