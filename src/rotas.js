import carroController from './controller/carroController.js';

export default function adicionarRotas(servidor){

    servidor.use(carroController);

}