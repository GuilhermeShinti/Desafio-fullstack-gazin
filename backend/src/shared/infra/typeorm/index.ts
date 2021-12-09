import { Connection, createConnection, getConnectionOptions  } from "typeorm";

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    // defaultOptions.host = 'database';
    
    return createConnection(
        Object.assign(defaultOptions, {
            host: 'database',
            database: defaultOptions.database
            // database:
            //     process.env.NODE_ENV === "test"
            //     ? "rentx_test"
            //     : defaultOptions.database,
        })
    );
  };