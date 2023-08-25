import { useState,useEffect } from "react";

const useFetch = (url) => {

  const [data,setData] = useState(null);
  const [isPending, setIsPending] = useState(true);


  useEffect(() => {
    console.log("hello", url)
    fetch(url)
      .then((res) => {
        const response = res.json();
        return(response)
      })
      .then((res) => {
        setIsPending(false)
        setData(res)
      })
      .catch((err) => {
        console.log(err)
      })
  } , [url])


  return ({data,isPending});

}
 
export default useFetch;