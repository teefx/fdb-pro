const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.full_name.split(" ")[0];
  const lastName = req.body.full_name.split(" ")[1];
  const email = req.body.email_address;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          PHONE: req.body.phone_number,
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us12.api.mailchimp.com/3.0/lists/06c2fc061f";

  const options = {
    method: "POST",
    auth: "synbyte01:c227009d09870aceeacc4cd11b37c571-us12",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.send("/success.html");
    } else {
      res.send("/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
  console.log(data.members[0]);
  // res.send("Thanks for submitting your name");
});

//MAILCHIMP API FOR CONTACT US

app.post("/HTML/contactUs.html", function (req, res) {
  const name = req.body.name;

  const email = req.body.email;
  const address = req.body.address;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          ADDRESS: address,
          FNAME: name,
          LNAME: name,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us12.api.mailchimp.com/3.0/lists/06c2fc061f";

  const options = {
    method: "POST",
    auth: "synbyte01:c227009d09870aceeacc4cd11b37c571-us12",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.send("/success.html");
    } else {
      res.send("/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
  console.log(data.members[0]);
  // res.send("Thanks for submitting your name");
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
