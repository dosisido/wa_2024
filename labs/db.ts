import sqlite3 from 'sqlite3'
import { open as ThisOpen, Database, Statement } from 'sqlite'

const DATABASE_PATH =  "./labs/films.db";

export async function open() : Promise<Database<sqlite3.Database, sqlite3.Statement>>{
    try{
        return await ThisOpen({
            filename: DATABASE_PATH,
            driver: sqlite3.Database
        });
    }catch(e){
        console.error(e);
        throw e;
    }
}

export const debugMode = () => {
    sqlite3.verbose();
}