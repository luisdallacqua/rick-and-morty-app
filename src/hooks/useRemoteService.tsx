import { useState, useEffect } from 'react'
import { api } from '../services/createApi'

export const useRemoteService = (Initialurl: string) => {
  const [data, setData] = useState<any[]>([])
  const [url, setUrl] = useState(Initialurl)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setError(false)
      setLoading(true)
      try {
        const res = await api.get(url)
        const data = await res.data
        //if a structure is an object return as an array else return as Object
        if (!Array.isArray(data)) {
          setData([data])
          return
        }
        setData(data)
      } catch (e) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { data, loading, error, setLoading, setUrl }
}
