//control tabs products dien tu - dien lanh		
<script>
$('div[data-role="navbar"] a').live('click', function () {
    $(this).addClass('ui-btn-active');
    $('div.content_div').hide();
    $($(this).attr('data-href')).show();
  });
  
  
  
  //js dientu.html
	  $("div[data-role=page]").bind("pagebeforeshow", function () {
		// prevents a jumping "fixed" navbar
		$.mobile.silentScroll(0);
	});

	$("a[data-role=tab]").each(function () {
			// bind to click of each anchor
			var anchor = $(this);
			anchor.bind("click", function () {
				// change the page, optionally with transitions
				// but DON'T navigate...
				$.mobile.changePage(anchor.attr("href"), {
					transition: "none",
					changeHash: false
			});

			// cancel the click event
			return false;
		});
	});
	
	//list products tablets and desktop and laptops
	 var serviceURL = "http://localhost/jquery-json-php/products/json.php?callback=?";
				 $.getJSON(serviceURL,function(data) {
				   $.each(data, function(index,item) {
					 $('#dataList').append('<li><a href="'+item.link+'"><img src="http://203.113.130.218:50080/dtdl/images/sampledata/categorymedia/' + item.image + '" width="135" height="138"/><h4>'+ item.title +'</h4></a></li>');
				   });
				   $('#dataList').listview('refresh');
				 });
</script>