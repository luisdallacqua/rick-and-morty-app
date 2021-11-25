import { useState, useEffect } from 'react'
import { api } from '../services/createApi'

export const useRemoteService = (Initialurl: string) => {
  const [data, setData] = useState<[]>([])
  const [url, setUrl] = useState(Initialurl)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setError(false)
      setLoading(true)
      try {
        const res = await api.get(url)
        setData(res.data)
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
