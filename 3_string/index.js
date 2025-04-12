// 1. 字符的 Unicode 方法
// ES6 允许采用 \xxxx 形式表示一个字符

// console.log('\u0061'); // a

// // 但是这种表示只限于码点在 \u0000-\uFFFF 之间的字符，超出范围必须采用双字节的形式表示。
// console.log("\uD842\uDFB7"); // 𠮷


// 理解为 \u20BB +7
// \u20bb 是一个不可打印字符
// console.log('\u20BB7'); // " 7" 

// ES6 做出了改变

// console.log('\u{20BB7}'); // 𠮷

// console.log('\u{41}\u{42}\u{43}'); // ABC

// 有了这种表示的方法， js 共有六种方法可以表示一个字符。
// console.log('\z' === 'z'); // true
// console.log('\172' === 'z'); // true
// console.log('\x7a' === 'z'); // true
// console.log('\u007A' === 'z'); // true
// console.log('\u{7A}' === 'z'); // true


// 2. 字符串的遍历接口 for...of
// for (let codePoint of 'foo') {
//   console.log(codePoint);
// }
// f
// o
// o

// 除了遍历字符串，这个遍历器最大的优点是可以识别大于 0xFFFF 的码点。
// let text = String.fromCodePoint(0x20BB7);

// for (let i = 0;i < text.length; i++) {
//   console.log(text[i]);
// }
// // �
// // �

// for (let i of text) {
//   console.log(i);
// }
// // 𠮷


// 3. u+2028 和 u+2029
// JS 允许字符串直接输入字符，以及输入字符的转义形式。
// console.log('中' === '\u4e2d'); // true
/**
 * js 规定有五个字符，不能再字符串里面直接使用，只能使用转义字符。
 * 
 * U+005C: 反斜杠
 * U+000D: 回车
 * U+2028: 行分隔符
 * U+2029: 段分隔符
 * U+000A: 换行符
 */


// 4. JSON.stringify() 



// 字符串的新增方法

// 1. .String.fromCodePoint
// // 返回从 unicode  码点返回对应字符，但是该方法不能识别码点大于 0xFFFF 的字符。
// console.log(String.fromCharCode(0x20BB7)); // ஷ

// // ES6 提供了 String.fromCodePoint 方法，可以识别大于 0xFFFF的字符。
// console.log(String.fromCodePoint(0x20BB7)); // 𠮷

// // String.fromCodePoint 方法多个参数，则它们会被合并成一个字符串返回。
// console.log(String.fromCodePoint(0x78, 0x1f680, 0x79)); // x🚀y
// console.log(String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y');

// 2.  String.raw()
// 该方法返回一个斜杠都被转义的字符串，往往用于模板字符串的处理方法。

// console.log(String.raw`Hi\n${2+3}`); // => 实际返回 Hi\\n5, 显示后的转义 Hi\n5

// const res = String.raw`Hi\u000A!`;
// console.log(res); // => 实际 Hi\\u000A! 转义 Hi\u000A!

// 如果原字符串的斜杠已经转义，那么String.raw 会进行再次转义。
// console.log(String.raw`Hi\\n`); // => 实际 Hi\\\n， 显示 Hi\\n

// console.log(String.raw`Hi\\n` === 'Hi\\\\n'); // true

/**
 * String.raw() 本质上是一个正常的函数，只是专用于模板字符串的标签函数。
 */
// `foo${1 + 2}bar`
// const str = String.raw({
//   raw: ['foo', 'bar'],
// }, 1 + 2);

// console.log(str); // => foo3bar

// 实现
// String.raw = function (strings, ...values) {
//   let output = '';
//   let index;
//   for (index = 0; index < values.length; index++) {
//     output += strings.raw[index] + values[index];
//   }

//   output += strings.raw[index];
//   return output;
// }

// 3. codePointAt
/**
 * js 内部，字符以 UTF-16 格式存储，每个字符固定为 2 个字节。
 * 对于那些需要 4 个字节存储的字符，js 认为它们是两个字符。
 */

// let s = '𠮷';

// console.log(s.length); // 2
// console.log(s.charAt[0]); // ''
// console.log(s.charAt[1]); // ''
// console.log(s.charCodeAt(0)); // 55362
// console.log(s.charCodeAt(1)); // 57271

// 4. normalize


// replaceAll
// let str = 'aabbcc';
// // replace 只能替换第一个匹配
// console.log(str.replace('b', '_')); // => aa_bcc

// // 如果要替换所有的匹配，不得不使用正则表达式的 g 修饰符。
// console.log(str.replace(/b/g, '_')); // aa__cc

// // ES2021 引入了 replaceAll()
// // 与 replace 使用方法相同，返回一个新的字符串，不会改变原来的字符。
// console.log(str.replaceAll('b', '_')); // aa__cc

/**
 * String.prototype.replaceAll(searchVal, replacement);
 * - searchVal: 搜索模式，可以是字符串也可是一个全局的正则表达式(带有 g 修饰符)
 *              如果不带有 g 修饰符的正则表达式，那么会报错
 */

// TypeError: String.prototype.replaceAll called with a non-global RegExp argument
// str.replaceAll(/b/, '_');

/**
 * replaceAll 的第二个参数 replacement 是一个字符串，表示特殊的字符串。 
 * 其中可以使用一些特殊字符串。
 * 
 * $&: 匹配的字符串
 * $`: 匹配结果前面的文本
 * $': 匹配结果后面的文本
 * $n: 匹配成功的第 n 组内容，n 从自然数 1 开始的，第一个参数必须是正则。
 * $$: 代指美元符号。
 */

// let str = 'abbc';

// 匹配的字符串
// console.log(str.replaceAll('b', '$&')); // abbc

// 匹配结果之前的结果
// 第一个 b -> a
// 第二个 b -> ab
// console.log(str.replaceAll('b', '$`'));
//aaabc

// $' 表示匹配之后的字符串
// 第一个 b -> bc
// 第二个 b -> c  
// console.log(str.replaceAll('b', `$\'`));
// abccc

// $1: 表示正则表达式的第一个组匹配
// $2: 表示正则表达式第二个组匹配 
// console.log(str.replaceAll(/(ab)(bc)/g, '$2$1'));
// // bcab

// console.log(str.replaceAll('b', '$$'));
// a$$c

/**
 * replaceAll 第二个参数也可以是一个函数。该函数返回值会替换掉所有 b 的匹配。
 * 
 * 该替换函数可以接受多个参数。
 * 第一个参数对应捕捉到的匹配内容。
 * 第二个参数是捕捉到的组的匹配（有多少个组匹配，有多少个对应的参数）。
 * 最后还可以添加两个参数，
 * 倒数第二个参数是捕捉到的内容在整个字符串中的位置，
 * 最后一个参数是原字符串。
 */

// const str = '123abc456';
// const regex = /(\d+)([a-z]+)(\d+)/g;

// function replacer(match, p1, p2, p3, offset, string) {
//   console.log(match, p1, p2, p3, offset, string);
  
//   return [p1, p2, p3].join('-');
// }

// const str1 = str.replaceAll(regex, replacer);
// console.log(str1); // 123-abc-456


// at 方法
// 接受一个整数作为参数，返回参数指定位置的字符，支持负索引。
// 如果参数的位置超出了字符串的范围，at() 返回 undefined.
const str = 'hello';

console.log(str.at(1)); // => e
console.log(str.at(-1)); // => o

console.log(str.at(10)); // undefined

// 实例方法: toWellFormed()




















