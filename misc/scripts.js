$(document).ready(function(){
    
	/*$.ajaxSetup({
	    beforeSend: function(xhr) {
	        xhr.setRequestHeader('x-my-custom-header', 'Access-Control-Allow-Origin: *');
	    }
	});*/
    
    function reload_js(src) {
        $('script[src="' + src + '"]').remove();
        $('<script>').attr('src', src).appendTo('head');
    }
	
	var delayInMilliseconds = 10000;
	
	setTimeout(function() {
	    
	    reload_js('https://leroy-b.github.io/Home/misc/scripts.js');
	
	}, delayInMilliseconds);

});

var price;
var percentage;

$(document).ready(function(){

    $.ajax({
        url: 'https://min-api.cryptocompare.com/data/price?fsym=XMR&tsyms=CHF',
        dataType: 'json',
        success: function(json) {

	        price = json.CHF;
			$("#monero").html(price+' CHF');
        }
    });
    
    $.ajax({
        url: 'https://api.nanopool.org/v1/xmr/hashrate/42jBMo7NpyYUoPU3qdu7x6cntT3ez2da5TxKTwZVX9eZfwBA6XzeQEFcTxBukNUYyaGtgvdKtLyz72udsnRo3hFhLYPo37L',
        dataType: 'json',
        success: function(json) {

	        hashrate = json.data;
			$("#hashrate").html(hashrate+' H/s');
        }
    });
	
	function getYesterdaysDate() {
	    var date = new Date();
	    date.setDate(date.getDate()-1);
	    var theMonth = (date.getMonth()+1);
	    return date.getFullYear() + '-'+ (theMonth < 10 ? '0' : '') + theMonth + '-' + (date.getDate() < 10 ? '0' : '') + date.getDate();
	}
	
	var yesterday = getYesterdaysDate();
    var yesterdayUNIX = new Date(yesterday).getTime() / 1000;
	
    $.ajax({
        url: 'https://min-api.cryptocompare.com/data/dayAvg?fsym=XMR&tsym=CHF&toTs='+yesterdayUNIX,
        dataType: 'json',
        success: function(json) {
						
		    yesterdayPrice = json.CHF;
	
			var delayInMilliseconds = 8000;
			
			setTimeout(function() {
				
				if(yesterdayPrice) { 
					priceChange = ( (100 - (yesterdayPrice / price) * 100) );
					var priceChange = Math.round( priceChange * 10 ) / 10;
		            
		            if (priceChange > 0) {
                        $("#arrow").html(priceChange);
			            $("#arrow").append('%');
			            $("#arrow").addClass('arrowUp');
		            } else if (priceChange < 0) {
                        priceChange = priceChange * (-1);
			            $("#arrow").html(priceChange);
			            $("#arrow").append('%');
			            $("#arrow").addClass('arrowDown');
		            } else {
			            //do nothing
		            }
		            
		        }
        	}, delayInMilliseconds);
        }
    });
});
