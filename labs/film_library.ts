import Film from './film';
import { open, debugMode } from './db';

export default class FilmLibrary{
    films: Film[] = [];

    constructor(par?: Film | Film[]){
        if(par instanceof Film){
            this.films.push(par);
        } else if(par instanceof Array){
            this.films = par;
        }
    }

    addNewFilm(film: Film){
        this.films.push(film);
        return this;
    }

    print(){
        this.films.forEach( film => film.print());
    }

    sortByDate(){
        this.films.sort((a, b) => {
            if(!a.date) return 1;
            if(!b.date) return -1;
            if(a.date && b.date){
                return a.date.getTime() - b.date.getTime();
            }
            return 0;
        });
        return this;
    }

    deleteFilm(id: number){
        this.films = this.films.filter(film => film.id !== id);
        return this;
    }

    resetWatchedFIlms(){
        this.films.forEach(film => film.date = undefined);
        return this;
    }

    getRated(){
        return this.films.filter(film => film.rating !== undefined);
    }

    static async loadFromDB(): Promise<Film[]>{
        const db = await open();
        const result = await db.all("SELECT * FROM films");
        await db.close();
        result.map((film: any) => {
            new Film(film.id, film.title, film.favorite, film.date, film.rating);
        });
        return result;
    }

    static async getFavoriteeDB(): Promise<Film[]>{
        const db = await open();
        const result = await db.all("SELECT * FROM films WHERE favorite = ?", [1]);
        db.close();
        result.map((film: any) => {
            new Film(film.id, film.title, film.favorite, film.date, film.rating);
        });
        return result;
    }

    static async getWatchedTodayDB(): Promise<Film[]>{
        const db = await open();
        const result = await db.all("SELECT * FROM films WHERE watchdate = ?", [
            new Date(Date.now()).toISOString().split('.')[0].replace('T', ' ')
        ]);
        db.close();
        result.map((film: any) => {
            new Film(film.id, film.title, film.favorite, film.date, film.rating);
        });
        return result;
    }

    static async getEearlyThen(date: string): Promise<Film[]>{
        const db = await open();
        const result = await db.all("SELECT * FROM films WHERE watchdate <= $data ", {"$data": date});
        db.close();
        result.map((film: any) => {
            new Film(film.id, film.title, film.favorite, film.date, film.rating);
        });
        return result;
    }

    static async filterByRating(rating: number): Promise<Film[]>{
        const db = await open();
        const result = await db.all("SELECT * FROM films WHERE rating >= ?", [rating]);
        db.close();
        result.map((film: any) => {
            new Film(film.id, film.title, film.favorite, film.date, film.rating);
        });
        return result;
    }

    static async nameFilter(name: string): Promise<Film[]>{
        const db = await open();
        const result = await db.all("SELECT * FROM films WHERE title LIKE ?", [`%${name}%`]);
        db.close();
        result.map((film: any) => {
            new Film(film.id, film.title, film.favorite, film.date, film.rating);
        });
        return result;
    }

    static async addFilmToDB(film: Film){
        const db = await open();
        const params = {
            "$title": film.title,
            "$favorite": film.favorite,
            "$watchdate": film.date,
            "$rating": film.rating
        }
        const res = await db.run(`
            INSERT INTO films
                (title, favorite, watchdate, rating)
            VALUES ($title, $favorite, $watchdate, $rating)`,
            params
        );
        film.id = res.lastID;
        db.close();
    }

    static async deleteById(id: number | undefined){
        if(id === undefined) return;
        const db = await open();
        const res = await db.run("DELETE FROM films WHERE id = ?", [id]);
        console.log(res);
        if(!!res && res?.changes === 1)
            console.log(`Film with id ${id} was deleted`);
        else
            console.log(`Film with id ${id} was not found`);
        db.close();
    }

    static async resetWatchDate(){
        const db = await open();
        const res = await db.run("UPDATE films SET watchdate = NULL");
        db.close();
        console.log(`Watch date was reset for ${res.changes} films`);
    }
}
