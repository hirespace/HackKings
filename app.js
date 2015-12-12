(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.atomic = factory(root);
  }
})(this, function (root) {

  'use strict';

  var exports = {};

  var parse = function (req) {
    var result;
    try {
      result = JSON.parse(req.responseText);
    } catch (e) {
      result = req.responseText;
    }
    return [result, req];
  };

  var xhr = function (type, url, data) {
    var methods = {
      success: function () {},
      error: function () {}
    };
    var XHR = root.XMLHttpRequest || ActiveXObject;
    var request = new XHR('MSXML2.XMLHTTP.3.0');
    request.open(type, url, true);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.setRequestHeader('Authorization', 'Basic aGFja2tpbmdzOlRuMllXaWRTejNLTWlTTjJN');
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          methods.success.apply(methods, parse(request));
        } else {
          methods.error.apply(methods, parse(request));
        }
      }
    };
    request.send(data);
    return {
      success: function (callback) {
        methods.success = callback;
        return methods;
      },
      error: function (callback) {
        methods.error = callback;
        return methods;
      }
    };
  };

  exports['get'] = function (src) {
    return xhr('GET', src);
  };

  exports['put'] = function (url, data) {
    return xhr('PUT', url, data);
  };

  exports['post'] = function (url, data) {
    return xhr('POST', url, data);
  };

  exports['delete'] = function (url) {
    return xhr('DELETE', url);
  };

  return exports;

});

(function() {
	var search = function(data, callback) {
		atomic.post('https://hackkings.hirespace.com/Api/Search', JSON.stringify(data)).success(callback);
	};

	var getUsage = function(usageId, callback) {
		atomic.get('https://hackkings.hirespace.com/Api/Usages/' + usageId).success(callback);
	};

	var getSpace = function(spaceId, callback) {
		atomic.get('https://hackkings.hirespace.com/Api/Spaces/' + spaceId).success(callback);
	};

	var getVenue = function(venueId, callback) {
		atomic.get('https://hackkings.hirespace.com/Api/Venues/' + venueId).success(callback);
	};

	var getAllUsages = function(callback) {
		atomic.get('https://hackkings.hirespace.com/Api/Usages').success(callback);
	};

	var getAllSpaces = function(callback) {
		atomic.get('https://hackkings.hirespace.com/Api/Spaces').success(callback);
	};

	var getAllVenues = function(callback) {
		atomic.get('https://hackkings.hirespace.com/Api/Venues').success(callback);
	};	

	var hireSpace = {
		Search: search,
		GetUsage: getUsage,
		GetSpace: getSpace,
		GetVenue: getVenue,
		GetAllUsages: getAllUsages,
		GetAllSpaces: getAllSpaces,
		GetAllVenues: getAllVenues
	};

	window.HireSpace = hireSpace;
})();