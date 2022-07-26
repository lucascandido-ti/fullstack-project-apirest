
export const fileTypeFilter = (req, file, callback)=>{
  if(!file.originalname.match(/\.(csv)$/) || file.mimetype != 'text/csv'){
    req.fileTypeValidationError = 'Arquivo em formato invalido.'
    return callback(null,false)
  }
  callback(null,true)
}