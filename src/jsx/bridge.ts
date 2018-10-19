/// <reference path="../../node_modules/types-for-adobe/shared/PlugPlugExternalObject.ts" />

let xLib: ExternalObject | undefined
try {
  xLib = new ExternalObject("lib:\PlugPlugExternalObject")
} catch (e) {
  alert("Missing ExternalObject: " + e)
}

// send an event to the tool VM
function dispatch(type: string, data: string) {
  if (!xLib) {
    return
  }
  var eventObj = new CSXSEvent()
  eventObj.type = type
  eventObj.data = data || ''
  eventObj.dispatch()
}

export default dispatch
