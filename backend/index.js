const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./models");
db.sequelize.sync({ alter: true }); 
db.sequelize.sync();

app.use(cors({
  origin: 'http://localhost:3001', 
  credentials: true, 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Ainosoft application." });
});

const todoRoutes = require('./routes/ToDo');
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
