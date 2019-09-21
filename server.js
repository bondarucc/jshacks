var prom1 = new Promise(res => {
  var script = document.createElement('script');
  script.onload = function () { res() };
  script.src = 'https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js';
  document.head.appendChild(script);
});
var prom2 = new Promise(res => {
  var script = document.createElement('script');
  script.onload = function () { res() };
  script.src = 'https://www.gstatic.com/firebasejs/6.1.0/firebase-firestore.js';
  document.head.appendChild(script);
});
Promise.all([prom1, prom2]).then(() => {
  const firebaseConfig = {
    //firebase app config should be here
  };
  var app = firebase.initializeApp(firebaseConfig).firestore();
  function spy(coords) {
      var arr = []
      coords.forEach(el => {
          arr.push({
            X: el.X,
            Y: el.Y
          })
      })
      app.doc('coords/coords').update({ coords: arr }).then(() => console.log('uploaded'))
  }
  parent.$('#MainFrame').on('revealMarker', function (e) {
    spy(e.points)
  });
})