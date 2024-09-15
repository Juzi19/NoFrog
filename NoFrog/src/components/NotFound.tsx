import { Link } from 'react-router-dom'
function NotFound() {
  return (
    <div><div>
        <h2>404-not found</h2>
        <p>The site you're looking for doesn't exist</p>
        <Link to="/" style= {{color: 'black'}}>Zurück zu der NoFrog Homepage</Link></div></div>
  )
}

export default NotFound