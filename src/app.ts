import express from 'express';
import cors from 'cors';
import Redis from 'ioredis';

import placesController from './places/places.controller';
import distanceController from './distance/distance.controller';

const app = express();

app.use(cors())
app.use(express.json())

app.use('/places', placesController)
app.use('/distance', distanceController)

app.use(express.static('public'))

export default app;