import { Body, Controller, Get, Post, Query, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { MacskaDto } from './macska.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async listMacska() {
    const [rows] = await db.execute(
      'SELECT suly,szem_szin FROM macskak ORDER BY suly DESC',
    );

    return {
      macskak: rows,
    };
  }

  @Get('cats/szin')
  @Render('szin')
  async listSzemszin(@Query('szem_szin') szin = '') {
    const [rows] = await db.execute(
      'SELECT suly,szem_szin FROM macskak WHERE szem_szin LIKE ? ORDER BY suly DESC',
      [szin],
    );

    return {
      macskak: rows,
    };
  }

  @Get('cats/new')
  @Render('new')
  newCatForm() {
    return {};
  }

  @Post('cats/new')
  @Redirect()
  async newCat(@Body() macskak: MacskaDto) {
    const [result]: any = await db.execute(
      'INSERT INTO macskak (suly,szem_szin) VALUES (?,?)',
      [macskak.suly,macskak.szem_szin],
    );
    return {
      url: '/',
    };
  }

}
