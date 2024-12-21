import React from 'eact'
    import './index.css'
    import { Link } from 'eact-router-dom'

    function App() {
      return (
        <div className="App">
          <h1>Bienvenue sur AI-LOCATION</h1>
          <p>Gérez vos locations immobilières avec facilité.</p>
          <nav>
            <Link to="/properties">Liste des propriétés</Link>
            <Link to="/properties/map">Carte des propriétés</Link>
            <Link to="/login">Se connecter</Link>
            <Link to="/register">S'inscrire</Link>
            <Link to="/create">Créer une annonce</Link>
            <Link to="/edit/:id">Éditer une annonce</Link>
          </nav>
        </div>
      )
    }

    export default App
