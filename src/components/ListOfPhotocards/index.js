import React from 'react'
import { PhotoCard } from '../PhotoCard'
import { useQuery } from '@apollo/client'
import { withPhotos } from '../../hoc/withPhotos'

export const ListOfPhotoCards = ({ categoryId }) => {
  const { loading, error, data } = useQuery(withPhotos, {
    variables: { categoryId }
  })

  if (loading) return <span>loading</span>
  if (error) return <p>Error</p>

  return (
    <ul>
      {
      data.photos.map(photoCard => <PhotoCard key={photoCard.id} {...photoCard} />)
      }
    </ul>
  )
}
