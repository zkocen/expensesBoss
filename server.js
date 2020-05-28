var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var EXPENSES_COLLECTION = "expenses";
var CM_COLLECTION = "currentMonth";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// expenses API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({
    "error": message
  });
}

/*  "/api/expenses"
 *    GET: finds all expenses
 *    POST: creates a new expense
 */

app.get("/api/expenses", function (req, res) {
  db.collection(EXPENSES_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get expenses.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/expenses", function (req, res) {
  var newExpense = req.body;
  newExpense.createDate = new Date();

  if (!req.body.amount) {
    handleError(res, "Invalid user input", "Must provide amount.", 400);
  } else {
    db.collection(EXPENSES_COLLECTION).insertOne(newExpense, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new expense.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/currentMonth"
 *  GET: finds currentMonth
 *  POST: creates a new currentMonth
 */

app.get("/api/currentMonth", function (req, res) {
  db.collection(CM_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get currentMonth.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/currentMonth", function (req, res) {
  var newExpense = req.body;
  newExpense.createDate = new Date();

  if (!req.body.id) {
    handleError(res, "Invalid user input", "Must provide an id.", 400);
  } else {
    db.collection(CM_COLLECTION).insertOne(newExpense, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new currentMonth.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});



/*  "/api/expenses/:id"
 *    GET: find expense by id
 *    PUT: update expense by id
 *    DELETE: deletes expense by id
 */

app.get("/api/expenses/:_id", function (req, res) {
  db.collection(EXPENSES_COLLECTION).findOne({
    _id: new ObjectID(req.params.id)
  }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get expense");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/expenses/:id", function (req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(EXPENSES_COLLECTION).replaceOne({
    _id: new ObjectID(req.params.id)
  }, updateDoc, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update expense");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/expenses/:_id", function (req, res) {
  db.collection(EXPENSES_COLLECTION).deleteOne({
    _id: new ObjectID(req.params.id)
  }, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete expense");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
// curl -H "Content-Type: application/json" -d '{"id": 1,"name": "","amount": 0,"paidBy": "","month": "","dateEntered": "","recurring": false,"category": "groseries","archived": false}' https://limitless-shore-40407.herokuapp.com/api/expenses
