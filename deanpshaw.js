
// checks if one day has passed. 
function resetAtMidnight() {
  var now = new Date();
  var night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // the next day, ...
      0, 0, 0 // ...at 00:00:00 hours
  );
  var msToMidnight = night.getTime() - now.getTime();
  localStorage.setItem("time", msToMidnight)

  setTimeout(function() {
  
    //      <-- This is the function being called at midnight.
      resetAtMidnight();    //      Then, reset again next midnight.
  }, msToMidnight);
}
