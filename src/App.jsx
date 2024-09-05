import { useEffect, useState } from "react";



function App() {



  const [currentquestion, setcurrentquestion] = useState(0);
  const [showscore, setshowscore] = useState(false);
  const [question, setquestion] = useState("");
  const [options, setoptions] = useState("");
  const [score, setscore] = useState(0);
  const [answer, setanswer] = useState("");
  const [timer, settimer] = useState(10);
  const [length, setlength] = useState(0)




  const quiz = async () => {


    try {
      const response = await fetch(`http://localhost:3500/posts`);
      const data = await response.json();



      setquestion(data[currentquestion].question);

      setoptions(data[currentquestion].options);
      setanswer(data[currentquestion].correctoption);
      setlength(data.length);

    } catch (err) {
      console.log("error=", err);
    }

  }

  useEffect(() => {
    if (timer > 0 && !showscore) {


      var interval = setInterval(() => {
        settimer(timer => timer - 1);
      }, 1000);


    } else {

      setshowscore(true);
    }


    return () => clearInterval(interval);

  }, [timer, score]);








  useEffect(() => {
    quiz();
    settimer(10);

  }, [currentquestion]);



  const submitanswer = (option) => {




    if (option === answer) {
      setscore((s) => s + 1)


    }
    if (currentquestion < length - 1) {
      setcurrentquestion(currentquestion => currentquestion + 1);

    }
    else {
      setshowscore(true);
    }
  }
const handlerestart=()=>{
  setcurrentquestion(0);
  setscore(0);
  setshowscore(false);
  
}


  return (
    <>

      <div className="container">

        {showscore ?
          (
            <div className="score" >
              <p>your score {score}/{length}</p>
              <button onClick={handlerestart}>Restart</button>
            </div>
          )
          :
          (<div className="questions">

            <p>Question {currentquestion + 1}</p>
            <p>{question}</p>




            <div className="btndiv">
              <button onClick={() => submitanswer(options[0])}> {options[0]}</button>
              <button onClick={() => submitanswer(options[1])}> {options[1]}</button>
              <button onClick={() => submitanswer(options[2])}> {options[2]}</button>
              <button onClick={() => submitanswer(options[3])}>{options[3]}</button>


            </div>
            <p>you have {timer} s</p>

          </div>)}



      </div>
    </>
  )
}



export default App
