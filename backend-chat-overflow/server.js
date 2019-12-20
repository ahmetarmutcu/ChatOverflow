const express = require('express')
const { admin, firebase, db } = require('./config')

const app = express()
const port = 8080

app.use(express.json());

app.post('/user/signup', async (req, res) => {
  //console.log(req.body)

  await admin.auth().createUser({
    email: req.body.mail,
    emailVerified: false,
    //phoneNumber: '+11234567899',
    password: req.body.password,
    displayName: 'John Doe',
    //photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false
  })
    .then(function (userRecord) {
      console.log(userRecord.uid)
      const JSONData = {
        "status": 200,
        "message": "The user is created succesfully",
        "uid": userRecord.uid
      }
      res.send(JSONData)
    })
    .catch(function (error) {
      const JSONData = {
        "status": 401,
        "message": error.message,
        "uid": ""
      }
      res.send(JSONData)
    });
  res.end()
})

app.post('/user/login', async (req, res) => {
  await firebase.auth().signInWithEmailAndPassword(req.body.mail, req.body.password)
    .then(async function (userRecord) {
      await firebase.auth().signOut().then(function () {

      }).catch(function (error) {
        //Handle error
      });
      const JSONData = {
        "status": 200,
        "message": "The user logged in succesfully",
        "uid": userRecord.user.uid
      }
      res.send(JSONData)
    }).catch(function (error) {
      const JSONData = { "status": 401, "message": error.message, "uid": "" }
      res.send(JSONData)
    });
  res.end()
})

app.post('/question/create', async (req, res) => {
  const uid = req.body.uid
  const questionHeader = req.body.questionHeader
  const questionText = req.body.questionText

  const now = new Date()
  const time = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
  const ref = db.ref('question/' + uid + '/');
  const question = ref.push()
  const questionId = question.key
  await question.set({
    'time': time,
    'questionId': questionId,
    'head': questionHeader,
    'text': questionText,
    'answers': [],
  })

  const JSONData = {
    'status': 200,
    'message': 'The question succesfully created'
  }
  res.send(JSONData)
  res.end()
})

app.post('/answer/create', async (req, res) => {
  const uid = req.body.uid
  const ownerUid = req.body.ownerUid
  const questionId = req.body.questionId
  const answerText = req.body.answerText

  const now = new Date()
  const time = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
  const ref = db.ref('question/' + ownerUid + '/' + questionId + '/').child("answers");
  const answer = ref.push()
  const answerId = answer.key
  await answer.set({
    'time': time,
    'answerId': answerId,
    'uid': uid,
    'text': answerText,
  })

  const JSONData = {
    'status': 200,
    'message': 'The question succesfully created'
  }
  res.send(JSONData)
  res.end()
})

app.get('/question/questions', async (req, res) => {
  const ref = db.ref('question/')
  await ref.once("value", async (snap) => {
    const JSONData = {
      'status': 200,
      'message': 'The questions arrived succesfully',
      'data': snap.val()
    }
    res.send(JSONData)
  })

  res.end()
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))