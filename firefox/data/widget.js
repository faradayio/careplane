function loadPreferences(prefs) {
  var checkboxes = document.getElementsByTagName('input');
  for (var i = 0; i < checkboxes.length; i++) {
    var checkbox = checkboxes[i];
    var key = 'sites.' + checkbox.value;
    checkbox.checked = prefs[key];
  }
}

function save_option(checkbox) {
  return function() {
    var key = 'sites.' + checkbox.value;
    self.port.emit('preferences.put', { key: key, value: checkbox.checked });

    var status = document.getElementById('status');
    status.innerHTML = 'Options Saved.';
    setTimeout(function() {
      status.innerHTML = "";
    }, 750);
  };
}

var checkboxes = document.getElementsByTagName('input');
for(var i = 0; i < checkboxes.length; i++) {
  var checkbox = checkboxes[i];
  checkbox.onclick = save_option(checkbox);
}


function hide_footprints(checkbox) {
  self.port.emit('footprints.hide');
}

var button = document.getElementById('hide');
button.onclick = hide_footprints;

function hideSections() {
  var sections = document.getElementsByTagName('section');
  for(var i = 0; i < sections.length; i++) {
    var section = sections[i];
    section.style.display = 'none';
  }
}

function show(id) {
  hideSections();

  var div = document.getElementById(id);
  div.style.display = 'block';

  if(id == 'preferences') {
    loadPreferences();
  }
}

var infoOptions = document.getElementById('infoOptions');
infoOptions.onclick = function() { show('preferences') };
var notificationOptions = document.getElementById('notificationOptions');
notificationOptions.onclick = function() { show('preferences') };

self.port.on('notify', function() { show('notification'); });
self.port.on('info', function() { show('info'); });
self.port.on('preferences.load', loadPreferences);
