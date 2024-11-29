import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Photo } from 'pexels'
import { AREA_CODES_MAP } from './data'
import { randomElement } from './randomElement'

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY
const PEXELS_BASE_ENDPOINT = 'https://api.pexels.com/v1/search'

export const useFetchImage = (hours: string, minutes: string) => {
  const [prevImage, setPrevImage] = useState<Photo>()

  const query = useQuery({
    queryKey: ['image', hours, minutes],
    queryFn: async () => {
      const place = AREA_CODES_MAP[hours + minutes]

      const QUERY = place ? `wallpaper of ${place}` : 'Famous landscapes'
      const ORIENTATION = 'landscape'
      const PER_PAGE = 15

      const response = await fetch(
        `${PEXELS_BASE_ENDPOINT}?query=${QUERY}&orientation=${ORIENTATION}&per_page=${PER_PAGE}`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        },
      )

      const data = await response.json()

      const name = place || 'Next Area Code at 2:00'
      const image = randomElement(data.photos as Photo[])

      setPrevImage(image)

      return { name, image }
    },
  })

  return { ...query, prevImage }
}
