function ToolsClass() {

    const _base64_encode = function (data) {
        // http://kevin.vanzonneveld.net
        // + original by: Tyler Akins (http://rumkin.com)
        // + improved by: Bayron Guevara
        // + improved by: Thunder.m
        // + improved by: Kevin van Zonneveld
        // (http://kevin.vanzonneveld.net)
        // + bugfixed by: Pellentesque Malesuada
        // + improved by: Kevin van Zonneveld
        // (http://kevin.vanzonneveld.net)
        // + improved by: Rafał Kukawski (http://kukawski.pl)
        // * example 1: base64_encode('Kevin van Zonneveld');
        // * returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
        // mozilla has this native
        // - but breaks in 2.0.0.12!
        // if (typeof this.window['btoa'] == 'function') {
        // return btoa(data);
        // }
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = "", tmp_arr = [];
    
        if (!data) {
            return data;
        }
    
        do { // pack three octets into four hexets
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);
    
            bits = o1 << 16 | o2 << 8 | o3;
    
            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;
    
            // use hexets to index into b64, and append result to encoded
            // string
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3)
                    + b64.charAt(h4);
        } while (i < data.length);
    
        enc = tmp_arr.join('');
    
        var r = data.length % 3;
    
        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    
    }
    
    const _base64_decode = function (data) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = "", tmp_arr = [];
    
        if (!data) {
            return data;
        }
    
        data += '';
    
        do { // unpack four hexets into three octets using index points in b64
            h1 = b64.indexOf(data.charAt(i++));
            h2 = b64.indexOf(data.charAt(i++));
            h3 = b64.indexOf(data.charAt(i++));
            h4 = b64.indexOf(data.charAt(i++));
    
            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
    
            o1 = bits >> 16 & 0xff;
            o2 = bits >> 8 & 0xff;
            o3 = bits & 0xff;
    
            if (h3 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1);
            } else if (h4 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1, o2);
            } else {
                tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
            }
        } while (i < data.length);
    
        dec = tmp_arr.join('');
    
        return dec;
    }

    const _slugify = function(str) {
        str = str.replace(/^\s+|\s+$/g, '');

        // Make the string lowercase
        str = str.toLowerCase();

        // Remove accents, swap ñ for n, etc
        var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
        var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        // Remove invalid chars
        str = str.replace(/[^a-z0-9 -]/g, '') 
        // Collapse whitespace and replace by -
        .replace(/\s+/g, '-') 
        // Collapse dashes
        .replace(/-+/g, '-'); 

        return str;
    }
    
    return {
        Base64 : {
            encode : function(txt) {
                return _base64_encode(txt);
            },
            decode : function(txt) {
                return _base64_decode(txt);
            }
        },
        Arrays : {
            filter : function(arr) {
                return arr.filter(Boolean);
            }
        },
        Strings : {
            empty : function(txt) {
                return txt == undefined || Tools.Strings.trim(txt) == '';
            },
            trim : function(txt) {
                return txt.trim();
            },
            slugify : function(txt) {
                return _slugify(txt);
            }
        },
        Objects : {
            uid : function(data_object) {
                return Tools.Base64.encode(JSON.stringify(data_object));
            }
        },
        Numeric:{
            price: function(price){
                return numeral(price);
            }
        }
    }
}

var Tools = new ToolsClass();

export default Tools