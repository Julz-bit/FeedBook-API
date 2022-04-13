import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { Feed, User } from '@prisma/client';

@Injectable()
export class FeedsService {
  constructor(private prisma: PrismaService) { }

  async create(createFeed: CreateFeedDto, filename: string, user: User): Promise<Feed> {
    return await this.prisma.feed.create({
      data: {
        title: createFeed.title,
        desc: createFeed.desc,
        image: filename,
        userId: user.id
      }
    })
  }

  async findAll(): Promise<Feed[]> {
    return await this.prisma.feed.findMany({
      where: {
        published: true
      },
      include: {
        User: {
          select: {
            name: true
          }
        }
      }
    })
  }

  async findOne(id: number): Promise<Feed> {
    return await this.prisma.feed.findUnique({
      where: { id }
    });
  }

  async publish(id: number): Promise<Feed> {
    const feed = await this.findOne(id);
    if (!feed) {
      throw new NotFoundException(`${id} not found`)
    }

    return this.prisma.feed.update({
      where: { id },
      data: { published: true }
    })
  }

  async update(id: number, updateFeed: UpdateFeedDto): Promise<Feed> {
    const feed = await this.findOne(id);
    if (!feed) {
      throw new NotFoundException(`${id} not found`)
    }

    return this.prisma.feed.update({
      where: { id },
      data: updateFeed
    })
  }

  async remove(id: number): Promise<Feed> {
    const feed = await this.findOne(id);
    if (!feed) {
      throw new NotFoundException(`${id} not found`)
    }

    return this.prisma.feed.delete({
      where: { id }
    })
  }
}
