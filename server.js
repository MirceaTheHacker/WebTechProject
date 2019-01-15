//Penisache
'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('db777', 'root', '')

let app = express()
app.use(express.static(__dirname + '/playlistManager'))
app.use(bodyParser.json())
app.locals.playlists = []

let Playlist = sequelize.define('playlist', {
  code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  autoevaluation: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

let Observation = sequelize.define('observation', {
  subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  relevance:{
    type: Sequelize.TEXT,
    allowNull: false
  }
})

let Information = sequelize.define('information', {
  subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  resource: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

Playlist.hasMany(Observation, {
  foreignKey: 'playlistId'
})

Observation.belongsTo(Playlist, {
  foreignKey: 'playlistId'
})

app.get('/create', (req, res) => {
  sequelize
    .sync({
      force: true
    })
    .then(() => {
      res.status(201).send('created')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.get('/playlist', (req, res) => {
  Playlist
    .findAll({
      attributes: ['id','code', 'title','content', 'autoevaluation']
    })
    .then((playlists) => {
      res.status(200).send(playlists)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.get('/playlists/:id', (req, res) => {
  Playlist
    .find({
      attributes: ['id','code', 'title','content', 'autoevaluation'],
      where: {
        id: req.params.id
      }
    })
    .then((playlist) => {
      res.status(200).send(playlist)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.post('/playlists', (req, res) => {
  Playlist
    .create(req.body)
    .then(() => {
      res.status(201).send('created')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.put('/playlists/:id', (req, res) => {
  Playlist
    .find({
      where: {
        id: req.params.id
      }
    })
    .then((playlist) => {
      return playlist.updateAttributes(req.body)
    })
    .then(() => {
      res.status(201).send('modified')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.delete('/playlists/:id', (req, res) => {
  Playlist
    .find({
      where: {
        id: req.params.id
      }
    })
    .then((playlist) => {
      return playlist.destroy()
    })
    .then(() => {
      res.status(201).send('removed')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.get('/playlists/:id/observations', (req, res) => {
  Playlist
    .find({
      where: {
        id: req.params.id
      },
      include: [Observation]
    })
    .then((playlist) => {
      return playlist.getObservations()
    })
    .then((observations) => {
      res.status(200).send(observations)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.get('/playlists/:id/observations/:mId', (req, res) => {
  Observation
    .find({
      attributes: ['id', 'subject', 'content','relevance'],
      where: {
        mId: req.params.id
      }
    })
    .then((observation) => {
      res.status(200).send(observation)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.post('/playlists/:id/observations', (req, res) => {
  console.warn(req.body)
  Playlist
    .find({
      where: {
        id: req.params.id
      }
    })
    .then((playlist) => {
      let observation = req.body
      observation.playlistId = playlist.id
      return Observation.create(observation)
    })
    .then(() => {
      res.status(201).send('created')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.put('/playlists/:id/observations/:mId', (req, res) => {
  Observation
    .find({
      where: {
        id: req.params.mId
      }
    })
    .then((observation) => {
      observation.subject= req.body.subject
      observation.content = req.body.content
      observation.relevance=req.body.relevance
      return observation.save()
    })
    .then(() => {
      res.status(201).send('modified')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })

})

app.delete('/playlists/:id/observations/:mId', (req, res) => {
  Observation
    .find({
      where: {
        id: req.params.mId
      }
    })
    .then((observation) => {
      return observation.destroy()
    })
    .then(() => {
      res.status(201).send('removed')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})







app.get('/informations', (req, res) => {
  Information
    .findAll({
      attributes: ['id','subject', 'resource']
    })
    .then((playlists) => {
      res.status(200).send(playlists)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.get('/informations/:id', (req, res) => {
  Information
    .find({
      attributes: ['id','subject', 'resource'],
      where: {
        id: req.params.id
      }
    })
    .then((playlist) => {
      res.status(200).send(playlist)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})


app.put('/informations/:id', (req, res) => {
  Information
    .find({
      where: {
        id: req.params.id
      }
    })
    .then((information) => {
      return information.updateAttributes(req.body)
    })
    .then(() => {
      res.status(201).send('modified')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.delete('/informations/:id', (req, res) => {
  Information
    .find({
      where: {
        id: req.params.id
      }
    })
    .then((information) => {
      return information.destroy()
    })
    .then(() => {
      res.status(201).send('removed')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})


app.listen(3030)
