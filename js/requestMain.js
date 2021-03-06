$(document).ready(function () {
    workingWithNotifications();
    const list_div = document.querySelector("#list_div");
    var reqRef = db.collection("requestpost");

    firebase.auth().onAuthStateChanged(function(user) {
        var user = user.uid;
        currentUser = user;

        //display all request posts dynamically
        reqRef.where("status", "==", "pending").orderBy("timestamp", "desc").onSnapshot(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                list_div.innerHTML += "<div class= 'list-item'><p>items: </p>" 
                    + doc.data().items 
                    + "<p>need this by: </p>" 
                    + doc.data().needbydate 
                    + "<p>message: </p>" 
                    + doc.data().message
                    + "<p class='docref' style='visibility: hidden'>"
                    + doc.data().docRefid
                    + "</p>"
                    + "<input id='help_btn' class='btn btn-primary' type='submit' value='Help Me'/>"
                    + "</div>";

                $(".btn").click(function(){
                    $(this).val("Help on its way!").prop('disabled', true);
                    var matchID = $(this).siblings('.docref')[0].innerHTML;
                    var docRef = db.collection("requestpost").doc(matchID);
                    docRef.set({
                        volunteer_uid: currentUser,
                        status: "accepted"
                    }, {merge: true});
            })
            });

        });

    });

    function workingWithNotifications() {
        // console.log("in new function");

        auth.onAuthStateChanged((user) => {
            if (user) {
                db.collection('user').doc(user.uid).onSnapshot(function (snap) {
                    var newrequest = snap.data().newMsg;
                    // console.log("current data is ...", snap.data().newMsg);
                    if (newrequest == true) {
                        alert("you have a new request");
                        var notify = {
                            "background-color": "red"
                        };
                        $("#pendingRequests").css(notify);
                    }
                });
            }
        })
    }
})
