import bbParser from './BillBoardParser';
import express from 'express';

// const run = async () => {
//     // let content = await bbParser.getHTML('https://www.billboard.com/charts')
//     let content = await bbParser.parseCharts()
//     // console.log(content);
// }

// run();


const app = express();


app.get('/', async (req, res) => {


    let content = await bbParser.parseCharts()
    console.log(content);


    return res.json(content);

})



app.listen(3030, () => {
    console.log(`Listening to server on port 3030`);

})

