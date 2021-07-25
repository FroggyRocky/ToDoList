
 const express = require("express");
const parser = require("body-parser");
 const app = express();
 const mongoose = require("mongoose");
 const _ = require("lodash")
 const modulesFile = require(__dirname + "/modules.js")
 app.use(parser.urlencoded({extended: true}));
 app.use(express.static(__dirname));
let today = modulesFile.newDate();
 
mongoose.connect("mongodb+srv://Danila:PASSWORD@cluster0.8k3do.mongodb.net/todolistDB", {userNewUrlParser:true})

const itemsSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    }
})
const itemsCollection = mongoose.model("item", itemsSchema)

const listsSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    }, 
    items:[itemsSchema]
})
const listsCollection = mongoose.model("list", listsSchema)




const item3 = new itemsCollection ({
    name:"welcome to your own todolist"
});
const defaultOptions = [item3];

// itemsCollection.insertMany([item1,item2,item3], (err)=>{
//   err ? console.log(err) : console.log("success")
//  })

   
var deals = [];
var dealsWork = [];
// app.set('views', __dirname);
// app.engine('html', require('ejs').renderFile);

 app.set('view engine', 'ejs')

 app.get("/", function(req,res){

    itemsCollection.find({}, { __v:0},  function(err, itemsFound) {
        if (itemsFound.length == 0) {
itemsCollection.insertMany(defaultOptions, (err) => {
err ? console.log(err) : console.log("default items inserted successfully")});
res.redirect("/"); 
} else {
        
res.render("todolist", {theDay:today, newdeals:itemsFound}); 

}
 });  
});

 app.get("/:param", function(req,res){
const parameter = _.capitalize(req.params.param);

listsCollection.findOne({name:parameter},(err,foundItem)=>{
 if(err) {
     console.log(err);
 } if(!foundItem) {
  const list = new listsCollection({
    name:parameter, 
    items:defaultOptions 
}); 

   list.save();
   res.redirect(`/${parameter}`)
  
} else {
  res.render("todolist", {theDay:foundItem.name, newdeals:foundItem.items})
}

console.log(foundItem);
})

}); 

 app.post("/", function (request, response){
     let newDeal = request.body.newDeal;
     let button = request.body.btn; 
     const item = new itemsCollection({
         name:newDeal
     })

    if(button === today) {
item.save();
response.redirect("/"); 
    }
     else {
listsCollection.findOne({name:button}, (err,foundList)=>{
    
foundList.items.push(item)
foundList.save();
response.redirect(`/${button}`)
});
    }

    

//  if (button === "WorkList") {
    //     dealsWork.push(newDeal);
    //     response.redirect("/work");
    //  }
    //  else {
    //          deals.push(newDeal);
    // response.redirect("/") }

    }); 


    app.post("/delete", function (req,res) {
        let list = req.body.list
        const bodyCheckBox = req.body.checkbox;
        if(list === today) {
        itemsCollection.deleteOne({_id:bodyCheckBox},function(err) {
            err ? console.log(err) : res.redirect(`/${list}`)
        });
        } else {
            listsCollection.findOneAndUpdate({name:list}, {$pull:{items:{_id:bodyCheckBox}}},(err,foundItem)=>{
               
               res.redirect(`/${list}`)
            
            })
        }
    })

 app.get("/completed", (req,res)=> {
     res.render("todolist.ejs",  )
 })




 app.listen(3005, function(){
     console.log("server is running on the port " + 3005);
 })