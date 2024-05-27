import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return 'Crea un producto';
  }

  @Get()
  findAllProducts() {
    return 'Esta funcion regresa varios productos';
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return `Esta funcion regresa el producto ${id}`;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return `Esta función elimina el producto ${id}`;
  }

  @Patch(':id')
  patchProduct(@Param('id') id: string, @Body() body: any) {
    return `Esta funcion actualiza el producto ${id}`;
  }
}
