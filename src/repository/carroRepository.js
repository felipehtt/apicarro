import con from './connection.js'

export async function inserirCarro(carro){

    const comando = ` 
    
    insert into tb_carros (ds_marca, ds_modelo, nr_ano, vl_preco, dt_inclusao) 
        values (?, ?, ?, ?, ?)
    
    `

    let resposta = await con.query(comando, [carro.marca, carro.modelo, carro.ano, carro.preco, carro.inclusao])

    let info = resposta[0]

    let idCarro = info.insertId

    return idCarro;

}


export async function consultarCarro(){

    const comando = `
    
        select id_carro     id, 
               ds_marca     marca,
               ds_modelo    modelo,
               nr_ano       ano,
               vl_preco     preco,
               img_Carro    imagemCarro,
               dt_inclusao  inclusao
            from tb_carros;

    `

    let resposta = await con.query(comando)

    let registros = resposta[0]

    return registros;

}


export async function alterarCarro(id, carro){

    const comando = `
    
    update tb_carros
        set ds_marca = ?,
            ds_modelo = ?,
            nr_ano = ?,
            vl_preco = ?,
            dt_inclusao = ?
        where id_carro = ?

    `

    let resposta = await con.query(comando, [carro.marca, carro.modelo, carro.ano, carro.preco, carro.inclusao, id])

    let info = resposta[0]

    let linhasAfetadas = info.affectedRows

    return linhasAfetadas;

}


export async function removerCarro(id){

    const comando = ` 
    
    delete from tb_carros
        where id_carro = ?
    
    `

    let resposta = await con.query(comando, [id])

    let info = resposta[0]

    let linhasAfetadas = info.affectedRows

    return linhasAfetadas;

} 


//Imagem do Carro
export async function inserirImagemCarro(id, caminho){

    const comando = `
    UPDATE tb_carro
        SET img_Carro = ? 
        WHERE id_carro = ?              
    `

    let resposta = con.query(comando, [caminho, id]);

    let info = resposta[0];

    let linhasAfetadas = info;

    return linhasAfetadas;

}

