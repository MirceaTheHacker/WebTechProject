'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('db777', 'root', '')

let app = express()
app.use(express.static(__dirname + '/taskManager'))
app.use(bodyParser.json())
app.locals.tasks = []

let Task = sequelize.define('task', {
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

Task.hasMany(Observation, {
  foreignKey: 'taskId'
})

Observation.belongsTo(Task, {
  foreignKey: 'taskId'
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

app.get('/tasks', (req, res) => {
  Task
    .findAll({
      attributes: ['id','code', 'title','content', 'autoevaluation']
    })
    .then((tasks) => {
      res.status(200).send(tasks)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.get('/tasks/:id', (req, res) => {
  Task
    .find({
      attributes: ['id','code', 'title','content', 'autoevaluation'],
      where: {
        id: req.params.id
      }
    })
    .then((task) => {
      res.status(200).send(task)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.post('/tasks', (req, res) => {
  Task
    .create(req.body)
    .then(() => {
      res.status(201).send('created')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.put('/tasks/:id', (req, res) => {
  Task
    .find({
      where: {
        id: req.params.id
      }
    })
    .then((task) => {
      return task.updateAttributes(req.body)
    })
    .then(() => {
      res.status(201).send('modified')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.delete('/tasks/:id', (req, res) => {
  Task
    .find({
      where: {
        id: req.params.id
      }
    })
    .then((task) => {
      return task.destroy()
    })
    .then(() => {
      res.status(201).send('removed')
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.get('/tasks/:id/observations', (req, res) => {
  Task
    .find({
      where: {
        id: req.params.id
      },
      include: [Observation]
    })
    .then((task) => {
      return task.getObservations()
    })
    .then((observations) => {
      res.status(200).send(observations)
    })
    .catch((error) => {
      console.warn(error)
      res.status(500).send('error')
    })
})

app.get('/tasks/:id/observations/:mId', (req, res) => {
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

app.post('/tasks/:id/observations', (req, res) => {
  console.warn(req.body)
  Task
    .find({
      where: {
        id: req.params.id
      }
    })
    .then((task) => {
      let observation = req.body
      observation.taskId = task.id
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

app.put('/tasks/:id/observations/:mId', (req, res) => {
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

app.delete('/tasks/:id/observations/:mId', (req, res) => {
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
    .then((tasks) => {
      res.status(200).send(tasks)
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
    .then((task) => {
      res.status(200).send(task)
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
