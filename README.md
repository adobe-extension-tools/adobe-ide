# Adobe IDE

This is a CEP extension for Adobe software to write ExtendScript code, run it, and log to a console inside the extension.

It features:
- Syntax highlighting
- Auto completion for the Adobe API's
- Type checking using TypeScript (this is opt-in)
- Modern JavaScript (ES6) / TypeScript to ExtendScript compiler

This code editor is built on top of `monaco-editor`, which is a code editor for the browser, based on Visual Studio Code's editor.
It also comes with a TypeScript compiler and support for parsing TypeScript code and providing auto completion.
To get the autocompletion we use the typings from `types-for-adobe` by @pravdovmil
And this project itself is made using `cep-bundler-webpack`

## Installing

Releases are here: https://github.com/adobe-extension-tools/adobe-ide/releases
They are un-signed at the moment, so for now on macOS you have to right-click -> open the installer file.

## Developing this extension

```sh
git clone https://github.com/adobe-extension-tools/adobeide.git
cd adobeide
npm install
npm start
```

Open your CC app of choice, find your extension under `Window` > `Extensions`, and start developing.

## Building

To create a production build:

```sh
npm run build
```

## Packaging

To create a .zxp for deployment:

```sh
npm run build-zxp
```

(A versioned .zxp file will be placed inside `archive`.)

To create a installers for macOS and Windows:

```sh
npm run build-installers
```

(A versioned .pkg and .exe file will be placed inside `archive`.)
