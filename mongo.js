const mongoose = require('mongoose');

if(process.argv.length<3){
    console.log("Please provide the password as an argument");
    process.exit(1);
}

const dbPassword= process.argv[2];   
    
const URL = `mongodb+srv://nishantphule:${dbPassword}@cluster0.sorol20.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false);

mongoose.connect(URL);

const db = mongoose.connection;

db.once('connected', ()=>{
    console.log(`Database connected successfully`);
})
db.on('error',console.error.bind(console,'Connection Error!'));
 

const noteSchema = new mongoose.Schema({
    content:String,
    date:{
        type:Date,
        default:Date.now
    },
    important:Boolean
})

const Note = mongoose.model('Note',noteSchema,"notes");

// const note = new Note({
//     content:"Callback function are cool",
//     important:true
// });

// note.save()
// .then(result => {
//     console.log('note saved');
//     mongoose.connection.close();
// })


Note.find({important: true},{})
.then((result) => {
    result.forEach((note)=> {
        console.log(note);
    })
    mongoose.connection.close();
})