var inquirer = require('inquirer');
var fs = require('fs');

var cardData = require('./cloze.json');

function ClozeCard(fullText, answer) {
    var clozeAnswers = changeCloze(fullText, answer);
    this.partial = getPartial(fullText, clozeAnswers);
    this.answer = answer;

    function changeCloze(fullText, answer) {
        var start = fullText.indexOf(answer);
        if (start !== -1) {
            return [start, start + answer.length];
        }
        throw new Error('Nothing there dude');
    }

    function getPartial(fullText, clozeAnswers) {
        var start = fullText.slice(0, clozeAnswers[0]);
        var end = fullText.slice(clozeAnswers[1], fullText.length);
        return start + " ... " + end;
    }
}

ClozeCard.prototype.displayCard = function displayCard() {
    console.log(this.partial.replace('...', this.answer));
}

function createNewCard() {
    inquirer.prompt([{
        type: "input",
        name: "fullText",
        message: "What is your flashcard question?"
    }, {
        type: "input",
        name: "answer",
        message: "What is your flashcard answer?"
    }]).then(function(inputs) {
        var flashCard = new ClozeCard(inputs.fullText, inputs.answer);
        flashCard.displayCard();
        cardData.push(flashCard);
        var newCardData = JSON.stringify(cardData, null, '\t');
        fs.writeFile('./cloze.json', newCardData, function(error) {
            if (error) throw error;
            console.log("finished");
        })
    })
}
createNewCard();
module.exports = clozeCards;