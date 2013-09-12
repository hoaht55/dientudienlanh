
//-----------------------------
//Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

//----------------
//
title="";
parent_id="";
id="";
getCategoryJson="";

//-----------------
//Initializ database
var db = "";

//---------------------------
function replacer(key, value) {
	if (typeof value === 'number' && !isFinite(value)) {
			return String(value);
		}
	return value;
}
//------------------------
//Get Json data category.
function getCategoryJson() {
	var url="http://203.113.130.218:50080/dtdl/api/get_category.php";
	alert(url);
	$.ajax({
		dataType: "json",
		url: url,
		type: "GET",
		success: function( data){ // get read data from json to database with nameTable MARKSTUDENT
			var	myJSONText	=	JSON.stringify(data,replacer);
			jsonCategory=data;
			startCreateTableMarkStudent();
		},
		error: function(xhr, textStatus, error){
			alert("Erorr mark");
		}
	});// end ajax
	
}

//------------------------------
//Populate the database
function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS CATEGORY');
    var sql = "CREATE TABLE IF NOT EXISTS CATEGORY ( "+
	//"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
	"title VARCHAR(50), " +
	"parent_id INT(50)," +
	"id INT(50))";
    tx.executeSql(sql);
  //  console.log("id:" + id + "title:"+title+"parent_id:"+parent_id);
//    tx.executeSql('INSERT INTO CATEGORY(title, id, parent_id) VALUES ("Máy tính để bàn", "8", "15")');
  //  tx.executeSql('INSERT INTO CATEGORY(title, id, parent_id) VALUES ("Tablets", "10", "15")');
    //tx.executeSql('INSERT INTO CATEGORY(title, id, parent_id) VALUES ("Máy tính xách tay", "9", "15")');
    //tx.executeSql('INSERT INTO CATEGORY(title, id, parent_id) VALUES ("Tủ lạnh", "11", "15")');
    
   //loop to read data from json to create table category
    for (var i in  jsonCategory){
    	tx.excuteSql('INSER');
    	
    }
   
}

//-----------------------
//Query the database
function queryDB(tx) {
    tx.executeSql('SELECT * FROM CATEGORY', [], querySuccess, errorCB);
}

//--------------------------------------------
//Query the success callback
function querySuccess(tx,result){
    var playerlist = document.getElementById("category");
    var players = "";
    alert("The show is on");
    var len = result.rows.length;
    for (var i=0; i<len; i++){
        alert(result.rows.item(i).Name + result.rows.item(i).Club);
        players = players + 
        		'<li><a href="#"><h3 class="ui-li-heading">'+result.rows.item(i).title +'</h3><p class="ui-li-desc">ID '+result.rows.item(i).id+'</p></a></li>';
    }   

    playerlist.innerHTML = players;
    $("#category").listview();
  
}

//--------------------
//Transaction error callback
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}


//-------------------------
//Transaction success callback
function successCB() {
	alert("success!");
	db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    db.transaction(queryDB, errorCB);
}

//-------------------------
//PhoneGap is ready
function onDeviceReady() {
    db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    db.transaction(populateDB, errorCB, successCB);
}


/*document.addEventListener("deviceready", onDeviceReady, false);

var db = "";

function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS SoccerPlayer');
    tx.executeSql('CREATE TABLE IF NOT EXISTS SoccerPlayer (Name TEXT NOT NULL, Club TEXT NOT NULL)');
    tx.executeSql('INSERT INTO SoccerPlayer(Name,Club) VALUES ("Alexandre Pato", "AC Milan")');
    tx.executeSql('INSERT INTO SoccerPlayer(Name,Club) VALUES ("Van Persie", "Arsenal")');
}

function queryDB(tx) {
    tx.executeSql('SELECT * FROM SoccerPlayer', [], querySuccess, errorCB);
}


function querySuccess(tx,result){
    var playerlist = document.getElementById("SoccerPlayerList");
    var players = "";
    alert("The show is on");
    var len = result.rows.length;
    for (var i=0; i<len; i++){
        alert(result.rows.item(i).Name + result.rows.item(i).Club);
        players = players + '<li><a href="#"><h3 class="ui-li-heading">'+result.rows.item(i).Name+'</h3><p class="ui-li-desc">Club '+result.rows.item(i).Club+'</p></a></li>';
    }   

    playerlist.innerHTML = players;
    $("#SoccerPlayerList").listview();
  
}


function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}


function successCB() {
	alert("success!");
	db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    db.transaction(queryDB, errorCB);
}


function onDeviceReady() {
    db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    db.transaction(populateDB, errorCB, successCB);
}
*/