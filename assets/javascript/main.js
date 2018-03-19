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
  var destination ="";
  var timeA="";

  $("#addTrain").on("click", function(event){

    event.preventDefault();
   
    trainName= $("#trainName").val().trim();
    destination=$("#destination").val().trim();
    frecuency= $("#frecuency").val().trim();
    timaA=$("#firstArr").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(frecuency);
    console.log(timeA);
     
  });