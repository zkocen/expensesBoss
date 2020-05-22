var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var EXPENSES_COLLECTION = 'expenses';

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + '/dist/';
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/test',
  function (err, client) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db();
    console.log('Database connection ready');

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
      var port = server.address().port;
      console.log('App now running on port', port);
    });
  }
);

// EXPENSES API ROUTES BELOW
// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).json({ error: message });
}

/*  "/api/expenses"
 *    GET: finds all expenses
 *    POST: creates a new expense
 */

app.get('/api/expenses', function (req, res) {});

app.post('/api/expenses', function (req, res) {});

/*  "/api/expenses/:id"
 *    GET: find expenses by id
 *    PUT: update expenses by id
 *    DELETE: deletes expenses by id
 */

app.get('/api/expenses/:id', function (req, res) {});

app.put('/api/expenses/:id', function (req, res) {});

app.delete('/api/expenses/:id', function (req, res) {});

/*  "/api/expenses"
 *    GET: finds all expenses
 *    POST: creates a new expenses
 */

app.get('/api/expenses', function (req, res) {
  db.collection(EXPENSES_COLLECTION)
    .find({})
    .toArray(function (err, docs) {
      if (err) {
        handleError(res, err.message, 'Failed to get expenses.');
      } else {
        res.status(200).json(docs);
      }
    });
});

app.post('/api/expenses', function (req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.name) {
    handleError(res, 'Invalid expense input', 'Must provide a name.', 400);
  } else {
    db.collection(EXPENSES_COLLECTION).insertOne(newContact, function (
      err,
      doc
    ) {
      if (err) {
        handleError(res, err.message, 'Failed to create new contact.');
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

// curl -H "Content-Type: application/json" -d '{"id": 1,"name": "","amount": 0,"paidBy": "","month": "","dateEntered": "","recurring": false,"category": "groseries","archived": false}' https://limitless-shore-40407.herokuapp.com/api/expenses
