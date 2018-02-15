interface Window {
  cep: {
    encoding: {
      Base64: string
      UTF8: string
      convertion: {
        ascii_to_b64: Function
        b64_to_ascii: Function
        b64_to_binary: Function
        b64_to_utf8: Function
        binary_to_b64: Function
        utf8_to_b64: Function
      }
    }
    fs: {
      NO_ERROR: number
      ERR_UNKNOWN: number
      ERR_INVALID_PARAMS: number
      ERR_NOT_FOUND: number
      ERR_CANT_READ: number
      ERR_UNSUPPORTED_ENCODING: number
      ERR_CANT_WRITE: number
      ERR_OUT_OF_SPACE: number
      ERR_NOT_FILE: number
      ERR_NOT_DIRECTORY: number
      ERR_FILE_EXISTS: number
      chmod: Function
      deleteFile: Function
      makedir: Function
      readFile: Function
      readdir: Function
      rename: Function
      showOpenDialog: Function
      showOpenDialogEx: Function
      showSaveDialogEx: Function
      stat: Function
      writeFile: Function
    }
    process: {
      ERR_EXCEED_MAX_NUM_PROCESS: number
      createProcess: Function
      getWorkingDirectory: Function
      isRunning: Function
      onquit: Function
      stderr: Function
      stdin: Function
      stdout: Function
      terminate: Function
      waitfor: Function
    }
    util: {
      DEPRECATED_API: number
      ERR_INVALID_URL: number
      openURLInDefaultBrowser: (url: string) => number
      registerExtensionUnloadCallback: (callback: Function) => {}
      storeProxyCredentials: (username: string, password: string) => {}
    }
  }
  cep_node: {
    Buffer: Buffer
    global: Window
    process: NodeJS.Process
    require: NodeRequire
    __dirname: string
    __filename: string
  }
  __adobe_cep__: {
    addEventListener: Function
    closeExtension: Function
    dispatchEvent: Function
    dumpInstallationInfo: Function
    evalScript: Function
    getCurrentApiVersion: Function
    getCurrentImsUserId: Function
    getExtensionId: Function
    getExtensions: Function
    getHostCapabilities: Function
    getHostEnvironment: Function
    getMonitorScaleFactor: Function
    getNetworkPreferences: Function
    getScaleFactor: Function
    getSystemPath: Function
    imsConnect: Function
    imsDisconnect: Function
    imsFetchAccessToken: Function
    imsFetchAccounts: Function
    imsSetProxyCredentials: Function
    initResourceBundle: Function
    invokeAsync: Function
    invokeSync: Function
    registerInvalidCertificateCallback: Function
    registerKeyEventsInterest: Function
    removeEventListener: Function
    requestOpenExtension: Function
    resizeContent: Function
    setScaleFactorChangedHandler: Function
    showAAM: Function
  }
}
