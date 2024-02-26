const express = require('express');
const connectToMongo = require('./db')
connectToMongo();
const app = express()
const port = 5000

app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/complain', require('./routes/complain'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})