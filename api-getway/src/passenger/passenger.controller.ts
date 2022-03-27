import { Controller, Param, Put, Delete, Body, Get, Post } from '@nestjs/common';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { PassengerMSG } from '../common/constants';
import { PassengerDTO } from './dto/passenger.dto';
import { Observable } from 'rxjs';
import { IPassenger } from '../common/interfaces/passenger.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('passengers')
@Controller('api/passenger')
export class PassengerController {
    constructor(private readonly clientProxy: ClientProxySuperFlights) { }
    private clientProxyPassenger = this.clientProxy.clientProxyPassenger();

    @Post()
    create(@Body() passengerDTO: PassengerDTO): Observable<IPassenger> {
        return this.clientProxyPassenger.send(PassengerMSG.CREATE, passengerDTO)
    }

    @Get()
    findAll(): Observable<IPassenger[]> {
        return this.clientProxyPassenger.send(PassengerMSG.FIND_ALL, '')
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IPassenger> {
        return this.clientProxyPassenger.send(PassengerMSG.FIND_ONE, id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() passengerDTO: PassengerDTO): Observable<IPassenger> {
        return this.clientProxyPassenger.send(PassengerMSG.UPDATE, { id, passengerDTO })
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this.clientProxyPassenger.send(PassengerMSG.DELETE, id)
    }
}
