const path = require('path')

/**
 * @class SystemPath
 * Stores operating-system-specific location constants for use in the
 * \c #CSInterface.getSystemPath() method.
 */
export class SystemPath {
  /** The path to user data.  */
  public static readonly USER_DATA: string = 'userData'

  /** The path to common files for Adobe applications.  */
  public static readonly COMMON_FILES: string = 'commonFiles'

  /** The path to the user's default document folder.  */
  public static readonly MY_DOCUMENTS: string = 'myDocuments'

  /** @deprecated. Use \c #SystemPath.Extension.  */
  public static readonly APPLICATION: string = 'application'

  /** The path to current extension.  */
  public static readonly EXTENSION: string = 'extension'

  /** The path to hosting application's executable.  */
  public static readonly HOST_APPLICATION: string = 'hostApplication'
}

/**
 * Class CSEvent.
 * You can use it to dispatch a standard CEP event.
 *
 * @return CSEvent object
 */
export class CSEvent {
  /**
   * Initializes new instance of CSEvent object.
   * You can use it to dispatch a standard CEP event.
   *
   * @param type        Event type.
   * @param scope       The scope of event, can be "GLOBAL" or "APPLICATION".
   * @param appId       The unique identifier of the application that generated the event. Optional.
   * @param extensionId The unique identifier of the extension that generated the event. Optional.
   */
  constructor(
    public type: string,
    public scope: string,
    public appId: string,
    public extensionId: string
  ) {}

  /**
   * Event-specific data.
   */
  public data: string = ''
}

export const THEME_COLOR_CHANGED_EVENT: string =
  'com.adobe.csxs.events.ThemeColorChanged'

/** Returns true if a cep environment is detected.
 */
export function inCEPEnvironment(): boolean {
  return !!window.cep && !!window.cep_node && !!window.__adobe_cep__
}

/** Retrieves information about the host environment in which the
 *  extension is currently running.
 *
 *   @return A \c #HostEnvironment object.
 */
export function getHostEnvironment(): any {
  return JSON.parse(window.__adobe_cep__.getHostEnvironment())
}

/**
 * Registers an interest in a CEP event of a particular type, and
 * assigns an event handler.
 * The event infrastructure notifies your extension when events of this type occur,
 * passing the event object to the registered handler function.
 *
 * @param type     The name of the event type of interest.
 * @param listener The JavaScript handler function or method.
 * @param obj      Optional, the object containing the handler method, if any.
 *         Default is null.
 */
export function addEventListener(type: string, listener: any, obj?: any) {
  window.__adobe_cep__.addEventListener(type, listener, obj)
}

/**
 * Removes a registered event listener.
 *
 * @param type      The name of the event type of interest.
 * @param listener  The JavaScript handler function or method that was registered.
 * @param obj       Optional, the object containing the handler method, if any.
 *          Default is null.
 */

export function removeEventListener(type: string, listener: any, obj?: any) {
  window.__adobe_cep__.removeEventListener(type, listener, obj)
}

/**
 * Loads and launches another extension, or activates the extension if it is already loaded.
 *
 * @param extensionId       The extension's unique identifier.
 * @param startupParams     Not currently used, pass "".
 *
 * @example
 * To launch the extension "help" with ID "HLP" from this extension, call:
 * <code>requestOpenExtension("HLP", ""); </code>
 *
 */
export function requestOpenExtension(extensionId: string, params: string) {
  window.__adobe_cep__.requestOpenExtension(extensionId, params)
}

/**
 * Triggers a CEP event programmatically. Yoy can use it to dispatch
 * an event of a predefined type, or of a type you have defined.
 *
 * @param event A \c CSEvent object.
 */
export function dispatchEvent(event: CSEvent) {
  if (typeof event.data == 'object') {
    event.data = JSON.stringify(event.data)
  }

  window.__adobe_cep__.dispatchEvent(event)
}

/** Closes this extension. */
export function closeExtension() {
  window.__adobe_cep__.closeExtension()
}

/**
 * Retrieves the list of extensions currently loaded in the current host application.
 * The extension list is initialized once, and remains the same during the lifetime
 * of the CEP session.
 *
 * @param extensionIds  Optional, an array of unique identifiers for extensions of interest.
 *          If omitted, retrieves data for all extensions.
 *
 * @return Zero or more \c #Extension objects.
 */
export function getExtensions(extensionIds: string[]): any {
  var extensionIdsStr = JSON.stringify(extensionIds)
  var extensionsStr = window.__adobe_cep__.getExtensions(extensionIdsStr)

  var extensions = JSON.parse(extensionsStr)
  return extensions
}

/**
 * Retrieves network-related preferences.
 *
 * @return A JavaScript object containing network preferences.
 */
export function getNetworkPreferences(): any {
  var result = window.__adobe_cep__.getNetworkPreferences()
  var networkPre = JSON.parse(result)

  return networkPre
}

/**
 * Retrieves current API version.
 *
 * Since 4.2.0
 *
 * @return ApiVersion object.
 *
 */
export function getCurrentApiVersion(): any {
  return JSON.parse(window.__adobe_cep__.getCurrentApiVersion())
}

/**
 * Opens a page in the default system browser.
 *
 * Since 4.2.0
 *
 * @param url  The URL of the page/file to open, or the email address.
 * Must use HTTP/HTTPS/file/mailto protocol. For example:
 *   "http://www.adobe.com"
 *   "https://github.com"
 *   "file:///C:/log.txt"
 *   "mailto:test@adobe.com"
 *
 * @return One of these error codes:\n
 *      <ul>\n
 *          <li>NO_ERROR - 0</li>\n
 *          <li>ERR_UNKNOWN - 1</li>\n
 *          <li>ERR_INVALID_PARAMS - 2</li>\n
 *          <li>ERR_INVALID_URL - 201</li>\n
 *      </ul>\n
 */
export function openURLInDefaultBrowser(url: string): number {
  if (inCEPEnvironment()) {
    return window.cep.util.openURLInDefaultBrowser(url)
  } else {
    return window.open(url)
  }
}
/**
 * Retrieves extension ID.
 *
 * Since 4.2.0
 *
 * @return extension ID.
 */
export function getExtensionID(): string {
  return window.__adobe_cep__.getExtensionId()
}

/**
     * Register an interest in some key events to prevent them from being sent to the host application.
     *
     * This function works with modeless extensions and panel extensions.
     * Generally all the key events will be sent to the host application for these two extensions if the current focused element
     * is not text input or dropdown,
     * If you want to intercept some key events and want them to be handled in the extension, please call this function
     * in advance to prevent them being sent to the host application.
     *
     * Since 6.1.0
     *
     * @param keyEventsInterest      A JSON string describing those key events you are interested in. A null object or
     an empty string will lead to removing the interest
     *
     * This JSON string should be an array, each object has following keys:
     *
     * keyCode:  [Required] represents an OS system dependent virtual key code identifying
     *           the unmodified value of the pressed key.
     * ctrlKey:  [optional] a Boolean that indicates if the control key was pressed (true) or not (false) when the event occurred.
     * altKey:   [optional] a Boolean that indicates if the alt key was pressed (true) or not (false) when the event occurred.
     * shiftKey: [optional] a Boolean that indicates if the shift key was pressed (true) or not (false) when the event occurred.
     * metaKey:  [optional] (Mac Only) a Boolean that indicates if the Meta key was pressed (true) or not (false) when the event occurred.
     *                      On Macintosh keyboards, this is the command key. To detect Windows key on Windows, please use keyCode instead.
     * An example JSON string:
     *
     * [
     *     {
     *         "keyCode": 48
     *     },
     *     {
     *         "keyCode": 123,
     *         "ctrlKey": true
     *     },
     *     {
     *         "keyCode": 123,
     *         "ctrlKey": true,
     *         "metaKey": true
     *     }
     * ]
     *
     */
export function registerKeyEventsInterest(keyEventsInterest: string): any {
  return window.__adobe_cep__.registerKeyEventsInterest(keyEventsInterest)
}

/**
 * Set the title of the extension window.
 * This function works with modal and modeless extensions in all Adobe products, and panel extensions in Photoshop, InDesign, InCopy, Illustrator, Flash Pro and Dreamweaver.
 *
 * Since 6.1.0
 *
 * @param title The window title.
 */
export function setWindowTitle(title: string) {
  window.__adobe_cep__.invokeSync('setWindowTitle', title)
}

/**
 * Get the title of the extension window.
 * This function works with modal and modeless extensions in all Adobe products, and panel extensions in Photoshop, InDesign, InCopy, Illustrator, Flash Pro and Dreamweaver.
 *
 * Since 6.1.0
 *
 * @return The window title.
 */
export function getWindowTitle() {
  return window.__adobe_cep__.invokeSync('getWindowTitle', '')
}

/**
 * Retrieves version information for the current Operating System,
 * See http://www.useragentstring.com/pages/Chrome/ for Chrome \c navigator.userAgent values.
 *
 * @return A string containing the OS version, or "unknown Operation System".
 * If user customizes the User Agent by setting CEF command parameter "--user-agent", only
 * "Mac OS X" or "Windows" will be returned.
 */
export function getOSInformation(): string {
  var userAgent = navigator.userAgent

  if (navigator.platform == 'Win32' || navigator.platform == 'Windows') {
    var winVersion = 'Windows platform'
    if (userAgent.indexOf('Windows NT 5.0') > -1) {
      winVersion = 'Windows 2000'
    } else if (userAgent.indexOf('Windows NT 5.1') > -1) {
      winVersion = 'Windows XP'
    } else if (userAgent.indexOf('Windows NT 5.2') > -1) {
      winVersion = 'Windows Server 2003'
    } else if (userAgent.indexOf('Windows NT 6.0') > -1) {
      winVersion = 'Windows Vista'
    } else if (userAgent.indexOf('Windows NT 6.1') > -1) {
      winVersion = 'Windows 7'
    } else if (userAgent.indexOf('Windows NT 6.2') > -1) {
      winVersion = 'Windows 8'
    }

    var winBit = '32-bit'
    if (userAgent.indexOf('WOW64') > -1) {
      winBit = '64-bit'
    }

    return winVersion + ' ' + winBit
  } else if (
    navigator.platform == 'MacIntel' ||
    navigator.platform == 'Macintosh'
  ) {
    var agentStr = new String()
    agentStr = userAgent
    var verLength = agentStr.indexOf(')') - agentStr.indexOf('Mac OS X')
    var verStr = agentStr.substr(agentStr.indexOf('Mac OS X'), verLength)
    var result = verStr.replace('_', '.')
    result = result.replace('_', '.')
    return result
  }

  return 'Unknown Operation System'
}

/**
 * Retrieves a path for which a constant is defined in the system.
 *
 * @param pathType The path-type constant defined in \c #SystemPath ,
 *
 * @return The platform-specific system path string.
 */
export function getSystemPath(pathType: string) {
  var path = decodeURI(window.__adobe_cep__.getSystemPath(pathType))
  var OSVersion = getOSInformation()
  if (OSVersion.indexOf('Windows') >= 0) {
    path = path.replace('file:///', '')
  } else if (OSVersion.indexOf('Mac') >= 0) {
    path = path.replace('file://', '')
  }
  return path
}

/**
 * Returns the absolute path of the extension.
 */
export function getExtensionPath(): string {
  return getSystemPath(SystemPath.EXTENSION)
}

/**
 * Evaluates a JavaScript script, which can use the JavaScript DOM
 * of the host application.
 *
 * @param script    The JavaScript script.
 * @param callback  Optional. A callback function that receives the result of execution.
 *          If execution fails, the callback function receives the error message \c EvalScript_ErrMessage.
 */
function evalScript(script: string, callback: (executionResult: any) => void) {
  if (callback === null || callback === undefined) {
    callback = function callback(result) {}
  }
  window.__adobe_cep__.evalScript(script, callback)
}

/**
 * Loads an extendscript file in the extension folder.
 *
 * @param fileName The name of the extendscript file.
 */
export function loadExtendscript(fileName: string) {
  if (!fileName) throw Error('Filename cannot be empty.')

  var extensionRoot = getSystemPath(SystemPath.EXTENSION)
  return new Promise(function(resolve, reject) {
    const filePath = path.join(extensionRoot, fileName)
    evalScript(`$.evalFile("${filePath}")`, function(result) {
      if (!result || result === 'undefined') return resolve()

      try {
        result = JSON.parse(result)
      } catch (err) {}

      resolve(result)
    })
  })
}

/**
 * Evaluates a JavaScript script, which can use the JavaScript DOM
 * of the host application.
 *
 * @param script    The JavaScript script.
 * @return The result of execution. If the result is a valid JSON string, it will return the parsed JSON object.
 */
export function evalExtendscript(
  script: string,
  { async = false }: { async?: boolean } = {}
) {
  if (!inCEPEnvironment()) console.warn('Not in CEP environment.')

  return new Promise(function(resolve, reject) {
    var doEvalScript = function() {
      evalScript(script, function(executionResult: string) {
        if (!executionResult || executionResult === 'undefined')
          return resolve()

        try {
          executionResult = JSON.parse(executionResult)
        } catch (err) {}

        resolve(executionResult)
      })
    }

    if (async) {
      setTimeout(doEvalScript, 0)
    } else {
      doEvalScript()
    }
  })
}

/**
 * Requires a module from the extension's node_modules folder.
 *
 * @param id The id of the module.
 * @return The module.
 */
export function nodeRequire(id: string): any {
  if (!inCEPEnvironment()) console.warn('Not in CEP environment.')
  try {
    if (id.substr(0, 1) === '.') {
      return window.cep_node.require(__dirname + id.substr(1))
    } else {
      return window.cep_node.require(id)
    }
  } catch (err) {
    console.log(err)
  }
}
