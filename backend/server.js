const express = require('express');
const cors = require('cors');
const app = express();
const achatsRouter = require('./routes/achats');

app.use(cors());
app.use(express.json());

app.use('/api/achats', achatsRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
