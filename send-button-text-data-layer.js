function pushToDataLayer(eventType, eventName, eventCategory) {
  window.dataLayer = window.dataLayer || [];
  const eventData = {
    event: "eventNameCaptured",
    eventType: eventType,
    eventName: eventName,
    eventCategory: eventCategory
  };
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
  return heading?.textContent.trim() || null;
}

function bindButtonLogic() {
  const path = window.location.pathname;

  // ✅ Case: Marketing Requests Page
  if (path === '/marketing-requests.html') {
    // Regular buttons
    document.querySelectorAll('.item-button-new').forEach(function (button) {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";

      button.addEventListener('click', function () {
        const itemRight = button.closest('.item-right');
        const eventName = itemRight?.querySelector('.item-name')?.textContent.trim();
        const eventCategory = findClosestMixAndCategory(button);
        if (eventName) {
          pushToDataLayer('Marketing Request', eventName, eventCategory);
        }
      });
    });

    // Case B: "Don't See" buttons on marketing-requests.html
    document.querySelectorAll('.item-button.dont-see.w-button').forEach(function (button) {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";

      button.addEventListener('click', function () {
        const buttonText = button?.textContent.trim();
        if (buttonText) {
          pushToDataLayer('Marketing Request', buttonText, "Don't See What You're Looking For?");
        }
      });
    });

  // ✅ Case: Marketing Resources Landing Page
  } else if (path === '/resources/marketing-resources-landing-page.html') {
    // Case A: Regular item-button logic
    document.querySelectorAll('.item-button').forEach(function (button) {
      if (button.classList.contains('dont-see')) return; // Skip special ones here
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";

      button.addEventListener('click', function () {
        const itemRight = button.closest('.item-right');
        const itemNameText = itemRight?.querySelector('.item-name')?.textContent.trim();
        const buttonText = button?.textContent.trim();

        if (!itemNameText || !buttonText) return;

        let eventName, eventCategory;
        if (buttonText.toLowerCase() === 'click here') {
          eventName = itemNameText;
          eventCategory = itemNameText;
        } else {
          eventCategory = itemNameText;
          eventName = buttonText;
        }

        pushToDataLayer('Resource', eventName, eventCategory);
      });
    });

    // Case B: "Don't See" buttons on landing page
    document.querySelectorAll('.item-button.dont-see.w-button').forEach(function (button) {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";

      button.addEventListener('click', function () {
        const buttonText = button?.textContent.trim();
        if (buttonText) {
          pushToDataLayer('Resource', buttonText, "Don't See What You're Looking For?");
        }
      });
    });
  }
}

setTimeout(bindButtonLogic, 500);
