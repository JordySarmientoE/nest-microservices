import { Module } from "@nestjs/common";
import { ClientProxySuperFlights } from "./client-proxy";

@Module({
    imports: [
      ],
    providers: [ClientProxySuperFlights],
    exports: [ClientProxySuperFlights]
})
export class ProxyModule {
}