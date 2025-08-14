export interface IFilesServiceUploadFile {
  file: Express.Multer.File;
}

export interface IFilesServiceUploadFiles {
  files: Array<Express.Multer.File>;
}

export interface IFilesServiceUpload {
  files: Array<Express.Multer.File>;
}
