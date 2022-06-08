import {useEffect, useState} from 'react'
import axios from 'axios'
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
            url : `http://0.0.0.0:8000/smovies`,
            params: {search:searchValue, page: pageNumber, apikey:'3392ffe5'},
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*'
            },
            cancelToken: new axios.CancelToken(c=>cancel=c)
        }).then((res)=>{
            console.log(res.data, "dataallllaa");
            if (res.data ) {
            console.log(res.data.Search, "res dattttttt");
            let pre = movie;
            let d = res.data;
            for (let  i = 0; i < d.length; i++) pre.push(d[i])
            if (pageNumber == 1)
            setMoive(d)
            else 
            setMoive(pre)
            console.log(movie ,"movie");
            setHasMore(res.data.length > 0)
            setLoading(false)
        }}).catch(e=>{
            if(axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    },[searchValue, pageNumber])
  return {loading, error, movie, hasMore}
}
