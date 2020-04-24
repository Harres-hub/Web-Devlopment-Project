var express=require("express");
var router=express.Router();
var Field=require("../models/field");
var middleware=require("../middleware");

router.get("/",function(req,res){
	Field.find({},function(err,allFields){
		if(err){
			console.log(err)
		}
		else{
			res.render("fields/index",{fields:allFields,currentUser:req.user});
		}
	});
});
router.post("/",middleware.isLoggedIn,function(req,res){
	var name=req.body.name;
	var price=req.body.price;
	var image=req.body.image;
	var desc=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	};
	var newFields={name:name,price:price,image:image,description:desc,author:author};
	
	Field.create(newFields,function(err,newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/fields");
		}
	});
});
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("fields/new");
});
router.get("/:id",function(req,res){
	Field.findById(req.params.id).populate("comments").exec(function(err,foundField){
		if(err){
			cosole.log(err);
		}
		else{
			res.render("fields/show",{field:foundField});
		}
	});
});
router.get("/:id/edit",middleware.checkFieldOwnerShip,function(req,res){
	Field.findById(req.params.id,function(err,foundField){
		res.render("fiels/edit",{field:foundField});
	});
});
router.put("/:id",middleware.checkFieldOwnerShip,function(req,res){
	Field.findByIdAndUpdate(req.params.id,req.body.field,function(err,updatedField){
		if(err){
			res.redirect("/fields");
		}
		else{
			res.redirect("/fields/"+req.params.id);
		}
	})
});

router.delete("/:id",middleware.checkFieldOwnerShip,function(req,res){
	Field.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("fields");
		}
		else{
			res.redirect("/fields");
		}
	});
});

module.exports=router;