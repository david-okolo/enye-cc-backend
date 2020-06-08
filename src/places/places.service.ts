import { Client, LatLng, TextSearchResponse } from '@googlemaps/google-maps-services-js'
import crypto from 'crypto';
import { createToken, delay } from '../lib/helper';
import { IPlacesAutoCompleteParams } from './places.interface';
import { PlaceAutocompleteType } from '@googlemaps/google-maps-services-js/dist/places/autocomplete';

import Redis from 'ioredis';

const client = new Client({});
const redis = new Redis();

export const autoComplete = async ({query, token, latlng, radius}: IPlacesAutoCompleteParams) => {
    if(!token) {
        token = createToken()
    }

    const { data } = await client.placeAutocomplete({
        params: {
            key: process.env.GOOGLE_API_KEY,
            input: query,
            sessiontoken: token,
            location: latlng,
            radius,
            types: PlaceAutocompleteType.establishment
        }
    });

    return {
        token,
        data
    };
}

export const getHospitals = async ({latlng, radius}: {
    latlng: LatLng,
    radius: number
}) => {

    const data = await redis.get(`correct${radius}`);

    if(data) {
        return { data: JSON.parse(data) };
    }
    

    let results = [];

    try {
        const { data }: TextSearchResponse = await client.textSearch({
            params: {
                key: process.env.GOOGLE_API_KEY,
                location: latlng,
                query: 'hospitals',
                radius: radius
            }
        })

        results.push(...data.results)
    } catch (error) {
        console.log(error)
    }

    await redis.set(`correct${radius}`, JSON.stringify(results))

    return {
        len: results.length,
        data: results
    }
}