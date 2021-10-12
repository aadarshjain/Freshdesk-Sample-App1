document.onreadystatechange = function () {
  if (document.readyState === "interactive") renderApp();

  function renderApp() {
    var onInit = app.initialized();

    onInit.then(getClient).catch(handleErr);

    function getClient(_client) {
      window.client = _client;
      client.events.on("app.activated", onAppActivate);
    }
  }
};

function onAppActivate() {
  var textElement = document.getElementById("apptext");
  var getContact = client.data.get("contact");
  getContact.then(showContact).catch(handleErr);

  function showContact(payload) {
    textElement.innerHTML = `Ticket created by ${payload.contact.name}`;
    client.interface
      .trigger("showNotify", {
        type: "success",
        message: payload.contact.name + " Your ticket is created",
        /* The "message" should be plain text */
      })
      .then(function (data) {
        // data - success message
      })
      .catch(function (error) {
        // error - error object
      });
    client.interface
      .trigger("showNotify", {
        type: "info",
        title: "Info",
        message: "This is a sample information notification.",
        /* The "message" should be plain text */
      })
      .then(function (data) {
        // data - success message
      })
      .catch(function (error) {
        // error - error object
      });
  }
}

function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}
