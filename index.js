const express = require('express');
const connectToMongo = require('./db')
connectToMongo();
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})