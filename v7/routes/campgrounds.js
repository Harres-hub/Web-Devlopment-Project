var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
router.get("/",function(req,res){
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err)
		}
		else{
			res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
		}
	});
});
router.post("/",function(req,res){
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
router.get("/new",function(req,res){
	res.render("campgrounds/new");
});
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			cosole.log(err);
		}
		else{
			res.render("campgrounds/show",{campground:foundCampground});
		}
	});
});
module.exports=router;