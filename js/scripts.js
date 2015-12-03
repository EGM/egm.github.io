$(document).ready(
	function() {
		$("#showMe01").click(
			function () {
				qlog([{name:"John"},{name:"Sue"}], "some people");
			});
	});
