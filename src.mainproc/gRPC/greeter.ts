
import * as grpc from '@grpc/grpc-js';
import { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import { launchServer } from 'out-of-proc-server';
import { appConfig } from '../lib/conf';
import { GreeterClient } from '../pb/helloworld_grpc_pb_pure_js';



let greeterClient: ServiceClient;


export async function getGreeterClient() {
    if (greeterClient) {
        return greeterClient;
    }

    const greeterServer = await launchServer('testpipe',
        appConfig.greeter.command, appConfig.greeter.args,
        { stdio: ['ignore', 'inherit', 'inherit'] });

    greeterClient = new GreeterClient('localhost:50051',
        grpc.credentials.createInsecure());

    return greeterClient;
}
