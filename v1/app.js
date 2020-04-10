var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var campgrounds=[
		{name:"Beijing",image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579716084315&di=b28b5329e932684b9fd2faa3f2f5e407&imgtype=0&src=http%3A%2F%2Fimg8.zol.com.cn%2Fbbs%2Fupload%2F24424%2F24423921.JPG"},
		{name:"Shanghai",image:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=274940466,28484806&fm=26&gp=0.jpg"},
		{name:"Shenzhen",image:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3229007297,119669047&fm=26&gp=0.jpg"}
	];

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.get("/",function(req,res){
	res.render("landing");
});
app.get("/campgrounds",function(req,res){
	res.render("campgrounds",{campgrounds:campgrounds});
});
app.post("/campgrounds",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var newCampgrounds={name:name,image:image};
	campgrounds.push(newCampgrounds);
	res.redirect("/campgrounds");
});
app.get("/campgrounds/new",function(req,res){
	res.render("new");
});
app.listen(3000,function(){
	console.log("The YelpCamp sever has started!");
});
