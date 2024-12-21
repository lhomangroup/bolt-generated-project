import express from 'express'
    import sqlite3 from 'qlite3'
    import bodyParser from 'body-parser'
    import cors from 'cors'

    const app = express()
    const port = 3000

    app.use(bodyParser.json())
    app.use(cors())

    const db = new sqlite3.Database(':memory:')

    db.serialize(() => {
      db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, role TEXT)")
      db.run("CREATE TABLE properties (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, price REAL, address TEXT, duration INTEGER, type TEXT, owner_id INTEGER, latitude REAL, longitude REAL)")
    })

    app.post('/api/register', (req, res) => {
      const { name, email, password, role } = req.body
      db.run("INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)", [name, email, password, role], function(err) {
        if (err) {
          res.json({ success: false, message: err.message })
        } else {
          res.json({ success: true, message: 'Inscription réussie', userId: this.lastID })
        }
      })
    })

    app.post('/api/login', (req, res) => {
      const { email, password } = req.body
      db.get("SELECT * FROM users WHERE email =? AND password =?", [email, password], (err, row) => {
        if (err) {
          res.json({ success: false, message: err.message })
        } else if (row) {
          res.json({ success: true, message: 'Connexion réussie', userId: row.id })
        } else {
          res.json({ success: false, message: 'Email ou mot de passe incorrect' })
        }
      })
    })

    app.get('/api/properties', (req, res) => {
      const { price, location, type, duration } = req.query
      let query = "SELECT * FROM properties"
      const params = []
      if (price) {
        query += " WHERE price <=?"
        params.push(price)
      }
      if (location) {
        query += (params.length > 0? " AND" : " WHERE") + " address LIKE?"
        params.push(`%${location}%`)
      }
      if (type) {
        query += (params.length > 0? " AND" : " WHERE") + " type =?"
        params.push(type)
      }
      if (duration) {
        query += (params.length > 0? " AND" : " WHERE") + " duration =?"
        params.push(duration)
      }
      db.all(query, params, (err, rows) => {
        if (err) {
          res.json({ success: false, message: err.message })
        } else {
          res.json(rows)
        }
      })
    })

    app.get('/api/properties/:id', (req, res) => {
      const { id } = req.params
      db.get("SELECT * FROM properties WHERE id =?", [id], (err, row) => {
        if (err) {
          res.json({ success: false, message: err.message })
        } else {
          res.json(row)
        }
      })
    })

    app.post('/api/properties', (req, res) => {
      const { title, description, price, address, duration, type, owner_id, latitude, longitude } = req.body
      db.run("INSERT INTO properties (title, description, price, address, duration, type, owner_id, latitude, longitude) VALUES (?,?,?,?,?,?,?,?,?)", [title, description, price, address, duration, type, owner_id, latitude, longitude], function(err) {
        if (err) {
          res.json({ success: false, message: err.message })
        } else {
          res.json({ success: true, message: 'Propriété ajoutée', propertyId: this.lastID })
        }
      })
    })

    app.put('/api/properties/:id', (req, res) => {
      const { id } = req.params
      const { title, description, price, address, duration, type, latitude, longitude } = req.body
      db.run("UPDATE properties SET title =?, description =?, price =?, address =?, duration =?, type =?, latitude =?, longitude =? WHERE id =?", [title, description, price, address, duration, type, latitude, longitude, id], function(err) {
        if (err) {
          res.json({ success: false, message: err.message })
        } else {
          res.json({ success: true, message: 'Propriété modifiée' })
        }
      })
    })

    app.listen(port, () => {
      console.log(`Serveur en cours d'exécution sur http://localhost:${port}`)
    })
