import $ from 'jquery'
import Tools from './Tools.js'

var Inmokey = {}
Inmokey.client_id = '2114'
//Inmokey.api_auth_token = 'cd51d0a29768a9ba2f79f1cf6c26b10f02b4c478'
Inmokey.is_preview = false
Inmokey.cache_prefix = 'c2114findeo_'
Inmokey.cache_main_version = 119
Inmokey.cache_data_version = 15429
Inmokey.cache_templates = false
Inmokey.empty_listing = 0
Inmokey.theme = 'findeo'
Inmokey.theme_uikit = '30026'
Inmokey.user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36'
Inmokey.api = 'http://api-frontend.inmokey.com/'
Inmokey.api_auth_domain = 'espatolerolorenzo.com.ar'
Inmokey.web = {}
Inmokey.web.host = 'www.espatolerolorenzo.com.ar'
Inmokey.web.page = 'list_search'
Inmokey.web.folder = ''
Inmokey.web.script_version = '51'
Inmokey.web.themesUrl = '/themes'
Inmokey.web.themeUrl = '/themes/findeo'
Inmokey.web.themeTemplatesUrl = '/themes/findeo/templates'
Inmokey.web.themeColors = []
Inmokey.web.preview = {}
Inmokey.web.preview.home = {}
Inmokey.web.preview.preview_data = {}
Inmokey.web.themeColors.push('#cd0304')
Inmokey.web.themeColors.push('#555555')
Inmokey.web.themeColors.push('#ececec')
Inmokey.web.themeColors.push('#fff')

Inmokey.web.detailId = null

Inmokey.callApi = function(method, action, params, cbOk, cbError) {
	var _headers = {}
	// _headers['X-NOT-CACHED'] = true;
	if (!Tools.Strings.empty(Inmokey.api_auth_token)) {
		_headers['X-AUTH-APIKEY'] = Inmokey.api_auth_token
	}
	if (!Tools.Strings.empty(Inmokey.api_auth_inmokey_code)) {
		_headers['X-AUTH-INMOKEY-CODE'] = Inmokey.api_auth_inmokey_code
	}
	if (!Tools.Strings.empty(Inmokey.api_auth_domain)) {
		_headers['X-AUTH-DOMAIN'] = Inmokey.api_auth_domain
	}
	params = $.extend(params, { _cid: Inmokey.client_id })
	$.ajax({
		type: method,
		headers: _headers,
		url: Inmokey.api + action,
		async: true,
		data: params,
		/*contentType: "application/json; charset=utf-8",*/
		dataType: 'json',
		success: function(data) {
			if (cbOk != undefined) {
				cbOk.call(this, data)
			}
		},
		error: function(err) {
			if (cbError != undefined) {
				cbError.call(this, err)
			} else {
				bugsnagClient.notify(new Error('Inmokey.callApi Error'), {
					metaData: {
						api: {
							method: method,
							action: action,
							headers: _headers,
							params: params
						}
					}
				})
			}
		}
	})
}

Inmokey.getProfile = function(cb) {
	var profile = Inmokey.getMainLocalStorage('profile')
	if (profile == null) {
		Inmokey.callApi('get', 'clients/profile', {}, function(r) {
			// TODO::: ver si se hace en otro lado luego
			if (Inmokey.web.folder != '') {
				if (r.web_data != undefined) {
					$.each(r.web_data.sections, function(k, v) {
						r.web_data.sections[k] = String('/' + Inmokey.web.folder + '/' + v).replace('//', '/')
						if (r.web_data.sections[k].charAt(r.web_data.sections[k].length - 1) == '/') {
							// r.web_data.sections[k] = r.web_data.sections[k].slice(0, r.web_data.sections[k].length-1);
						}
					})
				}
			}

			r.contact_info = ''
			if (r.company != null) {
				r.contact_info += '<h3>' + r.company + '</h3>'
			}
			if (r.slogan != null) {
				r.contact_info += '<h6>' + r.slogan + '</h6>'
			}
			if (r.sucursals != undefined && r.sucursals.length == 1) {
				var _addre = [r.address]
				if (r.city != undefined && !Tools.Strings.empty(r.city.name)) {
					_addre.push(r.city.name)
				}
				if (r.country != undefined && !Tools.Strings.empty(r.country.name)) {
					_addre.push(r.country.name)
				}
				var _addre_txt = Tools.Arrays.filter(_addre).join(', ')

				// TODO::: estos replaces conviene hacerlos por la api???
				var _phone = [r.main_phone /*.replace(/\+54/gi, '').replace(/\(/gi, '').replace(/\)/gi, '')*/]
				var _phone_txt = Tools.Arrays.filter(_phone).join(', ')
				var _email = []
				if (r.web_data.sections && r.emails != undefined && r.emails[0] != undefined && !Tools.Strings.empty(r.emails[0].email)) {
					// _email.push('<a href="' + r.web_data.sections.contact + '">' + r.emails[0].email + '</a>')
				}
				var _email_txt = Tools.Arrays.filter(_email).join(',')

				var _txt = Tools.Arrays.filter([_addre_txt, _phone_txt, _email_txt]).join('<br />')
				if (!Tools.Strings.empty(_txt)) {
					r.contact_info += '<p>' + _txt + '</p>'
				}
			} else {
				var _addre = [r.address]
				if (r.city != undefined && !Tools.Strings.empty(r.city.name)) {
					_addre.push(r.city.name)
				}
				if (r.country != undefined && !Tools.Strings.empty(r.country.name)) {
					_addre.push(r.country.name)
				}
				var _addre_txt = Tools.Arrays.filter(_addre).join(', ')

				// TODO::: estos replaces conviene hacerlos por la api???
				var _phone = [r.main_phone /*.replace(/\+54/gi, '').replace(/\(/gi, '').replace(/\)/gi, '')*/]
				var _phone_txt = Tools.Arrays.filter(_phone).join(', ')
				var _email = []
				if (r.emails != undefined && r.emails[0] != undefined && !Tools.Strings.empty(r.emails[0].email)) {
					_email.push('<a href="' + r.web_data.sections.contact + '">' + r.emails[0].email + '</a>')
				}
				var _email_txt = Tools.Arrays.filter(_email).join(',')

				var _txt = Tools.Arrays.filter([_addre_txt, _phone_txt, _email_txt]).join('<br />')
				if (!Tools.Strings.empty(_txt)) {
					r.contact_info += '<p>' + _txt + '</p>'
				}
			}

			if (!Tools.Strings.empty(r.registration_entity)) {
				r.contact_info += '<p>' + r.registration_entity + '</p>'
			}
			if (!Tools.Strings.empty(r.registration_number) && r.registration_number != '0') {
				r.contact_info += '<p>Reg. ' + r.registration_number + '</p>'
			}

			// Fiscal data
			if (r.web_data != undefined && !Tools.Strings.empty(r.web_data.fiscal_data)) {
				r.web_data.fiscal_data = r.web_data.fiscal_data.replace('https://qr.afip.gob.ar/', 'http://qr.afip.gob.ar/')
				if (r.web_data.fiscal_data.indexOf('http://qr.afip.gob.ar/?qr=') != -1) {
					var _aux = r.web_data.fiscal_data.split('http://qr.afip.gob.ar/?qr=')
					if (_aux.length > 1) {
						var _aux2 = _aux[_aux.length - 1].replace('" target=', '"target=').split('"target=')
						r.web_data.fiscal_data = _aux2[0]
					}
				} else if (r.web_data.fiscal_data.indexOf('https://servicios1.afip.gov.ar/clavefiscal/qr/response.aspx?qr=') != -1) {
					var _aux = r.web_data.fiscal_data.split('https://servicios1.afip.gov.ar/clavefiscal/qr/response.aspx?qr=')
					r.web_data.fiscal_data = _aux[0]
				}

				if (r.web_data.fiscal_data.length <= 25) {
					r.web_data.fiscal_data =
						'<a href="http://qr.afip.gob.ar/?qr=' +
						r.web_data.fiscal_data +
						'" target="_F960AFIPInfo"><img src="https://www.afip.gob.ar/images/f960/DATAWEB.jpg" border="0"></a>'
				}
			}

			// -------------
			Inmokey.saveMainLocalStorage('profile', r)
			cb.call(this, r)
		})
	} else {
		cb.call(this, profile)
	}
}

Inmokey.getDomain = function() {
	let params = { host: window.location.host, protocol: window.location.protocol, domain: window.location.protocol + '//' + window.location.host }
	return params
}

Inmokey.getMap = function(property) {
	if (property.units) {
		return (
			'https://image.maps.api.here.com/mia/1.6/mapview?app_id=XMTPb4Kw3hLh8SbYPTp3&app_code=x-9VDsAoLYS_-10NfjXhrQ&c=' +
			property.google_map_data.lat +
			',' +
			property.google_map_data.lng +
			'&z=16&w=1000&h=430'
		)
	} else {
		return (
			'https://image.maps.api.here.com/mia/1.6/mapview?app_id=XMTPb4Kw3hLh8SbYPTp3&app_code=x-9VDsAoLYS_-10NfjXhrQ&c=' +
			property.google_map_data.lat_lng +
			'&z=' +
			(property.google_map_data.zoom ? property.google_map_data.zoom : 10) +
			'&t=' +
			(property.google_map_data.type == 'SATELLITE' ? 1 : 0) +
			'' +
			(!property.address ? '&u=1k&nodot' : '') +
			'&w=1000&h=430'
		)
	}
}

Inmokey.getStreetView = function(property) {
	$.getScript('https://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyByS6NLFF62OV8j - LCF6BOddLaWtphgkPw').done(function(
		script,
		textStatus
	) {
		var _latLng = null
		if (property.units) {
			_latLng = new google.maps.LatLng(property.google_map_data.lat, property.google_map_data.lng)
		} else {
			var _arr = property.google_map_data.lat_lng.split(',')
			var _latLng = new google.maps.LatLng(_arr[0], _arr[1])
		}
		var _options = {
			zoom: 15,
			scrollwheel: false,
			center: _latLng,
			mapTypeId: google.maps.MapTypeId.StreetView
		}
		var _optiosnStreetView = {
			position: _latLng,
			scrollwheel: false,
			pov: {
				heading: 165,
				pitch: 0
			},
			motionTrackingControlOptions: {
				position: google.maps.ControlPosition.LEFT_BOTTOM
			}
		}
		var panorama = new google.maps.StreetViewPanorama(document.getElementById('streetView'), _optiosnStreetView)
		var markerStreetView = new google.maps.Marker({
			position: _latLng,
			map: panorama
		})
	})
}

Inmokey.getSettings = function(cb) {
	var sett = Inmokey.getMainLocalStorage('settings')
	if (sett == null) {
		Inmokey.callApi('get', 'settings', {}, function(r) {
			Inmokey.saveMainLocalStorage('settings', r)
			cb.call(this, r)
		})
	} else {
		cb.call(this, sett)
	}
}

Inmokey.getNeighborhoodscity = function(cityId, cb) {
	var cache = null // Inmokey.getLocalStorage('settings');
	if (cache == null) {
		Inmokey.callApi('get', 'settigs/neighborhoods/', cityId, function(r) {
			// Inmokey.saveLocalStorage('settings', r);

			cb.call(this, r)
		})
	} else {
		// Inmokey.saveLocalStorage('settings', sett);
		// cb.call(this, sett);
	}
}

Inmokey.getProperties = function(params, cb) {
	var _key_cache = 'props_' + Tools.Objects.uid(params)
	var cache = Inmokey.getDataLocalStorage(_key_cache)
	if (cache == null) {
		Inmokey.callApi('get', 'properties', params, function(r) {
			Inmokey.saveDataLocalStorage(_key_cache, r)
			cb.call(this, r)
		})
	} else {
		cb.call(this, cache)
	}
}

Inmokey.getShowcases = function(params, cb) {
	Inmokey.callApi('get', 'showcases', null, function(r) {
		cb.call(this, r)
	})
}

Inmokey.getProperty = function(id, settings, cb) {
	var _key_cache = 'prop_' + id + '_' + Tools.Objects.uid(settings)
	var cache = Inmokey.getDataLocalStorage(_key_cache)
	if (cache == null) {
		Inmokey.callApi(
			'get',
			'properties/' + id,
			settings,
			function(r) {
				Inmokey.saveDataLocalStorage(_key_cache, r)
				cb.call(this, r)
			},
			function(e) {
				window.location.href = 'page404'
			}
		)
	} else {
		cb.call(this, cache)
	}
}

Inmokey.getDevelopments = function(params, cb) {
	var _key_cache = 'develops_' + Tools.Objects.uid(params)
	var cache = Inmokey.getDataLocalStorage(_key_cache)
	if (cache == null) {
		Inmokey.callApi('get', 'developments', params, function(r) {
			Inmokey.saveDataLocalStorage(_key_cache, r)
			cb.call(this, r)
		})
	} else {
		cb.call(this, cache)
	}
}

Inmokey.getMarkers = function(params, cb) {
	var _key_cache = 'properties/markers' + Tools.Objects.uid(params)
	var cache = Inmokey.getDataLocalStorage(_key_cache)
	if (cache == null) {
		Inmokey.callApi('get', 'properties/markers', params, function(r) {
			Inmokey.saveDataLocalStorage(_key_cache, r)
			cb.call(this, r)
		})
	} else {
		cb.call(this, cache)
	}
}

Inmokey.getDevelopment = function(id, settings, cb) {
	var _key_cache = 'develop_' + id + '_' + Tools.Objects.uid(settings)
	var cache = Inmokey.getDataLocalStorage(_key_cache)
	if (cache == null) {
		Inmokey.callApi('get', 'developments/' + id, settings, function(r) {
			Inmokey.saveDataLocalStorage(_key_cache, r)
			cb.call(this, r)
		})
	} else {
		cb.call(this, cache)
	}
}

Inmokey.getSimilarProperties = function(id, params, cb) {
	var _key_cache = 'similar_' + id + '_' + Tools.Objects.uid(params)
	var cache = Inmokey.getDataLocalStorage(_key_cache)
	if (cache == null) {
		Inmokey.callApi('get', 'properties/' + id + '/similars', params, function(r) {
			Inmokey.saveDataLocalStorage(_key_cache, r)
			cb.call(this, r)
		})
	} else {
		cb.call(this, cache)
	}
}

Inmokey.getLastImages = function(cb) {
	var cache = null // Inmokey.getLocalStorage('settings');
	if (cache == null) {
		Inmokey.callApi('get', 'settings/last_images', null, function(r) {
			// Inmokey.saveLocalStorage('settings', r);
			cb.call(this, r)
		})
	} else {
		// Inmokey.saveLocalStorage('settings', sett);
		// cb.call(this, sett);
	}
}

Inmokey.createAlert = function(params, cb) {
	var r = { result: false }
	var validation_errors = []

	if (params.name == undefined || params.name == null || $.trim(params.name) == '') {
		validation_errors.push('El nombre es requerido')
	} else {
		params.name = $.trim(params.name)
		if ($.trim(params.name).length < 4) {
			validation_errors.push('El nombre debe tener al menos 4 letras')
		}
	}
	if (params.email == undefined || params.email == null || $.trim(params.email) == '') {
		validation_errors.push('El e-mail es requerido')
	} else {
		params.email = $.trim(params.email)
		if (!Inmokey.validEmail(params.email)) {
			validation_errors.push('El e-mail es incorrecto')
		}
	}
	if (params.phone == undefined || params.phone == null || $.trim(params.phone) == '') {
		validation_errors.push('El telÃ©fono es requerido')
	}

	if (validation_errors.length == 0) {
		Inmokey.callApi('post', 'properties/save_alert', params, function(r) {
			r.result = true
			cb.call(this, r)
		})
	} else {
		r.msg = validation_errors.join(', ')
		cb.call(this, r)
	}
}

Inmokey.subscribeNewsletter = function(params, cb) {
	var r = { result: false }
	var validation_errors = []

	if (params.email == undefined || params.email == null || $.trim(params.email) == '') {
		validation_errors.push('El e-mail es requerido')
	} else {
		params.email = $.trim(params.email)
		if (!Inmokey.validEmail(params.email)) {
			validation_errors.push('El e-mail es incorrecto')
		}
	}

	if (validation_errors.length == 0) {
		Inmokey.callApi('post', 'messages/newsletter', params, function(r) {
			r.result = true
			cb.call(this, r)
		})
	} else {
		r.msg = validation_errors.join(', ')
		cb.call(this, r)
	}
}

var ajax = false

Inmokey.postMessage = function(params, cb) {
	// TODO:: MEJORAR PARA HACERLO A NIVEL FRONT

	if (ajax == false) {
		ajax = true
		var r = { result: false }
		var validation_errors = []
		let codes = []
		let ok = []
		if (params.name == undefined || params.name == null || $.trim(params.name) == '') {
			validation_errors.push('El nombre es requerido')
			codes.push('name')
		} else {
			params.name = $.trim(params.name)
			if ($.trim(params.name).length < 4) {
				validation_errors.push('El nombre debe tener al menos 4 letras')
				codes.push('name')
			} else {
				ok.push('name')
			}
		}
		if (params.email == undefined || params.email == null || $.trim(params.email) == '') {
			validation_errors.push('El e-mail es requerido')
			codes.push('email')
		} else {
			params.email = $.trim(params.email)
			if (!Inmokey.validEmail(params.email)) {
				validation_errors.push('El e-mail es incorrecto')
				codes.push('email')
			} else {
				ok.push('email')
			}
		}
		if (params.message == undefined || params.message == null || $.trim(params.message) == '') {
			validation_errors.push('El mensaje es requerido')
			codes.push('message')
		} else {
			params.message = $.trim(params.message)
			if ($.trim(params.message).length < 3) {
				validation_errors.push('El mensaje es demasiado corto, sea mÃ¡s especÃ­fico por favor')
				codes.push('message')
			} else {
				ok.push('message')
			}
		}
		if (params.property == undefined || params.property == null || $.trim(params.property) == '') {
			params.property = $.trim(params.property)
		}

		if (validation_errors.length == 0) {
			Inmokey.callApi('post', 'messages', params, function(r) {
				r.result = true
				cb.call(this, r)
			})
		} else {
			r.msg = validation_errors.join(', ')
			r.codes = codes
			r.ok = ok
			cb.call(this, r)
		}
	} else {
		setTimeout(function() {
			ajax = false
		}, 2000)
	}

	/*
    var propId = GetURLParameter("propId");
    var content = "";

    if (propId != null) {
      content = { name: $('#name').val(), email: $('#email').val(), message: $('#message').val(), phone:$('#phone').val(), property: propId, sucursal: "" };
    }
    else {
      content = { name: $('#name').val(), email: $('#email').val(), message: $('#message').val(),phone:$('#phone').val(), sucursal: "" };
    }
    */
	console.log('postMessage')

	/*
    success: function (data, status, jqXHR) {
   $("#success").html('<div class="alert alert-success" style="padding:13px;"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">Ã—</button> Mensaje enviado con Ã©xito, en la brevedad un agente se comunicarÃ¡ con usted. Muchas gracias. </div>');
      },
      error: function (request, message, error) {

      }
    });
    */
}

Inmokey.validEmail = function(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
	if (!regex.test(email)) {
		return false
	}
	return true
}

Inmokey.checkCache = function() {
	let _cache = Inmokey.getLocalStorage(Inmokey.cache_prefix + '_cache_control')
	let _save = false
	if (_cache != null) {
		if (_cache.cache_main_version != Inmokey.cache_main_version) {
			Inmokey.clearWrongCachesForPrefix(Inmokey.cache_prefix, Inmokey.cache_main_version)
			_save = true
		} else if (_cache.cache_data_version != Inmokey.cache_data_version) {
			Inmokey.clearWrongCachesForPrefix(Inmokey.cache_prefix + '_' + Inmokey.cache_main_version, Inmokey.cache_data_version)
			_save = true
		}
	} else {
		_save = true
	}
	if (_save) {
		Inmokey.saveLocalStorage(Inmokey.cache_prefix + '_cache_control', {
			cache_main_version: Inmokey.cache_main_version,
			cache_data_version: Inmokey.cache_data_version
		})
	}
}

Inmokey.getMainLocalStorage = function(key) {
	return Inmokey.getLocalStorage(Inmokey.cache_prefix + '_' + Inmokey.cache_main_version + '_' + key)
}

Inmokey.saveMainLocalStorage = function(key, value) {
	return Inmokey.saveLocalStorage(Inmokey.cache_prefix + '_' + Inmokey.cache_main_version + '_' + key, value)
}

Inmokey.deleteMainLocalStorage = function(key) {
	return Inmokey.deleteLocalStorage(Inmokey.cache_prefix + '_' + Inmokey.cache_main_version + '_' + key)
}

Inmokey.getDataLocalStorage = function(key) {
	return Inmokey.getLocalStorage(Inmokey.cache_prefix + '_' + Inmokey.cache_main_version + '_' + Inmokey.cache_data_version + '_' + key)
}

Inmokey.saveDataLocalStorage = function(key, value) {
	return Inmokey.saveLocalStorage(Inmokey.cache_prefix + '_' + Inmokey.cache_main_version + '_' + Inmokey.cache_data_version + '_' + key, value)
}

Inmokey.clearLocalStorage = function() {
	Inmokey.deleteLocalStorage()
}

Inmokey.getLocalStorage = function(key) {
	var v = sessionStorage.getItem(key)
	if (v != null) {
		v = JSON.parse(v)
	}
	return v
}

Inmokey.saveLocalStorage = function(key, value) {
	if (typeof value) {
		value = JSON.stringify(value)
	}
	try {
		sessionStorage.setItem(key, value)
	} catch (e) {
		// Hacerlo mejor, o pensarlo mejor
		Inmokey.clearLocalStorage()
	}
}

Inmokey.deleteLocalStorage = function() {
	var arr = []
	for (var i = 0; i < sessionStorage.length; i++) {
		arr.push(sessionStorage.key(i))
	}
	Inmokey.deleteLocalStorageByKeys(arr)
}

Inmokey.deleteLocalStorageByKeys = function(keys) {
	for (var i = 0; i < keys.length; i++) {
		sessionStorage.removeItem(keys[i])
	}
}

Inmokey.clearWrongCachesForPrefix = function(prefix, suffix_to_maintain) {
	var arr = []
	for (var i = 0; i < sessionStorage.length; i++) {
		if (sessionStorage.key(i).indexOf(prefix) === 0) {
			if (sessionStorage.key(i).indexOf(prefix + '_' + suffix_to_maintain) !== 0) {
				arr.push(sessionStorage.key(i))
			}
		}
	}
	Inmokey.deleteLocalStorageByKeys(arr)
}

Inmokey.clearIdentifyCache = function() {
	var r = false
	$.ajax({
		url: (Inmokey.web.folder ? '/' + Inmokey.web.folder : '') + '/_clear_cache.php',
		success: function(result) {
			r = result == 'ok'
		},
		async: false
	})
	return r
}

Inmokey.getQueryParams = function() {
	var params = {}
	var _queryParams = new URLSearchParams(window.location.search)
	for (var pair of _queryParams.entries()) {
		if (pair[1] == 'true') pair[1] = true
		if (pair[1] == 'false') pair[1] = false
		if (pair[0] == 'neighborhood') {
			pair[1] = JSON.parse(pair[1])
			for (let idx = 0; idx < pair[1].length; idx++) {
				pair[1][idx] = Tools.Base64.decode(pair[1][idx])
			}
			pair[1] = JSON.stringify(pair[1])
		}
		params[pair[0]] = pair[1]
	}
	return params
}

Inmokey.getSorting = function() {
	let sorting = {
		highlightPriceDesc: 'Mayor precio',
		highlightPriceAsc: 'Menor precio',
		highlightDesc: 'MÃ¡s recientes',
		highlightAsc: 'MÃ¡s antiguas'
	}

	return sorting
}

Inmokey.propertyAvailability = function(schema) {
	var result = []
	var _unavailable = []
	if (schema != undefined) {
		if (schema.unavailable) {
			$.each(schema.unavailable, function(idx, item) {
				var _aux = Inmokey.getDays(item.start, item.end)

				for (var i = 0; i < _aux.length; i++) _unavailable.push(_aux[i])
			})
		}

		$.each(schema.available, function(idx, item) {
			var _days = Inmokey.getDays(item.start, item.end)
			for (var k = 0; k < _unavailable.length; k++) {
				var _idx = _days.indexOf(_unavailable[k])

				if (_idx != -1) {
					delete _days[_idx]
				}
			}

			for (var i = 0; i < _days.length; i++) {
				if (_days[i] != undefined) result.push(_days[i])
			}
		})
	}
	return result
}

Inmokey.getDays = function(start, end) {
	var dateStart = new Date(start)
	var dateEnd = new Date(end)
	var result = []
	var new_date = []

	while (dateStart.getTime() <= dateEnd.getTime()) {
		dateStart.setDate(dateStart.getDate() + 1)

		var day = dateStart.getDate()
		if (day <= 9) {
			day = '0' + day
		}
		var month = dateStart.getMonth() + 1
		if (month <= 9) {
			month = '0' + month
		}
		var year = dateStart.getFullYear()

		new_date = year + '-' + month + '-' + day

		result.push(new_date)
	}

	return result
}

Inmokey.search = function(params) {
	var _url_base = 'propiedades'
	var _arr_no_filters = ['pageSize', 'pageNumber', 'sorting', 'viewType']
	if (params['transactionType'] != undefined) {
		var remove = false
		switch (params['transactionType']) {
			case 1:
				_url_base = Inmokey.web.sections.list_rent
				remove = true
				break
			case 2:
				_url_base = Inmokey.web.sections.list_sale
				remove = true
				break
			case 3:
				_url_base = Inmokey.web.sections.list_temporary
				remove = true
				break
		}
		delete params['transactionType']
	}
	var _params = $.param(params)
	if (_params != '') {
		window.location.href = _url_base + '?' + _params
	}
}

Inmokey.changeParams = function(params) {
	// var _actual = this.getQueryParams();

	// $.each(_actual, function(idx,item){
	//     if (idx=='neighborhood'){
	//         _actual[idx] = Tools.Base64.encode(item);
	//     }
	// });

	var _link_params = Inmokey.getQueryParams()

	$.each(_link_params, function(idx, item) {
		if (idx == 'neighborhood') {
			item = JSON.parse(item)
			for (let i = 0; i < item.length; i++) {
				item[i] = Tools.Base64.encode(item[i])
			}
			_link_params[idx] = JSON.stringify(item)
		}
	})

	var _params = $.param($.extend({}, _link_params, params))

	if (_params != '') {
		window.location.href = '?' + _params
	}
}

Inmokey.getCDN = function() {
	return 'https://www.inmokey.com/'
}

Inmokey._getCDN = function() {
	return 'https://th-clients.inmokey.com/'
}

export default Inmokey