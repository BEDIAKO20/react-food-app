import { useGlobalContext } from '../Context'
// import { AppContext } from 
import {BsHandThumbsUp} from "react-icons/bs"

const Meals = () => {
  const {meals,loading,selectMeal,addToFavorites} = useGlobalContext()

  if(loading){
    return(
      <section className='section-loding'>
 <div class="loader"></div>
      </section>
     
    )
  }

  if(meals.length <1){
    return(
      <section  className='section-loding'>
        <h4>No meals matched your search term.Please try again.</h4>
      </section>
    )
  }
  
  return (
    <section className='section-center'>
      {
        meals.map((singleMeal)=>{
          const {idMeal, strMeal:title, strMealThumb:image} =singleMeal

          return(
            <article key={idMeal} className='single-meal'>
              <img src={image}  className="img"  onClick={() => selectMeal(idMeal)}/>
              <footer>
                <h5>{title}</h5>
                <button className='like-btn' onClick={() =>addToFavorites(idMeal)}><BsHandThumbsUp/></button>
              </footer>
            </article>
          )
        })
      }
    </section>
  )
}

export default Meals