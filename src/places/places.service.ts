import { Client, LatLng, TextSearchResponse } from '@googlemaps/google-maps-services-js'
import { createPastSearch } from '../search/search.service';

const client = new Client({});

export const getHospitals = async (payload: {
    sub: string,
    latlng: LatLng,
    radius: number,
    query: string
}) => {

    let results = [];

    try {
        const { data }: TextSearchResponse = await client.textSearch({
            params: {
                key: process.env.GOOGLE_API_KEY,
                query: payload.query,
                location: payload.latlng,
                radius: payload.radius
            }
        })

        await createPastSearch(payload).catch(e => {
            throw e;
        })

        results.push(...data.results)
    } catch (error) {
        // console.log(error)
        throw new Error("Google api request failed");
    }

    return results;
}