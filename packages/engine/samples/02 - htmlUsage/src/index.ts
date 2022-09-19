import express from 'express';
import * as path from 'path';

const app = express();
app.use(express.static('public'));
app.use(express.static("node_modules"));
app.use(express.static(path.resolve("../../../../node_modules")));

app.listen(23222);
console.log("Server started on port 23222");