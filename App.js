//npm start to run
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const session = require("express-session");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const port = process.env.PORT || 4000;

const data = require("./control/gdat");

const pool = mysql.createPool({
  connectionLimit: 10,
  connectTimeout: 20,
  host: "localhost",
  user: "root",
  password: "",
  database: "myguitar",
});

app.set("view engine", "ejs");

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "control")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/control/gdat.js", function (req, res) {
  res.setHeader("Content-Type", "text/javascript");
  res.sendFile(__dirname + "/public/js/gdat.js");
});

app.get("/order_electric_guitar", (req, res) => {
  res.render("order_e_g");
});

app.get("/order_bass_guitar", (req, res) => {
  res.render("order_b_g");
});

app.get("/order_acoustic_guitar", (req, res) => {
  res.render("order_a_g");
});

app.get("/cancel", (req, res) => {
  res.render("Cancel");
});

app.get("/success", (req, res) => {
  res.render("Success");
});

app.get("/order_accessories", (req, res) => {
  res.render("order_accessories");
});

app.get("/slip", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query("SELECT * FROM slip", (err, rows) => {
      connection.release();

      if (err) throw err;

      res.render("slip", { slips: rows });
    });
  });
});

app.get("/order", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query("SELECT * from selldata", (err, rows) => {
      connection.release();

      if (!err) {
        obj = { print: rows };
        res.render("testdb", { obj });
      } else {
        console.log(err);
      }
    });
  });
});

app.get("/acoustic_order", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query("SELECT * from selldata_acoustic", (err, rows) => {
      connection.release();

      if (!err) {
        obj = { print: rows };
        res.render("acoustic_db", { obj });
      } else {
        console.log(err);
      }
    });
  });
});

app.get("/accessories_order", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query("SELECT * from selldata_acc", (err, rows) => {
      connection.release();

      if (!err) {
        obj = { print: rows };
        res.render("accdat", { obj });
      } else {
        console.log(err);
      }
    });
  });
});
//Bass and Electric Post
app.post("/order_guitar", (req, res) => {
  const params = req.body;
  res.render("confirm_order", { guitar: params });
});

app.post("/confirm_order", upload.single("photo"), (req, res) => {
  const confirmed = req.body.confirmed;
  const guitar = JSON.parse(req.body.guitar);

  // Check if the user provided an image
  if (!req.file) {
    return res.status(400).send("Please provide an image");
  }

  // Check if the user provided an address
  if (!req.body.address) {
    return res.status(400).send("Please provide an address");
  }

  const image = req.file.buffer.toString("base64"); //get Photo
  const addr = req.body.address; //get address
  console.log(guitar);
  console.log(addr);

  if (confirmed === "true") {
    pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query("INSERT INTO selldata SET ?", [guitar], (err, result) => {
        connection.release();

        if (err) throw err;
        console.log("Data inserted successfully!");

        const insertedId = result.insertId; //get ID
        console.log(`Inserted ID: ${insertedId}`);

        connection.query("SELECT type FROM selldata WHERE id = ?", [result.insertId], (err, rows) => {
          if (err) throw err;
          const guitarType = rows[0].type; //get Type

          // Insert slip data into slip table
          const slipValues = [image, guitarType, insertedId, addr];
          connection.query("INSERT INTO slip (pic, type, typeID, address) VALUES (?, ?, ?, ?)", slipValues, (err, result) => {
            if (err) throw err;
            console.log("Slip inserted successfully!");
            res.render("Success");
          });
        });
      });
    });
  } else if (confirmed === "false") {
    res.render("Cancel");
  } else {
    res.send("Something Went Wrong");
  }
});

//Acoustic Post
app.post("/order_guitar_acoustic", (req, res) => {
  const params = req.body;
  console.log(params);
  res.render("confirm_order_acoustic", { guitar: params });
});

app.post("/confirm_order_acoustic", upload.single("photo"), (req, res) => {
  const confirmed = req.body.confirmed;
  const guitar = JSON.parse(req.body.guitar);

  // Check image
  if (!req.file) {
    return res.status(400).send("Please provide an image");
  }

  // Check address
  if (!req.body.address) {
    return res.status(400).send("Please provide an address");
  }

  const image = req.file.buffer.toString("base64"); //get Photo
  const addr = req.body.address; //get address
  console.log(guitar);
  console.log(addr);

  if (confirmed === "true") {
    pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query("INSERT INTO selldata_acoustic SET ?", [guitar], (err, result) => {
        connection.release();

        if (err) throw err;
        console.log("Data inserted successfully!");
        res.render("Success");

        const insertedId = result.insertId; //get ID
        console.log(`Inserted ID: ${insertedId}`);

        connection.query("SELECT type FROM selldata_acoustic WHERE id = ?", [result.insertId], (err, rows) => {
          if (err) throw err;
          const guitarType = rows[0].type; //get Type

          const slipValues = [image, guitarType, insertedId, addr];
          connection.query("INSERT INTO slip (pic, type, typeID, address) VALUES (?, ?, ?, ?)", slipValues, (err, result) => {
            if (err) throw err;
            console.log("Slip inserted successfully!");
            res.render("Success");
          });
        });
      });
    });
  } else if (confirmed === "false") {
    res.render("Cancel");
  } else {
    res.send("Something Went Wrong");
  }
});

//Accessories part (unfinished)

app.post("/order_guitar_acc", (req, res) => {
  const cart = req.body.cart;
  console.log(cart);

  pool.getConnection((err, connection) => {
    cart.forEach((item) => {
      var sql = "INSERT INTO selldata_acc (type, cost) VALUES (?, ?)";
      var values = [item.name, item.price];
      connection.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("record inserted");
      });
      connection.release();
    });
  });

  console.log("Checkout successful!");

  res.render("confirm_order_acc", { cart: cart }, (err, html) => {
    if (err) throw err;
    res.redirect("/confirm_order_acc"); // redirect to confirm_order_acc page(Not working why? i don't know)
  });
});

app.post("/confirm_order_acc", upload.single("photo"), (req, res) => {
  const confirmed = req.body.confirmed;
  const cart = req.body.cart;
  console.log("test");
  console.log(cart);
  // Check image
  if (!req.file) {
    return res.status(400).send("Please provide an image");
  }

  // Check address
  if (!req.body.address) {
    return res.status(400).send("Please provide an address");
  }

  const image = req.file.buffer.toString("base64"); //get Photo
  const addr = req.body.address; //get address
  console.log(cart);
  console.log(addr);

  if (confirmed === "true") {
    pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query("INSERT INTO selldata_acc (type, cost) VALUES (?, ?)", [cart.name, cart.price], (err, result) => {
        connection.release();

        if (err) throw err;
        console.log("Data inserted successfully!");

        const insertedId = result.insertId; //get ID
        console.log(`Inserted ID: ${insertedId}`);

        connection.query("SELECT type FROM selldata_acc WHERE id = ?", [insertedId], (err, rows) => {
          if (err) throw err;
          const accType = rows[0].type; //get Type

          const slipValues = [image, accType, insertedId, addr];
          connection.query("INSERT INTO slip (pic, type, typeID, address) VALUES (?, ?, ?, ?)", slipValues, (err, result) => {
            if (err) {
              // handle error when inserting slip
              console.error(err);
              return res.status(500).send("Error inserting slip");
            }
            console.log("Slip inserted successfully!");
            res.render("Success");
            A;
          });
        });
      });
    });
  } else if (confirmed === "false") {
    res.render("Cancel");
  } else {
    res.send("Something Went Wrong");
  }
});

//test
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
