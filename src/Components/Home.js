import {Link} from "react-router-dom";


const Home = () => {

  return ( 
    <div className="home">
      <div className="headingDiv">
        <h1 className="heading">Calculate with Secure Record</h1>
        <h2>login to start</h2>
      </div>

      <Link className= "loginLink" to="/login">Login</Link>

      <p>if you don't have any account? <Link className="signUpLink" to="/signup">singn up.</Link></p>
    </div>
   );
}
 
export default Home;