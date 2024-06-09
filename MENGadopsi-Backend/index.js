require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoute');
const catRoutes = require('./routes/CatRoute');
const postRoutes = require('./routes/PostRoute');
const adoptionRoutes = require('./routes/AdoptionRoute');
const donationRoutes = require('./routes/DonationRoute');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', userRoutes);
app.use('/cats', catRoutes);
app.use('/posts', postRoutes);
app.use('/adoption', adoptionRoutes);
app.use('/donation', donationRoutes);

const PORT = process.env.PORT || 9453;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});