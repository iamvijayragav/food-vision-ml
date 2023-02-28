import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import "./App.css";
import Model from "./components/Model";
import Loading from './components/Loading';


function App() {
  const [getMessage, setGetMessage] = useState({})
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    // axios.get('https://react-flask-tutorial.herokuapp.com/flask/hello').then(response => {
    //   console.log("SUCCESS", response)
    //   setGetMessage(response)
    // }).catch(error => {
    //   console.log(error)
    // })

    axios.get('/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])


  const [picture, setPicture] = useState({
    picturePreview: undefined,
  })
  const [model,setModel] = useState(false)
  const [currentPred,setCurrentPred] = useState('')
  
  const onChange = async (event) => {
    setPicture({
      picturePreview: URL.createObjectURL(event.target.files[0]),
    });
  }



  const setImageAction = async (event) => {

    event.preventDefault();

    setLoading(true)
    // setPicture({
    //   picturePreview: URL.createObjectURL(event.target.files[0]),
    //   pictureAsFile: event.target.files[0],
    // });

    const formData = new FormData(event.target);

    axios.post("/flask/hello", formData).then(d => {
      console.log(d)
      setCurrentPred(d.data.pred)
      setLoading(false)
      setModel(prv=>!prv)
    }).catch(e=>{
      console.log("Error Found");
      setLoading(false)
    })
  };

  

  return (
    <div className="App">
      {model && <Model setModel={setModel} currentPred={currentPred}/>}
      {/* <p onClick={fetchImg}>fetch me</p> */}
      {/* {Loading} */}
      {loading && <Loading />}
      {/* <p onClick={fetchModel}>hi</p> */}
      <div className="holder">
      <div className="selector">
      {!picture.picturePreview ? <p>Please select or capture the image</p> : <img src={picture.picturePreview} alt="food"/>}
      </div>

      <form onSubmit={setImageAction}>
  

<input type="file" id="image" name="file" 
            accept="image/*" className="file-custom" onChange={onChange}/>
            <button className='pred-btn'>Predict</button>
      </form>
      <div>
      <p>What is artificial intelligence (AI)? Artificial intelligence is the simulation of human intelligence processes by machines, especially computer systems. Specific applications of AI include expert systems, natural language processing, speech recognition and machine vision.</p>


    
     </div>
      </div>
  

    </div>
  );
}

export default App;
