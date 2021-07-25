
 exports.newDate = () => {
var day = new Date();
     const options = {
         weekday: "long",
         month: "long",
         day: "numeric"
     }
     return day.toLocaleDateString("en-US", options); 
    }
   
