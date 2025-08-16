import express from 'express'
import { dbConn } from './database/dbConnection.js'
import { globalError } from './src/utils/middleware/glopalError.js';
import { AppError } from './src/utils/appError.js';
import { Photo } from './database/models/photo.model.js';
import { uploadMixFile } from './src/fileUpload/fileUpload.js';



const app = express()
const port = 3000
app.use(express.json())
app.use('/uploads',express.static('uploads'))
//const upload = multer({ dest: 'uploads/' })





// app.post('/photos',uploadSingleFile('photo'),async(req,res,next)=>{
//     req.body.imgUrl=req.file.filename
//  await Photo.insertMany(req.body) 
//       res.json({message:"success.."})

// })


app.post('/photos',uploadMixFile([{ name: 'photo', maxCount: 1 }, { name: 'images', maxCount: 8 }]),async(req,res,next)=>{
req.body.imgUrl=req.files.photo[0].filename
req.body.images=req.files.images.map((val)=>val.filename)
await Photo.insertMany(req.body) 
//console.log(req.files)
    res.json({message:"success.."})

})




app.get('/photos',async(req,res,next)=>{
  let photos=await Photo.find()
res.json({message:"success..",photos})

})

app.use((req,res,next)=>{
    next (new AppError(`route not found ${req.originalUrl}`,404))
 })

 app.use(globalError)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))