function isOperator(str) {
  return /[\+\-\*\/]/.test(str);
}
function priorityComparison(x, y) {
  const weightMap = {
    "+": 0,
    "-": 0,
    "*": 1,
    "/": 1,
  };

  return weightMap[x] - weightMap[y];
}

const genTree = (tokens) => {
  let lastOpr = null;
  return tokens.reduce((acc, cur, index) => {
    if (index === 0) {
      return {
        value: cur,
      };
    }
    if (isOperator(cur)) {
      if (!lastOpr) {
        // 首个运算符
        acc = {
          operator: cur,
          left: acc,
        };
        lastOpr = acc;
        return acc;
      }
      switch (priorityComparison(cur, lastOpr.operator)) {
        case 1: {
          // 优先级更高
          const old = lastOpr.right;
          lastOpr.right = {
            operator: cur,
            left: old,
            parent: lastOpr,
          };
          lastOpr = lastOpr.right;
          break;
        }
        case -1: {
          // 优先级更低
          acc = {
            operator: cur,
            left: acc,
          };
          lastOpr = acc;
          break;
        }
        case 0: {
          // 优先级相同
          if (!lastOpr.parent) {
            // 在顶部节点
            acc = {
              operator: cur,
              left: acc,
            };
            lastOpr = acc;
          } else {
            lastOpr.parent.right = {
              operator: cur,
              left: lastOpr,
              parent: lastOpr.parent,
            };
            lastOpr = lastOpr.parent.right;
          }
        }
      }
    } else {
      if (cur == 0 && lastOpr.operator === "/") {
        // 兼容0做分母的情况
        throw new Error("分母不能为0");
      }
      lastOpr.right = {
        value: cur,
      };
    }
    return acc;
  }, {});
}

module.exports = {
  genTree
}