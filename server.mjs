import express from 'express'
import morgan from 'morgan'
import expressLayouts from 'express-ejs-layouts'
import languageStrings from './languages.json' assert { type: 'json' }
import indexRouter from './routes/index.mjs'
// import enRouter from './routes/en.js'
const app = express()

// app.use(morgan('dev'))

app.use(express.static('public'));

// Function calculateAge return age in years based on input in 1991-08-13 format
function calculateAge(birthday) {
	const birthDate = new Date(birthday)
	const today = new Date()
	let age = today.getFullYear() - birthDate.getFullYear()
	const month = today.getMonth() - birthDate.getMonth()
	if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
		age--
	}
	return age
}

app.use((req, res, next) => {
	// Detect user's preferred language (you can implement your own logic here)
	const browserLanguage = req.headers['accept-language'].split(',')[0].trim();
	// Set the language based on the user's preference
	req.language = browserLanguage;
	console.log(req.language);
	req.strings = languageStrings[browserLanguage];
	// console.log(req.language);
	// app.locals.language = preferredLanguage;

	next();
});

app.use((req, res, next) => {
	const age = calculateAge("1991-08-13")
	req.age = age;
	// console.log(age);
	next();
});

app.use('/js', express.static('./node_modules/bootstrap/dist/js'));

app.use(expressLayouts);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', indexRouter);

app.use((req, res, next) => {
	res.status(404).render('404', { page: 'Page not found' });
});

/*

app.get('/', (req, res) => {
	const language = req.language || 'en'; // Default to English if language is not set
	const strings = languageStrings[language];
	const age = calculateAge("1991-08-13")
	res.render('the-view', { language: language, ...strings, age });
	});
*/
// app.use("/en", enRouter)

const port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, () => {
	//console.log(`Server is running on port ${port}`);
});