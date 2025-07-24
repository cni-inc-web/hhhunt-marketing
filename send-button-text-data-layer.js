function pushToDataLayer(requestName, requestCategory = null) {
  window.dataLayer = window.dataLayer || [];
  const eventData = {
    event: 'requestNameCaptured',
    requestName: requestName
  };
  if (requestCategory) {
    eventData.requestCategory = requestCategory;
  }
  dataLayer.push(eventData);
  console.log('dataLayer push:', eventData);
}

function bindButtonLogic() {
  const path = window.location.pathname;

  if (path === '/resources/marketing-resources-landing-page.html') {
    // Case 1: .item-button logic
    document.querySelectorAll('.item-button').forEach(function (button) {
      button.addEventListener('click', function () {
        const itemRight = button.closest('.item-right');
        const itemName = itemRight?.querySelector('.item-name')?.textContent.trim();
        if (itemName) pushToDataLayer(itemName);
      });
    });

  } else if (path === '/marketing-requests.html') {
    // Case 2: .item-button-new logic with extra category
    document.querySelectorAll('.item-button-new').forEach(function (button) {
      button.addEventListener('click', function () {
        const itemRight = button.closest('.item-right');
        const requestName = itemRight?.querySelector('.item-name')?.textContent.trim();

        // Traverse up to find closest .mix container
        const mixContainer = button.closest('.mix');
        const categoryHeading = mixContainer?.querySelector('.item-name.heading')?.textContent.trim();

        if (requestName) {
          pushToDataLayer(requestName, categoryHeading || null);
        }
      });
    });
  }
}

// Run on DOM ready and delayed fallback
document.addEventListener("DOMContentLoaded", bindButtonLogic);
setTimeout(bindButtonLogic, 1000);
