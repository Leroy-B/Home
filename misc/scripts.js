$(document).ready(function(){
    
	$.ajaxSetup({
	    beforeSend: function(xhr) {
	        xhr.setRequestHeader('x-my-custom-header', 'Access-Control-Allow-Origin: *');
	    }
	});
    
    function reload_js(src) {
        $('script[src="' + src + '"]').remove();
        $('<script>').attr('src', src).appendTo('head');
    }
	
	var delayInMilliseconds = 6000;
	
	setTimeout(function() {
	    //https://leroy-b.github.io/Home/misc/
	    reload_js('scripts.js');
	
	}, delayInMilliseconds);

});

$(document).ready(function(){
    
    /* VAR START */
    var price;
    var priceChange24HR;
    var hashrate1HR;
    var hashrate12HR;
    var percentage;
    var delayInMilliseconds = 6000;
    var currency = "monero";//static in html
    /* VAR END */
    
    //###########################################################//
    
        /* Currency PRICE START*/
    $.ajax({
        url: 'http://coincap.io/page/XMR',
        dataType: 'json',
        success: function(json) {

	        price = json.data.price_eur;
            priceChange24HR = json.data.cap24hrChange;
			
			if(price) { 
	            console.log(price+' price');
	            $("#"+currency).html(price+" Fr.");
            }
            
            if (priceChange24HR > 0) {
                $("#arrow").addClass('arrowUp');
                console.log(priceChange24HR+' priceChange24HR');
                $("#arrow").html(priceChange24HR);
                $("#arrow").append('%');
            } else if (priceChange24HR < 0) {
                $("#arrow").addClass('arrowDown');
                priceChange24HR = priceChange24HR * (-1);
                console.log(priceChange24HR+' priceChange24HR');
                $("#arrow").html(priceChange24HR);
                $("#arrow").append('%');
            } else {
                
            }
        }
    });
    /* Currency PRICE END*/
    
    //###########################################################//
    
    /* Currency BALANCE START */
    $.ajax({
        url: 'https://api.nanopool.org/v1/eth/balance/b2c3fdcb08a168e8cba4aece86d2162745ecb61d',
        dataType: 'json',
        success: function(json) {
			
	        var balance = json.data;
            var balanceFranken = balance * price;
            console.log(balance+' balance');
            console.log(balanceFranken+' balanceFranken');
	            
            percentage = (balance / .1) * 100;
            console.log(percentage+' percentage');           
        }
      }, delayInMilliseconds);
    /* Currency BALANCE END */
    
    //###########################################################//
    
    /* Currency HASHRATE START */
    $.ajax({
        url: 'https://api.nanopool.org/v1/eth/avghashrate/b2c3fdcb08a168e8cba4aece86d2162745ecb61d',
        dataType: 'json',
        success: function(json) {

	        hashrate1HR = json.data.h1;
            hashrate12HR = json.data.h6;
            console.log(hashrate1HR+' hashrate1HR');
            console.log(hashrate12HR+' hashrate12HR');
            
			$("#hashrate").html(hashrate1HR.toFixed(1)+' H/s Ø '+hashrate12HR.toFixed(1));
        }
    });
    /* Currency HASHRATE END */
    
    //###########################################################//
    
    /* Currency PROGRESS START*/
    var progressSelector = $(".progress-wrap");
	
	var delayInMilliseconds = 6000;
	
	setTimeout(function() {
		
		progressSelector.each(function(){
			var getPercent = percentage;
			var getSpeed = parseInt($(this).attr("data-speed"));
			var getColor = $(this).attr("data-color");
			var getHeight = $(this).attr("data-height");
			var getWidth = $(this).attr("data-width");
			$(this).css({"height":getHeight,"width":getWidth});
			$(this).find(".progress-bar").css({"background-color":"#"+getColor}).animate({ width:getPercent+'%' },getSpeed)
		});
	}, delayInMilliseconds);
    /* Currency PROGRESS END*/
    
    //###########################################################//
    
});