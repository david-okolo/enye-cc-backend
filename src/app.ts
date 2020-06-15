import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { GraphQLServer } from 'graphql-yoga';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import { resolvers } from './graphql/resolver';


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

const app = new GraphQLServer({
  typeDefs: './src/graphql/schema.graphql',
  resolvers: resolvers,
  context: ({ request: user}) => {
    // console.log(user);
    return {user};
  }
})

app.use(cors())
app.use(express.json())

export default app;