/*********************************************************************************
* WEB322 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name:Swarnjeet kaur ______________________ Student ID:139963201 ______________ Date:7 March 2022
*
* Online (Heroku) Link:
*
********************************************************************************/

const reqie = require("require");
const app1 = reqie();
const express = require("express");
const app = express();
const multer = require("multer")
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const HTTP_PORT = process.env.PORT || 8080;
const exphbs = require('express-handlebars');
cloudinary.config({
 cloud_name: 'Cloud Name',
 api_key: 'API Key',
 api_secret: 'API Secret',
 secure: true
 });
 // no {storage: storage}
 const upload = multer();
 app.post('/posts/add', fileUpload.single("featureImage"), function (req, res) {
 res.redirect('/images');
	} );
	 let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

       streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
};

app.get("/posts/:id", function(req,res) {
        if (isNaN(req.params.id)) {
        
        res.redirect("/posts");    
    } else {
        service.getPostById(req.params.id)
        .then(function(value) {
            res.render('posts', {post: value});
        })
        .catch(function(err) {
            res.render('post', {message: err});
        });
    }
});

app.engine('.hbs', exphbs({ 
    extname: '.hbs', 
    defaultLayout: 'main',
    helpers: {
        // helper function for changing the navbar
        navLink: function(url, options) {
            return '<li' + 
                ((url == app.locals.activeRoute) ? ' class="active" ' : '') + 
                '><a href="' + url + '">' + options.fn(this) + '</a></li>';
        },
        equal: function(lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }
    } 
}));

app.get("/categories/:id", function(req,res) {
        if (isNaN(req.params.id)) {
        
        res.redirect("/categories");    
    } else {
        service.getCategoryById(req.params.id)
        .then(function(value) {
            res.render('categories', {category: value});
        })
        .catch(function(err) {
            res.render('category', {message: err});
        });
    }
});

app.set('view engine', '.hbs');

app.use(function(req,res,next){       
let route = req.path.substring(1);       
app.locals.activeRoute = "/" + (isNaN(route.split('/')[1]) ? route.replace(/\/(?!.)/, "") : route.replace(/\/(.)/, ""));       app.locals.viewingCategory = req.query.category;       next();   });

// setting up route for /about
app.get("/about", function(req,res) {
       res.render('about');
});
app.get("/", function(req,res) {
     
    res.render('addPost');
});


async function upload(req) {
    let result = await streamUpload(req);
    console.log(result);
	 return result

}
upload(req).then((uploaded) => {
 req.body.featureImage = uploaded.url
upload(req);
});
 
app.get("/views", function(req, res){
    res.sendFile(path.join(__dirname, "/views/addPost.html"));
});
// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a route on the 'root' of the url
// IE: http://localhost:8080/
app.get("/", (req, res) => {
  res.send("<h1>Welcome to my simple website</h1><p>Be sure to visit the <a href='/headers'>headers page</a> to see what headers were sent from your browser to the server!</p>");
});

// now add a route for the /headers page
// IE: http://localhost:8080/headers
app.get("/headers", (req, res) => {
  const headers = req.headers;
  res.send(headers);
});
app.get('/blog', async (req, res) => {

    // Declare an object to store properties for the view
    let viewData = {};

    try{

        // declare empty array to hold "post" objects
        let posts = [];

        // if there's a "category" query, filter the returned posts by category
        if(req.query.category){
            // Obtain the published "posts" by category
            posts = await blogData.getPublishedPostsByCategory(req.query.category);
        }else{
            // Obtain the published "posts"
            posts = await blogData.getPublishedPosts();
        }

        // sort the published posts by postDate
        posts.sort((a,b) => new Date(b.postDate) - new Date(a.postDate));

        // get the latest post from the front of the list (element 0)
        let post = posts[0]; 

        // store the "posts" and "post" data in the viewData object (to be passed to the view)
        viewData.posts = posts;
        viewData.post = post;

    }catch(err){
        viewData.message = "no results";
    }

   



   try{
        // Obtain the full list of "categories"
        let categories = await blogData.getCategories();

        // store the "categories" data in the viewData object (to be passed to the view)
        viewData.categories = categories;
    }catch(err){
        viewData.categoriesMessage = "no results"
    }

    // render the "blog" view with all of the data (viewData)
    res.render("blog", {data: viewData})

});
// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// listen on port 8080\. The default port for http is 80, https is 443\. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);
app.use(express.static('public'));