import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Photo, createClient } from 'pexels'
import { AREA_CODES_MAP } from './data'
import { useOrientation } from './useOrientation'

const pexelsClient = createClient(import.meta.env.VITE_PEXELS_API_KEY)

export const useFetchImage = (hours: string, minutes: string) => {
  const [prevImages, setPrevImages] = useState<Photo[]>()
  const { orientation } = useOrientation()

  const query = useQuery({
    queryKey: ['image', hours, minutes],
    queryFn: async () => {
      const place = AREA_CODES_MAP[hours + minutes]

      const response = place
        ? await pexelsClient.photos.search({
            query: place.query || `wallpaper of ${place.name}`,
            orientation,
            size: 'small',
          })
        : await pexelsClient.photos.curated({ per_page: 80 })

      if ('error' in response) {
        throw new Error(response.error)
      }

      setPrevImages(response.photos)

      return {
        name: place?.name ?? 'Next Area Code at 2:00',
        images: response.photos,
      }
    },
  })

  return { ...query, prevImages }
}
