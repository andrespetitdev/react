import React from 'react'
import { PhotoCard } from '../components/PhotoCard/index'
import { useGetPhoto } from '../hooks/useGetPhoto'

export const PhotoCardWithQuery = ({ id }) => {
  const { loading, data, error } = useGetPhoto(id)

  if (loading) return <p>loading</p>
  if (error) return <p>error!!</p>

  const { photo = {} } = data

  return <PhotoCard {...photo} />
}
