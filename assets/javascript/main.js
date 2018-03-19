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
var frequency = 0;
var destination = "";
var timeA = "";
var nextTrain = "";


$("#addTrain").on("click", function (event) {

  event.preventDefault();

  trainName = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  frequency = $("#frequency").val().trim();
  timeA = $("#firstArr").val().trim();

  $("#trainName").empty();
  $("#destination").empty();
  $("#frequency").empty();
  $("#firstArr").empty();


  console.log(trainName);
  console.log(destination);
  console.log(frequency);
  console.log(timeA);



  var newTrain = {
    train: trainName,
    destination: destination,
    frequency: frequency,
    firstTrain: timeA,
    dateAdded: firebase.database.ServerValue.TIMESTAMP

  };

  console.log(newTrain);


  database.ref().push(newTrain);

});

  database.ref().orderByChild("dateAdded").limitToLast(15).on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.train);
    console.log(sv.destination);
    console.log(sv.frequency);
    console.log(moment(sv.firstTrain).format("hh:mm"));



    // First Time (pushed back 1 year to make sure it comes before current time)
    var firtArrConv = moment(sv.firstTrain, "HH:mm").subtract(1, "years");
    console.log(firtArrConv);

    // Current Time
    var currentTime = moment();
    console.log(moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firtArrConv), "minutes");
    console.log(diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % sv.frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = sv.frequency - tRemainder;
    console.log(tMinutesTillTrain);

    // Next Train
    nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log(moment(nextTrain).format("hh:mm"));

    var train = sv.train.toUpperCase();
    var dest = sv.destination.toUpperCase();


    $("#trainSch").append("<tr><td>" + train +
      "</td><td>" + dest +
      "</td><td>" + sv.frequency +
      "</td><td>" + moment(nextTrain).format("hh:mm A") +
      "</td><td>" + tMinutesTillTrain + ("</td></tr>")
    );



    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });





//Load Existing Trains when page loads

$(document).ready(function () {

  database.ref().orderByChild("dateAdded").limitToLast(15).on("value", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.train);
    console.log(sv.destination);
    console.log(sv.frequency);
    console.log(moment(sv.firstTrain).format("hh:mm"));



    // First Time (pushed back 1 year to make sure it comes before current time)
    var firtArrConv = moment(sv.firstTrain, "HH:mm").subtract(1, "years");
    console.log(firtArrConv);

    // Current Time
    var currentTime = moment();
    console.log(moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firtArrConv), "minutes");
    console.log(diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % sv.frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = sv.frequency - tRemainder;
    console.log(tMinutesTillTrain);

    // Next Train
    nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log(moment(nextTrain).format("hh:mm"));

    var train = sv.train.toUpperCase();
    var dest = sv.destination.toUpperCase();



    $("#trainSch").append("<tr><td>" + train +
      "</td><td>" + dest +
      "</td><td>" + sv.frequency +
      "</td><td>" + moment(nextTrain).format("hh:mm A") +
      "</td><td>" + tMinutesTillTrain + ("</td></tr>")
    );

    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


});