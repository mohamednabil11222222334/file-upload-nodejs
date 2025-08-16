import { connect } from "mongoose";

export const dbConn=connect('mongodb://localhost:27017/photo1').then(()=>{

console.log('database connected succesfly..')

})