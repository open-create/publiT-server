import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  async upload(files: Express.Multer.File[]): Promise<string[]> {
    const bucket = 'publit-files-storage';
    const storage = new Storage({
      projectId: 'publit-project',
      ...(process.env.NODE_ENV === 'dev'
        ? { keyFilename: 'publit-storage.json' }
        : {}),
    }).bucket(bucket);
    const results = await Promise.all(
      files.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const safeFileName = `${uuidv4()}-${encodeURIComponent(file.originalname)}`;
            const blob = storage.file(safeFileName).createWriteStream();
            blob.on('finish', () => resolve(safeFileName));
            blob.on('error', (err) =>
              reject(new Error(err?.message || '실패')),
            );
            blob.end(file.buffer);
          }),
      ),
    );
    return results;
  }
}
