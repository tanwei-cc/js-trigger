var task;
var stateArr;

describe('限频触发', function() {
    before(function() {
        stateArr = [];
        task = Trigger.create({
            name: 'run 6次，2次触发',
            frequency: 3,
            handler(state) {
                stateArr.push(state);
            }
        });
    });

    it('run 6次，2次触发', () => {
        for (var i = 0; i < 6; i++) {
            task.run();
        }

        should.equal(stateArr.length, 2);
    });
});

describe('限时触发', function() {
    this.timeout(4000);
    before(function() {
        stateArr = [];
        task = Trigger.create({
            name: '3s后触发',
            interval: 3,
            handler(state) {
                stateArr.push(state);
            }
        });
    });

    after(function() {
        task.run();
        should.equal(stateArr.length, 1);
    });

    it('多次run，3s后触发', function(done) {
        for (var i = 0; i < 6; i++) {
            task.run();
        }
        setTimeout(done, 3000);
    });
});

describe('限制最多触发次数', function() {
    before(function() {
        stateArr = [];
        task = Trigger.create({
            name: 'run 6次，最多3次触发',
            frequency: 2,
            maxHandlerFrequency: 3,
            handler(state) {
                stateArr.push(state);
            }
        });
    });

    it('run 6次，最多3次触发', () => {
        for (var i = 0; i < 6; i++) {
            task.run();
        }

        should.equal(stateArr.length, 3);
    });
});