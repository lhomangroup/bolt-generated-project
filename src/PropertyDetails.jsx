import React, { useState, useEffect } from 'react'
    import { useParams } from 'react-router-dom'
    import axios from 'axios'

    function PropertyDetails() {
      const { id } = useParams()
      const [property, setProperty] = useState(null)

      useEffect(() => {
        axios.get(`/api/properties/${id}`)
          .then(response => setProperty(response.data))
          .catch(error => console.error(error))
      }, [id])

      if (!property) {
        return <div>Chargement...</div>
      }

      return (
        <div>
          <h2>{property.title}</h2>
          <p>{property.description}</p>
          <p>Prix: {property.price} €/mois</p>
          <p>Adresse: {property.address}</p>
          <p>Durée de location: {property.duration} mois</p>
          <p>Type de logement: {property.type}</p>
          <button>Contactez le propriétaire</button>
          <button>Réserver</button>
        </div>
      )
    }

    export default PropertyDetails
