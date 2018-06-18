import { id } from "../shared";

function showAlert() {
  alert(`Alert from Extendscript.\n${new Date().toString()}`);
}

function getInfo() {
  return JSON.stringify({
    id,
    // @ts-ignore
    name: app.name,
    version: app.version
  });
}

$.global[id] = {
  showAlert,
  getInfo
};
