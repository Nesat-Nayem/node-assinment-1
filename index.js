const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const fs = require('fs')
const { stringify } = require('querystring')

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// get all user
app.get('/user/all',(req,res)=>{
   const rawdata = fs.readFileSync('user.json');
    const user = JSON.parse(rawdata)
   res.json(user)
})

// post a user
app.post('/user/save',(req,res)=>{
  const Userdata = req.body;
  const rawdata = fs.readFileSync('user.json', 'utf-8');
  const jsdata = JSON.parse(rawdata)
  jsdata.push(Userdata)
console.log(rawdata)
  const convert = JSON.stringify(jsdata)
  fs.writeFileSync('user.json', convert);
   res.send('User added')
})

// get a single user
app.get('/user/:id',(req,res)=>{
   const rawdata = fs.readFileSync('user.json');
    const user = JSON.parse(rawdata);
  const {id} = req.params;
  const founduser = user.find(user => user.id === Number(id) );

   res.json(founduser)
})



app.put('/user/:id',(req,res)=>{

  const {id} = req.params;
  // console.log(id)
  const filter = {id:id};
  // // const newdata = 
  const rawdata = fs.readFileSync('user.json');
  const jsdata = JSON.parse(rawdata)
  // console.log(jsdata)
  const newdata = jsdata.find(user =>user.id === Number(id));
  newdata.id = id;
  newdata.name = req.body.name;

  res.send('done')

})

// delete a single user
app.delete('/user/delete/:id',(req,res)=>{
  const {id} = req.params;
  const filter = {id:id};
  const rawdata = fs.readFileSync('user.json');
  const jsdata = JSON.parse(rawdata)
  user = jsdata.filter(user =>user.id !== Number(id))
  // fs.writeFileSync('user.json', user);
  const convert = JSON.stringify(user)
  fs.writeFileSync('user.json', convert);
  res.send("deleted success")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})