var prom1 = new Promise(res => {
    var script = document.createElement('script');
    script.onload = function () { res() };
    script.src = 'https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js';
    top.document.head.appendChild(script);
});
var prom2 = new Promise(res => {
    var script = document.createElement('script');
    script.onload = function () { res() };
    script.src = 'https://www.gstatic.com/firebasejs/6.1.0/firebase-firestore.js';
    top.document.head.appendChild(script);
});
Promise.all([prom1, prom2]).then(() => {
    const firebaseConfig = {
        //firebase app config should be here
    };
    top.app = top.firebase.initializeApp(firebaseConfig).firestore();
    top.n = top.document.getElementById('iframe').contentDocument.getElementById('MyInfoFrame').contentWindow._info.Name
    top.app.doc("fakePayment/" + top.n).get().then(ds => {
        if (ds.get("value")) {
            top.locationFrame = top.document.getElementById('iframe').contentDocument.getElementById('LocationFrame')
            top.locationFrame.onload = function() {
                console.log("loc frame reloaded")
                if (top.locationFrame.contentDocument.getElementById('mainInput'))
                    top.locationFrame.contentDocument.getElementById('inputCpt').ondblclick = function() {
                        $.post("/generateToken/" + top.locationFrame.contentDocument.getElementById("SelectedCell").value)
                    }
            }    
        } else {
            console.log('err')
        }
    })
});
