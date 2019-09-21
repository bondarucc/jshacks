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
    app.doc('coords/coords').onSnapshot(function(ds) {
        var coords = ds.get('coords');
        console.log(coords);
        var mapTable = window.top.document.getElementById('iframe').contentDocument.getElementById('LocationFrame').contentDocument.getElementById('map');
        $.each(mapTable.rows, function (rowIndex, row) {
            $.each(row.cells, function (cellIndex, cell) {
                cell.style.backgroundImage="";

                var points = $.grep(coords, function( point ) {
                    return point.X == ( cellIndex - 1 ) && point.Y == ( rowIndex - 1 );
                });

                if (points.length>0){
                    cell.style.backgroundImage='marker.png';
                };
            });
        });
    });
});