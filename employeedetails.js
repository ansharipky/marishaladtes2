$('#detailsPage').live('pageshow', function(event) {
	var id = getUrlVars()["id"];
	$.getJSON(serviceURL + 'getemployee.php?id='+id, displayEmployee);
});

function displayEmployee(data) {
	var employee = data.item;
	console.log(employee);
	$('#gerakan').text(employee.Gerakan);
	$('#bacaan_arab').text(employee.Bacaan_Arab);
	$('#bacaan_latin').text(employee.Bacaan_Latin);
	$('#arti').text(employee.Arti);
	$('#lgambar').append('<div align="center">' + '<img src="'+ employee.Gambar +'" width="206" height="187" />' + '</div>');
	$('#ket').text(employee.Ket);
}

 
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
