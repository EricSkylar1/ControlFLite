let idCounter = 0;

function isInUnwantedParent(node) {
  while (node.parentNode) {
    node = node.parentNode;
    if (
      node.nodeType === 1 && // ELEMENT_NODE
      ['STYLE', 'SCRIPT', 'NOSCRIPT', 'IFRAME', 'OBJECT'].includes(node.tagName)
    ) return true;
  }
  return false;
}

function getTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (isInUnwantedParent(node)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  let current;
  while (current = walker.nextNode()) nodes.push(current);
  return nodes;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action !== "searchText") return;

  const query = request.query.toLowerCase();
  const results = [];

  for (const textNode of getTextNodes(document.body)) {
    if (textNode.nodeValue.toLowerCase().includes(query)) {
      const parent = textNode.parentElement;
      if (!parent.dataset.scrollId) parent.dataset.scrollId = `scroll-id-${idCounter++}`;
      results.push({ id: parent.dataset.scrollId, text: parent.textContent.trim() });
    }
  }

  sendResponse({ results });
  return true;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrollToElement") {
    const target = document.querySelector(`[data-scroll-id="${request.id}"]`);

    if (target) {
      // Scroll first
      target.scrollIntoView({ behavior: "smooth", block: "center" });

      // Save original text
      const originalText = target.textContent;

      // Create span to wrap text and add border
      const span = document.createElement('span');
      span.style.background = 'red';
	  span.style.color = 'white';
      span.style.padding = '0';
      span.style.margin = '0';
      span.style.display = 'inline';
      span.textContent = originalText;

      // Replace target's text content with the span
      target.textContent = '';
      target.appendChild(span);

      // Remove border highlight after 2 seconds and restore original text (optional)
      setTimeout(() => {
        // Restore original text content (removes span)
        target.textContent = originalText;
      }, 2000);

      sendResponse({ success: true });
    } else {
      sendResponse({ success: false, message: "Element not found" });
    }

    return true; // keep channel open for async sendResponse
  }
});



