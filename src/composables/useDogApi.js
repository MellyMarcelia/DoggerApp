import { useQuery } from '@tanstack/vue-query'

const BASE = 'https://dog.ceo/api'

async function fetchBreeds() {
  const res = await fetch(`${BASE}/breeds/list/all`)
  if (!res.ok) throw new Error('Failed to fetch breeds')
  const data = await res.json()
  return Object.keys(data.message).sort()
}

async function fetchBreedImage(breed) {
  const res = await fetch(`${BASE}/breed/${breed}/images/random`)
  if (!res.ok) throw new Error(`Failed to fetch image for ${breed}`)
  const data = await res.json()
  return data.message
}

export function useBreeds() {
  return useQuery({
    queryKey: ['breeds'],
    queryFn: fetchBreeds,
  })
}

export function useBreedImage(breed) {
  return useQuery({
    queryKey: ['breed-image', breed],
    queryFn: () => fetchBreedImage(breed.value ?? breed),
    // staleTime Infinity means cached image stays for the entire session
    staleTime: Infinity,
  })
}
