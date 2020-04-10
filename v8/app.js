var express=require("express"),
	app=express(),
	bodyParser=require("body-parser"),
	mongoose=require("mongoose"),
	passport=require("passport"),
	LocalStrategy=require("passport-local"),
	Campground=require("./models/campground"),
	Comment=require("./models/comment"),
	User=require("./models/user"),
	seedDB=require("./seeds");

var commentRoutes=require("./routes/comments"),
	campgroundRoutes=require("./routes/campgrounds"),
	indexRoutes=require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true,useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
// seedDB();

app.use(require("express-session")({
	secret:"Hello",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	next();
});
// var campgrounds=[
// 		{name:"Beijing",image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579716084315&di=b28b5329e932684b9fd2faa3f2f5e407&imgtype=0&src=http%3A%2F%2Fimg8.zol.com.cn%2Fbbs%2Fupload%2F24424%2F24423921.JPG"},
// 		{name:"Shanghai",image:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=274940466,28484806&fm=26&gp=0.jpg"},
// 		{name:"Shenzhen",image:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3229007297,119669047&fm=26&gp=0.jpg"}
// 	];

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

app.listen(3000,function(){
	console.log("The YelpCamp sever has started!");
});
