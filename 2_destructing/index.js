// 解构 destructing
// 1. 数组的解构赋值
// let [a, b, c] = [1, 2, 3];

// console.log(a, b, c); // 1 2 3

// 本质上，这种写法属于"模式匹配"， 只要等号两边的模式相同，左边的变量就会被赋予对应的值。
// let [a, [[b], c]] = [1, [[2], 3]];
// console.log(a, b, c);// 1 2 3

// let [ , , third] = ['foo', 'bar', 'baz'];
// console.log(third); // baz

// let [x, ,y] = [1, 2, 3];
// console.log(x, y);// 1 3

// let [header, ...tail] = [1, 2, 3, 4];
// console.log(header, tail); // 1 [2, 3, 4];

// let [x, y, ...z] = ['a'];
// console.log(x, y, z); // a undefined []

// 如果解构不成功，变量的值就等于 undefined.
// let [foo] = [];
// let [bar, baz] = [1];

// console.log(foo); // undefined
// console.log(bar, baz); // 1 undefined


// let [x, y] = [1, 2, 3];
// console.log(x, y); // 1 2


// let [a, [b], c] = [1, [2, 3], 4];
// console.log(a, b, c); // 1 2 4

//  set 结构也可以解构
// let [x, y, z ] = new Set(['a', 'b', 'c']);

// console.log(x, y, z); // a b c


// 只要某种数据具有 Iterator 接口，都可以采用数组形式的解构赋值。
// function *fibs() {
//   let a = 0;
//   let b = 1;

//   while (true) {
//     yield a;
//     [a, b] = [b, a + b];
//   }
// }

// let [first, second, third, fourth, fifth, sixth] = fibs();

// console.log(sixth);

// 1.2 默认值

// let [foo = true] = [];
// console.log(foo); // true

// let [x, y = 'b'] = ['a'];
// console.log(x, y); // a b

// let [x, y = 'b'] = ['a', undefined];
// console.log(x, y); // a b

// 注意，ES6 使用严格相等判断一个位置是否存在值。所以只有当一个数组成员严格等于 undefined,
// 默认值才会生效
// let [x1 = 1] = [undefined];

// let [x2 = 1] = [null];
// console.log(x1, x2); // 1 null

// 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候才会求值。
// function f () {
//   console.log('aaa');
// }

// let [x = f()] = [1];
// // f 函数不会执行
// console.log(x); // 1

// 等价
// let x;
// if ([1][0] === undefined) {
//   x= f();
// } else {
//   x = [1][0];
// }

