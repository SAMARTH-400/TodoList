const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded( {extended: true} ));
app.use( express.static("public") );
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
    name: String
};
const Item = mongoose.model("Item", itemsSchema);

app.get("/",function(_req, res){
    var options = { weekday: 'long', month: 'short', day: 'numeric' };
    var day = new Date();
    day = day.toLocaleDateString("en-US" , options);
    Item.find({}, function (_err, result) {
        res.render("home" , {DAY:day , LIST:result});    
    });
});

app.post("/" , function(req , res){
    new Item({name: req.body.task}).save(function (err){});
    res.redirect("/");
});
app.post("/delete" , function(req , res){
    Item.deleteOne({_id: req.body.remove},function(err){})
    res.redirect("/");
});
app.listen(3000,function(){
    console.log("server initialized at port 3000");
});
