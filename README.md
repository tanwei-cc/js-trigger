js-trigger
==========

Features
----------

- 采用UMD（通用模块定义）
- Node Supported
- Browser Supported

Browser Supported
----------

| Platform | Device          | Version |
|----------|-----------------|---------|
| Desktop  | Chrome          | all     |
| Desktop  | Firefox (Gecko) | 4.0(2)  |
| Desktop  | IE              | 9       |
| Desktop  | Opera           | 11.60   |
| Desktop  | Safari          | 5       |
| Mobile   | Android         | all     |
| Mobile   | Firefox (Gecko) | 4.0(2)  |
| Mobile   | IE Mobile       | ?       |
| Mobile   | Opera Mobile    | 11.50   |
| Mobile   | Safari Mobile   | all     |

Installation
----------

``` bash
npm install --save tanwei-cc/js-trigger
```

Examples & [Tests](https://tanwei-cc.github.io/js-trigger/examples/index.html)
----------

``` javascript

import Trigger from 'js-trigger'; //ES6引入

var Trigger = require('js-trigger').default; //ES5引入

window.Trigger; //browser引入

var trigger = Trigger.create({
    name: '第一个触发器',
    frequency: 5, //每隔5次触发
    interval: 30,  //每隔30s触发
    maxHandlerFrequency: 10,  //最多触发10次
    handlerInterval: 30,  //距离上次触发超过30s再触发
    firstTrigger: true   //首次立刻触发
});

/**
 * 触发器监听事件处理函数
 * @param {Object} state - 当前状态
 * @param {number} handlerCounter - 触发次数统计
 * @param {Date} startTime - 开始时间
 * @param {Date} endTime - 结束时间
 * @param {number} duration - 持续时长(ms)
 * @param {Object[]} data - 追加数据，每次check进行传入
 */
trigger.on(function(state){
  //do something
});

setInterval(function(){
  trigger.check('每次check传入的数据');
}, 1000);

//停止触发器
trigger.stop();

//打开触发器
trigger.open();

//重置触发器
trigger.reset();

//移除触发器监听事件
trigger.off(handler);
//重置所有触发器实例
Trigger.resetAll();
//打开所有触发器实例
Trigger.openAll();
//停止所有触发器实例
Trigger.stopAll();
//移除所有触发器实例
Trigger.removeAll();

```

[Documentation](docs/api.md)
----------

[Changelog](CHANGELOG.md)
----------