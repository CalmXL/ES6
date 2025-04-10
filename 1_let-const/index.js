// {
//   let a = 1;
//   var b = 2;
// }
//
// // ReferenceError: a is not defined
// // console.log(a);
//
// console.log(b); // => 2

// --------------------------------------
// var a = [];
// for (var i = 0; i < 10; i++) {
//   a[i] = function () {
//     console.log(i);
//   }
// }
// a[6](); // => 10

/*var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  }
}
a[6](); // => 6*/

// -----------------------------
/**
 * 1.2 不存在变量提升
 */

// var 的情况
// console.log(foo); // undefined
// var foo = 2;

// let 的情况
// ReferenceError: Cannot access 'bar' before initialization
// console.log(bar);
// let bar = 2;

/**
 * 1.3 暂时性死区 - temporal dead zone TDZ
 * 只要块级作用内存在 let 命令，它所声明的变量就绑定这个区域，不再受外部的影响。
 */

// var tmp = 123;
//
// if (true) {
//   // ReferenceError: Cannot access 'tmp' before initialization
//   tmp = 'abc';
//   let tmp;
// }

// ----
// if (true) {
//   // TDZ 开始
//   // ReferenceError: Cannot access 'tmp' before initialization
//   // tmp = 'abc';
//   // console.log(tmp);
//
//
//   let tmp;  // TDZ 结束
//   console.log(tmp); // => undefined
//
//   tmp = 123;
//   console.log(tmp); // => 123
// }

// TDZ 意味着 typeof 不再是一个百分百安全的操作
// typeof x; // ReferenceError: Cannot access 'x' before initialization
// let x;

// 如果一个变量没有被声明反而不会报错。
// typeof y; // undefined


// 隐蔽的 TDZ
// ReferenceError: Cannot access 'y' before initialization
// function bar(x = y, y = 2) {
//   return [x, y];
// }
//
// bar();

// function bar2(x = 2, y = x) {
//   return [x, y];
// }
//
// bar2(); // [2, 2]

// 2.3 块级作用域与函数声明
// ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域中声明

// 情况一
// if (true) {
//   function f() {}
// }
//
// // 情况2
// try {
//   function f() {}
// } catch (e) {
//
// }
//
// function f() {
//   console.log('I am outside')
// }
//
// (function () {
//     if (false) {
//       function  f() {
//         console.log('I am inside');
//       }
//     }
//     // TypeError: f is not a function
//     f();
// }());

// 3. const

// 3.1 const 一旦声明，值不可改变。
// const PI = 3.1415;
// TypeError: Assignment to constant variable.
// PI = 3;

// 3.2 const 声明的变量一旦声明必须赋值
// const X;// SyntaxError: Missing initializer in const declaration

// 3.3 const 与 let: 只在声明的块级作用域内有效
// if (true) {
//   const MAX = 3;
// }

// console.log(MAX); // ReferenceError: MAX is not defined

// 3.4 const 不提升 声明的变量也存在暂时性死区，这能在声明的位置后面使用
// if (true) {
//   // ReferenceError: Cannot access 'MAX' before initialization
//   console.log(MAX);
//   const MAX = 3;
// }

// 3.5 不可重复声明
// const x = 1;
// // SyntaxError: Identifier 'x' has already been declared
// const x = 2;

/**
 * const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不可改。
 * 对于简单数据类型，值就保存在变量指向的内存地址。
 * 但对于复合类型，变量保存的是一个指向实际数据的指针，const 只能保证指针固定的。
 */

// const foo = {};

// // 为 foo 添加属性，可以成功
// foo.a = 1;
// foo.b = 2;

// // TypeError: Assignment to constant variable.
// foo = {};

// var constantize = (obj) => {
//   Object.freeze(obj);

//   Object.keys(obj).forEach((key, index) => {
//     if (typeof obj[key] === 'object' && obj[key] !== null) {
//       constantize(obj[key]);
//     }
//   })
// }

// 顶层对象的属性

// var a = 1;

// console.log(window.a); // 1

var a = 1;
let b = 1;

console.log(window.a); // 1
console.log(window.b); // undefined

