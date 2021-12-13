import { Connection, createConnection, getConnectionOptions  } from "typeorm";

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    
    return createConnection(
        Object.assign(defaultOptions, {
            host: process.env.DATABASE_HOST,
            database: defaultOptions.database
        })
    );
  };