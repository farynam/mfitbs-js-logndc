import {Log} from "./Log.js";


export class D {
    constructor(pLog) {
        this._log = new Log(D.name, pLog);
    }

    m() {
        this._log.debug("D.m()");
    }
}


export class C {
    constructor(pLog) {
        this._log = new Log(C.name, pLog);
    }

    m() {
        this._log.debug("C.m()");

        const d = new D(this._log);

        d.m();
    }
}



export class B {
    constructor(pLog) {
        this._log = new Log(B.name, pLog);
    }

    m() {
        this._log.debug("message3");
    }
}

export class A {
    constructor(pLog) {
        this._log = new Log(A.name, pLog);
    }

    m() {
        const log = this._log;

        log.debug("message1");

        const b = new B(log);
        const c = new C(log);


        setTimeout(log.exec("otherContext", (b, c, log) => {
            b.m();
            c.m();
        }, b, c), 1000);
    }
}