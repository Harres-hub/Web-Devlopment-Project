var express=require("express"),
	app=express(),
	bodyParser=require("body-parser"),
	mongoose=require("mongoose"),
	flash=require("connect-flash"),
	passport=require("passport"),
	LocalStrategy=require("passport-local"),
	methodOverride=require("method-override"),
	Fieldground=require("./models/field"),
	Comment=require("./models/comment"),
	User=require("./models/user"),
	seedDB=require("./seeds");

var commentRoutes=require("./routes/comments"),
	fieldRoutes=require("./routes/fields"),
	indexRoutes=require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_field",{useNewUrlParser:true,useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
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

//Authenticate那几个包自带的方法，这样用一个中间件，
//可以取到req.user，在很多地方可以用到现在登陆的用户是谁。
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/fields/:id/comments",commentRoutes);
app.use("/fields",fieldRoutes);

app.listen(3000,function(){
	console.log("The YelpField sever has started!");
});
