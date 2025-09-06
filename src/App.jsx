import Card from './components/Card.jsx'
import { useState } from 'react'
import './App.css'
import api from './services/api.js'

function App() {
  const [termoBusca, setTermoBusca] = useState('')
  const [filmes, setFilmes] = useState([])
  const [loading, setLoading] = useState(false)
  const [favoritos, setFavoritos] = useState([])
  const [notification, setNotification]= useState('')
  const [modoExibicao,setModoExebiçao]= useState('')
 
  const handleFavoritoClick= (filme)=>{
    const isFavorito = favoritos.some(fav => fav.imdbID === filme.imdbID)

    if(isFavorito){
      const newList = favoritos.filter(fav => fav.imdbID !== filme.imdbID)
    setFavoritos(newList)
    }else{
       const newList = [...favoritos, filme]
   
   setFavoritos(newList)
    }
  }

  const handleBusca = async (e) => {
    e.preventDefault()
    if (!termoBusca) return
    
    setLoading(true)
    try {
      const response = await api.get(`/?s=${termoBusca}&apikey=16f41491`)
      if (response.data.Search) {
        setFilmes(response.data.Search)
      } else {
        setFilmes([])
      }
    } catch (error) {
      console.error("Erro ao buscar filmes", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    
      <div className='App'>
        <form onSubmit={handleBusca}>
          <input type="text" onChange={(e) => setTermoBusca(e.target.value)} />
          <button type="submit"onClick={()=>{setModoExebiçao("buscar")}}>{loading ? "Aguarde..." : "Buscar"}</button>
          <button type='button' onClick={()=>{setModoExebiçao('favoritos')}}>Ver favoritos</button>
        </form>
      </div>
       {notification && <p className='notification'>{notification}</p>}
     <div className='lista-container'>
      {loading ? (
        <p>A carregar...</p>
      ) : (
        modoExibicao === 'favoritos' ? (
          <div className='lista-filmes'>
            <h2>Meus Favoritos</h2>
            {favoritos.length > 0 ? (
              favoritos.map(filme => (
                <Card key={filme.imdbID} filme={filme} onFavoritarClick={handleFavoritoClick} isFavorito={favoritos.some(fav => fav.imdbID === filme.imdbID)} />
              ))
            ) : (
              <p>A sua lista de favoritos está vazia.</p>
            )}
          </div>
        ) : (
          <div className='lista-filmes'>
            <h2>Resultados da Busca</h2>
            {filmes.map(filme => (
              <Card key={filme.imdbID} filme={filme} onFavoritarClick={handleFavoritoClick} isFavorito={favoritos.some(fav => fav.imdbID === filme.imdbID)}/>
            ))}
          </div>
        )
      )}
    </div>
      
    </>
  )
}

export default App