const express = require("express");
const path = require('path')
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser')
app.use (bodyParser.json())
// const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json({ type: 'application/*+json' }))
const file =[]
//Endpoint to get a list of user
app.get('/getuser',(req,res)=>{
    console.log("hit");
    
    const file =  fs.readFile(path.resolve(__dirname,"./TokenList.json"),'utf8',function(err,data){
        console.log("data",data);
    
        res.send(data);
        // return data
       

    // })
}) 
console.log("file",file);

});
app.put('/update',function(req,res){
  console.log("hit",req.body);
  const temp = req.body
  fs.readFile(path.resolve(__dirname,"./TokenList.json"),'utf8',function(err,data){
    console.log("data",data);
    var json = JSON.parse(data);

    json.push(temp)
    console.log("dataaaa",json);
    fs.writeFile(path.resolve(__dirname,"./TokenList.json"),JSON.stringify(json),()=>{
    console.log("dtatataat",data);
    })
    res.status(200).json({
      success:true,
      
    })
    // res.send("success");
}) 
//   fs.appendFile(path.resolve(__dirname,'./TokenList.json'),JSON.stringify(req.body),'utf8',function(err,data){
//     console.log("data",data);
//     res.end(data);

 })
// });
//  fs.appendFile("./TokenList.json",req.body,'utf8',function(err){
//      if(err)throw err
//      console.log('saved')
//      res.end("append")

// })
// })

var server = app.listen(5000, ()=>{
    console.log("server is listen on port 5000")
})
    
