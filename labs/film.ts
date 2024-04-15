import FilmLibrary from "./film_library";

export default class Film{
    id: number | undefined;
    title: string;
    favorite: boolean;
    date?: Date;
    rating?: number;

    constructor(
        id: number | undefined,
        title: string,
        favorite: boolean = false,
        date?: Date,
        rating?: number
    ){
        this.id = id;
        this.title = title;
        this.favorite = favorite;
        this.date = date;
        this.rating = rating;
    }

    print(){
        console.log(`Id: ${this.id}, Title: ${this.title}, Favorite: ${this.favorite}, Watch Date: ${this.date || '<not defined>'}, Score: ${this.rating || '<not defined>'}`);
    }

    async save(){
        await FilmLibrary.save(this);
    }

    static printAll(films: Film[]){
        films.forEach(film => film.print());
    }
}