import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {ApolloServer} from 'apollo-server';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import { resolvers } from './graphql/resolver';
import { typeDefs } from './graphql/typeDefs';


var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_DOMAIN,
    algorithms: ['RS256']
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true});

mongoose.connection.once('connected', () => {
  console.log('MongoDB connected')
})

mongoose.connection.on('error', () => {
  console.log('MongoDB Error');
})

const app = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  playground: {
    endpoint: '/graphql'
  }
})

export default app;