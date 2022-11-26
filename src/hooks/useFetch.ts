import { useState } from 'react'

// T is parameter type
// R is response type

type Handler<T, R> = (params?: T) => Promise<R>

interface Result<R> {
    response: R | null
    error: any
    isLoading: boolean
}
type Fetch<T, R> = [result: Result<R>, fetch: Handler<T, R>]

const useFetch = <T, R>(handler: Handler<T, R>) => {
    const [response, setResponse] = useState<R>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const doFetch = async (params: T) => {
        try {
            setIsLoading(true)
            const res = await handler(params)
            setResponse(res)
        } catch (error) {
            setError(error as any)
        } finally {
            setIsLoading(false)
        }
    }
    return [{ response, error, isLoading }, doFetch] as Fetch<T, R>
}

export default useFetch