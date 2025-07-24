document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.item-button-new').forEach(function (button) {
    button.addEventListener('click', function () {
      const itemRight = button.closest('.item-right');
      if (!itemRight) return;

      const itemName = itemRight.querySelector('.item-name');
      if (!itemName) return;

      const requestName = itemName.textContent.trim();

      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: 'requestNameCaptured',
        requestName: requestName
      });

      console.log('requestName pushed to dataLayer:', requestName);
    });
  });
});
