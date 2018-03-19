var config = {
  apiKey: "AIzaSyBh_yeWVAHL-boompBsmcsBtLTxpUrxqC4",
  authDomain: "train-scheduler-18ed4.firebaseapp.com",
  databaseURL: "https://train-scheduler-18ed4.firebaseio.com",
  projectId: "train-scheduler-18ed4",
  storageBucket: "train-scheduler-18ed4.appspot.com",
  messagingSenderId: "394800406940"
};
firebase.initializeApp(config);
var database = firebase.database();

// Grab values from input form - add new trains //

var trainName = "";
var frecuency = 0;
var destination = "";
var timeA = "";
var nextTrain = "";


$("#addTrain").on("click", function (event) {

  event.preventDefault();

  trainName = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  frequency = $("#frecuency").val().trim();
  timeA = $("#firstArr").val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(frequency);
  console.log(timeA);


  // First Time (pushed back 1 year to make sure it comes before current time)
  var firtArrConv = moment(timeA, "HH:mm").subtract(1, "years");
  console.log(firtArrConv);

  // Current Time
  var currentTime = moment();
  console.log(moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firtArrConv), "minutes");
  console.log(diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log(tMinutesTillTrain);

  // Next Train
  nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log(moment(nextTrain).format("hh:mm"));


  var newTrain = {
    train: trainName,
    destination: destination,
    frecuency: frecuency,
    nextTrain: nextTrain.toLocaleString(),
    minA: tMinutesTillTrain,
    dateAdded: firebase.database.ServerValue.TIMESTAMP



  };

  console.log(newTrain);


  database.ref().push(newTrain);

  database.ref().orderByChild("dateAdded").limitToLast(15).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.name);
      console.log(sv.email);
      console.log(sv.age);
      console.log(sv.comment);

      // Change the HTML to reflect
      $("#name-display").text(sv.name);
      $("#email-display").text(sv.email);
      $("#age-display").text(sv.age);
      $("#comment-display").text(sv.comment);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });




});