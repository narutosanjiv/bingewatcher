import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { CreateUserResponse } from './dto/create-user-response.dto';
import { Logger } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  logger = new Logger('UsersController');

  @Client({
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4224',
      /**
       * Use the "Identity" (de)serializers for observing messages for
       * nest-only deployment.
       */
      // serializer: new OutboundMessageIdentitySerializer(),
      // deserializer: new InboundResponseIdentityDeserializer(),

      /**
       * Use the "External" (de)serializers for transforming messages to/from
       * (only) an external responder
       */
      // serializer: new OutboundMessageExternalSerializer(),
      // deserializer: new InboundResponseExternalDeserializer(),
    },
  })
  client: ClientProxy;

  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() create_user: CreateUserDTO): Promise<CreateUserResponse> {
    this.logger.log('inside users controller');
    const userResp = this.userService.create(create_user);
    this.client.emit('send-register-email', create_user.email).toPromise();
    return userResp;
  }

  @Get()
  index() {
    console.log('In Index');
    return { done: true };
  }
}
