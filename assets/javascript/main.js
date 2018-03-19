var config = {
  apiKey: "AIzaSyBh_yeWVAHL-boompBsmcsBtLTxpUrxqC4",
  authDomain: "train-scheduler-18ed4.firebaseapp.com",
  databaseURL: "https://train-scheduler-18ed4.firebaseio.com",
  projectId: "train-scheduler-18ed4",
  storageBucket: "train-scheduler-18ed4.appspot.com",
  messagingSenderId: "394800406940"
};
firebase.initializeApp(config);

// Grab values from input form - add new trains //

var trainName = "";
var frecuency = 0;
var destination = "";
var timeA = "";
var nextTrainA = "";

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
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firtArrConv), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var newTrain = {
    train: trainName,
    frecuency: frecuency,
    destination: destination,
    time: timeA,
    minA: tMinutesTillTrain
  };

  console.log(newTrain);


});