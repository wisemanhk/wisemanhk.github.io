// TODO: Replace with your project's config object. You can find this
// by navigating to your project's console overview page
// (https://console.firebase.google.com/project/your-project-id/overview)
// and clicking "Add Firebase to your web app"

var config = {
  apiKey: "AIzaSyBfHe8GEKRrCM5TA_MqlaZZsVshjjH7Q34",
  authDomain: "my-test-project-d5a38.firebaseapp.com",
  databaseURL: "https://my-test-project-d5a38.firebaseio.com",
  storageBucket: "my-test-project-d5a38.appspot.com",
};

// Initialize your Firebase app
firebase.initializeApp(config);

// Reference to your entire Firebase database
var myFirebase = firebase.database().ref();

// Get a reference to the recommendations object of your Firebase.
// Note: this doesn't exist yet. But when we write to our Firebase using
// this reference, it will create this object for us!
var cameras = myFirebase.child("cameras");

// Push our first recommendation to the end of the list and assign it a
// unique ID automatically.
cameras.push({
    "brand": "aaa111",  // <-- change these values to see effect
    "model": "bbb222",
	"price": "cccc333",
    "image": "dddd44"
});
