
const express = require('express')

const methodOverride = require('method-override')
const app = express()
//models
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))


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
  res.render('reviews-new', {title: "New Review"});
})

// app.post('/reviews', (req, res) => {
//   console.log(req.body);
  // res.render('reviews-new', {});
// })
// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message);
  })
})

// SHOW
app.get('/reviews/:id', (req, res) => {
  // res.send('I\'m a review')
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})

// EDIT
app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review, title: "Edit Review"});
  })
})
  


// UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})


app.listen(3000, () => {
  console.log('App listening on port 3000!')
})