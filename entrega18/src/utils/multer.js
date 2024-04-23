import multer from 'multer'
import __dirname from '../../utils.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify different destinations based on file type or other conditions
    if (file.fieldname === 'profile') {
      cb(null, __dirname + '/public/user-documents/profiles')
    } else if (file.fieldname === 'product') {
      cb(null, __dirname + '/public/user-documents/products')
    } else if (file.fieldname === 'accountstatement') {
      cb(null, __dirname + '/public/user-documents/accountstatement')
    } else if (file.fieldname === 'address') {
      cb(null, __dirname + '/public/user-documents/address')
    } else {
    console.log(file.fieldname)
      cb(null, __dirname + '/public/user-documents/others')
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + ` - ${req.user.email}`)
  },
})

export const uploader = multer({ storage })
