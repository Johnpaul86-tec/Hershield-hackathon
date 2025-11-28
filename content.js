const abusiveWords = ["idiot", "slut", "stupid", "worthless"];

function scanElement(el) {
  const text = el.innerText?.toLowerCase();
  if (!text) return;

  abusiveWords.forEach(word => {
    if (text.includes(word)) {
      el.style.display = "none"; // Hide the message
      chrome.storage.local.set({ lastAbuse: text });
    }
  });
}

// Scan whole page at load
function initialScan() {
  document.querySelectorAll("p, span, div").forEach(el => scanElement(el));
}

// Live scan for dynamically loaded messages (WhatsApp Web uses this)
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1) {
        scanElement(node);
        node.querySelectorAll?.("p, span, div").forEach(el => scanElement(el));
      }
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });

// First scan
initialScan();
