import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Auktion")
})

app.listen(port,()=>{
    console.log(`Servern kör på http://localhost:${port}`)
});