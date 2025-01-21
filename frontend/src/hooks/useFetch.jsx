import { useEffect, useMemo, useState } from "react";

const useFetch = (url,params={}) => {
    console.log(url,params);
    const [data,setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const memoizedParams = useMemo(()=> params, [JSON.stringify(params)]);

    useEffect(()=>{
        fetch(url,{
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then(res=>{
            if(!res.ok) throw Error('could not fetch the data');
            return res.json();
        })
        .then(data=>{
            setData(data);
            setIsPending(false);
            //console.log(data);
        })
        .catch(err=>{
            //console.log(err.message);
            setError(err.message);
        })
    },[url,memoizedParams])

    return {data, isPending, error};
}
 
export default useFetch;