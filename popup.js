document.getElementById("safeExit").addEventListener("click", () => {
  chrome.storage.local.clear(() => {
    alert("Session cleared. Stay safe!");
    window.close();
  });
});
