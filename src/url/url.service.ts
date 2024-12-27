import { Injectable } from '@nestjs/common';
import { Url } from '../models/url.model';
import {CreateUrlDto} from '../util'

@Injectable()
export class UrlService {
  async createUrl(createUrlDto: CreateUrlDto): Promise<{}> {
    try {
      const { url, password, expiration } = createUrlDto;

      const existingUrl = await Url.findOne({ url });
      if (existingUrl) {
        return {
          target: existingUrl.url,
          link: `${process.env.apiUrl}${existingUrl.urlKey}`,
          valid: existingUrl.valid
        };
      }
  
      const urlKey = this.generateUrlKey();
      const newUrl = await Url.create({
        url,
        urlKey,
        valid: true,
        count: 0,
        password,
        expiration
      });
  
      return {
        target: url,
        link: `${process.env.apiUrl}${newUrl.urlKey}`,
        valid: true
      };
    } catch (error) {
      throw error;
    }
  }

  private generateUrlKey(): string {
    return Math.random().toString(36).substring(2, 11);
  }

  async getUrl(urlKey: string, password?: string ): Promise<{url?: string; error?: string, code?: number }> {
    const res = await Url.findOne({ urlKey });
    if (!res || !res.valid) {
      return { error: 'URL no válida o no encontrada', code:404 };
    }
    if (res.password && res.password !== password) {
      return { error: 'Password no válido', code:401 };
    }
    if (res.expiration && res.expiration <= new Date()) {
      await Url.updateOne({ urlKey }, { $set: { valid: false } });
      return { error: 'URL ha expirado', code:401 };
    }
    await Url.updateOne({ urlKey }, { $inc: { count: 1 } });
    return { url: res.url };
  }

  async getStats(urlKey: string): Promise<number> {
    const res = await Url.findOne({ urlKey });
    if (!res) {
      throw new Error('URL no encontrada');
    }
    return res.count;
  }

  async invalidateUrl(urlKey: string): Promise<void> {
    await Url.updateOne({ urlKey }, { $set: { valid: false } });
  }
}