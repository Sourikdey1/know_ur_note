
const express = require('express');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const app = express();

// const s3 = new aws.S3({ apiVersion : });
// //AWS_access_key and aws_secret_access_key
// const upload = multer({
//     storage: multerS3({
//         s3,
//         bucket: '<your bucket name>',
//         metadata: (req, file, cb) => {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: (req, file, cb) => {
//             const ext = path.extname(file.originalname);
//             cb(null, `${uuid()}${ext}`);
//         }
//     })
// });


// Function callName() is executed whenever
// url is of the form localhost:3000/name
app.get('/name', callName);

function callName(req, res) {

    // Use child_process.spawn method from
    // child_process module and assign it
    // to variable spawn
    var spawn = require("child_process").spawn;

    // Parameters passed in spawn -
    // 1. type_of_script
    // 2. list containing Path of the script
    //    and arguments for the script

    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
    // so, first name = Mike and last name = Will
    var process = spawn('python',["./hello.py",
                            req.query.firstname,
                            req.query.lastname] );

    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    process.stdout.on('data', function(data) {
        res.send(data.toString());
    } )
  }



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or
        // uuid, or fieldname
        cb(null, `${uuid()}-${originalname}`);
    }
})
const upload = multer({ storage }); // or simply { dest: 'uploads/' }
app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/upload.html");
});

app.post('/upload', upload.single('music'), (req, res) => {
  console.log('File uploaded');
    return res.json({ status: 'OK' });
});

app.listen(3000,() => console.log('APP is running successfully...'));
