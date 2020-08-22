import 'reflect-metadata'
import mongoose from 'mongoose'
import express from 'express'

import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql';

import { UserResolver } from './resolvers/user'
import { createConnection } from 'typeorm';
import { User } from './entity/user';

const startServer = async () => {

    const app = express();

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
            validate: false
        })
    });

    server.applyMiddleware({ app });

    app.listen({
        port: 4000
    }, () => {
        console.log(`Graphql online: http://localhost:4000${server.graphqlPath}`)
    })

}

createConnection({
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'GraphqlTest',
    entities: [User],
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
    startServer();
});
