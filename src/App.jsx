import { use } from 'react';
import { useState, useEffect, useActionState } from 'react'



const Card = ({title , rating , isCool}) => {
  const [count , setCount] = useState(0);
  const [hasLiked , setHasLiked] = useState(false);

  useEffect(() => {
    console.log(`${title} has been liked ${hasLiked}`)
  },[hasLiked])

  return (
    <div className='card' onClick={()=> setCount(count+1)}>
      <h2>{title} <br/> {count || null}</h2>
      <button onClick={()=>setHasLiked(!hasLiked)}>
        {hasLiked ? "💖" : "🤍"}
      </button>
      <h2>rating: {rating}</h2>
    </div>
    
  )
}

const App = () => {
  return (
    <div className='card-container'>
      
      <Card title = "dhurandar" rating={5} />
      <Card title = "pushpa" rating={4} />
      <Card title = "dangal" rating={3} />
    </div>
  )
}

export default App
