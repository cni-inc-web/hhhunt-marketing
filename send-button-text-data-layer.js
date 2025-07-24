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

  if (path === '/marketing-requests.html') {
    document.querySelectorAll('.item-button-new').forEach(function (button) {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";

      button.addEventListener('click', function (e) {
        const thisButton = e.currentTarget;
        const itemRight = thisButton.closest('.item-right');
        const eventName = itemRight?.querySelector('.item-name')?.textContent.trim();
        const eventCategory = findClosestMixAndCategory(thisButton);
        if (eventName) {
          pushToDataLayer('marketing request', eventName, eventCategory);
        }
      });
    });

  } else if (path === '/resources/marketing-resources-landing-page.html') {
    // Case A: regular .item-button (not .dont-see)
    document.querySelectorAll('.item-button:not(.dont-see)').forEach(function (button) {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";

      button.addEventListener('click', function (e) {
        const thisButton = e.currentTarget;
        const itemRight = thisButton.closest('.item-right');
        const itemNameText = itemRight?.querySelector('.item-name')?.textContent.trim();
        const buttonText = thisButton?.textContent.trim();

        if (!itemNameText || !buttonText) return;

        let eventName, eventCategory;

        if (buttonText.toLowerCase() === 'click here') {
          eventName = itemNameText;
          eventCategory = itemNameText;
        } else {
          eventCategory = itemNameText;
          eventName = buttonText;
        }

        pushToDataLayer('resource', eventName, eventCategory);
      });
    });

    // Case B: .item-button.dont-see.w-button
    document.querySelectorAll('.item-button.dont-see.w-button').forEach(function (button) {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";

      button.addEventListener('click', function (e) {
        const thisButton = e.currentTarget;
        const buttonText = thisButton?.textContent.trim();

        if (buttonText) {
          pushToDataLayer('resource', buttonText, "Don't See What You're Looking For?");
        }
      });
    });
  }
}

setTimeout(bindButtonLogic, 500);
