function visitor(node) {
  if (node.operator) {
    return calcValue(visitor(node.left), visitor(node.right), node.operator);
  } else {
    return node.value;
  }
}

function calcValue(px, py, rule) {
  const [x, y] = [Number(px), Number(py)];

  switch (rule) {
    case "+": {
      return x + y;
    }
    case "-": {
      return x - y;
    }
    case "*": {
      return x * y;
    }
    case "/": {
      return x / y;
    }
  }
}

module.exports = {
  visitor
}
