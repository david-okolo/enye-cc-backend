import { gql } from 'apollo-server';

export const typeDefs = gql`

# type Query {
#   hello: String
# }

scalar Long

input LatLngInput {
  lat: Float!
  lng: Float!
}

type Place {
  name: String!
  formatted_address: String!
  geometry: Location!
  id: String!
}

type Location {
  location: LatLng!
}

type LatLng {
  lat: Float!
  lng: Float!
}

type PastSearch {
  keyword: String!
  radius: Int!
  timestamp: Long!
}

type Query {
  places(sub:String! , query: String!, radius: Int!, latlng: LatLngInput!): [Place!]
  pastSearches(sub: String!): [PastSearch!]
}`