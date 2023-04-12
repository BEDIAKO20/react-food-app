
import './App.css';
import { useGlobalContext } from './Context';
import Favorites from './components/Favorites'
import Meals from './components/Meals';
import Modal from './components/Modal'
import Search from './components/Search';

function App() {
  const {showModal, favorites} = useGlobalContext();
  console.log(favorites)

  return (
<main>
  
<Search/>
  {favorites.length > 0 && <Favorites/> }
  <Meals/>
 
  {showModal && <Modal />}

  
</main>
  );
}

export default App;
