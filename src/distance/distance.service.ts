import { LatLng, Client, TravelMode } from "@googlemaps/google-maps-services-js";
import Redis from 'ioredis';

const client = new Client({});
const redis = new Redis();

export const getDistance = async ({origin, destination}: {origin: LatLng, destination: LatLng}) => {

    const { data } = await client.distancematrix({
        params: {
            key: process.env.GOOGLE_API_KEY,
            origins: [origin],
            destinations: [destination],
            mode: TravelMode.driving
        }
    });

    return {
        data
    }
}