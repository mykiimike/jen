/*
 * Jen is a portable password generator using cryptographic approach
 * Copyright (C) 2015  Michael VERGOZ @mykiimike
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

"use strict";

var Jen = require(__dirname+"/../jen.js");

var hdl = new Jen(false);

function write(d) {
	console.log(d, hdl.stats());
}

write("Engine: "+hdl.engine());

write("10 Passwords from 10 to 30 w/o hardening");
for(var a=0; a<10; a++)
	write(hdl.password(10, 30));

write("10 Passwords fixed 5 w/o hardening");
for(var a=0; a<10; a++)
	write(hdl.password(5));

write("10 Passwords from 10 to 30 w/ hardening");
hdl.hardening(true);
for(var a=0; a<10; a++)
	write(hdl.password(10, 30));

write("10 Passwords fixed 10 w/ hardening");
for(var a=0; a<10; a++)
	write(hdl.password(10, 10));

write("10 Passwords fixed 10 w/o hardening with regex [A-F0-9]");
hdl.hardening(false);
for(var a=0; a<10; a++)
	write(hdl.password(10, 10, /[A-F0-9]/));

write("One big long password");
hdl.hardening(true);
write(hdl.password(256, 70000));

write("10 Random 4 bytes");
for(var a=0; a<10; a++)
	write(hdl.randomBytes(4));

write("10 Random string (based on 4 bytes)");
for(var a=0; a<10; a++)
	write(hdl.random(4));

write("10 Random number between 2000 and 3000");
for(var a=0; a<10; a++)
	write(hdl.randomBetween(3000, 2000));
