import React from 'eact'
    import ReactDOM from 'eact-dom'
    import { BrowserRouter as Router, Routes, Route } from 'eact-router-dom'
    import App from './App.jsx'
    import PropertiesList from './PropertiesList.jsx'
    import PropertyDetails from './PropertyDetails.jsx'
    import Login from './Login.jsx'
    import Register from './Register.jsx'
    import UserProfile from './UserProfile.jsx'
    import PropertyMap from './PropertyMap.jsx'
    import PropertyCreate from './PropertyCreate.jsx'
    import PropertyEdit from './PropertyEdit.jsx'

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
            <Route path="/create" element={<PropertyCreate />} />
            <Route path="/edit/:id" element={<PropertyEdit />} />
          </Routes>
        </Router>
      </React.StrictMode>
    )
