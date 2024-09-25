import React, { useState, useEffect } from 'react'
import shuffleArray from './utility/shuffleArray'

function App() {
  const images = ['1', '2', '3', '4', '5', '6', '7', '8']
  const [storedIndex, setStoredIndexes] = useState([])
  const [cnt, setCnt] = useState(0)
  const [moves, setMoves] = useState(0)
  const [difficulty, setDiffculty] = useState(5)
  const [prev, setPrev] = useState({ val: null, idx: null })

  const [allImages, setAllImagess] = useState([]);

  useEffect(() => {
    let temp = images.splice(0, difficulty) 
    setAllImagess([ ...temp, ...temp])
  }, [difficulty])

  useEffect(() => {
    shuffleArray(allImages)
  }, [])


  function restart() {
    setCnt(0)
    setPrev({ idx: null, val: null})
    setMoves(0)
    shuffleArray(allImages)
    setStoredIndexes([])
  }

  function handleImageClick(idx, val) {

    if(moves == 10) {
      alert('game over');
      restart()
      return;
    }

    setMoves(moves+1)

    if(prev.val == null) {
      setPrev({ val, idx });
    }
    setStoredIndexes(prev => [...prev, idx])

    setCnt(cnt+1)

    if(cnt == 1) {
      if(prev.val != val) {
        setTimeout(() => {
          
          setStoredIndexes(prev2 => {
            console.log(prev2)
            return prev2.filter((i) => i != prev.idx && i != idx)
        })
        }, 1000);
      }

      setCnt(0);
      setPrev({ val: null, idx: null });
    }
  }

  return (<>
    <p>Total Moves: {moves}</p>
    <button onClick={restart}>restart</button>
    <select name="" id="" onChange={(e) => {setDiffculty(Number(e.target.value))}}>
      <option value="5">Choose Difficulty</option>
      <option value="3">Easy</option>
      <option value="5">Medium</option>
      <option value="8">Hard</option>
    </select>
   <div id="container">
    {
    
      allImages.map((val, i) =>
        <div key={Math.random()}>

          { storedIndex.includes(i) ? <img className="main" src={`/images/wallpaper${val}.jpg`} /> :
          <img onClick={() => handleImageClick(i, val)} className="cover" src="https://c4.wallpaperflare.com/wallpaper/305/547/705/facebook-cover-abstract-wallpaper-preview.jpg" />
          }
        </div>
      )
    }
   </div>
   </>
  )
}

export default App