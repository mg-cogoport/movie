import {useEffect, useState} from 'react'
import axios from 'axios'
import React from 'react'

export default function useMovie(searchValue, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [movie, setMoive] = useState([])
    const [hasMore, setHasMore] = useState(false)
    useEffect (()=> {
        setLoading(true)
        setError(false)
        let cancel;
        axios({
            method:'GET',
            url : `http://www.omdbapi.com`,
            params: {s:searchValue, page: pageNumber, apikey:'3392ffe5'},
            cancelToken: new axios.CancelToken(c=>cancel=c)
        }).then((res)=>{
            console.log(res.data.Response);
            if (res.data.Response && res.data.Search) {
            console.log(res.data.Search, "res dattttttt");
            let pre = movie;
            let d = res.data.Search;
            for (let  i = 0; i < d.length; i++) pre.push(d[i])
            setMoive(pre)
            console.log(movie ,"movie");
            setHasMore(res.data.Search.length > 0)
            setLoading(false)
        }}).catch(e=>{
            if(axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    },[searchValue, pageNumber])
  return {loading, error, movie, hasMore}
}
