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

function bar2(x = 2, y = x) {
  return [x, y];
}

bar2(); // [2, 2]
