$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            var user = user.uid;
            currentUser = user;
            
            var reqRef = db.collection("requestpost");

            //display all request posts dynamically
            reqRef.where("status", "==", "accepted").where("volunteer_uid", "==", currentUser).get().then(querySnapshot => {
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
                        + "<input id='complete-btn' class='btn btn-primary' type='submit' value='Mark as completed'/>"
                        + "</div>";

                    $(".btn").click(function(){
                        $(this).val("Completed!").prop('disabled', true);
                        var matchID = $(this).siblings('.docref')[0].innerHTML;
                        var docRef = reqRef.doc(matchID);
                        docRef.set({
                            status: "completed"
                        }, {merge: true});
                })
                });
            });
        } else{
            console.log("no user");
        }

    });
    
});