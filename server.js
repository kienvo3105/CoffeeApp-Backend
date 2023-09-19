import express from 'express'
import connectDB from './src/config/connectDB'
import initRootRoute from './src/routes/root'
import initAuthRoute from './src/routes/authRoutes';

import 'dotenv/config';


const app = express();
const port = process.env.PORT || 8000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

initRootRoute(app);
initAuthRoute(app);

connectDB();


// Xử lý lỗi tự động khi có lỗi trong route handler
app.use((err, req, res, next) => {
    // Xử lý lỗi ở đây
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})