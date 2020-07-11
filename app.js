const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello Express');
})

app.listen(8000, () => { console.log('Express server is listening on port 8000!'); });


app.get('/burgers', (req, res) =>{
    res.send('We have juicy cheeseburgers')
})

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
})

app.get('/sum', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;

    if(!a){
       return res.status(404).send('error did not recieve an a')
    }

    if(!b){
        return res.status(404).send('error did not recieve a b')
    }

    if(isNaN(parseFloat(a))){
        return res.status(404).send('error a is not a number')
    }

    if(isNaN(parseFloat(b))){
        return res.status(404).send('error b is not a number')
    }

    const sum = parseFloat(a) + parseFloat(b);
    console.log(sum);
    res.send(`sum is ${sum}`);
})


app.get('/cipher', (req, res) => {

    const text = req.query.text.toLowerCase();
    const shift = req.query.shift;

    if(!text){
        return res.status(404).send('error did not recieve text')
    }

    if(!shift){
        return res.status(404).send('error did not recieve shift')
    }
    if(isNaN(parseInt(shift))){
        return res.status(404).send('error did not recieve a number')
    }

    const newText = Array.from(text);
    let arrayOfCharCodes = [];
    let shiftedCodes = [];

    newText.map((x, i) => {
        let charNum = text.charCodeAt(i);
        arrayOfCharCodes.push(charNum);
    });

    arrayOfCharCodes.map((x, i) => {
        if(x + parseInt(shift) > 122){
           let y = (122 - x);
           shifted = (96 + parseInt(shift)) - y;
         }else{
            shifted = x + parseInt(shift);
         }
    
         shiftedCodes.push(String.fromCharCode(shifted));
    })

    let shiftedString = shiftedCodes.join('');

    res.send(`${shiftedString}`);

})


    


app.get('/lotto', (req, res) => {
    let randomArr = [];
    const arr = req.query.arr;
 
    //check if array is sent
    if(!arr){
       return res.status(404).send('error did not recieve any numbers')
    }
    //check is array is 6 items in length
    if(arr.length !== 6){
       return res.status(404).send('arr needs to contain 6 numbers')
    } 
    //check if array has a string
    const checkForString = arr.map(x => isNaN(parseInt(x)));
    if(checkForString.includes(true)){
        return res.status(404).send('arr must contain only numbers');
    }


    //convert all strings to numbers
    const convertedArr = arr.map(x => parseInt(x));

    //check if any number is over 20
    let over20 = convertedArr.filter(x => x > 20);
    if(over20 > 0){
        res.status(404).send('must be a number between 1 and 20');
    }

    //create a random array of numbers
    for(let i = 0; i < 6; i++){
        let num = Math.floor(Math.random() * Math.floor(20));
        randomArr.push(num);
    }

    //check the random array agains the sent array
    let match = randomArr.reduce((allNums, num) => {
       allNums = convertedArr.filter(x => x === num);
       return allNums
    });

    //check if the match array meets any requirements for winning the lotto
    if(match.length < 4){
        res.send('sorry you lose')
    }else if(match.length == 4){
        res.send('Congrats you win a free ticket!')
    }else if(match.length == 5){
        res.send('Congrats you win $100!')
    }else if(match.length == 6){
        res.send('Wow! Unbelievable! You could have won the mega millions!')
    }

    res.end();

    
});