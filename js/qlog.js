/**
 * qlog.js
 * version : 0.1
 * author  : John LaDuke
 * license : MIT
 */

/**
 * jQuery 'exists' function.
 */
jQuery.fn.exists = function() {
	return this.length > 0;
};

/**
 * underscore additional functions.
 */
_.mixin({ 
			//Capitalize each word in string using AP title rules
			capitalize: function(string) { 
				return string.replace(/\b(?!(?:a|an|and|at|but|by|for|in|nor|of|on|or|so|the|to|up|yet)\b)\w+/g, 
					function(string) {return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();})
					.replace(/^[a-z]+/g, function(string) {return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();});
			},
			isError: function(object) {
				return object instanceof Error;
			}
		}); 

/**
 * Quick logging to screen.
 * @param {String} input the message to write.
 * @param {String} title the optional heading.
 * @param {Object} options the optional options,
 * 	see “Default options” below.
 */
function qlog(input, title, options) {

	// default options
	var option = {
		isFormatted: true, 	//TRUE to "unwrap" objects etc
		isSorted: false, 	//TRUE to sort arrays using array[0] to select sorting type
		sortBy: null 		//Non null to sort objects - still in beta
	};
	_.extend(option, options);

	// init if first time use.
	if (!$('#qlog').exists()) {
		var fullSize = $(window).width() * 0.8;
		var compactSize = fullSize * 0.4;
		var compactLog = false;

		$("<style>")
			.prop("type", "text/css")
			//Span styles:
			.html("\
			#qlogContainer {\
  				font-family: 'Lucida Console', 'Courier', 'Courier New', 'monospace' !important;\
  				font-weight: normal !important;\
  				font-style: normal !important;\
  				font-size: 1em !important;\
  				background-color: #efefef !important;\
  				border: 1px solid silver !important;\
  				padding: 5px !important;\
  				position: absolute !important;\
  				top: 0px !important;\
  				right: 0px !important;\
  				width: 80%;\
  				height: auto !important;\
  				@media screen and (max-width: 480px){font-size: 0.5em !important;} !important;\
  				@media screen and (max-width: 960px){font-size: 1.0em !important;} !important;\
			}\
			#qlogContainer .button {\
  				background-color: #ededef !important;\
  				border: thin #ddd solid !important;\
  				border-radius: 5px !important;\
			}\
			#qlog {\
  				background: #dedede !important;\
  				border: 1px solid Silver !important;\
  				borderRadius: 5px !important;\
  				padding: 5px !important;\
			}\
			#qlog .title {\
  				font-weight: bold !important;\
  				font-size: 1.1em !important;\
  				font-family: 'san serif' !important;\
			}\
		}")
			.appendTo("head");

		$("<div>")
			.prop("id", "qlogContainer")
			.click(function() { 
					   $("#qlog").slideToggle("slow"); 
					   $("#qlogHdr").html("<span class=\"button\">" + (compactLog ?"[&minus;]": "[&plus;]") + "</span> qlog:");
					   $(this).animate({width:(compactLog ?fullSize: compactSize)}, "slow");
					   compactLog = !compactLog;
				   })
			.appendTo("body");

		$("<h2>")
			.prop("id", "qlogHdr")
			.html("<span class=\"button\">[&minus;]</span> qlog:")
			.appendTo("#qlogContainer");

		$("<div>")
			.prop("id", "qlog")
			.appendTo("#qlogContainer");
	}

	function indent(indentLevel) {
		var indentBuffer = "";
		_.times(indentLevel, function(n) {indentBuffer += "\t";});
		return indentBuffer;
	} //end indent()

	function format(input, indentWidth) {
		if (_.isUndefined(indentWidth)) {
			indentWidth = 0;
		}

		var inputBuffer = "";
		var keys = [];

		if (_.isError(input)) {
			//Work-around for Firefox which doesn't
			//  include name and message in stack.
			if (input.stack.charAt(0) === '@') {
				title = "<span class=\"error\">" + input.name + ': ' + input.message + "</span>";
			}
			return input.stack;
		}

		if (_.isNull(input)) {
			return "null";
		}

		if (_.isUndefined(input)) {
			return "undefined";
		}

		if (_.isString(input)) {
			return "\"" + input + "\"";
		}

		if (_.isNumber(input)) {
			return input;
		}

		if (_.isBoolean(input)) {
			return input;
		}

		if (_.isFunction(input)) {
			return input;
		}

		if (_.isObject(input) && !_.isNull(option.sortBy)) {
			input = _.sortBy(input, option.sortBy);
		}

		function addArrayElement(el) {
			inputBuffer += indent(indentWidth) 
				+ format(el, indentWidth);
		}

		function addArrayElementInitial(el) {
			addArrayElement(el);
			inputBuffer += ",\n";
		}

		if (_.isArray(input)) {
			if (_.isEmpty(input)) {
				return "[]";
			}
			if (option.isSorted) {
				if (_.isNumber(input[0])) {
					input.sort(function(a, b) {return a - b;});
				}
				else {
					input.sort();
				}
			}
			indentWidth++;
			inputBuffer += "[\n";
			_.each(_.initial(input), addArrayElementInitial);
			addArrayElement(_(input).last());
			inputBuffer += "\n" + indent(--indentWidth) + "]";
			return inputBuffer;
		}

		function addObjectElement(el) {
			inputBuffer += indent(indentWidth) 
				+ "\"" + el + "\":" + format(input[el], indentWidth);
		}

		function addObjectElementInitial(el) {
			addObjectElement(el);
			inputBuffer += ",\n";
		}

		if (_.isObject(input)) {
			if (_.isEmpty(input)) {
				return "{}";
			}
			keys = _(input).keys();
			indentWidth++;
			inputBuffer += "{\n";;
			_.each(_.initial(keys), addObjectElementInitial);
			addObjectElement(_.last(keys));
			inputBuffer += "\n" + indent(--indentWidth) + "}";
			return inputBuffer;
		}
	} //end format()

	/* for unit testing */
	//Based on idea borrowed from 
	//  http://philipwalton.com/articles/how-to-unit-test-private-functions-in-javascript/
	//  cicumvents logging
	if (option.test) {
		var api = {__test__:{}};
		api.__test__.indent = indent;
		api.__test__.format = format;
		return api;
	}
	/* end for unit testing */

	// Write log.
	if (typeof moment === "undefined") {
		var time = Date().toLocaleString();
	}
	else {
		var time = moment().format("hh:mm:ss.SSS");
	}
	var caller = arguments.callee.caller;
	caller = (!caller) ? "" : caller.name + "(): ";
	if (_.isNull(title) || _.isUndefined(title)) {
		title = "";
	} 
	else {
		title = _.capitalize(title);
	}

	if (option.isFormatted) {
		var message = "<pre class=\"brush: js;\">" + format(input) + "</pre>";
	}
	else if (_.isBoolean(input)) {
		var message = "<pre class =\"line " + !!input + "\">" + input + "<\pre>";
	}
	else if (_.isError(input)) {
		var message = "<pre class =\"line error\">" + input.stack + "<\pre>";
	}
	else if (_.isNull(input) || _.isUndefined(input)) {
		var message = "<pre class =\"line null\">" + input;
	}
	else {
		var message = "<pre class=\"line " + (typeof input) + "\">" + (input).toString() + "<\pre>";
	}

	$("<p>")
		.html("[" + time + "] " + caller + "<span class=\"title\">" + title + "</span>\n" + message)
		.appendTo("#qlog");

	return title + "\n" + message;
} //end qlog()
