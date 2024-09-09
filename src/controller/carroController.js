import * as db from '../repository/carroRepository.js';

import { Router } from 'express';
const endpoints = Router()

import multer from "multer";


endpoints.post('/carros', async (req, resp) => {

    try {
        
        let carro = req.body

        let id = await db.inserirCarro(carro)

        resp.send({

            idCarro: id

        })

    } 
    catch(err){
        
        resp.status(400).send({

            erro: err.message

        })

    }

})


endpoints.get('/carros', async (req, resp) => {

    try {
        
        let registros = await db.consultarCarro();

        resp.send(registros);


    } 
    catch(err){
    
        resp.status(400).send({

            erro: err.message

        })

    }

})


endpoints.put('/carros/:id', async (req, resp) => {

    try {
        
        let id = req.params.id;

        let carro = req.body;

        let linhasAfetadas = await db.alterarCarro(id, carro)

        if(linhasAfetadas >= 1){

            resp.send();

        }
        else{

            resp.status(404).send({erro: `Nenhum registro alterado.`}) 

        }

    } 
    catch(err){
    
        resp.status(400).send({

            erro: err.message

        })

    }

})


endpoints.delete('/carros/:id', async (req, resp) => {

    try {
        
        let id = req.params.id

        let linhasAfetadas = await db.removerCarro(id)

        if(linhasAfetadas >= 1){

            resp.send();

        }
        else{

            resp.status(404).send({erro: 'Nenhum registro removido.'});

        }

    } 
    catch(err){
    
        resp.status(400).send({

            erro: err.message

        })

    }

})


//Imagem do Carro
let imgCarro = multer({dest: './storage/carroImg'});

endpoints.put('/carros/:id/imagem', imgCarro.single('imagem'), async (req, resp) => {

    try{

        let id = req.params.id;
        let urlImg = req.file.path;
        
        await db.inserirImagemCarro(id, urlImg)

        resp.status(204).send();

    }
    catch(err){

        resp.status(400).send({

            erro: err.message

        })

    }
    
})

export default endpoints;