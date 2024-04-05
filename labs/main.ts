import FilmLibrary from "./film_library";
import  Film  from "./film";
import { open } from "./db";
import SQL from 'sql-template-strings';

async function main() {
    const fl = new FilmLibrary();

    const films = await FilmLibrary.loadFromDB();
    console.table(films);

    const favoriteFilms = await FilmLibrary.getFavoriteeDB();
    // console.table(favoriteFilms);

    const watchedToday = await FilmLibrary.getWatchedTodayDB();
    // console.table(watchedToday);

    const earlyFilms = await FilmLibrary.getEearlyThen('2023-03-20');
    // console.table(earlyFilms);

    const highRatedFilms = await FilmLibrary.filterByRating(4);
    // console.table(highRatedFilms);

    const nameFiltered = await FilmLibrary.nameFilter('r');
    // console.table(nameFiltered);

    const film = new Film(undefined, 'The Godfather', true, new Date(Date.now()), 5);
    // film.print();
    await FilmLibrary.addFilmToDB(film);

    await FilmLibrary.deleteById(film.id);

}

main().catch(e => console.error(e));