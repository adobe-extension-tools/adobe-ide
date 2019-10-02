import * as ts from 'typescript'

interface DocEntry {
  name?: string;
  fileName?: string;
  documentation?: string;
  type?: string;
  constructors?: DocEntry[];
  parameters?: DocEntry[];
  returnType?: string;
}

/** Generate documentation for all classes in a set of .ts files */
function generateDocumentation(
): void {
  const options = ts.getDefaultCompilerOptions();
  const realHost = ts.createCompilerHost(options, true);

  const dummyFilePath = "/in-memory-file.ts";
  const code = `

/**
 * Run the app
 * @param name Provide a name
  */
export function run(name: string) {
  return name === 'test' ? 10 : true
}`
  const dummySourceFile = ts.createSourceFile(dummyFilePath, code, ts.ScriptTarget.Latest);
  let outputCode: string | undefined = undefined;

  const host: ts.CompilerHost = {
    fileExists: filePath => filePath === dummyFilePath || realHost.fileExists(filePath),
    directoryExists: realHost.directoryExists && realHost.directoryExists.bind(realHost),
    getCurrentDirectory: realHost.getCurrentDirectory.bind(realHost),
    getDirectories: realHost.getDirectories.bind(realHost),
    getCanonicalFileName: fileName => realHost.getCanonicalFileName(fileName),
    getNewLine: realHost.getNewLine.bind(realHost),
    getDefaultLibFileName: realHost.getDefaultLibFileName.bind(realHost),
    getSourceFile: (fileName, languageVersion, onError, shouldCreateNewSourceFile) => fileName === dummyFilePath
      ? dummySourceFile
      : realHost.getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile),
    readFile: filePath => filePath === dummyFilePath
      ? code
      : realHost.readFile(filePath),
    useCaseSensitiveFileNames: () => realHost.useCaseSensitiveFileNames(),
    writeFile: (fileName, data) => outputCode = data,
  };

  // Build a program using the set of root file names in fileNames
  let program = ts.createProgram([dummyFilePath], {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS
  }, host);
  console.log(program)
  // Get the checker, we will use it to find more about classes
  let checker = program.getTypeChecker();

  let output: DocEntry[] = [];

  // Visit every sourceFile in the program
  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      // Walk the tree to search for classes
      ts.forEachChild(sourceFile, visit);
    }
  }

  // print out the doc
  console.log(output)
  return;

  /** visit nodes finding exported classes */
  function visit(node: ts.Node) {
    // Only consider exported nodes
    if (!isNodeExported(node)) {
      return;
    }

    if (ts.isFunctionDeclaration(node) && node.name) {
      // This is a top level class, get its symbol
      let symbol = checker.getSymbolAtLocation(node.name);
      if (symbol) {
        output.push(serializeFunction(symbol));
      }
      // No need to walk any further, class expressions/inner declarations
      // cannot be exported
    } else if (ts.isModuleDeclaration(node)) {
      // This is a namespace, visit its children
      ts.forEachChild(node, visit);
    }
  }

  /** Serialize a symbol into a json object */
  function serializeSymbol(symbol: ts.Symbol): DocEntry {
    return {
      name: symbol.getName(),
      documentation: ts.displayPartsToString(symbol.getDocumentationComment(checker)),
      type: checker.typeToString(
        checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)
      )
    };
  }

  /** Serialize a class symbol information */
  function serializeClass(symbol: ts.Symbol) {
    let details = serializeSymbol(symbol);

    // Get the construct signatures
    let constructorType = checker.getTypeOfSymbolAtLocation(
      symbol,
      symbol.valueDeclaration!
    );
    details.constructors = constructorType
      .getConstructSignatures()
      .map(serializeSignature);
    return details;
  }

  /** Serialize a class symbol information */
  function serializeFunction(symbol: ts.Symbol) {
    let details = serializeSymbol(symbol);
    return details;
  }

  /** Serialize a signature (call or construct) */
  function serializeSignature(signature: ts.Signature) {
    return {
      parameters: signature.parameters.map(serializeSymbol),
      returnType: checker.typeToString(signature.getReturnType()),
      documentation: ts.displayPartsToString(signature.getDocumentationComment(checker))
    };
  }

  /** True if this is visible outside this file, false otherwise */
  function isNodeExported(node: ts.Node): boolean {
    return true;
    // return (
    //   // (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0 ||
    //   (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
    // );
  }
}





//
// Result of compiling TypeScript code.
//
export interface CompilationResult {
  code?: string;
  diagnostics: ts.Diagnostic[]
};