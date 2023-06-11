import { ASTTypes } from "../parser/ast.js";
import { Exception } from "../shared/exceptions.js";

/**
 * @typedef {import("./ast.js").AST} AST
 */

/**
 * Print the indent spaces
 * @param {number} indent
 * @returns {string}
 */
const prIndent = (indent) => " ".repeat(indent);

/**
 * @class ASTPrinter
 * @desc Pretty printer for AST
 * @prop {import("../parser/ast").Program} program
 */
class ASTPrinter {
  /**
   * Constructor for AST Printer
   * @param {import("../parser/ast").Program} program
   */
  constructor(program) {
    this.program = program;
  }

  /**
   * Static constructor for ASTPrinter
   * @param {import("../parser/ast").Program} program
   * @returns {ASTPrinter}
   */
  static new(program) {
    return new ASTPrinter(program);
  }

  /**
   * Dispatcher for printer visitor
   * @param {AST} node
   * @param {number} [indent=0]
   * @returns {string}
   */
  print(node = this.program, indent = 0) {
    switch (node.kind) {
      case ASTTypes.Program:
        return this.printProgram(node, indent);
      case ASTTypes.NumberLiteral:
      case ASTTypes.StringLiteral:
      case ASTTypes.BooleanLiteral:
      case ASTTypes.KeywordLiteral:
      case ASTTypes.NilLiteral:
        return this.printPrimitive(node, indent);
      case ASTTypes.Symbol:
        return this.printSymbol(node, indent);
      case ASTTypes.CallExpression:
        return this.printCallExpression(node, indent);
      case ASTTypes.VariableDeclaration:
        return this.printVariableDeclaration(node, indent);
      case ASTTypes.SetExpression:
        return this.printSetExpression(node, indent);
      case ASTTypes.DoExpression:
        return this.printDoExpression(node, indent);
      case ASTTypes.TypeAlias:
        return this.printTypeAlias(node, indent);
      default:
        throw new Exception(`Unknown AST type ${node.kind} to print`);
    }
  }

  /**
   * Prints a CallExpression node
   * @param {import("../parser/ast.js").CallExpression} node
   * @param {number} indent
   * @returns {string}
   */
  printCallExpression(node, indent) {
    let prStr = `${prIndent(indent)}CallExpression\n`;
    prStr += `${prIndent(indent + 2)}Func:\n${this.print(
      node.func,
      indent + 4
    )}\n`;
    prStr += `${prIndent(indent + 2)}Args:\n`;

    let i = 0;
    for (let arg of node.args) {
      prStr += this.print(arg, indent + 4);
      prStr += i === node.args.length - 1 ? "" : "\n";
      i++;
    }

    return prStr;
  }

  /**
   * Prints a DoExpression node
   * @param {import("../parser/ast.js").DoExpression} node
   * @param {number} indent
   * @returns {string}
   */
  printDoExpression(node, indent) {
    let prStr = `${prIndent(indent)}DoExpression:\n`;

    let i = 0;
    for (let expr of node.body) {
      prStr += `${this.print(expr, indent + 2)}`;
      prStr += i === node.body.length - 1 ? "" : "\n";
      i++;
    }

    return prStr;
  }

  /**
   * Prints a primitive node
   * @param {import("../parser/ast.js").Primitive} node
   * @param {number} indent
   * @returns {string}
   */
  printPrimitive(node, indent) {
    return `${prIndent(indent)}${node.kind}: ${
      node.kind === "NilLiteral" ? "nil" : node.value
    }`;
  }

  /**
   * Prints Program node
   * @param {import("../parser/ast").Program} node
   * @param {number} indent
   * @returns {string}
   */
  printProgram(node, indent) {
    let pStr = "";

    for (let n of node.body) {
      pStr += this.print(n, indent);
      +"\n";
    }

    return pStr;
  }

  /**
   * Prints SetExpression node
   * @param {import("../parser/ast.js").SetExpression} node
   * @param {number} indent
   * @returns {string}
   */
  printSetExpression(node, indent) {
    let prStr = `${prIndent(indent)}SetExpression:\n`;
    prStr += `${this.print(node.lhv, indent + 2)}\n`;
    prStr += `${this.print(node.expression, indent + 2)}`;
    return prStr;
  }

  /**
   * Prints Symbol node
   * @param {import("../parser/ast").Symbol} node
   * @param {number} indent
   */
  printSymbol(node, indent) {
    return `${prIndent(indent)}Symbol: ${node.name}`;
  }

  /**
   * Emits empty string for TypeAlias node
   * @param {import("../parser/parseTypeAnnotation.js").TypeAlias} node
   * @param {number} indent
   * @returns {string}
   */
  printTypeAlias(node, indent) {
    return "";
  }

  /**
   * Prints VariableDeclaration node
   * @param {import("../parser/ast.js").VariableDeclaration} node
   * @param {number} indent
   * @returns {string}
   */
  printVariableDeclaration(node, indent) {
    let prStr = `${prIndent(indent)}VariableDeclaration:\n`;
    prStr += `${this.print(node.lhv, indent + 2)}\n`;
    prStr += `${this.print(node.expression, indent + 2)}`;
    return prStr;
  }
}

/**
 * Pretty prints an AST
 * @param {AST} ast
 * @returns {string}
 */
export const printAST = (ast) => ASTPrinter.new(ast).print();
