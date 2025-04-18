// 正则的拓展

// 1. RegExp 构造函数
// 第一种情况，参数是字符串，这时第二个参数表示正则表达式的修饰符。
// let regex = new RegExp('xyz', 'i');
// // 等价于
// let reg2 = /xyz/i;

// 第二种情况，参数是一个正则表达式，这时会返回一个原有正则表达式的拷贝。
// let regex = new RegExp(/xyz/, 'i');
// // 等价于
// let regex2 = /xyz/i;

// let regex = RegExp(/xyz/ig, 'i');
// // 第二个参数指定修饰符，会被第二个参数 i 覆盖。
// console.log(regex); // => /xyz/i


// 2. 字符串的正则方法

// 3. u 修饰符
// const res = /^uD83D/u.test('\uD83D\uDC2A');
// console.log(res); // false

// const res2 = /^uD83D/.test('\uD83D\uDC2A');
// console.log(res2); // false

// (1) 点字符
// 在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于 0xFFFF 的Unicode 字符，点字符不能识别，必须加上 u 修饰符。
// let s = '𠮷';

// console.log(/^.$/.test(s)); // false
// console.log(/^.$/u.test(s)); // true

// (2) Unicode 字符表示法
// ES6 新增了使用大括号 Unicode 字符，这种表示法在正则表达式中必须加上 u 修饰符，才能识别当中的大括号，否则会被解读为量词。

// console.log(/\u{61}/.test('a')); // false
// console.log(/\u{61}/u.test('a')); // true
// console.log(/\u{20BB7}/u.test('𠮷')); // true

// (3) 量词
// 使用 u 修饰符，所有量词都会正确识别码点大于 0xFFFF /a{2}/.test('aa') // true
// const r1 = /a{2}/.test('aa') // true
// const r2 = /a{2}/u.test('aa') // true
// const r3 = /𠮷{2}/.test('𠮷𠮷') // false
// const r4 = /𠮷{2}/u.test('𠮷𠮷') // true

// console.log(r1, r2, r3, r4); // true true false true

// (4) 预定义模式
// u 修饰符也影响到预定义模式，能否正确识别码点大于 0xFFFF 的 Unicode 字符。
// \S 预定义模式，匹配所有的非空白字符。只有加了 u 修饰符，才能正确匹配码点大于 0xFFFF 的字符，
// const r1 = /^\S$/.test('𠮷'); // false
// const r2 = /^\S$/u.test('𠮷'); // true

// console.log(r1, r2);

// 利用这一点，可以写出一个正确返回字符串长度的函数。
// function codePointLength (text) {
//   var result = text.match(/[\s\S]/gu);
//   return result ? result.length : 0;z
// }

// var s = '𠮷𠮷';
// console.log(s.length); // 4
// console.log(codePointLength(s)); // 2

// (5) i 修饰符
// 有些 Unicode 字符的编码不同，但是字型很相近。
// \u004B 与 \u212A 都是大写的 K
console.log(/[a-z]i/.test('\u212A')); // false
console.log(/[a-z]iu/.test('\u212A')); // true

// (6) 转义
// 没有 u 修饰符的情况下，正则中没有定义的转义，（\,）无效，而 u 模式会报错。
/\,/u








