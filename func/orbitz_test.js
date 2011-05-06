function dateToString(date) {
  return [date.getMonth(),date.getDate(),date.getFullYear()].join('/');
}

module("orbitz",{
  setup: function() {
    S.open('http://www.orbitz.com')
  }
});

test("Basic Search",function(){
  S('#flightsTab').click();

  $('#airOrigin').value('DTW');
  $('#airDestination').value('SFO');

  var today = new Date();
  var leave = new Date();
  var comeBack = new Date();
  leave.setDate(today.getDate() + 1);
  comeBack.setDate(today.getDate() + 10);
  $('#airStartDate').value(dateToString(leave));
  $('#airEndDate').value(dateToString(comeBack));

  $('button.air').click();

  
});
