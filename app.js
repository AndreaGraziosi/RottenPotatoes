const express = require('express')
const app = express()
//models
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

// INITIALIZE BODY-PARSER AND ADD IT TO APP

// The following line must appear AFTER const app = express() and before your routes!
app.use(express.urlencoded({ extended: true }));

const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String,
  description: String
});


// app.js
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');






// app.get('/', (req, res) => {
//   // res.send('Hello World!')
//   res.render('home', { msg: 'Handlebars are Cool!' });

// })
// app.js

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//   { title: "Great Review", movieTitle: "Batman II" },
//   { title: "Awesome Movie", movieTitle: "Titanic" },
//   { title: "The best movie I ever saw!", movieTitle: "Lunch Box" }
// ]

// INDEX
app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})
// app.js

// NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

app.post('/reviews', (req, res) => {
  console.log(req.body);
  // res.render('reviews-new', {});
})
// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})




app.listen(3000, () => {
  console.log('App listening on port 3000!')
})