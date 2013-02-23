// Load pages in windows-1252 charset
//$.ajaxSetup({
//	'beforeSend' : function(xhr) {
//		if (xhr.overrideMimeType) {
//			xhr.overrideMimeType('text/html; charset=windows-1252');
//		} else {
//			xhr.setRequestHeader('Content-type',
//					'text/html; charset=windows-1252');
//		}
//	},
//});

$.mobile.listview.prototype.options.filterPlaceholder = "Filtrera...";
$.mobile.loader.prototype.options.text = "Laddar...";
$.mobile.loader.prototype.options.textVisible = true;

var Global = {
	selectedResultUrl : null,
	selectedResultHeader : null,
	getTemplate : function(templateName) {
		if (!Global._compiledTemplates[templateName]) {
			Global._initHelpers();
			Global._compiledTemplates[templateName] = Handlebars.compile($(templateName).html());
		}
		return Global._compiledTemplates[templateName];
	},
	_initHelpers : function() {
		if (!Global._initedTemplates) {
			Handlebars.registerHelper('substr', function(start, end, context) {
				return context.substring(start, end);
			});
			Global._initedTemplates = true;
		}
	},
	_compiledTemplates : {},
	_initedTemplates : false
};

$(document).ready(
		function() {
			$('#refreshButton1').bind(
					"click",
					function(event, ui) {
						getFirstRunResult(Global.selectedResultUrl,
								Global.selectedResultHeader, function() {
									$('#reloadMessage1').slideDown();
									setTimeout(function(){$('#reloadMessage1').slideUp()},3000);
								});
					});
		});
$(document).ready(
		function() {
			$('#refreshButton2').bind(
					"click",
					function(event, ui) {
						getTotalResult(Global.selectedResultUrl,
								Global.selectedResultHeader, function() {
									$('#reloadMessage2').slideDown();
									setTimeout(function(){$('#reloadMessage2').slideUp()},3000);
								});
					});
		});

$('#mainPage').live('pageinit', function() {
	$("#d-teams").bind("click", function() {
		getTeams(this.id, this.innerText);
	});
	$("#h-teams").bind("click", function() {
		getTeams(this.id, this.innerText);
	});
	$("#d-startlist").bind("click", function() {
		getStartList(this.id, this.innerText);
	});
	$("#h-startlist").bind("click", function() {
		getStartList(this.id, this.innerText);
	});
	$("#d-result-first").bind("click", function() {
		getFirstRunResult(this.id, this.innerText);
	});
	$("#d-result-total").bind("click", function() {
		getTotalResult(this.id, this.innerText);
	});
	$("#h-result-first").bind("click", function() {
		getFirstRunResult(this.id, this.innerText);
	});
	$("#h-result-total").bind("click", function() {
		getTotalResult(this.id, this.innerText);
	});
});


function trim(string) {
	return string.replace(/\s/g, "").replace(/\u00a0/g, "");
}

$('#teamPage').live('pageinit', function() {
	if (Global.selectedResultUrl == null) {
		$.mobile.changePage($('#mainPage'));
	}
});

$('#startListPage').live('pageinit', function() {
	if (Global.selectedResultUrl == null) {
		$.mobile.changePage($('#mainPage'));
	}
});

$('#firstRunResultPage').live('pageinit', function() {
	if (Global.selectedResultUrl == null) {
		$.mobile.changePage($('#mainPage'));
	}
});

$('#totalResultPage').live('pageinit', function() {
	if (Global.selectedResultUrl == null) {
		$.mobile.changePage($('#mainPage'));
	}
});

function getTeams(url, header, successCallback) {
	getDataAndApplyTemplate(url, header, successCallback, '#teamHeader', "Lagindelning ", '#teamUl', '#teams-template', '#teamPage')
}

function getStartList(url, header, successCallback) {
	getDataAndApplyTemplate(url, header, successCallback, '#startListHeader', "Startlista ", '#startListUl', '#startlist-template', '#startListPage')
}

function getFirstRunResult(url, header, successCallback) {
	getDataAndApplyTemplate(url, header, successCallback, '#firstRunResultHeader', "Resultat ", '#firstRunResultUl', '#first-run-result-template', '#firstRunResultPage')
}

function getTotalResult(url, header, successCallback) {
	getDataAndApplyTemplate(url, header, successCallback, '#totalResultHeader', "Resultat ", '#totalResultUl', '#total-result-template', '#totalResultPage')
}

function getDataAndApplyTemplate(url, header, successCallback, headerId, headerPrefix, listUl, templateId, pageId) {
	Global.selectedResultUrl = url;
	Global.selectedResultHeader = header;
	
	url = "json/" + url + ".json"

	$.mobile.showPageLoadingMsg();
	$('input[data-type="search"]').val("");
	$.ajax({
		dataType: "json",
		url : url,
		cache : false,
		success : function(data) {
			$(headerId).text(headerPrefix + header);

			getDataForTemplate({
				json : data,
				ul : listUl,
				template : Global.getTemplate(templateId)
			});

			$.mobile.changePage($(pageId), {
				transition: "slidefade"
			});
			if (successCallback) {
				successCallback();
			}
		},
		error : function() {
			alert("Sidan kunde inte laddas.");
		},
		complete : function() {
			$.mobile.hidePageLoadingMsg();
		}
	});
}

function getDataForTemplate(config) {
	var data = config.json;
	//alert(JSON.stringify(data))

	if (config.dataProcessFnc != undefined) {
		config.dataProcessFnc(data);
	}

	var ulul = $(config.ul);

	if (config.emptyContainer !== false) {
		ulul.empty();
	}

	ulul.append(config.template(data));

	try {
		ulul.listview("refresh");
	} catch (e) {
	}

	if (config.postFnc != undefined) {
		config.postFnc(config, data);
	}
}
