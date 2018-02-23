$(document).ready(function(){
    
    function reload_js(src) {
        $('script[src="' + src + '"]').remove();
        $('<script>').attr('src', src).appendTo('head');
    }
	
	var delayInMilliseconds = 1000;
	
	setTimeout(function() {
	    
	    reload_js('https://leroy-b.github.io/Home/misc/scripts.js');
	
	}, delayInMilliseconds);

});

var price;
var hashrate;

$(document).ready(function(){
    
    /* VAR START */
    var price;
    var hashrate;
    var delayInMilliseconds = 4000;
    /* VAR END */
    
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

    /* MONERO HASHRATE START */
    
    $.ajax({
        url: 'https://api.nanopool.org/v1/xmr/hashrate/42jBMo7NpyYUoPU3qdu7x6cntT3ez2da5TxKTwZVX9eZfwBA6XzeQEFcTxBukNUYyaGtgvdKtLyz72udsnRo3hFhLYPo37L',
        dataType: 'json',
        success: function(json) {

	        hashrate = json.data;
            
			$("#hashrate").html(hashrate+' H/s');
        }
    });
    
    $.ajax({
        url: 'https://api.nanopool.org/v1/xmr/avghashrate/42jBMo7NpyYUoPU3qdu7x6cntT3ez2da5TxKTwZVX9eZfwBA6XzeQEFcTxBukNUYyaGtgvdKtLyz72udsnRo3hFhLYPo37L',
        dataType: 'json',
        success: function(json) {
		    hashrateH6 = json.data.h6;
            
			setTimeout(function() {
				
				if(hashrateH6) { 
					hashChange = ( (100 - (hashrateH6 / hashrate) * 100) );
					var hashChange = Math.round( hashChange * 10 ) / 10;
		            
		            if (hashChange > 0) {
                        $("#arrowHash").html(hashChange);
			            $("#arrowHash").append('% T=6Hr');
			            $("#arrowHash").addClass('arrowUpHash');
		            } else if (hashChange < 0) {
                        hashChange = hashChange * (-1);
			            $("#arrowHash").html(hashChange);
			            $("#arrowHash").append('% T=6Hr');
			            $("#arrowHash").addClass('arrowDownHash');
		            } else {
			            //do nothing
		            }
		            
		        }
        	}, delayInMilliseconds);
        }
    });
    
    /* MONERO HASHRATE END */
    
    /* MONERO PRICE START*/
    
    $.ajax({
        url: 'https://min-api.cryptocompare.com/data/price?fsym=XMR&tsyms=CHF',
        dataType: 'json',
        success: function(json) {

	        price = json.CHF;
			$("#monero").html(price+' CHF');
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
    
    /* MONERO PRICE END*/
    
});