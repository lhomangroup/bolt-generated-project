import React from 'react'
    import ReactDOM from 'react-dom'
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
    import App from './App.jsx'
    import PropertiesList from './PropertiesList.jsx'
    import PropertyDetails from './PropertyDetails.jsx'
    import Login from './Login.jsx'
    import Register from './Register.jsx'
    import UserProfile from './UserProfile.jsx'
    import PropertyMap from './PropertyMap.jsx'

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/properties" element={<PropertiesList />} />
            <Route path="/properties/map" element={<PropertyMap />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Router>
      </React.StrictMode>
    )
