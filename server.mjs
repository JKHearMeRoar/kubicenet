import express from 'express'
import morgan from 'morgan'

import languageStrings from './languages.json' assert { type: 'json' }
import enRouter from './routes/en.js'
const app = express()

// app.use(morgan('dev'))

app.use(express.static('public'));

app.use((req, res, next) => {
  // Detect user's preferred language (you can implement your own logic here)
  const preferredLanguage = req.headers['accept-language'].split(',')[0].trim();
  // Set the language based on the user's preference
  req.language = preferredLanguage;

  next();
});

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

app.use('/js', express.static('./node_modules/bootstrap/dist/js'));

app.set("view engine", "ejs")

app.get('/', (req, res) => {
	const language = req.language || 'en'; // Default to English if language is not set
	const strings = languageStrings[language];
  const age = calculateAge("1991-08-13")
	res.render('index', { language: language, ...strings, age });
  });

// app.use("/en", enRouter)

const port = 3000;
app.set('port', port);
app.listen(port, () => {
  //console.log(`Server is running on port ${port}`);
});