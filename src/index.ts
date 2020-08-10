import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import * as bodyParser from "body-parser";
import routes from "./routes";
import * as dotenv from 'dotenv';

import bullBoard from 'bull-board';
import Fila from './lib/Fila';

const app = express();
bullBoard.setQueues(Fila.filas.map(fila => fila.bull));

app.use(bodyParser.json());

app.use('/admin/queues', bullBoard.UI);
app.use(routes);

dotenv.config(); 
createConnection();

app.listen(process.env.PORT || 3333);