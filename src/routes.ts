import { Router, Request, Response } from 'express';

import { register } from './controllers/UserController'

import cors from 'cors'

const routes = Router();

routes.use(cors());

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: "PRONTO CARALHOOOOO !" })
});

routes.post('/register', register);
//routes.post('/login', login);

//routes.get('/mensagens', getMensagens);

export default routes;