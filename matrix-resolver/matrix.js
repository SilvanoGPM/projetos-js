class Matrix {
  constructor(values = [], rows, cols = rows) {
    this.values = values;
    this.rows = rows;
    this.cols = cols;
  }

  toString() {
    let result = '';

    const positive = String(Math.max(...this.values)).length;
    const negative = String(Math.min(...this.values)).length;
    const maxDigits = Math.max(positive, negative);

    let rowLength = 0;

    for (let i = 0; i < this.rows; i++) {
      const row = this.values.slice(i * this.cols, this.cols * (i + 1));

      let rowStr = '';

      for (const cell of row) {
        const cellStr = String(cell).padStart(maxDigits, ' ');
        rowStr += ` ${cellStr} `;
      }

      const rowFinal = `[ ${rowStr} ]\n`;

      rowLength = Math.max(rowFinal.length, rowLength);

      result += rowFinal;
    }

    return `${result}${' '.repeat(rowLength)}${this.rows} x ${this.cols}`;
  }
}

function mountMatrix(rule, rows, cols = rows) {
  const values = [];

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      const cell = eval(rule.replace('i', i).replace('j', j));
      values.push(cell);
    }
  }

  return new Matrix(values, rows, cols);
}

function baseOperationWithMatrices(matrix1, matrix2, operation) {
  if (matrix1.rows !== matrix2.rows || matrix1.cols !== matrix2.cols) {
    throw Error('Matrizes não possuem o mesmo tamanho!');
  }

  const values = [];
  const { rows, cols } = matrix1;

  for (let i = 0; i < rows; i++) {
    const matrix1Row = matrix1.values.slice(i * matrix1.cols, matrix1.cols * (i + 1));
    const matrix2Row = matrix2.values.slice(i * matrix2.cols, matrix2.cols * (i + 1));

    for (let j = 0; j < cols; j++) {
      const newCell = operation(matrix1Row[j], matrix2Row[j]);
      values.push(newCell);
    }
  }

  return new Matrix(values, rows, cols);
}

function sumMatrices(matrix1, matrix2) {
  const sum = (x, y) => x + y;
  return baseOperationWithMatrices(matrix1, matrix2, sum);
}

function subMatrices(matrix1, matrix2) {
  const sub = (x, y) => x - y;
  return baseOperationWithMatrices(matrix1, matrix2, sub);
}

function multiplyMatrices(matrix1, matrix2) {
  if (matrix1.cols !== matrix2.rows) {
    throw Error('Não é possível multiplicar essas matrizes!');
  }

  const values = [];
  const rows = matrix1.rows;
  const cols = matrix2.cols;

  for (let i = 0; i < rows; i++) {
    const matrix1Row = matrix1.values.slice(i * matrix1.cols, matrix1.cols * (i + 1));

    for (let j = 0; j < cols; j++) {
      let value = 0;

      for (const [x, row] of Object.entries(matrix1Row)) {
        const col = matrix2.values[(Number(x) * cols) + j];

        value += row * col;
      }

      values.push(value);
    }

  }

  return new Matrix(values, rows, cols);
}

function scaleMatrix(matrix, scale) {
  const values = [];

  for (let i = 0; i < matrix.rows; i++) {
    for (let j = 0; j < matrix.cols; j++) {
      const cell = matrix.values[(i * matrix.cols) + j];
      values.push(cell * scale);
    }
  }

  return new Matrix(values, matrix.rows, matrix.cols);
}

function getMatrixDeterminant(matrix) {
  if (matrix.rows !== matrix.cols) {
    throw Error('Não é possível descobrir a determinante de uma matrix não quadradra!');
  }

  if (matrix.rows > 3) {
    throw Error('Ainda não adicionado!');
  }

  if (matrix.rows === 3) {
    const x = getMatrixDeterminant(new Matrix([matrix.values[4], matrix.values[5], matrix.values[7], matrix.values[8]], 2));
    const y = getMatrixDeterminant(new Matrix([matrix.values[3], matrix.values[5], matrix.values[6], matrix.values[8]], 2));
    const z = getMatrixDeterminant(new Matrix([matrix.values[3], matrix.values[4], matrix.values[6], matrix.values[7]], 2));

    return (matrix.values[0] * x) - (matrix.values[1] * y) + (matrix.values[2] * z);
  }

  let mainDiagonal = matrix.values[0] * matrix.values[3];
  let inverseDiagonal = matrix.values[1] * matrix.values[2];

  return (mainDiagonal - inverseDiagonal);
}

const matrix1 = mountMatrix('(i + 2 * j - 34)', 3);
const matrix2 = mountMatrix('(i - j)', 3, 2);

console.log(matrix1.toString());
console.log(matrix2.toString());
console.log(getMatrixDeterminant(new Matrix([2, 5, 8, 1], 2)));
