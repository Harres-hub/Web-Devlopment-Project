var Field=require("../models/field");
var Comment=require("../models/comment");
var middlewareObj={};

middlewareObj.checkFieldOwnerShip=function(req,res,next){
	if(req.isAuthenticated()){
	   Field.findById(req.params.id,function(err,foundField){
			if(err){
				req.flash("error","Field not found");
				res.redirect("back");
			}
			else{
				if(foundField.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error","You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	}
	else{
		req.flash("error","Please Login First");
		res.redirect("back");
	}
}
middlewareObj.checkCommentOwnerShip=function checkCommentOwnerShip(req,res,next){
	if(req.isAuthenticated()){
	   Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				res.redirect("back");
			}
			else{
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error","You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	}
	else{
		req.flash("error","Please Login First!");
		res.redirect("back");
	}
}
middlewareObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Please Login First!");
	res.redirect("/login");
}

module.exports=middlewareObj;