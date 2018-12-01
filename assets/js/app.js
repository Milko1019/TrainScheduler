var config = {
    apiKey: "AIzaSyBQv_pJz6p5E0nL43tm6qJOspFkr5W7Lms",
    authDomain: "test-thing-f698f.firebaseapp.com",
    databaseURL: "https://test-thing-f698f.firebaseio.com",
    projectId: "test-thing-f698f",
    storageBucket: "test-thing-f698f.appspot.com",
    messagingSenderId: "142331858435"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFirst = moment($("#first-train-input").val().trim(), "HH:mm").format("x");
    var trainFreq = $("#freq-input").val().trim();

    var newTrain = {
        name: trainName,
        dest: trainDest,
        first: trainFirst,
        freq: trainFreq
    }

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.first);
    console.log(newTrain.freq);

    alert("New Train Added")

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#freq-input").val("");

});

database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainFirst = childSnapshot.val().first;
    var trainFreq = childSnapshot.val().freq;

    var firstTimeConverted = moment(trainFirst, "HH:mm").subtract(1, "year");
    console.log(firstTimeConverted);

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % trainFreq;

    var tMinutesTillTrain = trainFreq - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm:a");

    var nextNextTrain = trainFreq + nextTrain;

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrain),
        $("<td>").text(tRemainder),
        // $("<td>").text(nextNextTrain)
    );

    $("#train-table > tbody").append(newRow);
});
