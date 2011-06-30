TestExtensionLoader = {
  load: function() {
    var extension = new TestExtension(window.document);
    extension.loadDriver();
  }
};
