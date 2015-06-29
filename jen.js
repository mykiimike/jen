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

var _serverSide = false;

function JenFailsafe() { }

/* not a cryptographic approach */
JenFailsafe.getRandomValues = function(buffer) {
	if (!(buffer instanceof Uint8Array))
		buffer = new Uint8Array(256);
	
	var rd = 0;
	for(var a=0; a<buffer.length; a++) {
		while(1) {
			rd = Math.round(Math.random()*256);
			if(rd >= 0 && rd <= 255)
				break;
		}
		buffer[a] = rd;
	}
	return(buffer);
};

function Jen(hardened) {
	if(!(this instanceof Jen))
		return new Jen(hardened);
	this.hardened = hardened && hardened == true ? hardened : false;
	this.dump = new Uint8Array(256);
	this.mode = '';
	if(_serverSide == true) {
		this.crypto = require("crypto");
		this.mode = "NodeJS CryptoAPI";
	}
	else {
		this.crypto = window.crypto || window.msCrypto;
		if(window.crypto) {
			this.mode = "W3C CryptoAPI";
			this.crypto = window.crypto;
		}
		else if(window.msCrypto) {
			this.mode = "Microsoft CryptoAPI";
			this.crypto = window.msCrypto;
		}
		if(!this.crypto) {
			this.mode = "Failsafe";
			this.crypto = JenFailsafe;
		}
	}
}

Jen.prototype.engine = function() {
	return(this.mode);
};

Jen.prototype.fill = function() {
	if(_serverSide == true)
		this.dump = this.crypto.randomBytes(256);
	else
		this.crypto.getRandomValues(this.dump);
};

Jen.prototype.randomBytes = function(size) {
	if(size <= 0)
		size = 1;
	
	if(_serverSide == true)
		return(this.crypto.randomBytes(size));
	
	var r = new Uint8Array(size);
	this.crypto.getRandomValues(r);
	return(r);
};

Jen.prototype.random = function(size) {
	if(_serverSide == true)
		return(this.randomBytes(size).toString("hex"));
	
	var d = this.randomBytes(size), r = '';
	for(var a=0; a<d.length; a++)
		r += parseInt(d[a]);
	
	return(r);
};

Jen.prototype.hardening = function(bool) {
	this.hardened = bool && bool == true ? bool : true;
};

Jen.prototype.password = function(min, max, regex) {
	if(!(regex instanceof RegExp))
		regex = null;

	min = min < 4 ? 4 : min;
	max = max > min ? max : min;

	var b = 0, ret = '';
	var cur = 0;
	while(cur == 0) {
		this.fill();
		var array = this.dump;
		for (var a=0; a < array.length; a++) {
			if(array[a] >= min && array[a] <= max) {
				cur = array[a];
				break;
			}
		}
	}

	b = 0;
	while(b < cur) {
		this.fill();
		var array = this.dump;
		for (var a=0; a < array.length && b < cur; a++) {
			if(
				(array[a] >= 0x30 && array[a] <= 0x39) ||
				(array[a] >= 0x41 && array[a] <= 0x5a) ||
				(array[a] >= 0x61 && array[a] <= 0x7a)) {
				if(regex) {
					if(regex.test(String.fromCharCode(array[a]))) {
						ret += String.fromCharCode(array[a]);
						b++;
					}
				}
				else {
					ret += String.fromCharCode(array[a]);
					b++;
				}
			}
			else if(this.hardened == true && (
					array[a] == 0x21 ||
					array[a] == 0x23 ||
					array[a] == 0x25 ||
					(array[a] == 0x28 && array[a] <= 0x2f) ||
					(array[a] == 0x3a && array[a] <= 0x40)
				)) {
				if(regex) {
					if(regex.test(String.fromCharCode(array[a]))) {
						ret += String.fromCharCode(array[a]);
						b++;
					}
				}
				else {
					ret += String.fromCharCode(array[a]);
					b++;
				}
			}
		}
	}
	this.fill();
	return(ret);

};

if(typeof module !== 'undefined' && module.exports) {
	_serverSide = true;
	module.exports = Jen;
}



