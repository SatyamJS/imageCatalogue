import { useState, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const ref = useRef(null)
  const [state, setState] = useState({
    current: "dubai.jpg",
    places: ["dubai.jpg", "italy.jpg", "maldives.jpg", "japan.jpg", "bali.jpg"],
  })
  const [tile, setTile] = useState(0)
  const [intervalId, setIntervalId] = useState(null);
  let i = 0
  const images = state.places.map((place) => {
    if (place == state.current) {
      return <img key={i++} style={{ filter: "grayscale(0%)" }} src={state.current} />
    }
    else {

      return <img key={i++} src={place} />
    }
  }
  )

const intervalCallback = () => {
  ref.current.click();
};

const handlePlayPause = (e) => {
  const playBtn = document.querySelector(".play");
  playBtn.classList.toggle("pause");
  if (playBtn.className === "play") {
    playBtn.innerHTML = "&#x23f5;";
    clearInterval(intervalId);
    setIntervalId(null);
  } else {
    const newIntervalId = setInterval(intervalCallback, 2000);
    setIntervalId(newIntervalId);
    playBtn.innerHTML = "&#x23f8;";
  }
};




  useEffect(() => {
    setState(prevState => {
      if (tile > prevState.places.length - 1) {
        return ({ ...prevState, current: prevState.places[tile] })
      }
      else if (tile < 0) {
        return ({ ...prevState, current: prevState.places[tile] })
      }

      return ({ ...prevState, current: prevState.places[tile] })
    })
  }, [tile])

  const handleNext = () => {
    if (tile == state.places.length - 1) {
      setTile(0)
    } else {
      setTile(tile => tile + 1)
    }


  }
  const handlePrev = () => {
    if (tile <= 0) {
      setTile(state.places.length - 1)
    }
    else {

      setTile(tile => tile - 1)
    }

  }

  return (
    <>
      <div className='container'>

        <div className='selectedDiv'>
          <div className='selectedImageDiv'>
            <img src={state.current} alt="" />
          </div>
          <div className='selectedDetailDiv'>
            <h1>
              {state.current.split(".")[0].toUpperCase()}
            </h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta numquam dignissimos voluptates eveniet? Mollitia deleniti reprehenderit quod illo id eaque pariatur dolorem alias velit delectus, nobis nulla itaque. Aliquam maiores omnis ad dicta reprehenderit, itaque iusto quas totam quos non ullam est recusandae repudiandae? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum amet, qui corporis, aliquid at laboriosam totam nulla rerum animi facere quaerat iure vel ipsa magni, quasi hic perspiciatis commodi assumenda atque. Labore maxime culpa animi ratione error? Modi asperiores aliquid voluptatum sed minima corrupti accusamus, saepe numquam nobis assumenda dolorum suscipit? Incidunt quaerat exercitationem quidem. Veritatis! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, voluptatibus voluptates nam unde veniam beatae hic, error alias eaque sequi consequuntur facilis ipsum culpa aliquam nostrum consequatur ipsam odit at inventore explicabo itaque nemo. Asperiores nemo voluptate corrupti molestias nisi! Repellat voluptatum &#x23f8;</p>
          </div>
        </div>

        <div className='tooltip'>
          <div className='images'>
            <span className='prev' onClick={handlePrev}> &#8227; </span>
            {images}
            <span ref={ref} className='next' onClick={handleNext}> &#8227;</span>
          </div>
          <div >
            <span className='play' onClick={handlePlayPause}>&#x23f5; </span>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
