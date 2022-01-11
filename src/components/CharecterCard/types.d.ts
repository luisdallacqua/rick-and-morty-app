export interface CharacterProps {
  isFavorited: boolean
  id: number
  name: string
  status: string
  species: string
  gender: string
  image: string
  location: { name: string; link?: string }
  origin: { name: string }
}
