import { gql, useQuery } from '@apollo/client'

export const useGetPhoto = (id) => {
  const getSinglePhoto = gql`
      query getSinglePhoto($id:ID!) {
        photo(id:$id) {
        id
        categoryId
        src
        likes
        userId
        liked
      }
    }
`

  const { loading, error, data } = useQuery(getSinglePhoto, { variables: { id } })

  return { loading, error, data }
}
