import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/role.enum';
import { RolesGuard } from 'src/users/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('feeds')
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) { }

  // @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/',
      filename: (req, file, callback) => {
        callback(null, `${Date.now()}${extname(file.originalname)}`);
      }
    })
  }))
  async create(@Body() createFeedDto: CreateFeedDto, @UploadedFile() file: Express.Multer.File, @AuthUser() user: User) {
    return this.feedsService.create(createFeedDto, file.filename, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.feedsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.feedsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('publish/:id')
  async publish(@Param('id') id: string) {
    return this.feedsService.publish(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFeedDto: UpdateFeedDto) {
    return this.feedsService.update(+id, updateFeedDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.feedsService.remove(+id);
  }
}
