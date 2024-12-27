import { Controller, Post, Get, Param, Query, Body, Put, Redirect, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { Response } from 'express';
import {CreateUrlDto} from '../util'
import { NotFoundException } from '@nestjs/common';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async createUrl(@Body() createUrlDto: CreateUrlDto, @Res() res: Response): Promise<{}> {
    const {url} = createUrlDto
    if (!url || !url.startsWith('http') || !url.startsWith('https')) {
      return res.status(404).send({ Error: 'Verifique URL' });
    }
    return res.status(201).send(await this.urlService.createUrl(createUrlDto));
  }

  @Get(':urlKey')
  @Redirect()
  async redirect(
    @Param('urlKey') urlKey: string,
    @Res() res: Response,
    @Query('password') password?: string,
  ): Promise<void> {
    try {
      const result  = await this.urlService.getUrl(urlKey,password);
      if (result.error) {
        res.status(result.code).send(result.error);
      } else {
        res.redirect(result.url);
      }
    } catch (error) {
      res.status(500).send('Ocurrió un error al procesar la solicitud');
    }
  }

  @Get(':urlKey/stats')
  async getStats(@Param('urlKey') urlKey: string) {
    const count = await this.urlService.getStats(urlKey);
    return { stats: count };
  }

  @Put(':urlKey')
  async invalidateUrl(@Param('urlKey') urlKey: string) {
    await this.urlService.invalidateUrl(urlKey);
    return { message: 'URL invalidada' };
  }
}