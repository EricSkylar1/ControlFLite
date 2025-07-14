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

