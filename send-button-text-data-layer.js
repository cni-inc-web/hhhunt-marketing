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
  console.log('✅ dataLayer push:', eventData);
}

function findClosestMixAndCategory(button) {
  let current = button;
  while (current && !current.classList.contains('mix')) {
    current = current.parentElement;
  }
  if (!current) {
    console.warn('⚠️ .mix container not found for button');
    return null;
  }

  const heading = current.querySelector('.item-name.heading');
  if (!heading) {
    console.warn('⚠️ .item-name.heading not found in .mix container');
    return null;
  }

  return heading.textContent.trim();
}

function bindButtonLogic() {
  const path = window.location.pathname;

  if (path === '/resources/marketing-resources-landing-page.html') {
    document.querySelectorAll('.item-button').forEach(function (button) {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";

      button.addEventListener('click', function () {
        const itemRight = button.closest('.item-right');
        const itemName = itemRight?.querySelector('.item-name')?.textContent.trim();
        if (itemName) pushToDataLayer(itemName);
      });
    });

  } else if (path === '/marketing-requests.html') {
    document.querySelectorAll('.item-button-new').forEach(function (button) {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";

      button.addEventListener('click', function () {
        const itemRight = button.closest('.item-right');
        const requestName = itemRight?.querySelector('.item-name')?.textContent.trim();

        const requestCategory = findClosestMixAndCategory(button);

        if (requestName) {
          pushToDataLayer(requestName, requestCategory || null);
        }
      });
    });
  }
}

// Safe fallback binding
setTimeout(bindButtonLogic, 500);
