import { FilmLibrary } from "./film_library";

async function main() {
    const fl = new FilmLibrary();

    const films = await FilmLibrary.loadFromDB();
    console.table(films);

    const favoriteFilms = await FilmLibrary.getFavoriteeDB();
    console.table(favoriteFilms);

    const watchedToday = await FilmLibrary.getWatchedTodayDB();
    console.table(watchedToday);
    
}

main();