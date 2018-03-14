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
	    reload_js('https://leroy-b.github.io/Home/misc/XMRscripts.js');
	
	}, delayInMilliseconds);

});

$(document).ready(function(){
    
    /* VAR START */
    var price;
    var hashrate1HR;
    var hashrate12HR;
    var percentage;
    var delayInMilliseconds = 10000;
    /* VAR END */
    
    //###########################################################//
    
    /* ETH BALANCE START */
    $.ajax({
        url: 'https://api.nanopool.org/v1/eth/balance/b2c3fdcb08a168e8cba4aece86d2162745ecb61d',
        dataType: 'json',
        success: function(json) {
			
	        balance = json.data;

			if(balance) { 
	            
	            console.log(balance);
            
	            balanceDollars = balance * price;
	            
	            var shortBalance = balance.toString().slice(0, -8);
	            var shortBalanceDollars = balanceDollars.toString().slice(0, 5);
	            
	            $('#balance').html(shortBalance);
	            $('#balanceDollars').html('$'+shortBalanceDollars);
	            
	            percentage = (balance / .1) * 100;
	            console.log(percentage);
            
            }            
        }
      }, delayInMilliseconds);
    /* ETH BALANCE END */
    
    //###########################################################//
    
    /* ETH HASHRATE START */
    
    $.ajax({
        url: 'https://api.nanopool.org/v1/eth/avghashrate/b2c3fdcb08a168e8cba4aece86d2162745ecb61d',
        dataType: 'json',
        success: function(json) {
            
            hashrate12HR = json.data.h1;
            $("#hashrate1HR").html(hashrate1HR.toFixed(1));
            
		    hashrate12HR = json.data.h12;
            $("#hashrate12HR").html(hashrate12HR.toFixed(1));
        }
    });
    /* MONERO HASHRATE END */
    
    //###########################################################//
    
    /* ETH PRICE START*/
    $.ajax({
        url: 'https://api.coinmarketcap.com/v1/ticker/monero/?convert=CHF',
        dataType: 'json',
        success: function(json) {

	        price = json.price_chf;
            
            var priceChange = json.percent_change_24h;
		            
            if (priceChange > 0) {
                $("#arrow").addClass('arrowUp');
                console.log(priceChange);
                $("#arrow").html(priceChange);
                $("#arrow").append('%');
            } else if (priceChange < 0) {
                $("#arrow").addClass('arrowDown');
                priceChange = priceChange * (-1);
                console.log(priceChange);
                $("#arrow").html(priceChange);
                $("#arrow").append('%');
            } else {
                //do nothing
            }
			
			if(price) { 
	            console.log(price);
	            $("#monero").html(price+" Fr.");
            }
        }
    });
    /* ETH PRICE END*/
    
    //###########################################################//
    
    /* ETH PROGRESS START*/
    var progressSelector = $(".progress-wrap");
	
	var delayInMilliseconds = 10000;
	
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
    /* ETH PROGRESS END*/
    
    //###########################################################//
    
});