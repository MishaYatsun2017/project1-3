$(document).ready(function(){
	
	var goodsCollection = [];
	var identityCounter = 3;
	
	addGood({id: 0, name: 'Tomatoes', number: 1, bought: false});
	addGood({id: 1, name: 'Cookies', number: 1, bought: false});
	addGood({id: 2, name: 'Cheese', number: 1, bought: false});
		
	$( "#add" ).click(function() {		 
	   addGood({name:$('#goodName').val(), number:1, bought:false});
	   $('#goodName').val('');
	   
	});
	
	function numberChangeButtonClicked(id, inc){
		var itemToUpdate = $.grep(goodsCollection, function(e){ return e.id === id; })[0];
		itemToUpdate.number += inc;
		if(itemToUpdate.number === 1){
			$('#btn-minus-'+id).prop("disabled",true);
		}else{
			$('#btn-minus-'+id).prop("disabled",false);
		}
		$('#count_'+id).text(itemToUpdate.number);
		$('#statisticsCount_'+id).text(itemToUpdate.number);
	}
	
	function addGood(value)
	{
		goodsCollection.push(value);
		var elementHtml = '<div class="col-xs-12 template products" id="productsListEntry_'+value.id+'">' + 
							  '<div class="col-xs-3 name-products" id="productName_'+value.id+'">' + value.name + '</div>' + 
						      '<div class="col-xs-4 count-products">' + 
								'<button id="btn-minus-'+value.id+'" disabled="true" class="btn-minus"><i class="fa fa-minus" aria-hidden="true"></i></button>' + 
								'<span class="count" id="count_'+value.id+'">1</span>'+
								'<button id="btn-plus-'+value.id+'" class="btn-plus"><i class="fa fa-plus" aria-hidden="true"></i></button>' + 
							  '</div>' +
							  '<div class="col-xs-5 last-buttons">' + 
								'<button class="btn btn-default" id="btn-bought-'+value.id+'">Bought</button>' +
								'<button class="btn btn-danger" id="btn-delete-'+value.id+'"><i class="fa fa-close" aria-hidden="true"></i></button>' + 
							  '</div>'
							'</div>';
		$("#goodsMainList").append(elementHtml);
		
		var remainingElementHtml = getStatisticsElementHtml(value);
		$("#remainingElements").append(remainingElementHtml);
		
		
		$("#btn-minus-"+value.id).click(function() {numberChangeButtonClicked(value.id, -1)});
		$("#btn-plus-"+value.id).click(function() {numberChangeButtonClicked(value.id, 1)});
		$("#btn-delete-"+value.id).click(function() {removeGood(value.id)});
		$("#btn-bought-"+value.id).click(function() {boughtClicked(value.id)});
		
		
		$('#productName_'+value.id).click(function(){
			var name = $(this).text();
			$(this).html('');
			$('<input></input>')
				.attr({
					'type': 'text',
					'name': 'fname',
					'id': 'txt_productName_'+value.id,
					'size': '30',
					'value': name
				})
				.appendTo('#productName_'+value.id);
			$('#txt_productName_'+value.id).focus();
		});
		
		$(document).on('blur','#txt_productName_'+value.id, function(){
			var name = $(this).val();
			$('#productName_'+value.id).text(name);
			var itemToUpdate = $.grep(goodsCollection, function(e){ return e.id === value.id; })[0];
			itemToUpdate.name = name;
			var statisticsItem = $("#statisticsGood_"+value.id);
			statisticsItem.html(name+'<span class="circle-count" id="statisticsCount_'+value.id+'">'+value.number+'</span>');
		});
	}
	
	function getStatisticsElementHtml(value){
		return '<span class="right-products-lefts" id="statisticsGood_'+value.id+'">'+value.name+'<span class="circle-count" id="statisticsCount_'+value.id+'">'+value.number+'</span></span>';
	}
	
	function removeGood(id){
		goodsCollection = $.grep(goodsCollection, function(e){ 
			 return e.id != id; 
		});
		$("#productsListEntry_"+id).remove();
		$("#statisticsGood_"+id).remove();
	}
	
	function boughtClicked(id){
		var itemToUpdate = $.grep(goodsCollection, function(e){ return e.id === id; })[0];
		
		itemToUpdate.bought = !itemToUpdate.bought;
		
		if(itemToUpdate.bought){
			$("#productName_"+id).css("text-decoration", "line-through");
			$("#btn-minus-"+id).hide();
			$("#btn-plus-"+id).hide();
			$("#btn-delete-"+id).hide();
			$("#btn-bought-"+id).text('Not Bought');
			var statisticsItem = $("#statisticsGood_"+id);
			statisticsItem.remove();
			$("#boughtElements").append(getStatisticsElementHtml(itemToUpdate));
						
		} else{
			$("#productName_"+id).css("text-decoration", "none");
			$("#btn-minus-"+id).show();
			$("#btn-plus-"+id).show();
			$("#btn-delete-"+id).show();
			$("#btn-bought-"+id).text('Bought');
			var statisticsItem = $("#statisticsGood_"+id);
			statisticsItem.remove();
			$("#remainingElements").append(getStatisticsElementHtml(itemToUpdate));						
		}
	}
		
});