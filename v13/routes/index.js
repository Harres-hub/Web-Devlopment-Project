var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");
router.get("/",function(req,res){
	res.render("landing");
});

router.get("/register",function(req,res){
	res.render("register");
});
router.post("/register",function(req,res){
	var newUser=new User({username:req.body.username});
	//不要把password也当作第一个参数传入，单独做第二个参数，可以hash加盐。
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			return res.render("register")
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome to YelpField, "+user.username);
			res.redirect("/fields");
		});
	});
});
router.get("/login",function(req,res){
	res.render("login");
});
router.post("/login",passport.authenticate("local",
	{
		successRedirect:"/fields",
		failureRedirect:"/login"
	})
	//上面的部分作为中间件，成功就redirect到"/fields"，下面的函数没有执行任何东西。
	,function(req,res){
});
router.get("/logout",function(req,res){
	//都是authenticate那几个包自带的方法。
	req.logout();
	req.flash("success","Logged you out");
	res.redirect("/fields");
});

module.exports=router;