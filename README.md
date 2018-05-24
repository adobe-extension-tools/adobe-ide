# Parcel CEP Plugin Starter

Starter template for [parcel-cep-plugin](https://github.com/fusepilot/parcel-plugin-cep), a zero configuration CEP extension builder for [Parcel](https://github.com/parcel-bundler/parcel).

## Quick Start

```sh
git clone https://github.com/fusepilot/parcel-plugin-cep-starter.git
cd parcel-plugin-cep-starter
yarn
yarn run start
```

Open your CC app of choice, find your extension under `Window` > `Extensions`, and start developing.

## Building

To create a production build:

```sh
yarn run build
```

## Packaging

To create a .zxp for deployment:

```sh
yarn run zxp
```

A versioned .zxp file will be placed inside `archive`.
