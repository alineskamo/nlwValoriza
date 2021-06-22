import express from 'express';

const app = express();

app.get('/test', (req, res) => {

    return res.send("Olá NLW! :3");
});

app.post('/test-post', (req, res) => {
    return res.send("Olá Post! ^^")
})
//http://localhost:3000
app.listen(3000, () => console.log("Server is running"));