import browser from "webextension-polyfill";

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});

browser.commands.onCommand.addListener((command) => {
  if (command === "open-search") {
	browser.action.openPopup();
  }
});

export function searchText(data, query){
	
}
