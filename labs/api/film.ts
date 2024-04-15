import express, { Express, Request, Response } from 'express';
import Film from '../film';
import FilmLibrary from '../film_library';
import { body, check, matchedData, validationResult } from 'express-validator';


const router_films = express.Router();
const router_film = express.Router({ mergeParams: true });



router_films.get('/all', async (req: Request, res: Response) => {
    const films = await FilmLibrary.getAll();
    res.json(films);
});

router_films.get("/retrieve/favorite", async (req: Request, res: Response) => {
    const favoriteFilms = await FilmLibrary.getFavoriteDB();
    res.json(favoriteFilms);
});

router_films.get("/retrieve/best", async (req: Request, res: Response) => {
    const bestFilms = await FilmLibrary.filterByRating(5);
    res.json(bestFilms);
});

router_films.get("/retrieve/lastmonth", async (req: Request, res: Response) => {
    const lastMonthFilms = new FilmLibrary(await FilmLibrary.getAll()).getByDateRange(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date());
    res.json(lastMonthFilms);
});

router_films.get("/retrieve/unseen", async (req: Request, res: Response) => {
    const unseenFilms = new FilmLibrary(await FilmLibrary.getAll()).getByWatchDate(null);
    res.json(unseenFilms);
});

router_films.put('/', async (req: Request, res: Response) => {
    const { title, favorite, date, rating } = req.body;
    const film = new Film(undefined, title, favorite, date, rating);
    await film.save();
    res.status(201);
});


// ---------------------------------- Film ----------------------------------

router_films.use('/:id', router_film);
router_film.use(
    check('id')
    .isInt({ min: 1 })
    .withMessage('Invalid id')
    .toInt()
    .withMessage('Id must be an integer'),
    async (req: Request, res: Response, next: Function) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors);
        }

        const { id } = matchedData(req);
        const film = await FilmLibrary.getById(id);
        if(!film){
            return res.status(404).send('Film not found');
        }
        res.locals.film = film;
        next();
        return;
    }
);

router_film.get('/', async (req: Request, res: Response) => {
    const film: Film = res.locals.film;
    res.json(film);
});

router_film.post('/mark', async (req: Request, res: Response) => {
    const film: Film = res.locals.film;    
    film.favorite = true;
    await FilmLibrary.save(film);
    res.status(200).send('Film marked as favorite');
});

router_film.post('/rating',
    body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
    .toInt().withMessage('Rating must be an integer'),
    async (req: Request, res: Response) => {
        const film: Film = res.locals.film;
        const rating: number = matchedData(req).rating;

        if(!film.rating) return res.status(400).send('Film has no rating');
        film.rating += rating;
        film.rating = Math.min(5, film.rating)
        await FilmLibrary.save(film);
        res.status(200).send('Rating added');
    }
);

router_film.post('/update', async (req: Request, res: Response) => {
    console.log(req.body);
    const { title, favorite, date, rating } = req.body;
    const film: Film = res.locals.film;

    film.title = title ?? film.title;
    film.favorite = favorite ?? film.favorite;
    film.date = date ?? film.date;
    film.rating = rating ?? film.rating;

    film.print();
    await film.save();
    res.status(200).send('Film updated');
});

router_film.delete('/', async (req: Request, res: Response) => {
    const { id } = matchedData(req); 
    await FilmLibrary.deleteById(id);
    res.status(200).send('Film deleted');
});



export default router_films;