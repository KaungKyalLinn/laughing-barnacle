import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import ErrorPage from "./Components/ErrorPage";
import Records from "./Components/Records";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Calculator from "./Components/Calculator";

function App() {

  return (
    <Router>

      <div className="App">
        <Nav />
        <div className="container">
            
              <Routes>
                
                <Route path="/" element={<Home />}/>
                <Route path="/records" element={<Records />}/>
                <Route path="/login" element={<LogIn />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/calculator" element={<Calculator />}/>
                <Route path="*" element={<ErrorPage />}/>

              </Routes>
        
        </div>
      </div>

    </Router>

  );
}

export default App;
