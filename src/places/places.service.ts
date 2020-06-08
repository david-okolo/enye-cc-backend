import { Client, LatLng, TextSearchResponse, PlacesNearbyResponse, defaultAxiosInstance } from '@googlemaps/google-maps-services-js'
import crypto from 'crypto';
import { createToken, delay } from '../lib/helper';
import { IPlacesAutoCompleteParams } from './places.interface';
import { PlaceAutocompleteType } from '@googlemaps/google-maps-services-js/dist/places/autocomplete';

const client = new Client({});

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

    let results = [];

    try {
        const { data }: PlacesNearbyResponse = await client.placesNearby({
            params: {
                key: process.env.GOOGLE_API_KEY,
                location: latlng,
                radius: radius,
                type: 'hospital'
            }
        })

        results.push(...data.results)
    } catch (error) {
        console.log(error)
    }

    return {
        len: results.length,
        data: results
    }
}