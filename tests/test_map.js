"use strict";

import tape from "tape";
import _test from "tape-promise";
const test = _test(tape);
import Map from "../src/map"; 


test("map should return an object!", assert => {
	const body = document.querySelector("body");
	const marker = document.createElement("div");
	marker.id = "map";
	body.appendChild(marker);

	const map = new Map();	
	const actual = typeof map;
	const expected = "object";
	assert.equal(actual, expected, "this should return a object");

	assert.end();
});

	