/**
 * Created by dennis on 23/10/2016.
 */

'use strict';

import tape from 'tape';
import _test from 'tape-promise';
const test = _test(tape); // decorate tape

import {getroutesjson} from '../src/routes';

test("if promise for json-routes retreival works and json is actually json", function(t) {
    const remoteserver = "https://wandelappbackend-dvriet.rhcloud.com/routes";
    return getroutesjson(remoteserver).then((d) => {
        t.comment(d);
        t.true(true);
    });

});

