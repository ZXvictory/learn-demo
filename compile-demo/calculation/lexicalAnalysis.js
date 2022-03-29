const isOperator = (str) => {
  return /[\+\-\*\/]/.test(str);
}

// 词法分析
const genTokens = (str) => {
  if (!/^(\d|\s|\+|\-|\*|\/)+$/.test(str)) {
    // 空值检查
    throw new Error('请检查输入，只支持数字与四则运算符"+-*/" ');
  }
  const s = str.replace(/\s/g, ""); // 去掉所有的空白字符
  let arr = [];
  for (let char of s) {
    const len = arr.length;
    if (len && !isOperator(arr[len - 1]) && !isOperator(char)) {
      // 处理两位及以上位数数字，比如10，100
      arr[len - 1] = `${arr[len - 1]}${char}`;
      continue;
    }
    arr.push(char);
  }
  return arr; // 得到结果 ['1', '+', '2', '/', '2', '*', '3', '+', '2']
}

module.exports = {
  genTokens
}
