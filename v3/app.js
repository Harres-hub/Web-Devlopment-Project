var express=require("express"),
	app=express(),
	bodyParser=require("body-parser"),
	mongoose=require("mongoose"),
	Campground=require("./models/campground"),
	seedDB=require("./seeds")
	// Comment=require("./models/comment"),


mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true,useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
seedDB();
// var campgrounds=[
// 		{name:"Beijing",image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579716084315&di=b28b5329e932684b9fd2faa3f2f5e407&imgtype=0&src=http%3A%2F%2Fimg8.zol.com.cn%2Fbbs%2Fupload%2F24424%2F24423921.JPG"},
// 		{name:"Shanghai",image:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=274940466,28484806&fm=26&gp=0.jpg"},
// 		{name:"Shenzhen",image:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3229007297,119669047&fm=26&gp=0.jpg"}
// 	];

app.get("/",function(req,res){
	res.render("landing");
});
app.get("/campgrounds",function(req,res){
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err)
		}
		else{
			res.render("index",{campgrounds:allCampgrounds});
		}
	});
});
app.post("/campgrounds",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var newCampgrounds={name:name,image:image,description:desc};
	Campground.create(newCampgrounds,function(err,newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		}
	});
});
app.get("/campgrounds/new",function(req,res){
	res.render("new");
});
app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			cosole.log(err);
		}
		else{
			res.render("show",{campground:foundCampground});
		}
	});
});
app.listen(3000,function(){
	console.log("The YelpCamp sever has started!");
});
