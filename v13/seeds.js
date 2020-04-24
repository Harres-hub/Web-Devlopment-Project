var mongoose=require("mongoose");
var Field=require("./models/field");
var Comment=require("./models/comment");
var data=[
	{name:"Beijing",image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579716084315&di=b28b5329e932684b9fd2faa3f2f5e407&imgtype=0&src=http%3A%2F%2Fimg8.zol.com.cn%2Fbbs%2Fupload%2F24424%2F24423921.JPG",description:"The capital and political center of China."},{name:"Shanghai",image:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=274940466,28484806&fm=26&gp=0.jpg"},
{name:"Shenzhen",image:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3229007297,119669047&fm=26&gp=0.jpg"}
];

function seedDB(){
	Field.remove({},function(err){
		if(err){
			console.log(err);
		}
		console.log("Removed fields");
		Comment.remove({}, function(err) {
			if(err){
			console.log(err);
			}
			console.log("Removed comments");
			data.forEach(function(seed){
				Field.create(seed,function(err,field){
					if(err){
						console.log(err);
					}
					else{
						console.log("Added a field");
						Comment.create(
							{text:"Nice place!",author:"Harres"},function(err,comment){
								if(err){
									console.log(err);
								}
								else{
									field.comments.push(comment);
									field.save();
									console.log("create");
								}
							});
					}
				});
			});
		});
	});
}
module.exports=seedDB;
