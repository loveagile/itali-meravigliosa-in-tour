import { createContext } from "react"

export type EventProps = {
  id: string
  image: string
  heading: string
  location: string
  to: string
}

export type WishContextProps = {
  items?: EventProps[]
  remove?: (id: string) => void
  add?: (event: EventProps) => void
}

const wishContextProps: WishContextProps = {}

const WishContext = createContext(wishContextProps)

export default WishContext
