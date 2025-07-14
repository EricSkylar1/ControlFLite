console.log("popup running");

export async function searchForText(query) {
  // Wrap chrome.tabs.query in a Promise to await it
  const tabs = await new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, resolve);
  });

  if (!tabs || tabs.length === 0) {
    return [];
  }
  
  const tab = tabs[0];

  // Wrap chrome.tabs.sendMessage in a Promise to await it
  const response = await new Promise((resolve) => {
    chrome.tabs.sendMessage(tab.id, { action: "searchText", query }, resolve);
  });

  return response?.results || [];
}

export function scrollToElement(id) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || tabs.length === 0) {
      console.warn("No active tabs found");
      return;
    }
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { action: "scrollToElement", id }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error sending scroll message:", chrome.runtime.lastError);
      } else {
        console.log("Scroll message sent successfully");
      }
    });
  });
}





