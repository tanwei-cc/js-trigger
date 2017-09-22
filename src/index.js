const queues = [];
const CONFIG_FAILED = '请按文档正确配置';

function log(msg, props) {
    props = props || {};
    if (typeof console !== 'undefined') { //for ie
        console.log('Trigger', msg + '!', props.name || '', props);
    }
}

function getInitalState() {
    return { counter: 0, handlerCounter: 0, stopped: false, startTime: new Date(), data: [] };
}

/**
 * Trigger是一个JavaScript触发器插件，可通过指定频次、指定时间内触发指定的处理函数，使用场景如：限制日志频繁上传、限制ajax频繁调用、错误提醒、网络状态检测等
 * 
 * @author Tango <tanwei_yx@126.com>
 * @version 1.0.0
 */
class Trigger {
    /**
     * 创建一个触发器实例
     * frequency/interval 至少传入一个
     * @param {Object} props - 触发器配置
     * @param {string} props.name - 触发器名称
     * @param {number} props.frequency - [>0]限制频次触发，每隔N次触发
     * @param {number} props.interval - [>0]限制时间间隔触发(s)，每隔N(s)触发
     * @param {number} props.maxHandlerFrequency - [>0]最多触发次数
     * @param {number} props.handlerInterval - [>0]距离上次触发时间间隔(s)
     * @param {boolean} props.firstTrigger - 是否首次立刻触发
     * @example 
     * new Trigger({
     *   name: '',
     *   frequency: 5,
     *   interval: 30
     * })
     * 
     * Trigger.create({
     *   name: '',
     *   frequency: 5,
     *   interval: 30
     * })
     */
    constructor(props) {
        this.reset(props);
        this.handlers = [];
        queues.push(this);
    }

    /**
     * 检查触发器，条件成立会即可触发处理函数
     * @param {*} data - 追加数据，方便触发器执行时获得累加的数据
     */
    check(data) {
        if (!this.props) return;

        const state = this.state;
        const { frequency, interval, maxHandlerFrequency, handlerInterval, firstTrigger } = this.props;
        const now = new Date();

        if (state.stopped) return;

        state.counter++;
        state.callCount = state.callCount ? state.callCount++ : 0;
        data && state.data.push(data);

        //首次立刻执行处理函数
        if (firstTrigger && state.handlerCounter === 0) {
            this.trigger();
            return;
        }

        //最多处理次数
        if (maxHandlerFrequency && state.handlerCounter >= maxHandlerFrequency) {
            return;
        }

        // 距离上次处理结束时间间隔内，不做任何处理
        if (handlerInterval && state.endTime && (now - state.endTime) / 1000 <= handlerInterval) {
            return;
        }

        if (frequency && state.counter >= frequency) {
            this.trigger();
        }

        if (interval && (now - (state.endTime || state.startTime)) / 1000 >= interval) {
            this.trigger();
        }
    }

    /**
     * 打开触发器
     */
    open() {
        this.state.stopped = false;
    }

    /**
     * 停止触发器，可通过open重新打开
     */
    stop() {
        this.state.stopped = true;
    }

    /**
     * 重置触发器，同时也会打开触发器
     * @param {Object} props - [详情](#new_Trigger_new)
     */
    reset(props) {
        if (props) {
            if (!Trigger.checkConfig(props)) {
                log(CONFIG_FAILED, props);
                props = null;
            }
            this.props = props;
        }
        this.state = getInitalState();
    }

    /**
     * 执行触发器处理函数
     */
    trigger() {
        const state = this.state;
        const { startTime, data } = state;
        const handlers = this.handlers;
        const endTime = new Date();
        const duration = endTime - startTime;

        state.endTime = endTime;
        state.counter = 0;
        state.handlerCounter++;
        state.data = [];
        // state.duration = state.endTime - state.startTime;
        // state.desc = (name ? name + ' ' : name) + '第' + state.handlerCounter + '次触发';

        for (var i = 0, l = handlers.length; i < l; i++) {
            handlers[i]({
                handlerCounter: state.handlerCounter,
                startTime: startTime,
                endTime: endTime,
                duration: duration,
                data: data
            });
        }
    }

    /**
     * 触发器监听事件，条件满足立刻触发处理函数
     * @param {Trigger~handler} handler - 处理函数
     */
    on(handler) {
        handler && this.handlers.push(handler);
    }

    /**
     * 移除触发器监听事件
     * @param {Function} handler - 处理函数
     */
    off(handler) {
        const handlers = this.handlers;

        for (var i = 0, l = handlers.length; i < l; i++) {
            if (handlers[i] === handler) {
                handlers.splice(i, 1);
                return;
            }
        }
    }

    /**
     * 检查触发器配置是否有效
     * @param {Object} props - [详情](#new_Trigger_new)
     * @returns {boolean} 
     */
    static checkConfig(props = {}) {
        var { frequency, interval } = props;

        return (frequency && frequency > 0) || (interval && interval > 0);
    }

    /**
     * 创建一个触发器实例
     * @param {Object} props - [详情](#new_Trigger_new)
     */
    static create(props) {
        return new Trigger(props);
    }

    /**
     * 遍历所有触发器实例
     */
    static each(fn) {
        for (var i = 0, l = queues.length; i < l; i++) {
            fn(queues[i], i);
        }
    }

    /**
     * 重置所有触发器实例，同时也会打开触发器
     */
    static resetAll() {
        this.each(task => task.reset());
    }

    /**
     * 停止所有触发器实例
     */
    static stopAll() {
        this.each(task => task.stop());
    }

    /**
     * 移除所有触发器实例
     */
    static removeAll() {
        queues.length = 0;
    }
}

/**
 * 触发器监听事件处理函数
 * @callback Trigger~handler
 * @param {number} handlerCounter - 触发次数统计
 * @param {Date} startTime - 开始时间
 * @param {Date} endTime - 结束时间
 * @param {number} duration - 持续时长(ms)
 * @param {Object[]} data - 追加数据，每次check进行传入
 */

export default Trigger;
export { Trigger }