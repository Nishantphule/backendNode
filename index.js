const http = require("http");

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

const app = http.createServer((req,res) => {
    res.writeHead(200,{
        "Content-Type": 'application/json'
        });
    res.end(JSON.stringify(notes));    
})

const PORT = 3001;
app.listen(PORT);
console.log(`server running on port ${PORT}`);

