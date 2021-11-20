
import { createContext, useContext} from "react"


export const dateContext = createContext({
  date: 'dhdld', // set a default value
  setDate: () => {},
})
export const useDateContext = () => useContext(dateContext)