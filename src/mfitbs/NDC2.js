class D {
    constructor() {
        this._log = new Log(D.name);
    }

    m() {
        this._log.debug("D.m()");
    }
}


class C {
    constructor() {
        this._log = new Log(C.name);
    }

    m() {
        this._log.debug("C.log");

        const d = new D(this._log);

        d.m();
    }
}

class B {
    constructor() {
        this._log = new Log(B.name);
    }

    m() {
        this._log.debug("message3");
    }
}

class A {
    constructor() {
        this._log = new Log(A.name);
    }

    m() {
        this._log.debug("message1");

        const b = new B();
        const c = new C();

        //użyj "otherContext" dla tych wywołań
        {
            b.m();
            c.m();
        }
    }
}

const log = new Log("Main");
const a = new A();

const url = "http://example.com";

//uzyj url jako kontekstu
{

    setTimeout(() => a.m(), 1000);
}



/*

Main:message2
Main:A:context2:message1
Main:other
Main:A:context2:B:otherContext:message3
Main:A:context2:C:otherContext:C.m()
Main:A:context2:C:otherContext:D:D.m()



 */



