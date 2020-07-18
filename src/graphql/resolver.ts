import { LongResolver } from 'graphql-scalars';

import { getHospitals } from "../places/places.service";
import { getPastSearches } from '../search/search.service';


const places = async (root: any, args: any, context: any, info: any) => {
  const {
    sub,
    query,
    radius,
    latlng
  } = args;

  return await getHospitals(args)
}

const hello = (root: any, args: any) => {
  return 'Hello World'
}

const pastSearches = async (root: any, args: any, context: any, info: any) => {
  const { sub } = args;
  return await getPastSearches(sub)
}


export const resolvers = {
  Long: LongResolver,
  Query: {
    places,
    pastSearches,
    hello
  }
}