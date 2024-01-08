import './NotFound.css'
import notFound from "../../../public/assets/SVGs/No results.svg";

function NotFound() {
  return ( 
    <div className="not-found">
      <img src={notFound} alt="No Fotos encontered" />
      <h1>No photos existing with the current search</h1>
    </div>
   );
}

export default NotFound;