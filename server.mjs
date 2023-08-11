import express from 'express'
import morgan from 'morgan'
import expressLayouts from 'express-ejs-layouts'
import languageStrings from './languages.json' assert { type: 'json' }
import indexRouter from './routes/index.mjs'
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
	// Detect user's preferred language from Browser
	const browserLanguage = req.headers['accept-language'].split(',')[0].trim();
	// Default to EN
	if(browserLanguage != "cs-CZ") {
		browserLanguage = "en";
	}
	// Set the language based on the user's preference
	res.locals.language = browserLanguage;
	res.locals.strings = languageStrings[browserLanguage];
	next();
});

app.use((req, res, next) => {
	// Calculate Jan's age
	const age = calculateAge("1991-08-13")
	res.locals.age = age;
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

const port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, () => {});