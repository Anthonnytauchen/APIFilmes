export default function Card({filme, onFavoritarClick}){

    return(
        <>
         <div className="Card">
            <img src={filme.Poster} alt={`Poster do filme ${filme.Title}`} />
            <h3>{filme.Title}</h3>
            <p>{filme.Year}</p>
           <button onClick={() => onFavoritarClick(filme)}>
        Favoritar
      </button>
         </div>
        </>
    )
}