class Film{
    id: number;
    title: string;
    favorite: boolean;
    date?: Date;
    rating?: number;

    constructor(
        id: number,
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

    static printAll(films: Film[]){
        films.forEach(film => film.print());
    }
}

class FilmLibrary{
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
}

const filmLibrary = new FilmLibrary();

filmLibrary.addNewFilm(new Film(1, "Pulp Fiction", true, new Date(2023, 2, 10), 5));
filmLibrary.addNewFilm(new Film(2, "21 Grams", true, new Date(2023, 2, 17), 4));
filmLibrary.addNewFilm(new Film(3, "Shrek", false));
filmLibrary.addNewFilm(new Film(4, "Star Wars"));
filmLibrary.addNewFilm(new Film(5, "Matrix", false, new Date(2023, 2, 21), 3));
filmLibrary.addNewFilm(new Film(6, "Inception", true, new Date(2023, 2, 25), 4));
filmLibrary.addNewFilm(new Film(7, "The Shawshank Redemption", true, new Date(2023, 2, 28), 5));
filmLibrary.addNewFilm(new Film(8, "The Dark Knight", false));
filmLibrary.addNewFilm(new Film(9, "Interstellar", true, new Date(2023, 3, 5), 4));
filmLibrary.addNewFilm(new Film(10, "The Godfather", false));
filmLibrary.addNewFilm(new Film(11, "The Avengers", true, new Date(2023, 3, 15), 4));
filmLibrary.print();

console.log('------------------- sort by date');
filmLibrary.sortByDate().print();

console.log('------------------- delete film 3');
filmLibrary.deleteFilm(3).print();

console.log('------------------- reset watched');
filmLibrary.resetWatchedFIlms().print();

console.log('------------------- get rated films');
Film.printAll(filmLibrary.getRated());
