import { connectToDatabase } from './db/mongodb';

async function main() {
  try {
    await connectToDatabase();
    console.log('Base de datos conectada exitosamente');
  } catch (error) {
    console.error('Error al conectar la base de datos:', error);
    process.exit(1);
  }
}

main();