import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import { extname } from "path";
import { v4 as uuid } from 'uuid';

export const multerOptions = {
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        } else {
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },
    storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
            const uploadPath = './uploads/';
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },
        filename: (req: any, file: any, cb: any) => {
            cb(null, `${uuid()}${extname(file.originalname)}`);
        },
    })
}