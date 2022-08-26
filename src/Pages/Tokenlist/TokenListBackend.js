var express = require("express");
const path = require("path");
var app = express();
var bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/Tokenlist", function (req, res) {
  console.log("HIT");
  fs.readFile(
    path.resolve(__dirname, "./List_Token/TokenList.json"),
    "utf-8",
    function (err, data) {
      console.log(data);
      console.log(err);
      res.end(data);
    }
  );
});

app.put("/updateTokenList", function (req, res) {
  console.log("Update Function");
  console.log(req.body);
  // fs.appendFile(path.resolve(__dirname, "./List_Token/TokenList.json"), JSON.stringify(req.body), 'utf-8', function(err,data){
  //     console.log("data",data);
  //     console.log(err);
  //     // res.send("dataa",data);
  //     res.status(200).json({
  //         success: true,
  //     })
  // })

  fs.readFile(
    path.resolve(__dirname, "./List_Token/TokenList.json"),
    "utf-8",
    function (err, data) {
      var json = JSON.parse(data);
      json.push(req.body);
      console.log(">>>>>>>>>>>>>>>>>>", json);
      fs.writeFile(
        path.resolve(__dirname, "./List_Token/TokenList.json"),
        JSON.stringify(json),
        () => {
          console.log("Data");
        }
      );
      res.status(200).json({
        success: true,
      });
    }
  );
});

const server = app.listen(5000, () => {
  console.log(`Server is working on 5000`);
});
