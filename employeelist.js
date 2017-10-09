var serviceURL = "http://localhost/sinpari/";
var employees;

$('#employeeListPage').live('pageshow', function(event) {
	getEmployeeList();
});

function getEmployeeList() {
	$.getJSON(serviceURL + 'getemployees.php', function(data) {
		$('#employeeList li').remove();
		employees = data.items;
		$.each(employees, function(index, employee) {
			$('#employeeList').append('<li><a href="listdetail.html?id=' + employee.id + '" data-transition="flip">' +
					'<img src="' + employee.Gambar + '"/>' +
					'<h4>' + employee.Gerakan + '</h4>' +
					'<p>' + employee.Ket + '</p>' +
					'</a></li>');
		});
		$('#employeeList').listview('refresh');
	});
}