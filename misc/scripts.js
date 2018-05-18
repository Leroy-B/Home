function getElementsById(ids) {
    var idList = ids.split(" ");
    var results = [], item;
    for (var i = 0; i < idList.length; i++) {
        item = document.getElementById(idList[i]);
        if (item) {
            results.push(item);
        }
    }
    return(results);
}

$(document).ready(function(){

	//config var
	if(textColor == 'black'){
	document. getElementsById("hashrate wallet currency").style.color = 'black';
		
	}
	if(textColor == 'white'){
document. getElementsById("hashrate wallet currency").style.color = 'white';
	}
	if(textColor == 'orange'){
		document. getElementsById("hashrate wallet currency").style.color = 'orange';
	}
	//document.getElementById("Widget");
    
	$.ajaxSetup({
	    beforeSend: function(xhr) {
	        xhr.setRequestHeader('x-my-custom-header', 'Access-Control-Allow-Origin: *');
	    }
	});
    
    function reload_js(src) {
        $('script[src="' + src + '"]').remove();
        $('<script>').attr('src', src).appendTo('head');
    }
	
	var delayInMilliseconds = 10000;
	
	setTimeout(function() {
	    //https://leroy-b.github.io/Home/misc/
	    reload_js('https://leroy-b.github.io/Home/misc/scripts.js');
	
	}, delayInMilliseconds);

});

$(document).ready(function(){
    
    /* VAR START */
    var price;
    var priceChange24HR;
    var hashrate1HR;
    var hashrate12HR;
    var percentage;
    var payoutLimit = 0.2;
    var delayInMilliseconds = 10000;
    var currency = "currency";//static in html
    /* VAR END */
    
    //###########################################################//
    
    /* Currency PRICE START*/
    $.ajax({
        type: "GET",
        url: 'https://api.coinmarketcap.com/v1/ticker/monero/?convert=CHF',
        dataType: 'json',
        success: function(json) {

	        price = result[0].price_chf;
            percentChange24HR = result[0].percent_change_24h;
            
			if(price) { 
	            console.log(price.toFixed(1)+' price');
	            $("#"+currency).html(price.toFixed(1)+" CHF");
            }
            
            if (percentChange24HR > 0) {
                $("#arrow").addClass('arrowUp');
                console.log(percentChange24HR+' percentChange24HR');
                $("#arrow").html(percentChange24HR);
                $("#arrow").append('%');
            } else if (percentChange24HR < 0) {
                $("#arrow").addClass('arrowDown');
                percentChange24HR = percentChange24HR * (-1);
                console.log(percentChange24HR+' percentChange24HR');
                $("#arrow").html(percentChange24HR);
                $("#arrow").append('%');
            } else {
                
            }
        }
    }, delayInMilliseconds);
    /* Currency PRICE END*/
    
    //###########################################################//
    
    /* Currency BALANCE START */
    $.ajax({
        url: 'https://api.nanopool.org/v1/eth/balance/26250a05D2d8A63235FCF6b9c1D60ab944F6c834',
        dataType: 'json',
        success: function(json) {
			
	        var balance = json.data;
            var balanceFranken = balance * price;
            console.log(balance+' balance');
            console.log(balanceFranken+' balanceFranken');
	            
            percentage = (balance / payoutLimit) * 100;
            console.log(payoutLimit+' payoutLimit');
            console.log(percentage+' percentage');
            
            $("#wallet").html(percentage.toFixed(1)+'%');
        }
    }, delayInMilliseconds);
    /* Currency BALANCE END */
    
    //###########################################################//
    
    /* Currency HASHRATE START */
    //privat: b2c3fdcb08a168e8cba4aece86d2162745ecb61d
    //rig: 26250a05D2d8A63235FCF6b9c1D60ab944F6c834
    $.ajax({
        url: 'https://api.nanopool.org/v1/eth/avghashrate/26250a05D2d8A63235FCF6b9c1D60ab944F6c834',
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