
 const express = require("express");
const parser = require("body-parser");
 const app = express();
 app.use(parser.urlencoded({extended: true}));
 app.use(express.static(__dirname));

   var deals = [];
var dealsWork = [];
// app.set('views', __dirname);
// app.engine('html', require('ejs').renderFile);

 app.set('view engine', 'ejs')

 app.get("/", function(req,res){
  
     var day = new Date();
     const options = {
         weekday: "long",
         month: "long",
         day: "numeric"
     }
     var today = day.toLocaleDateString("en-US", options);
res.render("todolist", {theDay:today, newdeals:deals});
 })
 

 app.get("/work", function(request, response){
     response.render("todolist", {theDay:"WorkList", newdeals:dealsWork})
 })

 app.post("/", function (request, response){
     var newDeal = request.body.newDeal;
     var button = request.body.btn;
     if (button === "WorkList") {
        dealsWork.push(newDeal);
        response.redirect("/work")
     }
     else {
             deals.push(newDeal);
    response.redirect("/") }
    console.log(button);
 })




 app.listen(3005, function(){
     console.log("server is running on the port " + 3005);
 })










// if (today === 0) {
//     kindOfDay = "Sunday"
//     kindOfWeek = "Weekend!"
// }
// if (today === 1) {
//     kindOfDay = "Monday =("
//     kindOfWeek = "Weekday"
// }
// if (today === 2) {
//     kindOfDay = "Tuesday"
//     kindOfWeek = "Weekday"
// }
// if (today === 3) {
//     kindOfDay = "Wednesday"
//     kindOfWeek = "Weekday"
// }
// if (today === 4) {
//     kindOfDay = "Thursday"
//     kindOfWeek = "Weekday"
// }
// if (today === 5) {
//     kindOfDay = "Friday"
//     kindOfWeek = "Weekday"
// }
// if (today === 6) {
//     kindOfDay = "Suturday"
//     kindOfWeek = "Weekend!"
// }
// switch (today) {
//     case 0:
//         kindOfDay = "Sunday"    
//         break;
//         case 1:
//             kindOfDay = "Monday"
//             break;
//             case 2:
//                 kindOfDay = "Tuesday"
//                 break;
//                 case 3:
//                     kindOfDay = "wednesday"
//                     break;
//                     case 4:
//                         kindOfDay = "Thursday"
//                         break; 
//                         case 5:
//                             kindOfDay = "Friday"
//                             break;
//                             case 6:
//                                 kindOfDay = "Suturday"
//                                         break;
// }