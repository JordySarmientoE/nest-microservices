import { Controller, Body, Param, Delete, Put, Get, Post, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { FlightDTO } from './dto/flight.dto';
import { IFlight } from '../common/interfaces/flight.interface';
import { Observable } from 'rxjs';
import { FlightMSG, PassengerMSG } from '../common/constants';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('flights')
@UseGuards(JwtAuthGuard)
@Controller('api/flight')
export class FlightController {
    constructor(private readonly clientProxy: ClientProxySuperFlights) { }
    private clientProxyFlight = this.clientProxy.clientProxyFlight();
    private clientProxyPassenger = this.clientProxy.clientProxyPassenger();

    @Post()
    create(@Body() flightDTO: FlightDTO): Observable<IFlight> {
        return this.clientProxyFlight.send(FlightMSG.CREATE, flightDTO)
    }

    @Get()
    findAll(): Observable<IFlight[]> {
        return this.clientProxyFlight.send(FlightMSG.FIND_ALL, '')
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IFlight> {
        return this.clientProxyFlight.send(FlightMSG.FIND_ONE, id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() flightDTO: FlightDTO): Observable<IFlight> {
        return this.clientProxyFlight.send(FlightMSG.UPDATE, { id, flightDTO })
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this.clientProxyFlight.send(FlightMSG.DELETE, id)
    }

    @Post(':flightId/passenger/:passengerId')
    async addPassenger(@Param('flightId') flightId: string, @Param('passengerId') passengerId: string){
        const passenger = this.clientProxyPassenger .send(PassengerMSG.FIND_ONE, passengerId).toPromise();
        if(!passenger) throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
        return this.clientProxyFlight.send(FlightMSG.ADD_PASSENGER, {
            flightId,
            passengerId
        })
    }
}
