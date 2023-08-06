import { AccBroadcastServer } from "acc-broadcasting-network-lib";
import dgram from 'node:dgram';

const port = 9000;
const address = '192.168.2.124';

const server = new AccBroadcastServer(address, port, dgram);
server.connect('server', 'asd', '');
