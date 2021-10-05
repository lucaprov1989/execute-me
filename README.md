# execute-me

## Description
NodeJs and Typescript encripter and decripter tool. It makes uses of PKG library in order to create an executable to spawn a nodeJs child process to execute the decription in background.

## Installation

Install dependencies

```
npm i
```
## Building
Build encrypter and decrypter separetely:

```
npm run build:encrypter
```
```
npm run build:decrypter
```
## Creation of executable
```
pkg ./dist_encrypter
```
```
pkg ./dist_decrypter
```
Now you can run the executable!
