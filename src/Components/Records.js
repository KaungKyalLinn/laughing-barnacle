import { useEffect, useState } from "react";
import useFetch from "../CustomHooks/useFetch";
import { useLocation } from "react-router-dom";

const Records = () => {
  const {data, isPending} = useFetch("http://localhost:8000/person");
  const location = useLocation();
  const [theData, setTheData] = useState(null);
  const user = location.state.name;

  useEffect(() => {
    if(data){
      if(!user){
        console.log("this is not a member")
      }else{
        const personData = data.filter((dat) => dat.userName === user)
        setTheData(personData);
      }
    }
  }, [data])
  
  

  return ( 
    <div className="recordsContainer">
      {isPending && <div> loading....</div>}
      {theData && (
        <div className="record">
          {theData.map((data) => {
            return(
              <div className = "theRecord" key={data.id}> 
                <h1 className="dataDescription">{data.description}</h1>
                <h3 className="dataDate">{data.date}</h3>
                <h2 className="dataValue">{data.value}</h2>
              </div>
            )
          })}
        </div>
      )}
    </div>
   );
}
 
export default Records;