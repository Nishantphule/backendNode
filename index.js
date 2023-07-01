const express = require("express");
const app = express();

let notes = [
    {
        id:1,
        content:"HTML is easy",
        important:true
    },
    {
        id:2,
        content:"Browser can only execute js",
        important:false
    },
    {
        id:3,
        content:"GET and POST are most important methods of HTTP protocol",
        important:true
    },
]

// set the endpoints
app.get('/', (req,res) => {
   res.send("<h1>Hello World</h1>") 
});

const PORT = 3001;
app.listen(PORT , () =>{
    console.log(`server running on port ${PORT}`);
});


