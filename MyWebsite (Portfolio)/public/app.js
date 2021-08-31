// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyC0UYWNFxKVS-bWteZuSTAdcmXhkB4NV9k",
    authDomain: "myfirstwebpage-9e118.firebaseapp.com",
    databaseURL: "https://myfirstwebpage-9e118.firebaseio.com",
    projectId: "myfirstwebpage-9e118",
    storageBucket: "myfirstwebpage-9e118.appspot.com",
    messagingSenderId: "1049691860636",
    appId: "1:1049691860636:web:96a793d15fca78b3e38759",
    measurementId: "G-VVW2PJ2HK3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  
  // Refernece contactInfo collections
  let contactInfo = firebase.database().ref("infos");
  
  // Listen for a submit
  document.querySelector(".contact-form").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    //   Get input Values
    let name = document.querySelector(".name").value;
    let phone_number = document.querySelector(".phone_number").value;
    let email = document.querySelector(".email").value;
    let message = document.querySelector(".message").value;
    console.log(name, phone_number, email, message);
  
    saveContactInfo(name, phone_number, email, message);
  
    document.querySelector(".contact-form").reset();
  }
  
  // Save infos to Firebase
  function saveContactInfo(name, phone_number, email, message) {
    let newContactInfo = contactInfo.push();
  
    newContactInfo.set({
      name: name,
      phone_number: phone_number,
      email: email,
      message: message,
    });
  }