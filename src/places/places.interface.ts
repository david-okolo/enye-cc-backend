import { LatLng } from "@googlemaps/google-maps-services-js";

export interface IPlacesAutoCompleteParams {
    query: string
    token: string | null
    latlng: LatLng
    radius: number
}