var inquirer = require('inquirer');
var fs = require('fs');


var readCards = require('./basic.json');
console.log(readCards);

function BasicCard(frontSide, backSide) {
    this.front = frontSide;
    this.back = backSide;
}

function createNewCard() {
    inquirer.prompt([{
        type: "input",
        name: "frontSide",
        message: "What is your question, my lord?"
    }, {
        type: "input",
        name: "backSide",
        message: "What is your answer?"
    }]).then(function(inputs) {
        var flashCard = new BasicCard(inputs.frontSide, inputs.backSide);
        readCards.push(flashCard);
        var newFlashCard = JSON.stringify(readCards, null, '\t');
        fs.writeFile('./basic.json', newFlashCard, function(error) {
            if (error) throw error;
            console.log("finished");
        })
    })
}
createNewCard();
module.exports = basicCards;