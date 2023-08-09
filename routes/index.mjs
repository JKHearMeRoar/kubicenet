import express from 'express'
// import router from express.Router();
const router = express.Router();

/*const locals = {
		// language: language,
		// strings: strings,
		// age: age
		test: "test"
	}
*/
router.get('/', (req, res, next) => {
	console.log(req.locals);
	// res.render('index', locals);
	res.render('index');
});

router.get('/en', (req, res, next) => {
	res.render('index', locals);
});

export default router;