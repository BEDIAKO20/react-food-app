import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext()




const allMealUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=a";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"



const  getFavoritesFromLocalStorage=() =>{
    let favorites= localStorage.getItem('favories')


    if(favorites){
        favorites= JSON.parse( localStorage.getItem('favories'))
    }
    else{
        favorites=[]
    }
    return  favorites


}





const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)

    const [meals, setMeals] = useState([])

    const [searchTerm, setSearchTerm] = useState('')

    const [showModal, setShowModal] = useState(false);

    const [selectedMeal, setselectedMeal] = useState(null)

    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());


    const fetchMeals = async (url) => {



        setLoading(true)
        try {
            const { data } = await axios(url)

            if (data.meals) {
                setMeals(data.meals)
            } else {
                setMeals([])
            }

            console.log(data)
        } catch (error) {
            console.log(error.response)

        }
        setLoading(false)
    }

    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl)
    }

    const selectMeal = (idMeal, favoriteMeal) => {
        
        let meal;
        if (favoriteMeal){
            meal = favorites.find((meal) => meal.idMeal === idMeal)
        }
        else{
            meal = meals.find((meal) => meal.idMeal === idMeal)
        }

        setselectedMeal(meal)
        setShowModal(true);
    }




    const closeModal = () => {
        setShowModal(false)
    }


    const addToFavorites = (idMeal) => {
        console.log(idMeal)
        const meal = meals.find((meal) => meal.idMeal === idMeal)
        const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal)
        if (alreadyFavorite) return
        const updatedFavorites = [...favorites, meal];
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }

    const removeFromFavorites = (idMeal) => {
        const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }


    useEffect(() => {
        fetchMeals(allMealUrl)


    }, [])





    useEffect(() => {
        if (!searchTerm) return

        fetchMeals(`${allMealUrl}${searchTerm}`)


    }, [searchTerm])

    return (
        <AppContext.Provider value={{ loading, meals, setSearchTerm, fetchRandomMeal, showModal,
         selectedMeal, selectMeal, closeModal, addToFavorites,removeFromFavorites, favorites }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }