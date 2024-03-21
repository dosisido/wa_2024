import Film from './film';
import DB from './db';
const sqlite = require("aa-sqlite");

export class FilmLibrary{
    films: Film[] = [];

    constructor(){}

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
        await sqlite.open(DB);
        const result = await sqlite.all("SELECT * FROM films");
        sqlite.close();
        result.map((film: any) => {
            new Film(film.id, film.title, film.favorite, film.date, film.rating);
        });
        return result;
    }

    static async getFavoriteeDB(): Promise<Film[]>{
        await sqlite.open(DB);
        const result = await sqlite.all("SELECT * FROM films WHERE favorite = 1");
        sqlite.close();
        result.map((film: any) => {
            new Film(film.id, film.title, film.favorite, film.date, film.rating);
        });
        return result;
    }

    static async getWatchedTodayDB(): Promise<Film[]>{
        await sqlite.open(DB);
        const result = await sqlite.all("SELECT * FROM films WHERE watchdate = date('now')");
        sqlite.close();
        result.map((film: any) => {
            new Film(film.id, film.title, film.favorite, film.date, film.rating);
        });
        return result;
    }
}
