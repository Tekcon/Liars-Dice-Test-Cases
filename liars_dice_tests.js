var expect = require("expect");

describe("Basic inspection of elements on page: ", function() {
    beforeEach(function () {
        browser.get('http://localhost:8080');
    });

    it("Verifies More than 0 players in game.", function () {
        console.log('Checking to see that there are more than 0 Players');
        element.all(by.repeater('hand in games[0].playerHands track by $index')).count().then(function (player_count) {
            expect(player_count > 0).toEqual(true);
            console.log('Found ' + player_count + ' players.');
        });
    });

    it("Verifies Players Hands.", function () {
        console.log('Verifying Player Hands loads in.');
        element.all(by.repeater('hand in games[0].playerHands track by $index')).count().then(function (player_count) {
            for (var i = 0; i < player_count; ++i) {
                var player_hand = element.all(by.repeater('hand in games[0].playerHands track by $index')).get(i);
                player_hand.getText().then(function (player_hand_text) {
                    console.log(player_hand_text);
                    expect(player_hand_text).toNotEqual(null);
                    console.log('Hand is valid.')
                });
            }
        });
    });

    it('Verifies the number of actions taken', function () {
        console.log('Checking to see if any bids have been placed');
        element.all(by.repeater('action in games')).count().then(function (bids_count) {
            expect(bids_count > 0).toEqual(true);
            console.log('Found ' + bids_count + ' bids.');
        });
    });

    it('Verifies bids are not null', function () {
        console.log('Checking that bid text loads in.');
        element.all(by.repeater('action in games')).count().then(function (bids_count) {
            for (var i = 0; i < bids_count; ++i) {
                var bid = element.all(by.repeater('action in games[0].actions track by $index')).get(i);
                bid.getText().then(function (bid_text) {
                    console.log('Found Bid Text: ' + bid_text);
                    expect(bid_text).toNotEqual(null);
                });
            }
        })
    });
});
