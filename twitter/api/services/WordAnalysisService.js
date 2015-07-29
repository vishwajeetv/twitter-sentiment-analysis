/**
 * Created by vishwajeetv on 25/07/15.
 */

function analyzeCount(words) {

    var natural = require('natural');
    if (words.length == 0) {
        return null;
    }
    var wordAnalysis = {};
    words.forEach(function (word) {
        var hasMatch = false;

        function checkMatch(element, index, words) {
            return  natural.JaroWinklerDistance(word,element) > 0.8;
        }

        hasMatch = words.some(checkMatch);

        if (hasMatch) {
            if (wordAnalysis[word]) {
                wordAnalysis[word] = parseInt(wordAnalysis[word] + 1);
            }
            else {
                wordAnalysis[word] = 1;
            }

        }
    });
    var results = [];
    for (var key in wordAnalysis) {
        if (wordAnalysis.hasOwnProperty(key)) {
            results.push(
                {
                    word: key, appearances: wordAnalysis[key]
                }
            )
        }
    }
    wordAnalysis = results.sort(
       function (a, b) {
            if (a.appearances > b.appearances) {
                return -1;
            }
            if (a.appearances < b.appearances) {
                return 1;
            }
            // a must be equal to b
            return 0;
        }
    );

    return wordAnalysis;
}

module.exports = {

    countSentimentalWords: function(tweets) {

        var positiveWords = [];
        var negativeWords = [];
        var allWordAnalysis = {};
        tweets.forEach(function(tweet){
            if(tweet.sentiment.positive.length >= 1) {
                tweet.sentiment.positive.forEach(function (positiveWord) {
                    positiveWords.push(positiveWord);
                })

            }
            if(tweet.sentiment. negative.length >= 1) {

                tweet.sentiment.negative.forEach(function (negativeWord) {
                    negativeWords.push(negativeWord);
                })
            }
        });
        allWordAnalysis.positive = analyzeCount(positiveWords);
        allWordAnalysis.negative = analyzeCount(negativeWords);

        return allWordAnalysis;



},

    countAllWords : function(tweets){

        var pos = require('pos');


        var allWords = [];
        tweets.forEach(function(tweet){

            if((typeof (tweet.text) !== undefined)) {


                var words = new pos.Lexer().lex(tweet.text);
                var taggedWords = new pos.Tagger().tag(words);

                taggedWords.forEach(function (word) {

                    if (word[1] == (  "NNP" || "NNPS" || "NNS" )) {
                        if (word[0].length > 2) {
                            allWords.push(word[0]);
                        }
                    }
                });
            }
            });

        var allWordsAnalysis = analyzeCount(allWords)

        return allWordsAnalysis;
        }

};