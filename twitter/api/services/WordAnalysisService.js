/**
 * Created by vishwajeetv on 25/07/15.
 */

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
            if(tweet.sentiment.negative.length >= 1) {

                tweet.sentiment.negative.forEach(function (negativeWord) {
                    negativeWords.push(negativeWord);
                })
            }
        });
        allWordAnalysis.positive = analyzeCount(positiveWords);
        allWordAnalysis.negative = analyzeCount(negativeWords);

        return allWordAnalysis;

        function analyzeCount(words) {

            if (words.length == 0) {
                return null;
            }
            var wordAnalysis = {};
            words.forEach(function (word) {
                var hasMatch = false;

                function checkMatch(element, index, words) {
                    return word == element;
                }

                hasMatch = words.some(checkMatch);

                if (hasMatch) {
                    if (wordAnalysis[word]) {
                        wordAnalysis[word] = wordAnalysis[word] + 1;
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
            wordAnalysis = results;

            return wordAnalysis;
        }
}
};