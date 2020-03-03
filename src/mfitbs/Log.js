export class Log {
    constructor(context, parent) {
        this._context = context;
        this._parent = parent;
    }

    _completeContext() {
        const pMessage = this._parent ? `${this._parent._completeContext()}` : "";
        const cContext = `${this._context}:`;

        return `${pMessage}${cContext}`;
    }

    debug(message) {
        console.debug(`${this._completeContext()}${message ? message : ""}`);
    }

    exec(contextStr, cb, ...objs) {
        if (objs) {
            const proxies = [];

            objs.forEach((obj) => {
                const newLog = new Log(contextStr, new Log(obj._log._context, this));
                const handler = {
                    get(obj, prop) {

                        if (prop === "_log") {
                            return newLog;
                        }

                        return obj[prop];
                    }
                };
                proxies.push(new Proxy(obj, handler));
            });



            return () => cb(...proxies, this);
        }

        return () => cb(new Log(contextStr, this));
    }
}