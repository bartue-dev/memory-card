import { useState } from 'react'
import { useEffect } from 'react';
import { Loader } from './assets/utils/loader';
import Score from './Components/Score';
import './App.css'
import About from './Components/About';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [showDialog, setShowDialog] = useState(false)
 

  //api fetching
  useEffect(() => {
    
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
    const apiKey = "GDIWYn1kt2QSpP7WWSZXfim2pyJpvEFH";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q="pug"&limit=8`;

      try {
        const response = await fetch(url, {signal});

        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }

        const apiData = await response.json();

        setData(apiData.data);

      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Aborted");
          return
        }
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(fetchData, 3000)
    
    return () => {
      controller.abort();
      clearTimeout(timer)
    }
  }, [])

  // console.log(data)

  const handleClick = (list) => {
    const randomData = [...data].sort(() => Math.random() - 0.5);
    setData(randomData);

    setSelectedImage(prev => [...prev, list.id])
  }

  const handleScore = (id) => {
    const randomData = [...data].sort(() => Math.random() - 0.5);

    if (selectedImage.includes(id)) {
      if (currentScore > bestScore) {
        setBestScore(currentScore);
        setCurrentScore(0);
        setSelectedImage([])
        setData(randomData);
        alert("You lose!");
        return true
      } else {
        alert("You lose!");
        setSelectedImage([])
        setData(randomData);
        setCurrentScore(0)
        return true
      }
    } else if (selectedImage.length === data.length - 1) {
      alert("You won!");
      setSelectedImage([]);
      setBestScore(data.length);
      setCurrentScore(0); 
      setData(randomData);
      return true;
    } else if (selectedImage.length < 8) {
      setCurrentScore(currentScore + 1);
    } 

    return false;
  }

  const handleResetClick = () => {
    const randomData = [...data].sort(() => Math.random() - 0.5);

    setCurrentScore(0);
    setBestScore(0);
    setSelectedImage([]);
    setData(randomData);
  }

  console.log("Selected Image:", selectedImage);
  console.log("show dialog:", showDialog);
  
  

  return (
    <div className="app-container">
      <div 
        className="button-container"
        style={{display: "flex", gap: "10px"}}
        >
      <button onClick={() => setShowDialog(true)}>About</button>
      <button onClick={handleResetClick}>Reset</button>
      </div>

      <About
        showDialog={showDialog}
        onCloseDialog={() => setShowDialog(false)}
      />

      <Score 
        currentScore={currentScore}
        bestScore={bestScore}
      />

      {loading ? (
        <Loader loading={loading} />
      )
      :
      (
      <div className="image-container">
      {data 
          && 
          (
            data.map((list) => {
              return (
              <div  
                className="image-item" 
                key={list.id} 
                onClick={() =>{
                  const isGameOver = handleScore(list.id)
                  if (!isGameOver) {
                    handleClick(list)
                  }
                }}
              >
                <img src={list.images.original.url}/>
              </div >

              )
          })
        )} 
      </div>  
      )}


    
    </div>
  )
}

export default App
