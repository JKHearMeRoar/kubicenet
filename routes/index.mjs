import express from 'express'
// import router from express.Router();
import languageStrings from '../languages.json' assert { type: 'json' }
const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('index');
});

router.get('/en', (req, res, next) => {
	res.locals.language = "en";
	res.locals.strings = languageStrings[res.locals.language];
	res.render('index');
});

router.get('/cz', (req, res, next) => {
	res.locals.language = "cs-CZ";
	res.locals.strings = languageStrings[res.locals.language];
	res.render('index');
});

export default router;