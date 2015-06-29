# Jen is a portable and safe Javascript password/number generator

The goal of Jen is to generate password securely using cryptographic approach.
Jen supports 4 engines to generate random bytes :
* NodeJS Crypto API
* W3C Crypto API http://www.w3.org/TR/WebCryptoAPI/
* Microsoft Crypto API https://msdn.microsoft.com/en-us/library/windows/desktop/aa380256(v=vs.85).aspx
* Failsafe

Failsafe uses Math.random() which is bad because the random number generator doesn't use a 
cryptographic approach.

## Hardened passwords
Jen has a hardened passwords generator activated by default which adds specials chars into the password.
For those who have SQL injection in the password field they must set to **false** the **hardened** 
argument at the constructor. 

## Install

### On NodeJS
```bash
npm install node-jen
```

### On browser
```html
<script type="text/javascript" src="path/to/jen.js"></script>
```

## API

### Jen(hardened)
```js
var hdl = new Jen(true);
```
* hardened: Use hardened version includes specials chars into password generator: (default true)

## Jen.password(min, max, hardened)
## Jen.password(min, max)
## Jen.password(min)
This function returns a random String.

* min: Minimum String length (must be upper to 4)
* max: Maximum String length
* hardened: boolean to activate hardened password generator (default true)  

```js
for(var a=0; a<10; a++)
	console.log(hdl.password(10, 30));

for(var a=0; a<10; a++)
	console.log(hdl.password(5));

for(var a=0; a<10; a++)
	console.log(hdl.password(10, 30, true));

for(var a=0; a<10; a++)
	console.log(hdl.password(10, 10, true));
```

## Jen.random(size)
Generate random numbers (integers) into a String.

* size: Size of bytes read from randomBytes

```js
for(var a=0; a<10; a++)
	console.log(hdl.random(4));
```

## Jen.randomBytes(size)
Generate random bytes into an Uint8Array.

* size: Size of bytes read from randomBytes

```js
for(var a=0; a<10; a++)
	console.log(hdl.randomBytes(4));
```

### Jen.engine() 
Returns the current engine in a String
```js
console.log("Engine: "+hdl.engine());
```

### Jen.fill()
This function fill the random buffer line. You don't need to use it.
  
