import mongoose from 'mongoose';
import app, { addPlugins, addRoutes } from './app';
import { DATABASE_URL, PORT } from './env';

addPlugins();
addRoutes();

mongoose.set('strictQuery', false);
mongoose.set('strictPopulate', true);

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    app.listen({ port: PORT }, (err, address) => {
      if (err) {
        console.error(err.message);
        return process.exit(1);
      }
      console.log(
        `\x1b[1m\x1b[33m[fastify] \x1b[0mServer is running at \x1b[1m\x1b[34m${address}\x1b[0m`
      );
    });
  })
  .catch((err) => {
    console.error(err.message);
    return process.exit(1);
  });
