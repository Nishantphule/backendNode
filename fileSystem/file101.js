const fs = require('fs');

// fs.stat("/ZEN WORKPLACE/backendNode/fileSystem/test.txt", (err, stats) => {
//     if (err) {
//         console.log(err);
//         return;
//     }

//     console.log(stats.size, "KB")
// })

// fs.readFile("/ZEN WORKPLACE/backendNode/fileSystem/test.txt", 'utf-8', (err,data)=> {
//     if (err) {
//         console.log(err);
//         return;
//     }

//     console.log(data)
// })

const content = "new file"

fs.writeFile("/ZEN WORKPLACE/backendNode/fileSystem/output.txt", content, (err)=> {
    if (err) {
        console.log(err);
        return;
    }
})