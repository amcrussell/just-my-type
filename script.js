


$('#keyboard-upper-container').hide();

let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];

let sentenceAttempt = '';

let curSentence = sentences[0];

let curChar = 0;

let curProgress = 0;

let curCharClass = 0;

let numWords = 0;

let numMistakes = 0;

let wpm = 0;

let start = 0;

let minutes = 0;

let flag = false;


appendSentence();
countWords();

$('#target-letter').append(sentences[0].charAt(0));

$(document).on('keydown', function (event) {

    if (event.shiftKey) {
        $('#keyboard-lower-container').hide();
        $('#keyboard-upper-container').show();

    }

}).on('keyup', function (event) {

    if (!event.shiftKey) {
        $('#keyboard-lower-container').show();
        $('#keyboard-upper-container').hide();

    }

}).on('keypress', function (event) {

    typeGame(event);
    if (isFinished()) {
        flag = true;
        $('#feedback').append('<p>Your WPM is ' + Math.floor(wpm) + '!<br>Click Here to Restart</p>');
        $('#feedback').append('<button id="restart">Click here to play again!</button>')

        $('button#restart').on('click', function () {
            resetGame();
            start = Date.now();
            flag = false;

        });

    } else {

        $('#' + event.which).css('background-color', 'cyan');
    }


}).on('keyup', function (event) {

    $('#' + (event.key).charCodeAt()).css('background-color', '');

}).one('keypress', function () {
    start = Date.now();
});



function typeGame(event) {

    if(flag)
        return

    if (event.key == curSentence[curChar]) {
        $('#feedback').append('<span class="glyphicon glyphicon-ok"></span>');

    } else {
        $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>');
        numMistakes++;

    }

    highlight();
    sentenceAttempt += curSentence[curChar];
    curChar++;
    $('#target-letter').text('');
    $('#target-letter').append(curSentence[curChar]);

}

function appendSentence() {
    let curArray;
    
    if(curSentence == null)
        return;
    curArray = curSentence.split('');

    for (let c = 0; c < curArray.length; c++) {

        $('#sentence').append('<span class=char' + curCharClass + '>' + curArray[c] + '</span>');
        curCharClass++;

    }
    $('.char0').attr('id', 'yellow-block');
    curCharClass = 0;

}

function highlight() {

    $(('.char' + (curChar + 1))).attr('id', 'yellow-block');

    $(('.char' + (curChar))).removeAttr('id', 'yellow-block');

}

function isFinished() {

    if (curSentence === sentenceAttempt) {
        curProgress++;
        curChar = 0;
        if (curProgress == sentences.length) {
            wpmCalc();
            return true;
        } else if(curProgress > sentences.length)
            return

        curSentence = sentences[curProgress];
        $('#sentence').text('');
        appendSentence();
        sentenceAttempt = '';
        $('#target-letter').text('');
        if(curSentence != null)
            $('#target-letter').append(curSentence.charAt(0));
        $('#feedback').text('');

    }

}

function resetGame() {

    curProgress = 0;
    curChar = 0;
    curSentence = sentences[curProgress];
    $('#sentence').text('');
    appendSentence();
    sentenceAttempt = '';
    $('#yellow-block').css('left', '');
    $('#target-letter').text('');
    $('#target-letter').append(curSentence.charAt(0));
    $('#feedback').text('');
    numMistakes = 0;

}

function countWords() {
    for (let c = 0; c < sentences.length; c++) {

        numWords += sentences[c].split(' ').length;

    }
}

function wpmCalc() {

    minutes = (Date.now() - start) / 60000;
    wpm = (numWords / minutes) - (2 * numMistakes);

}