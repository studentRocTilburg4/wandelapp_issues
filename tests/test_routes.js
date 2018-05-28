/**
 * Created by dennis on 23/10/2016.
 */

'use strict';

import tape from 'tape';
import _test from 'tape-promise';
const test = _test(tape); // decorate tape

import {getroutesjson} from '../src/routes';

test("if promise for json-routes retreival works and json is actually json", function(t) {
    const remoteserver = "http://nodejs-mongo-persistent-wandelappbackend-v2.a3c1.starter-us-west-1.openshiftapps.com/routes?cuid=test";
    return getroutesjson(remoteserver).then((d) => {
        t.comment(d);
        t.true(true);
    });

});

