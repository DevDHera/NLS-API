// core
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

// services
import { LabsService } from './labs.service';

// schemas
import { CreateLabDto } from './dto/create-lab.dto';
import { User } from '../auth/user.entity';
import { Lab } from './lab.entity';

// pipes

// decorators
import { GetUser } from '../auth/get-user.decorator';

@ApiTags('Labs')
@Controller('labs')
@UseGuards(AuthGuard())
export class LabsController {
  private logger = new Logger('LabsController');

  constructor(private labsService: LabsService) {}

  @Get()
  getLabSoftwareRequests(@GetUser() user: User): Promise<Lab[]> {
    this.logger.verbose(`User: ${user.email} retrieving all labs. `);
    return this.labsService.getLabSoftwareRequests(user);
  }

  @Get('/:id')
  getLabSoftwareRequestById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Lab> {
    return this.labsService.getLabSoftwareRequestById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createLabSoftwareRequest(
    @Body() createLabDto: CreateLabDto,
    @GetUser() user: User,
  ): Promise<Lab> {
    this.logger.verbose(
      `User: ${user.email} creating a new lab. Data: ${JSON.stringify(
        createLabDto,
      )}`,
    );
    return this.labsService.createLabSoftwareRequest(createLabDto, user);
  }

  @Delete('/:id')
  deleteLabSoftwareRequest(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.labsService.deleteLabSoftwareRequest(id, user);
  }
}
