var listHelper = function (pageController, page, params) {
    "use strict";
    $.extend(this, InmokeyBaseHelper, InmokeyBasePageHelper);
    var self = this;
    this.page = params.page != undefined ? params.page : null;
    this.view = 'list';
    this.pageController = pageController;
    var _pageSize = 12;
    let _viewType = 'list';
    let empty_listing = Inmokey.empty_listing;
    let _profile = this.pageController.getProfile();

    if (_profile.web_data.template.lists_view != '') {
        _viewType = _profile.web_data.template.lists_view;
    }

    var _sorting = '';
    if (_profile.web_data.template.lists_order != undefined) {
        _sorting = _profile.web_data.template.lists_order;
    }

    let _listingView =  (pageController.getListingView()!=''?pageController.getListingView():pageController.getListingView(_viewType));

    var _listing_params = {
        pageSize: _pageSize,
        pageNumber: 1,
        sorting: '',
        show_map: false,
        image_sizes: ['500_500', '520_397', '300_300'],
        sorting : _sorting,
        viewType: _listingView
    };
    
    var _templateItem = '';
    var _$SearchRight = null;
    var _propiedades = null;
    var map = null;
    var _actualParams = null;
    var _currentParams = null;
    var _settings = this.pageController.getSettings();
    let translate = this.pageController.getTranslate(_profile['country']['id']);
    var base_url = _profile.web_data.sections.home;
    var _oldListing_param = null;
    var _this = null;
    var oms = null;
    let _cities = _settings.cities;
    var _capitalCities = {};

    _settings['accept_credit'] = _profile.web_data.template.use_credit_filter;
    _settings['use_rooms'] = _profile.web_data.template.use_rooms;
    _settings['accept_studients'] = _profile.web_data.template.use_studients_filter;
    _settings['available_transaction_types'] = self.pageController.getAvailableTransactionTypes();
    _settings['translate'] = translate;

    /* -------------------- ON PREVIEW ------------------------ */

    let json_preview = null; 
   
    if (Inmokey.web.preview!=undefined && Inmokey.web.preview.preview_data!=undefined && Inmokey.web.preview.preview_data!=null && Inmokey.web.preview.preview_data!=null && !$.isEmptyObject(Inmokey.web.preview.preview_data) ){
        json_preview = JSON.parse(Tools.Base64.decode(Inmokey.web.preview.preview_data));
    }

    /* -------------------------------------------------------- */

    self.subPage = this.page.replace('list_','');


    this.getData = function (cb) {

        $.each(_cities, function(idx, item){
            if (item.state_id == 1824){
                if (_cities['1824']==undefined){
                    _cities['1824'] = {
                        "name": "Capital Federal",
                        "qty": 1,
                        "regions" : [],
                        'cities' : []
                    };
                }
                if(item.qty>0){
                    _cities['1824']['regions'].push(item.name);   
                }
    
                _capitalCities[idx] = item;
                delete _cities[idx];
            }
        });

        $.each(_settings.neighborhoods, function (k, v) {
            if (v.city_id != null && v.qty > 0 && v.name.length>1  && v.city_id!=1824) {
                if (_cities[v.city_id]) {
                    if (_cities[v.city_id]['regions'] == undefined) {
                        _cities[v.city_id]['regions'] = [];
                    }
                    _cities[v.city_id]['regions'].push(v.name);
                }
            }
        });
        $.each(_cities, function (k, v) {
            v['regions'] = v['regions'] != undefined ? JSON.stringify(v['regions']) : [];
        });

        
        var _page_title = '';
        var _page_content = '';    
        
        if (_profile.web_data.pages[self.subPage]) {
            _page_title = _profile.web_data.pages[self.subPage].title;
            _page_content = _profile.web_data.pages[self.subPage].content;

            if (_profile.web_data.pages[self.subPage].title.length == 0 && self.subPage == "sale") {
                _page_title = "PROPIEDADES EN VENTA";
            }
            if (_profile.web_data.pages[self.subPage].content.length == 0 && self.subPage == "sale") {
                _page_content = "<p>Estos son nuestros inmuebles en <b>Venta</b>. Si Usted no encuentra lo que está buscando, no olvide activar una alerta con su e-mail al final del listado y le informaremos cuando ingresen nuevos inmuebles.</p>";
            }

            if (_profile.web_data.pages[self.subPage].title.length == 0 && self.subPage == "rent") {
                _page_title = "PROPIEDADES EN ALQUILER";
            }
            if (_profile.web_data.pages[self.subPage].content.length == 0 && self.subPage == "rent") {
                _page_content = "<p>Estos son nuestros inmuebles en <b>Alquiler</b>. Si Usted no encuentra lo que está buscando, no olvide activar una alerta con su e-mail al final del listado y le informaremos cuando ingresen nuevos inmuebles.</p>";
            }
            if (_profile.web_data.pages[self.subPage].title.length == 0 && self.subPage == "temporary") {
                _page_title = "ALQUILER TEMPORARIO";
            }
            if (_profile.web_data.pages[self.subPage].content.length == 0 && self.subPage == "temporary") {
                _page_content = "<p>Estos son nuestros inmuebles en <b>Alquiler temporario</b>. Si Usted no encuentra lo que está buscando, no olvide activar una alerta con su e-mail al final del listado y le informaremos cuando ingresen nuevos inmuebles.</p>";
            }
        }else{
            _page_title = 'BUSQUEDA AVANZADA';
			_page_content = 'Estos son nuestros inmuebles que coinciden con su búsqueda. Si Usted no encontró lo que está buscando, no olvide activar una alerta con su e-mail al final del listado y le informaremos cuando ingresen nuevos inmuebles.';
	
        } 

        var _data = {
            web: {
                title: 'Busqueda',
                content: 'Estas son nuestras propiedades en Venta'
            },
            page: {
                title: _page_title,
                content: _page_content,
            },
            show_map: _listing_params.show_map,
            actual_params: _actualParams,
            order: ((_profile.web_data.template.lists_order)?_profile.web_data.template.lists_order:''),
            viewType : _listing_params['viewType'],
            sorting: Inmokey.getSorting(),
            use_rooms : _profile.web_data.template.use_rooms
        };

        cb.call(this, _data);
    }

    this.events = function () {
        self.$el.find('#sorting').change(_onSortChange);
        self.$el.find('.btn-view-type').click(_onViewTypeClick);
        if (_listingView=='show_map' && !Inmokey.empty_listing) {
            $("#ListaPropiedades").on('mouseenter', '.col-prop', function () {
                _selectMarker($(this).find(".listing-item").attr("data-id"), _this);
            });
            $("#ListaPropiedades").on('mouseleave', '.col-prop', function () {
                _unselectMarker($(this).find(".listing-item").attr("data-id"), _this);
            });
        }


        $("#btnCreateAlert").click(function (e) {
            e.preventDefault();
            _createAlert();
        });
    }

    var _createAlert = function () {
        var old_params = _oldListing_param;
        var values = $("#createAlert").serializeArray();
        for (var j = 0; j < values.length; j++) {

            old_params[values[j]['name']] = values[j]['value'];
        }
        if (old_params.hasOwnProperty("propertyType")) {
            if ((JSON.stringify(old_params.propertyType)).indexOf('[', 0) == -1) {
                var aux = Array();
                aux.push(old_params.propertyType);
                old_params.propertyType = JSON.stringify(aux);
            }
        }
        self.pageController.getInmokey().createAlert(old_params, function (r) {
            $.each(old_params, function (index, item) {
                if (index == 'name' || index == 'phone' || index == 'email') {
                    delete(old_params[index]);
                }
            });

            if (r.result) {
                _clearForm();
                $("#result").addClass('success').html('Mensaje enviado correctamente').show();
            } else {
            }
        });
    }

    var _clearForm = function () {
        $("#createAlert").find('input[type="text"], textarea').val('');
    }

    this.beforeRender = function () {

        _oldListing_param = _listing_params;
        _listing_params = $.extend(_listing_params, this.pageController.getQueryParams());
        _actualParams = this.pageController.getQueryParamsEnricher(_oldListing_param);
        _currentParams = _actualParams;

        var _itemTmpl = "";
        var _defaultListingType = 'listMosaicCompact';
        var _defaultView = 'listMosaicStandard';
        var _listingType = _listingView;

        if (_listingType == 'show_map'){
            _itemTmpl = 'listMosaicCompact'; 
        }else if (_listingType == 'list') {
            _itemTmpl = 'listRow';
        } else if (_listingType == 'listMosaicStandard') {
            _itemTmpl = 'listMosaicStandard';
        } else if (_listingType == 'halfMap') {
            _itemTmpl = 'halfMap';
        } else {
            _itemTmpl = _defaultView;
        }      


        switch (this.page) {
            case 'list_sale':
                _listing_params['transactionType'] = 2;
                break;
            case 'list_rent':
                _listing_params['transactionType'] = 1;
                break;
            case 'list_temporary':
                _listing_params['transactionType'] = 3;
                break;
        }

        if (self.subPage=='search'){
            switch(_listing_params['transactionType']){
                case '1': self.subPage = 'rent';
                  break;
                case '2': self.subPage = 'sale';
                  break;
                case '3': self.subPage = 'temporary';
                  break;
            }
        }

    }

    this.afterRender = function () {

        if (_listingView == 'show_map') {
            $("#footerContent").addClass('hide');
        }
        $('.open-popup-link').magnificPopup({
            type: 'inline',
            midClick: true,
        });

        var _itemTmpl = "";
        var _defaultListingType = 'listMosaicStandard';
        var _defaultView = 'listMosaicStandard';
        
        var _listingType = _listingView;

        if (_listingView == 'show_map'){
            _itemTmpl = 'listMosaicCompact'; 
        }else if(_listingType == 'list') {
            _itemTmpl = 'listRow';
        } else if (_listingType == 'listMosaicStandard') {
            _itemTmpl = 'listMosaicStandard';
        } else if (_listingType == 'halfMap') {
            _itemTmpl = 'halfMap';
        } else {
            _itemTmpl = _defaultView;
        }  

        this.pageController.getInmokeyUI().getTemplate(_itemTmpl, function (template) {
            _templateItem = template;
            _showProperties.call(this);
        });

        _actualParams = _listing_params;
        var busqueda = "";
        if (_listingView=='show_map') {
            busqueda = 'searchHalfMap';
        } else {
            busqueda = 'searchColumn';
        }

        this.pageController.getInmokeyUI().showView(busqueda, _settings, null, function (search_col) {
            _$SearchRight = self.$el.find('#SearchRight');
            _$SearchRight.html(search_col);
            _$SearchRight.find('#buscar').click(function (e) {
                e.preventDefault();
                _getParams();
            });
            _$SearchRight.find('.more-search-options-trigger').click(_showMore);
            _selectSearchComponentsFromParams();
            _showSliderProp();
            $('.multiselect').multiselect({
                buttonWidth: '100%',
                includeSelectAllOption: true,
                nonSelectedText: 'Seleccione una opción',
                filterBehavior: true,
                height: 300,
                overflow: scroll
            });

                _checkRegions();

            _$SearchRight.find('.cbx-city').change(function () {
                _checkRegions();
            });

        
            _$SearchRight.find('#transactionType').change(function () {
                _resetSearch($(this));
            });
            _resetSearch(_$SearchRight.find('#transactionType'));

        });
        var $obj = self.$el.find('#actualParams');
        $obj.find('a').click(function (e) {
            e.preventDefault();
            _deleteParam(e.currentTarget.id)
        });

        // Geo location button
        $("#geoLocation").click(function (e) {
            e.preventDefault();
            _geolocate();
        });

        $(window).on('load resize', function () {
            var topbarHeight = $("#top-bar").height();
            var headerHeight = $("#header").innerHeight() + topbarHeight;
            $(".fs-container").css('height', '' + $(window).height() - headerHeight + 'px');
        });
        _checkRegions();

       if (Inmokey.is_preview && json_preview ){
        $(".listingImage").css({
            'background-image':'url('+_profile['web_data']['pages'][self.subPage]['img']+')',
            'background-size': 'cover'
              });
        }else{
        if (_profile['web_data']['pages'][self.subPage]!=null && _profile['web_data']['pages'][self.subPage]!=undefined && _profile['web_data']['pages'][self.subPage]['img']!=undefined &&_profile['web_data']['pages'][self.subPage]['img']!=null)
        $(".listingImage").css({
                'background-image':'url('+_profile['web_data']['pages'][self.subPage]['img']+')',
                'background-size': 'cover'
             });
        }

    }
    let _resetSearch  = function(e){
        if (e.val()!=2){
           $(".cbx-credit").addClass('hide');
           $(".cbx-studients").removeClass('hide');
       }else{
           $(".cbx-credit").removeClass('hide');
           $(".cbx-studients").addClass('hide');
       }
    }

    var _deleteParam = function (d_Param) {
        var _search = false;
        var param = d_Param.split('-');

        if (d_Param == 'currencies') {
            delete _oldListing_param[d_Param]; //TODO :: ARREGLAR ESTE PARCHE
            _search = true;
        }
        if (_oldListing_param.hasOwnProperty(param[0])) {

            //TODO :: VER COMO NO USAR _oldListing_param
            var _jsonParam = JSON.parse(_oldListing_param[param[0]]);
            if (Array.isArray(_jsonParam) && _jsonParam.length > 0) {
                if (_jsonParam.length > 1) {
                    if (_oldListing_param.hasOwnProperty(param[0])) {
                        for (var i = 0; i <= _jsonParam.length; i++){
  
                            if (_jsonParam[i] == param[1] || _jsonParam[i] == Tools.Base64.decode(param[1]) ) {
                                _jsonParam.splice(i, 1);
                                if (param[0]=='neighborhood'){  //TODO :: ARREGLAR ESTE PARCHE
                                    for (let i = 0; i<_jsonParam.length; i++){
                                        _jsonParam[i] = Tools.Base64.encode(_jsonParam[i]);
                                    }
                                }
                                var newArray = JSON.stringify(_jsonParam);

                                _oldListing_param[param[0]] = newArray;
                                _search = true;
                            }
                        }
                    }
                } else {
                    delete _oldListing_param[param[0]]; //TODO :: ARREGLAR ESTE PARCHE
                    _search = true;
                }
            } else {
                delete _oldListing_param[param[0]];
                _search = true;
            }
        }

        if (_search) {
            var _params = $.param(_oldListing_param);
           window.location.href = base_url + 'propiedades?' + _params;
        }
    }


    var _showProperties = function () {
        let empty_listing = Inmokey.empty_listing;
        if (empty_listing) {

            self.$el.find('#ListaPropiedades').html($.tmpl(_templateItem, {
                items: pageController.getItemDemo(12),
                theme_url: Inmokey.web.themeUrl,
                themes_url: Inmokey.web.themesUrl + "/_common/img/mark_states/",
                base_url: _profile.web_data.sections.home,
                profile: _profile,
                domain: Inmokey.getDomain(),
                use_rooms : _profile.web_data.template.use_rooms
            }));
            $(".inmokey-list-loading").addClass('hide');
            if (_listingView=='show_map' == true && !Inmokey.empty_listing) {
                _mapInit();
            }
        } else {
            self.pageController.getInmokey().getProperties(_listing_params, function (props) {
                if (props.total > 0) {
                    $("#asearch").addClass('hide');
                    $("#aSearch2").addClass('hide');
                    _propiedades = props.content;;
                    if (_listingView=='show_map' == true) {
                        _mapInit();
                    }
                    $('#cantidad_Busqueda').text(props.total);
                    self.$el.find('#ListaPropiedades').html($.tmpl(_templateItem, {
                        items: props.content,
                        base_url: _profile.web_data.sections.home,
                        theme_url: Inmokey.web.themeUrl,
                        themes_url: Inmokey.web.themesUrl + "/_common/img/mark_states/",
                        use_rooms : _profile.web_data.template.use_rooms
                    }));
                    $(".inmokey-list-loading").addClass('hide');
                    InmokeyUI.paginator({
                        total: props.total,
                        size: _listing_params.pageSize,
                        page: _listing_params.pageNumber
                    }, function (r) {
                        self.$el.find('.pagination').html(r).find('a').click(_onPageClick);
                    });
                } else {
                    if (_listingView=='show_map' == true) {
                        _mapInit();
                        $(".inmokey-list-loading").addClass('hide');
                        $("#alertBanner").removeClass('hide');
                    }else{
                        $("#alertBanner").removeClass('hide');
                        $(".inmokey-list-loading").addClass('hide');
                    }
                    
                    $('.sort-by').css('display', 'none');
                }
            });

        }



    }

    var _selectSearchComponentsFromParams = function () {
        // Filters
        for (var key in _listing_params) {
            var $_el = $("#formbuscador").find('*[data-field="' + key + '"]');
            if ($_el.length > 0) {
                if (key == 'bathrooms' || key == 'garages' || key == 'bedrooms' || key == 'rooms' || key == 'propertyType' || key == 'neighborhood' ||  key == 'city') {
                    let obj = JSON.parse(JSON.stringify(_listing_params[key]).replace('[', '').replace(']', '')).split(',');
                   
                    if(key == 'city' && _listing_params['state'] == 1824){
                        $_el.val(1824);
                    }else{
                        $_el.val(obj);
                    }
                } else {
                    $_el.val(_listing_params[key]);
                }
            }
        }

        if(_listing_params['state'] == 1824 && _listing_params['city'] == undefined ){
            $("#formbuscador").find('*[data-field="city"]').val(1824);
        }
        // Prices
        var _arrPrices = [null, null];
        if (_listing_params['minPrice'] != undefined && _listing_params['minPrice'] != '') {
            _arrPrices[0] = _listing_params['minPrice'];
        }
        if (_listing_params['maxPrice'] != undefined && _listing_params['maxPrice'] != '') {
            _arrPrices[1] = _listing_params['maxPrice'];
        }
        if (_arrPrices[0] != null || _arrPrices[1] != null) {

        }
        // Sorting
        if (_listing_params['sorting'] != undefined && _listing_params['sorting'] != '') {
            $('#sorting').val(_listing_params['sorting']);
        }
        // ViewType
        var _viewType = 'grid';
        if (_listing_params['viewType'] != undefined && _listing_params['viewType'] != '') {
            _viewType = _listing_params['viewType'];
        }
        
        //studients
        if (_listing_params['amenities'] != undefined && _listing_params['amenities'] != '') {
            $("#acceptStudients").prop('checked', true);
        }
        //credit_filter
        if (_listing_params['accept_credit'] != undefined && _listing_params['accept_credit'] != '') {
            $("#acceptCredit").prop('checked', true);
        }

        if (!_listingView == 'show_map'){
            $(".layout-switcher").find('.btn-view-type[data-view-type="' + _viewType + '"]').addClass('active');
        }else{
            $(".layout-switcher").find('.btn-layout-type').addClass('active');
        }
    }

    var _getParams = function () {
        var _params = null;

        var _filter = {};
        $("#formbuscador").find('select, input').each(function () {

            if ($(this)[0].hasAttribute('data-field')) {

                var _val = $.trim($(this).val());
                if (_val != '' && [$(this).data('field')]=="reference")
                {
                    _filter = {};
                      _filter["reference"] = _val;    
                    var _params = $.param(_filter);
                      if (_params != '') {
                        window.location.href = base_url+'propiedades?' + _params;
                      }
                } else {

                    if (_listing_params.hasOwnProperty("reference")) {
                        delete _listing_params["reference"];
                    } else if (_val != '') {
                         if(_val!='')
                         {
                                if ([$(this).data('field')]=="rooms" || [$(this).data('field')]=="city" || [$(this).data('field')]=="bathrooms" || [$(this).data('field')]=="neighborhood" || [$(this).data('field')]=="propertyType" || [$(this).data('field')]=="garages" || [$(this).data('field')]=="bedrooms")
                                {
                                    var obj = _val.split(",");   
                                  
                                    var ar = Array();
                                    for(var i = 0; i<obj.length; i++)
                                    {
                                        if ($(this).data('field')=='neighborhood')
                                        {
                                            ar.push(obj[i]);
                                        }

                                        else{
                                            ar.push(parseInt(obj[i]));
                                        }
                                        
                                    }

                                    var multiple = JSON.stringify(ar);
        
                          
                                    if($(this).data('field')=='neighborhood' && _filter.city=='[1824]'){
                                        _filter['city'] = JSON.stringify(_getCapitalId(ar));
                                        _filter['state'] = 1824;
                                    }else{
                                        _filter[$(this).data('field')] = multiple;
                                    }
                                    
                               }

                                else{
                                _filter[$(this).data('field')] = _val;
                               }      
                        }
                    }


                    if ($("#acceptCredit").is(':checked') && !$(".cbx-credit").hasClass('hide')) {
                        _filter["accept_credit"] = 1;
                    } else{
                        if (_listing_params.hasOwnProperty("accept_credit")) {
                            delete _listing_params["accept_credit"];
                        }
                    }

                    if (!$(".cbx-studients").hasClass('hide')){
                        let amenities = Array();
                        if ($("#acceptStudients").is(':checked')) {   
                            amenities.push("students");
                            _filter["amenities"] = JSON.stringify(amenities);  
                        }
                        if ($("#acceptPets").is(':checked')) {
                            amenities.push("allow_pets");    
                        }
                                
                    }   
                }
            }
        });

        if(_filter!=''){

            if(_filter['city']=='[1824]'){
                delete _filter['city'];
            }
            var _params = $.param(_filter);
            if (_params != '') {
            window.location.href = base_url+'propiedades?' + _params;
            }
        }

        _params = $.extend(_listing_params, _filter);
        return _params;

    }

  


  
    var _onSortChange = function (e) {
        Inmokey.changeParams({
            'sorting': $(e.currentTarget).val()
        });
    }

    var _onViewTypeClick = function(e) {  
        let type = $(e.currentTarget).data('viewType');
        pageController.getListingView(type);
        if (type=='show_map'){
            Inmokey.changeParams({ 'viewType' : type, 'pageNumber':1, 'show_map' : true});
        }else{
            Inmokey.changeParams({ 'viewType' : type, 'pageNumber':1, 'show_map' : false });
         }
    }

    var _onPageClick = function (e) {
        Inmokey.changeParams({
            'pageNumber': $(e.currentTarget).data('page')
        });
    }

    function owlReload() {
        $('.listing-carousel').each(function () {
            $(this).data('owlCarousel').reload();
        });
    }


    var _showSliderProp = function () {
        var $sliderOwl = $(".grid-layout");
        var $sliderCarousel = $sliderOwl.find('.listing-carousel');

        $sliderCarousel.owlCarousel({
            autoPlay: false,
            navigation: true,
            slideSpeed: 800,
            items: 1,
            itemsDesktop: [1239, 1],
            itemsTablet: [991, 1],
            itemsMobile: [767, 1]
        });
    }


    var _checkRegions = function () {

        var _city = self.$el.find("#city option:selected").val();

        var _regions = self.$el.find('#SearchRight').find('.cbx-city option:selected').data('regions');

        var $cbxRegions = self.$el.find('#SearchRight').find('.cbx-region-type select');
        var _selected_value = $cbxRegions.data('value');
        $cbxRegions.val('');
        $cbxRegions.find('option.item').remove();
        $cbxRegions.prop('disabled', 'disabled');
        $cbxRegions.addClass('disabled');

        let group = Array();

        if (_regions != undefined && _regions.length > 0) {

            $cbxRegions.removeClass('disabled');
            $.each(_regions, function (k, v) {
                group.push({
                    label: v,
                    value: _city!=1824?Tools.Base64.encode(v):v
                });
            });
            $('#cbo_Barrios').multiselect('dataprovider', group);

        } else {
            group.push({
                label: 'Zona o Barrio',
                // value: 'Zona o Barrio'
            });

            $('#cbo_Barrios').multiselect('dataprovider', group);
            $("#Barrio").find('button[type="button"]').addClass('disabled');

        }
    }

    let _getCapitalId = function(e){
        let _aux = [];
        $.each(_capitalCities, function(idx, item){
            $.each(e, function(k, v){
                if(v == item.name){
                    _aux.push(idx);
                }
            });
        })
        return _aux;
    }

    var _mapInit = function () {
        $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyByS6NLFF62OV8j-LCF6BOddLaWtphgkPw").done(function (script, textStatus) {
            $.getScript(Inmokey.web.themesUrl + "/_common/templates/findeo/infobox.min.js").done(function () {
                $.getScript(Inmokey.web.themesUrl + "/_common/js/oms.min.js").done(function () {
                    _this = this;
                    _this.markers = [];
                    _this.aux_marker = null;
                    _this.oms = null;
                    _this.currentInfobox = null;
                    var _profile = pageController.getProfile();
                    var mapOptions = {
                        center: new google.maps.LatLng(_profile.sucursals[0].map_marker[0], _profile.sucursals[0].map_marker[1]),
                        mapTypeId: google.maps.MapTypeId.hybrid,
                        markerIcon: Inmokey.web.themeUrl + "/css/images/map_marker.png",
                        zoom: 16,
                        //mapTypeId : 'Styled',
                        animation: google.maps.Animation.DROP,
                        disableDefaultUI: false,
                        mapTypeControlOptions: {
                            //mapTypeIds: ['Styled'],
                            position: google.maps.ControlPosition.RIGHT_BOTTOM
                        },
                        panControl: false,
                        zoomControl: true,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.LARGE,
                            position: google.maps.ControlPosition.RIGHT_CENTER
                        },
                        scaleControlOptions: {
                            position: google.maps.ControlPosition.TOP_RIGHT
                        },
                        mapTypeControl: false,
                        scaleControl: true,
                        streetViewControl: true,
                        overviewMapControl: true,
                        rotateControl: true,
                        rotateControlOptions: {
                            position: google.maps.ControlPosition.LEFT_CENTER
                        },
                        fullscreenControl: true,
                        fullscreenControlOptions: {
                            position: google.maps.ControlPosition.TOP_RIGHT
                        },

                    };
                    map = new google.maps.Map(document.getElementById('ListingMap'), mapOptions);



                    var bounds = new google.maps.LatLngBounds();
                    var markerIcon = Inmokey.web.themeUrl + "/css/images/map_marker.png";

                    var boxText = document.createElement("div");
                    boxText.className = 'map-box';

                    var boxOptions = {
                        content: boxText,
                        disableAutoPan: true,
                        alignBottom: true,
                        maxWidth: 0,
                        pixelOffset: new google.maps.Size(-60, -55),
                        zIndex: null,
                        boxStyle: {
                            width: "260px"
                        },
                        closeBoxMargin: "0",
                        closeBoxURL: "",
                        infoBoxClearance: new google.maps.Size(1, 1),
                        isHidden: false,
                        pane: "floatPane",
                        enableEventPropagation: false,
                    };

                    _this.map = map;
                    oms = new OverlappingMarkerSpiderfier(map, {
                        nearbyDistance: 30
                    });
                    _this.oms = oms;

                    $.each(_propiedades, function (idx, item) {
                        if (item.google_map_data.lat_lng && item.images.length > 0) {
                            var latLng = item.google_map_data.lat_lng.split(',');
                            var location = new google.maps.LatLng(latLng[0], latLng[1]);
                            var marker = new mapIcons.Marker({
                                map: map,
                                position: location,
                                icon: {
                                    path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
                                    fillColor: Inmokey.web.themeColors[0],
                                    fillOpacity: 1,
                                    strokeColor: '',
                                    strokeWeight: 0
                                },
                                animation: google.maps.Animation.DROP,
                                map_icon_label: '<span style="font-size: 22px!important; text-align:center!important; margin-bottom:19px!important; vertical-align:middle!important; color:white;" class="customIcon fas fa-home"></span>'
                            });
                            _this.oms.addMarker(marker);
                             bounds.extend(marker.position);
                            _this.markers.push(marker);
                            _this.markers[item.id] = marker;

                       var contentString = '<a href="' + base_url  + item.id + '" class="listing-img-container">' +
                            '<div class="infoBox-close"><i class="fa fa-times"></i></div>' +
                            '<div class="listing-img-content"><span class="listing-price">' + ((item.price > 20) ? item.currency.name + ' ' + item.price.toLocaleString(['de-DE']) : 'Consulte valor') + '<i></i></span></div>' +
                            '<img style="height:200px!important;" src="' + item.images[0]['520x397'] + '" alt="">' +
                            '</a>' +
                            '<div class="listing-content">' +
                            '<div class="listing-title">' +
                            '<h4><a href="' + base_url +  item.id + '">' + item.title + '</a></h4>' +
                            '<p>' + item.address + ' ' + item.address_number + '</p>' +
                            '</div>' +
                            '</div>';

                            var ib = new InfoBox();
                            _this.ib = ib;
                            _this.ib.setOptions(boxOptions);

                            if (!Inmokey.empty_listing) {
                                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                                    return function () {
                                        _this.ib.setOptions(boxOptions);
                                        boxText.innerHTML = contentString;
                                        if (_this.currentInfobox == null) {
                                            _this.ib.close();
                                            _this.currentInfobox = item.id;
                                            _selectMarker(_this.currentInfobox, _this);
                                        } else {
                                            _unselectMarker(_this.currentInfobox, _this);
                                            _this.ib.close();
                                            _this.currentInfobox = null;
                                            _this.currentInfobox = item.id;
                                            _selectMarker(_this.currentInfobox, _this);
                                        }
                                        _this.ib.close();
                                        _this.ib.open(map, marker);
                                        map.panTo(location);
                                        map.panBy(0, -180);
                                        google.maps.event.addListener(ib, 'domready', function () {
                                            $('.infoBox-close').click(function (e) {
                                                e.preventDefault();
                                                _this.ib.close();
                                            });
                                        });
                                    }
                                })(marker, idx));
                            }

                            google.maps.event.addListener(map, 'click', function () {
                                if (_this.ib) {
                                    _this.ib.close();
                                }
                            });
                            $(".infoBox-close").on('click', function(e){
                                e.preventDefault();
                                if (_this.ib) {
                                    _this.ib.close();
                                }
                            });
                            map.fitBounds(bounds);
                        }

                    });

                    $(window).trigger('resize');

                });
            });
        });
    }

    var _selectMarker = function (id, _this) {
        if (_this.markers != null) {
            if (_this.markers[id] != undefined && _this.markers[id] != null) {
                _this.aux_marker = _this.markers[id].getIcon();
                _this.markers[id].setIcon(new google.maps.Marker({
                    path: mapIcons.shapes.MAP_PIN,
                    fillColor: Inmokey.web.themeColors[1],
                    fillOpacity: 1,
                    strokeColor: '',
                    strokeWeight: 0
                }));

            }
        }
    }
    var _unselectMarker = function (id, _this) {
        if (_this.markers[id] != undefined) {
            _this.markers[id].setIcon(_this.aux_marker);
            _this.aux_marker = null;
        }
    }


    var _showMore = function (e) {
        e.preventDefault();
        $('.more-search-options, .more-search-options-trigger').toggleClass('active');
        $('.more-search-options.relative').animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 300);
    }

    var _scrollEnabled = function (map) {
        var scrollEnabling = $('#scrollEnabling');

        $(scrollEnabling).click(function (e) {
            e.preventDefault();
            $(this).toggleClass("enabled");

            if ($(this).is(".enabled")) {
                map.setOptions({
                    'scrollwheel': true
                });
            } else {
                map.setOptions({
                    'scrollwheel': false
                });
            }
        });
    }
    var _geolocate = function () {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                map.setCenter(pos);
                map.setZoom(12);
            });
        }
    }



    return this;
}