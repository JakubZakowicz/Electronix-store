import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService, CloudinaryService],
})
export class ImageModule {}
