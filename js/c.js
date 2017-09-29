var activityIndicatorOff, activityIndicatorOn, allError, animateHoverShadows, animateLoad, bindClicks, bindCollapsors, bindCopyEvents, bindDismissalRemoval, bsAlert, buildArgs, buildQuery, byteCount, cancelAsyncOperation, checkFileVersion, cleanupToasts, copyText, d$, dateMonthToString, deEscape, decode64, deepJQuery, delay, delayPolymerBind, doCORSget, e, encode64, error1, fixTruncatedJson, foo, formatScientificNames, getElementHtml, getLocation, getMaxZ, getPosterFromSrc, goTo, interval, isArray, isBlank, isBool, isEmpty, isHovered, isJson, isNull, isNumber, jsonTo64, lightboxImages, loadJS, mapNewWindows, openLink, openTab, overlayOff, overlayOn, p$, post64, prepURI, randomInt, randomString, roundNumber, roundNumberSigfig, safariDialogHelper, startLoad, stopLoad, stopLoadError, toFloat, toInt, toObject, toastStatusMessage, uri,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

try {
  uri = new Object();
  uri.o = $.url();
  uri.urlString = uri.o.attr('protocol') + '://' + uri.o.attr('host') + uri.o.attr("directory");
  uri.query = uri.o.attr("fragment");
} catch (error1) {
  e = error1;
  console.warn("PURL not installed!");
}

window.debounce_timer = null;

if (window.adminParams == null) {
  window.adminParams = new Object();
}

if (window._kmphys == null) {
  window._kmphys = new Object();
}

isBool = function(str, strict) {
  var error2;
  if (strict == null) {
    strict = false;
  }
  if (strict) {
    return typeof str === "boolean";
  }
  try {
    if (typeof str === "boolean") {
      return str === true || str === false;
    }
    if (typeof str === "string") {
      return str.toLowerCase() === "true" || str.toLowerCase() === "false";
    }
    if (typeof str === "number") {
      return str === 1 || str === 0;
    }
    return false;
  } catch (error2) {
    e = error2;
    return false;
  }
};

isEmpty = function(str) {
  return !str || str.length === 0;
};

isBlank = function(str) {
  return !str || /^\s*$/.test(str);
};

isNull = function(str, dirty) {
  var error2, l;
  if (dirty == null) {
    dirty = false;
  }
  if (typeof str === "object") {
    try {
      l = str.length;
      if (l != null) {
        try {
          return l === 0;
        } catch (undefined) {}
      }
      return Object.size === 0;
    } catch (undefined) {}
  }
  try {
    if (isEmpty(str) || isBlank(str) || (str == null)) {
      if (!(str === false || str === 0)) {
        return true;
      }
      if (dirty) {
        if (str === false || str === 0) {
          return true;
        }
      }
    }
  } catch (error2) {
    e = error2;
    return false;
  }
  try {
    str = str.toString().toLowerCase();
  } catch (undefined) {}
  if (str === "undefined" || str === "null") {
    return true;
  }
  if (dirty && (str === "false" || str === "0")) {
    return true;
  }
  return false;
};

isJson = function(str) {
  var error2;
  if (typeof str === 'object' && !isArray(str)) {
    return true;
  }
  try {
    JSON.parse(str);
    return true;
  } catch (error2) {
    return false;
  }
  return false;
};

isArray = function(arr) {
  var error2, shadow;
  try {
    shadow = arr.slice(0);
    shadow.push("foo");
    return true;
  } catch (error2) {
    return false;
  }
};

isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

toFloat = function(str) {
  if (!isNumber(str) || isNull(str)) {
    return 0;
  }
  return parseFloat(str);
};

toInt = function(str) {
  var f;
  if (typeof str === "string") {
    str = str.replace("px", "").replace("em", "").replace("rem", "").replace("vw", "").replace("vh", "");
  }
  if (!isNumber(str) || isNull(str)) {
    return 0;
  }
  f = parseFloat(str);
  return parseInt(f);
};

String.prototype.toAscii = function() {

  /*
   * Remove MS Word bullshit
   */
  return this.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'").replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/[\u2026]/g, '...').replace(/\u02C6/g, "^").replace(/\u2039/g, "").replace(/[\u02DC|\u00A0]/g, " ");
};

String.prototype.toBool = function() {
  var test;
  test = this.toString().toLowerCase();
  return test === 'true' || test === "1";
};

Boolean.prototype.toBool = function() {
  return this.toString() === "true";
};

Number.prototype.toBool = function() {
  return this.toString() === "1";
};

String.prototype.addSlashes = function() {
  return this.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
};

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

Array.prototype.containsObject = function(obj) {
  var error2, res;
  try {
    res = _.find(this, function(val) {
      return _.isEqual(obj, val);
    });
    return typeof res === "object";
  } catch (error2) {
    e = error2;
    console.error("Please load underscore.js before using this.");
    return console.info("https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js");
  }
};

Object.toArray = function(obj) {
  var shadowObj;
  try {
    shadowObj = obj.slice(0);
    shadowObj.push("foo");
    return obj;
  } catch (undefined) {}
  return Object.keys(obj).map((function(_this) {
    return function(key) {
      return obj[key];
    };
  })(this));
};

Object.size = function(obj) {
  var error2, key, size;
  if (typeof obj !== "object") {
    try {
      return obj.length;
    } catch (error2) {
      e = error2;
      console.error("Passed argument isn't an object and doesn't have a .length parameter");
      console.warn(e.message);
    }
  }
  size = 0;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      size++;
    }
  }
  return size;
};

Object.doOnSortedKeys = function(obj, fn) {
  var data, j, key, len, results, sortedKeys;
  sortedKeys = Object.keys(obj).sort();
  results = [];
  for (j = 0, len = sortedKeys.length; j < len; j++) {
    key = sortedKeys[j];
    data = obj[key];
    results.push(fn(data));
  }
  return results;
};

delay = function(ms, f) {
  return setTimeout(f, ms);
};

interval = function(ms, f) {
  return setInterval(f, ms);
};

roundNumber = function(number, digits) {
  var multiple;
  if (digits == null) {
    digits = 0;
  }
  multiple = Math.pow(10, digits);
  return Math.round(number * multiple) / multiple;
};

roundNumberSigfig = function(number, digits) {
  var digArr, needDigits, newNumber, significand, trailingDigits;
  if (digits == null) {
    digits = 0;
  }
  newNumber = roundNumber(number, digits).toString();
  digArr = newNumber.split(".");
  if (digArr.length === 1) {
    return newNumber + "." + (Array(digits + 1).join("0"));
  }
  trailingDigits = digArr.pop();
  significand = digArr[0] + ".";
  if (trailingDigits.length === digits) {
    return newNumber;
  }
  needDigits = digits - trailingDigits.length;
  trailingDigits += Array(needDigits + 1).join("0");
  return "" + significand + trailingDigits;
};

String.prototype.stripHtml = function(stripChildren) {
  var str;
  if (stripChildren == null) {
    stripChildren = false;
  }
  str = this;
  if (stripChildren) {
    str = str.replace(/<(\w+)(?:[^"'>]|"[^"]*"|'[^']*')*>(?:((?:.)*?))<\/?\1(?:[^"'>]|"[^"]*"|'[^']*')*>/mg, "");
  }
  str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
  str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
  return str;
};

String.prototype.unescape = function(strict) {
  var decodeHTMLEntities, element, tmp;
  if (strict == null) {
    strict = false;
  }

  /*
   * Take escaped text, and return the unescaped version
   *
   * @param string str | String to be used
   * @param bool strict | Stict mode will remove all HTML
   *
   * Test it here:
   * https://jsfiddle.net/tigerhawkvok/t9pn1dn5/
   *
   * Code: https://gist.github.com/tigerhawkvok/285b8631ed6ebef4446d
   */
  element = document.createElement("div");
  decodeHTMLEntities = function(str) {
    if ((str != null) && typeof str === "string") {
      if (strict !== true) {
        str = escape(str).replace(/%26/g, '&').replace(/%23/g, '#').replace(/%3B/g, ';');
      } else {
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      }
      element.innerHTML = str;
      if (element.innerText) {
        str = element.innerText;
        element.innerText = "";
      } else {
        str = element.textContent;
        element.textContent = "";
      }
    }
    return unescape(str);
  };
  tmp = deEscape(this);
  return decodeHTMLEntities(tmp);
};

deEscape = function(string) {
  string = string.replace(/\&amp;#/mg, '&#');
  string = string.replace(/\&quot;/mg, '"');
  string = string.replace(/\&quote;/mg, '"');
  string = string.replace(/\&#95;/mg, '_');
  string = string.replace(/\&#39;/mg, "'");
  string = string.replace(/\&#34;/mg, '"');
  string = string.replace(/\&#62;/mg, '>');
  string = string.replace(/\&#60;/mg, '<');
  return string;
};

String.prototype.escapeQuotes = function() {
  var str;
  str = this.replace(/"/mg, "&#34;");
  str = str.replace(/'/mg, "&#39;");
  return str;
};

getElementHtml = function(el) {
  return el.outerHTML;
};

jQuery.fn.outerHTML = function() {
  e = $(this).get(0);
  return e.outerHTML;
};

jQuery.fn.outerHtml = function() {
  return $(this).outerHTML();
};

buildQuery = function(obj) {
  var k, key, queryList, v, value;
  queryList = new Array();
  for (k in obj) {
    v = obj[k];
    key = k.replace(/[^A-Za-z\-_\[\]]/img, "");
    value = encodeURIComponent(v).replace(/\%20/g, "+");
    queryList.push(key + "=" + value);
  }
  return queryList.join("&");
};

buildArgs = buildQuery;


jQuery.fn.selectText = function(){
    var doc = document
        , element = this[0]
        , range, selection
    ;
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};
;

copyText = function(text, zcObj, zcElement) {

  /*
   *
   */
  var clip, clipboardData, identifier, ref;
  if (window.copyDebouncer == null) {
    window.copyDebouncer = new Object();
  }
  if (Date.now() - window.copyDebouncer.last < 300) {
    console.warn("Skipping copy on debounce");
    return false;
  }
  window.copyDebouncer.last = Date.now();
  identifier = md5($(zcElement).html());
  try {
    clipboardData = {
      dataType: "text/plain",
      data: text
    };
    clip = new ClipboardEvent("copy", clipboardData);
    document.dispatchEvent(clip);
    return false;
  } catch (undefined) {}
  if (((ref = _kmphys.copyObject) != null ? ref[identifier] : void 0) != null) {
    clipboardData = {
      "text/plain": text
    };
    console.info("Setting up clipboard events for \"" + text + "\"");
    _kmphys.copyObject[identifier].setData(clipboardData);
    _kmphys.copyObject[identifier].on("copy", function(e) {
      try {
        return e.clipboardData = {
          setData: _kmphys.copyObject[identifier].setData(clipboardData)
        };
      } catch (undefined) {}
    });
    _kmphys.copyObject[identifier].on("aftercopy", function(e) {
      if (e.data["text/plain"] === text) {
        toastStatusMessage("Copied to clipboard");
        console.info("Succesfully copied", e.data["text/plain"]);
        window.hasRetriedCopy = false;
      } else {
        if (e.data["text/plain"]) {
          console.warn("Incorrect copy: instead of '" + text + "', '" + e.data["text/plain"] + "'");
          if (!window.hasRetriedCopy) {
            window.hasRetriedCopy = true;
            delete window.copyDebouncer.last;
            delay(100, function() {
              console.warn("Re-trying copy");
              $(zcElement).click();
              return console.info("Sent click");
            });
          } else {
            console.error("Re-copy failed!");
            toastStatusMessage("Error copying to clipboard. Please try again");
          }
        } else {
          console.error("Bad data passed", e.data["text/plain"]);
          toastStatusMessage("Error copying to clipboard. Please try again");
          window.hasRetriedCopy = false;
        }
      }
      window.resetClipboard = false;
      return _kmphys.copyObject[identifier].setData(clipboardData);
    });
    _kmphys.copyObject[identifier].on("error", function(e) {
      console.error("Error copying to clipboard");
      console.warn("Got", e);
      if (e.name === "flash-overdue") {
        if (window.resetClipboard === true) {
          console.error("Resetting ZeroClipboard didn't work!");
          return false;
        }
        ZeroClipboard.on("ready", function() {
          window.resetClipboard = true;
          return copyLink(window.tempZC, text);
        });
        window.tempZC = new ZeroClipboard(zcElement);
      }
      if (e.name === "flash-disabled") {
        console.info("No flash on this system");
        ZeroClipboard.destroy();
        $(".click-copy").remove();
        p$("paper-dialog").refit();
        return toastStatusMessage("Clipboard copying isn't available on your system");
      }
    });
  } else {
    console.error("Can't copy: zcObject doesn't exist for identifier " + identifier);
  }
  return false;
};

bindCopyEvents = function(selector) {
  if (selector == null) {
    selector = ".click-copy";
  }
  loadJS("bower_components/zeroclipboard/dist/ZeroClipboard.min.js", function() {
    var copySelector, el, identifier, j, len, ref, results, text, zcConfig;
    zcConfig = {
      swfPath: "bower_components/zeroclipboard/dist/ZeroClipboard.swf"
    };
    ZeroClipboard.config(zcConfig);
    ref = $(selector);
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      el = ref[j];
      identifier = md5($(el).html());
      if (_kmphys.copyObject == null) {
        _kmphys.copyObject = new Object();
      }
      if (_kmphys.copyObject[identifier] == null) {
        console.info("Setting up copy events for identifier", identifier);
        _kmphys.copyObject[identifier] = new ZeroClipboard(el);
        text = $(el).attr("data-clipboard-text");
        if (isNull(text)) {
          copySelector = $(el).attr("data-copy-selector");
          text = $(copySelector).val();
          if (isNull(text)) {
            try {
              text = p$(copySelector).value;
            } catch (undefined) {}
          }
        }
        console.info("Registering copy text", text);
        try {
          delete window.copyDebouncer.last;
        } catch (undefined) {}
        results.push(copyText(text, _kmphys.copyObject[identifier], el));
      } else {
        results.push(console.info("Copy event already set up for identifier", identifier));
      }
    }
    return results;
  });
  return false;
};

buildQuery = function(obj) {
  var k, key, queryList, v, value;
  queryList = new Array();
  for (k in obj) {
    v = obj[k];
    key = k.replace(/[^A-Za-z\-_\[\]]/img, "");
    value = encodeURIComponent(v).replace(/\%20/g, "+");
    queryList.push(key + "=" + value);
  }
  return queryList.join("&");
};

jsonTo64 = function(obj, encode) {
  var encoded, objString, shadowObj;
  if (encode == null) {
    encode = true;
  }

  /*
   *
   * @param obj
   * @param boolean encode -> URI encode base64 string
   */
  try {
    shadowObj = obj.slice(0);
    shadowObj.push("foo");
    obj = toObject(obj);
  } catch (undefined) {}
  objString = JSON.stringify(obj);
  if (encode === true) {
    encoded = post64(objString);
  } else {
    encoded = encode64(encoded);
  }
  return encoded;
};

encode64 = function(string) {
  var error2;
  try {
    return Base64.encode(string);
  } catch (error2) {
    e = error2;
    console.warn("Bad encode string provided");
    return string;
  }
};

decode64 = function(string) {
  var error2;
  try {
    return Base64.decode(string);
  } catch (error2) {
    e = error2;
    console.warn("Bad decode string provided");
    return string;
  }
};

post64 = function(string) {
  var p64, s64;
  s64 = encode64(string);
  p64 = encodeURIComponent(s64);
  return p64;
};

jQuery.fn.polymerSelected = function(setSelected, attrLookup) {
  var attr, error2, error3, itemSelector, val;
  if (setSelected == null) {
    setSelected = void 0;
  }
  if (attrLookup == null) {
    attrLookup = "attrForSelected";
  }

  /*
   * See
   * https://elements.polymer-project.org/elements/paper-menu
   * https://elements.polymer-project.org/elements/paper-radio-group
   *
   * @param attrLookup is based on
   * https://elements.polymer-project.org/elements/iron-selector?active=Polymer.IronSelectableBehavior
   */
  attr = $(this).attr(attrLookup);
  if (setSelected != null) {
    if (!isBool(setSelected)) {
      try {
        return $(this).get(0).select(setSelected);
      } catch (error2) {
        e = error2;
        return false;
      }
    } else {
      $(this).parent().children().removeAttribute("aria-selected");
      $(this).parent().children().removeAttribute("active");
      $(this).parent().children().removeClass("iron-selected");
      $(this).prop("selected", setSelected);
      $(this).prop("active", setSelected);
      $(this).prop("aria-selected", setSelected);
      if (setSelected === true) {
        return $(this).addClass("iron-selected");
      }
    }
  } else {
    val = void 0;
    try {
      val = $(this).get(0).selected;
      if (isNumber(val) && !isNull(attr)) {
        itemSelector = $(this).find("paper-item")[toInt(val)];
        val = $(itemSelector).attr(attr);
      }
    } catch (error3) {
      e = error3;
      return false;
    }
    if (val === "null" || (val == null)) {
      val = void 0;
    }
    return val;
  }
};

jQuery.fn.polymerChecked = function(setChecked) {
  var val;
  if (setChecked == null) {
    setChecked = void 0;
  }
  if (setChecked != null) {
    return jQuery(this).prop("checked", setChecked);
  } else {
    val = jQuery(this)[0].checked;
    if (val === "null" || (val == null)) {
      val = void 0;
    }
    return val;
  }
};

isHovered = function(selector) {
  return $(selector + ":hover").length > 0;
};

jQuery.fn.exists = function() {
  return jQuery(this).length > 0;
};

jQuery.fn.isVisible = function() {
  return jQuery(this).is(":visible") && jQuery(this).css("visibility") !== "hidden";
};

jQuery.fn.hasChildren = function() {
  return Object.size(jQuery(this).children()) > 3;
};

byteCount = (function(_this) {
  return function(s) {
    return encodeURI(s).split(/%..|./).length - 1;
  };
})(this);

function shuffle(o) { //v1.0
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

toObject = function(array) {
  var element, index, rv;
  rv = new Object();
  for (index in array) {
    element = array[index];
    if (element !== void 0) {
      rv[index] = element;
    }
  }
  return rv;
};

loadJS = function(src, callback, doCallbackOnError) {
  var error2, errorFunction, onLoadFunction, s;
  if (callback == null) {
    callback = new Object();
  }
  if (doCallbackOnError == null) {
    doCallbackOnError = true;
  }

  /*
   * Load a new javascript file
   *
   * If it's already been loaded, jump straight to the callback
   *
   * @param string src The source URL of the file
   * @param function callback Function to execute after the script has
   *                          been loaded
   * @param bool doCallbackOnError Should the callback be executed if
   *                               loading the script produces an error?
   */
  if ($("script[src='" + src + "']").exists()) {
    if (typeof callback === "function") {
      try {
        callback();
      } catch (error2) {
        e = error2;
        console.error("Script is already loaded, but there was an error executing the callback function - " + e.message);
      }
    }
    return true;
  }
  s = document.createElement("script");
  s.setAttribute("src", src);
  s.setAttribute("async", "async");
  s.setAttribute("type", "text/javascript");
  s.src = src;
  s.async = true;
  onLoadFunction = function() {
    var error3, error4, state;
    state = s.readyState;
    try {
      if (!callback.done && (!state || /loaded|complete/.test(state))) {
        callback.done = true;
        if (typeof callback === "function") {
          try {
            return callback();
          } catch (error3) {
            e = error3;
            console.error("Postload callback error for " + src + " - " + e.message);
            return console.warn(e.stack);
          }
        }
      }
    } catch (error4) {
      e = error4;
      return console.error("Onload error - " + e.message);
    }
  };
  errorFunction = function() {
    var error3, error4;
    console.warn("There may have been a problem loading " + src);
    try {
      if (!callback.done) {
        callback.done = true;
        if (typeof callback === "function" && doCallbackOnError) {
          try {
            return callback();
          } catch (error3) {
            e = error3;
            return console.error("Post error callback error - " + e.message);
          }
        }
      }
    } catch (error4) {
      e = error4;
      return console.error("There was an error in the error handler! " + e.message);
    }
  };
  s.setAttribute("onload", onLoadFunction);
  s.setAttribute("onreadystate", onLoadFunction);
  s.setAttribute("onerror", errorFunction);
  s.onload = s.onreadystate = onLoadFunction;
  s.onerror = errorFunction;
  document.getElementsByTagName('head')[0].appendChild(s);
  return true;
};

String.prototype.toTitleCase = function() {
  var j, len, len1, lower, lowerRegEx, lowers, o, str, upper, upperRegEx, uppers;
  str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
  lowers = ["A", "An", "The", "And", "But", "Or", "For", "Nor", "As", "At", "By", "For", "From", "In", "Into", "Near", "Of", "On", "Onto", "To", "With"];
  for (j = 0, len = lowers.length; j < len; j++) {
    lower = lowers[j];
    lowerRegEx = new RegExp("\\s" + lower + "\\s", "g");
    str = str.replace(lowerRegEx, function(txt) {
      return txt.toLowerCase();
    });
  }
  uppers = ["Id", "Tv"];
  for (o = 0, len1 = uppers.length; o < len1; o++) {
    upper = uppers[o];
    upperRegEx = new RegExp("\\b" + upper + "\\b", "g");
    str = str.replace(upperRegEx, upper.toUpperCase());
  }
  return str;
};

Function.prototype.getName = function() {

  /*
   * Returns a unique identifier for a function
   */
  var name;
  name = this.name;
  if (name == null) {
    name = this.toString().substr(0, this.toString().indexOf("(")).replace("function ", "");
  }
  if (isNull(name)) {
    name = md5(this.toString());
  }
  return name;
};

Function.prototype.debounce = function() {
  var args, delayed, error2, execAsap, func, key, ref, threshold, timeout;
  threshold = arguments[0], execAsap = arguments[1], timeout = arguments[2], args = 4 <= arguments.length ? slice.call(arguments, 3) : [];
  if (threshold == null) {
    threshold = 300;
  }
  if (execAsap == null) {
    execAsap = false;
  }
  if (timeout == null) {
    timeout = window.debounce_timer;
  }

  /*
   * Borrowed from http://coffeescriptcookbook.com/chapters/functions/debounce
   * Only run the prototyped function once per interval.
   *
   * @param threshold -> Timeout in ms
   * @param execAsap -> Do it NAOW
   * @param timeout -> backup timeout object
   */
  if (((ref = window.core) != null ? ref.debouncers : void 0) == null) {
    if (window.core == null) {
      window.core = new Object();
    }
    core.debouncers = new Object();
  }
  try {
    key = this.getName();
  } catch (undefined) {}
  try {
    if (core.debouncers[key] != null) {
      timeout = core.debouncers[key];
    }
  } catch (undefined) {}
  func = this;
  delayed = function() {
    if (key != null) {
      clearTimeout(timeout);
      delete core.debouncers[key];
    }
    if (!execAsap) {
      return func.apply(func, args);
    }
  };
  if (timeout != null) {
    try {
      clearTimeout(timeout);
    } catch (error2) {
      e = error2;
    }
  }
  if (execAsap) {
    func.apply(obj, args);
    console.log("Executed " + key + " immediately");
    return false;
  }
  if (key != null) {
    return core.debouncers[key] = delay(threshold, function() {
      return delayed();
    });
  } else {
    console.log("Delaying '" + key + "' for " + threshold + " ms");
    return window.debounce_timer = delay(threshold, function() {
      return delayed();
    });
  }
};

randomInt = function(lower, upper) {
  var ref, ref1, start;
  if (lower == null) {
    lower = 0;
  }
  if (upper == null) {
    upper = 1;
  }
  start = Math.random();
  if (lower == null) {
    ref = [0, lower], lower = ref[0], upper = ref[1];
  }
  if (lower > upper) {
    ref1 = [upper, lower], lower = ref1[0], upper = ref1[1];
  }
  return Math.floor(start * (upper - lower + 1) + lower);
};

randomString = function(length) {
  var char, charBottomSearchSpace, charUpperSearchSpace, i, stringArray;
  if (length == null) {
    length = 8;
  }
  i = 0;
  charBottomSearchSpace = 65;
  charUpperSearchSpace = 126;
  stringArray = new Array();
  while (i < length) {
    ++i;
    char = randomInt(charBottomSearchSpace, charUpperSearchSpace);
    stringArray.push(String.fromCharCode(char));
  }
  return stringArray.join("");
};

animateLoad = function(elId) {
  var error2, selector;
  if (elId == null) {
    elId = "loader";
  }

  /*
   * Suggested CSS to go with this:
   *
   * #loader {
   *     position:fixed;
   *     top:50%;
   *     left:50%;
   * }
   * #loader.good::shadow .circle {
   *     border-color: rgba(46,190,17,0.9);
   * }
   * #loader.bad::shadow .circle {
   *     border-color:rgba(255,0,0,0.9);
   * }
   *
   * Uses Polymer 1.0
   */
  if (isNumber(elId)) {
    elId = "loader";
  }
  if (elId.slice(0, 1) === "#") {
    selector = elId;
    elId = elId.slice(1);
  } else {
    selector = "#" + elId;
  }
  try {
    if (!$(selector).exists()) {
      $("body").append("<paper-spinner id=\"" + elId + "\" active></paper-spinner");
    } else {
      $(selector).attr("active", true);
    }
    return false;
  } catch (error2) {
    e = error2;
    return console.log('Could not animate loader', e.message);
  }
};

startLoad = animateLoad;

stopLoad = function(elId, fadeOut) {
  var error2, selector;
  if (elId == null) {
    elId = "loader";
  }
  if (fadeOut == null) {
    fadeOut = 1000;
  }
  if (elId.slice(0, 1) === "#") {
    selector = elId;
    elId = elId.slice(1);
  } else {
    selector = "#" + elId;
  }
  try {
    if ($(selector).exists()) {
      $(selector).addClass("good");
      return delay(fadeOut, function() {
        $(selector).removeClass("good");
        return $(selector).removeAttr("active");
      });
    }
  } catch (error2) {
    e = error2;
    return console.log('Could not stop load animation', e.message);
  }
};

stopLoadError = function(message, elId, fadeOut) {
  var error2, selector;
  if (elId == null) {
    elId = "loader";
  }
  if (fadeOut == null) {
    fadeOut = 10000;
  }
  if (elId.slice(0, 1) === "#") {
    selector = elId;
    elId = elId.slice(1);
  } else {
    selector = "#" + elId;
  }
  try {
    if ($(selector).exists()) {
      $(selector).addClass("bad");
      if (message != null) {
        toastStatusMessage(message, "", fadeOut);
      }
      return delay(fadeOut, function() {
        $(selector).removeClass("bad");
        return $(selector).removeAttr("active");
      });
    }
  } catch (error2) {
    e = error2;
    return console.log('Could not stop load error animation', e.message);
  }
};

toastStatusMessage = function(message, className, duration, selector) {
  var html, ref, timeout;
  if (className == null) {
    className = "";
  }
  if (duration == null) {
    duration = 3000;
  }
  if (selector == null) {
    selector = "#status-message";
  }

  /*
   * Pop up a status message
   */
  if (((ref = window.metaTracker) != null ? ref.isToasting : void 0) == null) {
    if (window.metaTracker == null) {
      window.metaTracker = new Object();
      window.metaTracker.toastTracker = new Array();
      window.metaTracker.isToasting = false;
    }
  }
  if (window.metaTracker.isToasting) {
    timeout = delay(250, function() {
      return toastStatusMessage(message, className, duration, selector);
    });
    window.metaTracker.toastTracker.push(timeout);
    return false;
  }
  window.metaTracker.isToasting = true;
  if (!isNumber(duration)) {
    duration = 3000;
  }
  if (selector.slice(0, 1) === !"#") {
    selector = "#" + selector;
  }
  if (!$(selector).exists()) {
    html = "<paper-toast id=\"" + (selector.slice(1)) + "\" duration=\"" + duration + "\"></paper-toast>";
    $(html).appendTo("body");
  }
  $(selector).attr("text", message).html(message).addClass(className);
  try {
    p$(selector).show();
  } catch (undefined) {}
  return delay(duration + 500, function() {
    var error2, isOpen;
    try {
      isOpen = p$(selector).opened;
    } catch (error2) {
      isOpen = false;
    }
    if (!isOpen) {
      $(selector).empty();
      $(selector).removeClass(className);
      $(selector).attr("text", "");
    }
    return window.metaTracker.isToasting = false;
  });
};

cleanupToasts = function() {
  var j, len, ref, results, timeout;
  ref = window.metaTracker.toastTracker;
  results = [];
  for (j = 0, len = ref.length; j < len; j++) {
    timeout = ref[j];
    try {
      results.push(clearTimeout(timeout));
    } catch (undefined) {}
  }
  return results;
};

openLink = function(url) {
  if (url == null) {
    return false;
  }
  window.open(url);
  return false;
};

openTab = function(url) {
  return openLink(url);
};

goTo = function(url) {
  if (url == null) {
    return false;
  }
  window.location.href = url;
  return false;
};

mapNewWindows = function(stopPropagation) {
  var j, len, selector, useSelectors;
  if (stopPropagation == null) {
    stopPropagation = true;
  }
  useSelectors = [".newwindow", ".newWindow", ".new-window", "[newwindow]", "[new-window]"];
  for (j = 0, len = useSelectors.length; j < len; j++) {
    selector = useSelectors[j];
    $(selector).each(function() {
      var curHref;
      curHref = $(this).attr("href");
      if (curHref == null) {
        curHref = $(this).attr("data-href");
      }
      $(this).click(function(e) {
        if (stopPropagation) {
          e.preventDefault();
          e.stopPropagation();
        }
        return openTab(curHref);
      });
      return $(this).keypress(function() {
        return openTab(curHref);
      });
    });
  }
  return false;
};

deepJQuery = function(selector) {

  /*
   * Do a shadow-piercing selector
   *
   * Cross-browser, works with Chrome, Firefox, Opera, Safari, and IE
   * Falls back to standard jQuery selector when everything fails.
   */
  var error2, error3;
  if (typeof jQuery === "undefined" || jQuery === null) {
    console.warn("Danger -- jQuery isn't defined. Selectors may fail.");
  }
  try {
    if (!$("html /deep/ " + selector).exists()) {
      throw "Bad /deep/ selector";
    }
    return $("html /deep/ " + selector);
  } catch (error2) {
    e = error2;
    try {
      if (!$("html >>> " + selector).exists()) {
        throw "Bad >>> selector";
      }
      return $("html >>> " + selector);
    } catch (error3) {
      e = error3;
      return $(p$(selector));
    }
  }
};

d$ = function(selector) {
  return deepJQuery(selector);
};

bindClicks = function(selector) {
  if (selector == null) {
    selector = ".click";
  }

  /*
   * Helper function. Bind everything with a selector
   * to execute a function data-function or to go to a
   * URL data-href.
   */
  $(selector).each(function() {
    var callable, error2, error3, error4, newTab, ref, ref1, ref2, ref3, tagType, url;
    try {
      url = (ref = $(this).attr("data-href")) != null ? ref : $(this).attr("href");
      if (!isNull(url)) {
        try {
          tagType = $(this).prop("tagName").toLowerCase();
        } catch (error2) {
          tagType = null;
        }
        try {
          if (url === uri.o.attr("path") && tagType === "paper-tab") {
            $(this).parent().prop("selected", $(this).index());
          }
        } catch (error3) {
          e = error3;
          console.warn("tagname lower case error");
        }
        newTab = ((ref1 = $(this).attr("newTab")) != null ? ref1.toBool() : void 0) || ((ref2 = $(this).attr("newtab")) != null ? ref2.toBool() : void 0) || ((ref3 = $(this).attr("data-newtab")) != null ? ref3.toBool() : void 0);
        if (tagType === "a" && !newTab) {
          return true;
        }
        if (tagType === "a") {
          $(this).keypress(function() {
            return openTab(url);
          });
        }
        $(this).unbind().click(function(e) {
          var error4;
          e.preventDefault();
          e.stopPropagation();
          try {
            if (newTab) {
              return openTab(url);
            } else {
              return goTo(url);
            }
          } catch (error4) {
            return goTo(url);
          }
        });
        return url;
      } else {
        callable = $(this).attr("data-function");
        if (callable != null) {
          $(this).unbind();
          return $(this).click(function() {
            var args, error4, error5;
            try {
              console.log("Executing bound function " + callable + "()");
              try {
                args = null;
                if (!isNull($(this).attr("data-args"))) {
                  args = $(this).attr("data-args").split(",");
                }
              } catch (undefined) {}
              try {
                if (args != null) {
                  return window[callable].apply(window, args);
                } else {
                  return window[callable]();
                }
              } catch (error4) {
                return window[callable]();
              }
            } catch (error5) {
              e = error5;
              return console.error("'" + callable + "()' is a bad function - " + e.message);
            }
          });
        }
      }
    } catch (error4) {
      e = error4;
      return console.error("There was a problem binding to #" + ($(this).attr("id")) + " - " + e.message);
    }
  });
  try {
    bindCollapsors();
  } catch (undefined) {}
  return false;
};

bindCollapsors = function(selector) {
  var j, len, ref, toggle, toggleEvent;
  if (selector == null) {
    selector = ".collapse-trigger";
  }

  /*
   * Bind the events for collapse-triggers
   */
  toggleEvent = function(caller) {
    var ref, target, validTargetElements;
    target = $(caller).attr("data-target");
    if (!$(target).exists()) {
      console.error("Couldn't find target " + target);
      return false;
    }
    validTargetElements = ["iron-collapse"];
    if (ref = p$(target).tagName.toLowerCase(), indexOf.call(validTargetElements, ref) >= 0) {
      p$(target).toggle();
    } else {
      console.error("Target type " + (p$(target).tagName.toLowerCase()) + " is an invalid target");
    }
    return false;
  };
  ref = $(selector);
  for (j = 0, len = ref.length; j < len; j++) {
    toggle = ref[j];
    $(toggle).click(function() {
      return toggleEvent.debounce(50, null, null, this);
    });
  }
  return false;
};

dateMonthToString = function(month) {
  var conversionObj, error2, rv;
  conversionObj = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
  };
  try {
    rv = conversionObj[month];
  } catch (error2) {
    rv = month;
  }
  return rv;
};

getPosterFromSrc = function(srcString) {

  /*
   * Take the "src" attribute of a video and get the
   * "png" screencap from it, and return the value.
   */
  var dummy, error2, split;
  try {
    split = srcString.split(".");
    dummy = split.pop();
    split.push("png");
    return split.join(".");
  } catch (error2) {
    e = error2;
    return "";
  }
};

doCORSget = function(url, args, callback, callbackFail) {
  var corsFail, createCORSRequest, error2, settings, xhr;
  if (callback == null) {
    callback = void 0;
  }
  if (callbackFail == null) {
    callbackFail = void 0;
  }
  corsFail = function() {
    if (typeof callbackFail === "function") {
      return callbackFail();
    } else {
      throw new Error("There was an error performing the CORS request");
    }
  };
  settings = {
    url: url,
    data: args,
    type: "get",
    crossDomain: true
  };
  try {
    $.ajax(settings).done(function(result) {
      if (typeof callback === "function") {
        callback();
        return false;
      }
      return console.log(response);
    }).fail(function(result, status) {
      return console.warn("Couldn't perform jQuery AJAX CORS. Attempting manually.");
    });
  } catch (error2) {
    e = error2;
    console.warn("There was an error using jQuery to perform the CORS request. Attemping manually.");
  }
  url = url + "?" + args;
  createCORSRequest = function(method, url) {
    var xhr;
    if (method == null) {
      method = "get";
    }
    xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest !== "undefined") {
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      xhr = null;
    }
    return xhr;
  };
  xhr = createCORSRequest("get", url);
  if (!xhr) {
    throw new Error("CORS not supported");
  }
  xhr.onload = function() {
    var response;
    response = xhr.responseText;
    if (typeof callback === "function") {
      callback(response);
    }
    console.log(response);
    return false;
  };
  xhr.onerror = function() {
    console.warn("Couldn't do manual XMLHttp CORS request");
    return corsFail();
  };
  xhr.send();
  return false;
};

lightboxImages = function(selector, lookDeeply) {
  var jqo, options;
  if (selector == null) {
    selector = ".lightboximage";
  }
  if (lookDeeply == null) {
    lookDeeply = false;
  }

  /*
   * Lightbox images with this selector
   *
   * If the image has it, wrap it in an anchor and bind;
   * otherwise just apply to the selector.
   *
   * Requires ImageLightbox
   * https://github.com/rejas/imagelightbox
   */
  options = {
    onStart: function() {
      return overlayOn();
    },
    onEnd: function() {
      overlayOff();
      return activityIndicatorOff();
    },
    onLoadStart: function() {
      return activityIndicatorOn();
    },
    onLoadEnd: function() {
      return activityIndicatorOff();
    },
    allowedTypes: 'png|jpg|jpeg|gif|bmp|webp',
    quitOnDocClick: true,
    quitOnImgClick: true
  };
  jqo = lookDeeply ? d$(selector) : $(selector);
  return loadJS("bower_components/imagelightbox/dist/imagelightbox.min.js", function() {
    jqo.click(function(e) {
      var error2;
      try {
        e.preventDefault();
        e.stopPropagation();
        $(this).imageLightbox(options).startImageLightbox();
        return console.warn("Event propagation was stopped when clicking on this.");
      } catch (error2) {
        e = error2;
        return console.error("Unable to lightbox this image!");
      }
    }).each(function() {
      var error2, imgUrl, tagHtml;
      console.log("Using selectors '" + selector + "' / '" + this + "' for lightboximages");
      try {
        if ($(this).prop("tagName").toLowerCase() === "img" && $(this).parent().prop("tagName").toLowerCase() !== "a") {
          tagHtml = $(this).removeClass("lightboximage").prop("outerHTML");
          imgUrl = (function() {
            switch (false) {
              case !!isNull($(this).attr("data-layzr-retina")):
                return $(this).attr("data-layzr-retina");
              case !!isNull($(this).attr("data-layzr")):
                return $(this).attr("data-layzr");
              case !!isNull($(this).attr("data-lightbox-image")):
                return $(this).attr("data-lightbox-image");
              default:
                return $(this).attr("src");
            }
          }).call(this);
          $(this).replaceWith("<a href='" + imgUrl + "' class='lightboximage'>" + tagHtml + "</a>");
          return $("a[href='" + imgUrl + "']").imageLightbox(options);
        }
      } catch (error2) {
        e = error2;
        return console.log("Couldn't parse through the elements");
      }
    });
    return console.info("Lightboxed the following:", jqo);
  });
};

activityIndicatorOn = function() {
  return $('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
};

activityIndicatorOff = function() {
  $('#imagelightbox-loading').remove();
  return $("#imagelightbox-overlay").click(function() {
    return $("#imagelightbox").click();
  });
};

overlayOn = function() {
  return $('<div id="imagelightbox-overlay"></div>').appendTo('body');
};

overlayOff = function() {
  return $('#imagelightbox-overlay').remove();
};

formatScientificNames = function(selector) {
  if (selector == null) {
    selector = ".sciname";
  }
  return $(".sciname").each(function() {
    var genus, nameStyle, species;
    nameStyle = $(this).css("font-style") === "italic" ? "normal" : "italic";
    $(this).css("font-style", nameStyle);
    genus = $(this).find(".genus").text();
    species = $(this).find(".species").text();
    if (!isNull(genus) && !isNull(species)) {
      return $(this).unbind().addClass("sciname-click").click(function() {
        var target;
        target = uri.urlString + "dashboard.php?taxon=" + genus + "+" + species;
        goTo(target);
        return false;
      });
    }
  });
};

prepURI = function(string) {
  string = encodeURIComponent(string);
  return string.replace(/%20/g, "+");
};

window.locationData = new Object();

locationData.params = {
  enableHighAccuracy: true
};

locationData.last = void 0;

getLocation = function(callback) {
  var geoFail, geoSuccess, retryTimeout;
  if (callback == null) {
    callback = void 0;
  }
  retryTimeout = 1500;
  geoSuccess = function(pos) {
    var elapsed, last;
    clearTimeout(window.geoTimeout);
    window.locationData.lat = pos.coords.latitude;
    window.locationData.lng = pos.coords.longitude;
    window.locationData.acc = pos.coords.accuracy;
    last = window.locationData.last;
    window.locationData.last = Date.now();
    elapsed = window.locationData.last - last;
    if (elapsed < retryTimeout) {
      return false;
    }
    console.info("Successfully set location");
    if (typeof callback === "function") {
      callback(window.locationData);
    }
    return false;
  };
  geoFail = function(error) {
    var locationError;
    clearTimeout(window.geoTimeout);
    locationError = (function() {
      switch (error.code) {
        case 0:
          return "There was an error while retrieving your location: " + error.message;
        case 1:
          return "The user prevented this page from retrieving a location";
        case 2:
          return "The browser was unable to determine your location: " + error.message;
        case 3:
          return "The browser timed out retrieving your location.";
      }
    })();
    console.error(locationError);
    if (typeof callback === "function") {
      callback(false);
    }
    return false;
  };
  if (navigator.geolocation) {
    console.log("Querying location");
    navigator.geolocation.getCurrentPosition(geoSuccess, geoFail, window.locationData.params);
    return window.geoTimeout = delay(1500, function() {
      return getLocation(callback);
    });
  } else {
    console.warn("This browser doesn't support geolocation!");
    if (callback != null) {
      return callback(false);
    }
  }
};

getMaxZ = function() {
  var mapFunction;
  mapFunction = function() {
    return $.map($("body *"), function(e, n) {
      if ($(e).css("position") !== "static") {
        return parseInt($(e).css("z-index") || 1);
      }
    });
  };
  return Math.max.apply(null, mapFunction());
};

foo = function() {
  toastStatusMessage("Sorry, this feature is not yet finished");
  stopLoad();
  return false;
};

safariDialogHelper = function(selector, counter, callback) {
  var delayTimer, error2, newCount;
  if (selector == null) {
    selector = "#download-chooser";
  }
  if (counter == null) {
    counter = 0;
  }

  /*
   * Help Safari display paper-dialogs
   */
  if (typeof callback !== "function") {
    callback = function() {
      return bindDismissalRemoval();
    };
  }
  if (counter < 10) {
    try {
      d$(selector).get(0).open();
      delay(125, function() {
        return d$(selector).get(0).refit();
      });
      if (typeof callback === "function") {
        callback();
      }
      return stopLoad();
    } catch (error2) {
      e = error2;
      newCount = counter + 1;
      delayTimer = 250;
      return delay(delayTimer, function() {
        console.warn("Trying again to display dialog after " + (newCount * delayTimer) + "ms");
        return safariDialogHelper(selector, newCount, callback);
      });
    }
  } else {
    return stopLoadError("Unable to show dialog. Please try again.");
  }
};

bindDismissalRemoval = function() {
  return $("[dialog-dismiss]").unbind().click(function() {
    return $(this).parents("paper-dialog").remove();
  });
};

p$ = function(selector) {
  var error2;
  try {
    return $$(selector)[0];
  } catch (error2) {
    return $(selector).get(0);
  }
};

bsAlert = function(message, type, fallbackContainer, selector) {
  var html, topContainer;
  if (type == null) {
    type = "warning";
  }
  if (fallbackContainer == null) {
    fallbackContainer = "body";
  }
  if (selector == null) {
    selector = "#bs-alert";
  }

  /*
   * Pop up a status message
   * Uses the Bootstrap alert dialog
   *
   * See
   * http://getbootstrap.com/components/#alerts
   * for available types
   */
  if (!$(selector).exists()) {
    html = "<div class=\"alert alert-" + type + " alert-dismissable hanging-alert\" role=\"alert\" id=\"" + (selector.slice(1)) + "\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n    <div class=\"alert-message\"></div>\n</div>";
    topContainer = $("main").exists() ? "main" : $("article").exists() ? "article" : fallbackContainer;
    $(topContainer).prepend(html);
  } else {
    $(selector).removeClass("alert-warning alert-info alert-danger alert-success");
    $(selector).addClass("alert-" + type);
  }
  $(selector + " .alert-message").html(message);
  bindClicks();
  mapNewWindows();
  return false;
};

animateHoverShadows = function(selector, defaultElevation, raisedElevation) {
  var handlerIn, handlerOut;
  if (selector == null) {
    selector = "paper-card.card-tile";
  }
  if (defaultElevation == null) {
    defaultElevation = 2;
  }
  if (raisedElevation == null) {
    raisedElevation = 4;
  }
  handlerIn = function() {
    return $(this).attr("elevation", raisedElevation);
  };
  handlerOut = function() {
    return $(this).attr("elevation", defaultElevation);
  };
  $(selector).hover(handlerIn, handlerOut);
  return false;
};

allError = function(message) {
  stopLoadError(message);
  bsAlert(message, "danger");
  console.error(message);
  return false;
};

checkFileVersion = function(forceNow, file, callback) {
  var checkVersion, error2, error3, key, keyExists;
  if (forceNow == null) {
    forceNow = false;
  }
  if (file == null) {
    file = "js/c.min.js";
  }

  /*
   * Check to see if the file on the server is up-to-date with what the
   * user sees.
   *
   * @param bool forceNow force a check now
   */
  if ((typeof _kmphys !== "undefined" && _kmphys !== null ? _kmphys.lastModChecked : void 0) == null) {
    if (window._kmphys == null) {
      window._kmphys = new Object();
    }
    window._kmphys.lastModChecked = new Object();
  }
  key = file.split("/").pop().split(".")[0];
  checkVersion = function(filePath, modKey) {
    if (filePath == null) {
      filePath = file;
    }
    if (modKey == null) {
      modKey = key;
    }
    return $.get(uri.urlString + "meta.php", "do=get_last_mod&file=" + filePath, "json").done(function(result) {
      var html;
      window._kmphys.lastModChecked[modKey] = Date.now();
      if (forceNow) {
        doNothing();
      }
      if (!isNumber(result.last_mod)) {
        return false;
      }
      if (_kmphys.lastMod == null) {
        window._kmphys.lastMod = new Object();
      }
      if (_kmphys.lastMod[modKey] == null) {
        window._kmphys.lastMod[modKey] = result.last_mod;
      }
      if (result.last_mod > _kmphys.lastMod[modKey]) {
        html = "<div id=\"outdated-warning\" class=\"alert alert-warning alert-dismissible fade in\" role=\"alert\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n  <strong>We have page updates!</strong> This page has been updated since you last refreshed. <a class=\"alert-link\" id=\"refresh-page\" style=\"cursor:pointer\">Click here to refresh now</a> and get bugfixes and updates.\n</div>";
        if (!$("#outdated-warning").exists()) {
          $("body").append(html);
          $("#refresh-page").click(function() {
            return document.location.reload(true);
          });
        }
        return console.warn("Your current version of this page is out of date! Please refresh the page.");
      } else if (forceNow) {
        return doNothing();
      }
    }).fail(function() {
      return console.warn("Couldn't check file version!!");
    }).always(function() {
      delay(5 * 60 * 1000, function() {
        return checkVersion(filePath, modKey);
      });
      if (typeof callback === "function") {
        return callback();
      }
    });
  };
  try {
    keyExists = window._kmphys.lastMod[key];
  } catch (error2) {
    keyExists = false;
  }
  if (forceNow || (window._kmphys.lastMod == null) || !keyExists) {
    try {
      if (!((Date.now() - toInt(window._kmphys.lastModChecked[key])) < (15 * 1000))) {
        checkVersion(file, key);
      }
    } catch (error3) {
      checkVersion(file, key);
    }
    return true;
  }
  return false;
};

window.checkFileVersion = checkFileVersion;

fixTruncatedJson = function(str) {
  var chunk, error2, json, m, q, stack;
  json = str;
  chunk = json;
  q = false;
  m = false;
  stack = [];
  while (m = chunk.match(/[^\{\[\]\}"]*([\{\[\]\}"])/)) {
    switch (m[1]) {
      case "{":
        stack.push("}");
        break;
      case "[":
        stack.push("]");
        break;
      case "}":
      case "]":
        stack.pop();
        break;
      case '"':
        if (!q) {
          q = true;
          stack.push('"');
        } else {
          q = false;
          stack.pop();
        }
    }
    chunk = chunk.substring(m[0].length);
  }
  if (chunk[chunk.length - 1] === ":") {
    json += '""';
  }
  while (stack.length) {
    json += stack.pop();
  }
  try {
    return JSON.parse(json);
  } catch (error2) {
    return false;
  }
};

cancelAsyncOperation = function(caller, asyncOperation) {
  var error2, error3;
  if (asyncOperation == null) {
    asyncOperation = _kmphys.currentAsyncJqxhr;
  }

  /*
   * Abort the current operation
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort
   */
  try {
    if (caller != null) {
      $(caller).remove();
    }
  } catch (undefined) {}
  try {
    if (asyncOperation.readyState === XMLHttpRequest.DONE) {
      console.warn("Couldn't cancel operation -- it's already completed");
      return false;
    }
    asyncOperation.abort();
    try {
      stopLoadBarsError(null, "Operation Cancelled");
    } catch (error2) {
      stopLoadError("Operation Cancelled");
    }
  } catch (error3) {
    console.error("Couldn't abort current async operation");
  }
  return false;
};

delayPolymerBind = function(selector, callback, iter) {
  var element, error2, ref, superSlowBackup, uid;
  if (iter == null) {
    iter = 0;
  }
  if (typeof window._dpb !== "object") {
    window._dpb = new Object();
  }
  uid = md5(selector) + md5(callback);
  if (isNull(window._dpb[uid])) {
    window._dpb[uid] = false;
  }
  superSlowBackup = 1000;
  if ((typeof Polymer !== "undefined" && Polymer !== null ? (ref = Polymer.Base) != null ? ref.$$ : void 0 : void 0) != null) {
    if (window._dpb[uid] === false) {
      iter = 0;
      window._dpb[uid] = true;
    }
    try {
      element = Polymer.Base.$$(selector);
      callback(element);
      delay(superSlowBackup, function() {
        console.info("Doing " + superSlowBackup + "ms delay callback for " + selector);
        return callback(element);
      });
    } catch (error2) {
      e = error2;
      console.warn("Error trying to do the delayed polymer bind - " + e.message);
      if (iter < 10) {
        ++iter;
        delay(75, function() {
          return delayPolymerBind(selector, callback, iter);
        });
      } else {
        console.error("Persistent error in polymer binding (" + e.message + ")");
        console.error(e.stack);
        element = $(selector).get(0);
        callback(element);
        delay(superSlowBackup, function() {
          element = document.querySelector(selector);
          console.info("Doing " + superSlowBackup + "ms delay callback for " + selector);
          console.info("Using element", element);
          return callback(element);
        });
      }
    }
  } else {
    if (iter < 50) {
      delay(100, function() {
        ++iter;
        return delayPolymerBind(selector, callback, iter);
      });
    } else {
      console.error("Failed to verify Polymer was set up, attempting manual");
      element = document.querySelector(selector);
      callback(element);
    }
  }
  return false;
};

$(function() {
  var error2;
  bindClicks();
  formatScientificNames();
  lightboxImages();
  animateHoverShadows();
  checkFileVersion();
  try {
    $(".do-mailto").click(function() {
      var email;
      email = $(this).attr("data-email");
      document.location.href = "mailto:" + email;
      return false;
    });
  } catch (undefined) {}
  try {
    $("body").tooltip({
      selector: "[data-toggle='tooltip']"
    });
  } catch (error2) {
    e = error2;
    console.warn("Tooltips were attempted to be set up, but do not exist");
  }
  return loadJS(uri.urlString + "js/prism.js");
});


/*
 * Behaviours unique to problem generator page
 */

$(function() {
  return false;
});

//# sourceMappingURL=maps/c.js.map
