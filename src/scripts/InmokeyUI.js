function InmokeyUIUtils() {
    
    var _paginator = function(settings, cb) {
        var _data = $.extend({}, settings);
        if (_data.total == undefined) {

            return null;
        }
        if (_data.page == undefined) {
            _data.page = 1; 
        }
        if (_data.size == undefined) {
            _data.size = 15; 
        }
        if (_data.paginate_limit == undefined) {
            _data.paginate_limit = 2;
        }
        if (_data.tmpl == undefined) {
            _data.tmpl = 'paginator';
        }
        _data = $.extend(_data, {
            reg_from : ((_data.page -1) * _data.size) + 1,
            reg_to : _data.page * _data.size,
            pages : Math.ceil(_data.total / _data.size),
            items : []
        });
        if (_data.reg_to > _data.total) {
            _data.reg_to = _data.total;
        }
        _getTemplate(_data.tmpl, function(r) {
            var _link_params = Inmokey.getQueryParams();

            $.each(_link_params, function(idx,item){
                if (idx=='neighborhood'){
                    item = JSON.parse(item);
                    for(let i =0; i<item.length; i++){
                        item[i] = Tools.Base64.encode(item[i]);
                    }
                    _link_params[idx] = JSON.stringify(item);                    
                }
            });

            var _dotshow = true;
            for (var i=1; i<=_data.pages; i++) {

                if (i == 1 || i == _data.pages || (i >= parseInt(_data.page, 10) - parseInt(_data.paginate_limit, 10) && i <= parseInt(_data.page, 10) + parseInt(_data.paginate_limit, 10))) {
                    _dotshow = true;
                    _data.items.push({
                        label : i,
                        class : 'page ' + (i == _data.page ? 'active' : ''),
                        link : i != _data.page ? '?' + $.param($.extend(_link_params, { pageNumber : i })) : null
                    });
                    if (i==_data.page){
                        _data = $.extend(_data,{
                            next: i+1<=_data.pages ? '?' + $.param($.extend(_link_params, { pageNumber : i+1 })) : null ,
                            prev: i-1!=0 ? '?' + $.param($.extend(_link_params, { pageNumber : i-1 })) : null
                        });
                    }
                } else if (_dotshow) {
                    _dotshow = false;
                    _data.items.push({ label : '...', class : 'sep' });
                }
            }
         
            var _html = $.tmpl(r, _data);
            cb.call(this, _html);
        });

        return;
    };

    var _showView = function(file, data, cache_key, cb) {

        if (cache_key != undefined && cache_key != null && cache_key != '') {
            var _html = Inmokey.getDataLocalStorage('view_' + cache_key);
            if (_html && cb) {
                cb.call(this, _html);
                return;
            }
        }
        _getTemplate(file, function(r) {
            var _html = $.tmpl(r, data);
            
            // TODO::: ver si hay manera de no hacer boocle
            var _plainHtml = [];
            if (_html.length > 0) {
                _html.each(function(k,v) {
                    if (v.outerHTML != undefined) {
                        _plainHtml.push(v.outerHTML);
                    }
                });
            }
            _plainHtml = _plainHtml.join('');

            if (cache_key != undefined && cache_key != null && cache_key != '') {
                Inmokey.saveDataLocalStorage('view_' + cache_key, _plainHtml);
            }
            if (cb) {
                cb.call(this, _html);
            }
        });

    };

    var _getTemplate = function(file, cb) {
        let _cache_key = false;
        let _htmlTmpl = false;
        let _defHtml = $.Deferred();


        
        if (Inmokey.cache_templates) {
            _cache_key = 'tmpl_' + file + '_' + Inmokey.web.script_version;
        }

        if (_cache_key) {
            // TODO::: hacer un cache que no dependa de datos del cliente
            _htmlTmpl = Inmokey.getMainLocalStorage(_cache_key);
        }

        if (_htmlTmpl) {
            _defHtml.resolve();
        } else {
            $.get(Inmokey.web.themeTemplatesUrl + '/' + file + '.html?v' + Inmokey.web.script_version, function(r) {
                _htmlTmpl = r;
                if (_cache_key) {
                    Inmokey.saveMainLocalStorage(_cache_key, _htmlTmpl);
                }
                _defHtml.resolve();
            });
        }

        $.when(_defHtml).done(function (r) {
            if (cb) {
                cb.call(this, _htmlTmpl);
            }
        });
    };

    return {
        paginator : function(settings, cb) {
            return _paginator(settings, cb);
        },
        showView : function(file, data, cache_key, cb) {
            _showView(file, data, cache_key, cb);
        },
        getTemplate : function(file, cb) {
            _getTemplate(file, cb);
        }
    }
}
var InmokeyUI = new InmokeyUIUtils();