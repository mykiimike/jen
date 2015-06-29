/*
 * Jen is a portable password generator using cryptographically approach
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

console.log("Engine: "+hdl.engine());
for(var a=0; a<10; a++)
	console.log(hdl.password(10, 30));

for(var a=0; a<10; a++)
	console.log(hdl.password(5));

for(var a=0; a<10; a++)
	console.log(hdl.password(10, 30, true));

for(var a=0; a<10; a++)
	console.log(hdl.password(10, 10, true));



