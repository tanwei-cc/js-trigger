<a name="Trigger"></a>

## Trigger
Trigger是一个JavaScript触发器插件，可通过指定频次、指定时间内触发指定的处理函数，使用场景如：限制日志频繁上传、限制ajax频繁调用、错误提醒、网络状态检测等

**Kind**: global class  
**Version**: 1.0.0  
**Author**: Tango <tanwei_yx@126.com>  

* [Trigger](#Trigger)
    * [new Trigger(props)](#new_Trigger_new)
    * _instance_
        * [.check(data)](#Trigger+check)
        * [.open()](#Trigger+open)
        * [.stop()](#Trigger+stop)
        * [.reset(props)](#Trigger+reset)
        * [.trigger()](#Trigger+trigger)
        * [.on(handler)](#Trigger+on)
        * [.off(handler)](#Trigger+off)
    * _static_
        * [.checkConfig(props)](#Trigger.checkConfig) ⇒ <code>boolean</code>
        * [.create(props)](#Trigger.create)
        * [.each()](#Trigger.each)
        * [.resetAll()](#Trigger.resetAll)
        * [.openAll()](#Trigger.openAll)
        * [.stopAll()](#Trigger.stopAll)
        * [.removeAll()](#Trigger.removeAll)
    * _inner_
        * [~handler](#Trigger..handler) : <code>function</code>

<a name="new_Trigger_new"></a>

### new Trigger(props)
创建一个触发器实例
frequency/interval 至少传入一个


| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | 触发器配置 |
| props.name | <code>string</code> | 触发器名称 |
| props.frequency | <code>number</code> | [>0]限制频次触发，每隔N次触发 |
| props.interval | <code>number</code> | [>0]限制时间间隔触发(s)，每隔N(s)触发 |
| props.maxHandlerFrequency | <code>number</code> | [>0]最多触发次数 |
| props.handlerInterval | <code>number</code> | [>0]距离上次触发时间间隔(s) |
| props.firstTrigger | <code>boolean</code> | 是否首次立刻触发 |

**Example**  
```js
new Trigger({
  name: '',
  frequency: 5,
  interval: 30
})

Trigger.create({
  name: '',
  frequency: 5,
  interval: 30
})
```
<a name="Trigger+check"></a>

### trigger.check(data)
检查触发器，条件成立会即可触发处理函数

**Kind**: instance method of [<code>Trigger</code>](#Trigger)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | 追加数据，方便触发器执行时获得累加的数据 |

<a name="Trigger+open"></a>

### trigger.open()
打开触发器

**Kind**: instance method of [<code>Trigger</code>](#Trigger)  
<a name="Trigger+stop"></a>

### trigger.stop()
停止触发器，可通过open重新打开

**Kind**: instance method of [<code>Trigger</code>](#Trigger)  
<a name="Trigger+reset"></a>

### trigger.reset(props)
重置触发器，同时也会打开触发器

**Kind**: instance method of [<code>Trigger</code>](#Trigger)  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | [详情](#new_Trigger_new) |

<a name="Trigger+trigger"></a>

### trigger.trigger()
执行触发器处理函数

**Kind**: instance method of [<code>Trigger</code>](#Trigger)  
<a name="Trigger+on"></a>

### trigger.on(handler)
触发器监听事件，条件满足立刻触发处理函数

**Kind**: instance method of [<code>Trigger</code>](#Trigger)  

| Param | Type | Description |
| --- | --- | --- |
| handler | [<code>handler</code>](#Trigger..handler) | 处理函数 |

<a name="Trigger+off"></a>

### trigger.off(handler)
移除触发器监听事件

**Kind**: instance method of [<code>Trigger</code>](#Trigger)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | 处理函数 |

<a name="Trigger.checkConfig"></a>

### Trigger.checkConfig(props) ⇒ <code>boolean</code>
检查触发器配置是否有效

**Kind**: static method of [<code>Trigger</code>](#Trigger)  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | [详情](#new_Trigger_new) |

<a name="Trigger.create"></a>

### Trigger.create(props)
创建一个触发器实例

**Kind**: static method of [<code>Trigger</code>](#Trigger)  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | [详情](#new_Trigger_new) |

<a name="Trigger.each"></a>

### Trigger.each()
遍历所有触发器实例

**Kind**: static method of [<code>Trigger</code>](#Trigger)  
<a name="Trigger.resetAll"></a>

### Trigger.resetAll()
重置所有触发器实例，同时也会打开触发器

**Kind**: static method of [<code>Trigger</code>](#Trigger)  
<a name="Trigger.openAll"></a>

### Trigger.openAll()
打开所有触发器实例

**Kind**: static method of [<code>Trigger</code>](#Trigger)  
<a name="Trigger.stopAll"></a>

### Trigger.stopAll()
停止所有触发器实例

**Kind**: static method of [<code>Trigger</code>](#Trigger)  
<a name="Trigger.removeAll"></a>

### Trigger.removeAll()
移除所有触发器实例

**Kind**: static method of [<code>Trigger</code>](#Trigger)  
<a name="Trigger..handler"></a>

### Trigger~handler : <code>function</code>
触发器监听事件处理函数

**Kind**: inner typedef of [<code>Trigger</code>](#Trigger)  

| Param | Type | Description |
| --- | --- | --- |
| handlerCounter | <code>number</code> | 触发次数统计 |
| startTime | <code>Date</code> | 开始时间 |
| endTime | <code>Date</code> | 结束时间 |
| duration | <code>number</code> | 持续时长(ms) |
| data | <code>Array.&lt;Object&gt;</code> | 追加数据，每次check进行传入 |

