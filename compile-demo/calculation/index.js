// 计算demo：计算 1 + 2 / 2 * 3 + 2
// https://mp.weixin.qq.com/s/yD9wbG7zYXCNkps4qi9A5Q
const { genTokens }  = require('./lexicalAnalysis');
const { genTree }  = require('./syntaxAnalysis');
const { visitor } = require('./executeCode')



const tokens = genTokens('1 + 2 / 2 * 3 + 2');
const ast = genTree(tokens);
const result = visitor(ast);
console.log(result);