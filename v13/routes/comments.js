var express=require("express");
var router=express.Router({mergeParams:true});
var Field=require("../models/field");
var Comment=require("../models/comment");
var middleware=require("../middleware");

router.get("/new",middleware.isLoggedIn,function(req,res){
	Field.findById(req.params.id,function(err,field){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new",{field:field});
		}
	});
});
router.post("/",middleware.isLoggedIn,function(req,res){
	Field.findById(req.params.id,function(err,field){
		if(err){
			console.log(err);
			res.redirect("/fields")
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					req.flash("error","Something went wrong");
					console.log(err);
				}
				else{
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					comment.save();
					field.comments.push(comment);
					field.save();
					req.flash("success","Successfully added comment");
					res.redirect("/fields/"+field._id);
				}
			});
		}
	});
});
router.get("/:comment_id/edit",middleware.checkCommentOwnerShip,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.render("comments/edit",{field_id:req.params.id,comment:foundComment});
		}
	});
});
router.put("/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.redirect("/fields/"+req.params.id);
		}
	});
});
router.delete("/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back");
		}
		else{
			req.flash("success","Comment deleted");
			res.redirect("/fields"+req.params.id);
		}
	});
});

module.exports=router;