import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [wrongPass,setWrongPass] = useState(false);
  const [wrongUser, setWrongUser] = useState(false);
  const url = "http://localhost:8000/person";
  const navigate = useNavigate();

  const userCheck = (data) => {
    const thePerson = data.filter((info) => info.userName === name);
    if(thePerson.length === 0){
      setWrongPass(false);
      setWrongUser(true);
    }
    else if(thePerson[0].password === password){
      navigate("/calculator", {state : {user : name}});
    }else{
      setPassword("");
      setWrongUser(false);
      setWrongPass(true);
    }
  }

  const postData = (e) => {
    e.preventDefault();
    const data = {name, password};
    if(name && password){
      fetch(url)
        .then((res) => {
          if(res){
            const response = res.json();
            return response
          }
        }).then((data) => {
          userCheck(data);
        })
    }

  }


  return ( 
    <div  className="loginDiv">
      {wrongPass && <h2 className="wrongPass">Wrong Password <span>!</span></h2>}
      {wrongUser && <h2 className="wrongPass">This user not exit.<span>!</span></h2>}
      <form onSubmit={(e) => {postData(e)}}>
        <div className="inputDiv">
          <label>User name : </label>
          <input type="text" required value={name} onChange={(e)=> {setName(e.target.value)}}/>
        </div>
        <div className="inputDiv">
          <label>Password : </label>
          <input type="password" required value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <button className="loginLink">Login</button>
      </form>
    </div>
   );
}
 
export default LogIn;