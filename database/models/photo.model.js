 import {Schema,model} from "mongoose";
 const schema =new Schema({
        title:String,
        imgUrl:String,
        images:[String]

 },{
 timestamps:true,
 versionKey:false   })

schema.post('init',function(doc){

doc.imgUrl="http://localhost:3000/uploads/"+doc.imgUrl

doc.images=doc.images.map(img=>"http://localhost:3000/uploads/"+img)

})


 export const Photo =model('Photo',schema)