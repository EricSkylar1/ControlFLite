console.log("Content script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.action === "searchText"){
    const query = request.query.toLowerCase();
    const segments = [];

    const elements = Array.from(document.body.querySelectorAll("*"));
    elements.forEach(el => {
      if(el.children.length === 0){

		const text = el.textContent || "";

        if(text.toLowerCase().includes(query)){
          segments.push(el);
        }
      }
    });

    sendResponse({ results: segments });
  }
});
