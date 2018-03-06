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
	    
	    reload_js('https://leroy-b.github.io/Home/misc/ETHscripts.js');
	
	}, delayInMilliseconds);

});

$(document).ready(function(){
    
    /* VAR START */
    var price;
    var hashrate;
    var hashrate6HR;
    var percentage;
    var delayInMilliseconds = 6000;
    /* VAR END */
    
    //###########################################################//
    
    /* Get Yesterdays Date START */
    function getYesterdaysDate() {
	    var date = new Date();
	    date.setDate(date.getDate()-1);
	    var theMonth = (date.getMonth()+1);
	    return date.getFullYear() + '-'+ (theMonth < 10 ? '0' : '') + theMonth + '-' + (date.getDate() < 10 ? '0' : '') + date.getDate();
	}
	
	var yesterday = getYesterdaysDate();
    var yesterdayUNIX = new Date(yesterday).getTime() / 1000;
    /* Get Yesterdays Date END */
    
    //###########################################################//
    
        /* ETH PRICE START*/
    $.ajax({
        url: 'https://api.coinbase.com/v2/prices/ETH-CHF/spot',
        dataType: 'json',
        success: function(json) {

	        price = json.data.amount;
			
			if(price) { 
	            console.log(price+' price');
	            $("#ethereum").html(price+" Fr.");
            }
        }
    });
    /* ETH PRICE END*/
    
    //###########################################################//
    
    /* ETH BALANCE START */
    $.ajax({
        url: 'https://api.nanopool.org/v1/eth/balance/b2c3fdcb08a168e8cba4aece86d2162745ecb61d',
        dataType: 'json',
        success: function(json) {
			
	        balance = json.data;

			console.log(balance+' balance');
            balanceFranken = balance * price;
	            
            percentage = (balance / 1) * 100;
            console.log(percentage+' percentage');           
        }
      }, delayInMilliseconds);
    /* ETH BALANCE END */
    
    //###########################################################//
    
    /* ETH HASHRATE START */
    $.ajax({
        url: 'https://api.nanopool.org/v1/eth/avghashrate/b2c3fdcb08a168e8cba4aece86d2162745ecb61d',
        dataType: 'json',
        success: function(json) {

	        hashrate = json.data.h1;
            hashrate6HR = json.data.h6;
            
			$("#hashrate").html(hashrate.toFixed(2)+' H/s Ø '+hashrate6HR.toFixed(2));
        }
    });
    /* ETH HASHRATE END */
    
    //###########################################################//
    
    
    /* ETH PRICE YESTERDAY END*/
    $.ajax({
        url: 'https://api.coinbase.com/v2/prices/ETH-CHF/spot?date='+yesterday,
        dataType: 'json',
        success: function(json) {
						
		    yesterdayPrice = json.data.amount;
	
			var delayInMilliseconds = 6000;
			
			setTimeout(function() {
				
				if(yesterdayPrice) { 
		            
		            console.log(yesterday+': '+yesterdayPrice +' yesterday');
	            
					priceChange = ( (100 - (yesterdayPrice / price) * 100) );
					var priceChange = Math.round( priceChange * 10 ) / 10;
		            
		            if (priceChange > 0) {
			            $("#arrow").addClass('arrowUp');
			            console.log(priceChange+' priceChange');
			            $("#arrow").html(priceChange);
			            $("#arrow").append('%');
		            } else if (priceChange < 0) {
			            $("#arrow").addClass('arrowDown');
						priceChange = priceChange * (-1);
			            console.log(priceChange+' priceChange');
			            $("#arrow").html(priceChange);
			            $("#arrow").append('%');
		            } else {
			            //do nothing
		            }
		            
		        }
        	}, delayInMilliseconds);
        }
    });
    /* ETH PRICE YESTERDAY END*/
    
    //###########################################################//
    
    /* ETH PROGRESS START*/
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
    /* ETH PROGRESS END*/
    
    //###########################################################//
    
});