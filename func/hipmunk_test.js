function dateToString(date) {
  return [date.getMonth(),date.getDate(),date.getFullYear()].join('/');
}

module("hipmunk",{
  setup: function() {
    S.open('http://www.hipmunk.com')
  }
});

test("Basic Search",function(){
  $('#fac1').value('DTW');
  $('#fac2').value('SFO');

  var today = new Date();
  var leave = new Date();
  var comeBack = new Date();
  leave.setDate(today.getDate() + 1);
  comeBack.setDate(today.getDate() + 10);
  $('.field-date0').value(dateToString(leave));
  $('.field-date1').value(dateToString(comeBack));

  $($('button').get(0)).click();
});
