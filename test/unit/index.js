var assert = require('assert');
var Trigger = require('../src/');

describe('', function() {
    var name, task;

    name = '限制3次触发';
    it(name, () => {
        task = new Trigger({
            name: name,
            frequency: 3,
            handler(state) {
                // console.log(state.startTime, state.frequency);
            }
        });

        for (var i = 0; i < 3; i++) {
            task.run();
        }
    });

    name = '3s后触发';
    it(name, (done) => {
        var stateArr = [];
        task = new Trigger({
            name: name,
            interval: 3,
            handler(state) {
                stateArr.push(state);
                // console.log(state.startTime, state.frequency);
            }
        });

        for (var i = 0; i < 3; i++) {
            setTimeout(task.run.bind(this), (i + 1) * 1000);
        }

        beforeEach(function(done) {
            this.timeout(4000);

            assert.equal(stateArr.length, 1);

            setTimeout(done, 3500);
        });
    });

    name = '最多处理3次数';
    it(name, () => {
        task = new Trigger({
            name: name,
            frequency: 2,
            maxHandlerFrequency: 3,
            handlerInterval: 1, //间隔30m
            handler(state) {
                // console.log(state.startTime, state.frequency, state.handlerInterval);
            }
        });
    });
});