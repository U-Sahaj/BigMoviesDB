"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
// Define the Express app
const app = (0, express_1.default)();
app.use(routes_1.default);
// Define a route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// Connect to MongoDB
mongoose_1.default.connect('mongodb://test-mongo:27017/TestingDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
exports.default = app;