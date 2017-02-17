ElectroServer = function() {
}

ElectroServer.prototype = {
}

ElectroServer.debug = true;

ElectroServer.prototype.initialize = function() {
    this.engine = new ElectroServer.EsEngine();
    this.managerHelper = new ElectroServer.ManagerHelper();
    this.managerHelper.es = this;
    this.managerHelper.registerListeners();
}

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
 
var Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		return output;
	},
}
/*
    json.js
    2010-03-27

    Public Domain

    No warranty expressed or implied. Use at your own risk.

    This file has been superceded by http://www.JSON.org/json2.js

    See http://www.JSON.org/js.html

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.

    This file adds these methods to JavaScript:

        object.toJSONString(whitelist)
            This method produce a JSON text from a JavaScript value.
            It must not contain any cyclical references. Illegal values
            will be excluded.

            The default conversion for dates is to an ISO string. You can
            add a toJSONString method to any date object to get a different
            representation.

            The object and array methods can take an optional whitelist
            argument. A whitelist is an array of strings. If it is provided,
            keys in objects not found in the whitelist are excluded.

        string.parseJSON(filter)
            This method parses a JSON text to produce an object or
            array. It can throw a SyntaxError exception.

            The optional filter parameter is a function which can filter and
            transform the results. It receives each of the keys and values, and
            its return value is used instead of the original value. If it
            returns what it received, then structure is not modified. If it
            returns undefined then the member is deleted.

            Example:

            // Parse the text. If a key contains the string 'date' then
            // convert the value to a date.

            myData = text.parseJSON(function (key, value) {
                return key.indexOf('date') >= 0 ? new Date(value) : value;
            });

    This file will break programs with improper for..in loops. See
    http://yuiblog.com/blog/2006/09/26/for-in-intrigue/

    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the object holding the key.

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, parseJSON, prototype, push, replace, slice,
    stringify, test, toJSON, toJSONString, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

JSON = JSON || {};

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z';
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);

// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());


// Augment the basic prototypes if they have not already been augmented.
// These forms are obsolete. It is recommended that JSON.stringify and
// JSON.parse be used instead.

// -jvn we don't want these, interferes with maps

/*
if (!Object.prototype.toJSONString) {
    Object.prototype.toJSONString = function (filter) {
        return JSON.stringify(this, filter);
    };
    Object.prototype.parseJSON = function (filter) {
        return JSON.parse(this, filter);
    };
}
*/
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var Thrift = {

    Type : {
        "STOP"   : 0,
        "VOID"   : 1,
        "BOOL"   : 2,
        "BYTE"   : 3,
        "I08"    : 3,
        "DOUBLE" : 4,
        "I16"    : 6,
        "I32"    : 8,
        "I64"    : 10,
        "STRING" : 11,
        "UTF7"   : 11,
        "STRUCT" : 12,
        "MAP"    : 13,
        "SET"    : 14,
        "LIST"   : 15,
        "UTF8"   : 16,
        "UTF16"  : 17
    },

    MessageType : {
        "CALL"      : 1,
        "REPLY"     : 2,
        "EXCEPTION" : 3
    }
}

Thrift.TException = {}
Thrift.TException.prototype = { 
    initialize: function( message, code ) {
            this.message = message;
            this.code    = (code == null) ? 0 : code;
    }
}


Thrift.TApplicationExceptionType = {
    "UNKNOWN"              : 0,
    "UNKNOWN_METHOD"       : 1,
    "INVALID_MESSAGE_TYPE" : 2,
    "WRONG_METHOD_NAME"    : 3,
    "BAD_SEQUENCE_ID"      : 4,
    "MISSING_RESULT"       : 5       
}

Thrift.TApplicationException = function(message, code){
    this.message = message
    this.code    = (code == null) ? 0 : code
}

Thrift.TApplicationException.prototype = { 
       
    read : function(input){
        
        var ftype
        var fid
        var ret = input.readStructBegin(fname) 
        
        this.fname = ret.fname      
        
        while(1){
            
            ret = input.readFieldBegin()
            
            if(ret.ftype == TType.STOP)
                break
            
            var fid = ret.fid
            
            switch(fid){
                case 1: 
                    if( ret.ftype == Type.STRING ){
                        ret = input.readString()
                        this.message = ret.value
                    } else {
                        ret = input.skip(ret.ftype)
                    }
                    
                    break
                case 2:
                    if( ret.ftype == Type.I32 ){
                        ret = input.readI32()
                        this.code = ret.value
                    } else {
                        ret   = input.skip(ret.ftype)
                    }
                    break
                    
                default:
                    ret = input.skip(ret.ftype)
                    break
            }
            
            input.readFieldEnd()
            
        }
        
        input.readStructEnd()
        
    },
    
    write: function(output){
        var xfer   = 0;
        
        output.writeStructBegin('TApplicationException');
        
        if (this.message) {
            output.writeFieldBegin('message', Type.STRING, 1)
            output.writeString(this.getMessage())
            output.writeFieldEnd()
        }
        
        if (this.code) {
            output.writeFieldBegin('type', Type.I32, 2)
            output.writeI32(this.code)
            output.writeFieldEnd()
        }
        
        output.writeFieldStop()
        output.writeStructEnd()
       
    },
    
    getCode : function() {
        return this.code
    },
    
    getMessage : function() {
        return this.message
    }
}



/**
 *If you do not specify a url then you must handle ajax on your own.
 *This is how to use js bindings in a async fashion.
 */
Thrift.Transport = function(url){
    this.url      = url
    this.wpos     = 0
    this.rpos     = 0

    this.send_buf = ''
    this.recv_buf = ''
}

Thrift.Transport.prototype = {

    //Gets the browser specific XmlHttpRequest Object
    getXmlHttpRequestObject : function() {
    
        try { return new XMLHttpRequest() } catch(e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP") } catch (e) {}
        try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (e) {}

        throw "Your browser doesn't support the XmlHttpRequest object.  Try upgrading to Firefox."
    
    },

    flush : function(){

        //async mode
        if(this.url == undefined || this.url == '')
            return this.send_buf;

        var xreq = this.getXmlHttpRequestObject()
                
        if (xreq.overrideMimeType)
            xreq.overrideMimeType("application/json")
        
        xreq.open("POST", this.url, false)
        xreq.send(this.send_buf)
        
        if (xreq.readyState != 4)
            throw "encountered an unknown ajax ready state: "+xreq.readyState
        
        if (xreq.status != 200)
            throw "encountered a unknown request status: "+xreq.status

        this.recv_buf    = xreq.responseText
        this.recv_buf_sz = this.recv_buf.length
        this.wpos        = this.recv_buf.length
        this.rpos        = 0
    },

    setRecvBuffer : function(buf){
        this.recv_buf    = buf
        this.recv_buf_sz = this.recv_buf.length
        this.wpos        = this.recv_buf.length
        this.rpos        = 0
    },

    isOpen : function() {
        return true
    },

    open : function() {},

    close: function() {},

    read : function(len) {
        var avail = this.wpos - this.rpos
       
        if(avail == 0)
            return ''

        var give = len

        if(avail < len)
            give = avail

        var ret = this.read_buf.substr(this.rpos,give)
        this.rpos += give

        //clear buf when complete?
        return ret
    },

    readAll : function() {
       return this.recv_buf
    },

    write : function(buf){
        this.send_buf = buf
    },

    getSendBuffer : function(){
        return this.send_buf
    }

}



Thrift.Protocol = function(transport){
    this.transport = transport
}

Thrift.Protocol.Type = {}
Thrift.Protocol.Type[ Thrift.Type.BOOL   ] = '"tf"'
Thrift.Protocol.Type[ Thrift.Type.BYTE   ] = '"i8"'
Thrift.Protocol.Type[ Thrift.Type.I16    ] = '"i16"'
Thrift.Protocol.Type[ Thrift.Type.I32    ] = '"i32"'
Thrift.Protocol.Type[ Thrift.Type.I64    ] = '"i64"'
Thrift.Protocol.Type[ Thrift.Type.DOUBLE ] = '"dbl"'
Thrift.Protocol.Type[ Thrift.Type.STRUCT ] = '"rec"'
Thrift.Protocol.Type[ Thrift.Type.STRING ] = '"str"'
Thrift.Protocol.Type[ Thrift.Type.MAP    ] = '"map"'
Thrift.Protocol.Type[ Thrift.Type.LIST   ] = '"lst"'
Thrift.Protocol.Type[ Thrift.Type.SET    ] = '"set"'


Thrift.Protocol.RType = {}
Thrift.Protocol.RType[ "tf" ] = Thrift.Type.BOOL
Thrift.Protocol.RType[ "i8" ] = Thrift.Type.BYTE
Thrift.Protocol.RType[ "i16"] = Thrift.Type.I16
Thrift.Protocol.RType[ "i32"] = Thrift.Type.I32
Thrift.Protocol.RType[ "i64"] = Thrift.Type.I64 
Thrift.Protocol.RType[ "dbl"] = Thrift.Type.DOUBLE 
Thrift.Protocol.RType[ "rec"] = Thrift.Type.STRUCT 
Thrift.Protocol.RType[ "str"] = Thrift.Type.STRING
Thrift.Protocol.RType[ "map"] = Thrift.Type.MAP 
Thrift.Protocol.RType[ "lst"] = Thrift.Type.LIST
Thrift.Protocol.RType[ "set"] = Thrift.Type.SET 

Thrift.Protocol.Version = 1

Thrift.Protocol.prototype = {
    
    getTransport : function(){
        return this.transport
    },

    //Write functions
    writeMessageBegin : function(name,messageType,seqid){
        this.tstack = new Array()
        this.tpos   = new Array();
           
        this.tstack.push([Thrift.Protocol.Version,'"'+name+'"',messageType,seqid]);
    },

    writeMessageEnd : function(){
        var obj = this.tstack.pop()
        
        this.wobj = this.tstack.pop()
        this.wobj.push(obj)
 
        this.wbuf = "["+this.wobj.join(",")+"]";

        this.transport.write(this.wbuf);       
     },


    writeStructBegin : function(name){
        this.tpos.push(this.tstack.length)
        this.tstack.push({})
    },

    writeStructEnd : function(){
        
        var p = this.tpos.pop()
        var struct = this.tstack[p]
        var str = "{"
        var first = true
        for( var key in struct ){
            if(first) 
                first = false;
            else
                str += ",";

            str += key+":"+struct[key]
        } 

        str += "}"
        this.tstack[p] = str;
    },

    writeFieldBegin : function(name,fieldType,fieldId){
        this.tpos.push(this.tstack.length)
        this.tstack.push({"fieldId" : '"'+fieldId+'"', "fieldType" : Thrift.Protocol.Type[fieldType]});
       
    },

    writeFieldEnd : function(){
        var value     = this.tstack.pop()
        var fieldInfo = this.tstack.pop() 
        
        this.tstack[this.tstack.length-1][fieldInfo.fieldId] = "{"+fieldInfo.fieldType+":"+value+"}" 
        this.tpos.pop()
    },

    writeFieldStop : function(){
        //na
    },

    writeMapBegin : function(keyType,valType,size){
        //size is invalid, we'll set it on end.
        this.tpos.push(this.tstack.length)
        this.tstack.push([Thrift.Protocol.Type[keyType],Thrift.Protocol.Type[valType],0]) 
    },

    writeMapEnd : function(){
        var p   = this.tpos.pop()
        
        if(p == this.tstack.length)
            return;
        
        if((this.tstack.length - p - 1) % 2 != 0)
            this.tstack.push("");

        var size = (this.tstack.length - p - 1)/2

        this.tstack[p][this.tstack[p].length-1] = size;
        
        var map   = "{"
        var first = true
        while( this.tstack.length > p+1 ){
            var v = this.tstack.pop()
            var k = this.tstack.pop()
            if(first){
                first = false
            }else{
                map += ","
            }
            
            map  += '"'+k+'":'+v
        }
        map += "}"
        
        this.tstack[p].push(map)
        this.tstack[p] = "["+this.tstack[p].join(",")+"]"
    },

    writeListBegin : function(elemType,size){
        this.tpos.push(this.tstack.length)
        this.tstack.push([Thrift.Protocol.Type[elemType],size]);
    },

    writeListEnd : function(){
        var p = this.tpos.pop()

        while( this.tstack.length > p+1 ){
            var tmpVal = this.tstack[p+1]
            this.tstack.splice(p+1, 1)
            this.tstack[p].push(tmpVal)
        }

        this.tstack[p] = '['+this.tstack[p].join(",")+']';
    },

    writeSetBegin : function(elemType,size){
        this.tpos.push(this.tstack.length)
        this.tstack.push([Thrift.Protocol.Type[elemType],size]);
    },

    writeSetEnd : function(){
        var p = this.tpos.pop()

        while( this.tstack.length > p+1 ){
            var tmpVal = this.tstack[p+1]
            this.tstack.splice(p+1, 1)
            this.tstack[p].push(tmpVal)
        }

        this.tstack[p] = '['+this.tstack[p].join(",")+']';
    },

    writeBool : function(value){
        this.tstack.push( value ? 1 : 0 );
    },

    writeByte : function(i8){
        this.tstack.push(i8);
    },

    writeI16 : function(i16){
        this.tstack.push(i16);
    },

    writeI32 : function(i32){
        this.tstack.push(i32);
    },

    writeI64 : function(i64){
        this.tstack.push(i64);
    },

    writeDouble : function(dbl){
        this.tstack.push(dbl);
    },

    writeString : function(str){
        // We do not encode uri components for wire transfer: 
        if(str === null) {
            this.tstack.push(null);
        } else {
            // concat may be slower than building a byte buffer
            var escapedString = "";
            for(var i = 0; i < str.length; i++) {
                var ch = str.charAt(i);          // a single double quote: "
                if(ch === '\"') {
                    escapedString += '\\\"';     // write out as: \"
                } else if(ch === '\\') {         // a single backslash: \
                    escapedString += '\\\\';     // write out as: \\
                /* Currently escaped forward slashes break TJSONProtocol.
                 * As it stands, we can simply pass forward slashes into our strings
                 * across the wire without being escaped.
                 * I think this is the protocol's bug, not thrift.js
                 * } else if(ch === '/') {       // a single forward slash: /
                 *  escapedString += '\\/';      // write out as \/
                 * } 
                 */
                } else if(ch === '\b') {        // a single backspace: invisible
                    escapedString += '\\b';     // write out as: \b"
                } else if(ch === '\f') {        // a single formfeed: invisible
                    escapedString += '\\f';     // write out as: \f"
                } else if(ch === '\n') {        // a single newline: invisible
                    escapedString += '\\n';     // write out as: \n"
                } else if(ch === '\r') {        // a single return: invisible
                    escapedString += '\\r';     // write out as: \r"
                } else if(ch === '\t') {        // a single tab: invisible
                    escapedString += '\\t';     // write out as: \t"
                } else {
                    escapedString += ch;        // Else it need not be escaped
                }
            }
            this.tstack.push('"' + escapedString + '"');
        }
    },

    writeBinary : function(str){
        this.writeString(str);
    },


    
    // Reading functions
    readMessageBegin : function(name, messageType, seqid){
        this.rstack = new Array()
        this.rpos   = new Array()
       
        this.robj = eval(this.transport.readAll())
        
        var r = {}     
        var version = this.robj.shift()
        
        if(version != Thrift.Protocol.Version){
            throw "Wrong thrift protocol version: "+version
        }

        r["fname"]  = this.robj.shift()
        r["mtype"]  = this.robj.shift()
        r["rseqid"] = this.robj.shift()
        
        
        //get to the main obj
        this.rstack.push(this.robj.shift())
      
        return r
    },

  
    readMessageEnd : function(){
    },

    readStructBegin : function(name){
        var r = {}
        r["fname"] = ''
        
        //incase this is an array of structs
        if(this.rstack[this.rstack.length-1] instanceof Array)
            this.rstack.push(this.rstack[this.rstack.length-1].shift())
     
        return r
    },

    readStructEnd : function(){
        if(this.rstack[this.rstack.length-2] instanceof Array)
            this.rstack.pop()
    },

    readFieldBegin : function(){
        var r = {};
        
        var fid   = -1
        var ftype = Thrift.Type.STOP 
        
        //get a fieldId
        for(var f in (this.rstack[this.rstack.length-1])){
            if(f == null) continue
            
            fid = parseInt(f)
            this.rpos.push(this.rstack.length)
            
            var field = this.rstack[this.rstack.length-1][fid]
           
            //remove so we don't see it again
            delete this.rstack[this.rstack.length-1][fid]
            
            this.rstack.push(field)            
            
            break
        }
            
        if(fid != -1){      
       
            //should only be 1 of these but this is the only
            //way to match a key
            for(var f in (this.rstack[this.rstack.length-1])){
                if(Thrift.Protocol.RType[f] == null ) continue
                
                ftype = Thrift.Protocol.RType[f]
                this.rstack[this.rstack.length-1] = this.rstack[this.rstack.length-1][f]
            }        
        }
        
        r["fname"] = ''
        r["ftype"] = ftype
        r["fid"]   = fid
        

        return r
    },

    readFieldEnd : function(){  
        var pos = this.rpos.pop()
        
        //get back to the right place in the stack
        while(this.rstack.length > pos)
            this.rstack.pop();
                 
    },

    readMapBegin : function(keyType,valType,size){
        
        var map = this.rstack.pop()
        
        var r = {};
        r["ktype"] = Thrift.Protocol.RType[map.shift()]
        r["vtype"] = Thrift.Protocol.RType[map.shift()]
        r["size"]  = map.shift()
        
        
        this.rpos.push(this.rstack.length)
        this.rstack.push(map.shift())
        
        return r;
    },

    readMapEnd : function(){
        this.readFieldEnd()
    },

    readListBegin : function(elemType,size){
      
        var list = this.rstack[this.rstack.length-1]
      
        var r = {};
        r["etype"] = Thrift.Protocol.RType[list.shift()];
        r["size" ] = list.shift();
        
        
        this.rpos.push(this.rstack.length);
        this.rstack.push(list)
             
        return r;
    },

    readListEnd : function(){
        this.readFieldEnd()
    },

    readSetBegin : function(elemType,size){
        return this.readListBegin(elemType,size)
    },

    readSetEnd : function(){
        return this.readListEnd()
    },

    readBool : function(){
        var r = this.readI32()
    
        if( r != null && r["value"] == "1" ){
            r["value"] = true
        }else{
            r["value"] = false
        }
        
        return r
    },

    readByte : function(){
        return this.readI32()
    },

    readI16 : function(){
        return this.readI32()
    },
   

    readI32 : function(f){
        if(f == undefined)
            f = this.rstack[this.rstack.length-1]
        
        var r = {}    
            
        if(f instanceof Array){
            if(f.length == 0)
                r["value"] = undefined
            else
                r["value"] = f.shift()

        }else if(f instanceof Object){
           for(var i in f){
                if(i == null) continue
                this.rstack.push(f[i])
                delete f[i]  
                                  
                r["value"] = i
                break
           }
        } else {
            r["value"] = f
        }
        
        return r
    },

    readI64 : function(){
        return this.readI32()
    },

    readDouble : function(){
        return this.readI32()
    },

    readString : function(){
        var r = this.readI32()
        return r
    },

    readBinary : function(){
        return this.readString()
    },

    
    //Method to arbitrarily skip over data.
    skip : function(type){
        throw "skip not supported yet"
    }
   
}




/**
 * Electrotank Thrift support classes.
 */

/**
 * Implements a ByteBuffer with relative read and write operations similar to
 * Java's java.nio.ByteBuffer.
 */
ByteBuffer = function() {
	this.bytes = new Array();
	this.lim = 0;
	this.pos = 0;
	this.mrk = 0;
	this.debug = true;
}

ByteBuffer.prototype = {
	limit : function(limit) {
		if (limit == null) {
			return this.lim;
		}
		else {
			this.lim = limit;
		}
	},

	position : function(position) {
		if (position == null) {
			return this.pos;
		}
		else {
			this.pos = position;
		}
	},
	
	mark : function(mark) {
		if (mark == null) {
			return this.mrk;
		}
		else {
			this.mrk = mark;
		}
	},
	
	remaining : function() {
		return this.lim - this.pos;
	},
	
	flip : function() {
		this.lim = this.pos;
		this.pos = 0;
		return this;
	},
	
	reset : function() {
		this.lim = 0;
		this.pos = 0;
		this.mrk = 0;
		return this;
	},
	
	putBytes : function(bytes, offset, length) {
		if (!offset) {
			offset = 0;
		}
		if (!length) {
			length = bytes.remaining();
		}
		for (var i = 0; i < length; i++) {
			this.put(bytes.get() & 0xff);
		}
	},
	
	getBytes : function(bytes, offset, length) {
		buffer.position(buffer.position() + offset);
		for (var i = 0; i < length; i++) {
			buffer.put(this.get() & 0xff);
		}
	},
	
	/**
	* Write the low 8 bits of the value to the buffer at the current position
	* and then increments the position. If the buffer's limit has been reached
	* the limit is also incremented.
	*/
	put : function(value) {
		this.bytes[this.pos++] = (value & 0xff);
		if (this.lim < this.pos) {
			this.lim = this.pos;
		}
	},
	
	/**
	* Reads 8 bits from the buffer at it's current position. The result is
	* returned as a signed 8 bit integer.
	*/
	get : function() {
		var value = this.bytes[this.pos++];
		if (value & 0x80) {
			value |= 0xffffff00;
		}
		return value;
	},
	
	putShort : function(value) {
		this.put(value >> 8);
		this.put(value >> 0);
	},
	
	getShort : function() {
		var value = 0;
		value |= ((this.get() & 0xff) << 8);
		value |= ((this.get() & 0xff) << 0);
		if (value & 0x8000) {
			value |= 0xffff0000;
		}
		return value;
	},
	
	putInt : function(value) {
		this.put(value >> 24);
		this.put(value >> 16);
		this.put(value >> 8);
		this.put(value >> 0);
	},
	
	getInt : function(value) {
		var value = 0;
		value |= ((this.get() & 0xff) << 24);
		value |= ((this.get() & 0xff) << 16);
		value |= ((this.get() & 0xff) << 8);
		value |= ((this.get() & 0xff) << 0);
		return value;
	},
	
	putUTFBytes : function(value) {
		for (var n = 0; n < value.length; n++) {
			var c = value.charCodeAt(n);
 			if (c < 128) {
				this.put(c);
			}
			else if((c > 127) && (c < 2048)) {
				this.put((c >> 6) | 192);
				this.put((c & 63) | 128);
			}
			else {
				this.put((c >> 12) | 224);
				this.put(((c >> 6) & 63) | 128);
				this.put((c & 63) | 128);
			}
		}				
	},
	
	getUTFBytes : function(length) {
		var string = "";
		var i = 0;
		var c = 0;
		var c2 = 0;
		var c3 = 0;

		while (i < length) {
			c = (this.get() & 0xff);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = (this.get() & 0xff);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = (this.get() & 0xff);
				c3 = (this.get() & 0xff);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	},
	
	putUTF : function(value) {
		var ba = new ByteBuffer();
		ba.putUTFBytes(value);
		this.putShort(ba.flip().remaining());
		this.putBytes(ba, 0, ba.remaining());
	},
	
	getUTF : function() {
		var length = (this.getShort() & 0xffff);
		return this.getUTFBytes(length);
	},
	
	putDouble : function(value) {
		var bytes = this.toIeee754Bytes(value, 64, 11, 52, 1023);
		this.putBytes(bytes, 0, 8);
	},
	
	getDouble : function() {
		var negative = (this.bytes[this.pos] & 0x80) == 0x80;
		var exponent = ((this.bytes[this.pos] & 0x7f) << 4) | ((this.bytes[this.pos + 1] >> 4) & 0x0f);
		exponent -= 1023;
		var significand = 0;
		significand += ((this.bytes[this.pos + 1] & 0x08) == 0x08) ? Math.pow(2, -1) : 0;
		significand += ((this.bytes[this.pos + 1] & 0x04) == 0x04) ? Math.pow(2, -2) : 0;
		significand += ((this.bytes[this.pos + 1] & 0x02) == 0x02) ? Math.pow(2, -3) : 0;
		significand += ((this.bytes[this.pos + 1] & 0x01) == 0x01) ? Math.pow(2, -4) : 0;
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 8; j++) {
				if ((this.bytes[this.pos + 2 + i] & (1 << (7 - j))) != 0) {
					significand += Math.pow(2, -1 * (((i * 8) + j) + 5));
				}
			}
		}
		if (exponent != -1023) {
			significand += 1;
		}
		var d = significand * Math.pow(2, exponent) * (negative ? -1 : 1);
		this.pos += 8;
		return d;
	},
	
	putFloat : function(value) {
		var bytes = this.toIeee754Bytes(value, 32, 8, 23, 127);
		this.putBytes(bytes, 0, 4);
	},
	
	getFloat : function() {
		var negative = (this.bytes[this.pos] & 0x80) == 0x80;
		var exponent = ((this.bytes[this.pos] & 0x7f) << 1) | ((this.bytes[this.pos + 1] >> 7) & 0x01);
		exponent -= 127;
		var significand = 0;
		significand += ((this.bytes[this.pos + 1] & 64) == 64) ? Math.pow(2, -1) : 0;
		significand += ((this.bytes[this.pos + 1] & 32) == 32) ? Math.pow(2, -2) : 0;
		significand += ((this.bytes[this.pos + 1] & 16) == 16) ? Math.pow(2, -3) : 0;
		significand += ((this.bytes[this.pos + 1] & 8) == 8) ? Math.pow(2, -4) : 0;
		significand += ((this.bytes[this.pos + 1] & 4) == 4) ? Math.pow(2, -5) : 0;
		significand += ((this.bytes[this.pos + 1] & 2) == 2) ? Math.pow(2, -6) : 0;
		significand += ((this.bytes[this.pos + 1] & 1) == 1) ? Math.pow(2, -7) : 0;
		for (var i = 0; i < 2; i++) {
			for (var j = 0; j < 8; j++) {
				if ((this.bytes[this.pos + 2 + i] & (1 << (7 - j))) != 0) {
					significand += Math.pow(2, -1 * (((i * 8) + j) + 8));
				}
			}
		}
		if (exponent != -127) {
			significand += 1;
		}
		var d = significand * Math.pow(2, exponent) * (negative ? -1 : 1);
		this.pos += 4;
		return d;
	},
	
	putVarInt : function(value) {
		if (value & 0x40000000) {
			throw "putVarInt() value too large.";
		}
		var byteCount = 1;
		if (value > 0x3fffff) {
			byteCount = 4;
		}
		else if (value > 0x3fff) {
			byteCount = 3;
		}
		else if (value > 0x3f) {
			byteCount = 2;
		}
		var b = ((byteCount - 1) << 6);
		for (var i = byteCount - 1; i >= 0; i--) {
			b |= ((value >> (i * 8)) & 0xff);
			this.put(b);
			b = 0;
		}
	},
	
	getVarInt : function() {
		var firstByte = this.get();
		var byteCount = (firstByte >> 6) & 0x03;
		var value = (firstByte & 0x3f);
		for (var i = 0; i < byteCount; i++) {
			value <<= 8;
			value |= (this.get() & 0xff);
		}
		return value;
	},
	
	toIeee754Bytes : function(d, bitLength, exponentBits, significandBits, exponentMax) {
		var s = this.toIeee754BitString(d, bitLength, exponentBits, significandBits, exponentMax);
		var bytes = new ByteBuffer();
		for (var i = 0; i < 8; i++) {
			var byte = 0;
			byte = parseInt(s.substr(i * 8, 8), 2);
			bytes.put(byte);
		}
		bytes.flip();
		return bytes;
	},
	
	toIeee754BitString : function(d, bitLength, exponentBits, significandBits, exponentMax) {
		if (d == 0) {
			return this.padWithZeros("", bitLength, true);
		}
		
		var negative = d < 0;
		
		d = Math.abs(d);
		
		var whole = Math.floor(d);

		var fraction = d  - whole;
		
		var exponent = 0;
		if (whole < 1) {
			whole = d;
			exponent = -1;
			while ((whole *= 2) <= 1) {
				exponent--;
			}
		}
		else {
			while ((whole /= 2) >= 1) {
				exponent++;
			}
		}
		
		var significand = d / Math.pow(2, exponent);
		
		significand -= Math.floor(significand);
		
		var exponentPlusBias = exponentMax + exponent;
		
		var exponentBin = exponentPlusBias.toString(2);
		
		var significandBin = "";
		
		while (significand != 0) {
			significand *= 2;
			if (significand >= 1) {
				significandBin += "1";
			}
			else {
				significandBin += "0";
			}
			significand = significand -  Math.floor(significand);
		}
		
		return (negative ? "1" : "0") + this.padWithZeros(exponentBin, exponentBits, true) + this.padWithZeros(significandBin, significandBits, false);
	},
	
	padWithZeros : function(s, length, left) {
		if (s.length == length) {
			return s;
		}
		if (s.length < length) {
			for (var i = 0, count = (length - s.length); i < count; i++) {
				if (left) {
					s = "0" + s;
				}
				else {
					s = s + "0";
				}
			}
			return s;
		}
		else {
			return s.substring(0, length);
		}
	},
	
	toHexDump : function() {
		var str = "\n";
		var tmp = "";
		var tmp2;
		
		for (var i = 0; i < this.bytes.length; i++) {
			var byte = this.bytes[i] & 0xff;
			tmp2 = byte.toString(16);
			if (tmp2.length < 2) {
				tmp2 = "0" + tmp2;
			}
			str += tmp2;
			str += " ";
			tmp += (byte >= new String(" ").charCodeAt(0) && byte <= new String("~").charCodeAt(0)) ? String.fromCharCode(byte) : '.';
			if (i % 16 == 15) {
				str += tmp;
				str += "\n";
				tmp = "";
			}
		}
		if (length % 16 < 15) {
			for (var i = 0; i < 16 - (length % 16); i++) {
				str += "   ";
			}
			str += tmp;
		}
		return str;
	},
}

Thrift.ByteBufferTransport = function(url){
	this.buffer = new ByteBuffer();
}

Thrift.ByteBufferTransport.prototype = {
	getBuffer : function() {
		return this.buffer;
	},
	
	setBuffer : function(buffer) {
		this.buffer = buffer;
	},

    flush : function() {
    },

    isOpen : function() {
        return true;
    },

    open : function() {},

    close: function() {},

    read : function(len) {
    },

    readAll : function() {
    },

    write : function(buf) {
    },
}

/**
 * Implements the Thrift BinaryProtocol using ByteBufferTransport. This
 * class is currently hard coded to use the ByteBufferTransport because
 * the original Apache Thrift implementation of Protocol was not written 
 * in a Transport independant fashion. 
 * TODO remove the direct calls to getBuffer() and replace with proper
 * internal bit processing.
 */
Thrift.BinaryProtocol = function(transport){
    this.transport = transport
}

Thrift.BinaryProtocol.prototype = {
    
    getTransport : function() {
        return this.transport
    },

    //Write functions
    writeMessageBegin : function(name, messageType, seqid) {
    },

    writeMessageEnd : function(){
    },

    writeStructBegin : function(name) {
    },

    writeStructEnd : function() {
    },

    writeFieldBegin : function(name, fieldType, fieldId) {
    	this.writeByte(fieldType);
    	this.writeI16(fieldId);
    },

    writeFieldEnd : function() {
    },

    writeFieldStop : function() {
    	this.writeByte(Thrift.Type.STOP);
    },

    writeMapBegin : function(keyType, valType, size) {
		this.writeByte(keyType);
		this.writeByte(valType);
     	this.writeI32(size);
    },

    writeMapEnd : function() {
    },

    writeListBegin : function(elemType, size) {
        this.writeByte(elemType);
        this.writeI32(size);
    },

    writeListEnd : function() {
    },

    writeSetBegin : function(elemType, size) {
        this.writeByte(elemType);
        this.writeI32(size);
    },

    writeSetEnd : function() {
    },

    writeBool : function(value) {
    	this.transport.getBuffer().put(value ? 1 : 0);
    },

    writeByte : function(i8) {
    	this.transport.getBuffer().put(i8);
    },

    writeI16 : function(i16) {
    	this.transport.getBuffer().putShort(i16);
    },

    writeI32 : function(i32) {
    	this.transport.getBuffer().putInt(i32);
    },

    writeI64 : function(i64) {
    	throw "writeI64 not implemented yet";
    },

    writeDouble : function(dbl) {
    	this.transport.getBuffer().putDouble(dbl);
    },

    writeString : function(str) {
    	var b = new ByteBuffer();
    	b.putUTFBytes(str);
    	b.flip();
    	this.transport.getBuffer().putInt(b.remaining());
    	this.transport.getBuffer().putBytes(b, 0, b.remaining());
    },

    writeBinary : function(str) {
    },

    readMessageBegin : function(name, messageType, seqid) {
    },

    readMessageEnd : function() {
    },

    readStructBegin : function(name) {
    	return { name: name };
    },

    readStructEnd : function() {
    },

    readFieldBegin : function() {
    	var fname = "";
    	var ftype = this.readByte().value;
    	var fid = (ftype == 0) ? 0 : this.readI16().value;
    	var fieldBegin = { 
    		fname : fname, 
    		ftype : ftype, 
    		fid : fid 
    	};
    	return fieldBegin;
    },

    readFieldEnd : function() {  
    },
    
    readMapBegin : function() {
    	return { 
    		ktype : this.readByte().value, 
    		vtype : this.readByte().value, 
    		size : this.readI32().value 
    	};
    },

    readMapEnd : function() {
    },

    readListBegin : function() {
        return {
        	etype : this.readByte().value,
        	size : this.readI32().value
        };
    },

    readListEnd : function() {
    },

    readSetBegin : function() {
    	return readListBegin();
    },

    readSetEnd : function() {
    },

    readBool : function() {
    	return { value : (this.transport.getBuffer().get() == 0) ? false : true };
    },

    readByte : function() {
	    return { value : this.transport.getBuffer().get() };
    },

    readI16 : function() {
    	return { value : this.transport.getBuffer().getShort() };
    },

    readI32 : function() {
    	return { value : this.transport.getBuffer().getInt() };
    },

    readI64 : function() {
    	throw "readI64 not yet implemented";
    },

    readDouble : function() {
    	return { value : this.transport.getBuffer().getDouble() };
    },

    readString : function() {
    	var len = this.transport.getBuffer().getInt();
    	return { value : this.transport.getBuffer().getUTFBytes(len) };
    },

    readBinary : function() {
    },

    skip : function(type) {
        throw "skip not supported yet"
    }
   
}

ElectroServer.EventDispatcher = function() {
	this.listeners = {};
}

ElectroServer.EventDispatcher.prototype.constructor = ElectroServer.EventDispatcher();

ElectroServer.EventDispatcher.prototype.addEventListener = function(eventType, listener, target) {
	if (typeof this.listeners[eventType] == "undefined"){
    	this.listeners[eventType] = [];
    }

    this.listeners[eventType].push( { listener: listener, target : target });
}

ElectroServer.EventDispatcher.prototype.dispatchEvent = function(eventType, event) {
	if (this.listeners[eventType] instanceof Array){
		var listeners = this.listeners[eventType];
		for (var i = 0, len = listeners.length; i < len; i++){
			var target = listeners[i].target;
			if (!target) {
				target = this;
			}
			listeners[i].listener.call(target, event);
		}
	}
}

ElectroServer.EventDispatcher.prototype.removeListener = function() {
}

/*

    removeListener: function(type, listener){
        if (this._listeners[type] instanceof Array){
            var listeners = this._listeners[type];
            for (var i=0, len=listeners.length; i < len; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }
};
*/
ElectroServer.EsEngine = function() {
	this.servers = new Array();
	this.serversById = {};
	this.activeConnections = new Array();
	this.defaultConnection = null;
	this.connectionIds = 0;
	this.connected = false;
	this.connectionsToAttempt = new Array();
	this.connectionAttemptIndex = 0;
	this.connectionsById = [];
	this.secret = Math.random().toString();
	this.userName = null;
	this.isQueuing = false;
	this.queueTimer = null;
	this.queuedPluginMessages = new Array();
	this.closingAll = false;
}

ElectroServer.EsEngine.prototype = new ElectroServer.EventDispatcher();

ElectroServer.EsEngine.prototype.constructor = ElectroServer.EsEngine;

/**
 * Adds a Server instance to the list of available servers. Servers should only be added through this method or by setting a new array of servers via the 'servers' property.
 * @param	Server instance to add.
 */
ElectroServer.EsEngine.prototype.addServer = function(server) {
	this.serversById[server.serverId] = server;
	this.servers.push(server);
}

/**
 * Removes a server from the list of available servers.
 * @param	Server to remove
 */
ElectroServer.EsEngine.prototype.removeServer = function(server) {
    this.serversById[server.serverId] = null;

    //find and remove the server
    for (var i = 0; i < this.servers.length;++i) {
        if (this.servers[i] == server) {
            this.servers.splice(i, 1);
            break;
        }
    }
}

/**
 * Sends a message to the server. This is the only way to communicate with the server. If no connection is specified then the default connection is used.
 * The default connection is the first connection established.
 * @param	The message to send to the server.
 * @param	The optional connection to use for sending to the server.
 */
ElectroServer.EsEngine.prototype.send = function(message, connection) {
	if (!connection) {
		connection = this.defaultConnection;
	}
	
	var transport = new Thrift.ByteBufferTransport();
	var protocol = new Thrift.BinaryProtocol(transport);
		
	var messageTypeIndicator = EsUtility.messageTypeToMessageTypeIndicator[message.messageType];
	var messageNumber = connection.getNextOutboundId();
		
	var thriftMessage = message.toThrift();
		
	thriftMessage.write(protocol);
		
	var thriftBuffer = transport.getBuffer().flip();
		
	var buffer = new ByteBuffer();
		
	buffer.putShort(messageTypeIndicator);
	buffer.putInt(messageNumber);
	buffer.putInt(thriftBuffer.remaining());
	buffer.putBytes(thriftBuffer);
		
	buffer.flip();
	
   	if (ElectroServer.debug) {
   		console.log("send [" + connection.connectionId + "] (" + messageNumber + ") " + JSON.stringify(message));
   	}
	
	connection.send(buffer);
}

/**
 * After this class is configured with available connections via the servers property or the addServer method, invoking this method will attempt to connect to ElectroServer. The connections attempted varies based on parameters.
 * The most common usage is to not pass in any parameters. In this usage (no paramters) connection attempts are made by cycling through all possible connections until one is established.
 * If the server parameter is non-null and the availableConnection parameter is null, then connections attempts are made by cycling through all possible connections associated only with the server specified.
 * If the server paramteer is non-null and the availableconnection parameter is non-null then a connection is attempted only with the availableConnection specified. This can be used to establish additional connections.
 *
 * Every attempted connection results in a ConnectionAttemptResponse event.
 * When a connection finally succeeds or if all connection attempts fail a ConnectionResponse event is fired.
 *
 * @param	Optional Server instance. This needs to have already been added to this class via the servers property or addServer method.
 * @param	Optional AvailableConnection instance. If non-null then the 'server' parameter must be non-null and this instance must have been added to it.
 */
ElectroServer.EsEngine.prototype.connect = function(server, availableConnection) {
	this.connectionAttemptIndex = 0;
	this.connectionsToAttempt = new Array();
	
	if (availableConnection) {
        //only attempt a single connection
		this.connectionsToAttempt.push(availableConnection);
	}
	else if (server) {
        //attempt all AvailableConnections from the server specified
		this.connectionsToAttempt = server.availableConnections.slice(0);
	}
	else {
		for (var i = 0; i < this.servers.length; i++) {
			server = this.servers[i];
			this.connectionsToAttempt = this.connectionsToAttempt.concat(server.availableConnections);
		}
	}
	
	if (!this.connected) {
        //since we're attempting to connect for the first time only allow connections it he list that be a primary connection (socket, http, but not udp or rtmp)
		this.pruneConnectionsToAttempt();
	}
	
    //start the cycle
	this.attemptNextConnection();
}

/**
 * Removes AvailableConnections that cannot be primary connections. Types such as RTMP and UDP cannot be primary connections.
 * @private
 */
ElectroServer.EsEngine.prototype.pruneConnectionsToAttempt = function() {
	for (var i = this.connectionsToAttempt.length - 1; i >= 0; --i) {
		var con = this.connectionsToAttempt[i];
		if (con.transportType != ElectroServer.TransportType.BinaryHTTP) {
			this.connectionsToAttempt.splice(i, 1);
		}
	}
}

/**
 * When attempting to connect there is a list of AvailableConnection instances to cycle through until a connection is established.
 * This method takes the next AvailableConnection in the list and attempts to connect to it.
 * @private
 */
ElectroServer.EsEngine.prototype.attemptNextConnection = function() {
	//create a new Connection instance based on the current AvailableConnection
	var con = this.getNewConnection(this.connectionsToAttempt[this.connectionAttemptIndex]);

    if (ElectroServer.debug) {
	    console.log("[Attempting "+con.transportType+" connection. Host: "+con.host+", Port: "+con.port+"]");
	}

	//store the connection by its id
	this.connectionsById[con.connectionId] = con;
	
	//listen for important things on this connection, such as when data arrives or something happens to the connection
	con.addEventListener(ElectroServer.DataEvent.DATA_RECEIVED, this.onDataReceived, this);
	con.addEventListener(ElectroServer.ConnectionEvent.CONNECTION_ESTABLISHED, this.onConnectionEstablished, this);
	con.addEventListener(ElectroServer.ConnectionEvent.CONNECTION_CLOSED, this.onConnectionClosed, this);
	con.addEventListener(ElectroServer.ConnectionEvent.CONNECTION_FAILED, this.onConnectionFailed, this);
	
	//connect it!
	con.connect();
	
	//increment the index
	++this.connectionAttemptIndex;
}

/**
 * This method acts as a factory for new connections. An AvailableConnection is passed in and a Connection is returned.
 * @private
 */
ElectroServer.EsEngine.prototype.getNewConnection = function(availableConnection) {
	var connection = new ElectroServer.HttpConnection(availableConnection);
    //assign it a local id
	connection.connectionId = this.connectionIds++;
	return connection;
}

/**
 * Called when new data is received on an active connection. We pass it on to see if it should be processed yet.
 * @private
 */
ElectroServer.EsEngine.prototype.onDataReceived = function(event) {
    //raw client-bound bytes
	var data = event.data;
	var connection = event.connection;
	
    // pull off the flags and shorten the buffer
	var messageTypeIndicator = data.getShort();
	var messageNumber = data.getInt();
	var thriftLength = data.getInt();
	var transport = new Thrift.ByteBufferTransport();
	transport.setBuffer(data);
	var protocol = new Thrift.BinaryProtocol(transport);

	var messageType = EsUtility.messageTypeIndicatorToMessageType[messageTypeIndicator];
	var messageClass = EsUtility.messageTypeToApiClass[messageType];

	var message = new messageClass();
	var thriftMessage = message.newThrift();

    message.messageNumber = messageNumber;
    message.messageType = messageType;
		
	thriftMessage.read(protocol);
		
	message.fromThrift(thriftMessage);
		
	if (ElectroServer.debug) {
		console.log("recv [" + connection.connectionId + "] (" + messageNumber + ") " + JSON.stringify(message));
	}
		
	if (message instanceof ConnectionResponse) {
		connection.hashId = message.hashId;
	}

	//this.dispatchEvent(message.messageType, message);
    this.checkMessageOrder(message, connection);

    if (data.pos != data.bytes.length) {
        this.onDataReceived(event);
    }
}

/**
 * We check to see if the message number is the one we expected. If it is, process it (and check the queue to see if any older messages are ready for processing). If it isn't, then queue it.
 * @private
 */
ElectroServer.EsEngine.prototype.checkMessageOrder = function(message, con) {
    var server = this.serversById[con.serverId];

    //This check is used for a login failure. When a login fails the message number expected is 1 but the message number received is 0. So handle that here by resetting expectations.
    if (message instanceof LoginResponse && !message.successful) {
        server.expectedMessageNumber = 0;
    }

    /**
     * This if statement was changed from == to <= for the additional socket login logic. It may need to be changed or might not be needed when it is bug free.
     * The reason right now is this: the additional connection response has a messageNumber of 0 because no login has occurred. But the server object has a > 0 message number
     * So only increment the server number if the message being processed is the id we expected.
     * TODO: Verify this is needed http://electrotank.jira.com/browse/ESV-85
     */
    // It seems that messages sent by the gateway always have -1 for their message number. I take this to
    // mean they should be processed out of order, so that's what the check below does. Additionally,
    // the code in processMessage ignores the incoming message number increment for -1 message numbers.
    if (message.messageNumber == -1 || message.messageNumber <= server.expectedMessageNumber) {
        //if this messageNumber is what we expect, then process
        this.processMessage(message, con);

        //if there are any queued messages then start checking to see if they are ready to be procesed
        while (server.queuedMessages.length > 0) {
            //first message in queue
            var qm = server.queuedMessages[0];
            message = qm.message;
            con = qm.connection;

            //if ready to be processed, then process
            if (message.messageNumber == server.expectedMessageNumber) {
                this.processMessage(message, con);

                //remove from queue
                server.queuedMessages.shift();
            } else {
                //if not ready to be processed, then kick out of the loop
                //the queue is sorted, so if the first message isn't ready then none of them are
                break;
            }
        }

    } else {
    	if (ElectroServer.debug) {
	        console.log("[Queuing ("+con.connectionId+") --> "+message.messageType+"]");
	    }

        //if the message is out of order, then queue it
        server.queueMessage(message, con);
    }
}

/**
 * Processes a message by dispatching it. We increment the expectedMessageNumber on the server from which it came.
 * @private
 */
ElectroServer.EsEngine.prototype.processMessage = function(message, con) {
    //console.log("[Receiving ("+con.connectionId+") <-- "+message.messageType+"]");

    var server = this.serversById[con.serverId];

    //there is some custom logic needed for certain message types. handle it here.
    this.preProcessMessage(message, con, server);

    /**
     * This if statement was added for the additional socket login logic. It may need to be changed or might not be needed when it is bug free.
     * The reason right now is this: the additional connection response has a messageNumber of 0 because no login has occurred. But the server object has a > 0 message number
     * So only increment the server number if the message being processed is the id we expected.
     * TODO: Verify this is needed http://electrotank.jira.com/browse/ESV-85
     */
    /**
     * PROBLEM: When the below is uncommented, process composite plugin messages forces them to queue. Figure it out, if needed.
     */
    //if (message.messageNumber == server.expectedMessageNumber) {
        //increment the messageNumber of what we expect
    if (message.messageNumber != -1) {
        ++server.expectedMessageNumber;
        if (server.expectedMessageNumber == 10000) {
            server.expectedMessageNumber = 0;
        }
    }

    //dispatch the message
    this.dispatchEvent(message.messageType, message);
}

/**
 * This method handles custom logic needed for certain message types that come in
 * @private
 */
ElectroServer.EsEngine.prototype.preProcessMessage = function(message, con, server) {

    //if this is a generic error, then log the details
    if (message instanceof GenericErrorResponse) {
    	if (ElectroServer.debug) {
	        console.log("["+message.errorType.name+"]");
	    }
    }

    if (message instanceof ConnectionResponse) {
        this.messageSizeCompressionThreshold = message.protocolConfiguration.messageCompressionThreshold;
    }

    //keep around in case my change below for setting the hashId is a problem
    /*
    //if just connected via Http, then set the sessionKey on the connection
    if (message is ConnectionResponse && con is HttpConnection) {
        (con as HttpConnection).sessionKey = (message as ConnectionResponse).hashId.toString();
    }
    */

    //set the session key for this connection
    if (message instanceof ConnectionResponse) {
        con.hashId = message.hashId;
    }

    //if message is an aggregate of plugin messages, then dig in and process each of them
    if (message instanceof AggregatePluginMessageEvent) {
        var cpm = message;

        //process each message
        for (var i=0;i<cpm.esObjects.length;++i) {
            var esob = cpm.esObjects[i];
            var pme = new PluginMessageEvent();
            pme.roomLevelPlugin = cpm.originRoomId >= 0;
            pme.pluginName = cpm.pluginName;
            pme.originRoomId = cpm.originRoomId;
            pme.originZoneId = cpm.originZoneId;
            pme.parameters = esob;

            //process the plugin event
            this.processMessage(pme, con);

            //the 'processMessage' call will increment the expectedMessageNumber. But it shouldn't because these messages came in on one bulk message
            //correct by decrementing
            --server.expectedMessageNumber;
        }
    }

}

/**
 * Remove listeners on a dead connection
 * @private
 */
ElectroServer.EsEngine.prototype.cleanConnectionListeners = function(con) {
    con.removeEventListener(ElectroServer.DataEvent.DATA_RECEIVED, this.onDataReceived);
    con.removeEventListener(ElectroServer.ConnectionEvent.CONNECTION_ESTABLISHED, this.onConnectionEstablished);
    con.removeEventListener(ElectroServer.ConnectionEvent.CONNECTION_CLOSED, this.onConnectionClosed);
    con.removeEventListener(ElectroServer.ConnectionEvent.CONNECTION_FAILED, this.onConnectionFailed);
}

ElectroServer.EsEngine.prototype.handleFailedConnection = function(con) {
    //clean up listeners
    this.cleanConnectionListeners(con);

    if (ElectroServer.debug) {
	    console.log("[Connection attempt failed. Type: "+con.transportType+"]");
	}

    //one of the few client-generated events
    //dispatch so developers can get a detailed view of what is going on in the process of finding a connection
    var ca = new ConnectionAttemptResponse();
    ca.successful = false;
    ca.connectionId = con.connectionId;
    ca.error = ErrorType.ConnectionFailed;
    this.dispatchEvent(ca.messageType,  ca);

    if (this.connectionAttemptIndex < this.connectionsToAttempt.length) {
        //if there is another connection to try, then try it
        this.attemptNextConnection();
    } else if (!this.connected) {
        //if there is no other connection to try, then dispatch the failure
        if (ElectroServer.debug) {
	        console.log("[Connection failed.]");
	    }

        var crm = new ConnectionResponse();
        crm.successful = false;
        crm.error = ErrorType.ConnectionFailed;
        this.dispatchEvent(crm.messageType, crm);

    }
}

/**
 * This is called when a connection is established. It fires a ConnectionAttemptResponse.
 * @private
 */
ElectroServer.EsEngine.prototype.onConnectionEstablished = function(con) {
	//connection was a success, so store it under _activeConnections
	this.activeConnections.push(con);
	
	//store the active connection on the server object
	this.serversById[con.serverId].addActiveConnection(con);
	
	//if there is no defaultConnection, then this is the first, and set it as default
	if (!this.defaultConnection) {
		this.defaultConnection = con;
	}
	
	this.connected = true;
	
	//one of the few client-generated events
	//dispatch so developers can get a detailed view of what is going on in the process of finding a connection
	var ca = new ConnectionAttemptResponse();
	ca.successful = true;
	ca.connectionId = con.connectionId;
	this.dispatchEvent(ca.messageType,  ca);
}

/**
 * Gets a Server instance by id. The server must have been previously added via the addServer method or by setting an array of servers using the 'servers' property.
 * @param	Id of the Server instance to return
 * @return Server instance
 */
ElectroServer.EsEngine.prototype.serverById = function(serverId) {
    return this.serversById[serverId];
}

/**
 * Called when a connection closes. We clean up after the formerly active connection, and fire off a ConnectionClosedEvent.
 * @private
 */
ElectroServer.EsEngine.prototype.onConnectionClosed = function(con) {
    //remove connection from _activeConnections
    for (var i = 0; i < this.activeConnections.length;++i) {
        if (this.activeConnections[i] == con) {
            //clean up listeners
            this.cleanConnectionListeners(con);

            //remove the active connection from the server object
            this.serversById[con.serverId].removeActiveConnection(con);

            //remove from activeConnections
            this.activeConnections.splice(i, 1);
            break;
        }
    }

    var wasDefault = con == this.defaultConnection;

    //if our defaultConnection just closed, find a new one
    if (wasDefault) {
        //flag as not connected until we find a new connection
        this.connected = false;

        //set defaultConnection as null until we find a new one
        this.defaultConnection = null;

        for (i = 0; i < this.activeConnections.length;++i) {
            var ncon = this.activeConnections[i];
            if (ncon.isPrimaryCapable) {
                this.defaultConnection = ncon;
                this.connected = true;
                break;
            }
        }
    }

    if (ElectroServer.debug) {
	    console.log("[ConnectionClosedEvent connectionId: "+con.connectionId+", wasDefault: "+wasDefault+", stillConnected:"+this.connected+"]");
	}

    //if not connected, then make sure we close our secondary connections too
    if (!this.connected && !this.closingAll) {
        this.close();
    }

    //dispatch ConnectionClosedEvent
    var cce = new ConnectionClosedEvent();
    cce.connectionId = con.connectionId;
    this.dispatchEvent(cce.messageType,  cce);
}

/**
 * Closes all active connections resulting in EsConnectionClosedEvent events for each connection.
 */
ElectroServer.EsEngine.prototype.close = function() {
    this.closingAll = true;
    var arr = this.activeConnections.slice(0);

    //close each connection
    for (var i=0;i<arr.length;++i) {
        var con = arr[i];
        con.close();
    }

    this.closingAll = false;
}

/**
 * Called when a connection fails. We clean up after the connection and fire off a ConnectionAttemptResponse.
 * If there ar emove connections to try, then we try the next one, else we fire off a ConnectionResponse.
 * @private
 */
ElectroServer.EsEngine.prototype.onConnectionFailed = function(con) {
    this.handleFailedConnection(con);
}

/**
 * All connections that are attempted are locally assigned an id. This method returns the Connection instance associated with the id passed in.
 * @param	Id of the Connection you want to retrieve
 * @return Connection instance
 */
ElectroServer.EsEngine.prototype.connectionsById = function(id) {
    return this.connectionsById[id];
}

ElectroServer.Server = function(serverId) {
	this.serverId = serverId;
	
	this.activeConnections = new Array();
	this.availableConnections = new Array();
	this.connected = false;
	this.expectedMessageNumber = 0;
	this.queuedMessages = new Array();
	this.availableConnectionsByType = {};
}

ElectroServer.Server.prototype.constructor = ElectroServer.Server;

/**
 * Adds an AvailableConnection object to the list of available connections.
 * @param	The AvailableConnection object to store.
 */
ElectroServer.Server.prototype.addAvailableConnection = function(availableConnection) {
	availableConnection.serverId = this.serverId;
	this.getAvailableConnectionsByType(availableConnection.transportType).push(availableConnection);
	this.availableConnections.push(availableConnection);
}

/**
 * Removes an AvailableConnection object.
 * @param	Object to remove.
 */
ElectroServer.Server.prototype.removeAvailableConnection = function(availableConnection) {
    //remove from dictionary of connections by type
    var arr = this.getAvailableConnectionsByType(availableConnection.transport);
    for (var i = 0; i < arr.length;++i) {
        if (arr[i] == availableConnection) {
            arr.splice(i, 1);
            break;
        }
    }

    //remove from master list
    for (i = 0; i < this.availableConnections.length;++i) {
        if (this.availableConnections[i] == availableConnection) {
            this.availableConnections.splice(i, 1);
            break;
        }
    }
}

/**
 * Adds a connection that has been fully established to the list of active connections. This is used internally by the API and isn't intended for public use.
 * @param	The connection.
 * @private
 */
ElectroServer.Server.prototype.addActiveConnection = function(activeConnection) {
	this.activeConnections.push(activeConnection);
	this.connected = true;
}

/**
 * Removes what was an active connection from the list of active connections.
 * @param	The connection to remove.
 * @private
 */
ElectroServer.Server.prototype.removeActiveConnection = function(con) {
    for (var i = 0; i < this.activeConnections.length;++i) {
        if (this.activeConnections[i] == con) {
            this.activeConnections.splice(i, 1);
            break;
        }
    }

    //refresh the connected property
    this.connected = this.activeConnections.length > 0;
}

/**
 * Get an array of AvailableConnections by the connection type. The connection type is a value found in the TransportType class, such as TransportType.SOCKET.
 * @param	The transport type of the connection.
 * @return Array of AvailableConnection objects.
 */
ElectroServer.Server.prototype.getAvailableConnectionsByType = function(transportType) {
	var availableConnectionsByType = this.availableConnectionsByType[transportType];
	if (!availableConnectionsByType) {
		availableConnectionsByType = new Array();
		this.availableConnectionsByType[transportType] = availableConnectionsByType;
	}
	return availableConnectionsByType;
}

/**
 * Queues a message that was received too early. This is used internally by the API and is not intended for public use.
 * @param	The message to queue.
 * @param	The connection over which the message came.
 * @private
 */
ElectroServer.Server.prototype.queueMessage = function(message, connection) {
    var qm = new ElectroServer.QueuedMessage(message, connection);
    this.queuedMessages.push(qm);
    this.queuedMessages.sort(this.sortByMessageNumber);
}

/**
 * Function used by Array.sort to keep the queued messages in order.
 * @private
 * @param	First queued message
 * @param	Second queued message
 * @return
 */
ElectroServer.Server.prototype.sortByMessageNumber = function (a, b) {
    var val = 0;

    if (a.message.messageNumber < b.message.messageNumber) {
        val = -1;
    } else {
        val = 1;
    }

    return val;
}


ElectroServer.AvailableConnection = function(host, port, transportType, serverId, localIp, localPort) {
	this.host = host;
	this.port = port;
	this.transportType = transportType;
	this.serverId = serverId;
	this.localIp = localIp;
	this.localPort = localPort;
	
	if (!transportType) {
		this.transportType = ElectroServer.TransportType.BinaryHTTP;
	}
	if (!localIp) {
		this.localIp = "0.0.0.0";
	}
	if (!localPort) {
		this.localPort = 12000;
	}
}

ElectroServer.TransportType = {
	
}

ElectroServer.TransportType.BinaryHTTP = "BinaryHTTP";

ElectroServer.Connection = function(availableConnection) {
	ElectroServer.EventDispatcher.call(this);
	if (availableConnection) {
		this.host = availableConnection.host;
		this.port = availableConnection.port;
		this.transportType = availableConnection.transportType;
		this.serverId = availableConnection.serverId;
	}
	this.outboundId = -1;
	this.primaryCapable = false;
	this.hashId = -1;
	this.connectionId = -1;
};

ElectroServer.Connection.prototype = new ElectroServer.EventDispatcher();

ElectroServer.Connection.prototype.constructor = ElectroServer.Connection;

ElectroServer.Connection.prototype.getNextOutboundId = function() {
	++this.outboundId;
	if (this.outboundId == 10000) {
		this.outboundId = 0;
	}
	return this.outboundId;
};

ElectroServer.DataEvent = {
	DATA_RECEIVED : "ElectroServer.DataEvent.DATA_RECEIVED",
}

ElectroServer.ConnectionEvent = {
	CONNECTION_ESTABLISHED : "ElectroServer.ConnectionEvent.CONNECTION_ESTABLISHED",
	CONNECTION_ESTABLISHED : "ElectroServer.ConnectionEvent.CONNECTION_CLOSED",
	CONNECTION_ESTABLISHED : "ElectroServer.ConnectionEvent.CONNECTION_FAILED",
}

ElectroServer.HttpConnection = function(availableConnection) {
	ElectroServer.Connection.call(this, availableConnection);
	
	this.primaryCapable = true;
	
	this.connectUrl = "http://" + this.host + ":" + this.port + "/connect/text";
	this.sessionUrl = "http://" + this.host + ":" + this.port + "/s/";
	this.workers = new Array();
};

ElectroServer.HttpConnection.prototype = new ElectroServer.Connection();

ElectroServer.HttpConnection.prototype.constructor = ElectroServer.HttpConnection;

ElectroServer.HttpConnection.prototype.connect = function() {
   	var worker = new ElectroServer.HttpConnection.Worker(this);
   	worker.send(this.connectUrl);
};
    
ElectroServer.HttpConnection.prototype.send = function(data) {
   	var worker = new ElectroServer.HttpConnection.Worker(this);
   	this.workers.push(worker);
   	worker.send(this.sessionUrl + this.hashId, data);
};
    
ElectroServer.HttpConnection.prototype.dataReceived = function(worker, data) {
	if (!this.connected) {
		this.connected = true;
		this.dispatchEvent(ElectroServer.ConnectionEvent.CONNECTION_ESTABLISHED, this);
	}
	if (data.remaining()) {
		this.dispatchEvent(ElectroServer.DataEvent.DATA_RECEIVED, { connection : this, data : data } );
	}
	this.workers.splice(this.workers.indexOf(worker), 1);
	if (!this.workers.length) {
		console.log("ElectroServer.HttpConnection.dataReceived no more workers, starting one");
		this.send();
	}
};

ElectroServer.HttpConnection.Worker = function(connection) {
	this.connection = connection;
	this.workerId = ElectroServer.HttpConnection.Worker.workerId++;
	console.log("[" + this.workerId + "] ElectroServer.HttpConnection.Worker created");
}

ElectroServer.HttpConnection.Worker.workerId = 0;

ElectroServer.HttpConnection.Worker.prototype = {
    //Gets the browser specific XmlHttpRequest Object
    getXmlHttpRequestObject : function() {
    
        try { return new XMLHttpRequest() } catch(e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP") } catch (e) {}
        try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (e) {}

        throw "Your browser doesn't support the XmlHttpRequest object."
    },
    
	send : function(url, data) {
    	var self = this;
    	this.request = this.getXmlHttpRequestObject();
    	
		if (data) {
			var s = "";
			while (data.remaining()) {
				s += String.fromCharCode(data.get() & 0xff);
			}
			data = Base64.encode(s) + "\u0000";
		}
		
		if (ElectroServer.debug) {
			console.log("[" + this.workerId + "] ElectroServer.HttpConnection.Worker.send(" + url + ", " + data + ")");
		}

    	this.request.onreadystatechange = function() { self.handler.call(self) };
    	this.request.open("POST", url, true);
   		this.request.send(data);
	},
	
    handler : function() {
    	//console.log("[" + this.workerId + "] ElectroServer.HttpConnection.Worker.handler readyState " + this.request.readyState);
    	if (this.request.readyState == 4) {
    		if (ElectroServer.debug) {
    			console.log("[" + this.workerId + "] ElectroServer.HttpConnection.Worker.handler data length " + this.request.responseText.length);
    		}
    		var buffer = new ByteBuffer();
    		var decoded = Base64.decode(this.request.responseText);
    		for (var i = 0; i < decoded.length; i++) {
    			buffer.put(decoded.charCodeAt(i));
    		}
    		buffer.flip();
   			this.connection.dataReceived(this, buffer);
    	}
    },
}

ElectroServer.ThriftUtil = {
}

ElectroServer.ThriftUtil.unflattenEsObject = function(flattenedEsObject) {
	if (!flattenedEsObject.encodedEntries || !flattenedEsObject.encodedEntries.length) {
		return;
	}
	var b = new ByteBuffer();
	for (var i = 0; i < flattenedEsObject.encodedEntries.length; i++) {
		b.put(flattenedEsObject.encodedEntries[i]);
	}
	b.flip();
	return ElectroServer.ThriftUtil.decodeEsObject(b);
}

ElectroServer.ThriftUtil.unflattenEsObjectRO = function(flattenedEsObjectRO) {
	if (!flattenedEsObjectRO.encodedEntries || !flattenedEsObjectRO.encodedEntries.length) {
		return;
	}
	var b = new ByteBuffer();
	for (var i = 0; i < flattenedEsObjectRO.encodedEntries.length; i++) {
		b.put(flattenedEsObjectRO.encodedEntries[i]);
	}
	b.flip();
	return ElectroServer.ThriftUtil.decodeEsObject(b);
}

ElectroServer.ThriftUtil.flattenEsObject = function(esObject) {
	if (!esObject) {
		return null;
	}
	var b = ElectroServer.ThriftUtil.encodeEsObject(esObject).flip();
	var fEsObject = new FlattenedEsObject();
	fEsObject.encodedEntries = new Array();
	while (b.remaining()) {
		fEsObject.encodedEntries.push(b.get());
	}
	return fEsObject;
}

ElectroServer.ThriftUtil.flattenEsObjectRO = function(esObjectRO) {
	if (!esObjectRO) {
		return null;
	}
	var b = ElectroServer.ThriftUtil.encodeEsObject(esObjectRO).flip();
	var fEsObject = new FlattenedEsObject();
	fEsObject.encodedEntries = new Array();
	while (b.remaining()) {
		fEsObject.encodedEntries.push(b.get());
	}
	return fEsObject;
}

ElectroServer.ThriftUtil.encodeEsObject = function(esObject, buffer) {
	if (!buffer) {
		buffer = new ByteBuffer();
	}
	var flags = 0;
	buffer.put(flags);
	var length = esObject.size();
	buffer.putVarInt(length);
	
    for (var key in esObject.data) {
   	    if (esObject.data.hasOwnProperty(key)) {
			ElectroServer.ThriftUtil.encodeEsObjectEntry(buffer, esObject.data[key]);
   	    }
    }
    return buffer;
}

ElectroServer.ThriftUtil.encodeEsObjectEntry = function(buffer, entry) {
	buffer.putUTFBytes(entry.type);
	ElectroServer.ThriftUtil.encodeString(buffer, entry.name);
	
	switch (entry.type) {
		case ElectroServer.EsObject.DataType.Integer:
			buffer.putInt(entry.value);
			break;
		case ElectroServer.EsObject.DataType.EsString:
			ElectroServer.ThriftUtil.encodeString(buffer, entry.value);
			break;
		case ElectroServer.EsObject.DataType.Double:
			buffer.putDouble(entry.value);
			break;
		case ElectroServer.EsObject.DataType.Float:
			buffer.putFloat(entry.value);
			break;
		case ElectroServer.EsObject.DataType.EsBoolean:
			buffer.putBoolean(entry.value);
			break;
		case ElectroServer.EsObject.DataType.Byte:
			buffer.put(entry.value);
			break;
		case ElectroServer.EsObject.DataType.Character:
			buffer.putShort(entry.value);
			break;
		case ElectroServer.EsObject.DataType.Long:
			buffer.putLong(entry.value);
			break;
		case ElectroServer.EsObject.DataType.Short:
			buffer.putShort(entry.value);
			break;
		case ElectroServer.EsObject.DataType.EsNumber:
			buffer.putDouble(entry.value);
			break;
		case ElectroServer.EsObject.DataType.EsObject:
			ElectroServer.ThriftUtil.encodeEsObject(entry.value, buffer);
			break;
		case ElectroServer.EsObject.DataType.EsObjectArray:
			buffer.putVarInt(entry.value.length);
			for (var i = 0; i < entry.value.length; i++) {
				ElectroServer.ThriftUtil.encodeEsObject(entry.value[i], buffer);
			}
			break;
		case ElectroServer.EsObject.DataType.IntegerArray:
			buffer.putVarInt(entry.value.length);
			for (var i = 0; i < entry.value.length; i++) {
				buffer.putInt(entry.value[i]);
			}
			break;
		case ElectroServer.EsObject.DataType.StringArray:
			buffer.putVarInt(entry.value.length);
			for (var i = 0; i < entry.value.length; i++) {
				ElectroServer.ThriftUtil.writeString(buffer, entry.value[i]);
			}
			break;
		case ElectroServer.EsObject.DataType.DoubleArray:
			buffer.putVarInt(entry.value.length);
			for (var i = 0; i < entry.value.length; i++) {
				buffer.putDouble(entry.value[i]);
			}
			break;
		case ElectroServer.EsObject.DataType.FloatArray:
			buffer.putVarInt(entry.value.length);
			for (var i = 0; i < entry.value.length; i++) {
				buffer.putFloat(entry.value[i]);
			}
			break;
		case ElectroServer.EsObject.DataType.BooleanArray:
			buffer.putVarInt(entry.value.length);
			for (var i = 0; i < entry.value.length; i++) {
				buffer.putBoolean(entry.value[i]);
			}
			break;
		case ElectroServer.EsObject.DataType.ByteArray:
			buffer.putVarInt(entry.value.length);
			for (var i = 0; i < entry.value.length; i++) {
				buffer.put(entry.value[i]);
			}
			break;
		case ElectroServer.EsObject.DataType.CharacterArray:
			buffer.putVarInt(entry.value.length);
			for (var i = 0; i < entry.value.length; i++) {
				buffer.putShort(entry.value[i]);
			}
			break;
		case ElectroServer.EsObject.DataType.LongArray:
			buffer.putVarInt(entry.value.length);
			for (var i = 0; i < entry.value.length; i++) {
				buffer.putLong(entry.value[i]);
			}
			break;
		case ElectroServer.EsObject.DataType.ShortArray:
			buffer.putVarInt(entry.value.length);
			for (var i = 0; i < entry.value.length; i++) {
				buffer.putShort(entry.value[i]);
			}
			break;
		case ElectroServer.EsObject.DataType.NumberArray:
			buffer.putVarInt(entry.value.length);
			for (var i = 0; i < entry.value.length; i++) {
				buffer.putDouble(entry.value[i]);
			}
			break;
		default:
			throw "Unrecognized EsObject data type: " + entry.type;
	}
}

ElectroServer.ThriftUtil.decodeEsObject = function(buffer) {
	var esObject = new ElectroServer.EsObject();
	
	var flags = buffer.get();
	var length = buffer.getVarInt();
	var array;
	var arrayLength;
	
	for (var j = 0; j < length; j++) {
		var type = buffer.getUTFBytes(1);
		var name = ElectroServer.ThriftUtil.decodeString(buffer);
		
		switch (type) {
			case ElectroServer.EsObject.DataType.Integer:
				esObject.setInteger(name, buffer.getInt());
				break;
			case ElectroServer.EsObject.DataType.EsString:
				esObject.setString(name, ElectroServer.ThriftUtil.decodeString(buffer));
				break;
			case ElectroServer.EsObject.DataType.Double:
				esObject.setDouble(name, buffer.getDouble());
				break;
			case ElectroServer.EsObject.DataType.Float:
				esObject.setFloat(name, buffer.getFloat());
				break;
			case ElectroServer.EsObject.DataType.EsBoolean:
				esObject.setBoolean(name, buffer.getBoolean());
				break;
			case ElectroServer.EsObject.DataType.Byte:
				esObject.setByte(name, buffer.get());
				break;
			case ElectroServer.EsObject.DataType.Character:
				esObject.setCharacter(name, buffer.getShort());
				break;
			case ElectroServer.EsObject.DataType.Long:
				esObject.setLong(name, buffer.getLong());
				break;
			case ElectroServer.EsObject.DataType.Short:
				esObject.setShort(name, buffer.getShort());
				break;
			case ElectroServer.EsObject.DataType.EsNumber:
				esObject.setNumber(name, buffer.getDouble());
				break;
			case ElectroServer.EsObject.DataType.EsObject:
				esObject.setEsObject(name, ElectroServer.ThriftUtil.decodeEsObject(buffer));
				break;
			case ElectroServer.EsObject.DataType.EsObjectArray:
				arrayLength = buffer.getVarInt();
				array = new Array();
				for (var i = 0; i < arrayLength; i++) {
					array.push(ElectroServer.ThriftUtil.decodeEsObject(buffer));
				}
				esObject.setEsObjectArray(name, array);
				break;
			case ElectroServer.EsObject.DataType.IntegerArray:
				arrayLength = buffer.getVarInt();
				array = new Array();
				for (var i = 0; i < arrayLength; i++) {
					array.push(buffer.getInt());
				}
				esObject.setIntegerArray(name, array);
				break;
			case ElectroServer.EsObject.DataType.StringArray:
				arrayLength = buffer.getVarInt();
				array = new Array();
				for (var i = 0; i < arrayLength; i++) {
					array.push(ElectroServer.ThriftUtil.decodeString(buffer));
				}
				esObject.setStringArray(name, array);
				break;
			case ElectroServer.EsObject.DataType.DoubleArray:
				arrayLength = buffer.getVarInt();
				array = new Array();
				for (var i = 0; i < arrayLength; i++) {
					array.push(buffer.getDouble());
				}
				esObject.setDoubleArray(name, array);
				break;
			case ElectroServer.EsObject.DataType.FloatArray:
				arrayLength = buffer.getVarInt();
				array = new Array();
				for (var i = 0; i < arrayLength; i++) {
					array.push(buffer.getFloat());
				}
				esObject.setFloatArray(name, array);
				break;
			case ElectroServer.EsObject.DataType.BooleanArray:
				arrayLength = buffer.getVarInt();
				array = new Array();
				for (var i = 0; i < arrayLength; i++) {
					array.push(buffer.getBoolean());
				}
				esObject.setBooleanArray(name, array);
				break;
			case ElectroServer.EsObject.DataType.ByteArray:
				arrayLength = buffer.getVarInt();
				array = new Array();
				for (var i = 0; i < arrayLength; i++) {
					array.push(buffer.get());
				}
				esObject.setByteArray(name, array);
				break;
			case ElectroServer.EsObject.DataType.CharacterArray:
				arrayLength = buffer.getVarInt();
				array = new Array();
				for (var i = 0; i < arrayLength; i++) {
					array.push(buffer.getShort());
				}
				esObject.setCharacterArray(name, array);
				break;
			case ElectroServer.EsObject.DataType.LongArray:
				arrayLength = buffer.getVarInt();
				array = new Array();
				for (var i = 0; i < arrayLength; i++) {
					array.push(buffer.getLong());
				}
				esObject.setLongArray(name, array);
				break;
			case ElectroServer.EsObject.DataType.ShortArray:
				arrayLength = buffer.getVarInt();
				array = new Array();
				for (var i = 0; i < arrayLength; i++) {
					array.push(buffer.getShort());
				}
				esObject.setShortArray(name, array);
				break;
			case ElectroServer.EsObject.DataType.NumberArray:
				arrayLength = buffer.getVarInt();
				array = new Array();
				for (var i = 0; i < arrayLength; i++) {
					array.push(buffer.getDouble());
				}
				esObject.setNumberArray(name, array);
				break;
			default:
				throw "Unrecognized EsObject data type: " + type;
		}
	}
	
	return esObject;
}

ElectroServer.ThriftUtil.encodeString = function(buffer, value) {
	var b = new ByteBuffer();
	b.putUTFBytes(value);
	b.flip();
	buffer.putVarInt(b.remaining());
	buffer.putBytes(b);
}

ElectroServer.ThriftUtil.decodeString = function(buffer) {
	var length = buffer.getVarInt();
	return buffer.getUTFBytes(length);
}

ElectroServer.EsObject = function() {
	this.data = { };
}

ElectroServer.EsObject.prototype = {
	setInteger : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.Integer);
	},
	
	setString : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.EsString);
	},
	
	setDouble : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.Double);
	},
	
	setFloat : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.Float);
	},
	
	setBoolean : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.EsBoolean);
	},
	
	setByte : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.Byte);
	},
	
	setChar : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.Character);
	},
	
	setLong : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.Long);
	},
	
	setShort : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.Short);
	},
	
	setEsObject : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.EsObject);
	},
	
	setEsObjectArray : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.EsObjectArray);
	},
	
	setIntegerArray : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.IntegerArray);
	},
	
	setStringArray : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.StringArray);
	},
	
	setDoubleArray : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.DoubleArray);
	},
	
	setFloatArray : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.FloatArray);
	},
	
	setBooleanArray : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.BooleanArray);
	},
	
	setByteArray : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.ByteArray);
	},
	
	setCharacterArray : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.CharacterArray);
	},
	
	setLongArray : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.LongArray);
	},
	
	setShortArray : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.ShortArray);
	},
	
	setNumber : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.EsNumber);
	},
	
	setNumberArray : function(name, value) {
		this._set(name, value, ElectroServer.EsObject.DataType.NumberArray);
	},

	getInteger : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.Integer);
	},
	
	getString : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.EsString);
	},
	
	getDouble : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.Double);
	},
	
	getFloat : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.Float);
	},
	
	getBoolean : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.EsBoolean);
	},
	
	getByte : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.Byte);
	},
	
	getChar : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.Character);
	},
	
	getLong : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.Long);
	},
	
	getShort : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.Short);
	},
	
	getEsObject : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.EsObject);
	},
	
	getEsObjectArray : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.EsObjectArray);
	},
	
	getIntegerArray : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.IntegerArray);
	},
	
	getStringArray : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.StringArray);
	},
	
	getDoubleArray : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.DoubleArray);
	},
	
	getFloatArray : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.FloatArray);
	},
	
	getBooleanArray : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.BooleanArray);
	},
	
	getByteArray : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.ByteArray);
	},
	
	getCharacterArray : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.CharacterArray);
	},
	
	getLongArray : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.LongArray);
	},
	
	getShortArray : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.ShortArray);
	},
	
	getNumber : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.EsNumber);
	},
	
	getNumberArray : function(name, type) {
		return this._get(name, ElectroServer.EsObject.DataType.NumberArray);
	},

	size : function() {
    	var size = 0;
	    for (var key in this.data) {
    	    if (this.data.hasOwnProperty(key)) {
    	    	size++;
    	    }
	    }
    	return size;
	},

	_set : function(name, value, type) {
		this.data[name] = { name : name, value : value, type : type };
	},

	_get : function(name, type) {
		var d = this.data[name];
		if (d.type != type) {
			throw "Unexpected type in EsObject data.";
		}
		return d.value;
	}
}

ElectroServer.EsObject.DataType = { }

ElectroServer.EsObject.DataType.Integer = '0';
ElectroServer.EsObject.DataType.EsString = '1';
ElectroServer.EsObject.DataType.Double = '2';
ElectroServer.EsObject.DataType.Float = '3';
ElectroServer.EsObject.DataType.EsBoolean = '4';
ElectroServer.EsObject.DataType.Byte = '5';
ElectroServer.EsObject.DataType.Character = '6';
ElectroServer.EsObject.DataType.Long = '7';
ElectroServer.EsObject.DataType.Short = '8';
ElectroServer.EsObject.DataType.EsObject = '9';
ElectroServer.EsObject.DataType.EsObjectArray = 'a';
ElectroServer.EsObject.DataType.IntegerArray = 'b';
ElectroServer.EsObject.DataType.StringArray = 'c';
ElectroServer.EsObject.DataType.DoubleArray = 'd';
ElectroServer.EsObject.DataType.FloatArray = 'e';
ElectroServer.EsObject.DataType.BooleanArray = 'f';
ElectroServer.EsObject.DataType.ByteArray = 'g';
ElectroServer.EsObject.DataType.CharacterArray = 'h';
ElectroServer.EsObject.DataType.LongArray = 'i';
ElectroServer.EsObject.DataType.ShortArray = 'j';
ElectroServer.EsObject.DataType.EsNumber = 'k';
ElectroServer.EsObject.DataType.NumberArray = 'l';


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftAddBuddiesRequest = function(args){
this.buddyNames = null
this.esObject = new ThriftFlattenedEsObject()
if( args != null ){if (null != args.buddyNames)
this.buddyNames = args.buddyNames
if (null != args.esObject)
this.esObject = args.esObject
}}
ThriftAddBuddiesRequest.prototype = {}
ThriftAddBuddiesRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.buddyNames = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          var rtmp = input.readString()
elem5 = rtmp.value
          this.buddyNames.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRUCT) {
      this.esObject = new ThriftFlattenedEsObject()
      this.esObject.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftAddBuddiesRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftAddBuddiesRequest')
if (null != this.buddyNames) {
  output.writeFieldBegin('buddyNames', Thrift.Type.LIST, 1)
  {
    output.writeListBegin(Thrift.Type.STRING, this.buddyNames.length)
    {
      for(var iter6 in this.buddyNames)
      {
        iter6=this.buddyNames[iter6]
        output.writeString(iter6)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
if (null != this.esObject) {
  output.writeFieldBegin('esObject', Thrift.Type.STRUCT, 2)
  this.esObject.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftAddBuddiesResponse = function(args){
this.buddiesAdded = null
this.buddiesNotAdded = null
if( args != null ){if (null != args.buddiesAdded)
this.buddiesAdded = args.buddiesAdded
if (null != args.buddiesNotAdded)
this.buddiesNotAdded = args.buddiesNotAdded
}}
ThriftAddBuddiesResponse.prototype = {}
ThriftAddBuddiesResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.buddiesAdded = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          var rtmp = input.readString()
elem5 = rtmp.value
          this.buddiesAdded.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.LIST) {
      {
        var _size6 = 0
        var rtmp3
        this.buddiesNotAdded = []
        var _etype9 = 0
        rtmp3 = input.readListBegin()
        _etype9 = rtmp3.etype
        _size6 = rtmp3.size
        for (var _i10 = 0; _i10 < _size6; ++_i10)
        {
          var elem11 = null
          var rtmp = input.readString()
elem11 = rtmp.value
          this.buddiesNotAdded.push(elem11)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftAddBuddiesResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftAddBuddiesResponse')
if (null != this.buddiesAdded) {
  output.writeFieldBegin('buddiesAdded', Thrift.Type.LIST, 1)
  {
    output.writeListBegin(Thrift.Type.STRING, this.buddiesAdded.length)
    {
      for(var iter12 in this.buddiesAdded)
      {
        iter12=this.buddiesAdded[iter12]
        output.writeString(iter12)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
if (null != this.buddiesNotAdded) {
  output.writeFieldBegin('buddiesNotAdded', Thrift.Type.LIST, 2)
  {
    output.writeListBegin(Thrift.Type.STRING, this.buddiesNotAdded.length)
    {
      for(var iter13 in this.buddiesNotAdded)
      {
        iter13=this.buddiesNotAdded[iter13]
        output.writeString(iter13)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftAddRoomOperatorRequest = function(args){
this.zoneId = null
this.roomId = null
this.userName = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.userName)
this.userName = args.userName
}}
ThriftAddRoomOperatorRequest.prototype = {}
ThriftAddRoomOperatorRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.userName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftAddRoomOperatorRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftAddRoomOperatorRequest')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.userName) {
  output.writeFieldBegin('userName', Thrift.Type.STRING, 3)
  output.writeString(this.userName)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftAggregatePluginMessageEvent = function(args){
this.pluginName = null
this.esObjects = null
this.originZoneId = null
this.originRoomId = null
if( args != null ){if (null != args.pluginName)
this.pluginName = args.pluginName
if (null != args.esObjects)
this.esObjects = args.esObjects
if (null != args.originZoneId)
this.originZoneId = args.originZoneId
if (null != args.originRoomId)
this.originRoomId = args.originRoomId
}}
ThriftAggregatePluginMessageEvent.prototype = {}
ThriftAggregatePluginMessageEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.pluginName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.esObjects = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          elem5 = new ThriftFlattenedEsObjectRO()
          elem5.read(input)
          this.esObjects.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.originZoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.originRoomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftAggregatePluginMessageEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftAggregatePluginMessageEvent')
if (null != this.pluginName) {
  output.writeFieldBegin('pluginName', Thrift.Type.STRING, 1)
  output.writeString(this.pluginName)
  output.writeFieldEnd()
}
if (null != this.esObjects) {
  output.writeFieldBegin('esObjects', Thrift.Type.LIST, 2)
  {
    output.writeListBegin(Thrift.Type.STRUCT, this.esObjects.length)
    {
      for(var iter6 in this.esObjects)
      {
        iter6=this.esObjects[iter6]
        iter6.write(output)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
if (null != this.originZoneId) {
  output.writeFieldBegin('originZoneId', Thrift.Type.I32, 3)
  output.writeI32(this.originZoneId)
  output.writeFieldEnd()
}
if (null != this.originRoomId) {
  output.writeFieldBegin('originRoomId', Thrift.Type.I32, 4)
  output.writeI32(this.originRoomId)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftAggregatePluginRequest = function(args){
this.pluginRequestArray = null
if( args != null ){if (null != args.pluginRequestArray)
this.pluginRequestArray = args.pluginRequestArray
}}
ThriftAggregatePluginRequest.prototype = {}
ThriftAggregatePluginRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.pluginRequestArray = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          elem5 = new ThriftRequestDetails()
          elem5.read(input)
          this.pluginRequestArray.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftAggregatePluginRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftAggregatePluginRequest')
if (null != this.pluginRequestArray) {
  output.writeFieldBegin('pluginRequestArray', Thrift.Type.LIST, 1)
  {
    output.writeListBegin(Thrift.Type.STRUCT, this.pluginRequestArray.length)
    {
      for(var iter6 in this.pluginRequestArray)
      {
        iter6=this.pluginRequestArray[iter6]
        iter6.write(output)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftBuddyStatusUpdateAction = { 
'LoggedIn' : 1
,'LoggedOut' : 2
}

//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftBuddyStatusUpdateEvent = function(args){
this.userName = null
this.action = null
this.esObject = new ThriftFlattenedEsObject()
if( args != null ){if (null != args.userName)
this.userName = args.userName
if (null != args.action)
this.action = args.action
if (null != args.esObject)
this.esObject = args.esObject
}}
ThriftBuddyStatusUpdateEvent.prototype = {}
ThriftBuddyStatusUpdateEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.userName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.action = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRUCT) {
      this.esObject = new ThriftFlattenedEsObject()
      this.esObject.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftBuddyStatusUpdateEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftBuddyStatusUpdateEvent')
if (null != this.userName) {
  output.writeFieldBegin('userName', Thrift.Type.STRING, 1)
  output.writeString(this.userName)
  output.writeFieldEnd()
}
if (null != this.action) {
  output.writeFieldBegin('action', Thrift.Type.I32, 2)
  output.writeI32(this.action)
  output.writeFieldEnd()
}
if (null != this.esObject) {
  output.writeFieldBegin('esObject', Thrift.Type.STRUCT, 3)
  this.esObject.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftConnectionAttemptResponse = function(args){
this.successful = null
this.connectionId = null
this.error = null
if( args != null ){if (null != args.successful)
this.successful = args.successful
if (null != args.connectionId)
this.connectionId = args.connectionId
if (null != args.error)
this.error = args.error
}}
ThriftConnectionAttemptResponse.prototype = {}
ThriftConnectionAttemptResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.successful = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.connectionId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.error = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftConnectionAttemptResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftConnectionAttemptResponse')
if (null != this.successful) {
  output.writeFieldBegin('successful', Thrift.Type.BOOL, 1)
  output.writeBool(this.successful)
  output.writeFieldEnd()
}
if (null != this.connectionId) {
  output.writeFieldBegin('connectionId', Thrift.Type.I32, 2)
  output.writeI32(this.connectionId)
  output.writeFieldEnd()
}
if (null != this.error) {
  output.writeFieldBegin('error', Thrift.Type.I32, 3)
  output.writeI32(this.error)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftConnectionClosedEvent = function(args){
this.connectionId = null
if( args != null ){if (null != args.connectionId)
this.connectionId = args.connectionId
}}
ThriftConnectionClosedEvent.prototype = {}
ThriftConnectionClosedEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.connectionId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftConnectionClosedEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftConnectionClosedEvent')
if (null != this.connectionId) {
  output.writeFieldBegin('connectionId', Thrift.Type.I32, 1)
  output.writeI32(this.connectionId)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftConnectionResponse = function(args){
this.successful = null
this.hashId = null
this.error = null
this.protocolConfiguration = new ThriftProtocolConfiguration()
if( args != null ){if (null != args.successful)
this.successful = args.successful
if (null != args.hashId)
this.hashId = args.hashId
if (null != args.error)
this.error = args.error
if (null != args.protocolConfiguration)
this.protocolConfiguration = args.protocolConfiguration
}}
ThriftConnectionResponse.prototype = {}
ThriftConnectionResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.successful = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.hashId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.error = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.STRUCT) {
      this.protocolConfiguration = new ThriftProtocolConfiguration()
      this.protocolConfiguration.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftConnectionResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftConnectionResponse')
if (null != this.successful) {
  output.writeFieldBegin('successful', Thrift.Type.BOOL, 1)
  output.writeBool(this.successful)
  output.writeFieldEnd()
}
if (null != this.hashId) {
  output.writeFieldBegin('hashId', Thrift.Type.I32, 2)
  output.writeI32(this.hashId)
  output.writeFieldEnd()
}
if (null != this.error) {
  output.writeFieldBegin('error', Thrift.Type.I32, 3)
  output.writeI32(this.error)
  output.writeFieldEnd()
}
if (null != this.protocolConfiguration) {
  output.writeFieldBegin('protocolConfiguration', Thrift.Type.STRUCT, 4)
  this.protocolConfiguration.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftCreateOrJoinGameResponse = function(args){
this.successful = null
this.error = null
this.zoneId = null
this.roomId = null
this.gameId = null
this.gameDetails = new ThriftFlattenedEsObjectRO()
if( args != null ){if (null != args.successful)
this.successful = args.successful
if (null != args.error)
this.error = args.error
if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.gameId)
this.gameId = args.gameId
if (null != args.gameDetails)
this.gameDetails = args.gameDetails
}}
ThriftCreateOrJoinGameResponse.prototype = {}
ThriftCreateOrJoinGameResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.successful = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.error = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.gameId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.STRUCT) {
      this.gameDetails = new ThriftFlattenedEsObjectRO()
      this.gameDetails.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftCreateOrJoinGameResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftCreateOrJoinGameResponse')
if (null != this.successful) {
  output.writeFieldBegin('successful', Thrift.Type.BOOL, 1)
  output.writeBool(this.successful)
  output.writeFieldEnd()
}
if (null != this.error) {
  output.writeFieldBegin('error', Thrift.Type.I32, 2)
  output.writeI32(this.error)
  output.writeFieldEnd()
}
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 3)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 4)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.gameId) {
  output.writeFieldBegin('gameId', Thrift.Type.I32, 5)
  output.writeI32(this.gameId)
  output.writeFieldEnd()
}
if (null != this.gameDetails) {
  output.writeFieldBegin('gameDetails', Thrift.Type.STRUCT, 6)
  this.gameDetails.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftCreateRoomRequest = function(args){
this.zoneName = null
this.zoneId = null
this.roomName = null
this.capacity = null
this.password = null
this.roomDescription = null
this.persistent = null
this.hidden = null
this.receivingRoomListUpdates = null
this.receivingRoomAttributeUpdates = null
this.receivingUserListUpdates = null
this.receivingUserVariableUpdates = null
this.receivingRoomVariableUpdates = null
this.receivingVideoEvents = null
this.nonOperatorUpdateAllowed = null
this.nonOperatorVariableUpdateAllowed = null
this.createOrJoinRoom = null
this.plugins = null
this.variables = null
this.usingLanguageFilter = null
this.languageFilterSpecified = null
this.languageFilterName = null
this.languageFilterDeliverMessageOnFailure = null
this.languageFilterFailuresBeforeKick = null
this.languageFilterKicksBeforeBan = null
this.languageFilterBanDuration = null
this.languageFilterResetAfterKick = null
this.usingFloodingFilter = null
this.floodingFilterSpecified = null
this.floodingFilterName = null
this.floodingFilterFailuresBeforeKick = null
this.floodingFilterKicksBeforeBan = null
this.floodingFilterBanDuration = null
this.floodingFilterResetAfterKick = null
if( args != null ){if (null != args.zoneName)
this.zoneName = args.zoneName
if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomName)
this.roomName = args.roomName
if (null != args.capacity)
this.capacity = args.capacity
if (null != args.password)
this.password = args.password
if (null != args.roomDescription)
this.roomDescription = args.roomDescription
if (null != args.persistent)
this.persistent = args.persistent
if (null != args.hidden)
this.hidden = args.hidden
if (null != args.receivingRoomListUpdates)
this.receivingRoomListUpdates = args.receivingRoomListUpdates
if (null != args.receivingRoomAttributeUpdates)
this.receivingRoomAttributeUpdates = args.receivingRoomAttributeUpdates
if (null != args.receivingUserListUpdates)
this.receivingUserListUpdates = args.receivingUserListUpdates
if (null != args.receivingUserVariableUpdates)
this.receivingUserVariableUpdates = args.receivingUserVariableUpdates
if (null != args.receivingRoomVariableUpdates)
this.receivingRoomVariableUpdates = args.receivingRoomVariableUpdates
if (null != args.receivingVideoEvents)
this.receivingVideoEvents = args.receivingVideoEvents
if (null != args.nonOperatorUpdateAllowed)
this.nonOperatorUpdateAllowed = args.nonOperatorUpdateAllowed
if (null != args.nonOperatorVariableUpdateAllowed)
this.nonOperatorVariableUpdateAllowed = args.nonOperatorVariableUpdateAllowed
if (null != args.createOrJoinRoom)
this.createOrJoinRoom = args.createOrJoinRoom
if (null != args.plugins)
this.plugins = args.plugins
if (null != args.variables)
this.variables = args.variables
if (null != args.usingLanguageFilter)
this.usingLanguageFilter = args.usingLanguageFilter
if (null != args.languageFilterSpecified)
this.languageFilterSpecified = args.languageFilterSpecified
if (null != args.languageFilterName)
this.languageFilterName = args.languageFilterName
if (null != args.languageFilterDeliverMessageOnFailure)
this.languageFilterDeliverMessageOnFailure = args.languageFilterDeliverMessageOnFailure
if (null != args.languageFilterFailuresBeforeKick)
this.languageFilterFailuresBeforeKick = args.languageFilterFailuresBeforeKick
if (null != args.languageFilterKicksBeforeBan)
this.languageFilterKicksBeforeBan = args.languageFilterKicksBeforeBan
if (null != args.languageFilterBanDuration)
this.languageFilterBanDuration = args.languageFilterBanDuration
if (null != args.languageFilterResetAfterKick)
this.languageFilterResetAfterKick = args.languageFilterResetAfterKick
if (null != args.usingFloodingFilter)
this.usingFloodingFilter = args.usingFloodingFilter
if (null != args.floodingFilterSpecified)
this.floodingFilterSpecified = args.floodingFilterSpecified
if (null != args.floodingFilterName)
this.floodingFilterName = args.floodingFilterName
if (null != args.floodingFilterFailuresBeforeKick)
this.floodingFilterFailuresBeforeKick = args.floodingFilterFailuresBeforeKick
if (null != args.floodingFilterKicksBeforeBan)
this.floodingFilterKicksBeforeBan = args.floodingFilterKicksBeforeBan
if (null != args.floodingFilterBanDuration)
this.floodingFilterBanDuration = args.floodingFilterBanDuration
if (null != args.floodingFilterResetAfterKick)
this.floodingFilterResetAfterKick = args.floodingFilterResetAfterKick
}}
ThriftCreateRoomRequest.prototype = {}
ThriftCreateRoomRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.zoneName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.roomName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.capacity = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.password = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.roomDescription = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 7:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.persistent = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 8:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.hidden = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 9:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.receivingRoomListUpdates = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 10:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.receivingRoomAttributeUpdates = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 11:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.receivingUserListUpdates = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 12:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.receivingUserVariableUpdates = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 13:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.receivingRoomVariableUpdates = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 14:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.receivingVideoEvents = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 15:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.nonOperatorUpdateAllowed = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 16:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.nonOperatorVariableUpdateAllowed = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 17:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.createOrJoinRoom = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 18:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.plugins = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          elem5 = new ThriftPluginListEntry()
          elem5.read(input)
          this.plugins.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    case 19:    if (ftype == Thrift.Type.LIST) {
      {
        var _size6 = 0
        var rtmp3
        this.variables = []
        var _etype9 = 0
        rtmp3 = input.readListBegin()
        _etype9 = rtmp3.etype
        _size6 = rtmp3.size
        for (var _i10 = 0; _i10 < _size6; ++_i10)
        {
          var elem11 = null
          elem11 = new ThriftRoomVariable()
          elem11.read(input)
          this.variables.push(elem11)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    case 20:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.usingLanguageFilter = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 21:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.languageFilterSpecified = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 22:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.languageFilterName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 23:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.languageFilterDeliverMessageOnFailure = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 24:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.languageFilterFailuresBeforeKick = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 25:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.languageFilterKicksBeforeBan = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 26:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.languageFilterBanDuration = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 27:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.languageFilterResetAfterKick = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 28:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.usingFloodingFilter = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 29:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.floodingFilterSpecified = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 30:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.floodingFilterName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 31:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.floodingFilterFailuresBeforeKick = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 32:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.floodingFilterKicksBeforeBan = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 33:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.floodingFilterBanDuration = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 34:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.floodingFilterResetAfterKick = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftCreateRoomRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftCreateRoomRequest')
if (null != this.zoneName) {
  output.writeFieldBegin('zoneName', Thrift.Type.STRING, 1)
  output.writeString(this.zoneName)
  output.writeFieldEnd()
}
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 2)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomName) {
  output.writeFieldBegin('roomName', Thrift.Type.STRING, 3)
  output.writeString(this.roomName)
  output.writeFieldEnd()
}
if (null != this.capacity) {
  output.writeFieldBegin('capacity', Thrift.Type.I32, 4)
  output.writeI32(this.capacity)
  output.writeFieldEnd()
}
if (null != this.password) {
  output.writeFieldBegin('password', Thrift.Type.STRING, 5)
  output.writeString(this.password)
  output.writeFieldEnd()
}
if (null != this.roomDescription) {
  output.writeFieldBegin('roomDescription', Thrift.Type.STRING, 6)
  output.writeString(this.roomDescription)
  output.writeFieldEnd()
}
if (null != this.persistent) {
  output.writeFieldBegin('persistent', Thrift.Type.BOOL, 7)
  output.writeBool(this.persistent)
  output.writeFieldEnd()
}
if (null != this.hidden) {
  output.writeFieldBegin('hidden', Thrift.Type.BOOL, 8)
  output.writeBool(this.hidden)
  output.writeFieldEnd()
}
if (null != this.receivingRoomListUpdates) {
  output.writeFieldBegin('receivingRoomListUpdates', Thrift.Type.BOOL, 9)
  output.writeBool(this.receivingRoomListUpdates)
  output.writeFieldEnd()
}
if (null != this.receivingRoomAttributeUpdates) {
  output.writeFieldBegin('receivingRoomAttributeUpdates', Thrift.Type.BOOL, 10)
  output.writeBool(this.receivingRoomAttributeUpdates)
  output.writeFieldEnd()
}
if (null != this.receivingUserListUpdates) {
  output.writeFieldBegin('receivingUserListUpdates', Thrift.Type.BOOL, 11)
  output.writeBool(this.receivingUserListUpdates)
  output.writeFieldEnd()
}
if (null != this.receivingUserVariableUpdates) {
  output.writeFieldBegin('receivingUserVariableUpdates', Thrift.Type.BOOL, 12)
  output.writeBool(this.receivingUserVariableUpdates)
  output.writeFieldEnd()
}
if (null != this.receivingRoomVariableUpdates) {
  output.writeFieldBegin('receivingRoomVariableUpdates', Thrift.Type.BOOL, 13)
  output.writeBool(this.receivingRoomVariableUpdates)
  output.writeFieldEnd()
}
if (null != this.receivingVideoEvents) {
  output.writeFieldBegin('receivingVideoEvents', Thrift.Type.BOOL, 14)
  output.writeBool(this.receivingVideoEvents)
  output.writeFieldEnd()
}
if (null != this.nonOperatorUpdateAllowed) {
  output.writeFieldBegin('nonOperatorUpdateAllowed', Thrift.Type.BOOL, 15)
  output.writeBool(this.nonOperatorUpdateAllowed)
  output.writeFieldEnd()
}
if (null != this.nonOperatorVariableUpdateAllowed) {
  output.writeFieldBegin('nonOperatorVariableUpdateAllowed', Thrift.Type.BOOL, 16)
  output.writeBool(this.nonOperatorVariableUpdateAllowed)
  output.writeFieldEnd()
}
if (null != this.createOrJoinRoom) {
  output.writeFieldBegin('createOrJoinRoom', Thrift.Type.BOOL, 17)
  output.writeBool(this.createOrJoinRoom)
  output.writeFieldEnd()
}
if (null != this.plugins) {
  output.writeFieldBegin('plugins', Thrift.Type.LIST, 18)
  {
    output.writeListBegin(Thrift.Type.STRUCT, this.plugins.length)
    {
      for(var iter12 in this.plugins)
      {
        iter12=this.plugins[iter12]
        iter12.write(output)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
if (null != this.variables) {
  output.writeFieldBegin('variables', Thrift.Type.LIST, 19)
  {
    output.writeListBegin(Thrift.Type.STRUCT, this.variables.length)
    {
      for(var iter13 in this.variables)
      {
        iter13=this.variables[iter13]
        iter13.write(output)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
if (null != this.usingLanguageFilter) {
  output.writeFieldBegin('usingLanguageFilter', Thrift.Type.BOOL, 20)
  output.writeBool(this.usingLanguageFilter)
  output.writeFieldEnd()
}
if (null != this.languageFilterSpecified) {
  output.writeFieldBegin('languageFilterSpecified', Thrift.Type.BOOL, 21)
  output.writeBool(this.languageFilterSpecified)
  output.writeFieldEnd()
}
if (null != this.languageFilterName) {
  output.writeFieldBegin('languageFilterName', Thrift.Type.STRING, 22)
  output.writeString(this.languageFilterName)
  output.writeFieldEnd()
}
if (null != this.languageFilterDeliverMessageOnFailure) {
  output.writeFieldBegin('languageFilterDeliverMessageOnFailure', Thrift.Type.BOOL, 23)
  output.writeBool(this.languageFilterDeliverMessageOnFailure)
  output.writeFieldEnd()
}
if (null != this.languageFilterFailuresBeforeKick) {
  output.writeFieldBegin('languageFilterFailuresBeforeKick', Thrift.Type.I32, 24)
  output.writeI32(this.languageFilterFailuresBeforeKick)
  output.writeFieldEnd()
}
if (null != this.languageFilterKicksBeforeBan) {
  output.writeFieldBegin('languageFilterKicksBeforeBan', Thrift.Type.I32, 25)
  output.writeI32(this.languageFilterKicksBeforeBan)
  output.writeFieldEnd()
}
if (null != this.languageFilterBanDuration) {
  output.writeFieldBegin('languageFilterBanDuration', Thrift.Type.I32, 26)
  output.writeI32(this.languageFilterBanDuration)
  output.writeFieldEnd()
}
if (null != this.languageFilterResetAfterKick) {
  output.writeFieldBegin('languageFilterResetAfterKick', Thrift.Type.BOOL, 27)
  output.writeBool(this.languageFilterResetAfterKick)
  output.writeFieldEnd()
}
if (null != this.usingFloodingFilter) {
  output.writeFieldBegin('usingFloodingFilter', Thrift.Type.BOOL, 28)
  output.writeBool(this.usingFloodingFilter)
  output.writeFieldEnd()
}
if (null != this.floodingFilterSpecified) {
  output.writeFieldBegin('floodingFilterSpecified', Thrift.Type.BOOL, 29)
  output.writeBool(this.floodingFilterSpecified)
  output.writeFieldEnd()
}
if (null != this.floodingFilterName) {
  output.writeFieldBegin('floodingFilterName', Thrift.Type.STRING, 30)
  output.writeString(this.floodingFilterName)
  output.writeFieldEnd()
}
if (null != this.floodingFilterFailuresBeforeKick) {
  output.writeFieldBegin('floodingFilterFailuresBeforeKick', Thrift.Type.I32, 31)
  output.writeI32(this.floodingFilterFailuresBeforeKick)
  output.writeFieldEnd()
}
if (null != this.floodingFilterKicksBeforeBan) {
  output.writeFieldBegin('floodingFilterKicksBeforeBan', Thrift.Type.I32, 32)
  output.writeI32(this.floodingFilterKicksBeforeBan)
  output.writeFieldEnd()
}
if (null != this.floodingFilterBanDuration) {
  output.writeFieldBegin('floodingFilterBanDuration', Thrift.Type.I32, 33)
  output.writeI32(this.floodingFilterBanDuration)
  output.writeFieldEnd()
}
if (null != this.floodingFilterResetAfterKick) {
  output.writeFieldBegin('floodingFilterResetAfterKick', Thrift.Type.BOOL, 34)
  output.writeBool(this.floodingFilterResetAfterKick)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftCreateRoomVariableRequest = function(args){
this.zoneId = null
this.roomId = null
this.name = null
this.value = new ThriftFlattenedEsObject()
this.locked = null
this.persistent = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.name)
this.name = args.name
if (null != args.value)
this.value = args.value
if (null != args.locked)
this.locked = args.locked
if (null != args.persistent)
this.persistent = args.persistent
}}
ThriftCreateRoomVariableRequest.prototype = {}
ThriftCreateRoomVariableRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.name = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.STRUCT) {
      this.value = new ThriftFlattenedEsObject()
      this.value.read(input)
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.locked = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.persistent = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftCreateRoomVariableRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftCreateRoomVariableRequest')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.name) {
  output.writeFieldBegin('name', Thrift.Type.STRING, 3)
  output.writeString(this.name)
  output.writeFieldEnd()
}
if (null != this.value) {
  output.writeFieldBegin('value', Thrift.Type.STRUCT, 4)
  this.value.write(output)
  output.writeFieldEnd()
}
if (null != this.locked) {
  output.writeFieldBegin('locked', Thrift.Type.BOOL, 5)
  output.writeBool(this.locked)
  output.writeFieldEnd()
}
if (null != this.persistent) {
  output.writeFieldBegin('persistent', Thrift.Type.BOOL, 6)
  output.writeBool(this.persistent)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftCrossDomainPolicyRequest = function(args){
}
ThriftCrossDomainPolicyRequest.prototype = {}
ThriftCrossDomainPolicyRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftCrossDomainPolicyRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftCrossDomainPolicyRequest')
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftCrossDomainPolicyResponse = function(args){
this.customFileEnabled = null
this.customFileContents = null
this.port = null
if( args != null ){if (null != args.customFileEnabled)
this.customFileEnabled = args.customFileEnabled
if (null != args.customFileContents)
this.customFileContents = args.customFileContents
if (null != args.port)
this.port = args.port
}}
ThriftCrossDomainPolicyResponse.prototype = {}
ThriftCrossDomainPolicyResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.customFileEnabled = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.customFileContents = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.port = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftCrossDomainPolicyResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftCrossDomainPolicyResponse')
if (null != this.customFileEnabled) {
  output.writeFieldBegin('customFileEnabled', Thrift.Type.BOOL, 1)
  output.writeBool(this.customFileEnabled)
  output.writeFieldEnd()
}
if (null != this.customFileContents) {
  output.writeFieldBegin('customFileContents', Thrift.Type.STRING, 2)
  output.writeString(this.customFileContents)
  output.writeFieldEnd()
}
if (null != this.port) {
  output.writeFieldBegin('port', Thrift.Type.I32, 3)
  output.writeI32(this.port)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftDHInitiateKeyExchangeRequest = function(args){
}
ThriftDHInitiateKeyExchangeRequest.prototype = {}
ThriftDHInitiateKeyExchangeRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftDHInitiateKeyExchangeRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftDHInitiateKeyExchangeRequest')
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftDHPublicNumbersResponse = function(args){
this.baseNumber = null
this.primeNumber = null
if( args != null ){if (null != args.baseNumber)
this.baseNumber = args.baseNumber
if (null != args.primeNumber)
this.primeNumber = args.primeNumber
}}
ThriftDHPublicNumbersResponse.prototype = {}
ThriftDHPublicNumbersResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.baseNumber = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.primeNumber = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftDHPublicNumbersResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftDHPublicNumbersResponse')
if (null != this.baseNumber) {
  output.writeFieldBegin('baseNumber', Thrift.Type.STRING, 1)
  output.writeString(this.baseNumber)
  output.writeFieldEnd()
}
if (null != this.primeNumber) {
  output.writeFieldBegin('primeNumber', Thrift.Type.STRING, 2)
  output.writeString(this.primeNumber)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftDHSharedModulusRequest = function(args){
this.number = null
if( args != null ){if (null != args.number)
this.number = args.number
}}
ThriftDHSharedModulusRequest.prototype = {}
ThriftDHSharedModulusRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.number = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftDHSharedModulusRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftDHSharedModulusRequest')
if (null != this.number) {
  output.writeFieldBegin('number', Thrift.Type.STRING, 1)
  output.writeString(this.number)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftDHSharedModulusResponse = function(args){
this.number = null
if( args != null ){if (null != args.number)
this.number = args.number
}}
ThriftDHSharedModulusResponse.prototype = {}
ThriftDHSharedModulusResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.number = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftDHSharedModulusResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftDHSharedModulusResponse')
if (null != this.number) {
  output.writeFieldBegin('number', Thrift.Type.STRING, 1)
  output.writeString(this.number)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftDataType = { 
'Integer' : 1
,'String' : 2
,'Double' : 3
,'Float' : 4
,'Boolean' : 5
,'Byte' : 6
,'Character' : 7
,'Long' : 8
,'Short' : 9
,'EsObject' : 10
,'EsObjectArray' : 11
,'IntegerArray' : 12
,'StringArray' : 13
,'DoubleArray' : 14
,'FloatArray' : 15
,'BooleanArray' : 16
,'ByteArray' : 17
,'CharacterArray' : 18
,'LongArray' : 19
,'ShortArray' : 20
,'Number' : 21
,'NumberArray' : 22
}

//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftDeleteRoomVariableRequest = function(args){
this.zoneId = null
this.roomId = null
this.name = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.name)
this.name = args.name
}}
ThriftDeleteRoomVariableRequest.prototype = {}
ThriftDeleteRoomVariableRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.name = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftDeleteRoomVariableRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftDeleteRoomVariableRequest')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.name) {
  output.writeFieldBegin('name', Thrift.Type.STRING, 3)
  output.writeString(this.name)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftDeleteUserVariableRequest = function(args){
this.name = null
if( args != null ){if (null != args.name)
this.name = args.name
}}
ThriftDeleteUserVariableRequest.prototype = {}
ThriftDeleteUserVariableRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.name = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftDeleteUserVariableRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftDeleteUserVariableRequest')
if (null != this.name) {
  output.writeFieldBegin('name', Thrift.Type.STRING, 1)
  output.writeString(this.name)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftEncryptionStateChangeEvent = function(args){
this.encryptionOn = null
if( args != null ){if (null != args.encryptionOn)
this.encryptionOn = args.encryptionOn
}}
ThriftEncryptionStateChangeEvent.prototype = {}
ThriftEncryptionStateChangeEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.encryptionOn = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftEncryptionStateChangeEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftEncryptionStateChangeEvent')
if (null != this.encryptionOn) {
  output.writeFieldBegin('encryptionOn', Thrift.Type.BOOL, 1)
  output.writeBool(this.encryptionOn)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftErrorType = { 
'UserNameExists' : 1
,'UserAlreadyLoggedIn' : 2
,'InvalidMessageNumber' : 3
,'InboundMessageFailedValidation' : 4
,'MaximumClientConnectionsReached' : 5
,'ZoneNotFound' : 6
,'RoomNotFound' : 7
,'RoomAtCapacity' : 8
,'RoomPasswordMismatch' : 9
,'GatewayPaused' : 10
,'AccessDenied' : 11
,'RoomVariableLocked' : 12
,'RoomVariableAlreadyExists' : 13
,'DuplicateRoomName' : 14
,'DuplicateZoneName' : 15
,'UserVariableAlreadyExists' : 16
,'UserVariableDoesNotExist' : 17
,'ZoneAllocationFailure' : 18
,'RoomAllocationFailure' : 19
,'UserBanned' : 20
,'UserAlreadyInRoom' : 21
,'LanguageFilterCheckFailed' : 22
,'RegistryTransactionEncounteredError' : 23
,'ActionRequiresLogin' : 24
,'GenericError' : 25
,'PluginNotFound' : 26
,'LoginEventHandlerFailure' : 27
,'InvalidUserName' : 28
,'ExtensionNotFound' : 29
,'PluginInitializationFailed' : 30
,'EventNotFound' : 31
,'FloodingFilterCheckFailed' : 32
,'UserNotJoinedToRoom' : 33
,'ManagedObjectNotFound' : 34
,'IdleTimeReached' : 35
,'ServerError' : 36
,'OperationNotSupported' : 37
,'InvalidLanguageFilterSettings' : 38
,'InvalidFloodingFilterSettings' : 39
,'ExtensionForcedReload' : 40
,'UserLogOutRequested' : 41
,'OnlyRtmpConnectionRemains' : 42
,'GameDoesntExist' : 43
,'FailedToJoinGameRoom' : 44
,'GameIsLocked' : 45
,'InvalidParameters' : 46
,'PublicMessageRejected' : 47
,'UserKickedFromServer' : 48
,'LanguageFilterNotFound' : 49
,'InvalidCryptoState' : 50
,'FloodingFilterNotFound' : 51
,'ConnectionFailed' : 52
,'MultipleZonesFound' : 53
,'MultipleRoomsFound' : 54
}

//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftEsNumber = function(args){
this.value = null
if( args != null ){if (null != args.value)
this.value = args.value
}}
ThriftEsNumber.prototype = {}
ThriftEsNumber.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.DOUBLE) {
      var rtmp = input.readDouble()
this.value = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftEsNumber.prototype.write = function(output){ 
output.writeStructBegin('ThriftEsNumber')
if (null != this.value) {
  output.writeFieldBegin('value', Thrift.Type.DOUBLE, 1)
  output.writeDouble(this.value)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftEvictUserFromRoomRequest = function(args){
this.zoneId = null
this.roomId = null
this.userName = null
this.reason = null
this.ban = null
this.duration = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.userName)
this.userName = args.userName
if (null != args.reason)
this.reason = args.reason
if (null != args.ban)
this.ban = args.ban
if (null != args.duration)
this.duration = args.duration
}}
ThriftEvictUserFromRoomRequest.prototype = {}
ThriftEvictUserFromRoomRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.userName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.reason = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.ban = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.duration = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftEvictUserFromRoomRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftEvictUserFromRoomRequest')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.userName) {
  output.writeFieldBegin('userName', Thrift.Type.STRING, 3)
  output.writeString(this.userName)
  output.writeFieldEnd()
}
if (null != this.reason) {
  output.writeFieldBegin('reason', Thrift.Type.STRING, 4)
  output.writeString(this.reason)
  output.writeFieldEnd()
}
if (null != this.ban) {
  output.writeFieldBegin('ban', Thrift.Type.BOOL, 5)
  output.writeBool(this.ban)
  output.writeFieldEnd()
}
if (null != this.duration) {
  output.writeFieldBegin('duration', Thrift.Type.I32, 6)
  output.writeI32(this.duration)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftFindGamesRequest = function(args){
this.searchCriteria = new ThriftSearchCriteria()
if( args != null ){if (null != args.searchCriteria)
this.searchCriteria = args.searchCriteria
}}
ThriftFindGamesRequest.prototype = {}
ThriftFindGamesRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRUCT) {
      this.searchCriteria = new ThriftSearchCriteria()
      this.searchCriteria.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftFindGamesRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftFindGamesRequest')
if (null != this.searchCriteria) {
  output.writeFieldBegin('searchCriteria', Thrift.Type.STRUCT, 1)
  this.searchCriteria.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftFindGamesResponse = function(args){
this.games = null
if( args != null ){if (null != args.games)
this.games = args.games
}}
ThriftFindGamesResponse.prototype = {}
ThriftFindGamesResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.games = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          elem5 = new ThriftServerGame()
          elem5.read(input)
          this.games.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftFindGamesResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftFindGamesResponse')
if (null != this.games) {
  output.writeFieldBegin('games', Thrift.Type.LIST, 1)
  {
    output.writeListBegin(Thrift.Type.STRUCT, this.games.length)
    {
      for(var iter6 in this.games)
      {
        iter6=this.games[iter6]
        iter6.write(output)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftFindZoneAndRoomByNameRequest = function(args){
this.zoneName = null
this.roomName = null
if( args != null ){if (null != args.zoneName)
this.zoneName = args.zoneName
if (null != args.roomName)
this.roomName = args.roomName
}}
ThriftFindZoneAndRoomByNameRequest.prototype = {}
ThriftFindZoneAndRoomByNameRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.zoneName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.roomName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftFindZoneAndRoomByNameRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftFindZoneAndRoomByNameRequest')
if (null != this.zoneName) {
  output.writeFieldBegin('zoneName', Thrift.Type.STRING, 1)
  output.writeString(this.zoneName)
  output.writeFieldEnd()
}
if (null != this.roomName) {
  output.writeFieldBegin('roomName', Thrift.Type.STRING, 2)
  output.writeString(this.roomName)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftFindZoneAndRoomByNameResponse = function(args){
this.roomAndZoneList = null
if( args != null ){if (null != args.roomAndZoneList)
this.roomAndZoneList = args.roomAndZoneList
}}
ThriftFindZoneAndRoomByNameResponse.prototype = {}
ThriftFindZoneAndRoomByNameResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.roomAndZoneList = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          {
            var _size6 = 0
            var rtmp3
            elem5 = []
            var _etype9 = 0
            rtmp3 = input.readListBegin()
            _etype9 = rtmp3.etype
            _size6 = rtmp3.size
            for (var _i10 = 0; _i10 < _size6; ++_i10)
            {
              var elem11 = null
              var rtmp = input.readI32()
elem11 = rtmp.value
              elem5.push(elem11)
            }
            input.readListEnd()
          }
          this.roomAndZoneList.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftFindZoneAndRoomByNameResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftFindZoneAndRoomByNameResponse')
if (null != this.roomAndZoneList) {
  output.writeFieldBegin('roomAndZoneList', Thrift.Type.LIST, 1)
  {
    output.writeListBegin(Thrift.Type.LIST, this.roomAndZoneList.length)
    {
      for(var iter12 in this.roomAndZoneList)
      {
        iter12=this.roomAndZoneList[iter12]
        {
          output.writeListBegin(Thrift.Type.I32, iter12.length)
          {
            for(var iter13 in iter12)
            {
              iter13=iter12[iter13]
              output.writeI32(iter13)
            }
          }
          output.writeListEnd()
        }
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftFlattenedEsObjectRO = function(args){
this.encodedEntries = null
if( args != null ){if (null != args.encodedEntries)
this.encodedEntries = args.encodedEntries
}}
ThriftFlattenedEsObjectRO.prototype = {}
ThriftFlattenedEsObjectRO.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.encodedEntries = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          var rtmp = input.readByte()
elem5 = rtmp.value
          this.encodedEntries.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftFlattenedEsObjectRO.prototype.write = function(output){ 
output.writeStructBegin('ThriftFlattenedEsObjectRO')
if (null != this.encodedEntries) {
  output.writeFieldBegin('encodedEntries', Thrift.Type.LIST, 1)
  {
    output.writeListBegin(Thrift.Type.BYTE, this.encodedEntries.length)
    {
      for(var iter6 in this.encodedEntries)
      {
        iter6=this.encodedEntries[iter6]
        output.writeByte(iter6)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftFlattenedEsObject = function(args){
this.encodedEntries = null
if( args != null ){if (null != args.encodedEntries)
this.encodedEntries = args.encodedEntries
}}
ThriftFlattenedEsObject.prototype = {}
ThriftFlattenedEsObject.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.encodedEntries = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          var rtmp = input.readByte()
elem5 = rtmp.value
          this.encodedEntries.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftFlattenedEsObject.prototype.write = function(output){ 
output.writeStructBegin('ThriftFlattenedEsObject')
if (null != this.encodedEntries) {
  output.writeFieldBegin('encodedEntries', Thrift.Type.LIST, 1)
  {
    output.writeListBegin(Thrift.Type.BYTE, this.encodedEntries.length)
    {
      for(var iter6 in this.encodedEntries)
      {
        iter6=this.encodedEntries[iter6]
        output.writeByte(iter6)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftGatewayKickUserRequest = function(args){
this.clientId = null
this.error = null
this.esObject = new ThriftFlattenedEsObjectRO()
if( args != null ){if (null != args.clientId)
this.clientId = args.clientId
if (null != args.error)
this.error = args.error
if (null != args.esObject)
this.esObject = args.esObject
}}
ThriftGatewayKickUserRequest.prototype = {}
ThriftGatewayKickUserRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I64) {
      var rtmp = input.readI64()
this.clientId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.error = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRUCT) {
      this.esObject = new ThriftFlattenedEsObjectRO()
      this.esObject.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftGatewayKickUserRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftGatewayKickUserRequest')
if (null != this.clientId) {
  output.writeFieldBegin('clientId', Thrift.Type.I64, 1)
  output.writeI64(this.clientId)
  output.writeFieldEnd()
}
if (null != this.error) {
  output.writeFieldBegin('error', Thrift.Type.I32, 2)
  output.writeI32(this.error)
  output.writeFieldEnd()
}
if (null != this.esObject) {
  output.writeFieldBegin('esObject', Thrift.Type.STRUCT, 3)
  this.esObject.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftGatewayStatistics = function(args){
this.bytesInTotal = null
this.bytesOutTotal = null
this.messagesInTotal = null
this.messagesOutTotal = null
if( args != null ){if (null != args.bytesInTotal)
this.bytesInTotal = args.bytesInTotal
if (null != args.bytesOutTotal)
this.bytesOutTotal = args.bytesOutTotal
if (null != args.messagesInTotal)
this.messagesInTotal = args.messagesInTotal
if (null != args.messagesOutTotal)
this.messagesOutTotal = args.messagesOutTotal
}}
ThriftGatewayStatistics.prototype = {}
ThriftGatewayStatistics.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I64) {
      var rtmp = input.readI64()
this.bytesInTotal = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I64) {
      var rtmp = input.readI64()
this.bytesOutTotal = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I64) {
      var rtmp = input.readI64()
this.messagesInTotal = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.I64) {
      var rtmp = input.readI64()
this.messagesOutTotal = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftGatewayStatistics.prototype.write = function(output){ 
output.writeStructBegin('ThriftGatewayStatistics')
if (null != this.bytesInTotal) {
  output.writeFieldBegin('bytesInTotal', Thrift.Type.I64, 1)
  output.writeI64(this.bytesInTotal)
  output.writeFieldEnd()
}
if (null != this.bytesOutTotal) {
  output.writeFieldBegin('bytesOutTotal', Thrift.Type.I64, 2)
  output.writeI64(this.bytesOutTotal)
  output.writeFieldEnd()
}
if (null != this.messagesInTotal) {
  output.writeFieldBegin('messagesInTotal', Thrift.Type.I64, 3)
  output.writeI64(this.messagesInTotal)
  output.writeFieldEnd()
}
if (null != this.messagesOutTotal) {
  output.writeFieldBegin('messagesOutTotal', Thrift.Type.I64, 4)
  output.writeI64(this.messagesOutTotal)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftGenericErrorResponse = function(args){
this.requestMessageType = null
this.errorType = null
this.extraData = new ThriftFlattenedEsObject()
if( args != null ){if (null != args.requestMessageType)
this.requestMessageType = args.requestMessageType
if (null != args.errorType)
this.errorType = args.errorType
if (null != args.extraData)
this.extraData = args.extraData
}}
ThriftGenericErrorResponse.prototype = {}
ThriftGenericErrorResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.requestMessageType = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.errorType = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRUCT) {
      this.extraData = new ThriftFlattenedEsObject()
      this.extraData.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftGenericErrorResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftGenericErrorResponse')
if (null != this.requestMessageType) {
  output.writeFieldBegin('requestMessageType', Thrift.Type.I32, 1)
  output.writeI32(this.requestMessageType)
  output.writeFieldEnd()
}
if (null != this.errorType) {
  output.writeFieldBegin('errorType', Thrift.Type.I32, 2)
  output.writeI32(this.errorType)
  output.writeFieldEnd()
}
if (null != this.extraData) {
  output.writeFieldBegin('extraData', Thrift.Type.STRUCT, 3)
  this.extraData.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftGetRoomsInZoneRequest = function(args){
this.zoneId = null
this.zoneName = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.zoneName)
this.zoneName = args.zoneName
}}
ThriftGetRoomsInZoneRequest.prototype = {}
ThriftGetRoomsInZoneRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.zoneName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftGetRoomsInZoneRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftGetRoomsInZoneRequest')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.zoneName) {
  output.writeFieldBegin('zoneName', Thrift.Type.STRING, 2)
  output.writeString(this.zoneName)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftGetRoomsInZoneResponse = function(args){
this.zoneId = null
this.zoneName = null
this.entries = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.zoneName)
this.zoneName = args.zoneName
if (null != args.entries)
this.entries = args.entries
}}
ThriftGetRoomsInZoneResponse.prototype = {}
ThriftGetRoomsInZoneResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.zoneName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.entries = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          elem5 = new ThriftRoomListEntry()
          elem5.read(input)
          this.entries.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftGetRoomsInZoneResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftGetRoomsInZoneResponse')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.zoneName) {
  output.writeFieldBegin('zoneName', Thrift.Type.STRING, 2)
  output.writeString(this.zoneName)
  output.writeFieldEnd()
}
if (null != this.entries) {
  output.writeFieldBegin('entries', Thrift.Type.LIST, 3)
  {
    output.writeListBegin(Thrift.Type.STRUCT, this.entries.length)
    {
      for(var iter6 in this.entries)
      {
        iter6=this.entries[iter6]
        iter6.write(output)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftGetServerLocalTimeRequest = function(args){
}
ThriftGetServerLocalTimeRequest.prototype = {}
ThriftGetServerLocalTimeRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftGetServerLocalTimeRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftGetServerLocalTimeRequest')
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftGetServerLocalTimeResponse = function(args){
this.serverLocalTimeInMilliseconds = null
if( args != null ){if (null != args.serverLocalTimeInMilliseconds)
this.serverLocalTimeInMilliseconds = args.serverLocalTimeInMilliseconds
}}
ThriftGetServerLocalTimeResponse.prototype = {}
ThriftGetServerLocalTimeResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I64) {
      var rtmp = input.readI64()
this.serverLocalTimeInMilliseconds = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftGetServerLocalTimeResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftGetServerLocalTimeResponse')
if (null != this.serverLocalTimeInMilliseconds) {
  output.writeFieldBegin('serverLocalTimeInMilliseconds', Thrift.Type.I64, 1)
  output.writeI64(this.serverLocalTimeInMilliseconds)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftGetUserCountRequest = function(args){
}
ThriftGetUserCountRequest.prototype = {}
ThriftGetUserCountRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftGetUserCountRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftGetUserCountRequest')
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftGetUserCountResponse = function(args){
this.count = null
if( args != null ){if (null != args.count)
this.count = args.count
}}
ThriftGetUserCountResponse.prototype = {}
ThriftGetUserCountResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.count = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftGetUserCountResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftGetUserCountResponse')
if (null != this.count) {
  output.writeFieldBegin('count', Thrift.Type.I32, 1)
  output.writeI32(this.count)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftGetUserVariablesRequest = function(args){
this.userName = null
this.userVariableNames = null
if( args != null ){if (null != args.userName)
this.userName = args.userName
if (null != args.userVariableNames)
this.userVariableNames = args.userVariableNames
}}
ThriftGetUserVariablesRequest.prototype = {}
ThriftGetUserVariablesRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.userName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.SET) {
      {
        var _size0 = 0
        var rtmp3
        this.userVariableNames = []
        var _etype3 = 0
        rtmp3 = input.readSetBegin()
        _etype3= rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          var rtmp = input.readString()
elem5 = rtmp.value
          this.userVariableNames.push(elem5)
        }
        input.readSetEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftGetUserVariablesRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftGetUserVariablesRequest')
if (null != this.userName) {
  output.writeFieldBegin('userName', Thrift.Type.STRING, 1)
  output.writeString(this.userName)
  output.writeFieldEnd()
}
if (null != this.userVariableNames) {
  output.writeFieldBegin('userVariableNames', Thrift.Type.SET, 2)
  {
    output.writeSetBegin(Thrift.Type.STRING, this.userVariableNames.length)
    {
      for(var iter6 in this.userVariableNames)
      {
        iter6=this.userVariableNames[iter6]
        output.writeString(iter6)
      }
    }
    output.writeSetEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftGetUserVariablesResponse = function(args){
this.userName = null
this.userVariables = null
if( args != null ){if (null != args.userName)
this.userName = args.userName
if (null != args.userVariables)
this.userVariables = args.userVariables
}}
ThriftGetUserVariablesResponse.prototype = {}
ThriftGetUserVariablesResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.userName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.MAP) {
      {
        var _size0 = 0
        var rtmp3
        this.userVariables = {}
        var _ktype1 = 0
        var _vtype2 = 0
        rtmp3 = input.readMapBegin()
        _ktype1= rtmp3.ktype
        _vtype2= rtmp3.vtype
        _size0= rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          key5 = null
          val6 = null
          var rtmp = input.readString()
key5 = rtmp.value
          val6 = new ThriftFlattenedEsObject()
          val6.read(input)
          this.userVariables[key5] = val6
        }
        input.readMapEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftGetUserVariablesResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftGetUserVariablesResponse')
if (null != this.userName) {
  output.writeFieldBegin('userName', Thrift.Type.STRING, 1)
  output.writeString(this.userName)
  output.writeFieldEnd()
}
if (null != this.userVariables) {
  output.writeFieldBegin('userVariables', Thrift.Type.MAP, 2)
  {
    output.writeMapBegin(Thrift.Type.STRING, Thrift.Type.STRUCT, this.userVariables.length)
    {
      for(var kiter7 in this.userVariables)      {
        var viter8 = this.userVariables[kiter7]
        output.writeString(kiter7)
        viter8.write(output)
      }
    }
    output.writeMapEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftGetUsersInRoomRequest = function(args){
this.zoneId = null
this.roomId = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
}}
ThriftGetUsersInRoomRequest.prototype = {}
ThriftGetUsersInRoomRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftGetUsersInRoomRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftGetUsersInRoomRequest')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftGetUsersInRoomResponse = function(args){
this.zoneId = null
this.roomId = null
this.users = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.users)
this.users = args.users
}}
ThriftGetUsersInRoomResponse.prototype = {}
ThriftGetUsersInRoomResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.users = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          elem5 = new ThriftUserListEntry()
          elem5.read(input)
          this.users.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftGetUsersInRoomResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftGetUsersInRoomResponse')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.users) {
  output.writeFieldBegin('users', Thrift.Type.LIST, 3)
  {
    output.writeListBegin(Thrift.Type.STRUCT, this.users.length)
    {
      for(var iter6 in this.users)
      {
        iter6=this.users[iter6]
        iter6.write(output)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftGetZonesRequest = function(args){
}
ThriftGetZonesRequest.prototype = {}
ThriftGetZonesRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftGetZonesRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftGetZonesRequest')
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftGetZonesResponse = function(args){
this.zones = null
if( args != null ){if (null != args.zones)
this.zones = args.zones
}}
ThriftGetZonesResponse.prototype = {}
ThriftGetZonesResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.zones = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          elem5 = new ThriftZoneListEntry()
          elem5.read(input)
          this.zones.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftGetZonesResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftGetZonesResponse')
if (null != this.zones) {
  output.writeFieldBegin('zones', Thrift.Type.LIST, 1)
  {
    output.writeListBegin(Thrift.Type.STRUCT, this.zones.length)
    {
      for(var iter6 in this.zones)
      {
        iter6=this.zones[iter6]
        iter6.write(output)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftJoinGameRequest = function(args){
this.gameId = null
this.password = null
if( args != null ){if (null != args.gameId)
this.gameId = args.gameId
if (null != args.password)
this.password = args.password
}}
ThriftJoinGameRequest.prototype = {}
ThriftJoinGameRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.gameId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.password = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftJoinGameRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftJoinGameRequest')
if (null != this.gameId) {
  output.writeFieldBegin('gameId', Thrift.Type.I32, 1)
  output.writeI32(this.gameId)
  output.writeFieldEnd()
}
if (null != this.password) {
  output.writeFieldBegin('password', Thrift.Type.STRING, 2)
  output.writeString(this.password)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftJoinRoomEvent = function(args){
this.zoneId = null
this.roomId = null
this.roomName = null
this.roomDescription = null
this.hasPassword = null
this.hidden = null
this.capacity = null
this.users = null
this.roomVariables = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.roomName)
this.roomName = args.roomName
if (null != args.roomDescription)
this.roomDescription = args.roomDescription
if (null != args.hasPassword)
this.hasPassword = args.hasPassword
if (null != args.hidden)
this.hidden = args.hidden
if (null != args.capacity)
this.capacity = args.capacity
if (null != args.users)
this.users = args.users
if (null != args.roomVariables)
this.roomVariables = args.roomVariables
}}
ThriftJoinRoomEvent.prototype = {}
ThriftJoinRoomEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.roomName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.roomDescription = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.hasPassword = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.hidden = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 7:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.capacity = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 8:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.users = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          elem5 = new ThriftUserListEntry()
          elem5.read(input)
          this.users.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    case 9:    if (ftype == Thrift.Type.LIST) {
      {
        var _size6 = 0
        var rtmp3
        this.roomVariables = []
        var _etype9 = 0
        rtmp3 = input.readListBegin()
        _etype9 = rtmp3.etype
        _size6 = rtmp3.size
        for (var _i10 = 0; _i10 < _size6; ++_i10)
        {
          var elem11 = null
          elem11 = new ThriftRoomVariable()
          elem11.read(input)
          this.roomVariables.push(elem11)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftJoinRoomEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftJoinRoomEvent')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.roomName) {
  output.writeFieldBegin('roomName', Thrift.Type.STRING, 3)
  output.writeString(this.roomName)
  output.writeFieldEnd()
}
if (null != this.roomDescription) {
  output.writeFieldBegin('roomDescription', Thrift.Type.STRING, 4)
  output.writeString(this.roomDescription)
  output.writeFieldEnd()
}
if (null != this.hasPassword) {
  output.writeFieldBegin('hasPassword', Thrift.Type.BOOL, 5)
  output.writeBool(this.hasPassword)
  output.writeFieldEnd()
}
if (null != this.hidden) {
  output.writeFieldBegin('hidden', Thrift.Type.BOOL, 6)
  output.writeBool(this.hidden)
  output.writeFieldEnd()
}
if (null != this.capacity) {
  output.writeFieldBegin('capacity', Thrift.Type.I32, 7)
  output.writeI32(this.capacity)
  output.writeFieldEnd()
}
if (null != this.users) {
  output.writeFieldBegin('users', Thrift.Type.LIST, 8)
  {
    output.writeListBegin(Thrift.Type.STRUCT, this.users.length)
    {
      for(var iter12 in this.users)
      {
        iter12=this.users[iter12]
        iter12.write(output)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
if (null != this.roomVariables) {
  output.writeFieldBegin('roomVariables', Thrift.Type.LIST, 9)
  {
    output.writeListBegin(Thrift.Type.STRUCT, this.roomVariables.length)
    {
      for(var iter13 in this.roomVariables)
      {
        iter13=this.roomVariables[iter13]
        iter13.write(output)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftJoinRoomRequest = function(args){
this.zoneName = null
this.roomName = null
this.zoneId = null
this.roomId = null
this.password = null
this.receivingRoomListUpdates = null
this.receivingRoomAttributeUpdates = null
this.receivingUserListUpdates = null
this.receivingUserVariableUpdates = null
this.receivingRoomVariableUpdates = null
this.receivingVideoEvents = null
if( args != null ){if (null != args.zoneName)
this.zoneName = args.zoneName
if (null != args.roomName)
this.roomName = args.roomName
if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.password)
this.password = args.password
if (null != args.receivingRoomListUpdates)
this.receivingRoomListUpdates = args.receivingRoomListUpdates
if (null != args.receivingRoomAttributeUpdates)
this.receivingRoomAttributeUpdates = args.receivingRoomAttributeUpdates
if (null != args.receivingUserListUpdates)
this.receivingUserListUpdates = args.receivingUserListUpdates
if (null != args.receivingUserVariableUpdates)
this.receivingUserVariableUpdates = args.receivingUserVariableUpdates
if (null != args.receivingRoomVariableUpdates)
this.receivingRoomVariableUpdates = args.receivingRoomVariableUpdates
if (null != args.receivingVideoEvents)
this.receivingVideoEvents = args.receivingVideoEvents
}}
ThriftJoinRoomRequest.prototype = {}
ThriftJoinRoomRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.zoneName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.roomName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.password = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.receivingRoomListUpdates = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 7:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.receivingRoomAttributeUpdates = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 8:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.receivingUserListUpdates = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 9:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.receivingUserVariableUpdates = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 10:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.receivingRoomVariableUpdates = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 11:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.receivingVideoEvents = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftJoinRoomRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftJoinRoomRequest')
if (null != this.zoneName) {
  output.writeFieldBegin('zoneName', Thrift.Type.STRING, 1)
  output.writeString(this.zoneName)
  output.writeFieldEnd()
}
if (null != this.roomName) {
  output.writeFieldBegin('roomName', Thrift.Type.STRING, 2)
  output.writeString(this.roomName)
  output.writeFieldEnd()
}
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 3)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 4)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.password) {
  output.writeFieldBegin('password', Thrift.Type.STRING, 5)
  output.writeString(this.password)
  output.writeFieldEnd()
}
if (null != this.receivingRoomListUpdates) {
  output.writeFieldBegin('receivingRoomListUpdates', Thrift.Type.BOOL, 6)
  output.writeBool(this.receivingRoomListUpdates)
  output.writeFieldEnd()
}
if (null != this.receivingRoomAttributeUpdates) {
  output.writeFieldBegin('receivingRoomAttributeUpdates', Thrift.Type.BOOL, 7)
  output.writeBool(this.receivingRoomAttributeUpdates)
  output.writeFieldEnd()
}
if (null != this.receivingUserListUpdates) {
  output.writeFieldBegin('receivingUserListUpdates', Thrift.Type.BOOL, 8)
  output.writeBool(this.receivingUserListUpdates)
  output.writeFieldEnd()
}
if (null != this.receivingUserVariableUpdates) {
  output.writeFieldBegin('receivingUserVariableUpdates', Thrift.Type.BOOL, 9)
  output.writeBool(this.receivingUserVariableUpdates)
  output.writeFieldEnd()
}
if (null != this.receivingRoomVariableUpdates) {
  output.writeFieldBegin('receivingRoomVariableUpdates', Thrift.Type.BOOL, 10)
  output.writeBool(this.receivingRoomVariableUpdates)
  output.writeFieldEnd()
}
if (null != this.receivingVideoEvents) {
  output.writeFieldBegin('receivingVideoEvents', Thrift.Type.BOOL, 11)
  output.writeBool(this.receivingVideoEvents)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftJoinZoneEvent = function(args){
this.zoneId = null
this.zoneName = null
this.rooms = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.zoneName)
this.zoneName = args.zoneName
if (null != args.rooms)
this.rooms = args.rooms
}}
ThriftJoinZoneEvent.prototype = {}
ThriftJoinZoneEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.zoneName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.rooms = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          elem5 = new ThriftRoomListEntry()
          elem5.read(input)
          this.rooms.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftJoinZoneEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftJoinZoneEvent')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.zoneName) {
  output.writeFieldBegin('zoneName', Thrift.Type.STRING, 2)
  output.writeString(this.zoneName)
  output.writeFieldEnd()
}
if (null != this.rooms) {
  output.writeFieldBegin('rooms', Thrift.Type.LIST, 3)
  {
    output.writeListBegin(Thrift.Type.STRUCT, this.rooms.length)
    {
      for(var iter6 in this.rooms)
      {
        iter6=this.rooms[iter6]
        iter6.write(output)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftLeaveRoomEvent = function(args){
this.zoneId = null
this.roomId = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
}}
ThriftLeaveRoomEvent.prototype = {}
ThriftLeaveRoomEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftLeaveRoomEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftLeaveRoomEvent')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftLeaveRoomRequest = function(args){
this.zoneId = null
this.roomId = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
}}
ThriftLeaveRoomRequest.prototype = {}
ThriftLeaveRoomRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftLeaveRoomRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftLeaveRoomRequest')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftLeaveZoneEvent = function(args){
this.zoneId = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
}}
ThriftLeaveZoneEvent.prototype = {}
ThriftLeaveZoneEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftLeaveZoneEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftLeaveZoneEvent')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftLogOutRequest = function(args){
this.dropConnection = null
this.dropAllConnections = null
if( args != null ){if (null != args.dropConnection)
this.dropConnection = args.dropConnection
if (null != args.dropAllConnections)
this.dropAllConnections = args.dropAllConnections
}}
ThriftLogOutRequest.prototype = {}
ThriftLogOutRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.dropConnection = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.dropAllConnections = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftLogOutRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftLogOutRequest')
if (null != this.dropConnection) {
  output.writeFieldBegin('dropConnection', Thrift.Type.BOOL, 1)
  output.writeBool(this.dropConnection)
  output.writeFieldEnd()
}
if (null != this.dropAllConnections) {
  output.writeFieldBegin('dropAllConnections', Thrift.Type.BOOL, 2)
  output.writeBool(this.dropAllConnections)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftLoginRequest = function(args){
this.userName = null
this.password = null
this.sharedSecret = null
this.esObject = new ThriftFlattenedEsObjectRO()
this.userVariables = null
this.protocol = null
this.hashId = null
this.remoteAddress = null
if( args != null ){if (null != args.userName)
this.userName = args.userName
if (null != args.password)
this.password = args.password
if (null != args.sharedSecret)
this.sharedSecret = args.sharedSecret
if (null != args.esObject)
this.esObject = args.esObject
if (null != args.userVariables)
this.userVariables = args.userVariables
if (null != args.protocol)
this.protocol = args.protocol
if (null != args.hashId)
this.hashId = args.hashId
if (null != args.remoteAddress)
this.remoteAddress = args.remoteAddress
}}
ThriftLoginRequest.prototype = {}
ThriftLoginRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.userName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.password = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.sharedSecret = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.STRUCT) {
      this.esObject = new ThriftFlattenedEsObjectRO()
      this.esObject.read(input)
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.MAP) {
      {
        var _size0 = 0
        var rtmp3
        this.userVariables = {}
        var _ktype1 = 0
        var _vtype2 = 0
        rtmp3 = input.readMapBegin()
        _ktype1= rtmp3.ktype
        _vtype2= rtmp3.vtype
        _size0= rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          key5 = null
          val6 = null
          var rtmp = input.readString()
key5 = rtmp.value
          val6 = new ThriftFlattenedEsObject()
          val6.read(input)
          this.userVariables[key5] = val6
        }
        input.readMapEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.protocol = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 7:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.hashId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 8:    if (ftype == Thrift.Type.LIST) {
      {
        var _size7 = 0
        var rtmp3
        this.remoteAddress = []
        var _etype10 = 0
        rtmp3 = input.readListBegin()
        _etype10 = rtmp3.etype
        _size7 = rtmp3.size
        for (var _i11 = 0; _i11 < _size7; ++_i11)
        {
          var elem12 = null
          var rtmp = input.readByte()
elem12 = rtmp.value
          this.remoteAddress.push(elem12)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftLoginRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftLoginRequest')
if (null != this.userName) {
  output.writeFieldBegin('userName', Thrift.Type.STRING, 1)
  output.writeString(this.userName)
  output.writeFieldEnd()
}
if (null != this.password) {
  output.writeFieldBegin('password', Thrift.Type.STRING, 2)
  output.writeString(this.password)
  output.writeFieldEnd()
}
if (null != this.sharedSecret) {
  output.writeFieldBegin('sharedSecret', Thrift.Type.STRING, 3)
  output.writeString(this.sharedSecret)
  output.writeFieldEnd()
}
if (null != this.esObject) {
  output.writeFieldBegin('esObject', Thrift.Type.STRUCT, 4)
  this.esObject.write(output)
  output.writeFieldEnd()
}
if (null != this.userVariables) {
  output.writeFieldBegin('userVariables', Thrift.Type.MAP, 5)
  {
    output.writeMapBegin(Thrift.Type.STRING, Thrift.Type.STRUCT, this.userVariables.length)
    {
      for(var kiter13 in this.userVariables)      {
        var viter14 = this.userVariables[kiter13]
        output.writeString(kiter13)
        viter14.write(output)
      }
    }
    output.writeMapEnd()
  }
  output.writeFieldEnd()
}
if (null != this.protocol) {
  output.writeFieldBegin('protocol', Thrift.Type.I32, 6)
  output.writeI32(this.protocol)
  output.writeFieldEnd()
}
if (null != this.hashId) {
  output.writeFieldBegin('hashId', Thrift.Type.I32, 7)
  output.writeI32(this.hashId)
  output.writeFieldEnd()
}
if (null != this.remoteAddress) {
  output.writeFieldBegin('remoteAddress', Thrift.Type.LIST, 8)
  {
    output.writeListBegin(Thrift.Type.BYTE, this.remoteAddress.length)
    {
      for(var iter15 in this.remoteAddress)
      {
        iter15=this.remoteAddress[iter15]
        output.writeByte(iter15)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftLoginResponse = function(args){
this.successful = null
this.error = null
this.esObject = new ThriftFlattenedEsObjectRO()
this.userName = null
this.userVariables = null
this.buddyListEntries = null
if( args != null ){if (null != args.successful)
this.successful = args.successful
if (null != args.error)
this.error = args.error
if (null != args.esObject)
this.esObject = args.esObject
if (null != args.userName)
this.userName = args.userName
if (null != args.userVariables)
this.userVariables = args.userVariables
if (null != args.buddyListEntries)
this.buddyListEntries = args.buddyListEntries
}}
ThriftLoginResponse.prototype = {}
ThriftLoginResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.successful = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.error = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRUCT) {
      this.esObject = new ThriftFlattenedEsObjectRO()
      this.esObject.read(input)
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.userName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.MAP) {
      {
        var _size0 = 0
        var rtmp3
        this.userVariables = {}
        var _ktype1 = 0
        var _vtype2 = 0
        rtmp3 = input.readMapBegin()
        _ktype1= rtmp3.ktype
        _vtype2= rtmp3.vtype
        _size0= rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          key5 = null
          val6 = null
          var rtmp = input.readString()
key5 = rtmp.value
          val6 = new ThriftFlattenedEsObjectRO()
          val6.read(input)
          this.userVariables[key5] = val6
        }
        input.readMapEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.MAP) {
      {
        var _size7 = 0
        var rtmp3
        this.buddyListEntries = {}
        var _ktype8 = 0
        var _vtype9 = 0
        rtmp3 = input.readMapBegin()
        _ktype8= rtmp3.ktype
        _vtype9= rtmp3.vtype
        _size7= rtmp3.size
        for (var _i11 = 0; _i11 < _size7; ++_i11)
        {
          key12 = null
          val13 = null
          var rtmp = input.readString()
key12 = rtmp.value
          val13 = new ThriftFlattenedEsObjectRO()
          val13.read(input)
          this.buddyListEntries[key12] = val13
        }
        input.readMapEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftLoginResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftLoginResponse')
if (null != this.successful) {
  output.writeFieldBegin('successful', Thrift.Type.BOOL, 1)
  output.writeBool(this.successful)
  output.writeFieldEnd()
}
if (null != this.error) {
  output.writeFieldBegin('error', Thrift.Type.I32, 2)
  output.writeI32(this.error)
  output.writeFieldEnd()
}
if (null != this.esObject) {
  output.writeFieldBegin('esObject', Thrift.Type.STRUCT, 3)
  this.esObject.write(output)
  output.writeFieldEnd()
}
if (null != this.userName) {
  output.writeFieldBegin('userName', Thrift.Type.STRING, 4)
  output.writeString(this.userName)
  output.writeFieldEnd()
}
if (null != this.userVariables) {
  output.writeFieldBegin('userVariables', Thrift.Type.MAP, 5)
  {
    output.writeMapBegin(Thrift.Type.STRING, Thrift.Type.STRUCT, this.userVariables.length)
    {
      for(var kiter14 in this.userVariables)      {
        var viter15 = this.userVariables[kiter14]
        output.writeString(kiter14)
        viter15.write(output)
      }
    }
    output.writeMapEnd()
  }
  output.writeFieldEnd()
}
if (null != this.buddyListEntries) {
  output.writeFieldBegin('buddyListEntries', Thrift.Type.MAP, 6)
  {
    output.writeMapBegin(Thrift.Type.STRING, Thrift.Type.STRUCT, this.buddyListEntries.length)
    {
      for(var kiter16 in this.buddyListEntries)      {
        var viter17 = this.buddyListEntries[kiter16]
        output.writeString(kiter16)
        viter17.write(output)
      }
    }
    output.writeMapEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftMessageType = { 
'CrossDomainRequest' : 1
,'CreateRoomRequest' : 2
,'JoinRoomRequest' : 3
,'LoginRequest' : 4
,'LogOutRequest' : 5
,'ValidateAdditionalLoginRequest' : 6
,'ValidateAdditionalLoginResponse' : 7
,'PublicMessageRequest' : 8
,'PrivateMessageRequest' : 9
,'LeaveRoomRequest' : 10
,'CreateRoomVariableRequest' : 11
,'DeleteRoomVariableRequest' : 12
,'UpdateRoomVariableRequest' : 13
,'GetZonesRequest' : 14
,'GetRoomsInZoneRequest' : 15
,'UpdateRoomDetailsRequest' : 16
,'AddRoomOperatorRequest' : 17
,'RemoveRoomOperatorRequest' : 18
,'FindZoneAndRoomByNameRequest' : 19
,'GetUsersInRoomRequest' : 20
,'DeleteUserVariableRequest' : 21
,'UpdateUserVariableRequest' : 22
,'AddBuddiesRequest' : 23
,'RemoveBuddiesRequest' : 24
,'EvictUserFromRoomRequest' : 25
,'GetUserCountRequest' : 26
,'PluginRequest' : 27
,'CreateOrJoinGameRequest' : 28
,'JoinGameRequest' : 29
,'FindGamesRequest' : 30
,'GetUserVariablesRequest' : 31
,'AggregatePluginRequest' : 32
,'GetServerLocalTimeRequest' : 33
,'ConnectionResponse' : 34
,'CrossDomainResponse' : 35
,'LoginResponse' : 36
,'GetZonesResponse' : 37
,'GetRoomsInZoneResponse' : 38
,'GenericErrorResponse' : 39
,'FindZoneAndRoomByNameResponse' : 40
,'GetUsersInRoomResponse' : 41
,'GetUserCountResponse' : 42
,'CreateOrJoinGameResponse' : 43
,'FindGamesResponse' : 44
,'GetUserVariablesResponse' : 45
,'AddBuddiesResponse' : 46
,'RemoveBuddiesResponse' : 47
,'GetServerLocalTimeResponse' : 48
,'PublicMessageEvent' : 49
,'PrivateMessageEvent' : 50
,'SessionIdleEvent' : 51
,'JoinRoomEvent' : 52
,'JoinZoneEvent' : 53
,'UserUpdateEvent' : 54
,'ZoneUpdateEvent' : 55
,'LeaveRoomEvent' : 56
,'LeaveZoneEvent' : 57
,'RoomVariableUpdateEvent' : 58
,'UpdateRoomDetailsEvent' : 59
,'BuddyStatusUpdatedEvent' : 60
,'UserEvictedFromRoomEvent' : 61
,'UserVariableUpdateEvent' : 62
,'PluginMessageEvent' : 63
,'AggregatePluginMessageEvent' : 64
,'RegistryConnectToPreferredGatewayRequest' : 65
,'DisconnectedEvent' : 66
,'GatewayStartupExceptionsMessage' : 67
,'RegistryLoginResponse' : 68
,'RegistryConnectionResponse' : 69
,'GatewayKickUserRequest' : 70
,'UdpBackchannelEvent' : 71
,'Unknown' : 72
,'RtmpPlayVideo' : 73
,'RtmpEventResponse' : 74
,'RtmpRecordVideo' : 75
,'RtmpPublishVideo' : 76
,'RtmpUnpublishVideo' : 77
,'RtmpAppendVideo' : 78
,'RtmpStreamingStart' : 79
,'RtmpStreamingStop' : 80
,'DHInitiate' : 81
,'DHPublicNumbers' : 82
,'DHSharedModulusRequest' : 83
,'DHSharedModulusResponse' : 84
,'EncryptionStateChange' : 85
,'ConnectionAttemptResponse' : 86
,'ConnectionClosedEvent' : 87
,'RegisterUDPConnectionRequest' : 88
,'RegisterUDPConnectionResponse' : 89
,'RemoveUDPConnectionRequest' : 90
,'RemoveUDPConnectionResponse' : 91
,'PingRequest' : 92
,'PingResponse' : 93
}

//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftPingRequest = function(args){
this.globalResponseRequested = null
this.sessionKey = null
this.pingRequestId = null
if( args != null ){if (null != args.globalResponseRequested)
this.globalResponseRequested = args.globalResponseRequested
if (null != args.sessionKey)
this.sessionKey = args.sessionKey
if (null != args.pingRequestId)
this.pingRequestId = args.pingRequestId
}}
ThriftPingRequest.prototype = {}
ThriftPingRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.globalResponseRequested = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.sessionKey = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.pingRequestId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftPingRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftPingRequest')
if (null != this.globalResponseRequested) {
  output.writeFieldBegin('globalResponseRequested', Thrift.Type.BOOL, 1)
  output.writeBool(this.globalResponseRequested)
  output.writeFieldEnd()
}
if (null != this.sessionKey) {
  output.writeFieldBegin('sessionKey', Thrift.Type.I32, 2)
  output.writeI32(this.sessionKey)
  output.writeFieldEnd()
}
if (null != this.pingRequestId) {
  output.writeFieldBegin('pingRequestId', Thrift.Type.I32, 3)
  output.writeI32(this.pingRequestId)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftPingResponse = function(args){
this.globalResponseRequested = null
this.pingRequestId = null
if( args != null ){if (null != args.globalResponseRequested)
this.globalResponseRequested = args.globalResponseRequested
if (null != args.pingRequestId)
this.pingRequestId = args.pingRequestId
}}
ThriftPingResponse.prototype = {}
ThriftPingResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.globalResponseRequested = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.pingRequestId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftPingResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftPingResponse')
if (null != this.globalResponseRequested) {
  output.writeFieldBegin('globalResponseRequested', Thrift.Type.BOOL, 1)
  output.writeBool(this.globalResponseRequested)
  output.writeFieldEnd()
}
if (null != this.pingRequestId) {
  output.writeFieldBegin('pingRequestId', Thrift.Type.I32, 2)
  output.writeI32(this.pingRequestId)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftPluginListEntry = function(args){
this.extensionName = null
this.pluginName = null
this.pluginHandle = null
this.pluginId = null
this.parameters = new ThriftFlattenedEsObject()
if( args != null ){if (null != args.extensionName)
this.extensionName = args.extensionName
if (null != args.pluginName)
this.pluginName = args.pluginName
if (null != args.pluginHandle)
this.pluginHandle = args.pluginHandle
if (null != args.pluginId)
this.pluginId = args.pluginId
if (null != args.parameters)
this.parameters = args.parameters
}}
ThriftPluginListEntry.prototype = {}
ThriftPluginListEntry.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.extensionName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.pluginName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.pluginHandle = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.pluginId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.STRUCT) {
      this.parameters = new ThriftFlattenedEsObject()
      this.parameters.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftPluginListEntry.prototype.write = function(output){ 
output.writeStructBegin('ThriftPluginListEntry')
if (null != this.extensionName) {
  output.writeFieldBegin('extensionName', Thrift.Type.STRING, 1)
  output.writeString(this.extensionName)
  output.writeFieldEnd()
}
if (null != this.pluginName) {
  output.writeFieldBegin('pluginName', Thrift.Type.STRING, 2)
  output.writeString(this.pluginName)
  output.writeFieldEnd()
}
if (null != this.pluginHandle) {
  output.writeFieldBegin('pluginHandle', Thrift.Type.STRING, 3)
  output.writeString(this.pluginHandle)
  output.writeFieldEnd()
}
if (null != this.pluginId) {
  output.writeFieldBegin('pluginId', Thrift.Type.I32, 4)
  output.writeI32(this.pluginId)
  output.writeFieldEnd()
}
if (null != this.parameters) {
  output.writeFieldBegin('parameters', Thrift.Type.STRUCT, 5)
  this.parameters.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftPluginMessageEvent = function(args){
this.pluginName = null
this.sentToRoom = null
this.destinationZoneId = null
this.destinationRoomId = null
this.roomLevelPlugin = null
this.originZoneId = null
this.originRoomId = null
this.parameters = new ThriftFlattenedEsObject()
if( args != null ){if (null != args.pluginName)
this.pluginName = args.pluginName
if (null != args.sentToRoom)
this.sentToRoom = args.sentToRoom
if (null != args.destinationZoneId)
this.destinationZoneId = args.destinationZoneId
if (null != args.destinationRoomId)
this.destinationRoomId = args.destinationRoomId
if (null != args.roomLevelPlugin)
this.roomLevelPlugin = args.roomLevelPlugin
if (null != args.originZoneId)
this.originZoneId = args.originZoneId
if (null != args.originRoomId)
this.originRoomId = args.originRoomId
if (null != args.parameters)
this.parameters = args.parameters
}}
ThriftPluginMessageEvent.prototype = {}
ThriftPluginMessageEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.pluginName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.sentToRoom = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.destinationZoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.destinationRoomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.roomLevelPlugin = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.originZoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 7:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.originRoomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 8:    if (ftype == Thrift.Type.STRUCT) {
      this.parameters = new ThriftFlattenedEsObject()
      this.parameters.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftPluginMessageEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftPluginMessageEvent')
if (null != this.pluginName) {
  output.writeFieldBegin('pluginName', Thrift.Type.STRING, 1)
  output.writeString(this.pluginName)
  output.writeFieldEnd()
}
if (null != this.sentToRoom) {
  output.writeFieldBegin('sentToRoom', Thrift.Type.BOOL, 2)
  output.writeBool(this.sentToRoom)
  output.writeFieldEnd()
}
if (null != this.destinationZoneId) {
  output.writeFieldBegin('destinationZoneId', Thrift.Type.I32, 3)
  output.writeI32(this.destinationZoneId)
  output.writeFieldEnd()
}
if (null != this.destinationRoomId) {
  output.writeFieldBegin('destinationRoomId', Thrift.Type.I32, 4)
  output.writeI32(this.destinationRoomId)
  output.writeFieldEnd()
}
if (null != this.roomLevelPlugin) {
  output.writeFieldBegin('roomLevelPlugin', Thrift.Type.BOOL, 5)
  output.writeBool(this.roomLevelPlugin)
  output.writeFieldEnd()
}
if (null != this.originZoneId) {
  output.writeFieldBegin('originZoneId', Thrift.Type.I32, 6)
  output.writeI32(this.originZoneId)
  output.writeFieldEnd()
}
if (null != this.originRoomId) {
  output.writeFieldBegin('originRoomId', Thrift.Type.I32, 7)
  output.writeI32(this.originRoomId)
  output.writeFieldEnd()
}
if (null != this.parameters) {
  output.writeFieldBegin('parameters', Thrift.Type.STRUCT, 8)
  this.parameters.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftPluginRequest = function(args){
this.pluginName = null
this.zoneId = null
this.roomId = null
this.sessionKey = null
this.parameters = new ThriftFlattenedEsObject()
if( args != null ){if (null != args.pluginName)
this.pluginName = args.pluginName
if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.sessionKey)
this.sessionKey = args.sessionKey
if (null != args.parameters)
this.parameters = args.parameters
}}
ThriftPluginRequest.prototype = {}
ThriftPluginRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.pluginName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.sessionKey = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.STRUCT) {
      this.parameters = new ThriftFlattenedEsObject()
      this.parameters.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftPluginRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftPluginRequest')
if (null != this.pluginName) {
  output.writeFieldBegin('pluginName', Thrift.Type.STRING, 1)
  output.writeString(this.pluginName)
  output.writeFieldEnd()
}
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 2)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 3)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.sessionKey) {
  output.writeFieldBegin('sessionKey', Thrift.Type.I32, 4)
  output.writeI32(this.sessionKey)
  output.writeFieldEnd()
}
if (null != this.parameters) {
  output.writeFieldBegin('parameters', Thrift.Type.STRUCT, 5)
  this.parameters.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftPrivateMessageEvent = function(args){
this.userName = null
this.message = null
this.esObject = new ThriftFlattenedEsObject()
if( args != null ){if (null != args.userName)
this.userName = args.userName
if (null != args.message)
this.message = args.message
if (null != args.esObject)
this.esObject = args.esObject
}}
ThriftPrivateMessageEvent.prototype = {}
ThriftPrivateMessageEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.userName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.message = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRUCT) {
      this.esObject = new ThriftFlattenedEsObject()
      this.esObject.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftPrivateMessageEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftPrivateMessageEvent')
if (null != this.userName) {
  output.writeFieldBegin('userName', Thrift.Type.STRING, 1)
  output.writeString(this.userName)
  output.writeFieldEnd()
}
if (null != this.message) {
  output.writeFieldBegin('message', Thrift.Type.STRING, 2)
  output.writeString(this.message)
  output.writeFieldEnd()
}
if (null != this.esObject) {
  output.writeFieldBegin('esObject', Thrift.Type.STRUCT, 3)
  this.esObject.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftPrivateMessageRequest = function(args){
this.message = null
this.userNames = null
this.esObject = new ThriftFlattenedEsObject()
if( args != null ){if (null != args.message)
this.message = args.message
if (null != args.userNames)
this.userNames = args.userNames
if (null != args.esObject)
this.esObject = args.esObject
}}
ThriftPrivateMessageRequest.prototype = {}
ThriftPrivateMessageRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.message = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.userNames = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          var rtmp = input.readString()
elem5 = rtmp.value
          this.userNames.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRUCT) {
      this.esObject = new ThriftFlattenedEsObject()
      this.esObject.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftPrivateMessageRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftPrivateMessageRequest')
if (null != this.message) {
  output.writeFieldBegin('message', Thrift.Type.STRING, 1)
  output.writeString(this.message)
  output.writeFieldEnd()
}
if (null != this.userNames) {
  output.writeFieldBegin('userNames', Thrift.Type.LIST, 2)
  {
    output.writeListBegin(Thrift.Type.STRING, this.userNames.length)
    {
      for(var iter6 in this.userNames)
      {
        iter6=this.userNames[iter6]
        output.writeString(iter6)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
if (null != this.esObject) {
  output.writeFieldBegin('esObject', Thrift.Type.STRUCT, 3)
  this.esObject.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftProtocolConfiguration = function(args){
this.messageCompressionThreshold = null
if( args != null ){if (null != args.messageCompressionThreshold)
this.messageCompressionThreshold = args.messageCompressionThreshold
}}
ThriftProtocolConfiguration.prototype = {}
ThriftProtocolConfiguration.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.messageCompressionThreshold = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftProtocolConfiguration.prototype.write = function(output){ 
output.writeStructBegin('ThriftProtocolConfiguration')
if (null != this.messageCompressionThreshold) {
  output.writeFieldBegin('messageCompressionThreshold', Thrift.Type.I32, 1)
  output.writeI32(this.messageCompressionThreshold)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftProtocol = { 
'BinaryTCP' : 1
,'RTMP' : 2
,'BinaryHTTP' : 3
,'TextTCP' : 4
,'BinaryUDP' : 5
}

//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftPublicMessageEvent = function(args){
this.message = null
this.userName = null
this.zoneId = null
this.roomId = null
this.esObject = new ThriftFlattenedEsObject()
if( args != null ){if (null != args.message)
this.message = args.message
if (null != args.userName)
this.userName = args.userName
if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.esObject)
this.esObject = args.esObject
}}
ThriftPublicMessageEvent.prototype = {}
ThriftPublicMessageEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.message = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.userName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.STRUCT) {
      this.esObject = new ThriftFlattenedEsObject()
      this.esObject.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftPublicMessageEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftPublicMessageEvent')
if (null != this.message) {
  output.writeFieldBegin('message', Thrift.Type.STRING, 1)
  output.writeString(this.message)
  output.writeFieldEnd()
}
if (null != this.userName) {
  output.writeFieldBegin('userName', Thrift.Type.STRING, 2)
  output.writeString(this.userName)
  output.writeFieldEnd()
}
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 3)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 4)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.esObject) {
  output.writeFieldBegin('esObject', Thrift.Type.STRUCT, 5)
  this.esObject.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftPublicMessageRequest = function(args){
this.zoneId = null
this.roomId = null
this.message = null
this.esObject = new ThriftFlattenedEsObject()
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.message)
this.message = args.message
if (null != args.esObject)
this.esObject = args.esObject
}}
ThriftPublicMessageRequest.prototype = {}
ThriftPublicMessageRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.message = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.STRUCT) {
      this.esObject = new ThriftFlattenedEsObject()
      this.esObject.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftPublicMessageRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftPublicMessageRequest')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.message) {
  output.writeFieldBegin('message', Thrift.Type.STRING, 3)
  output.writeString(this.message)
  output.writeFieldEnd()
}
if (null != this.esObject) {
  output.writeFieldBegin('esObject', Thrift.Type.STRUCT, 4)
  this.esObject.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftQuickJoinGameRequest = function(args){
this.gameType = null
this.zoneName = null
this.password = null
this.locked = null
this.hidden = null
this.createOnly = null
this.gameDetails = new ThriftFlattenedEsObject()
this.criteria = new ThriftSearchCriteria()
if( args != null ){if (null != args.gameType)
this.gameType = args.gameType
if (null != args.zoneName)
this.zoneName = args.zoneName
if (null != args.password)
this.password = args.password
if (null != args.locked)
this.locked = args.locked
if (null != args.hidden)
this.hidden = args.hidden
if (null != args.createOnly)
this.createOnly = args.createOnly
if (null != args.gameDetails)
this.gameDetails = args.gameDetails
if (null != args.criteria)
this.criteria = args.criteria
}}
ThriftQuickJoinGameRequest.prototype = {}
ThriftQuickJoinGameRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.gameType = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.zoneName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.password = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.locked = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.hidden = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.createOnly = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 7:    if (ftype == Thrift.Type.STRUCT) {
      this.gameDetails = new ThriftFlattenedEsObject()
      this.gameDetails.read(input)
    } else {
      input.skip(ftype)
    }
    break
    case 8:    if (ftype == Thrift.Type.STRUCT) {
      this.criteria = new ThriftSearchCriteria()
      this.criteria.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftQuickJoinGameRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftQuickJoinGameRequest')
if (null != this.gameType) {
  output.writeFieldBegin('gameType', Thrift.Type.STRING, 1)
  output.writeString(this.gameType)
  output.writeFieldEnd()
}
if (null != this.zoneName) {
  output.writeFieldBegin('zoneName', Thrift.Type.STRING, 2)
  output.writeString(this.zoneName)
  output.writeFieldEnd()
}
if (null != this.password) {
  output.writeFieldBegin('password', Thrift.Type.STRING, 3)
  output.writeString(this.password)
  output.writeFieldEnd()
}
if (null != this.locked) {
  output.writeFieldBegin('locked', Thrift.Type.BOOL, 4)
  output.writeBool(this.locked)
  output.writeFieldEnd()
}
if (null != this.hidden) {
  output.writeFieldBegin('hidden', Thrift.Type.BOOL, 5)
  output.writeBool(this.hidden)
  output.writeFieldEnd()
}
if (null != this.createOnly) {
  output.writeFieldBegin('createOnly', Thrift.Type.BOOL, 6)
  output.writeBool(this.createOnly)
  output.writeFieldEnd()
}
if (null != this.gameDetails) {
  output.writeFieldBegin('gameDetails', Thrift.Type.STRUCT, 7)
  this.gameDetails.write(output)
  output.writeFieldEnd()
}
if (null != this.criteria) {
  output.writeFieldBegin('criteria', Thrift.Type.STRUCT, 8)
  this.criteria.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftRegisterUDPConnectionRequest = function(args){
this.port = null
if( args != null ){if (null != args.port)
this.port = args.port
}}
ThriftRegisterUDPConnectionRequest.prototype = {}
ThriftRegisterUDPConnectionRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.port = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftRegisterUDPConnectionRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftRegisterUDPConnectionRequest')
if (null != this.port) {
  output.writeFieldBegin('port', Thrift.Type.I32, 1)
  output.writeI32(this.port)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftRegisterUDPConnectionResponse = function(args){
this.successful = null
this.sessionKey = null
this.error = null
if( args != null ){if (null != args.successful)
this.successful = args.successful
if (null != args.sessionKey)
this.sessionKey = args.sessionKey
if (null != args.error)
this.error = args.error
}}
ThriftRegisterUDPConnectionResponse.prototype = {}
ThriftRegisterUDPConnectionResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.successful = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.sessionKey = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.error = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftRegisterUDPConnectionResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftRegisterUDPConnectionResponse')
if (null != this.successful) {
  output.writeFieldBegin('successful', Thrift.Type.BOOL, 1)
  output.writeBool(this.successful)
  output.writeFieldEnd()
}
if (null != this.sessionKey) {
  output.writeFieldBegin('sessionKey', Thrift.Type.I32, 2)
  output.writeI32(this.sessionKey)
  output.writeFieldEnd()
}
if (null != this.error) {
  output.writeFieldBegin('error', Thrift.Type.I32, 3)
  output.writeI32(this.error)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftRegistryConnectToPreferredGatewayRequest = function(args){
this.zoneId = null
this.host = null
this.port = null
this.protocolToUse = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.host)
this.host = args.host
if (null != args.port)
this.port = args.port
if (null != args.protocolToUse)
this.protocolToUse = args.protocolToUse
}}
ThriftRegistryConnectToPreferredGatewayRequest.prototype = {}
ThriftRegistryConnectToPreferredGatewayRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.host = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.port = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.protocolToUse = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftRegistryConnectToPreferredGatewayRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftRegistryConnectToPreferredGatewayRequest')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.host) {
  output.writeFieldBegin('host', Thrift.Type.STRING, 2)
  output.writeString(this.host)
  output.writeFieldEnd()
}
if (null != this.port) {
  output.writeFieldBegin('port', Thrift.Type.I32, 3)
  output.writeI32(this.port)
  output.writeFieldEnd()
}
if (null != this.protocolToUse) {
  output.writeFieldBegin('protocolToUse', Thrift.Type.I32, 4)
  output.writeI32(this.protocolToUse)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftRemoveBuddiesRequest = function(args){
this.buddyNames = null
if( args != null ){if (null != args.buddyNames)
this.buddyNames = args.buddyNames
}}
ThriftRemoveBuddiesRequest.prototype = {}
ThriftRemoveBuddiesRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.buddyNames = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          var rtmp = input.readString()
elem5 = rtmp.value
          this.buddyNames.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftRemoveBuddiesRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftRemoveBuddiesRequest')
if (null != this.buddyNames) {
  output.writeFieldBegin('buddyNames', Thrift.Type.LIST, 1)
  {
    output.writeListBegin(Thrift.Type.STRING, this.buddyNames.length)
    {
      for(var iter6 in this.buddyNames)
      {
        iter6=this.buddyNames[iter6]
        output.writeString(iter6)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftRemoveBuddiesResponse = function(args){
this.buddiesRemoved = null
this.buddiesNotRemoved = null
if( args != null ){if (null != args.buddiesRemoved)
this.buddiesRemoved = args.buddiesRemoved
if (null != args.buddiesNotRemoved)
this.buddiesNotRemoved = args.buddiesNotRemoved
}}
ThriftRemoveBuddiesResponse.prototype = {}
ThriftRemoveBuddiesResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.buddiesRemoved = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          var rtmp = input.readString()
elem5 = rtmp.value
          this.buddiesRemoved.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.LIST) {
      {
        var _size6 = 0
        var rtmp3
        this.buddiesNotRemoved = []
        var _etype9 = 0
        rtmp3 = input.readListBegin()
        _etype9 = rtmp3.etype
        _size6 = rtmp3.size
        for (var _i10 = 0; _i10 < _size6; ++_i10)
        {
          var elem11 = null
          var rtmp = input.readString()
elem11 = rtmp.value
          this.buddiesNotRemoved.push(elem11)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftRemoveBuddiesResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftRemoveBuddiesResponse')
if (null != this.buddiesRemoved) {
  output.writeFieldBegin('buddiesRemoved', Thrift.Type.LIST, 1)
  {
    output.writeListBegin(Thrift.Type.STRING, this.buddiesRemoved.length)
    {
      for(var iter12 in this.buddiesRemoved)
      {
        iter12=this.buddiesRemoved[iter12]
        output.writeString(iter12)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
if (null != this.buddiesNotRemoved) {
  output.writeFieldBegin('buddiesNotRemoved', Thrift.Type.LIST, 2)
  {
    output.writeListBegin(Thrift.Type.STRING, this.buddiesNotRemoved.length)
    {
      for(var iter13 in this.buddiesNotRemoved)
      {
        iter13=this.buddiesNotRemoved[iter13]
        output.writeString(iter13)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftRemoveRoomOperatorRequest = function(args){
this.zoneId = null
this.roomId = null
this.userName = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.userName)
this.userName = args.userName
}}
ThriftRemoveRoomOperatorRequest.prototype = {}
ThriftRemoveRoomOperatorRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.userName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftRemoveRoomOperatorRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftRemoveRoomOperatorRequest')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.userName) {
  output.writeFieldBegin('userName', Thrift.Type.STRING, 3)
  output.writeString(this.userName)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftRemoveUDPConnectionRequest = function(args){
this.port = null
if( args != null ){if (null != args.port)
this.port = args.port
}}
ThriftRemoveUDPConnectionRequest.prototype = {}
ThriftRemoveUDPConnectionRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.port = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftRemoveUDPConnectionRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftRemoveUDPConnectionRequest')
if (null != this.port) {
  output.writeFieldBegin('port', Thrift.Type.I32, 1)
  output.writeI32(this.port)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftRemoveUDPConnectionResponse = function(args){
this.successful = null
this.error = null
if( args != null ){if (null != args.successful)
this.successful = args.successful
if (null != args.error)
this.error = args.error
}}
ThriftRemoveUDPConnectionResponse.prototype = {}
ThriftRemoveUDPConnectionResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.successful = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.error = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftRemoveUDPConnectionResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftRemoveUDPConnectionResponse')
if (null != this.successful) {
  output.writeFieldBegin('successful', Thrift.Type.BOOL, 1)
  output.writeBool(this.successful)
  output.writeFieldEnd()
}
if (null != this.error) {
  output.writeFieldBegin('error', Thrift.Type.I32, 2)
  output.writeI32(this.error)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftRequestDetails = function(args){
this.pluginName = null
this.roomId = null
this.zoneId = null
this.parameters = new ThriftFlattenedEsObject()
if( args != null ){if (null != args.pluginName)
this.pluginName = args.pluginName
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.parameters)
this.parameters = args.parameters
}}
ThriftRequestDetails.prototype = {}
ThriftRequestDetails.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.pluginName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.STRUCT) {
      this.parameters = new ThriftFlattenedEsObject()
      this.parameters.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftRequestDetails.prototype.write = function(output){ 
output.writeStructBegin('ThriftRequestDetails')
if (null != this.pluginName) {
  output.writeFieldBegin('pluginName', Thrift.Type.STRING, 1)
  output.writeString(this.pluginName)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 3)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.parameters) {
  output.writeFieldBegin('parameters', Thrift.Type.STRUCT, 4)
  this.parameters.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftRoomListEntry = function(args){
this.roomId = null
this.zoneId = null
this.roomName = null
this.userCount = null
this.roomDescription = null
this.capacity = null
this.hasPassword = null
if( args != null ){if (null != args.roomId)
this.roomId = args.roomId
if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomName)
this.roomName = args.roomName
if (null != args.userCount)
this.userCount = args.userCount
if (null != args.roomDescription)
this.roomDescription = args.roomDescription
if (null != args.capacity)
this.capacity = args.capacity
if (null != args.hasPassword)
this.hasPassword = args.hasPassword
}}
ThriftRoomListEntry.prototype = {}
ThriftRoomListEntry.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.roomName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.userCount = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.roomDescription = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.capacity = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 7:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.hasPassword = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftRoomListEntry.prototype.write = function(output){ 
output.writeStructBegin('ThriftRoomListEntry')
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 1)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 2)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomName) {
  output.writeFieldBegin('roomName', Thrift.Type.STRING, 3)
  output.writeString(this.roomName)
  output.writeFieldEnd()
}
if (null != this.userCount) {
  output.writeFieldBegin('userCount', Thrift.Type.I32, 4)
  output.writeI32(this.userCount)
  output.writeFieldEnd()
}
if (null != this.roomDescription) {
  output.writeFieldBegin('roomDescription', Thrift.Type.STRING, 5)
  output.writeString(this.roomDescription)
  output.writeFieldEnd()
}
if (null != this.capacity) {
  output.writeFieldBegin('capacity', Thrift.Type.I32, 6)
  output.writeI32(this.capacity)
  output.writeFieldEnd()
}
if (null != this.hasPassword) {
  output.writeFieldBegin('hasPassword', Thrift.Type.BOOL, 7)
  output.writeBool(this.hasPassword)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftRoomVariableUpdateAction = { 
'VariableCreated' : 1
,'VariableUpdated' : 2
,'VariableDeleted' : 3
}

//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftRoomVariableUpdateEvent = function(args){
this.zoneId = null
this.roomId = null
this.name = null
this.valueChanged = null
this.value = new ThriftFlattenedEsObject()
this.persistent = null
this.lockStatusChanged = null
this.locked = null
this.action = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.name)
this.name = args.name
if (null != args.valueChanged)
this.valueChanged = args.valueChanged
if (null != args.value)
this.value = args.value
if (null != args.persistent)
this.persistent = args.persistent
if (null != args.lockStatusChanged)
this.lockStatusChanged = args.lockStatusChanged
if (null != args.locked)
this.locked = args.locked
if (null != args.action)
this.action = args.action
}}
ThriftRoomVariableUpdateEvent.prototype = {}
ThriftRoomVariableUpdateEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.name = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.valueChanged = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.STRUCT) {
      this.value = new ThriftFlattenedEsObject()
      this.value.read(input)
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.persistent = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 7:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.lockStatusChanged = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 8:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.locked = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 9:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.action = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftRoomVariableUpdateEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftRoomVariableUpdateEvent')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.name) {
  output.writeFieldBegin('name', Thrift.Type.STRING, 3)
  output.writeString(this.name)
  output.writeFieldEnd()
}
if (null != this.valueChanged) {
  output.writeFieldBegin('valueChanged', Thrift.Type.BOOL, 4)
  output.writeBool(this.valueChanged)
  output.writeFieldEnd()
}
if (null != this.value) {
  output.writeFieldBegin('value', Thrift.Type.STRUCT, 5)
  this.value.write(output)
  output.writeFieldEnd()
}
if (null != this.persistent) {
  output.writeFieldBegin('persistent', Thrift.Type.BOOL, 6)
  output.writeBool(this.persistent)
  output.writeFieldEnd()
}
if (null != this.lockStatusChanged) {
  output.writeFieldBegin('lockStatusChanged', Thrift.Type.BOOL, 7)
  output.writeBool(this.lockStatusChanged)
  output.writeFieldEnd()
}
if (null != this.locked) {
  output.writeFieldBegin('locked', Thrift.Type.BOOL, 8)
  output.writeBool(this.locked)
  output.writeFieldEnd()
}
if (null != this.action) {
  output.writeFieldBegin('action', Thrift.Type.I32, 9)
  output.writeI32(this.action)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftRoomVariable = function(args){
this.persistent = null
this.name = null
this.value = new ThriftFlattenedEsObject()
this.locked = null
if( args != null ){if (null != args.persistent)
this.persistent = args.persistent
if (null != args.name)
this.name = args.name
if (null != args.value)
this.value = args.value
if (null != args.locked)
this.locked = args.locked
}}
ThriftRoomVariable.prototype = {}
ThriftRoomVariable.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.persistent = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.name = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRUCT) {
      this.value = new ThriftFlattenedEsObject()
      this.value.read(input)
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.locked = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftRoomVariable.prototype.write = function(output){ 
output.writeStructBegin('ThriftRoomVariable')
if (null != this.persistent) {
  output.writeFieldBegin('persistent', Thrift.Type.BOOL, 1)
  output.writeBool(this.persistent)
  output.writeFieldEnd()
}
if (null != this.name) {
  output.writeFieldBegin('name', Thrift.Type.STRING, 2)
  output.writeString(this.name)
  output.writeFieldEnd()
}
if (null != this.value) {
  output.writeFieldBegin('value', Thrift.Type.STRUCT, 3)
  this.value.write(output)
  output.writeFieldEnd()
}
if (null != this.locked) {
  output.writeFieldBegin('locked', Thrift.Type.BOOL, 4)
  output.writeBool(this.locked)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftSearchCriteria = function(args){
this.gameId = null
this.locked = null
this.lockedSet = null
this.gameType = null
this.gameDetails = new ThriftFlattenedEsObject()
if( args != null ){if (null != args.gameId)
this.gameId = args.gameId
if (null != args.locked)
this.locked = args.locked
if (null != args.lockedSet)
this.lockedSet = args.lockedSet
if (null != args.gameType)
this.gameType = args.gameType
if (null != args.gameDetails)
this.gameDetails = args.gameDetails
}}
ThriftSearchCriteria.prototype = {}
ThriftSearchCriteria.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.gameId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.locked = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.lockedSet = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.gameType = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.STRUCT) {
      this.gameDetails = new ThriftFlattenedEsObject()
      this.gameDetails.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftSearchCriteria.prototype.write = function(output){ 
output.writeStructBegin('ThriftSearchCriteria')
if (null != this.gameId) {
  output.writeFieldBegin('gameId', Thrift.Type.I32, 1)
  output.writeI32(this.gameId)
  output.writeFieldEnd()
}
if (null != this.locked) {
  output.writeFieldBegin('locked', Thrift.Type.BOOL, 2)
  output.writeBool(this.locked)
  output.writeFieldEnd()
}
if (null != this.lockedSet) {
  output.writeFieldBegin('lockedSet', Thrift.Type.BOOL, 3)
  output.writeBool(this.lockedSet)
  output.writeFieldEnd()
}
if (null != this.gameType) {
  output.writeFieldBegin('gameType', Thrift.Type.STRING, 4)
  output.writeString(this.gameType)
  output.writeFieldEnd()
}
if (null != this.gameDetails) {
  output.writeFieldBegin('gameDetails', Thrift.Type.STRUCT, 5)
  this.gameDetails.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftServerGame = function(args){
this.gameDetails = new ThriftFlattenedEsObject()
this.id = null
this.roomId = null
this.zoneId = null
this.locked = null
this.passwordProtected = null
if( args != null ){if (null != args.gameDetails)
this.gameDetails = args.gameDetails
if (null != args.id)
this.id = args.id
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.locked)
this.locked = args.locked
if (null != args.passwordProtected)
this.passwordProtected = args.passwordProtected
}}
ThriftServerGame.prototype = {}
ThriftServerGame.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRUCT) {
      this.gameDetails = new ThriftFlattenedEsObject()
      this.gameDetails.read(input)
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.id = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.locked = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.passwordProtected = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftServerGame.prototype.write = function(output){ 
output.writeStructBegin('ThriftServerGame')
if (null != this.gameDetails) {
  output.writeFieldBegin('gameDetails', Thrift.Type.STRUCT, 1)
  this.gameDetails.write(output)
  output.writeFieldEnd()
}
if (null != this.id) {
  output.writeFieldBegin('id', Thrift.Type.I32, 2)
  output.writeI32(this.id)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 3)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 4)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.locked) {
  output.writeFieldBegin('locked', Thrift.Type.BOOL, 5)
  output.writeBool(this.locked)
  output.writeFieldEnd()
}
if (null != this.passwordProtected) {
  output.writeFieldBegin('passwordProtected', Thrift.Type.BOOL, 6)
  output.writeBool(this.passwordProtected)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftServerState = { 
'NOOP' : 1
,'RUNNING' : 2
,'PAUSED' : 3
,'STOPPED' : 4
}

//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftSessionIdleEvent = function(args){
}
ThriftSessionIdleEvent.prototype = {}
ThriftSessionIdleEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftSessionIdleEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftSessionIdleEvent')
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftUpdateRoomDetailsEvent = function(args){
this.zoneId = null
this.roomId = null
this.capacityUpdated = null
this.capacity = null
this.roomDescriptionUpdated = null
this.roomDescription = null
this.roomNameUpdated = null
this.roomName = null
this.hasPassword = null
this.hasPasswordUpdated = null
this.hiddenUpdated = null
this.hidden = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.capacityUpdated)
this.capacityUpdated = args.capacityUpdated
if (null != args.capacity)
this.capacity = args.capacity
if (null != args.roomDescriptionUpdated)
this.roomDescriptionUpdated = args.roomDescriptionUpdated
if (null != args.roomDescription)
this.roomDescription = args.roomDescription
if (null != args.roomNameUpdated)
this.roomNameUpdated = args.roomNameUpdated
if (null != args.roomName)
this.roomName = args.roomName
if (null != args.hasPassword)
this.hasPassword = args.hasPassword
if (null != args.hasPasswordUpdated)
this.hasPasswordUpdated = args.hasPasswordUpdated
if (null != args.hiddenUpdated)
this.hiddenUpdated = args.hiddenUpdated
if (null != args.hidden)
this.hidden = args.hidden
}}
ThriftUpdateRoomDetailsEvent.prototype = {}
ThriftUpdateRoomDetailsEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.capacityUpdated = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.capacity = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.roomDescriptionUpdated = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.roomDescription = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 7:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.roomNameUpdated = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 8:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.roomName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 9:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.hasPassword = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 10:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.hasPasswordUpdated = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 11:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.hiddenUpdated = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 12:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.hidden = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftUpdateRoomDetailsEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftUpdateRoomDetailsEvent')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.capacityUpdated) {
  output.writeFieldBegin('capacityUpdated', Thrift.Type.BOOL, 3)
  output.writeBool(this.capacityUpdated)
  output.writeFieldEnd()
}
if (null != this.capacity) {
  output.writeFieldBegin('capacity', Thrift.Type.I32, 4)
  output.writeI32(this.capacity)
  output.writeFieldEnd()
}
if (null != this.roomDescriptionUpdated) {
  output.writeFieldBegin('roomDescriptionUpdated', Thrift.Type.BOOL, 5)
  output.writeBool(this.roomDescriptionUpdated)
  output.writeFieldEnd()
}
if (null != this.roomDescription) {
  output.writeFieldBegin('roomDescription', Thrift.Type.STRING, 6)
  output.writeString(this.roomDescription)
  output.writeFieldEnd()
}
if (null != this.roomNameUpdated) {
  output.writeFieldBegin('roomNameUpdated', Thrift.Type.BOOL, 7)
  output.writeBool(this.roomNameUpdated)
  output.writeFieldEnd()
}
if (null != this.roomName) {
  output.writeFieldBegin('roomName', Thrift.Type.STRING, 8)
  output.writeString(this.roomName)
  output.writeFieldEnd()
}
if (null != this.hasPassword) {
  output.writeFieldBegin('hasPassword', Thrift.Type.BOOL, 9)
  output.writeBool(this.hasPassword)
  output.writeFieldEnd()
}
if (null != this.hasPasswordUpdated) {
  output.writeFieldBegin('hasPasswordUpdated', Thrift.Type.BOOL, 10)
  output.writeBool(this.hasPasswordUpdated)
  output.writeFieldEnd()
}
if (null != this.hiddenUpdated) {
  output.writeFieldBegin('hiddenUpdated', Thrift.Type.BOOL, 11)
  output.writeBool(this.hiddenUpdated)
  output.writeFieldEnd()
}
if (null != this.hidden) {
  output.writeFieldBegin('hidden', Thrift.Type.BOOL, 12)
  output.writeBool(this.hidden)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftUpdateRoomDetailsRequest = function(args){
this.zoneId = null
this.roomId = null
this.capacityUpdate = null
this.capacity = null
this.roomDescriptionUpdate = null
this.roomDescription = null
this.roomNameUpdate = null
this.roomName = null
this.passwordUpdate = null
this.password = null
this.hiddenUpdate = null
this.hidden = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.capacityUpdate)
this.capacityUpdate = args.capacityUpdate
if (null != args.capacity)
this.capacity = args.capacity
if (null != args.roomDescriptionUpdate)
this.roomDescriptionUpdate = args.roomDescriptionUpdate
if (null != args.roomDescription)
this.roomDescription = args.roomDescription
if (null != args.roomNameUpdate)
this.roomNameUpdate = args.roomNameUpdate
if (null != args.roomName)
this.roomName = args.roomName
if (null != args.passwordUpdate)
this.passwordUpdate = args.passwordUpdate
if (null != args.password)
this.password = args.password
if (null != args.hiddenUpdate)
this.hiddenUpdate = args.hiddenUpdate
if (null != args.hidden)
this.hidden = args.hidden
}}
ThriftUpdateRoomDetailsRequest.prototype = {}
ThriftUpdateRoomDetailsRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.capacityUpdate = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.capacity = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.roomDescriptionUpdate = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.roomDescription = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 7:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.roomNameUpdate = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 8:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.roomName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 9:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.passwordUpdate = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 10:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.password = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 11:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.hiddenUpdate = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 12:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.hidden = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftUpdateRoomDetailsRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftUpdateRoomDetailsRequest')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.capacityUpdate) {
  output.writeFieldBegin('capacityUpdate', Thrift.Type.BOOL, 3)
  output.writeBool(this.capacityUpdate)
  output.writeFieldEnd()
}
if (null != this.capacity) {
  output.writeFieldBegin('capacity', Thrift.Type.I32, 4)
  output.writeI32(this.capacity)
  output.writeFieldEnd()
}
if (null != this.roomDescriptionUpdate) {
  output.writeFieldBegin('roomDescriptionUpdate', Thrift.Type.BOOL, 5)
  output.writeBool(this.roomDescriptionUpdate)
  output.writeFieldEnd()
}
if (null != this.roomDescription) {
  output.writeFieldBegin('roomDescription', Thrift.Type.STRING, 6)
  output.writeString(this.roomDescription)
  output.writeFieldEnd()
}
if (null != this.roomNameUpdate) {
  output.writeFieldBegin('roomNameUpdate', Thrift.Type.BOOL, 7)
  output.writeBool(this.roomNameUpdate)
  output.writeFieldEnd()
}
if (null != this.roomName) {
  output.writeFieldBegin('roomName', Thrift.Type.STRING, 8)
  output.writeString(this.roomName)
  output.writeFieldEnd()
}
if (null != this.passwordUpdate) {
  output.writeFieldBegin('passwordUpdate', Thrift.Type.BOOL, 9)
  output.writeBool(this.passwordUpdate)
  output.writeFieldEnd()
}
if (null != this.password) {
  output.writeFieldBegin('password', Thrift.Type.STRING, 10)
  output.writeString(this.password)
  output.writeFieldEnd()
}
if (null != this.hiddenUpdate) {
  output.writeFieldBegin('hiddenUpdate', Thrift.Type.BOOL, 11)
  output.writeBool(this.hiddenUpdate)
  output.writeFieldEnd()
}
if (null != this.hidden) {
  output.writeFieldBegin('hidden', Thrift.Type.BOOL, 12)
  output.writeBool(this.hidden)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftUpdateRoomVariableRequest = function(args){
this.zoneId = null
this.roomId = null
this.name = null
this.valueChanged = null
this.value = new ThriftFlattenedEsObject()
this.lockStatusChanged = null
this.locked = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.name)
this.name = args.name
if (null != args.valueChanged)
this.valueChanged = args.valueChanged
if (null != args.value)
this.value = args.value
if (null != args.lockStatusChanged)
this.lockStatusChanged = args.lockStatusChanged
if (null != args.locked)
this.locked = args.locked
}}
ThriftUpdateRoomVariableRequest.prototype = {}
ThriftUpdateRoomVariableRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.name = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.valueChanged = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.STRUCT) {
      this.value = new ThriftFlattenedEsObject()
      this.value.read(input)
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.lockStatusChanged = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 7:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.locked = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftUpdateRoomVariableRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftUpdateRoomVariableRequest')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.name) {
  output.writeFieldBegin('name', Thrift.Type.STRING, 3)
  output.writeString(this.name)
  output.writeFieldEnd()
}
if (null != this.valueChanged) {
  output.writeFieldBegin('valueChanged', Thrift.Type.BOOL, 4)
  output.writeBool(this.valueChanged)
  output.writeFieldEnd()
}
if (null != this.value) {
  output.writeFieldBegin('value', Thrift.Type.STRUCT, 5)
  this.value.write(output)
  output.writeFieldEnd()
}
if (null != this.lockStatusChanged) {
  output.writeFieldBegin('lockStatusChanged', Thrift.Type.BOOL, 6)
  output.writeBool(this.lockStatusChanged)
  output.writeFieldEnd()
}
if (null != this.locked) {
  output.writeFieldBegin('locked', Thrift.Type.BOOL, 7)
  output.writeBool(this.locked)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftUpdateUserVariableRequest = function(args){
this.name = null
this.value = new ThriftFlattenedEsObject()
if( args != null ){if (null != args.name)
this.name = args.name
if (null != args.value)
this.value = args.value
}}
ThriftUpdateUserVariableRequest.prototype = {}
ThriftUpdateUserVariableRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.name = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRUCT) {
      this.value = new ThriftFlattenedEsObject()
      this.value.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftUpdateUserVariableRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftUpdateUserVariableRequest')
if (null != this.name) {
  output.writeFieldBegin('name', Thrift.Type.STRING, 1)
  output.writeString(this.name)
  output.writeFieldEnd()
}
if (null != this.value) {
  output.writeFieldBegin('value', Thrift.Type.STRUCT, 2)
  this.value.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftUserEvictedFromRoomEvent = function(args){
this.zoneId = null
this.roomId = null
this.userName = null
this.reason = null
this.ban = null
this.duration = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.userName)
this.userName = args.userName
if (null != args.reason)
this.reason = args.reason
if (null != args.ban)
this.ban = args.ban
if (null != args.duration)
this.duration = args.duration
}}
ThriftUserEvictedFromRoomEvent.prototype = {}
ThriftUserEvictedFromRoomEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.userName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.reason = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.ban = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.duration = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftUserEvictedFromRoomEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftUserEvictedFromRoomEvent')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.userName) {
  output.writeFieldBegin('userName', Thrift.Type.STRING, 3)
  output.writeString(this.userName)
  output.writeFieldEnd()
}
if (null != this.reason) {
  output.writeFieldBegin('reason', Thrift.Type.STRING, 4)
  output.writeString(this.reason)
  output.writeFieldEnd()
}
if (null != this.ban) {
  output.writeFieldBegin('ban', Thrift.Type.BOOL, 5)
  output.writeBool(this.ban)
  output.writeFieldEnd()
}
if (null != this.duration) {
  output.writeFieldBegin('duration', Thrift.Type.I32, 6)
  output.writeI32(this.duration)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftUserListEntry = function(args){
this.userName = null
this.userVariables = null
this.sendingVideo = null
this.videoStreamName = null
this.roomOperator = null
if( args != null ){if (null != args.userName)
this.userName = args.userName
if (null != args.userVariables)
this.userVariables = args.userVariables
if (null != args.sendingVideo)
this.sendingVideo = args.sendingVideo
if (null != args.videoStreamName)
this.videoStreamName = args.videoStreamName
if (null != args.roomOperator)
this.roomOperator = args.roomOperator
}}
ThriftUserListEntry.prototype = {}
ThriftUserListEntry.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.userName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.userVariables = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          elem5 = new ThriftUserVariable()
          elem5.read(input)
          this.userVariables.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.sendingVideo = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.videoStreamName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.roomOperator = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftUserListEntry.prototype.write = function(output){ 
output.writeStructBegin('ThriftUserListEntry')
if (null != this.userName) {
  output.writeFieldBegin('userName', Thrift.Type.STRING, 1)
  output.writeString(this.userName)
  output.writeFieldEnd()
}
if (null != this.userVariables) {
  output.writeFieldBegin('userVariables', Thrift.Type.LIST, 2)
  {
    output.writeListBegin(Thrift.Type.STRUCT, this.userVariables.length)
    {
      for(var iter6 in this.userVariables)
      {
        iter6=this.userVariables[iter6]
        iter6.write(output)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
if (null != this.sendingVideo) {
  output.writeFieldBegin('sendingVideo', Thrift.Type.BOOL, 3)
  output.writeBool(this.sendingVideo)
  output.writeFieldEnd()
}
if (null != this.videoStreamName) {
  output.writeFieldBegin('videoStreamName', Thrift.Type.STRING, 4)
  output.writeString(this.videoStreamName)
  output.writeFieldEnd()
}
if (null != this.roomOperator) {
  output.writeFieldBegin('roomOperator', Thrift.Type.BOOL, 5)
  output.writeBool(this.roomOperator)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftUserUpdateAction = { 
'AddUser' : 1
,'DeleteUser' : 2
,'OperatorGranted' : 3
,'OperatorRevoked' : 4
,'SendingVideoStream' : 5
,'StoppingVideoStream' : 6
}

//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftUserUpdateEvent = function(args){
this.zoneId = null
this.roomId = null
this.action = null
this.userName = null
this.userVariables = null
this.sendingVideo = null
this.videoStreamName = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.action)
this.action = args.action
if (null != args.userName)
this.userName = args.userName
if (null != args.userVariables)
this.userVariables = args.userVariables
if (null != args.sendingVideo)
this.sendingVideo = args.sendingVideo
if (null != args.videoStreamName)
this.videoStreamName = args.videoStreamName
}}
ThriftUserUpdateEvent.prototype = {}
ThriftUserUpdateEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.action = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.userName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.LIST) {
      {
        var _size0 = 0
        var rtmp3
        this.userVariables = []
        var _etype3 = 0
        rtmp3 = input.readListBegin()
        _etype3 = rtmp3.etype
        _size0 = rtmp3.size
        for (var _i4 = 0; _i4 < _size0; ++_i4)
        {
          var elem5 = null
          elem5 = new ThriftUserVariable()
          elem5.read(input)
          this.userVariables.push(elem5)
        }
        input.readListEnd()
      }
    } else {
      input.skip(ftype)
    }
    break
    case 6:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.sendingVideo = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 7:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.videoStreamName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftUserUpdateEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftUserUpdateEvent')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 2)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.action) {
  output.writeFieldBegin('action', Thrift.Type.I32, 3)
  output.writeI32(this.action)
  output.writeFieldEnd()
}
if (null != this.userName) {
  output.writeFieldBegin('userName', Thrift.Type.STRING, 4)
  output.writeString(this.userName)
  output.writeFieldEnd()
}
if (null != this.userVariables) {
  output.writeFieldBegin('userVariables', Thrift.Type.LIST, 5)
  {
    output.writeListBegin(Thrift.Type.STRUCT, this.userVariables.length)
    {
      for(var iter6 in this.userVariables)
      {
        iter6=this.userVariables[iter6]
        iter6.write(output)
      }
    }
    output.writeListEnd()
  }
  output.writeFieldEnd()
}
if (null != this.sendingVideo) {
  output.writeFieldBegin('sendingVideo', Thrift.Type.BOOL, 6)
  output.writeBool(this.sendingVideo)
  output.writeFieldEnd()
}
if (null != this.videoStreamName) {
  output.writeFieldBegin('videoStreamName', Thrift.Type.STRING, 7)
  output.writeString(this.videoStreamName)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftUserVariableUpdateAction = { 
'VariableCreated' : 1
,'VariableUpdated' : 2
,'VariableDeleted' : 3
}

//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftUserVariableUpdateEvent = function(args){
this.userName = null
this.variable = new ThriftUserVariable()
this.action = null
if( args != null ){if (null != args.userName)
this.userName = args.userName
if (null != args.variable)
this.variable = args.variable
if (null != args.action)
this.action = args.action
}}
ThriftUserVariableUpdateEvent.prototype = {}
ThriftUserVariableUpdateEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.userName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRUCT) {
      this.variable = new ThriftUserVariable()
      this.variable.read(input)
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.action = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftUserVariableUpdateEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftUserVariableUpdateEvent')
if (null != this.userName) {
  output.writeFieldBegin('userName', Thrift.Type.STRING, 1)
  output.writeString(this.userName)
  output.writeFieldEnd()
}
if (null != this.variable) {
  output.writeFieldBegin('variable', Thrift.Type.STRUCT, 2)
  this.variable.write(output)
  output.writeFieldEnd()
}
if (null != this.action) {
  output.writeFieldBegin('action', Thrift.Type.I32, 3)
  output.writeI32(this.action)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftUserVariable = function(args){
this.name = null
this.value = new ThriftFlattenedEsObject()
if( args != null ){if (null != args.name)
this.name = args.name
if (null != args.value)
this.value = args.value
}}
ThriftUserVariable.prototype = {}
ThriftUserVariable.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.name = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRUCT) {
      this.value = new ThriftFlattenedEsObject()
      this.value.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftUserVariable.prototype.write = function(output){ 
output.writeStructBegin('ThriftUserVariable')
if (null != this.name) {
  output.writeFieldBegin('name', Thrift.Type.STRING, 1)
  output.writeString(this.name)
  output.writeFieldEnd()
}
if (null != this.value) {
  output.writeFieldBegin('value', Thrift.Type.STRUCT, 2)
  this.value.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftValidateAdditionalLoginRequest = function(args){
this.secret = null
if( args != null ){if (null != args.secret)
this.secret = args.secret
}}
ThriftValidateAdditionalLoginRequest.prototype = {}
ThriftValidateAdditionalLoginRequest.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.secret = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftValidateAdditionalLoginRequest.prototype.write = function(output){ 
output.writeStructBegin('ThriftValidateAdditionalLoginRequest')
if (null != this.secret) {
  output.writeFieldBegin('secret', Thrift.Type.STRING, 1)
  output.writeString(this.secret)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftValidateAdditionalLoginResponse = function(args){
this.approved = null
this.secret = null
if( args != null ){if (null != args.approved)
this.approved = args.approved
if (null != args.secret)
this.secret = args.secret
}}
ThriftValidateAdditionalLoginResponse.prototype = {}
ThriftValidateAdditionalLoginResponse.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.BOOL) {
      var rtmp = input.readBool()
this.approved = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.secret = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftValidateAdditionalLoginResponse.prototype.write = function(output){ 
output.writeStructBegin('ThriftValidateAdditionalLoginResponse')
if (null != this.approved) {
  output.writeFieldBegin('approved', Thrift.Type.BOOL, 1)
  output.writeBool(this.approved)
  output.writeFieldEnd()
}
if (null != this.secret) {
  output.writeFieldBegin('secret', Thrift.Type.STRING, 2)
  output.writeString(this.secret)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftZoneListEntry = function(args){
this.zoneId = null
this.zoneName = null
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.zoneName)
this.zoneName = args.zoneName
}}
ThriftZoneListEntry.prototype = {}
ThriftZoneListEntry.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.STRING) {
      var rtmp = input.readString()
this.zoneName = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftZoneListEntry.prototype.write = function(output){ 
output.writeStructBegin('ThriftZoneListEntry')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.zoneName) {
  output.writeFieldBegin('zoneName', Thrift.Type.STRING, 2)
  output.writeString(this.zoneName)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftZoneUpdateAction = { 
'AddRoom' : 1
,'DeleteRoom' : 2
,'UpdateRoom' : 3
}

//
// Autogenerated by Thrift
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
ThriftZoneUpdateEvent = function(args){
this.zoneId = null
this.action = null
this.roomId = null
this.roomCount = null
this.roomListEntry = new ThriftRoomListEntry()
if( args != null ){if (null != args.zoneId)
this.zoneId = args.zoneId
if (null != args.action)
this.action = args.action
if (null != args.roomId)
this.roomId = args.roomId
if (null != args.roomCount)
this.roomCount = args.roomCount
if (null != args.roomListEntry)
this.roomListEntry = args.roomListEntry
}}
ThriftZoneUpdateEvent.prototype = {}
ThriftZoneUpdateEvent.prototype.read = function(input){ 
var ret = input.readStructBegin()
while (1) 
{
  var ret = input.readFieldBegin()
  var fname = ret.fname
  var ftype = ret.ftype
  var fid   = ret.fid
  if (ftype == Thrift.Type.STOP) 
    break
  switch(fid)
  {
    case 1:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.zoneId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 2:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.action = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 3:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomId = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 4:    if (ftype == Thrift.Type.I32) {
      var rtmp = input.readI32()
this.roomCount = rtmp.value
    } else {
      input.skip(ftype)
    }
    break
    case 5:    if (ftype == Thrift.Type.STRUCT) {
      this.roomListEntry = new ThriftRoomListEntry()
      this.roomListEntry.read(input)
    } else {
      input.skip(ftype)
    }
    break
    default:
      input.skip(ftype)
  }
  input.readFieldEnd()
}
input.readStructEnd()
return
}

ThriftZoneUpdateEvent.prototype.write = function(output){ 
output.writeStructBegin('ThriftZoneUpdateEvent')
if (null != this.zoneId) {
  output.writeFieldBegin('zoneId', Thrift.Type.I32, 1)
  output.writeI32(this.zoneId)
  output.writeFieldEnd()
}
if (null != this.action) {
  output.writeFieldBegin('action', Thrift.Type.I32, 2)
  output.writeI32(this.action)
  output.writeFieldEnd()
}
if (null != this.roomId) {
  output.writeFieldBegin('roomId', Thrift.Type.I32, 3)
  output.writeI32(this.roomId)
  output.writeFieldEnd()
}
if (null != this.roomCount) {
  output.writeFieldBegin('roomCount', Thrift.Type.I32, 4)
  output.writeI32(this.roomCount)
  output.writeFieldEnd()
}
if (null != this.roomListEntry) {
  output.writeFieldBegin('roomListEntry', Thrift.Type.STRUCT, 5)
  this.roomListEntry.write(output)
  output.writeFieldEnd()
}
output.writeFieldStop()
output.writeStructEnd()
return
}


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var AddBuddiesRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.AddBuddiesRequest;
	}
	this.buddyNames = null;
	this.esObject = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

AddBuddiesRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.buddyNames) {
			this.buddyNames = new Array();
			for (var _tKeyVar_0 in thriftObject.buddyNames) {
				_tValVar_0 = thriftObject.buddyNames[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				this.buddyNames.push(_listDestVar_0);
			}
		}
		if (null != thriftObject.esObject) {
			this.esObject = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.esObject));
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.buddyNames) {
			thriftObject.buddyNames = new Array();
			for (var _tKeyVar_0 in this.buddyNames) {
				_tValVar_0 = this.buddyNames[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				thriftObject.buddyNames.push(_listDestVar_0);
			}
		}
		if (null != this.esObject) {
			thriftObject.esObject = ElectroServer.ThriftUtil.flattenEsObject(this.esObject).toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftAddBuddiesRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var AddBuddiesResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.AddBuddiesResponse;
	}
	this.buddiesAdded = null;
	this.buddiesNotAdded = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

AddBuddiesResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.buddiesAdded) {
			this.buddiesAdded = new Array();
			for (var _tKeyVar_0 in thriftObject.buddiesAdded) {
				_tValVar_0 = thriftObject.buddiesAdded[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				this.buddiesAdded.push(_listDestVar_0);
			}
		}
		if (null != thriftObject.buddiesNotAdded) {
			this.buddiesNotAdded = new Array();
			for (var _tKeyVar_0 in thriftObject.buddiesNotAdded) {
				_tValVar_0 = thriftObject.buddiesNotAdded[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				this.buddiesNotAdded.push(_listDestVar_0);
			}
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.buddiesAdded) {
			thriftObject.buddiesAdded = new Array();
			for (var _tKeyVar_0 in this.buddiesAdded) {
				_tValVar_0 = this.buddiesAdded[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				thriftObject.buddiesAdded.push(_listDestVar_0);
			}
		}
		if (null != this.buddiesNotAdded) {
			thriftObject.buddiesNotAdded = new Array();
			for (var _tKeyVar_0 in this.buddiesNotAdded) {
				_tValVar_0 = this.buddiesNotAdded[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				thriftObject.buddiesNotAdded.push(_listDestVar_0);
			}
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftAddBuddiesResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var AddRoomOperatorRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.AddRoomOperatorRequest;
	}
	this.zoneId = null;
	this.roomId = null;
	this.userName = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

AddRoomOperatorRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.userName) {
			this.userName = thriftObject.userName;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.userName) {
			thriftObject.userName = this.userName;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftAddRoomOperatorRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var AggregatePluginMessageEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.AggregatePluginMessageEvent;
	}
	this.pluginName = null;
	this.esObjects = null;
	this.originZoneId = null;
	this.originRoomId = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

AggregatePluginMessageEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.pluginName) {
			this.pluginName = thriftObject.pluginName;
		}
		if (null != thriftObject.esObjects) {
			this.esObjects = new Array();
			for (var _tKeyVar_0 in thriftObject.esObjects) {
				_tValVar_0 = thriftObject.esObjects[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = ElectroServer.ThriftUtil.unflattenEsObjectRO(new FlattenedEsObjectRO(_tValVar_0));
				this.esObjects.push(_listDestVar_0);
			}
		}
		if (null != thriftObject.originZoneId) {
			this.originZoneId = thriftObject.originZoneId;
		}
		if (null != thriftObject.originRoomId) {
			this.originRoomId = thriftObject.originRoomId;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.pluginName) {
			thriftObject.pluginName = this.pluginName;
		}
		if (null != this.esObjects) {
			thriftObject.esObjects = new Array();
			for (var _tKeyVar_0 in this.esObjects) {
				_tValVar_0 = this.esObjects[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = ElectroServer.ThriftUtil.unflattenEsObjectRO(new FlattenedEsObjectRO(_tValVar_0));
				thriftObject.esObjects.push(_listDestVar_0);
			}
		}
		if (null != this.originZoneId) {
			thriftObject.originZoneId = this.originZoneId;
		}
		if (null != this.originRoomId) {
			thriftObject.originRoomId = this.originRoomId;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftAggregatePluginMessageEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var AggregatePluginRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.AggregatePluginRequest;
	}
	this.pluginRequestArray = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

AggregatePluginRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.pluginRequestArray) {
			this.pluginRequestArray = new Array();
			for (var _tKeyVar_0 in thriftObject.pluginRequestArray) {
				_tValVar_0 = thriftObject.pluginRequestArray[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new RequestDetails(_tValVar_0);
				this.pluginRequestArray.push(_listDestVar_0);
			}
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.pluginRequestArray) {
			thriftObject.pluginRequestArray = new Array();
			for (var _tKeyVar_0 in this.pluginRequestArray) {
				_tValVar_0 = this.pluginRequestArray[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new RequestDetails(_tValVar_0);
				thriftObject.pluginRequestArray.push(_listDestVar_0);
			}
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftAggregatePluginRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var BuddyStatusUpdateAction = {
	"LoggedIn" : 1,
	"LoggedOut" : 2,
};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var BuddyStatusUpdateEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.BuddyStatusUpdatedEvent;
	}
	this.userName = null;
	this.action = null;
	this.esObject = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

BuddyStatusUpdateEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.userName) {
			this.userName = thriftObject.userName;
		}
		if (null != thriftObject.action) {
			this.action = thriftObject.action;
		}
		if (null != thriftObject.esObject) {
			this.esObject = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.esObject));
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.userName) {
			thriftObject.userName = this.userName;
		}
		if (null != this.action) {
			thriftObject.action = this.action;
		}
		if (null != this.esObject) {
			thriftObject.esObject = ElectroServer.ThriftUtil.flattenEsObject(this.esObject).toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftBuddyStatusUpdateEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var ConnectionAttemptResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.ConnectionAttemptResponse;
	}
	this.successful = null;
	this.connectionId = null;
	this.error = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

ConnectionAttemptResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.successful) {
			this.successful = thriftObject.successful;
		}
		if (null != thriftObject.connectionId) {
			this.connectionId = thriftObject.connectionId;
		}
		if (null != thriftObject.error) {
			this.error = thriftObject.error;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.successful) {
			thriftObject.successful = this.successful;
		}
		if (null != this.connectionId) {
			thriftObject.connectionId = this.connectionId;
		}
		if (null != this.error) {
			thriftObject.error = this.error;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftConnectionAttemptResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var ConnectionClosedEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.ConnectionClosedEvent;
	}
	this.connectionId = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

ConnectionClosedEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.connectionId) {
			this.connectionId = thriftObject.connectionId;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.connectionId) {
			thriftObject.connectionId = this.connectionId;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftConnectionClosedEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var ConnectionResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.ConnectionResponse;
	}
	this.successful = null;
	this.hashId = null;
	this.error = null;
	this.protocolConfiguration = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

ConnectionResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.successful) {
			this.successful = thriftObject.successful;
		}
		if (null != thriftObject.hashId) {
			this.hashId = thriftObject.hashId;
		}
		if (null != thriftObject.error) {
			this.error = thriftObject.error;
		}
		if (null != thriftObject.protocolConfiguration) {
			this.protocolConfiguration = new ProtocolConfiguration(thriftObject.protocolConfiguration);
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.successful) {
			thriftObject.successful = this.successful;
		}
		if (null != this.hashId) {
			thriftObject.hashId = this.hashId;
		}
		if (null != this.error) {
			thriftObject.error = this.error;
		}
		if (null != this.protocolConfiguration) {
			thriftObject.protocolConfiguration = this.protocolConfiguration.toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftConnectionResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var CreateOrJoinGameResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.CreateOrJoinGameResponse;
	}
	this.successful = null;
	this.error = null;
	this.zoneId = null;
	this.roomId = null;
	this.gameId = null;
	this.gameDetails = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

CreateOrJoinGameResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.successful) {
			this.successful = thriftObject.successful;
		}
		if (null != thriftObject.error) {
			this.error = thriftObject.error;
		}
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.gameId) {
			this.gameId = thriftObject.gameId;
		}
		if (null != thriftObject.gameDetails) {
			this.gameDetails = ElectroServer.ThriftUtil.unflattenEsObjectRO(new FlattenedEsObjectRO(thriftObject.gameDetails));
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.successful) {
			thriftObject.successful = this.successful;
		}
		if (null != this.error) {
			thriftObject.error = this.error;
		}
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.gameId) {
			thriftObject.gameId = this.gameId;
		}
		if (null != this.gameDetails) {
			thriftObject.gameDetails = ElectroServer.ThriftUtil.flattenEsObjectRO(this.gameDetails).toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftCreateOrJoinGameResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var CreateRoomRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.CreateRoomRequest;
	}
	this.zoneName = null;
	this.zoneId = null;
	this.roomName = null;
	this.capacity = null;
	this.password = null;
	this.roomDescription = null;
	this.persistent = null;
	this.hidden = null;
	this.receivingRoomListUpdates = null;
	this.receivingRoomAttributeUpdates = null;
	this.receivingUserListUpdates = null;
	this.receivingUserVariableUpdates = null;
	this.receivingRoomVariableUpdates = null;
	this.receivingVideoEvents = null;
	this.nonOperatorUpdateAllowed = null;
	this.nonOperatorVariableUpdateAllowed = null;
	this.createOrJoinRoom = null;
	this.plugins = null;
	this.variables = null;
	this.usingLanguageFilter = null;
	this.languageFilterSpecified = null;
	this.languageFilterName = null;
	this.languageFilterDeliverMessageOnFailure = null;
	this.languageFilterFailuresBeforeKick = null;
	this.languageFilterKicksBeforeBan = null;
	this.languageFilterBanDuration = null;
	this.languageFilterResetAfterKick = null;
	this.usingFloodingFilter = null;
	this.floodingFilterSpecified = null;
	this.floodingFilterName = null;
	this.floodingFilterFailuresBeforeKick = null;
	this.floodingFilterKicksBeforeBan = null;
	this.floodingFilterBanDuration = null;
	this.floodingFilterResetAfterKick = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

CreateRoomRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneName) {
			this.zoneName = thriftObject.zoneName;
		}
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomName) {
			this.roomName = thriftObject.roomName;
		}
		if (null != thriftObject.capacity) {
			this.capacity = thriftObject.capacity;
		}
		if (null != thriftObject.password) {
			this.password = thriftObject.password;
		}
		if (null != thriftObject.roomDescription) {
			this.roomDescription = thriftObject.roomDescription;
		}
		if (null != thriftObject.persistent) {
			this.persistent = thriftObject.persistent;
		}
		if (null != thriftObject.hidden) {
			this.hidden = thriftObject.hidden;
		}
		if (null != thriftObject.receivingRoomListUpdates) {
			this.receivingRoomListUpdates = thriftObject.receivingRoomListUpdates;
		}
		if (null != thriftObject.receivingRoomAttributeUpdates) {
			this.receivingRoomAttributeUpdates = thriftObject.receivingRoomAttributeUpdates;
		}
		if (null != thriftObject.receivingUserListUpdates) {
			this.receivingUserListUpdates = thriftObject.receivingUserListUpdates;
		}
		if (null != thriftObject.receivingUserVariableUpdates) {
			this.receivingUserVariableUpdates = thriftObject.receivingUserVariableUpdates;
		}
		if (null != thriftObject.receivingRoomVariableUpdates) {
			this.receivingRoomVariableUpdates = thriftObject.receivingRoomVariableUpdates;
		}
		if (null != thriftObject.receivingVideoEvents) {
			this.receivingVideoEvents = thriftObject.receivingVideoEvents;
		}
		if (null != thriftObject.nonOperatorUpdateAllowed) {
			this.nonOperatorUpdateAllowed = thriftObject.nonOperatorUpdateAllowed;
		}
		if (null != thriftObject.nonOperatorVariableUpdateAllowed) {
			this.nonOperatorVariableUpdateAllowed = thriftObject.nonOperatorVariableUpdateAllowed;
		}
		if (null != thriftObject.createOrJoinRoom) {
			this.createOrJoinRoom = thriftObject.createOrJoinRoom;
		}
		if (null != thriftObject.plugins) {
			this.plugins = new Array();
			for (var _tKeyVar_0 in thriftObject.plugins) {
				_tValVar_0 = thriftObject.plugins[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new PluginListEntry(_tValVar_0);
				this.plugins.push(_listDestVar_0);
			}
		}
		if (null != thriftObject.variables) {
			this.variables = new Array();
			for (var _tKeyVar_0 in thriftObject.variables) {
				_tValVar_0 = thriftObject.variables[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new RoomVariable(_tValVar_0);
				this.variables.push(_listDestVar_0);
			}
		}
		if (null != thriftObject.usingLanguageFilter) {
			this.usingLanguageFilter = thriftObject.usingLanguageFilter;
		}
		if (null != thriftObject.languageFilterSpecified) {
			this.languageFilterSpecified = thriftObject.languageFilterSpecified;
		}
		if (null != thriftObject.languageFilterName) {
			this.languageFilterName = thriftObject.languageFilterName;
		}
		if (null != thriftObject.languageFilterDeliverMessageOnFailure) {
			this.languageFilterDeliverMessageOnFailure = thriftObject.languageFilterDeliverMessageOnFailure;
		}
		if (null != thriftObject.languageFilterFailuresBeforeKick) {
			this.languageFilterFailuresBeforeKick = thriftObject.languageFilterFailuresBeforeKick;
		}
		if (null != thriftObject.languageFilterKicksBeforeBan) {
			this.languageFilterKicksBeforeBan = thriftObject.languageFilterKicksBeforeBan;
		}
		if (null != thriftObject.languageFilterBanDuration) {
			this.languageFilterBanDuration = thriftObject.languageFilterBanDuration;
		}
		if (null != thriftObject.languageFilterResetAfterKick) {
			this.languageFilterResetAfterKick = thriftObject.languageFilterResetAfterKick;
		}
		if (null != thriftObject.usingFloodingFilter) {
			this.usingFloodingFilter = thriftObject.usingFloodingFilter;
		}
		if (null != thriftObject.floodingFilterSpecified) {
			this.floodingFilterSpecified = thriftObject.floodingFilterSpecified;
		}
		if (null != thriftObject.floodingFilterName) {
			this.floodingFilterName = thriftObject.floodingFilterName;
		}
		if (null != thriftObject.floodingFilterFailuresBeforeKick) {
			this.floodingFilterFailuresBeforeKick = thriftObject.floodingFilterFailuresBeforeKick;
		}
		if (null != thriftObject.floodingFilterKicksBeforeBan) {
			this.floodingFilterKicksBeforeBan = thriftObject.floodingFilterKicksBeforeBan;
		}
		if (null != thriftObject.floodingFilterBanDuration) {
			this.floodingFilterBanDuration = thriftObject.floodingFilterBanDuration;
		}
		if (null != thriftObject.floodingFilterResetAfterKick) {
			this.floodingFilterResetAfterKick = thriftObject.floodingFilterResetAfterKick;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneName) {
			thriftObject.zoneName = this.zoneName;
		}
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomName) {
			thriftObject.roomName = this.roomName;
		}
		if (null != this.capacity) {
			thriftObject.capacity = this.capacity;
		}
		if (null != this.password) {
			thriftObject.password = this.password;
		}
		if (null != this.roomDescription) {
			thriftObject.roomDescription = this.roomDescription;
		}
		if (null != this.persistent) {
			thriftObject.persistent = this.persistent;
		}
		if (null != this.hidden) {
			thriftObject.hidden = this.hidden;
		}
		if (null != this.receivingRoomListUpdates) {
			thriftObject.receivingRoomListUpdates = this.receivingRoomListUpdates;
		}
		if (null != this.receivingRoomAttributeUpdates) {
			thriftObject.receivingRoomAttributeUpdates = this.receivingRoomAttributeUpdates;
		}
		if (null != this.receivingUserListUpdates) {
			thriftObject.receivingUserListUpdates = this.receivingUserListUpdates;
		}
		if (null != this.receivingUserVariableUpdates) {
			thriftObject.receivingUserVariableUpdates = this.receivingUserVariableUpdates;
		}
		if (null != this.receivingRoomVariableUpdates) {
			thriftObject.receivingRoomVariableUpdates = this.receivingRoomVariableUpdates;
		}
		if (null != this.receivingVideoEvents) {
			thriftObject.receivingVideoEvents = this.receivingVideoEvents;
		}
		if (null != this.nonOperatorUpdateAllowed) {
			thriftObject.nonOperatorUpdateAllowed = this.nonOperatorUpdateAllowed;
		}
		if (null != this.nonOperatorVariableUpdateAllowed) {
			thriftObject.nonOperatorVariableUpdateAllowed = this.nonOperatorVariableUpdateAllowed;
		}
		if (null != this.createOrJoinRoom) {
			thriftObject.createOrJoinRoom = this.createOrJoinRoom;
		}
		if (null != this.plugins) {
			thriftObject.plugins = new Array();
			for (var _tKeyVar_0 in this.plugins) {
				_tValVar_0 = this.plugins[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new PluginListEntry(_tValVar_0);
				thriftObject.plugins.push(_listDestVar_0);
			}
		}
		if (null != this.variables) {
			thriftObject.variables = new Array();
			for (var _tKeyVar_0 in this.variables) {
				_tValVar_0 = this.variables[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new RoomVariable(_tValVar_0);
				thriftObject.variables.push(_listDestVar_0);
			}
		}
		if (null != this.usingLanguageFilter) {
			thriftObject.usingLanguageFilter = this.usingLanguageFilter;
		}
		if (null != this.languageFilterSpecified) {
			thriftObject.languageFilterSpecified = this.languageFilterSpecified;
		}
		if (null != this.languageFilterName) {
			thriftObject.languageFilterName = this.languageFilterName;
		}
		if (null != this.languageFilterDeliverMessageOnFailure) {
			thriftObject.languageFilterDeliverMessageOnFailure = this.languageFilterDeliverMessageOnFailure;
		}
		if (null != this.languageFilterFailuresBeforeKick) {
			thriftObject.languageFilterFailuresBeforeKick = this.languageFilterFailuresBeforeKick;
		}
		if (null != this.languageFilterKicksBeforeBan) {
			thriftObject.languageFilterKicksBeforeBan = this.languageFilterKicksBeforeBan;
		}
		if (null != this.languageFilterBanDuration) {
			thriftObject.languageFilterBanDuration = this.languageFilterBanDuration;
		}
		if (null != this.languageFilterResetAfterKick) {
			thriftObject.languageFilterResetAfterKick = this.languageFilterResetAfterKick;
		}
		if (null != this.usingFloodingFilter) {
			thriftObject.usingFloodingFilter = this.usingFloodingFilter;
		}
		if (null != this.floodingFilterSpecified) {
			thriftObject.floodingFilterSpecified = this.floodingFilterSpecified;
		}
		if (null != this.floodingFilterName) {
			thriftObject.floodingFilterName = this.floodingFilterName;
		}
		if (null != this.floodingFilterFailuresBeforeKick) {
			thriftObject.floodingFilterFailuresBeforeKick = this.floodingFilterFailuresBeforeKick;
		}
		if (null != this.floodingFilterKicksBeforeBan) {
			thriftObject.floodingFilterKicksBeforeBan = this.floodingFilterKicksBeforeBan;
		}
		if (null != this.floodingFilterBanDuration) {
			thriftObject.floodingFilterBanDuration = this.floodingFilterBanDuration;
		}
		if (null != this.floodingFilterResetAfterKick) {
			thriftObject.floodingFilterResetAfterKick = this.floodingFilterResetAfterKick;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftCreateRoomRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var CreateRoomVariableRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.CreateRoomVariableRequest;
	}
	this.zoneId = null;
	this.roomId = null;
	this.name = null;
	this.value = null;
	this.locked = null;
	this.persistent = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

CreateRoomVariableRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.name) {
			this.name = thriftObject.name;
		}
		if (null != thriftObject.value) {
			this.value = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.value));
		}
		if (null != thriftObject.locked) {
			this.locked = thriftObject.locked;
		}
		if (null != thriftObject.persistent) {
			this.persistent = thriftObject.persistent;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.name) {
			thriftObject.name = this.name;
		}
		if (null != this.value) {
			thriftObject.value = ElectroServer.ThriftUtil.flattenEsObject(this.value).toThrift();
		}
		if (null != this.locked) {
			thriftObject.locked = this.locked;
		}
		if (null != this.persistent) {
			thriftObject.persistent = this.persistent;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftCreateRoomVariableRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var CrossDomainPolicyRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.CrossDomainRequest;
	}
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

CrossDomainPolicyRequest.prototype = {
	fromThrift : function(thriftObject) {
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftCrossDomainPolicyRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var CrossDomainPolicyResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.CrossDomainResponse;
	}
	this.customFileEnabled = null;
	this.customFileContents = null;
	this.port = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

CrossDomainPolicyResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.customFileEnabled) {
			this.customFileEnabled = thriftObject.customFileEnabled;
		}
		if (null != thriftObject.customFileContents) {
			this.customFileContents = thriftObject.customFileContents;
		}
		if (null != thriftObject.port) {
			this.port = thriftObject.port;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.customFileEnabled) {
			thriftObject.customFileEnabled = this.customFileEnabled;
		}
		if (null != this.customFileContents) {
			thriftObject.customFileContents = this.customFileContents;
		}
		if (null != this.port) {
			thriftObject.port = this.port;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftCrossDomainPolicyResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var DHInitiateKeyExchangeRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.DHInitiate;
	}
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

DHInitiateKeyExchangeRequest.prototype = {
	fromThrift : function(thriftObject) {
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftDHInitiateKeyExchangeRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var DHPublicNumbersResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.DHPublicNumbers;
	}
	this.baseNumber = null;
	this.primeNumber = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

DHPublicNumbersResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.baseNumber) {
			this.baseNumber = thriftObject.baseNumber;
		}
		if (null != thriftObject.primeNumber) {
			this.primeNumber = thriftObject.primeNumber;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.baseNumber) {
			thriftObject.baseNumber = this.baseNumber;
		}
		if (null != this.primeNumber) {
			thriftObject.primeNumber = this.primeNumber;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftDHPublicNumbersResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var DHSharedModulusRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.DHSharedModulusRequest;
	}
	this.number = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

DHSharedModulusRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.number) {
			this.number = thriftObject.number;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.number) {
			thriftObject.number = this.number;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftDHSharedModulusRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var DHSharedModulusResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.DHSharedModulusResponse;
	}
	this.number = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

DHSharedModulusResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.number) {
			this.number = thriftObject.number;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.number) {
			thriftObject.number = this.number;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftDHSharedModulusResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var DataType = {
	"Integer" : 1,
	"String" : 2,
	"Double" : 3,
	"Float" : 4,
	"Boolean" : 5,
	"Byte" : 6,
	"Character" : 7,
	"Long" : 8,
	"Short" : 9,
	"EsObject" : 10,
	"EsObjectArray" : 11,
	"IntegerArray" : 12,
	"StringArray" : 13,
	"DoubleArray" : 14,
	"FloatArray" : 15,
	"BooleanArray" : 16,
	"ByteArray" : 17,
	"CharacterArray" : 18,
	"LongArray" : 19,
	"ShortArray" : 20,
	"Number" : 21,
	"NumberArray" : 22,
};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var DeleteRoomVariableRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.DeleteRoomVariableRequest;
	}
	this.zoneId = null;
	this.roomId = null;
	this.name = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

DeleteRoomVariableRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.name) {
			this.name = thriftObject.name;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.name) {
			thriftObject.name = this.name;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftDeleteRoomVariableRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var DeleteUserVariableRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.DeleteUserVariableRequest;
	}
	this.name = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

DeleteUserVariableRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.name) {
			this.name = thriftObject.name;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.name) {
			thriftObject.name = this.name;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftDeleteUserVariableRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var EncryptionStateChangeEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.EncryptionStateChange;
	}
	this.encryptionOn = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

EncryptionStateChangeEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.encryptionOn) {
			this.encryptionOn = thriftObject.encryptionOn;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.encryptionOn) {
			thriftObject.encryptionOn = this.encryptionOn;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftEncryptionStateChangeEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var ErrorType = {
	"UserNameExists" : 1,
	"UserAlreadyLoggedIn" : 2,
	"InvalidMessageNumber" : 3,
	"InboundMessageFailedValidation" : 4,
	"MaximumClientConnectionsReached" : 5,
	"ZoneNotFound" : 6,
	"RoomNotFound" : 7,
	"RoomAtCapacity" : 8,
	"RoomPasswordMismatch" : 9,
	"GatewayPaused" : 10,
	"AccessDenied" : 11,
	"RoomVariableLocked" : 12,
	"RoomVariableAlreadyExists" : 13,
	"DuplicateRoomName" : 14,
	"DuplicateZoneName" : 15,
	"UserVariableAlreadyExists" : 16,
	"UserVariableDoesNotExist" : 17,
	"ZoneAllocationFailure" : 18,
	"RoomAllocationFailure" : 19,
	"UserBanned" : 20,
	"UserAlreadyInRoom" : 21,
	"LanguageFilterCheckFailed" : 22,
	"RegistryTransactionEncounteredError" : 23,
	"ActionRequiresLogin" : 24,
	"GenericError" : 25,
	"PluginNotFound" : 26,
	"LoginEventHandlerFailure" : 27,
	"InvalidUserName" : 28,
	"ExtensionNotFound" : 29,
	"PluginInitializationFailed" : 30,
	"EventNotFound" : 31,
	"FloodingFilterCheckFailed" : 32,
	"UserNotJoinedToRoom" : 33,
	"ManagedObjectNotFound" : 34,
	"IdleTimeReached" : 35,
	"ServerError" : 36,
	"OperationNotSupported" : 37,
	"InvalidLanguageFilterSettings" : 38,
	"InvalidFloodingFilterSettings" : 39,
	"ExtensionForcedReload" : 40,
	"UserLogOutRequested" : 41,
	"OnlyRtmpConnectionRemains" : 42,
	"GameDoesntExist" : 43,
	"FailedToJoinGameRoom" : 44,
	"GameIsLocked" : 45,
	"InvalidParameters" : 46,
	"PublicMessageRejected" : 47,
	"UserKickedFromServer" : 48,
	"LanguageFilterNotFound" : 49,
	"InvalidCryptoState" : 50,
	"FloodingFilterNotFound" : 51,
	"ConnectionFailed" : 52,
	"MultipleZonesFound" : 53,
	"MultipleRoomsFound" : 54,
};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var EsNumber = function(thriftObject) {
	this.value = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

EsNumber.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.value) {
			this.value = thriftObject.value;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.value) {
			thriftObject.value = this.value;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftEsNumber();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var EvictUserFromRoomRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.EvictUserFromRoomRequest;
	}
	this.zoneId = null;
	this.roomId = null;
	this.userName = null;
	this.reason = null;
	this.ban = null;
	this.duration = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

EvictUserFromRoomRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.userName) {
			this.userName = thriftObject.userName;
		}
		if (null != thriftObject.reason) {
			this.reason = thriftObject.reason;
		}
		if (null != thriftObject.ban) {
			this.ban = thriftObject.ban;
		}
		if (null != thriftObject.duration) {
			this.duration = thriftObject.duration;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.userName) {
			thriftObject.userName = this.userName;
		}
		if (null != this.reason) {
			thriftObject.reason = this.reason;
		}
		if (null != this.ban) {
			thriftObject.ban = this.ban;
		}
		if (null != this.duration) {
			thriftObject.duration = this.duration;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftEvictUserFromRoomRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var FindGamesRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.FindGamesRequest;
	}
	this.searchCriteria = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

FindGamesRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.searchCriteria) {
			this.searchCriteria = new SearchCriteria(thriftObject.searchCriteria);
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.searchCriteria) {
			thriftObject.searchCriteria = this.searchCriteria.toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftFindGamesRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var FindGamesResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.FindGamesResponse;
	}
	this.games = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

FindGamesResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.games) {
			this.games = new Array();
			for (var _tKeyVar_0 in thriftObject.games) {
				_tValVar_0 = thriftObject.games[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new ServerGame(_tValVar_0);
				this.games.push(_listDestVar_0);
			}
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.games) {
			thriftObject.games = new Array();
			for (var _tKeyVar_0 in this.games) {
				_tValVar_0 = this.games[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new ServerGame(_tValVar_0);
				thriftObject.games.push(_listDestVar_0);
			}
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftFindGamesResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var FindZoneAndRoomByNameRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.FindZoneAndRoomByNameRequest;
	}
	this.zoneName = null;
	this.roomName = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

FindZoneAndRoomByNameRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneName) {
			this.zoneName = thriftObject.zoneName;
		}
		if (null != thriftObject.roomName) {
			this.roomName = thriftObject.roomName;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneName) {
			thriftObject.zoneName = this.zoneName;
		}
		if (null != this.roomName) {
			thriftObject.roomName = this.roomName;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftFindZoneAndRoomByNameRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var FindZoneAndRoomByNameResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.FindZoneAndRoomByNameResponse;
	}
	this.roomAndZoneList = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

FindZoneAndRoomByNameResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.roomAndZoneList) {
			this.roomAndZoneList = new Array();
			for (var _tKeyVar_0 in thriftObject.roomAndZoneList) {
				_tValVar_0 = thriftObject.roomAndZoneList[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new Array();
				for (var _tKeyVar_1 in _tValVar_0) {
					_tValVar_1 = _tValVar_0[_tKeyVar_1];
					var _listDestVar_1;
					_listDestVar_1 = _tValVar_1;
					_listDestVar_0.push(_listDestVar_1);
				}
				this.roomAndZoneList.push(_listDestVar_0);
			}
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.roomAndZoneList) {
			thriftObject.roomAndZoneList = new Array();
			for (var _tKeyVar_0 in this.roomAndZoneList) {
				_tValVar_0 = this.roomAndZoneList[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new Array();
				for (var _tKeyVar_1 in _tValVar_0) {
					_tValVar_1 = _tValVar_0[_tKeyVar_1];
					var _listDestVar_1;
					_listDestVar_1 = _tValVar_1;
					_listDestVar_0.push(_listDestVar_1);
				}
				thriftObject.roomAndZoneList.push(_listDestVar_0);
			}
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftFindZoneAndRoomByNameResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var FlattenedEsObject = function(thriftObject) {
	this.encodedEntries = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

FlattenedEsObject.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.encodedEntries) {
			this.encodedEntries = new Array();
			for (var _tKeyVar_0 in thriftObject.encodedEntries) {
				_tValVar_0 = thriftObject.encodedEntries[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				this.encodedEntries.push(_listDestVar_0);
			}
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.encodedEntries) {
			thriftObject.encodedEntries = new Array();
			for (var _tKeyVar_0 in this.encodedEntries) {
				_tValVar_0 = this.encodedEntries[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				thriftObject.encodedEntries.push(_listDestVar_0);
			}
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftFlattenedEsObject();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var FlattenedEsObjectRO = function(thriftObject) {
	this.encodedEntries = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

FlattenedEsObjectRO.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.encodedEntries) {
			this.encodedEntries = new Array();
			for (var _tKeyVar_0 in thriftObject.encodedEntries) {
				_tValVar_0 = thriftObject.encodedEntries[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				this.encodedEntries.push(_listDestVar_0);
			}
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.encodedEntries) {
			thriftObject.encodedEntries = new Array();
			for (var _tKeyVar_0 in this.encodedEntries) {
				_tValVar_0 = this.encodedEntries[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				thriftObject.encodedEntries.push(_listDestVar_0);
			}
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftFlattenedEsObjectRO();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var GatewayKickUserRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.GatewayKickUserRequest;
	}
	this.clientId = null;
	this.error = null;
	this.esObject = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

GatewayKickUserRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.clientId) {
			this.clientId = thriftObject.clientId;
		}
		if (null != thriftObject.error) {
			this.error = thriftObject.error;
		}
		if (null != thriftObject.esObject) {
			this.esObject = ElectroServer.ThriftUtil.unflattenEsObjectRO(new FlattenedEsObjectRO(thriftObject.esObject));
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.clientId) {
			thriftObject.clientId = this.clientId;
		}
		if (null != this.error) {
			thriftObject.error = this.error;
		}
		if (null != this.esObject) {
			thriftObject.esObject = ElectroServer.ThriftUtil.flattenEsObjectRO(this.esObject).toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftGatewayKickUserRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var GatewayStatistics = function(thriftObject) {
	this.bytesInTotal = null;
	this.bytesOutTotal = null;
	this.messagesInTotal = null;
	this.messagesOutTotal = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

GatewayStatistics.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.bytesInTotal) {
			this.bytesInTotal = thriftObject.bytesInTotal;
		}
		if (null != thriftObject.bytesOutTotal) {
			this.bytesOutTotal = thriftObject.bytesOutTotal;
		}
		if (null != thriftObject.messagesInTotal) {
			this.messagesInTotal = thriftObject.messagesInTotal;
		}
		if (null != thriftObject.messagesOutTotal) {
			this.messagesOutTotal = thriftObject.messagesOutTotal;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.bytesInTotal) {
			thriftObject.bytesInTotal = this.bytesInTotal;
		}
		if (null != this.bytesOutTotal) {
			thriftObject.bytesOutTotal = this.bytesOutTotal;
		}
		if (null != this.messagesInTotal) {
			thriftObject.messagesInTotal = this.messagesInTotal;
		}
		if (null != this.messagesOutTotal) {
			thriftObject.messagesOutTotal = this.messagesOutTotal;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftGatewayStatistics();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var GenericErrorResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.GenericErrorResponse;
	}
	this.requestMessageType = null;
	this.errorType = null;
	this.extraData = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

GenericErrorResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.requestMessageType) {
			this.requestMessageType = thriftObject.requestMessageType;
		}
		if (null != thriftObject.errorType) {
			this.errorType = thriftObject.errorType;
		}
		if (null != thriftObject.extraData) {
			this.extraData = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.extraData));
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.requestMessageType) {
			thriftObject.requestMessageType = this.requestMessageType;
		}
		if (null != this.errorType) {
			thriftObject.errorType = this.errorType;
		}
		if (null != this.extraData) {
			thriftObject.extraData = ElectroServer.ThriftUtil.flattenEsObject(this.extraData).toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftGenericErrorResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var GetRoomsInZoneRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.GetRoomsInZoneRequest;
	}
	this.zoneId = null;
	this.zoneName = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

GetRoomsInZoneRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.zoneName) {
			this.zoneName = thriftObject.zoneName;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.zoneName) {
			thriftObject.zoneName = this.zoneName;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftGetRoomsInZoneRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var GetRoomsInZoneResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.GetRoomsInZoneResponse;
	}
	this.zoneId = null;
	this.zoneName = null;
	this.entries = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

GetRoomsInZoneResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.zoneName) {
			this.zoneName = thriftObject.zoneName;
		}
		if (null != thriftObject.entries) {
			this.entries = new Array();
			for (var _tKeyVar_0 in thriftObject.entries) {
				_tValVar_0 = thriftObject.entries[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new RoomListEntry(_tValVar_0);
				this.entries.push(_listDestVar_0);
			}
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.zoneName) {
			thriftObject.zoneName = this.zoneName;
		}
		if (null != this.entries) {
			thriftObject.entries = new Array();
			for (var _tKeyVar_0 in this.entries) {
				_tValVar_0 = this.entries[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new RoomListEntry(_tValVar_0);
				thriftObject.entries.push(_listDestVar_0);
			}
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftGetRoomsInZoneResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var GetServerLocalTimeRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.GetServerLocalTimeRequest;
	}
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

GetServerLocalTimeRequest.prototype = {
	fromThrift : function(thriftObject) {
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftGetServerLocalTimeRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var GetServerLocalTimeResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.GetServerLocalTimeResponse;
	}
	this.serverLocalTimeInMilliseconds = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

GetServerLocalTimeResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.serverLocalTimeInMilliseconds) {
			this.serverLocalTimeInMilliseconds = thriftObject.serverLocalTimeInMilliseconds;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.serverLocalTimeInMilliseconds) {
			thriftObject.serverLocalTimeInMilliseconds = this.serverLocalTimeInMilliseconds;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftGetServerLocalTimeResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var GetUserCountRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.GetUserCountRequest;
	}
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

GetUserCountRequest.prototype = {
	fromThrift : function(thriftObject) {
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftGetUserCountRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var GetUserCountResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.GetUserCountResponse;
	}
	this.count = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

GetUserCountResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.count) {
			this.count = thriftObject.count;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.count) {
			thriftObject.count = this.count;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftGetUserCountResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var GetUserVariablesRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.GetUserVariablesRequest;
	}
	this.userName = null;
	this.userVariableNames = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

GetUserVariablesRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.userName) {
			this.userName = thriftObject.userName;
		}
		if (null != thriftObject.userVariableNames) {
			this.userVariableNames = new Array();
			for (var _tKeyVar_0 in thriftObject.userVariableNames) {
				_tValVar_0 = thriftObject.userVariableNames[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				this.userVariableNames.push(_listDestVar_0);
			}
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.userName) {
			thriftObject.userName = this.userName;
		}
		if (null != this.userVariableNames) {
			thriftObject.userVariableNames = new Array();
			for (var _tKeyVar_0 in this.userVariableNames) {
				_tValVar_0 = this.userVariableNames[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				thriftObject.userVariableNames.push(_listDestVar_0);
			}
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftGetUserVariablesRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var GetUserVariablesResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.GetUserVariablesResponse;
	}
	this.userName = null;
	this.userVariables = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

GetUserVariablesResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.userName) {
			this.userName = thriftObject.userName;
		}
		if (null != thriftObject.userVariables) {
			this.userVariables = {};
			for (var _tKeyVar_0 in thriftObject.userVariables) {
				var _tValVar_0 = thriftObject.userVariables[_tKeyVar_0];
				var _keyVar_0;
				_keyVar_0 = _tKeyVar_0;
				var _valVar_0;
				_valVar_0 = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(_tValVar_0));
				this.userVariables[_keyVar_0] = _valVar_0;
			}
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.userName) {
			thriftObject.userName = this.userName;
		}
		if (null != this.userVariables) {
			thriftObject.userVariables = {};
			for (var _tKeyVar_0 in this.userVariables) {
				var _tValVar_0 = this.userVariables[_tKeyVar_0];
				var _keyVar_0;
				_keyVar_0 = _tKeyVar_0;
				var _valVar_0;
				_valVar_0 = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(_tValVar_0));
				thriftObject.userVariables[_keyVar_0] = _valVar_0;
			}
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftGetUserVariablesResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var GetUsersInRoomRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.GetUsersInRoomRequest;
	}
	this.zoneId = null;
	this.roomId = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

GetUsersInRoomRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftGetUsersInRoomRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var GetUsersInRoomResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.GetUsersInRoomResponse;
	}
	this.zoneId = null;
	this.roomId = null;
	this.users = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

GetUsersInRoomResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.users) {
			this.users = new Array();
			for (var _tKeyVar_0 in thriftObject.users) {
				_tValVar_0 = thriftObject.users[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new UserListEntry(_tValVar_0);
				this.users.push(_listDestVar_0);
			}
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.users) {
			thriftObject.users = new Array();
			for (var _tKeyVar_0 in this.users) {
				_tValVar_0 = this.users[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new UserListEntry(_tValVar_0);
				thriftObject.users.push(_listDestVar_0);
			}
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftGetUsersInRoomResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var GetZonesRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.GetZonesRequest;
	}
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

GetZonesRequest.prototype = {
	fromThrift : function(thriftObject) {
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftGetZonesRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var GetZonesResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.GetZonesResponse;
	}
	this.zones = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

GetZonesResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zones) {
			this.zones = new Array();
			for (var _tKeyVar_0 in thriftObject.zones) {
				_tValVar_0 = thriftObject.zones[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new ZoneListEntry(_tValVar_0);
				this.zones.push(_listDestVar_0);
			}
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zones) {
			thriftObject.zones = new Array();
			for (var _tKeyVar_0 in this.zones) {
				_tValVar_0 = this.zones[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new ZoneListEntry(_tValVar_0);
				thriftObject.zones.push(_listDestVar_0);
			}
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftGetZonesResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var JoinGameRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.JoinGameRequest;
	}
	this.gameId = null;
	this.password = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

JoinGameRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.gameId) {
			this.gameId = thriftObject.gameId;
		}
		if (null != thriftObject.password) {
			this.password = thriftObject.password;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.gameId) {
			thriftObject.gameId = this.gameId;
		}
		if (null != this.password) {
			thriftObject.password = this.password;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftJoinGameRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var JoinRoomEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.JoinRoomEvent;
	}
	this.zoneId = null;
	this.roomId = null;
	this.roomName = null;
	this.roomDescription = null;
	this.hasPassword = null;
	this.hidden = null;
	this.capacity = null;
	this.users = null;
	this.roomVariables = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

JoinRoomEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.roomName) {
			this.roomName = thriftObject.roomName;
		}
		if (null != thriftObject.roomDescription) {
			this.roomDescription = thriftObject.roomDescription;
		}
		if (null != thriftObject.hasPassword) {
			this.hasPassword = thriftObject.hasPassword;
		}
		if (null != thriftObject.hidden) {
			this.hidden = thriftObject.hidden;
		}
		if (null != thriftObject.capacity) {
			this.capacity = thriftObject.capacity;
		}
		if (null != thriftObject.users) {
			this.users = new Array();
			for (var _tKeyVar_0 in thriftObject.users) {
				_tValVar_0 = thriftObject.users[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new UserListEntry(_tValVar_0);
				this.users.push(_listDestVar_0);
			}
		}
		if (null != thriftObject.roomVariables) {
			this.roomVariables = new Array();
			for (var _tKeyVar_0 in thriftObject.roomVariables) {
				_tValVar_0 = thriftObject.roomVariables[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new RoomVariable(_tValVar_0);
				this.roomVariables.push(_listDestVar_0);
			}
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.roomName) {
			thriftObject.roomName = this.roomName;
		}
		if (null != this.roomDescription) {
			thriftObject.roomDescription = this.roomDescription;
		}
		if (null != this.hasPassword) {
			thriftObject.hasPassword = this.hasPassword;
		}
		if (null != this.hidden) {
			thriftObject.hidden = this.hidden;
		}
		if (null != this.capacity) {
			thriftObject.capacity = this.capacity;
		}
		if (null != this.users) {
			thriftObject.users = new Array();
			for (var _tKeyVar_0 in this.users) {
				_tValVar_0 = this.users[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new UserListEntry(_tValVar_0);
				thriftObject.users.push(_listDestVar_0);
			}
		}
		if (null != this.roomVariables) {
			thriftObject.roomVariables = new Array();
			for (var _tKeyVar_0 in this.roomVariables) {
				_tValVar_0 = this.roomVariables[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new RoomVariable(_tValVar_0);
				thriftObject.roomVariables.push(_listDestVar_0);
			}
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftJoinRoomEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var JoinRoomRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.JoinRoomRequest;
	}
	this.zoneName = null;
	this.roomName = null;
	this.zoneId = null;
	this.roomId = null;
	this.password = null;
	this.receivingRoomListUpdates = null;
	this.receivingRoomAttributeUpdates = null;
	this.receivingUserListUpdates = null;
	this.receivingUserVariableUpdates = null;
	this.receivingRoomVariableUpdates = null;
	this.receivingVideoEvents = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

JoinRoomRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneName) {
			this.zoneName = thriftObject.zoneName;
		}
		if (null != thriftObject.roomName) {
			this.roomName = thriftObject.roomName;
		}
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.password) {
			this.password = thriftObject.password;
		}
		if (null != thriftObject.receivingRoomListUpdates) {
			this.receivingRoomListUpdates = thriftObject.receivingRoomListUpdates;
		}
		if (null != thriftObject.receivingRoomAttributeUpdates) {
			this.receivingRoomAttributeUpdates = thriftObject.receivingRoomAttributeUpdates;
		}
		if (null != thriftObject.receivingUserListUpdates) {
			this.receivingUserListUpdates = thriftObject.receivingUserListUpdates;
		}
		if (null != thriftObject.receivingUserVariableUpdates) {
			this.receivingUserVariableUpdates = thriftObject.receivingUserVariableUpdates;
		}
		if (null != thriftObject.receivingRoomVariableUpdates) {
			this.receivingRoomVariableUpdates = thriftObject.receivingRoomVariableUpdates;
		}
		if (null != thriftObject.receivingVideoEvents) {
			this.receivingVideoEvents = thriftObject.receivingVideoEvents;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneName) {
			thriftObject.zoneName = this.zoneName;
		}
		if (null != this.roomName) {
			thriftObject.roomName = this.roomName;
		}
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.password) {
			thriftObject.password = this.password;
		}
		if (null != this.receivingRoomListUpdates) {
			thriftObject.receivingRoomListUpdates = this.receivingRoomListUpdates;
		}
		if (null != this.receivingRoomAttributeUpdates) {
			thriftObject.receivingRoomAttributeUpdates = this.receivingRoomAttributeUpdates;
		}
		if (null != this.receivingUserListUpdates) {
			thriftObject.receivingUserListUpdates = this.receivingUserListUpdates;
		}
		if (null != this.receivingUserVariableUpdates) {
			thriftObject.receivingUserVariableUpdates = this.receivingUserVariableUpdates;
		}
		if (null != this.receivingRoomVariableUpdates) {
			thriftObject.receivingRoomVariableUpdates = this.receivingRoomVariableUpdates;
		}
		if (null != this.receivingVideoEvents) {
			thriftObject.receivingVideoEvents = this.receivingVideoEvents;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftJoinRoomRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var JoinZoneEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.JoinZoneEvent;
	}
	this.zoneId = null;
	this.zoneName = null;
	this.rooms = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

JoinZoneEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.zoneName) {
			this.zoneName = thriftObject.zoneName;
		}
		if (null != thriftObject.rooms) {
			this.rooms = new Array();
			for (var _tKeyVar_0 in thriftObject.rooms) {
				_tValVar_0 = thriftObject.rooms[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new RoomListEntry(_tValVar_0);
				this.rooms.push(_listDestVar_0);
			}
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.zoneName) {
			thriftObject.zoneName = this.zoneName;
		}
		if (null != this.rooms) {
			thriftObject.rooms = new Array();
			for (var _tKeyVar_0 in this.rooms) {
				_tValVar_0 = this.rooms[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new RoomListEntry(_tValVar_0);
				thriftObject.rooms.push(_listDestVar_0);
			}
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftJoinZoneEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var LeaveRoomEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.LeaveRoomEvent;
	}
	this.zoneId = null;
	this.roomId = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

LeaveRoomEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftLeaveRoomEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var LeaveRoomRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.LeaveRoomRequest;
	}
	this.zoneId = null;
	this.roomId = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

LeaveRoomRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftLeaveRoomRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var LeaveZoneEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.LeaveZoneEvent;
	}
	this.zoneId = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

LeaveZoneEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftLeaveZoneEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var LogOutRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.LogOutRequest;
	}
	this.dropConnection = null;
	this.dropAllConnections = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

LogOutRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.dropConnection) {
			this.dropConnection = thriftObject.dropConnection;
		}
		if (null != thriftObject.dropAllConnections) {
			this.dropAllConnections = thriftObject.dropAllConnections;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.dropConnection) {
			thriftObject.dropConnection = this.dropConnection;
		}
		if (null != this.dropAllConnections) {
			thriftObject.dropAllConnections = this.dropAllConnections;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftLogOutRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var LoginRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.LoginRequest;
	}
	this.userName = null;
	this.password = null;
	this.sharedSecret = null;
	this.esObject = null;
	this.userVariables = null;
	this.protocol = null;
	this.hashId = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

LoginRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.userName) {
			this.userName = thriftObject.userName;
		}
		if (null != thriftObject.password) {
			this.password = thriftObject.password;
		}
		if (null != thriftObject.sharedSecret) {
			this.sharedSecret = thriftObject.sharedSecret;
		}
		if (null != thriftObject.esObject) {
			this.esObject = ElectroServer.ThriftUtil.unflattenEsObjectRO(new FlattenedEsObjectRO(thriftObject.esObject));
		}
		if (null != thriftObject.userVariables) {
			this.userVariables = {};
			for (var _tKeyVar_0 in thriftObject.userVariables) {
				var _tValVar_0 = thriftObject.userVariables[_tKeyVar_0];
				var _keyVar_0;
				_keyVar_0 = _tKeyVar_0;
				var _valVar_0;
				_valVar_0 = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(_tValVar_0));
				this.userVariables[_keyVar_0] = _valVar_0;
			}
		}
		if (null != thriftObject.protocol) {
			this.protocol = thriftObject.protocol;
		}
		if (null != thriftObject.hashId) {
			this.hashId = thriftObject.hashId;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.userName) {
			thriftObject.userName = this.userName;
		}
		if (null != this.password) {
			thriftObject.password = this.password;
		}
		if (null != this.sharedSecret) {
			thriftObject.sharedSecret = this.sharedSecret;
		}
		if (null != this.esObject) {
			thriftObject.esObject = ElectroServer.ThriftUtil.flattenEsObjectRO(this.esObject).toThrift();
		}
		if (null != this.userVariables) {
			thriftObject.userVariables = {};
			for (var _tKeyVar_0 in this.userVariables) {
				var _tValVar_0 = this.userVariables[_tKeyVar_0];
				var _keyVar_0;
				_keyVar_0 = _tKeyVar_0;
				var _valVar_0;
				_valVar_0 = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(_tValVar_0));
				thriftObject.userVariables[_keyVar_0] = _valVar_0;
			}
		}
		if (null != this.protocol) {
			thriftObject.protocol = this.protocol;
		}
		if (null != this.hashId) {
			thriftObject.hashId = this.hashId;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftLoginRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var LoginResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.LoginResponse;
	}
	this.successful = null;
	this.error = null;
	this.esObject = null;
	this.userName = null;
	this.userVariables = null;
	this.buddyListEntries = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

LoginResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.successful) {
			this.successful = thriftObject.successful;
		}
		if (null != thriftObject.error) {
			this.error = thriftObject.error;
		}
		if (null != thriftObject.esObject) {
			this.esObject = ElectroServer.ThriftUtil.unflattenEsObjectRO(new FlattenedEsObjectRO(thriftObject.esObject));
		}
		if (null != thriftObject.userName) {
			this.userName = thriftObject.userName;
		}
		if (null != thriftObject.userVariables) {
			this.userVariables = {};
			for (var _tKeyVar_0 in thriftObject.userVariables) {
				var _tValVar_0 = thriftObject.userVariables[_tKeyVar_0];
				var _keyVar_0;
				_keyVar_0 = _tKeyVar_0;
				var _valVar_0;
				_valVar_0 = ElectroServer.ThriftUtil.unflattenEsObjectRO(new FlattenedEsObjectRO(_tValVar_0));
				this.userVariables[_keyVar_0] = _valVar_0;
			}
		}
		if (null != thriftObject.buddyListEntries) {
			this.buddyListEntries = {};
			for (var _tKeyVar_0 in thriftObject.buddyListEntries) {
				var _tValVar_0 = thriftObject.buddyListEntries[_tKeyVar_0];
				var _keyVar_0;
				_keyVar_0 = _tKeyVar_0;
				var _valVar_0;
				_valVar_0 = ElectroServer.ThriftUtil.unflattenEsObjectRO(new FlattenedEsObjectRO(_tValVar_0));
				this.buddyListEntries[_keyVar_0] = _valVar_0;
			}
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.successful) {
			thriftObject.successful = this.successful;
		}
		if (null != this.error) {
			thriftObject.error = this.error;
		}
		if (null != this.esObject) {
			thriftObject.esObject = ElectroServer.ThriftUtil.flattenEsObjectRO(this.esObject).toThrift();
		}
		if (null != this.userName) {
			thriftObject.userName = this.userName;
		}
		if (null != this.userVariables) {
			thriftObject.userVariables = {};
			for (var _tKeyVar_0 in this.userVariables) {
				var _tValVar_0 = this.userVariables[_tKeyVar_0];
				var _keyVar_0;
				_keyVar_0 = _tKeyVar_0;
				var _valVar_0;
				_valVar_0 = ElectroServer.ThriftUtil.unflattenEsObjectRO(new FlattenedEsObjectRO(_tValVar_0));
				thriftObject.userVariables[_keyVar_0] = _valVar_0;
			}
		}
		if (null != this.buddyListEntries) {
			thriftObject.buddyListEntries = {};
			for (var _tKeyVar_0 in this.buddyListEntries) {
				var _tValVar_0 = this.buddyListEntries[_tKeyVar_0];
				var _keyVar_0;
				_keyVar_0 = _tKeyVar_0;
				var _valVar_0;
				_valVar_0 = ElectroServer.ThriftUtil.unflattenEsObjectRO(new FlattenedEsObjectRO(_tValVar_0));
				thriftObject.buddyListEntries[_keyVar_0] = _valVar_0;
			}
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftLoginResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var MessageType = {
	"CrossDomainRequest" : 1,
	"CreateRoomRequest" : 2,
	"JoinRoomRequest" : 3,
	"LoginRequest" : 4,
	"LogOutRequest" : 5,
	"ValidateAdditionalLoginRequest" : 6,
	"ValidateAdditionalLoginResponse" : 7,
	"PublicMessageRequest" : 8,
	"PrivateMessageRequest" : 9,
	"LeaveRoomRequest" : 10,
	"CreateRoomVariableRequest" : 11,
	"DeleteRoomVariableRequest" : 12,
	"UpdateRoomVariableRequest" : 13,
	"GetZonesRequest" : 14,
	"GetRoomsInZoneRequest" : 15,
	"UpdateRoomDetailsRequest" : 16,
	"AddRoomOperatorRequest" : 17,
	"RemoveRoomOperatorRequest" : 18,
	"FindZoneAndRoomByNameRequest" : 19,
	"GetUsersInRoomRequest" : 20,
	"DeleteUserVariableRequest" : 21,
	"UpdateUserVariableRequest" : 22,
	"AddBuddiesRequest" : 23,
	"RemoveBuddiesRequest" : 24,
	"EvictUserFromRoomRequest" : 25,
	"GetUserCountRequest" : 26,
	"PluginRequest" : 27,
	"CreateOrJoinGameRequest" : 28,
	"JoinGameRequest" : 29,
	"FindGamesRequest" : 30,
	"GetUserVariablesRequest" : 31,
	"AggregatePluginRequest" : 32,
	"GetServerLocalTimeRequest" : 33,
	"ConnectionResponse" : 34,
	"CrossDomainResponse" : 35,
	"LoginResponse" : 36,
	"GetZonesResponse" : 37,
	"GetRoomsInZoneResponse" : 38,
	"GenericErrorResponse" : 39,
	"FindZoneAndRoomByNameResponse" : 40,
	"GetUsersInRoomResponse" : 41,
	"GetUserCountResponse" : 42,
	"CreateOrJoinGameResponse" : 43,
	"FindGamesResponse" : 44,
	"GetUserVariablesResponse" : 45,
	"AddBuddiesResponse" : 46,
	"RemoveBuddiesResponse" : 47,
	"GetServerLocalTimeResponse" : 48,
	"PublicMessageEvent" : 49,
	"PrivateMessageEvent" : 50,
	"SessionIdleEvent" : 51,
	"JoinRoomEvent" : 52,
	"JoinZoneEvent" : 53,
	"UserUpdateEvent" : 54,
	"ZoneUpdateEvent" : 55,
	"LeaveRoomEvent" : 56,
	"LeaveZoneEvent" : 57,
	"RoomVariableUpdateEvent" : 58,
	"UpdateRoomDetailsEvent" : 59,
	"BuddyStatusUpdatedEvent" : 60,
	"UserEvictedFromRoomEvent" : 61,
	"UserVariableUpdateEvent" : 62,
	"PluginMessageEvent" : 63,
	"AggregatePluginMessageEvent" : 64,
	"RegistryConnectToPreferredGatewayRequest" : 65,
	"DisconnectedEvent" : 66,
	"GatewayStartupExceptionsMessage" : 67,
	"RegistryLoginResponse" : 68,
	"RegistryConnectionResponse" : 69,
	"GatewayKickUserRequest" : 70,
	"UdpBackchannelEvent" : 71,
	"Unknown" : 72,
	"RtmpPlayVideo" : 73,
	"RtmpEventResponse" : 74,
	"RtmpRecordVideo" : 75,
	"RtmpPublishVideo" : 76,
	"RtmpUnpublishVideo" : 77,
	"RtmpAppendVideo" : 78,
	"RtmpStreamingStart" : 79,
	"RtmpStreamingStop" : 80,
	"DHInitiate" : 81,
	"DHPublicNumbers" : 82,
	"DHSharedModulusRequest" : 83,
	"DHSharedModulusResponse" : 84,
	"EncryptionStateChange" : 85,
	"ConnectionAttemptResponse" : 86,
	"ConnectionClosedEvent" : 87,
	"RegisterUDPConnectionRequest" : 88,
	"RegisterUDPConnectionResponse" : 89,
	"RemoveUDPConnectionRequest" : 90,
	"RemoveUDPConnectionResponse" : 91,
	"PingRequest" : 92,
	"PingResponse" : 93,
};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var PingRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.PingRequest;
	}
	this.globalResponseRequested = null;
	this.sessionKey = null;
	this.pingRequestId = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

PingRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.globalResponseRequested) {
			this.globalResponseRequested = thriftObject.globalResponseRequested;
		}
		if (null != thriftObject.sessionKey) {
			this.sessionKey = thriftObject.sessionKey;
		}
		if (null != thriftObject.pingRequestId) {
			this.pingRequestId = thriftObject.pingRequestId;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.globalResponseRequested) {
			thriftObject.globalResponseRequested = this.globalResponseRequested;
		}
		if (null != this.sessionKey) {
			thriftObject.sessionKey = this.sessionKey;
		}
		if (null != this.pingRequestId) {
			thriftObject.pingRequestId = this.pingRequestId;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftPingRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var PingResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.PingResponse;
	}
	this.globalResponseRequested = null;
	this.pingRequestId = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

PingResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.globalResponseRequested) {
			this.globalResponseRequested = thriftObject.globalResponseRequested;
		}
		if (null != thriftObject.pingRequestId) {
			this.pingRequestId = thriftObject.pingRequestId;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.globalResponseRequested) {
			thriftObject.globalResponseRequested = this.globalResponseRequested;
		}
		if (null != this.pingRequestId) {
			thriftObject.pingRequestId = this.pingRequestId;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftPingResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var PluginListEntry = function(thriftObject) {
	this.extensionName = null;
	this.pluginName = null;
	this.pluginHandle = null;
	this.pluginId = null;
	this.parameters = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

PluginListEntry.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.extensionName) {
			this.extensionName = thriftObject.extensionName;
		}
		if (null != thriftObject.pluginName) {
			this.pluginName = thriftObject.pluginName;
		}
		if (null != thriftObject.pluginHandle) {
			this.pluginHandle = thriftObject.pluginHandle;
		}
		if (null != thriftObject.pluginId) {
			this.pluginId = thriftObject.pluginId;
		}
		if (null != thriftObject.parameters) {
			this.parameters = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.parameters));
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.extensionName) {
			thriftObject.extensionName = this.extensionName;
		}
		if (null != this.pluginName) {
			thriftObject.pluginName = this.pluginName;
		}
		if (null != this.pluginHandle) {
			thriftObject.pluginHandle = this.pluginHandle;
		}
		if (null != this.pluginId) {
			thriftObject.pluginId = this.pluginId;
		}
		if (null != this.parameters) {
			thriftObject.parameters = ElectroServer.ThriftUtil.flattenEsObject(this.parameters).toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftPluginListEntry();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var PluginMessageEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.PluginMessageEvent;
	}
	this.pluginName = null;
	this.sentToRoom = null;
	this.destinationZoneId = null;
	this.destinationRoomId = null;
	this.roomLevelPlugin = null;
	this.originZoneId = null;
	this.originRoomId = null;
	this.parameters = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

PluginMessageEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.pluginName) {
			this.pluginName = thriftObject.pluginName;
		}
		if (null != thriftObject.sentToRoom) {
			this.sentToRoom = thriftObject.sentToRoom;
		}
		if (null != thriftObject.destinationZoneId) {
			this.destinationZoneId = thriftObject.destinationZoneId;
		}
		if (null != thriftObject.destinationRoomId) {
			this.destinationRoomId = thriftObject.destinationRoomId;
		}
		if (null != thriftObject.roomLevelPlugin) {
			this.roomLevelPlugin = thriftObject.roomLevelPlugin;
		}
		if (null != thriftObject.originZoneId) {
			this.originZoneId = thriftObject.originZoneId;
		}
		if (null != thriftObject.originRoomId) {
			this.originRoomId = thriftObject.originRoomId;
		}
		if (null != thriftObject.parameters) {
			this.parameters = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.parameters));
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.pluginName) {
			thriftObject.pluginName = this.pluginName;
		}
		if (null != this.sentToRoom) {
			thriftObject.sentToRoom = this.sentToRoom;
		}
		if (null != this.destinationZoneId) {
			thriftObject.destinationZoneId = this.destinationZoneId;
		}
		if (null != this.destinationRoomId) {
			thriftObject.destinationRoomId = this.destinationRoomId;
		}
		if (null != this.roomLevelPlugin) {
			thriftObject.roomLevelPlugin = this.roomLevelPlugin;
		}
		if (null != this.originZoneId) {
			thriftObject.originZoneId = this.originZoneId;
		}
		if (null != this.originRoomId) {
			thriftObject.originRoomId = this.originRoomId;
		}
		if (null != this.parameters) {
			thriftObject.parameters = ElectroServer.ThriftUtil.flattenEsObject(this.parameters).toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftPluginMessageEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var PluginRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.PluginRequest;
	}
	this.pluginName = null;
	this.zoneId = null;
	this.roomId = null;
	this.sessionKey = null;
	this.parameters = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

PluginRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.pluginName) {
			this.pluginName = thriftObject.pluginName;
		}
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.sessionKey) {
			this.sessionKey = thriftObject.sessionKey;
		}
		if (null != thriftObject.parameters) {
			this.parameters = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.parameters));
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.pluginName) {
			thriftObject.pluginName = this.pluginName;
		}
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.sessionKey) {
			thriftObject.sessionKey = this.sessionKey;
		}
		if (null != this.parameters) {
			thriftObject.parameters = ElectroServer.ThriftUtil.flattenEsObject(this.parameters).toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftPluginRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var PrivateMessageEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.PrivateMessageEvent;
	}
	this.userName = null;
	this.message = null;
	this.esObject = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

PrivateMessageEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.userName) {
			this.userName = thriftObject.userName;
		}
		if (null != thriftObject.message) {
			this.message = thriftObject.message;
		}
		if (null != thriftObject.esObject) {
			this.esObject = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.esObject));
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.userName) {
			thriftObject.userName = this.userName;
		}
		if (null != this.message) {
			thriftObject.message = this.message;
		}
		if (null != this.esObject) {
			thriftObject.esObject = ElectroServer.ThriftUtil.flattenEsObject(this.esObject).toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftPrivateMessageEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var PrivateMessageRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.PrivateMessageRequest;
	}
	this.message = null;
	this.userNames = null;
	this.esObject = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

PrivateMessageRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.message) {
			this.message = thriftObject.message;
		}
		if (null != thriftObject.userNames) {
			this.userNames = new Array();
			for (var _tKeyVar_0 in thriftObject.userNames) {
				_tValVar_0 = thriftObject.userNames[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				this.userNames.push(_listDestVar_0);
			}
		}
		if (null != thriftObject.esObject) {
			this.esObject = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.esObject));
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.message) {
			thriftObject.message = this.message;
		}
		if (null != this.userNames) {
			thriftObject.userNames = new Array();
			for (var _tKeyVar_0 in this.userNames) {
				_tValVar_0 = this.userNames[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				thriftObject.userNames.push(_listDestVar_0);
			}
		}
		if (null != this.esObject) {
			thriftObject.esObject = ElectroServer.ThriftUtil.flattenEsObject(this.esObject).toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftPrivateMessageRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var Protocol = {
	"BinaryTCP" : 1,
	"RTMP" : 2,
	"BinaryHTTP" : 3,
	"TextTCP" : 4,
	"BinaryUDP" : 5,
};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var ProtocolConfiguration = function(thriftObject) {
	this.messageCompressionThreshold = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

ProtocolConfiguration.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.messageCompressionThreshold) {
			this.messageCompressionThreshold = thriftObject.messageCompressionThreshold;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.messageCompressionThreshold) {
			thriftObject.messageCompressionThreshold = this.messageCompressionThreshold;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftProtocolConfiguration();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var PublicMessageEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.PublicMessageEvent;
	}
	this.message = null;
	this.userName = null;
	this.zoneId = null;
	this.roomId = null;
	this.esObject = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

PublicMessageEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.message) {
			this.message = thriftObject.message;
		}
		if (null != thriftObject.userName) {
			this.userName = thriftObject.userName;
		}
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.esObject) {
			this.esObject = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.esObject));
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.message) {
			thriftObject.message = this.message;
		}
		if (null != this.userName) {
			thriftObject.userName = this.userName;
		}
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.esObject) {
			thriftObject.esObject = ElectroServer.ThriftUtil.flattenEsObject(this.esObject).toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftPublicMessageEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var PublicMessageRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.PublicMessageRequest;
	}
	this.zoneId = null;
	this.roomId = null;
	this.message = null;
	this.esObject = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

PublicMessageRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.message) {
			this.message = thriftObject.message;
		}
		if (null != thriftObject.esObject) {
			this.esObject = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.esObject));
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.message) {
			thriftObject.message = this.message;
		}
		if (null != this.esObject) {
			thriftObject.esObject = ElectroServer.ThriftUtil.flattenEsObject(this.esObject).toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftPublicMessageRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var QuickJoinGameRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.CreateOrJoinGameRequest;
	}
	this.gameType = null;
	this.zoneName = null;
	this.password = null;
	this.locked = null;
	this.hidden = null;
	this.createOnly = null;
	this.gameDetails = null;
	this.criteria = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

QuickJoinGameRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.gameType) {
			this.gameType = thriftObject.gameType;
		}
		if (null != thriftObject.zoneName) {
			this.zoneName = thriftObject.zoneName;
		}
		if (null != thriftObject.password) {
			this.password = thriftObject.password;
		}
		if (null != thriftObject.locked) {
			this.locked = thriftObject.locked;
		}
		if (null != thriftObject.hidden) {
			this.hidden = thriftObject.hidden;
		}
		if (null != thriftObject.createOnly) {
			this.createOnly = thriftObject.createOnly;
		}
		if (null != thriftObject.gameDetails) {
			this.gameDetails = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.gameDetails));
		}
		if (null != thriftObject.criteria) {
			this.criteria = new SearchCriteria(thriftObject.criteria);
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.gameType) {
			thriftObject.gameType = this.gameType;
		}
		if (null != this.zoneName) {
			thriftObject.zoneName = this.zoneName;
		}
		if (null != this.password) {
			thriftObject.password = this.password;
		}
		if (null != this.locked) {
			thriftObject.locked = this.locked;
		}
		if (null != this.hidden) {
			thriftObject.hidden = this.hidden;
		}
		if (null != this.createOnly) {
			thriftObject.createOnly = this.createOnly;
		}
		if (null != this.gameDetails) {
			thriftObject.gameDetails = ElectroServer.ThriftUtil.flattenEsObject(this.gameDetails).toThrift();
		}
		if (null != this.criteria) {
			thriftObject.criteria = this.criteria.toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftQuickJoinGameRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var RegisterUDPConnectionRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.RegisterUDPConnectionRequest;
	}
	this.port = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

RegisterUDPConnectionRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.port) {
			this.port = thriftObject.port;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.port) {
			thriftObject.port = this.port;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftRegisterUDPConnectionRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var RegisterUDPConnectionResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.RegisterUDPConnectionResponse;
	}
	this.successful = null;
	this.sessionKey = null;
	this.error = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

RegisterUDPConnectionResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.successful) {
			this.successful = thriftObject.successful;
		}
		if (null != thriftObject.sessionKey) {
			this.sessionKey = thriftObject.sessionKey;
		}
		if (null != thriftObject.error) {
			this.error = thriftObject.error;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.successful) {
			thriftObject.successful = this.successful;
		}
		if (null != this.sessionKey) {
			thriftObject.sessionKey = this.sessionKey;
		}
		if (null != this.error) {
			thriftObject.error = this.error;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftRegisterUDPConnectionResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var RegistryConnectToPreferredGatewayRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.RegistryConnectToPreferredGatewayRequest;
	}
	this.zoneId = null;
	this.host = null;
	this.port = null;
	this.protocolToUse = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

RegistryConnectToPreferredGatewayRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.host) {
			this.host = thriftObject.host;
		}
		if (null != thriftObject.port) {
			this.port = thriftObject.port;
		}
		if (null != thriftObject.protocolToUse) {
			this.protocolToUse = thriftObject.protocolToUse;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.host) {
			thriftObject.host = this.host;
		}
		if (null != this.port) {
			thriftObject.port = this.port;
		}
		if (null != this.protocolToUse) {
			thriftObject.protocolToUse = this.protocolToUse;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftRegistryConnectToPreferredGatewayRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var RemoveBuddiesRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.RemoveBuddiesRequest;
	}
	this.buddyNames = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

RemoveBuddiesRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.buddyNames) {
			this.buddyNames = new Array();
			for (var _tKeyVar_0 in thriftObject.buddyNames) {
				_tValVar_0 = thriftObject.buddyNames[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				this.buddyNames.push(_listDestVar_0);
			}
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.buddyNames) {
			thriftObject.buddyNames = new Array();
			for (var _tKeyVar_0 in this.buddyNames) {
				_tValVar_0 = this.buddyNames[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				thriftObject.buddyNames.push(_listDestVar_0);
			}
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftRemoveBuddiesRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var RemoveBuddiesResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.RemoveBuddiesResponse;
	}
	this.buddiesRemoved = null;
	this.buddiesNotRemoved = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

RemoveBuddiesResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.buddiesRemoved) {
			this.buddiesRemoved = new Array();
			for (var _tKeyVar_0 in thriftObject.buddiesRemoved) {
				_tValVar_0 = thriftObject.buddiesRemoved[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				this.buddiesRemoved.push(_listDestVar_0);
			}
		}
		if (null != thriftObject.buddiesNotRemoved) {
			this.buddiesNotRemoved = new Array();
			for (var _tKeyVar_0 in thriftObject.buddiesNotRemoved) {
				_tValVar_0 = thriftObject.buddiesNotRemoved[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				this.buddiesNotRemoved.push(_listDestVar_0);
			}
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.buddiesRemoved) {
			thriftObject.buddiesRemoved = new Array();
			for (var _tKeyVar_0 in this.buddiesRemoved) {
				_tValVar_0 = this.buddiesRemoved[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				thriftObject.buddiesRemoved.push(_listDestVar_0);
			}
		}
		if (null != this.buddiesNotRemoved) {
			thriftObject.buddiesNotRemoved = new Array();
			for (var _tKeyVar_0 in this.buddiesNotRemoved) {
				_tValVar_0 = this.buddiesNotRemoved[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = _tValVar_0;
				thriftObject.buddiesNotRemoved.push(_listDestVar_0);
			}
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftRemoveBuddiesResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var RemoveRoomOperatorRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.RemoveRoomOperatorRequest;
	}
	this.zoneId = null;
	this.roomId = null;
	this.userName = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

RemoveRoomOperatorRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.userName) {
			this.userName = thriftObject.userName;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.userName) {
			thriftObject.userName = this.userName;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftRemoveRoomOperatorRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var RemoveUDPConnectionRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.RemoveUDPConnectionRequest;
	}
	this.port = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

RemoveUDPConnectionRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.port) {
			this.port = thriftObject.port;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.port) {
			thriftObject.port = this.port;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftRemoveUDPConnectionRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var RemoveUDPConnectionResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.RemoveUDPConnectionResponse;
	}
	this.successful = null;
	this.error = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

RemoveUDPConnectionResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.successful) {
			this.successful = thriftObject.successful;
		}
		if (null != thriftObject.error) {
			this.error = thriftObject.error;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.successful) {
			thriftObject.successful = this.successful;
		}
		if (null != this.error) {
			thriftObject.error = this.error;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftRemoveUDPConnectionResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var RequestDetails = function(thriftObject) {
	this.pluginName = null;
	this.roomId = null;
	this.zoneId = null;
	this.parameters = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

RequestDetails.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.pluginName) {
			this.pluginName = thriftObject.pluginName;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.parameters) {
			this.parameters = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.parameters));
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.pluginName) {
			thriftObject.pluginName = this.pluginName;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.parameters) {
			thriftObject.parameters = ElectroServer.ThriftUtil.flattenEsObject(this.parameters).toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftRequestDetails();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var RoomListEntry = function(thriftObject) {
	this.roomId = null;
	this.zoneId = null;
	this.roomName = null;
	this.userCount = null;
	this.roomDescription = null;
	this.capacity = null;
	this.hasPassword = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

RoomListEntry.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomName) {
			this.roomName = thriftObject.roomName;
		}
		if (null != thriftObject.userCount) {
			this.userCount = thriftObject.userCount;
		}
		if (null != thriftObject.roomDescription) {
			this.roomDescription = thriftObject.roomDescription;
		}
		if (null != thriftObject.capacity) {
			this.capacity = thriftObject.capacity;
		}
		if (null != thriftObject.hasPassword) {
			this.hasPassword = thriftObject.hasPassword;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomName) {
			thriftObject.roomName = this.roomName;
		}
		if (null != this.userCount) {
			thriftObject.userCount = this.userCount;
		}
		if (null != this.roomDescription) {
			thriftObject.roomDescription = this.roomDescription;
		}
		if (null != this.capacity) {
			thriftObject.capacity = this.capacity;
		}
		if (null != this.hasPassword) {
			thriftObject.hasPassword = this.hasPassword;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftRoomListEntry();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var RoomVariable = function(thriftObject) {
	this.persistent = null;
	this.name = null;
	this.value = null;
	this.locked = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

RoomVariable.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.persistent) {
			this.persistent = thriftObject.persistent;
		}
		if (null != thriftObject.name) {
			this.name = thriftObject.name;
		}
		if (null != thriftObject.value) {
			this.value = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.value));
		}
		if (null != thriftObject.locked) {
			this.locked = thriftObject.locked;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.persistent) {
			thriftObject.persistent = this.persistent;
		}
		if (null != this.name) {
			thriftObject.name = this.name;
		}
		if (null != this.value) {
			thriftObject.value = ElectroServer.ThriftUtil.flattenEsObject(this.value).toThrift();
		}
		if (null != this.locked) {
			thriftObject.locked = this.locked;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftRoomVariable();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var RoomVariableUpdateAction = {
	"VariableCreated" : 1,
	"VariableUpdated" : 2,
	"VariableDeleted" : 3,
};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var RoomVariableUpdateEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.RoomVariableUpdateEvent;
	}
	this.zoneId = null;
	this.roomId = null;
	this.name = null;
	this.valueChanged = null;
	this.value = null;
	this.persistent = null;
	this.lockStatusChanged = null;
	this.locked = null;
	this.action = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

RoomVariableUpdateEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.name) {
			this.name = thriftObject.name;
		}
		if (null != thriftObject.valueChanged) {
			this.valueChanged = thriftObject.valueChanged;
		}
		if (null != thriftObject.value) {
			this.value = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.value));
		}
		if (null != thriftObject.persistent) {
			this.persistent = thriftObject.persistent;
		}
		if (null != thriftObject.lockStatusChanged) {
			this.lockStatusChanged = thriftObject.lockStatusChanged;
		}
		if (null != thriftObject.locked) {
			this.locked = thriftObject.locked;
		}
		if (null != thriftObject.action) {
			this.action = thriftObject.action;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.name) {
			thriftObject.name = this.name;
		}
		if (null != this.valueChanged) {
			thriftObject.valueChanged = this.valueChanged;
		}
		if (null != this.value) {
			thriftObject.value = ElectroServer.ThriftUtil.flattenEsObject(this.value).toThrift();
		}
		if (null != this.persistent) {
			thriftObject.persistent = this.persistent;
		}
		if (null != this.lockStatusChanged) {
			thriftObject.lockStatusChanged = this.lockStatusChanged;
		}
		if (null != this.locked) {
			thriftObject.locked = this.locked;
		}
		if (null != this.action) {
			thriftObject.action = this.action;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftRoomVariableUpdateEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var SearchCriteria = function(thriftObject) {
	this.gameId = null;
	this.locked = null;
	this.lockedSet = null;
	this.gameType = null;
	this.gameDetails = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

SearchCriteria.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.gameId) {
			this.gameId = thriftObject.gameId;
		}
		if (null != thriftObject.locked) {
			this.locked = thriftObject.locked;
		}
		if (null != thriftObject.lockedSet) {
			this.lockedSet = thriftObject.lockedSet;
		}
		if (null != thriftObject.gameType) {
			this.gameType = thriftObject.gameType;
		}
		if (null != thriftObject.gameDetails) {
			this.gameDetails = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.gameDetails));
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.gameId) {
			thriftObject.gameId = this.gameId;
		}
		if (null != this.locked) {
			thriftObject.locked = this.locked;
		}
		if (null != this.lockedSet) {
			thriftObject.lockedSet = this.lockedSet;
		}
		if (null != this.gameType) {
			thriftObject.gameType = this.gameType;
		}
		if (null != this.gameDetails) {
			thriftObject.gameDetails = ElectroServer.ThriftUtil.flattenEsObject(this.gameDetails).toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftSearchCriteria();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var ServerGame = function(thriftObject) {
	this.gameDetails = null;
	this.id = null;
	this.roomId = null;
	this.zoneId = null;
	this.locked = null;
	this.passwordProtected = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

ServerGame.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.gameDetails) {
			this.gameDetails = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.gameDetails));
		}
		if (null != thriftObject.id) {
			this.id = thriftObject.id;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.locked) {
			this.locked = thriftObject.locked;
		}
		if (null != thriftObject.passwordProtected) {
			this.passwordProtected = thriftObject.passwordProtected;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.gameDetails) {
			thriftObject.gameDetails = ElectroServer.ThriftUtil.flattenEsObject(this.gameDetails).toThrift();
		}
		if (null != this.id) {
			thriftObject.id = this.id;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.locked) {
			thriftObject.locked = this.locked;
		}
		if (null != this.passwordProtected) {
			thriftObject.passwordProtected = this.passwordProtected;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftServerGame();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var ServerState = {
	"NOOP" : 1,
	"RUNNING" : 2,
	"PAUSED" : 3,
	"STOPPED" : 4,
};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var SessionIdleEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.SessionIdleEvent;
	}
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

SessionIdleEvent.prototype = {
	fromThrift : function(thriftObject) {
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftSessionIdleEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var UpdateRoomDetailsEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.UpdateRoomDetailsEvent;
	}
	this.zoneId = null;
	this.roomId = null;
	this.capacityUpdated = null;
	this.capacity = null;
	this.roomDescriptionUpdated = null;
	this.roomDescription = null;
	this.roomNameUpdated = null;
	this.roomName = null;
	this.hasPassword = null;
	this.hasPasswordUpdated = null;
	this.hiddenUpdated = null;
	this.hidden = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

UpdateRoomDetailsEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.capacityUpdated) {
			this.capacityUpdated = thriftObject.capacityUpdated;
		}
		if (null != thriftObject.capacity) {
			this.capacity = thriftObject.capacity;
		}
		if (null != thriftObject.roomDescriptionUpdated) {
			this.roomDescriptionUpdated = thriftObject.roomDescriptionUpdated;
		}
		if (null != thriftObject.roomDescription) {
			this.roomDescription = thriftObject.roomDescription;
		}
		if (null != thriftObject.roomNameUpdated) {
			this.roomNameUpdated = thriftObject.roomNameUpdated;
		}
		if (null != thriftObject.roomName) {
			this.roomName = thriftObject.roomName;
		}
		if (null != thriftObject.hasPassword) {
			this.hasPassword = thriftObject.hasPassword;
		}
		if (null != thriftObject.hasPasswordUpdated) {
			this.hasPasswordUpdated = thriftObject.hasPasswordUpdated;
		}
		if (null != thriftObject.hiddenUpdated) {
			this.hiddenUpdated = thriftObject.hiddenUpdated;
		}
		if (null != thriftObject.hidden) {
			this.hidden = thriftObject.hidden;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.capacityUpdated) {
			thriftObject.capacityUpdated = this.capacityUpdated;
		}
		if (null != this.capacity) {
			thriftObject.capacity = this.capacity;
		}
		if (null != this.roomDescriptionUpdated) {
			thriftObject.roomDescriptionUpdated = this.roomDescriptionUpdated;
		}
		if (null != this.roomDescription) {
			thriftObject.roomDescription = this.roomDescription;
		}
		if (null != this.roomNameUpdated) {
			thriftObject.roomNameUpdated = this.roomNameUpdated;
		}
		if (null != this.roomName) {
			thriftObject.roomName = this.roomName;
		}
		if (null != this.hasPassword) {
			thriftObject.hasPassword = this.hasPassword;
		}
		if (null != this.hasPasswordUpdated) {
			thriftObject.hasPasswordUpdated = this.hasPasswordUpdated;
		}
		if (null != this.hiddenUpdated) {
			thriftObject.hiddenUpdated = this.hiddenUpdated;
		}
		if (null != this.hidden) {
			thriftObject.hidden = this.hidden;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftUpdateRoomDetailsEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var UpdateRoomDetailsRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.UpdateRoomDetailsRequest;
	}
	this.zoneId = null;
	this.roomId = null;
	this.capacityUpdate = null;
	this.capacity = null;
	this.roomDescriptionUpdate = null;
	this.roomDescription = null;
	this.roomNameUpdate = null;
	this.roomName = null;
	this.passwordUpdate = null;
	this.password = null;
	this.hiddenUpdate = null;
	this.hidden = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

UpdateRoomDetailsRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.capacityUpdate) {
			this.capacityUpdate = thriftObject.capacityUpdate;
		}
		if (null != thriftObject.capacity) {
			this.capacity = thriftObject.capacity;
		}
		if (null != thriftObject.roomDescriptionUpdate) {
			this.roomDescriptionUpdate = thriftObject.roomDescriptionUpdate;
		}
		if (null != thriftObject.roomDescription) {
			this.roomDescription = thriftObject.roomDescription;
		}
		if (null != thriftObject.roomNameUpdate) {
			this.roomNameUpdate = thriftObject.roomNameUpdate;
		}
		if (null != thriftObject.roomName) {
			this.roomName = thriftObject.roomName;
		}
		if (null != thriftObject.passwordUpdate) {
			this.passwordUpdate = thriftObject.passwordUpdate;
		}
		if (null != thriftObject.password) {
			this.password = thriftObject.password;
		}
		if (null != thriftObject.hiddenUpdate) {
			this.hiddenUpdate = thriftObject.hiddenUpdate;
		}
		if (null != thriftObject.hidden) {
			this.hidden = thriftObject.hidden;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.capacityUpdate) {
			thriftObject.capacityUpdate = this.capacityUpdate;
		}
		if (null != this.capacity) {
			thriftObject.capacity = this.capacity;
		}
		if (null != this.roomDescriptionUpdate) {
			thriftObject.roomDescriptionUpdate = this.roomDescriptionUpdate;
		}
		if (null != this.roomDescription) {
			thriftObject.roomDescription = this.roomDescription;
		}
		if (null != this.roomNameUpdate) {
			thriftObject.roomNameUpdate = this.roomNameUpdate;
		}
		if (null != this.roomName) {
			thriftObject.roomName = this.roomName;
		}
		if (null != this.passwordUpdate) {
			thriftObject.passwordUpdate = this.passwordUpdate;
		}
		if (null != this.password) {
			thriftObject.password = this.password;
		}
		if (null != this.hiddenUpdate) {
			thriftObject.hiddenUpdate = this.hiddenUpdate;
		}
		if (null != this.hidden) {
			thriftObject.hidden = this.hidden;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftUpdateRoomDetailsRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var UpdateRoomVariableRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.UpdateRoomVariableRequest;
	}
	this.zoneId = null;
	this.roomId = null;
	this.name = null;
	this.valueChanged = null;
	this.value = null;
	this.lockStatusChanged = null;
	this.locked = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

UpdateRoomVariableRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.name) {
			this.name = thriftObject.name;
		}
		if (null != thriftObject.valueChanged) {
			this.valueChanged = thriftObject.valueChanged;
		}
		if (null != thriftObject.value) {
			this.value = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.value));
		}
		if (null != thriftObject.lockStatusChanged) {
			this.lockStatusChanged = thriftObject.lockStatusChanged;
		}
		if (null != thriftObject.locked) {
			this.locked = thriftObject.locked;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.name) {
			thriftObject.name = this.name;
		}
		if (null != this.valueChanged) {
			thriftObject.valueChanged = this.valueChanged;
		}
		if (null != this.value) {
			thriftObject.value = ElectroServer.ThriftUtil.flattenEsObject(this.value).toThrift();
		}
		if (null != this.lockStatusChanged) {
			thriftObject.lockStatusChanged = this.lockStatusChanged;
		}
		if (null != this.locked) {
			thriftObject.locked = this.locked;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftUpdateRoomVariableRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var UpdateUserVariableRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.UpdateUserVariableRequest;
	}
	this.name = null;
	this.value = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

UpdateUserVariableRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.name) {
			this.name = thriftObject.name;
		}
		if (null != thriftObject.value) {
			this.value = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.value));
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.name) {
			thriftObject.name = this.name;
		}
		if (null != this.value) {
			thriftObject.value = ElectroServer.ThriftUtil.flattenEsObject(this.value).toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftUpdateUserVariableRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var UserEvictedFromRoomEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.UserEvictedFromRoomEvent;
	}
	this.zoneId = null;
	this.roomId = null;
	this.userName = null;
	this.reason = null;
	this.ban = null;
	this.duration = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

UserEvictedFromRoomEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.userName) {
			this.userName = thriftObject.userName;
		}
		if (null != thriftObject.reason) {
			this.reason = thriftObject.reason;
		}
		if (null != thriftObject.ban) {
			this.ban = thriftObject.ban;
		}
		if (null != thriftObject.duration) {
			this.duration = thriftObject.duration;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.userName) {
			thriftObject.userName = this.userName;
		}
		if (null != this.reason) {
			thriftObject.reason = this.reason;
		}
		if (null != this.ban) {
			thriftObject.ban = this.ban;
		}
		if (null != this.duration) {
			thriftObject.duration = this.duration;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftUserEvictedFromRoomEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var UserListEntry = function(thriftObject) {
	this.userName = null;
	this.userVariables = null;
	this.sendingVideo = null;
	this.videoStreamName = null;
	this.roomOperator = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

UserListEntry.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.userName) {
			this.userName = thriftObject.userName;
		}
		if (null != thriftObject.userVariables) {
			this.userVariables = new Array();
			for (var _tKeyVar_0 in thriftObject.userVariables) {
				_tValVar_0 = thriftObject.userVariables[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new UserVariable(_tValVar_0);
				this.userVariables.push(_listDestVar_0);
			}
		}
		if (null != thriftObject.sendingVideo) {
			this.sendingVideo = thriftObject.sendingVideo;
		}
		if (null != thriftObject.videoStreamName) {
			this.videoStreamName = thriftObject.videoStreamName;
		}
		if (null != thriftObject.roomOperator) {
			this.roomOperator = thriftObject.roomOperator;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.userName) {
			thriftObject.userName = this.userName;
		}
		if (null != this.userVariables) {
			thriftObject.userVariables = new Array();
			for (var _tKeyVar_0 in this.userVariables) {
				_tValVar_0 = this.userVariables[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new UserVariable(_tValVar_0);
				thriftObject.userVariables.push(_listDestVar_0);
			}
		}
		if (null != this.sendingVideo) {
			thriftObject.sendingVideo = this.sendingVideo;
		}
		if (null != this.videoStreamName) {
			thriftObject.videoStreamName = this.videoStreamName;
		}
		if (null != this.roomOperator) {
			thriftObject.roomOperator = this.roomOperator;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftUserListEntry();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var UserUpdateAction = {
	"AddUser" : 1,
	"DeleteUser" : 2,
	"OperatorGranted" : 3,
	"OperatorRevoked" : 4,
	"SendingVideoStream" : 5,
	"StoppingVideoStream" : 6,
};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var UserUpdateEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.UserUpdateEvent;
	}
	this.zoneId = null;
	this.roomId = null;
	this.action = null;
	this.userName = null;
	this.userVariables = null;
	this.sendingVideo = null;
	this.videoStreamName = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

UserUpdateEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.action) {
			this.action = thriftObject.action;
		}
		if (null != thriftObject.userName) {
			this.userName = thriftObject.userName;
		}
		if (null != thriftObject.userVariables) {
			this.userVariables = new Array();
			for (var _tKeyVar_0 in thriftObject.userVariables) {
				_tValVar_0 = thriftObject.userVariables[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new UserVariable(_tValVar_0);
				this.userVariables.push(_listDestVar_0);
			}
		}
		if (null != thriftObject.sendingVideo) {
			this.sendingVideo = thriftObject.sendingVideo;
		}
		if (null != thriftObject.videoStreamName) {
			this.videoStreamName = thriftObject.videoStreamName;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.action) {
			thriftObject.action = this.action;
		}
		if (null != this.userName) {
			thriftObject.userName = this.userName;
		}
		if (null != this.userVariables) {
			thriftObject.userVariables = new Array();
			for (var _tKeyVar_0 in this.userVariables) {
				_tValVar_0 = this.userVariables[_tKeyVar_0];
				var _listDestVar_0;
				_listDestVar_0 = new UserVariable(_tValVar_0);
				thriftObject.userVariables.push(_listDestVar_0);
			}
		}
		if (null != this.sendingVideo) {
			thriftObject.sendingVideo = this.sendingVideo;
		}
		if (null != this.videoStreamName) {
			thriftObject.videoStreamName = this.videoStreamName;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftUserUpdateEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var UserVariable = function(thriftObject) {
	this.name = null;
	this.value = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

UserVariable.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.name) {
			this.name = thriftObject.name;
		}
		if (null != thriftObject.value) {
			this.value = ElectroServer.ThriftUtil.unflattenEsObject(new FlattenedEsObject(thriftObject.value));
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.name) {
			thriftObject.name = this.name;
		}
		if (null != this.value) {
			thriftObject.value = ElectroServer.ThriftUtil.flattenEsObject(this.value).toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftUserVariable();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var UserVariableUpdateAction = {
	"VariableCreated" : 1,
	"VariableUpdated" : 2,
	"VariableDeleted" : 3,
};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var UserVariableUpdateEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.UserVariableUpdateEvent;
	}
	this.userName = null;
	this.variable = null;
	this.action = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

UserVariableUpdateEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.userName) {
			this.userName = thriftObject.userName;
		}
		if (null != thriftObject.variable) {
			this.variable = new UserVariable(thriftObject.variable);
		}
		if (null != thriftObject.action) {
			this.action = thriftObject.action;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.userName) {
			thriftObject.userName = this.userName;
		}
		if (null != this.variable) {
			thriftObject.variable = this.variable.toThrift();
		}
		if (null != this.action) {
			thriftObject.action = this.action;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftUserVariableUpdateEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var ValidateAdditionalLoginRequest = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.ValidateAdditionalLoginRequest;
	}
	this.secret = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

ValidateAdditionalLoginRequest.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.secret) {
			this.secret = thriftObject.secret;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.secret) {
			thriftObject.secret = this.secret;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftValidateAdditionalLoginRequest();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var ValidateAdditionalLoginResponse = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.ValidateAdditionalLoginResponse;
	}
	this.approved = null;
	this.secret = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

ValidateAdditionalLoginResponse.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.approved) {
			this.approved = thriftObject.approved;
		}
		if (null != thriftObject.secret) {
			this.secret = thriftObject.secret;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.approved) {
			thriftObject.approved = this.approved;
		}
		if (null != this.secret) {
			thriftObject.secret = this.secret;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftValidateAdditionalLoginResponse();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var ZoneListEntry = function(thriftObject) {
	this.zoneId = null;
	this.zoneName = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

ZoneListEntry.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.zoneName) {
			this.zoneName = thriftObject.zoneName;
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.zoneName) {
			thriftObject.zoneName = this.zoneName;
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftZoneListEntry();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var ZoneUpdateAction = {
	"AddRoom" : 1,
	"DeleteRoom" : 2,
	"UpdateRoom" : 3,
};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var ZoneUpdateEvent = function(messageType, thriftObject) {
	if (messageType) {
		this.messageType = messageType;
	}
	else {
		this.messageType = MessageType.ZoneUpdateEvent;
	}
	this.zoneId = null;
	this.action = null;
	this.roomId = null;
	this.roomCount = null;
	this.roomListEntry = null;
	if (thriftObject) {
		this.fromThrift(thriftObject);
	}
};

ZoneUpdateEvent.prototype = {
	fromThrift : function(thriftObject) {
		if (null != thriftObject.zoneId) {
			this.zoneId = thriftObject.zoneId;
		}
		if (null != thriftObject.action) {
			this.action = thriftObject.action;
		}
		if (null != thriftObject.roomId) {
			this.roomId = thriftObject.roomId;
		}
		if (null != thriftObject.roomCount) {
			this.roomCount = thriftObject.roomCount;
		}
		if (null != thriftObject.roomListEntry) {
			this.roomListEntry = new RoomListEntry(thriftObject.roomListEntry);
		}
	},

	toThrift : function() {
		var thriftObject = this.newThrift();
		if (null != this.zoneId) {
			thriftObject.zoneId = this.zoneId;
		}
		if (null != this.action) {
			thriftObject.action = this.action;
		}
		if (null != this.roomId) {
			thriftObject.roomId = this.roomId;
		}
		if (null != this.roomCount) {
			thriftObject.roomCount = this.roomCount;
		}
		if (null != this.roomListEntry) {
			thriftObject.roomListEntry = this.roomListEntry.toThrift();
		}
		return thriftObject;
	},

	newThrift : function() {
		return new ThriftZoneUpdateEvent();
	},

};


//
//  Autogenerated by CocoaTouchApiGenerator
//
//  DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//



var EsUtility = {};

EsUtility.messageTypeToApiClass = {};
EsUtility.messageTypeIndicatorToMessageType = {};
EsUtility.messageTypeToMessageTypeIndicator = {};

EsUtility.messageTypeIndicatorToMessageType[76] = MessageType.LoginRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.LoginRequest] = 76;
EsUtility.messageTypeToApiClass[MessageType.LoginRequest] = LoginRequest;
EsUtility.messageTypeIndicatorToMessageType[100] = MessageType.GetRoomsInZoneResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.GetRoomsInZoneResponse] = 100;
EsUtility.messageTypeToApiClass[MessageType.GetRoomsInZoneResponse] = GetRoomsInZoneResponse;
EsUtility.messageTypeIndicatorToMessageType[104] = MessageType.UpdateRoomDetailsRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.UpdateRoomDetailsRequest] = 104;
EsUtility.messageTypeToApiClass[MessageType.UpdateRoomDetailsRequest] = UpdateRoomDetailsRequest;
EsUtility.messageTypeIndicatorToMessageType[152] = MessageType.DHInitiate;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.DHInitiate] = 152;
EsUtility.messageTypeToApiClass[MessageType.DHInitiate] = DHInitiateKeyExchangeRequest;
EsUtility.messageTypeIndicatorToMessageType[108] = MessageType.LogOutRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.LogOutRequest] = 108;
EsUtility.messageTypeToApiClass[MessageType.LogOutRequest] = LogOutRequest;
EsUtility.messageTypeIndicatorToMessageType[62] = MessageType.CrossDomainResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.CrossDomainResponse] = 62;
EsUtility.messageTypeToApiClass[MessageType.CrossDomainResponse] = CrossDomainPolicyResponse;
EsUtility.messageTypeIndicatorToMessageType[51] = MessageType.AggregatePluginRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.AggregatePluginRequest] = 51;
EsUtility.messageTypeToApiClass[MessageType.AggregatePluginRequest] = AggregatePluginRequest;
EsUtility.messageTypeIndicatorToMessageType[43] = MessageType.GetUserVariablesRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.GetUserVariablesRequest] = 43;
EsUtility.messageTypeToApiClass[MessageType.GetUserVariablesRequest] = GetUserVariablesRequest;
EsUtility.messageTypeIndicatorToMessageType[77] = MessageType.RemoveBuddiesRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.RemoveBuddiesRequest] = 77;
EsUtility.messageTypeToApiClass[MessageType.RemoveBuddiesRequest] = RemoveBuddiesRequest;
EsUtility.messageTypeIndicatorToMessageType[103] = MessageType.FindZoneAndRoomByNameResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.FindZoneAndRoomByNameResponse] = 103;
EsUtility.messageTypeToApiClass[MessageType.FindZoneAndRoomByNameResponse] = FindZoneAndRoomByNameResponse;
EsUtility.messageTypeIndicatorToMessageType[105] = MessageType.SessionIdleEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.SessionIdleEvent] = 105;
EsUtility.messageTypeToApiClass[MessageType.SessionIdleEvent] = SessionIdleEvent;
EsUtility.messageTypeIndicatorToMessageType[92] = MessageType.AddBuddiesResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.AddBuddiesResponse] = 92;
EsUtility.messageTypeToApiClass[MessageType.AddBuddiesResponse] = AddBuddiesResponse;
EsUtility.messageTypeIndicatorToMessageType[41] = MessageType.FindGamesResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.FindGamesResponse] = 41;
EsUtility.messageTypeToApiClass[MessageType.FindGamesResponse] = FindGamesResponse;
EsUtility.messageTypeIndicatorToMessageType[156] = MessageType.EncryptionStateChange;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.EncryptionStateChange] = 156;
EsUtility.messageTypeToApiClass[MessageType.EncryptionStateChange] = EncryptionStateChangeEvent;
EsUtility.messageTypeIndicatorToMessageType[46] = MessageType.RemoveUDPConnectionResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.RemoveUDPConnectionResponse] = 46;
EsUtility.messageTypeToApiClass[MessageType.RemoveUDPConnectionResponse] = RemoveUDPConnectionResponse;
EsUtility.messageTypeIndicatorToMessageType[53] = MessageType.RegisterUDPConnectionRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.RegisterUDPConnectionRequest] = 53;
EsUtility.messageTypeToApiClass[MessageType.RegisterUDPConnectionRequest] = RegisterUDPConnectionRequest;
EsUtility.messageTypeIndicatorToMessageType[80] = MessageType.PublicMessageRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.PublicMessageRequest] = 80;
EsUtility.messageTypeToApiClass[MessageType.PublicMessageRequest] = PublicMessageRequest;
EsUtility.messageTypeIndicatorToMessageType[95] = MessageType.CreateOrJoinGameResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.CreateOrJoinGameResponse] = 95;
EsUtility.messageTypeToApiClass[MessageType.CreateOrJoinGameResponse] = CreateOrJoinGameResponse;
EsUtility.messageTypeIndicatorToMessageType[157] = MessageType.ConnectionAttemptResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.ConnectionAttemptResponse] = 157;
EsUtility.messageTypeToApiClass[MessageType.ConnectionAttemptResponse] = ConnectionAttemptResponse;
EsUtility.messageTypeIndicatorToMessageType[102] = MessageType.PluginMessageEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.PluginMessageEvent] = 102;
EsUtility.messageTypeToApiClass[MessageType.PluginMessageEvent] = PluginMessageEvent;
EsUtility.messageTypeIndicatorToMessageType[54] = MessageType.RegisterUDPConnectionResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.RegisterUDPConnectionResponse] = 54;
EsUtility.messageTypeToApiClass[MessageType.RegisterUDPConnectionResponse] = RegisterUDPConnectionResponse;
EsUtility.messageTypeIndicatorToMessageType[101] = MessageType.GenericErrorResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.GenericErrorResponse] = 101;
EsUtility.messageTypeToApiClass[MessageType.GenericErrorResponse] = GenericErrorResponse;
EsUtility.messageTypeIndicatorToMessageType[112] = MessageType.PrivateMessageRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.PrivateMessageRequest] = 112;
EsUtility.messageTypeToApiClass[MessageType.PrivateMessageRequest] = PrivateMessageRequest;
EsUtility.messageTypeIndicatorToMessageType[45] = MessageType.GetServerLocalTimeRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.GetServerLocalTimeRequest] = 45;
EsUtility.messageTypeToApiClass[MessageType.GetServerLocalTimeRequest] = GetServerLocalTimeRequest;
EsUtility.messageTypeIndicatorToMessageType[66] = MessageType.RemoveRoomOperatorRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.RemoveRoomOperatorRequest] = 66;
EsUtility.messageTypeToApiClass[MessageType.RemoveRoomOperatorRequest] = RemoveRoomOperatorRequest;
EsUtility.messageTypeIndicatorToMessageType[109] = MessageType.LoginResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.LoginResponse] = 109;
EsUtility.messageTypeToApiClass[MessageType.LoginResponse] = LoginResponse;
EsUtility.messageTypeIndicatorToMessageType[82] = MessageType.JoinRoomEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.JoinRoomEvent] = 82;
EsUtility.messageTypeToApiClass[MessageType.JoinRoomEvent] = JoinRoomEvent;
EsUtility.messageTypeIndicatorToMessageType[107] = MessageType.GetUsersInRoomRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.GetUsersInRoomRequest] = 107;
EsUtility.messageTypeToApiClass[MessageType.GetUsersInRoomRequest] = GetUsersInRoomRequest;
EsUtility.messageTypeIndicatorToMessageType[48] = MessageType.GetUserCountRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.GetUserCountRequest] = 48;
EsUtility.messageTypeToApiClass[MessageType.GetUserCountRequest] = GetUserCountRequest;
EsUtility.messageTypeIndicatorToMessageType[90] = MessageType.JoinZoneEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.JoinZoneEvent] = 90;
EsUtility.messageTypeToApiClass[MessageType.JoinZoneEvent] = JoinZoneEvent;
EsUtility.messageTypeIndicatorToMessageType[116] = MessageType.GetRoomsInZoneRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.GetRoomsInZoneRequest] = 116;
EsUtility.messageTypeToApiClass[MessageType.GetRoomsInZoneRequest] = GetRoomsInZoneRequest;
EsUtility.messageTypeIndicatorToMessageType[57] = MessageType.RemoveUDPConnectionRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.RemoveUDPConnectionRequest] = 57;
EsUtility.messageTypeToApiClass[MessageType.RemoveUDPConnectionRequest] = RemoveUDPConnectionRequest;
EsUtility.messageTypeIndicatorToMessageType[155] = MessageType.DHSharedModulusResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.DHSharedModulusResponse] = 155;
EsUtility.messageTypeToApiClass[MessageType.DHSharedModulusResponse] = DHSharedModulusResponse;
EsUtility.messageTypeIndicatorToMessageType[110] = MessageType.CreateRoomVariableRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.CreateRoomVariableRequest] = 110;
EsUtility.messageTypeToApiClass[MessageType.CreateRoomVariableRequest] = CreateRoomVariableRequest;
EsUtility.messageTypeIndicatorToMessageType[52] = MessageType.JoinGameRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.JoinGameRequest] = 52;
EsUtility.messageTypeToApiClass[MessageType.JoinGameRequest] = JoinGameRequest;
EsUtility.messageTypeIndicatorToMessageType[78] = MessageType.DeleteRoomVariableRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.DeleteRoomVariableRequest] = 78;
EsUtility.messageTypeToApiClass[MessageType.DeleteRoomVariableRequest] = DeleteRoomVariableRequest;
EsUtility.messageTypeIndicatorToMessageType[98] = MessageType.GetZonesResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.GetZonesResponse] = 98;
EsUtility.messageTypeToApiClass[MessageType.GetZonesResponse] = GetZonesResponse;
EsUtility.messageTypeIndicatorToMessageType[94] = MessageType.GatewayKickUserRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.GatewayKickUserRequest] = 94;
EsUtility.messageTypeToApiClass[MessageType.GatewayKickUserRequest] = GatewayKickUserRequest;
EsUtility.messageTypeIndicatorToMessageType[75] = MessageType.AddBuddiesRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.AddBuddiesRequest] = 75;
EsUtility.messageTypeToApiClass[MessageType.AddBuddiesRequest] = AddBuddiesRequest;
EsUtility.messageTypeIndicatorToMessageType[115] = MessageType.GetZonesRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.GetZonesRequest] = 115;
EsUtility.messageTypeToApiClass[MessageType.GetZonesRequest] = GetZonesRequest;
EsUtility.messageTypeIndicatorToMessageType[69] = MessageType.UpdateRoomDetailsEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.UpdateRoomDetailsEvent] = 69;
EsUtility.messageTypeToApiClass[MessageType.UpdateRoomDetailsEvent] = UpdateRoomDetailsEvent;
EsUtility.messageTypeIndicatorToMessageType[158] = MessageType.ConnectionClosedEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.ConnectionClosedEvent] = 158;
EsUtility.messageTypeToApiClass[MessageType.ConnectionClosedEvent] = ConnectionClosedEvent;
EsUtility.messageTypeIndicatorToMessageType[89] = MessageType.UserVariableUpdateEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.UserVariableUpdateEvent] = 89;
EsUtility.messageTypeToApiClass[MessageType.UserVariableUpdateEvent] = UserVariableUpdateEvent;
EsUtility.messageTypeIndicatorToMessageType[81] = MessageType.CreateRoomRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.CreateRoomRequest] = 81;
EsUtility.messageTypeToApiClass[MessageType.CreateRoomRequest] = CreateRoomRequest;
EsUtility.messageTypeIndicatorToMessageType[38] = MessageType.ValidateAdditionalLoginResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.ValidateAdditionalLoginResponse] = 38;
EsUtility.messageTypeToApiClass[MessageType.ValidateAdditionalLoginResponse] = ValidateAdditionalLoginResponse;
EsUtility.messageTypeIndicatorToMessageType[153] = MessageType.DHPublicNumbers;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.DHPublicNumbers] = 153;
EsUtility.messageTypeToApiClass[MessageType.DHPublicNumbers] = DHPublicNumbersResponse;
EsUtility.messageTypeIndicatorToMessageType[79] = MessageType.BuddyStatusUpdatedEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.BuddyStatusUpdatedEvent] = 79;
EsUtility.messageTypeToApiClass[MessageType.BuddyStatusUpdatedEvent] = BuddyStatusUpdateEvent;
EsUtility.messageTypeIndicatorToMessageType[67] = MessageType.PluginRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.PluginRequest] = 67;
EsUtility.messageTypeToApiClass[MessageType.PluginRequest] = PluginRequest;
EsUtility.messageTypeIndicatorToMessageType[50] = MessageType.RegistryConnectToPreferredGatewayRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.RegistryConnectToPreferredGatewayRequest] = 50;
EsUtility.messageTypeToApiClass[MessageType.RegistryConnectToPreferredGatewayRequest] = RegistryConnectToPreferredGatewayRequest;
EsUtility.messageTypeIndicatorToMessageType[71] = MessageType.AggregatePluginMessageEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.AggregatePluginMessageEvent] = 71;
EsUtility.messageTypeToApiClass[MessageType.AggregatePluginMessageEvent] = AggregatePluginMessageEvent;
EsUtility.messageTypeIndicatorToMessageType[61] = MessageType.GetUserVariablesResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.GetUserVariablesResponse] = 61;
EsUtility.messageTypeToApiClass[MessageType.GetUserVariablesResponse] = GetUserVariablesResponse;
EsUtility.messageTypeIndicatorToMessageType[44] = MessageType.GetServerLocalTimeResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.GetServerLocalTimeResponse] = 44;
EsUtility.messageTypeToApiClass[MessageType.GetServerLocalTimeResponse] = GetServerLocalTimeResponse;
EsUtility.messageTypeIndicatorToMessageType[84] = MessageType.UserEvictedFromRoomEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.UserEvictedFromRoomEvent] = 84;
EsUtility.messageTypeToApiClass[MessageType.UserEvictedFromRoomEvent] = UserEvictedFromRoomEvent;
EsUtility.messageTypeIndicatorToMessageType[99] = MessageType.ConnectionResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.ConnectionResponse] = 99;
EsUtility.messageTypeToApiClass[MessageType.ConnectionResponse] = ConnectionResponse;
EsUtility.messageTypeIndicatorToMessageType[40] = MessageType.CreateOrJoinGameRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.CreateOrJoinGameRequest] = 40;
EsUtility.messageTypeToApiClass[MessageType.CreateOrJoinGameRequest] = QuickJoinGameRequest;
EsUtility.messageTypeIndicatorToMessageType[47] = MessageType.RemoveBuddiesResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.RemoveBuddiesResponse] = 47;
EsUtility.messageTypeToApiClass[MessageType.RemoveBuddiesResponse] = RemoveBuddiesResponse;
EsUtility.messageTypeIndicatorToMessageType[42] = MessageType.FindGamesRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.FindGamesRequest] = 42;
EsUtility.messageTypeToApiClass[MessageType.FindGamesRequest] = FindGamesRequest;
EsUtility.messageTypeIndicatorToMessageType[83] = MessageType.EvictUserFromRoomRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.EvictUserFromRoomRequest] = 83;
EsUtility.messageTypeToApiClass[MessageType.EvictUserFromRoomRequest] = EvictUserFromRoomRequest;
EsUtility.messageTypeIndicatorToMessageType[72] = MessageType.DeleteUserVariableRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.DeleteUserVariableRequest] = 72;
EsUtility.messageTypeToApiClass[MessageType.DeleteUserVariableRequest] = DeleteUserVariableRequest;
EsUtility.messageTypeIndicatorToMessageType[70] = MessageType.GetUsersInRoomResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.GetUsersInRoomResponse] = 70;
EsUtility.messageTypeToApiClass[MessageType.GetUsersInRoomResponse] = GetUsersInRoomResponse;
EsUtility.messageTypeIndicatorToMessageType[37] = MessageType.ValidateAdditionalLoginRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.ValidateAdditionalLoginRequest] = 37;
EsUtility.messageTypeToApiClass[MessageType.ValidateAdditionalLoginRequest] = ValidateAdditionalLoginRequest;
EsUtility.messageTypeIndicatorToMessageType[49] = MessageType.GetUserCountResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.GetUserCountResponse] = 49;
EsUtility.messageTypeToApiClass[MessageType.GetUserCountResponse] = GetUserCountResponse;
EsUtility.messageTypeIndicatorToMessageType[74] = MessageType.JoinRoomRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.JoinRoomRequest] = 74;
EsUtility.messageTypeToApiClass[MessageType.JoinRoomRequest] = JoinRoomRequest;
EsUtility.messageTypeIndicatorToMessageType[86] = MessageType.ZoneUpdateEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.ZoneUpdateEvent] = 86;
EsUtility.messageTypeToApiClass[MessageType.ZoneUpdateEvent] = ZoneUpdateEvent;
EsUtility.messageTypeIndicatorToMessageType[97] = MessageType.PublicMessageEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.PublicMessageEvent] = 97;
EsUtility.messageTypeToApiClass[MessageType.PublicMessageEvent] = PublicMessageEvent;
EsUtility.messageTypeIndicatorToMessageType[87] = MessageType.LeaveRoomEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.LeaveRoomEvent] = 87;
EsUtility.messageTypeToApiClass[MessageType.LeaveRoomEvent] = LeaveRoomEvent;
EsUtility.messageTypeIndicatorToMessageType[114] = MessageType.PrivateMessageEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.PrivateMessageEvent] = 114;
EsUtility.messageTypeToApiClass[MessageType.PrivateMessageEvent] = PrivateMessageEvent;
EsUtility.messageTypeIndicatorToMessageType[56] = MessageType.PingResponse;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.PingResponse] = 56;
EsUtility.messageTypeToApiClass[MessageType.PingResponse] = PingResponse;
EsUtility.messageTypeIndicatorToMessageType[68] = MessageType.FindZoneAndRoomByNameRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.FindZoneAndRoomByNameRequest] = 68;
EsUtility.messageTypeToApiClass[MessageType.FindZoneAndRoomByNameRequest] = FindZoneAndRoomByNameRequest;
EsUtility.messageTypeIndicatorToMessageType[118] = MessageType.LeaveRoomRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.LeaveRoomRequest] = 118;
EsUtility.messageTypeToApiClass[MessageType.LeaveRoomRequest] = LeaveRoomRequest;
EsUtility.messageTypeIndicatorToMessageType[88] = MessageType.LeaveZoneEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.LeaveZoneEvent] = 88;
EsUtility.messageTypeToApiClass[MessageType.LeaveZoneEvent] = LeaveZoneEvent;
EsUtility.messageTypeIndicatorToMessageType[60] = MessageType.CrossDomainRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.CrossDomainRequest] = 60;
EsUtility.messageTypeToApiClass[MessageType.CrossDomainRequest] = CrossDomainPolicyRequest;
EsUtility.messageTypeIndicatorToMessageType[65] = MessageType.AddRoomOperatorRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.AddRoomOperatorRequest] = 65;
EsUtility.messageTypeToApiClass[MessageType.AddRoomOperatorRequest] = AddRoomOperatorRequest;
EsUtility.messageTypeIndicatorToMessageType[73] = MessageType.UpdateUserVariableRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.UpdateUserVariableRequest] = 73;
EsUtility.messageTypeToApiClass[MessageType.UpdateUserVariableRequest] = UpdateUserVariableRequest;
EsUtility.messageTypeIndicatorToMessageType[111] = MessageType.UpdateRoomVariableRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.UpdateRoomVariableRequest] = 111;
EsUtility.messageTypeToApiClass[MessageType.UpdateRoomVariableRequest] = UpdateRoomVariableRequest;
EsUtility.messageTypeIndicatorToMessageType[154] = MessageType.DHSharedModulusRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.DHSharedModulusRequest] = 154;
EsUtility.messageTypeToApiClass[MessageType.DHSharedModulusRequest] = DHSharedModulusRequest;
EsUtility.messageTypeIndicatorToMessageType[113] = MessageType.RoomVariableUpdateEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.RoomVariableUpdateEvent] = 113;
EsUtility.messageTypeToApiClass[MessageType.RoomVariableUpdateEvent] = RoomVariableUpdateEvent;
EsUtility.messageTypeIndicatorToMessageType[55] = MessageType.PingRequest;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.PingRequest] = 55;
EsUtility.messageTypeToApiClass[MessageType.PingRequest] = PingRequest;
EsUtility.messageTypeIndicatorToMessageType[85] = MessageType.UserUpdateEvent;
EsUtility.messageTypeToMessageTypeIndicator[MessageType.UserUpdateEvent] = 85;
EsUtility.messageTypeToApiClass[MessageType.UserUpdateEvent] = UserUpdateEvent;

ElectroServer.QueuedMessage = function(msg, con, name) {
    this.connection = con;
    this.message = msg;
    this.name = name;
}
ElectroServer.User = function() {
    this.userName = null;
    this.isMe = false;
    this.isLoggedIn = false;
    this.isBuddy = false;
    this.userVariables = new Array();
    this.userVariablesByname = {};
    this.buddyVariable = null;
}

ElectroServer.User.prototype.constructor = ElectroServer.User;

ElectroServer.User.prototype.addUserVariable = function(userVariable) {
    this.userVariables.push(userVariable);
    this.userVariablesByname[userVariable.name] = userVariable;
}

ElectroServer.User.prototype.removeUserVariable = function(name) {
    var userVariable = this.userVariablesByname[name];
    this.userVariablesByname[name] = null;

    for (var i=0;i<this.userVariables.length;++i) {
        if (this.userVariables[i] == userVariable) {
            this.userVariables.splice(i, 1);
            break;
        }
    }
}



ElectroServer.UserManager = function() {
    this.me = null;
    this.usersByName = {};
    this.users = new Array();
    this.buddies = new Array();
    this.referencesByUser = {};
}

ElectroServer.UserManager.prototype.constructor = ElectroServer.UserManager;

/**
 * Returns 'true' if a user is being tracked with the name passed in.
 * @param	Username to check for.
 * @return Boolean, true if the user is being tracked
 */
ElectroServer.UserManager.prototype.doesUserExist = function(userName) {
    return this.usersByName[userName] != null;
}

/**
 * Adds a new buddy to track. Not intended for public use.
 * @private
 */
ElectroServer.UserManager.prototype.addBuddy = function(u) {
    //add to list of buddies
    this.buddies.push(u);

    //flag user as a buddy, and logged in
    u.isBuddy = true;

    //add as a user
    this.addUser(u);
}

/**
 * Removes a user as your buddy. Not intended for public use.
 * @private
 */
ElectroServer.UserManager.prototype.removeBuddy = function(u) {
    //find and remove buddy
    for (var i = 0; i < this.buddies.length;++i) {
        if (this.buddies[i] == u) {
            this.buddies.splice(i, 1);
            break;
        }
    }

    //flag user as not being your buddy
    u.isBuddy = false;

    //remove user
    this.removeUser(u.userName);
}

/**
 * Adds a new user to be tracked (or increments the references to an existing user). Not intended for public use.
 * @private
 */
ElectroServer.UserManager.prototype.addUser = function(u) {
    if (u.isMe) {
        this.me = u;
    }

    //if user exists, then grab that instance
    if (this.doesUserExist(u.userName)) {
        u = this.userByName(u.userName);
    } else {
        this.referencesByUser[u.userName] = 0;
    }

    //increment the number of times this user is added
    this.referencesByUser[u.userName] = this.referencesByUser[u.userName]+1;


     this.usersByName[u.userName] = u;
     this.users.push(u);

     return u;
}

/**
 * Decrement the number of references to this user. If the number is 0, then truly remove (unless it is a buddy or you). Not intended for public use.
 * @private
 */
ElectroServer.UserManager.prototype.removeUser = function(userName) {
    if (this.doesUserExist(userName)) {
        var u = this.userByName(userName);
        this.referencesByUser[u.userName] = this.referencesByUser[u.userName] -1;

        //never remove if the user is you or a buddy
        if (this.referencesByUser[u.userName] == 0 && !u.isMe && !u.isBuddy) {
            this.reallyRemoveUser(u);
        }
    } else {
        //trace("removeUser called for " + userName + ", but user wasn't found.");
    }
}

/**
 * Truly removes a User object that has no references left.
 * @param	The User object to remove.
 */
ElectroServer.UserManager.prototype.reallyRemoveUser = function(u) {
    this.usersByName[u.userName] = null;
    this.referencesByUser[u.userName] = null;

    //find and remove user
    for (var i = 0; i < this.users.length;++i) {
        if (this.users[i] == u) {
            this.users.splice(i, 1);
            break;
        }
    }
}

/**
 * Gets a user by name.
 * @param	The name of the user to find. Returns null if there is no user with that name being tracked.
 * @return User object with the name passed in.
 */
ElectroServer.UserManager.prototype.userByName = function(userName) {
    return this.usersByName[userName];
}

ElectroServer.Room = function() {
    this.name = null;
    this.id = -1;
    this.zoneId = -1;
    this.userCount = 0;
    this.users = new Array();
    this.hasPassword = false;
    this.description = null;
    this.capacity = -1;
    this.isHidden = false;
    this.password = null;
    this.roomVariables = new Array();
    this.roomVariablesByName = {};
    this.isJoined = false;
}

ElectroServer.Room.prototype.constructor = ElectroServer.Room;

/**
 * Removes all uses and flags isJoined as false. Not intended for public use.
 * @private
 */
ElectroServer.Room.prototype.purgeUsers = function() {
    this.users = new Array();
    this.isJoined = false;
}

/**
 * Removes all room variables. Not intended for public use.
 * @private
 */
ElectroServer.Room.prototype.purgeRoomVariables = function() {
    this.roomVariables = new Array();
    this.roomVariablesByName = {};
}

/**
 * Gets a RoomVariable object by name.
 * @param	Name of the variable to find.
 * @return RoomVariable object that has the name passed in.
 */
ElectroServer.Room.prototype.roomVariableByName = function() {
    return this.roomVariablesByName[name];
}

/**
 * Adds a new RoomVariable. Not intended for public use. Use the AddRoomVariableRequest to add a RoomVariable.
 * @param	The RoomVariable to add.
 * @private
 */
ElectroServer.Room.prototype.addRoomVariable = function(rv) {
    this.roomVariables.push(rv);
    this.roomVariablesByName[rv.name] = rv;
}

/**
 * Removes a RoomVariable by name. Not intended for public use. Use the RemoveRoomVariableRequest to remove a RoomVariable.
 * @param	Name of the variable to remove
 * @private
 */
ElectroServer.Room.prototype.removeRoomVariable = function(name) {
    var rv = this.roomVariableByName(name);
    if (rv) {
        this.roomVariablesByName[name] = null;

        //find and remove variable
        for (var i = 0; i < this.roomVariables.length;++i) {
            if (this.roomVariables[i] == rv) {
                this.roomVariables.splice(i, 1);
                break;
            }
        }
    }
}

/**
 * Add User to the room. Not intended for public use.
 * @param	User to add to the room.
 * @private
 */
ElectroServer.Room.prototype.addUser = function(u) {
    this.users.push(u);
    this.userCount = this.users.length;

    if (u.isMe) {
        this.isJoined = true;
    }
}

/**
 * Remove a user from the room by name. Not intended for public use.
 * @param	Name of the user to remove.
 * @private
 */
ElectroServer.Room.prototype.removeUser = function(name) {
    //find and remove the user
    for (var i = 0; i < this.users.length;++i) {
        var u = this.users[i];
        if (u.userName == name) {
            this.users.splice(i, 1);

            //if me, set isJoined to false
            if (u.isMe) {
                this.isJoined = false;
            }
            break;
        }

    }

    //update the user count
    this.userCount = this.users.length;
}

ElectroServer.Zone = function() {
    this.id = -1;
    this.name = null;
    this.rooms = new Array();
    this.roomsById = new Array();
    this.roomsByName = {};
}

ElectroServer.Zone.prototype.constructor = ElectroServer.Zone();

/**
 * Gets a Room by name.
 * @param	Name of the room to return.
 * @return Room object with the name specified.
 */
ElectroServer.Zone.prototype.roomByName = function(name) {
    this.roomsByName[name];
}

/**
 * Gets a Room by id.
 * @param	Id of the room to return.
 * @return Room object with the id specified.
 */
ElectroServer.Zone.prototype.roomById = function(id) {
    return this.roomsById[id];
}

/**
 * Adds a room to the zone. Not intended for public use.
 * @param	Room object to add.
 * @private
 */
ElectroServer.Zone.prototype.addRoom = function(r) {
    r.zoneId = this.id;
    this.rooms.push(r);
    this.roomsById[r.id] = r;
    this.roomsByName[r.name] = r;
}

/**
 * Removes a room by id. Not intended for public use.
 * @param	Id of the room to remove.
 * @private
 */
ElectroServer.Zone.prototype.removeRoom = function(id) {
    var r = roomById(id);
    if (r) {
        this.roomsById[id] = null;
        this.roomsByName[r.name] = null;

        //find and remove the room
        for (var i = 0; i < this.rooms.length;++i) {
            if (this.rooms[i] == r) {
                this.rooms.splice(i, 1);
                break;
            }
        }
    }
}

ElectroServer.ZoneManager = function() {
    this.zones = new Array();
    this.zonesById = new Array();
    this.zonesByName = {};
}

ElectroServer.ZoneManager.prototype.constructor = ElectroServer.ZoneManager;

/**
 * Gets a zone by name.
 * @param	Name of the zone to find.
 * @return Zone object with the name specified.
 */
ElectroServer.ZoneManager.prototype.zoneByName = function(name) {
    return this.zonesByName[name];
}

/**
 * Gets a zone by id.
 * @param	Id of the zone to find.
 * @return Zone object with the id specified.
 */
ElectroServer.ZoneManager.prototype.zoneById = function(id) {
    return this.zonesById[id];
}

/**
 * Adds a new zone. Not intended for public use.
 * @param	Zone to add.
 * @private
 */
ElectroServer.ZoneManager.prototype.addZone = function(z) {
    this.zones.push(z);
    this.zonesById[z.id] = z;
    this.zonesByName[z.name] = z;
}

/**
 * Removes a zone by id. Not intended for public use.
 * @param	Id of the zone to remove.
 * @private
 */
ElectroServer.ZoneManager.prototype.removeZone = function(zoneId) {
    var z = this.zoneById(zoneId);
    if (z) {
        this.zonesById[zoneId] = null;
        this.zonesByName[z.name] = null;

        for (var i = 0; i < this.zones.length;++i) {
            if (this.zones[i] == z) {
                this.zones.splice(i, 1);
                break;
            }
        }
    }
}



ElectroServer.ManagerHelper = function() {
    this.es = null;
    this.userManager = new ElectroServer.UserManager();
    this.zoneManager = new ElectroServer.ZoneManager();
}

ElectroServer.ManagerHelper.prototype.constructor = ElectroServer.ManagerHelper;

/**
 * Add event listeners for everything needed to manage the state of things.
 * We give the event listeners the highest priority so that the events are received here before anywhere else.
 * @private
 */
ElectroServer.ManagerHelper.prototype.registerListeners = function() {
    this.es.engine.addEventListener(MessageType.LoginResponse, onLoginResponse, this);
    this.es.engine.addEventListener(MessageType.JoinRoomEvent, onJoinRoomEvent, this);
    this.es.engine.addEventListener(MessageType.LeaveRoomEvent, onLeaveRoomEvent, this);
    this.es.engine.addEventListener(MessageType.UserUpdateEvent, onRoomUserUpdateEvent, this);
    this.es.engine.addEventListener(MessageType.UpdateRoomDetailsEvent, onUpdateRoomDetailsEvent, this);
    this.es.engine.addEventListener(MessageType.JoinZoneEvent, onJoinZoneEvent, this);
    this.es.engine.addEventListener(MessageType.LeaveZoneEvent, onLeaveZoneEvent, this);
    this.es.engine.addEventListener(MessageType.ZoneUpdateEvent, onZoneUpdateEvent, this);
    this.es.engine.addEventListener(MessageType.RoomVariableUpdateEvent, onRoomVariableUpdateEvent, this);
    this.es.engine.addEventListener(MessageType.UserVariableUpdateEvent, onUserVariableUpdateEvent, this);
    this.es.engine.addEventListener(MessageType.BuddyStatusUpdatedEvent, onBuddyStatusUpdatedEvent, this);
    this.es.engine.addEventListener(MessageType.AddBuddiesResponse, onAddBuddiesResponse, this);
    this.es.engine.addEventListener(MessageType.RemoveBuddiesResponse, onRemoveBuddiesResponse, this);

    /**
     * Invoked when the client login attempt has been responded to. Creates a new User instance, tells it that it is you
     * and adds it to the UserManager. If any user variables came in on the login response, then add those to the User too.
     * If buddies come back on the login response, then those a added to the user manager too.
     * @param	LoginResponse event object
     * @private
     */
    function onLoginResponse(e) {
        var u;

        //if the login was successful
        if (e.successful) {
            //create a user object for yourself
            u = new ElectroServer.User();
            u.userName = e.userName;
            u.isMe = true;
				
            //loop through all of the user variables (if any) and add them to your user object
            for (var name in e.userVariables) {
                //values are EsObjects
                var ob = e.userVariables[name];
                
                var uv = new ThriftUserVariable();
                uv.name = name;
                uv.value = ob;
					
                u.addUserVariable(uv);
            }
				
            //add yourself as a user
            this.userManager.addUser(u);

            //loop through the buddies (if any) and add them
            for (var bname in e.buddyListEntries) {
					
                u = this.userManager.userByName(bname);
                if (!u) {
                    u = new ElectroServer.User();
                    u.userName = bname;
                }
                u.buddyVariable = e.buddyListEntries[bname];
					
                //if not a buddy, then add as a buddy
                if (!u.isBuddy) {
                    this.userManager.addBuddy(u);
                }
            }
        }

    }

    /**
     * Invoked when you have joined a room.
     * @param	The JoinRoomEvent object
     * @private
     */
    function onJoinRoomEvent(e) {
        var z = this.zoneManager.zoneById(e.zoneId);

        var r = z.roomById(e.roomId);
        if (!r) {
            r = new ElectroServer.Room();
            r.id = e.roomId;
            r.name = e.roomName;
            z.addRoom(r);
        }
        r.description = e.roomDescription;
        r.hasPassword = e.hasPassword;
        r.capacity = e.capacity;
        r.isHidden = e.hidden;

        //RoomVariable
        for (var i=0;i<e.roomVariables.length;++i) {
            var rve = e.roomVariables[i];
            r.addRoomVariable(rve);
        }

        //UserListEntry
        for (var i=0;i<e.users.length;++i) {
            var entry = e.users[i];
            var u = this.userListEntryToUser(entry);
            u = this.userManager.addUser(u);
            r.addUser(u);
        }
    }

    /**
     * Invoked when you have left a room. Purges cached users from the room. Decrements each user's reference from that room in the user manager.
     * @param	The LeaveRoomEvent object
     * @private
     */
    function onLeaveRoomEvent(e) {
        var z = this.zoneManager.zoneById(e.zoneId);
        var r = z.roomById(e.roomId);

        //after you leave, this is the number of users in that room
        var numUsers = r.users.length - 1;

        //decrement the reference to each user in the user manager
        for (var i=0;i<r.users.length;++i) {
            var u = users[i];
            this.userManager.removeUser(u.userName);
        }

			
        //remove all user objects from room
        r.purgeUsers();
        r.purgeRoomVariables();

        //even though we aren't tracking the user objects, we want to keep track of the number of users
        r.userCount = numUsers;

        //Note: we don't remove the room because the room may still exist even though we're not in it. Rely on the ZoneUpdateEvent or LeaveZoneEvent to remove the room
    }

    /**
     * Fired when a user joins or leaves the room, starts or stops sending a video stream (Flash only), or if their Operator status changes
     * @param	The RoomUserUpdateEvent object
     * @private
     */
    function onRoomUserUpdateEvent(e) {
        var u = this.userManager.userByName(e.userName);
        var z = this.zoneManager.zoneById(e.zoneId);
        var r = z.roomById(e.roomId);

        if (!u) {
            u = new ElectroServer.User();
            u.userName = e.userName;
            this.parseUserVariables(u, e.userVariables);
        }

        switch (e.action) {
            case UserUpdateAction.AddUser:
                //create and/or retrieve user object, and increment a reference to it
                u = this.userManager.addUser(u);
                //add user to the room
                r.addUser(u);
                break;
            case UserUpdateAction.DeleteUser:
                //decrement the reference to that user. if reference count is 0 then it is removed
                this.userManager.removeUser(u.userName);
                //remove user from room
                r.removeUser(e.userName);
                break;
            case UserUpdateAction.SendingVideoStream:
                //flag that user is sending a video stream, and set the name of it
                u.isSendingVideo = true;
                u.videoStreamName = e.videoStreamName;
                break;
            case UserUpdateAction.StoppingVideoStream:
                //flag that the user is not sending a video stream, and clean up the stream name
                u.isSendingVideo = false;
                u.videoStreamName = null;
                break;
            case UserUpdateAction.OperatorGranted:
                //TODO: remove or use in some way. jira ticket ESV-19
                break;
            case UserUpdateAction.OperatorRevoked:
                //TODO: remove or use in some way. jira ticket ESV-19
                break;
        }
    }

    /**
     * This is called when certain room properties are updates, such as the allowable capacity, it's description, whether it is hidden or not, if it has a password, etc
     * @param	The UpdateRoomDetailsEvent object
     * @private
     */
    function onUpdateRoomDetailsEvent(e) {
        var z = this.zoneManager.zoneById(e.zoneId);
        var r = z.roomById(e.roomId);

        if (e.capacityUpdated) {
            //update the allowable capacity
            r.capacity = e.capacity;
        }

        if (e.roomDescriptionUpdated) {
            //update the descriptions
            r.description = e.roomDescription;
        }

        if (e.hiddenUpdated) {
            //update the hidden property
            r.isHidden = e.hidden;
        }

        if (e.hasPasswordUpdated) {
            r.hasPassword = e.hasPassword;
        }

        if (e.roomNameUpdated) {
            //if the room name changes, remove the room and add it back again
            //don't have to worry about removing/adding users from the user manager since no one left or joined
            r.name = e.roomName;
            z.removeRoom(r.id);
            z.addRoom(r);
        }
    }

    /**
     * Called when you have joined your first room in a zone.
     * @param	The JoinZoneEvent object.
     * @private
     */
    function onJoinZoneEvent(e) {
        var z = this.zoneManager.zoneById(e.zoneId);

        //if the zone doesn't already exist in memory then create a new one, and add it to the zone manager
        //Note: it *shouldn't* already exist, unless you've manually done a LoadZonesRequest. The LoadZonesResponse isn't hooked up to populate the zone manager, but it may be.
        if (!z) {
            z = new ElectroServer.Zone();
            z.id = e.zoneId;
            z.name = e.zoneName;
            this.zoneManager.addZone(z);
        }

        //For each RoomListEntry in the zone, add a new room to the zone
        for (var i=0;i<e.rooms.length;++i) {
            var rle = e.rooms[i];
            this.parseAndAddRoom(z, rle);
        }
    }

    /**
     * If you leave a room and are no longer in any rooms in that zone, then this event occurs.
     * @param	The LeaveRoomEvent object
     * @private
     */
    function onLeaveZoneEvent(e) {
        //remove the zone
        this.zoneManager.removeZone(e.zoneId);
    }

    /**
     * If you belong to a room *and* you are subscribed to receive zone update events (which you are by default), then this event occurs when a room is added, removed, or it's public information is updated.
     * @param	The zoneUpdateEvent object
     * @private
     */
    function onZoneUpdateEvent(e) {
        var z = this.zoneManager.zoneById(e.zoneId);
        var r = z.roomById(e.roomId);

        switch (e.action) {
            case ZoneUpdateAction.AddRoom:
                //add the new room to the zone
                this.parseAndAddRoom(z, e.roomListEntry);
                break;
            case ZoneUpdateAction.DeleteRoom:
                //remove the existing room from the zone
                z.removeRoom(e.roomId);
                break;
            case ZoneUpdateAction.UpdateRoom:
                //TODO: uncomment when this is fixed: http://electrotank.jira.com/browse/ESV-35
                //r.userCount = e.roomListEntry.userCount;
                break;
        }
    }

    /**
     * When a room variable for a room that you belong to is created, removed, or updated, this event occurs. You must also be subsribed to receive these events, which you are by default.
     * @param	The RoomVariableUpdateEvent object
     * @private
     */
    function onRoomVariableUpdateEvent(e) {
        var z = this.zoneManager.zoneById(e.zoneId);
        var r = z.roomById(e.roomId);

        //retrieve the existing (or create a new) room variable
        var rv = r.roomVariableByName(e.name);
        if (!rv) {
            rv = new ThriftRoomVariable();
        }

        switch (e.action) {
            case RoomVariableUpdateAction.VariableCreated:
                rv.name = e.name;
                rv.value = e.value;
                rv.locked = e.locked;
                rv.persistent = e.persistent;

                //add to the room
                r.addRoomVariable(rv);
                break;
            case RoomVariableUpdateAction.VariableDeleted:
                //remove from the room
                r.removeRoomVariable(e.name);
                break;
            case RoomVariableUpdateAction.VariableUpdated:
                //update the locked or value properties
                if (e.lockStatusChanged) {
                    rv.locked = e.locked;
                }
                if (e.valueChanged) {
                    rv.value = e.value;
                }
                break;
        }
    }

    /**
     * Called when a user variable for you or someone in one of your rooms has been created, removed, or updated. You must also be subscribed to receive user variable update events, which you are by default.
     * @param	The UserVariableUpdateEvent
     * @private
     */
    function onUserVariableUpdateEvent(e) {
        var u = this.userManager.userByName(e.userName);

        //retrieve the existing (or create a new) user variable
        var uv = u.userVariableByName(e.variable.name);
        if (!uv) {
            uv = e.variable;
        }

        switch (e.action) {
            case UserVariableUpdateAction.VariableCreated:
                //add to the user
                u.addUserVariable(uv);
                break;
            case UserVariableUpdateAction.VariableDeleted:
                //remove the existing variable
                u.removeUserVariable(uv.name);
                break;
            case UserVariableUpdateAction.VariableUpdated:
                //update the value of an existing variable
                uv.value = e.variable.value;
                break;
        }
    }

    /**
     * Invoked when the online/offline status of one of your buddies changes. It is also invoked if you just added a new buddy, informing you of that buddies online/offline status.
     * @param	The BuddyStatusUpdateEvent
     * @private
     */
    function onBuddyStatusUpdatedEvent(e) {
        //gets the existing user (or creates a new one)
        var u = this.userManager.userByName(e.userName);
        if (!u) {
            u = new ElectroServer.User();
            u.userName = e.userName;
        }

        //if not a buddy, then add as a buddy
        if (!u.isBuddy) {
            this.userManager.addBuddy(u);
        }

        switch (e.action) {
            case BuddyStatusUpdateAction.LoggedIn:
                //buddy is online, so flag that
                u.isLoggedIn = true;
                //add the buddy variable, which may exist. this is added by *you* in the AddBuddyRequest
                u.buddyVariable = e.esObject;
                break;
            case BuddyStatusUpdateAction.LoggedOut:
                //buddy is offline, so flag as such
                u.isLoggedIn = false;
                break;
        }
    }

    /**
     * Invoked as the response to the client requesting to add one or more users as a buddy.
     */
    function onAddBuddiesResponse(e) {
        //loop through each buddy that was successfully added
        for (var i=0;i<e.buddiesAdded.length;++i) {
            var name = e.buddiesAdded[i];

            //ge the user reference for this buddy
            var u = this.userManager.userByName(name);

            //if the user isn't referenced yet, then create a new one
            if (!u) {
                u = new ElectroServer.User();
                u.userName = name;
            }

            //if not a buddy, then add as a buddy
            if (!u.isBuddy) {
                this.userManager.addBuddy(u);
            }
        }
    }

    /**
     * Invoked as the response to the client requesting to remove one or more of the user as a buddy.
     */
    function onRemoveBuddiesResponse(e) {
        //loop through each buddy that was successfully removed
        for (var i=0;i<e.buddiesRemoved.length;++i) {
             var name = e.buddiesRemoved[i];
            //grab the user reference for this buddy
            var u = this.userManager.userByName(name);

            //this *shouldn't* be null, but just to make sure we only remove the buddy if it was already being managed
            if (u) {
                this.userManager.removeBuddy(u);
            }
        }
    }
}

/**
 * Takes a UserListEntry and map it to a User object, and return it.
 * @param	UserListEntry object
 * @return User object
 */
ElectroServer.ManagerHelper.prototype.userListEntryToUser = function(entry) {
    var u = new ElectroServer.User();
    u.userName = entry.userName;
    this.parseUserVariables(u, entry.userVariables);
    return u;
}

/**
 * Takes an array of UserVariable objects and adds each one individually to the User passed in.
 * @param	User that owns the variables
 * @param	Array of UserVariables
 */
ElectroServer.ManagerHelper.prototype.parseUserVariables = function(u, arr) {
    if (arr) {
        for (var i=0;i<arr.length;++i) {
            var uve = arr[i];
            u.addUserVariable(uve);
        }
    }
}

/**
 * Converts a RoomListEntry object into a Room object, and adds it to the zone specified.
 * @param	The zone in which to add the Room
 * @param	The RoomListEntry object to be converted
 * @private
 */
ElectroServer.ManagerHelper.prototype.parseAndAddRoom = function(z, rle) {
    //create a new room and populate it's details
    var r = new ElectroServer.Room();
    r.id = rle.roomId;
    r.name = rle.roomName;
    r.description = rle.roomDescription;
    r.capacity = rle.capacity;
    r.userCount = rle.userCount;
    r.hasPassword = rle.hasPassword;

    //add it to the zone
    z.addRoom(r);
}






