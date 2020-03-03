import {A} from "./Classes.js";
import {Log} from "./Log.js";

const log = new Log("Main");
const a = new A(log);

//Main:url:message2
//Main:url:context2:A:message1
//Main:url:context2:otherContext:B:message3
//Main:url:context2:other
//Main:A:context2:C:otherContext:C.log


    const call = log.exec("http://example.com",(log) => {
        setTimeout(log.exec("context2", (a, log) => {

        a.m();

        log.debug("other");

    }, a), 1000);

    log.debug("message2");
});

call();


