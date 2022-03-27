import { Body, Controller, Post, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { UserDTO } from './dto/user.dto';
import { Observable } from 'rxjs';
import { UserMSG } from '../common/constants';
import { IUser } from '../common/interfaces/user.interface';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('api/user')
export class UserController {
    constructor(private readonly clientProxy: ClientProxySuperFlights){}
    private clientProxyUser = this.clientProxy.clientProxyUser();

    @Post()
    create(@Body() userDTO: UserDTO): Observable<IUser>{
        return this.clientProxyUser.send(UserMSG.CREATE, userDTO)
    }

    @Get()
    findAll(): Observable<IUser[]>{
        return this.clientProxyUser.send(UserMSG.FIND_ALL, '')
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IUser>{
        return this.clientProxyUser.send(UserMSG.FIND_ONE, id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userDTO: UserDTO): Observable<IUser>{
        return this.clientProxyUser.send(UserMSG.UPDATE, {id, userDTO})
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any>{
        return this.clientProxyUser.send(UserMSG.DELETE, id)
    }
}
