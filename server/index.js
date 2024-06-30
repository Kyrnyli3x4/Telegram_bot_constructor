const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const botRoutes = require('./routers/botRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/bot', botRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
