import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";

const Calculator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const url = "http://localhost:8000/person";
  const [userName, setUserName]  = useState(location.state.user);

  const [calValue,setCalValue] = useState("");
  const [firstValue,setFirstValue] = useState(null);
  const [condition,setCondition] = useState(null);
  const [saveValue,setSaveValue] = useState(null);
  const [date,setDate] = useState("");
  const [description,setDescription] = useState("");

  const inputNum = (num) => {
    const toStr = String(num);
    setCalValue(calValue + toStr);
  }

  const addNum = () => {
    if(firstValue){
      const number = Number(firstValue) + Number(calValue);
      setFirstValue(number);
      setCalValue("");
    }
    else{
      setFirstValue(calValue);
      setCondition("add");
      setCalValue("");
    }
  }
  
  const subNum = () => {
    if(firstValue){
      const number = Number(firstValue) - Number(calValue);
      setFirstValue(number);
      setCalValue("");
    }
    else{
      setFirstValue(calValue);
      setCondition("sub");
      setCalValue("");
    }
  }
  const multiNum = () => {
    if(firstValue){
      const number = Number(firstValue) * Number(calValue);
      setFirstValue(number);
      setCalValue("");
    }
    else{
      setFirstValue(calValue);
      setCondition("multiply");
      setCalValue("");
    }
  }
  const deviNum = () => {
    if(firstValue){
      const number = Number(firstValue) % Number(calValue);
      setFirstValue(number);
      setCalValue("");
    }
    else{
      setFirstValue(calValue);
      setCondition("devide");
      setCalValue("");
    }
  }

  const equal = () => {
    if(condition === "add"){
      const number = Number(firstValue) + Number(calValue);
      setCalValue(number);
      setFirstValue("");
    }
    else if(condition === "sub"){
      const number = Number(firstValue) - Number(calValue);
      setCalValue(number);
      setFirstValue("");
    }
    if(condition === "multiply"){
      const number = Number(firstValue) * Number(calValue);
      setCalValue(number);
      setFirstValue("");
    }
    if(condition === "devide"){
      const number = Number(firstValue) % Number(calValue);
      setCalValue(number);
      setFirstValue("");
    }
  }

  const clear = () => {
    setFirstValue(null);
    console.log(userName)
    setCalValue("");
  }

  const saveRecord = () => {
    calValue === "" ? setSaveValue(null) : setSaveValue(calValue);
  }

  const goRecords = () => {
    navigate("/records" , {state: {name : userName}});
  }

  const postData = (e) => {
    e.preventDefault();
    const value = saveValue;
    const data = {userName, description, date ,value};

    fetch(url, {
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(data)
    })
      .then(() => setSaveValue(null))
      .then(() => goRecords())
      .catch((err) => console.log(err))
  }


  return ( 
    <div className="calContainer">
        {userName && (
          <div>
            <span className="goRecords" onClick={goRecords}>Your records</span>
          </div>
        )}
        <div className="calculatorBord">
          {saveValue && (
            <div className="saveContainer">
              <form className="saveBord" onSubmit={(e) => {postData(e)}}>
                <div className="saveBordBar">
                  <div className="saveCancel">X</div>
                </div>
                <div className="saveBordDiv">
                  <label>Record description</label>
                  <input type="text" required value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="saveBordDiv">
                  <label>Date</label>
                  <input type="text" required value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className="saveBordDiv">
                  <label>The Record</label>
                  <input type="text" readOnly value={saveValue}/>
                </div>
                <button>save</button>
              </form>
            </div>
          )}
        <div className="calculator">
          <div className="calRow">
            <input type="text" id="calInput" readOnly value={calValue} placeholder="00"/>
          </div>
          <div className="calRow">
            <div className="calBtn numBtn" onClick={() => {inputNum(1)}}>1</div>
            <div className="calBtn numBtn" onClick={() => {inputNum(2)}}>2</div>
            <div className="calBtn numBtn" onClick={() => {inputNum(3)}}>3</div>
            <div className="calBtn mathBtn" onClick={deviNum}>%</div>
            <div className="calBtn clrBtn" onClick={clear}>C</div>
          </div>
          <div className="calRow">
            <div className="calBtn numBtn" onClick={() => {inputNum(4)}}>4</div>
            <div className="calBtn numBtn" onClick={() => {inputNum(5)}}>5</div>
            <div className="calBtn numBtn" onClick={() => {inputNum(6)}}>6</div>
            <div className="calBtn mathBtn" onClick={multiNum}>x</div>
            <div className="calBtn clrBtn">{"<<"}</div>
          </div>
          <div className="calRow">
            <div className="calBtn numBtn" onClick={() => {inputNum(7)}}>7</div>
            <div className="calBtn numBtn" onClick={() => {inputNum(8)}}>8</div>
            <div className="calBtn numBtn" onClick={() => {inputNum(9)}}>9</div>
            <div className="calBtn mathBtn" onClick={addNum}>+</div>
            <div className="calBtn mathBtn" onClick={subNum}>-</div>
          </div>
          <div className="calRow">
            <div className="calBtn zeroBtn" onClick={() => {inputNum(0)}}>0</div>
            <div className="calBtn zeroBtn" onClick={() => {inputNum("00")}}>00</div>
            <div className="calBtn numBtn">.</div>
            <div className="equalBtn" onClick={equal}>=</div>
          </div>
        </div>
        <div className="saveBtn" onClick={saveRecord}>{"save to record >>"}</div>
      </div>
    </div>
    
   );
}
 
export default Calculator;