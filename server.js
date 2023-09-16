import express from 'express'
import 'dotenv/config';
import initRootRoute from './src/routes/root'

const app = express();
const port = process.env.PORT || 8000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

initRootRoute(app);

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})