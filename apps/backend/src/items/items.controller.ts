import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { CreateItemDto } from './dto/create-item.dto'
import { Item } from './item.entity'
import { ItemsService } from './items.service'

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiOkResponse({ type: [Item] })
  findAll(): Item[] {
    return this.itemsService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ type: Item })
  findOne(@Param('id', ParseIntPipe) id: number): Item {
    return this.itemsService.findOne(id)
  }

  @Post()
  @ApiCreatedResponse({ type: Item })
  create(@Body() dto: CreateItemDto): Item {
    return this.itemsService.create(dto)
  }
}
