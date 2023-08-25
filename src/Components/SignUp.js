import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [userName,setName] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPass,setConfirmPass] = useState("");
  const [wrongPass,setWrongPass] = useState(false);
  const [userExit,setUserExit] = useState(false);
  const url = "http://localhost:8000/person";


  const goRecords = () => {
    navigate("/calculator" , {state: {user : userName}});
  }

  const userCreate = (data) => {
    const thePerson = data.filter((person) => person.userName === userName);
    if(thePerson.length === 0){
      const data = {userName, password};
      console.log(data);
  
      fetch (url , {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(data)
      }).then(
        goRecords()
      ).catch ((err)=> {
        console.log(err)
      })
    }
    else{
      setWrongPass(false);
      setUserExit(true);
    }
  }

  const postData = (e) => {

    e.preventDefault();
    if(password === confirmPass){
      setWrongPass(false);
      fetch(url)
        .then((res) => {
          const response = res.json()
          return response
        })
        .then((data) => {
          userCreate(data)
        })
    }else {
      setUserExit(false);
      setWrongPass(true);
    }

  }

  return ( 
    <div  className="loginDiv">
      {wrongPass && <h2 className="wrongPass">Passwords Not Match <span>!</span></h2>}
      {userExit && <h2 className="wrongPass">This user already exit <span>!</span></h2>}
      <form onSubmit={(e) => {postData(e)}}>
        <div className="inputDiv">
          <label>User name</label>
          <input type="text" required value={userName} onChange={(e) => {setName(e.target.value)}}/>
        </div>
        <div className="inputDiv">
          <label>Password</label>
          <input type="password" required value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <div className="inputDiv">
          <label>Confirm password</label>
          <input type="password" required value={confirmPass} onChange={(e) => {setConfirmPass(e.target.value)}}/>
        </div>
        
        <button className="loginLink">Sign up</button>

      </form>
    </div>
   );
}
 
export default SignUp;