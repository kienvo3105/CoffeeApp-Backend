import express from 'express'
import connectDB from './src/config/connectDB'
import initRootRoute from './src/routes/root'
import initAuthRoute from './src/routes/authRoutes';
import initUserRoute from './src/routes/userRoutes';
import initBranchRoute from './src/routes/branchRoutes';
import initAddressRoute from './src/routes/addressRoutes';
import initManagerRoute from './src/routes/managerRoutes';
import initCategoryRoute from './src/routes/categoryRoutes';
import initProductRoute from './src/routes/productRoutes';
import initOrderRoute from './src/routes/orderRoutes';


import cors from 'cors';
import 'dotenv/config';


const app = express();
app.use(cors({ origin: true }))

const port = process.env.PORT || 8000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

initRootRoute(app);
initAuthRoute(app);
initUserRoute(app);
initBranchRoute(app);
initAddressRoute(app);
initManagerRoute(app);
initCategoryRoute(app)
initProductRoute(app);
initOrderRoute(app);


connectDB();


// Xử lý lỗi tự động khi có lỗi trong route handler
app.use((err, req, res, next) => {
    // Xử lý lỗi ở đây
    console.error(err);
    res.status(500).json({ errorMessage: 'Something went wrong server' });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})