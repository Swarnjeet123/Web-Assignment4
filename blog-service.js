posts=[]
categories=[]
module.exports.initialize =function (){
     
    return new Promise(function(resolve, reject){
        try{
            fs.readFile('./data/categories.json', (err, data)=>{
                if(err) throw err;
                categories = JSON.parse(data);
            });
            fs.readFile('./data/posts.json', (err, data)=>{
                if(err) throw err;
                posts = JSON.parse(data);
            });
        }catch(ex){
            reject('Unable to read file!');
        }

        resolve("The json files are read successfully.")
    });

} 

 module.exports.getPublishedPosts= function(published){
    var bypublished =[];
    return new Promise(function(resolve, reject){
       if(posts.length ==0){
           reject('No results returned!');
       }else{
           for(let i=0; i<posts.length; i++){
               if(published = posts.published)
                bypublished.push(posts[i]);
           }

           resolve(bypublished);
       }
    });
};
module.exports.getPostsByCategory= function(category){
    var bycategory =[];
    return new Promise(function(resolve, reject){
       if(posts.length ==0){
           reject('No results returned!');
       }else{
           for(let i=0; i<posts.length; i++){
               if(category = posts.category)
                bycategory.push(posts[i]);
           }

           resolve(bycategory);
       }
    });
};
module.exports.getAllPosts = function(){
    var Allposts =[];
    return new Promise((resolve, reject)=>{
        for(var i=0; i<posts.length; i++){
            Allposts.push(posts[i]);
        }
        if(Allposts.length ==0)
            reject("No result returned");
        resolve(Allposts);
    });

};
module.exports. getPostById= function(id){
    var byid =[];
    return new Promise(function(resolve, reject){
       if(posts.length ==0){
           reject('No results returned!');
       }else{
           for(let i=0; i<posts.length; i++){
               if(id = posts.id)
                byid.push(posts[i]);
           }

           resolve(bycategory);
       }
    });
};

module.exports.getPostsByMinDate= function(minDateStr){
    var bydate =[];
    return new Promise(function(resolve, reject){
       if(posts.length ==0){
           reject('No results returned!');
       }else{
           for(let i=0; i<posts.length; i++){
               if(minDateStr = posts.postDate)
                bydate.push(posts[i]);
           }

           resolve(bydate);
       }
    });
};

module.exports.addPost = function( postData ){

    return new Promise(function(resolve, reject){
 
            if(postData.published == undefined)
                postData.published = false;
             else
                 postData.published = true;
            postData.id = (posts.length)+1;
            posts.push(postData);
            resolve("the data has been update successfully!");
        

    });
}
getPublishedPostsByCategory: function(categoryname) {
        let promise = new Promise(function(resolve, reject) {
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].category == categoryname && posts[i].published ==true) 
                    resolve(posts[i]);
            }

            reject("post " + category + " was not found!");
        });

        return promise;
    }