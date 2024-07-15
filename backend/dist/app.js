"use strict";
const express = require("express");
const stockRoutes = require("./routes/stockRoutes");
const connectDB = require("./db");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/stocks", stockRoutes);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
