 //add listener when device ready
    document.addEventListener("deviceready", onDeviceReady, false);
    var db = window.openDatabase("Dummy_DB", "1.0", "Just a Dummy DB", 200000); //will create database Dummy_DB or open it
 
    //function will be called when device ready
    function onDeviceReady(){
        db.transaction(populateDB, errorCB, successCB);
    }
 
    //create table and insert some record
    function populateDB(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS News (id INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT NOT NULL, Date TEXT NOT NULL)');
        tx.executeSql('INSERT INTO News(Title,Date) VALUES ("Chương trình khuyến mãi hè ", "Thời gian khuyến mãi 31/7 - 20/8")');
        tx.executeSql('INSERT INTO News(Title,Date) VALUES ("Chương trình giảm giá sốc", "Thời gian khuyến mãi 31/7")');
    }
 
    //function will be called when an error occurred
    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
    }
 
    //function will be called when process succeed
    function successCB() {
        alert("success!");
        db.transaction(queryDB,errorCB);
    }
 
    //select all from SoccerPlayer
    function queryDB(tx){
        tx.executeSql('SELECT * FROM News',[],querySuccess,errorCB);
    }
 
    function querySuccess(tx,result){
        $('#News').empty();
        $.each(result.rows,function(index){
            var row = result.rows.item(index);
            $('#News').append('<li><a href="some.html"><h3 class="ui-li-heading">'+row['Title']+'</h3><p class="ui-li-desc">Thá»�i gian: '+row['Date']+'</p></a></li>');
        });
 
        $('#News').listview();
    }