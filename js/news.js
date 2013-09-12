$(function () {
    var serviceUrl = 'http://203.113.130.218:50080/dtdl/api/tin_tuc.php?callback=?';
    var dataStore = {};
    $.ajax({
        url: serviceUrl,
		crossDomain: true,
        dataType: "jsonp",
		contentType: "application/json; charset=utf-8",
		jsonpCallback:'jsonGastro',
        })
		.success
		(function(data) {
			$.each(data, function(i, item){
				//if (item.parent_id == 15 ) {
				// Stash the items by id for later retrieval.           
					dataStore[item.id] = item;
					var $row = $(
					'<li>' +
					'<a href="#details">' +
				//	'<img src="http://203.113.130.218:50080/dtdl/' + item.image + '" width="135" height="138" />' + 
					'<h2>' + item.title + '</h2>' +
					//'<p>' + item.introtext + '</p>' +
					'</a>' +
					'</li>'
					);//}
				$('#result-restaurant').append($row);

				$($row)
				.jqmData('item-id', item.id)
				.click(function(e) {
		var item = dataStore[$(this).jqmData('item-id')];
		$('#details #title').html(item.title);
		$('#details #fulltext').html(item.fulltext);
	//	$('#details #price').html(item.price);
  //     $('#details #image').attr('http://203.113.130.218:50080/dtdl/', item.image);
});




	$('#result-restaurant').listview('refresh');
		});
		
			   
	
		
		
		
			    
  });
      
        });