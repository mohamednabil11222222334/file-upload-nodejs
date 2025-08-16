
import { v4 as uuidv4 } from 'uuid';
import multer from "multer"
import { AppError } from '../utils/appError.js';
import  Path  from "path";

const fileUpload=()=>{


    const storage = multer.diskStorage({
        destination: (req, file, cb)=> {
          cb(null,'uploads/')
        },
        filename:(req, file, cb)=>{
          cb(null,uuidv4()+"-"+file.originalname)
        }
      })
    
      function fileFilter(req, file, cb) {
        const ext = Path.extname(file.originalname).toLowerCase();
        const allowedExt = [".jpg", ".jpeg", ".png"]; // الامتدادات المسموح بيها
    
        // يتأكد أن نوع الملف صورة
        if (!file.mimetype.startsWith("image/")) {
          return cb(new AppError("Only images are allowed", 400), false);
        }
    
        // يتأكد من الامتداد
        if (!allowedExt.includes(ext)) {
          return cb(new AppError("Invalid extension, only jpg, jpeg, png allowed", 400), false);
        }
    
        cb(null, true); // ✅ لو تمام
      }
    
      return multer({
        storage,
        fileFilter,
        limits: { fileSize: 2 * 1024 * 1024 } // ✅ حجم الملف الأقصى = 2MB
      });
    };



export const uploadSingleFile=(filedName)=>{
    return fileUpload().single(filedName)
}


export const uploadMixFile = (fields) => {
    return fileUpload().fields(fields)
  }
  


  