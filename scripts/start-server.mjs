
   
import { createServer } from 'lwr';

process.on('uncaughtException', err => {
  console.error(err);
});

createServer()
    .listen(({ port, serverMode }) => {
        console.log(`App listening on port ${port} in ${serverMode} mode\n`);
    })
    .catch((err) => {
        console.error(err);
        // process.exit(1);
    });