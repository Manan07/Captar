// Web Defaults

const Ham = document.querySelector('.Ham');
const HamBod = document.querySelector('.HamBody');

const checkClass = function(element, className) {
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
 }


// Hamburger Item Stuffy
Ham.onclick = function() {
  Ham.classList.add('Active');
  HamBod.style.display = "block";
  HamBod.classList.add('slide-in-top')
 }
 
 Ham.onclick = function () {
  if (!checkClass(Ham, 'Active')) {
   // Entrance
   Ham.classList.add('Active');
   HamBod.style.display = "block";
   HamBod.classList.add('slide-in-top')
 
   // Remove Exit Class if exists
   if (checkClass(HamBod, 'slide-out-top')) {
    HamBod.classList.remove('slide-out-top')
   }
  }
 
  else if (checkClass(Ham, 'Active')) {
   // Exit
   Ham.classList.remove('Active');
   HamBod.classList.add('slide-out-top')
   HamBod.classList.remove('slide-in-top')
 
   // Change Style to none when the animation completes
   setTimeout(function () { 
    HamBod.style.display = "none";
   }, 500);
  }
 }

// Hider
const InputSec = document.querySelector('.Input')
const Field = document.querySelector('.Conn-Field')
const ConnBtn = document.querySelector('.Conn-Now')

ConnBtn.onclick = ()=> {
 if(Field.value.length >= 5) {
  InputSec.style.display = 'none'
 }
}

// STUN/TURN Server: numb.viagenie.ca
// Username: mananchaturvedi07@gmail.com
// Password: somerandompass

const Own = document.querySelector('.Own')
const Opp = document.querySelector('.Opp')
const PeerId = document.querySelector('.PeerId')

var peer = new Peer({debug: 3, 
 config: {'iceServers': [
 {url: 'turn:numb.viagenie.ca', username: 'mananchaturvedi07@gmail.com', credential: 'somerandompass'}
]}
});

peer.on('open', function(id) {
  PeerId.innerText = 'Your ID : ' + peer.id;
});

ConnBtn.addEventListener('click', () => {
 let ID = Field.value
 const conn = peer.connect(ID);

 conn.on('open', function(){
  // here you have conn.id
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
   var call = peer.call(ID, stream);
   call.on('stream', function(remoteStream) {
      Opp.srcObject = remoteStream
      Opp.play() 
    });
  }) 
 });
})

peer.on('connection', function(conn) {
 navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream){
  peer.on('call', function(call) {
  // Answer the call, providing our mediaStream
  call.answer(stream);
  call.on('stream', function(remoteStream) {
      Opp.srcObject = remoteStream
      Opp.play() 
    });
});
})
});

navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
// video.src = window.URL.createObjectURL(stream);
Own.srcObject = stream
// // $('#my-video').prop('src', stream);

Own.play() 
}) 
