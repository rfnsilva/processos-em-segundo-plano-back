import Queue from 'bull';
import redisConfig from '../config/redis';

import * as jobs from '../jobs';

const filas = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, { redis: { host: redisConfig.host, port: redisConfig.port, password: 'root' } }),
  name: job.key,
  handle: job.handle
}));

export default {
  filas,
  add(name, data) {
    const fila = this.filas.find(queue => queue.name === name);

    return fila.bull.add(data);
  },
  process() {
    return this.filas.forEach(fila => {
      fila.bull.process(fila.handle);

      fila.bull.on('failed', (job, err) => {
        console.log(fila.name)
        console.log(err)
      })
    });
  }
}