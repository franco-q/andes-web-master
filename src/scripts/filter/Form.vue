<template>
	<div class="filter">
		<h3 class="filter-title"><B>BUSCADOR</B> DE PROPIEDADES</h3>
		<form class="filter-form">
			<div class="form-row">
				<div class="col-6 col-lg-3 form-group mb-2">
					<treeselect v-bind="commons" v-model="transaction_type_id" placeholder="Operacion" :options="options.transaction_types" />
				</div>
				<div class="col-6 col-lg-3 form-group mb-2">
					<treeselect v-bind="commons" v-model="property_type_id" placeholder="Propiedad" :options="options.property_types" />
				</div>
				<div class="col-6 col-lg-3 form-group mb-2">
					<treeselect v-bind="commons" v-model="rooms" placeholder="Ambientes" :options="options.rooms" />
				</div>
				<div class="col-6 col-lg-3 form-group mb-2">
					<treeselect v-bind="commons" v-model="bedrooms" placeholder="Dormitorios" :options="options.bedrooms" />
				</div>
				<div class="col-6 col-lg-2 form-group mb-2">
					<treeselect v-bind="commons" v-model="bathrooms" placeholder="Baños" :options="options.bathrooms" />
				</div>
				<div class="col-6 col-sm-3 col-lg-2 form-group mb-2">
					<label class="sr-only" for="desde">Desde</label>
					<input type="number" id="desde" class="form-control" step="1000" v-model="minPrice" placeholder="Desde" />
				</div>
				<div class="col-6 col-sm-3 col-lg-2 form-group mb-2">
					<label class="sr-only" for="hasta">Hasta</label>
					<input type="number" id="hasta" class="form-control" step="1000" v-model="maxPrice" placeholder="Hasta" />
				</div>
				<div class="col-6 col-sm-3 col-lg-2 form-group mb-2">
					<label class="sr-only" for="hasta">Nro Referencia #</label>
					<input type="number" id="hasta" class="form-control" step="1000" v-model="reference" placeholder="Nro Referencia #" />
				</div>
				<div class="col-auto my-2">
					<div class="form-check">
						<input class="form-check-input" type="checkbox" id="acceptCredit" />
						<label class="form-check-label" for="acceptCredit">Apto Crédito</label>
					</div>
				</div>
				<div class="col-auto my-1 ml-auto">
					<button type="submit" class="btn btn-filter">Buscar Ahora <i class="icon-angle-double-right"></i></button>
				</div>
			</div>
		</form>
	</div>
</template>
<script>
	import Treeselect from '@riophae/vue-treeselect'
	import Inmokey from '../Inmokey'
	import Radio from './Radio.vue'

	export default {
		components: { Treeselect, Radio },
		data() {
			return {
				commons: {
					multiple: true,
					limit: 3,
					limitText: count => `${count} más`,
					noOptionsText: 'No hay opciones disponibles',
					noResultsText: 'No se encuentran resultados'
				},
				transaction_type_id: [],
				property_type_id: [],
				city_id: null,
				neighborhood_id: [],
				rooms: [],
				bedrooms: [],
				bathrooms: [],
				garages: [],
				currency: null,
				minPrice: null,
				maxPrice: null,
				reference: null,
				options: {
					rooms: [
						{ id: 1, label: '1 Amb.' },
						{ id: 2, label: '2 Amb.' },
						{ id: 3, label: '3 Amb.' },
						{ id: 4, label: '4 Amb.' },
						{ id: '5,6,7,8,9,10', label: '+5 Amb' }
					],
					bedrooms: [
						{ id: 1, label: '1 Dorm.' },
						{ id: 2, label: '2 Dorm.' },
						{ id: 3, label: '3 Dorm.' },
						{ id: 4, label: '4 Dorm.' },
						{ id: '5,6,7,8,9,10', label: '+5 Dorm' }
					],
					bathrooms: [
						{ id: 1, label: '1 Baño' },
						{ id: 2, label: '2 Baños' },
						{ id: 3, label: '3 Baños' },
						{ id: 4, label: '4 Baños' },
						{ id: '5,6,7,8,9,10', label: '+5 Baños' }
					],
					garages: [
						{ id: 1, label: '1 Cochera' },
						{ id: 2, label: '2 Cocheras' },
						{ id: 3, label: '3 Cocheras' },
						{ id: 4, label: '4 Cocheras' },
						{ id: '5,6,7,8,9,10', label: '+5 Cocheras' }
					],
					neighborhoods: [],
					currencies: [],
					property_types: [],
					cities: [],
					transaction_types: []
				}
			}
		},
		beforeMount() {
			// Inmokey.getSettings
			(({ transaction_types, property_types, cities, neighborhoods, currencies }) => {
				this.options.property_types = Object.entries(property_types).map(([id, value]) => ({
					id,
					label: value.name
				}))
				this.options.cities = Object.entries(cities)
					.filter(([id, value]) => value.name.trim())
					.map(([id, value]) => ({
						id,
						label: value.name
					}))
				this.options.neighborhoods = Object.entries(neighborhoods)
					.filter(([id, value]) => value.name.trim())
					.map(([id, value]) => ({
						id,
						label: value.name,
						city_id: value.city_id
					}))
				this.options.transaction_types = Object.entries(transaction_types).map(([id, value]) => ({
					id,
					label: value.name
				}))
				this.options.currencies = currencies
			})({"property_types":{"1114":{"name":"Barrio Cerrado","qty":0},"47":{"name":"Emprendimiento","qty":6},"44":{"name":"Cochera","qty":17},"37":{"name":"Proyecto","qty":1},"36":{"name":"Hotel","qty":2},"33":{"name":"Edificio","qty":2},"32":{"name":"Obra Nueva","qty":0},"28":{"name":"Finca","qty":3},"27":{"name":"Garaje","qty":0},"20":{"name":"PH","qty":34},"5":{"name":"Casa con Local","qty":4},"13":{"name":"Fondo de Comercio","qty":1},"11":{"name":"D\u00faplex","qty":7},"2":{"name":"Campo","qty":4},"21":{"name":"Piso","qty":3},"7":{"name":"Chalet","qty":91},"8":{"name":"Departamento","qty":269},"19":{"name":"Oficina","qty":53},"17":{"name":"Lote","qty":109},"14":{"name":"Galp\u00f3n","qty":48},"16":{"name":"Local","qty":92},"3":{"name":"Casa","qty":12},"1121":{"name":"Semipiso","qty":1},"1130":{"name":"Edificio en Pozo","qty":4},"1137":{"name":"Complejo de Caba\u00f1as","qty":1},"1138":{"name":"Consultorio","qty":0},"1161":{"name":"Inmueble en block","qty":0},"1167":{"name":"Estaci\u00f3n de Servicio","qty":2},"1169":{"name":"Estacionamiento","qty":0},"1171":{"name":"Complejo deportivo","qty":0},"1175":{"name":"Colegio","qty":0}},"transaction_types":{"1":{"name":"Alquiler","qty":73,"property_types":{"1114":{"name":"Barrio Cerrado","qty":0},"47":{"name":"Emprendimiento","qty":0},"44":{"name":"Cochera","qty":2},"37":{"name":"Proyecto","qty":0},"36":{"name":"Hotel","qty":0},"33":{"name":"Edificio","qty":0},"32":{"name":"Obra Nueva","qty":0},"28":{"name":"Finca","qty":0},"27":{"name":"Garaje","qty":0},"20":{"name":"PH","qty":2},"5":{"name":"Casa con Local","qty":0},"13":{"name":"Fondo de Comercio","qty":0},"11":{"name":"D\u00faplex","qty":0},"2":{"name":"Campo","qty":0},"21":{"name":"Piso","qty":0},"7":{"name":"Chalet","qty":1},"8":{"name":"Departamento","qty":1},"19":{"name":"Oficina","qty":22},"17":{"name":"Lote","qty":6},"14":{"name":"Galp\u00f3n","qty":17},"16":{"name":"Local","qty":22},"3":{"name":"Casa","qty":0},"1121":{"name":"Semipiso","qty":0},"1130":{"name":"Edificio en Pozo","qty":0},"1137":{"name":"Complejo de Caba\u00f1as","qty":0},"1138":{"name":"Consultorio","qty":0},"1161":{"name":"Inmueble en block","qty":0},"1167":{"name":"Estaci\u00f3n de Servicio","qty":0},"1169":{"name":"Estacionamiento","qty":0},"1171":{"name":"Complejo deportivo","qty":0},"1175":{"name":"Colegio","qty":0}},"rooms":{"1":{"name":1,"qty":4},"2":{"name":2,"qty":3},"3":{"name":3,"qty":3},"4":{"name":4,"qty":2},"5":{"name":5,"qty":2},"6":{"name":6,"qty":0},"7":{"name":7,"qty":0},"8":{"name":8,"qty":0},"9":{"name":9,"qty":0},"10":{"name":10,"qty":0}},"visible":true},"2":{"name":"Venta","qty":699,"property_types":{"1114":{"name":"Barrio Cerrado","qty":0},"47":{"name":"Emprendimiento","qty":6},"44":{"name":"Cochera","qty":15},"37":{"name":"Proyecto","qty":1},"36":{"name":"Hotel","qty":2},"33":{"name":"Edificio","qty":2},"32":{"name":"Obra Nueva","qty":0},"28":{"name":"Finca","qty":3},"27":{"name":"Garaje","qty":0},"20":{"name":"PH","qty":32},"5":{"name":"Casa con Local","qty":4},"13":{"name":"Fondo de Comercio","qty":1},"11":{"name":"D\u00faplex","qty":7},"2":{"name":"Campo","qty":4},"21":{"name":"Piso","qty":3},"7":{"name":"Chalet","qty":90},"8":{"name":"Departamento","qty":267},"19":{"name":"Oficina","qty":31},"17":{"name":"Lote","qty":103},"14":{"name":"Galp\u00f3n","qty":31},"16":{"name":"Local","qty":70},"3":{"name":"Casa","qty":12},"1121":{"name":"Semipiso","qty":1},"1130":{"name":"Edificio en Pozo","qty":4},"1137":{"name":"Complejo de Caba\u00f1as","qty":1},"1138":{"name":"Consultorio","qty":0},"1161":{"name":"Inmueble en block","qty":0},"1167":{"name":"Estaci\u00f3n de Servicio","qty":2},"1169":{"name":"Estacionamiento","qty":0},"1171":{"name":"Complejo deportivo","qty":0},"1175":{"name":"Colegio","qty":0}},"rooms":{"1":{"name":1,"qty":53},"2":{"name":2,"qty":100},"3":{"name":3,"qty":131},"4":{"name":4,"qty":101},"5":{"name":5,"qty":41},"6":{"name":6,"qty":18},"7":{"name":7,"qty":1},"8":{"name":8,"qty":0},"9":{"name":9,"qty":2},"10":{"name":10,"qty":5}},"visible":true},"3":{"name":"Alq x Temp","qty":1,"property_types":{"1114":{"name":"Barrio Cerrado","qty":0},"47":{"name":"Emprendimiento","qty":0},"44":{"name":"Cochera","qty":0},"37":{"name":"Proyecto","qty":0},"36":{"name":"Hotel","qty":0},"33":{"name":"Edificio","qty":0},"32":{"name":"Obra Nueva","qty":0},"28":{"name":"Finca","qty":0},"27":{"name":"Garaje","qty":0},"20":{"name":"PH","qty":0},"5":{"name":"Casa con Local","qty":0},"13":{"name":"Fondo de Comercio","qty":0},"11":{"name":"D\u00faplex","qty":0},"2":{"name":"Campo","qty":0},"21":{"name":"Piso","qty":0},"7":{"name":"Chalet","qty":0},"8":{"name":"Departamento","qty":1},"19":{"name":"Oficina","qty":0},"17":{"name":"Lote","qty":0},"14":{"name":"Galp\u00f3n","qty":0},"16":{"name":"Local","qty":0},"3":{"name":"Casa","qty":0},"1121":{"name":"Semipiso","qty":0},"1130":{"name":"Edificio en Pozo","qty":0},"1137":{"name":"Complejo de Caba\u00f1as","qty":0},"1138":{"name":"Consultorio","qty":0},"1161":{"name":"Inmueble en block","qty":0},"1167":{"name":"Estaci\u00f3n de Servicio","qty":0},"1169":{"name":"Estacionamiento","qty":0},"1171":{"name":"Complejo deportivo","qty":0},"1175":{"name":"Colegio","qty":0}},"rooms":{"1":{"name":1,"qty":0},"2":{"name":2,"qty":1},"3":{"name":3,"qty":0},"4":{"name":4,"qty":0},"5":{"name":5,"qty":0},"6":{"name":6,"qty":0},"7":{"name":7,"qty":0},"8":{"name":8,"qty":0},"9":{"name":9,"qty":0},"10":{"name":10,"qty":0}},"visible":true}},"countries":{"5":{"name":"Argentina","qty":773}},"states":{"1818":{"name":"Buenos Aires","qty":772},"1839":{"name":"Santiago del Estero","qty":1}},"cities":{"569943":{"name":"Mar del Plata","qty":757,"state_id":1818},"0":{"name":" ","qty":1},"790270":{"name":"Santa Clara del Mar","qty":2,"state_id":1818},"570140":{"name":"Miramar","qty":1,"state_id":1818},"565769":{"name":"Camet","qty":1,"state_id":1818},"570908":{"name":"Pinamar","qty":2,"state_id":1818},"566179":{"name":"Chapadmalal","qty":1,"state_id":1818},"569937":{"name":"Mar Chiquita","qty":1,"state_id":1818},"569942":{"name":"Mar de Cobo","qty":2,"state_id":1818},"565487":{"name":"Bat\u00e1n","qty":1,"state_id":1818},"790279":{"name":"La Caleta","qty":3,"state_id":1818},"568022":{"name":"General Madariaga","qty":1,"state_id":1818}},"neighborhoods":{"-569943":{"name":"","city_id":569943,"qty":3},"0-0":{"name":"0","city_id":0,"qty":26},"0-569943":{"name":"0","city_id":569943,"qty":26},"0-790270":{"name":"0","city_id":790270,"qty":26},"Acantilados-569943":{"name":"Acantilados","city_id":569943,"qty":2},"Balcarce-569943":{"name":"Balcarce","city_id":569943,"qty":1},"Barrio 2 de Abril-569943":{"name":"Barrio 2 de Abril","city_id":569943,"qty":1},"Barrio El Martillo-569943":{"name":"Barrio El Martillo","city_id":569943,"qty":1},"Barrio Los Acantilados-569943":{"name":"Barrio Los Acantilados","city_id":569943,"qty":6},"Barrio San Juan-569943":{"name":"Barrio San Juan","city_id":569943,"qty":2},"Barrio Santa M\u00f3nica-569943":{"name":"Barrio Santa M\u00f3nica","city_id":569943,"qty":1},"Bernardino Rivadavia-569943":{"name":"Bernardino Rivadavia","city_id":569943,"qty":4},"Bosque Peralta Ramos-569943":{"name":"Bosque Peralta Ramos","city_id":569943,"qty":2},"CAISAMAR-569943":{"name":"CAISAMAR","city_id":569943,"qty":5},"Centenario-569943":{"name":"Centenario","city_id":569943,"qty":4},"Centro-569943":{"name":"Centro","city_id":569943,"qty":93},"Centro - Zona Shopping-569943":{"name":"Centro - Zona Shopping","city_id":569943,"qty":5},"Centro\/La Perla-569943":{"name":"Centro\/La Perla","city_id":569943,"qty":2},"Chapadmalal-569943":{"name":"Chapadmalal","city_id":569943,"qty":4},"CHAUVIN-569943":{"name":"CHAUVIN","city_id":569943,"qty":16},"Chauvin\/Htal Materno-569943":{"name":"Chauvin\/Htal Materno","city_id":569943,"qty":2},"Colina Alegre-569943":{"name":"Colina Alegre","city_id":569943,"qty":1},"Colina de Peralta Ramos-569943":{"name":"Colina de Peralta Ramos","city_id":569943,"qty":1},"Constitucion-569943":{"name":"Constitucion","city_id":569943,"qty":16},"Don Bosco-569943":{"name":"Don Bosco","city_id":569943,"qty":4},"El Gaucho-569943":{"name":"El Gaucho","city_id":569943,"qty":4},"El Grosellar-569943":{"name":"El Grosellar","city_id":569943,"qty":2},"Estadio Mundial-569943":{"name":"Estadio Mundial","city_id":569943,"qty":3},"Estadio Mundialista-569943":{"name":"Estadio Mundialista","city_id":569943,"qty":1},"Ex Terminal-569943":{"name":"Ex Terminal","city_id":569943,"qty":1},"Ferroautomotora-569943":{"name":"Ferroautomotora","city_id":569943,"qty":3},"General Belgrano-569943":{"name":"General Belgrano","city_id":569943,"qty":1},"Grosellar-569943":{"name":"Grosellar","city_id":569943,"qty":1},"G\u00fcemes-569943":{"name":"G\u00fcemes","city_id":569943,"qty":34},"Hpc-569943":{"name":"Hpc","city_id":569943,"qty":4},"Htal. Materno-569943":{"name":"Htal. Materno","city_id":569943,"qty":1},"J. Newbery-569943":{"name":"J. Newbery","city_id":569943,"qty":1},"Juan B. Justo-569943":{"name":"Juan B. Justo","city_id":569943,"qty":1},"Juramento-569943":{"name":"Juramento","city_id":569943,"qty":1},"La Florida-569943":{"name":"La Florida","city_id":569943,"qty":1},"La Perla-569943":{"name":"La Perla","city_id":569943,"qty":25},"Las Avenidas-569943":{"name":"Las Avenidas","city_id":569943,"qty":1},"Los Acantilados-569943":{"name":"Los Acantilados","city_id":569943,"qty":1},"Los Pinares-569943":{"name":"Los Pinares","city_id":569943,"qty":2},"Los Troncos-569943":{"name":"Los Troncos","city_id":569943,"qty":4},"Macrocentro-569943":{"name":"Macrocentro","city_id":569943,"qty":25},"Macrocentro \/ Plaza Peralta Ramos-569943":{"name":"Macrocentro \/ Plaza Peralta Ramos","city_id":569943,"qty":1},"Mar Chiquita-569943":{"name":"Mar Chiquita","city_id":569943,"qty":1},"Materno-569943":{"name":"Materno","city_id":569943,"qty":1},"Monolito-569943":{"name":"Monolito","city_id":569943,"qty":6},"Mundialista-569943":{"name":"Mundialista","city_id":569943,"qty":1},"Nueva Pompeya-569943":{"name":"Nueva Pompeya","city_id":569943,"qty":1},"Nueva Terminal-569943":{"name":"Nueva Terminal","city_id":569943,"qty":4},"Parque La Armon\u00eda-569937":{"name":"Parque La Armon\u00eda","city_id":569937,"qty":1},"Parque Luro-569943":{"name":"Parque Luro","city_id":569943,"qty":7},"Parque Palermo-569943":{"name":"Parque Palermo","city_id":569943,"qty":1},"Parque Pe\u00f1a-569943":{"name":"Parque Pe\u00f1a","city_id":569943,"qty":1},"Paseo Aldrey-569943":{"name":"Paseo Aldrey","city_id":569943,"qty":7},"Pinos de Anchorena-569943":{"name":"Pinos de Anchorena","city_id":569943,"qty":1},"Playa Chica-569943":{"name":"Playa Chica","city_id":569943,"qty":11},"PLAYA GRANDE-569943":{"name":"PLAYA GRANDE","city_id":569943,"qty":6},"Playa Martinez de Hoz-569943":{"name":"Playa Martinez de Hoz","city_id":569943,"qty":1},"Playa Varese-569943":{"name":"Playa Varese","city_id":569943,"qty":13},"Plaza Col\u00f3n-569943":{"name":"Plaza Col\u00f3n","city_id":569943,"qty":4},"Plaza Mitre-569943":{"name":"Plaza Mitre","city_id":569943,"qty":19},"Plaza Peralta Ramos-569943":{"name":"Plaza Peralta Ramos","city_id":569943,"qty":1},"Plaza Rocha-569943":{"name":"Plaza Rocha","city_id":569943,"qty":2},"Plaza Rocha\/Nueva Pompeya-569943":{"name":"Plaza Rocha\/Nueva Pompeya","city_id":569943,"qty":2},"Pompeya-569943":{"name":"Pompeya","city_id":569943,"qty":1},"Rumenco-569943":{"name":"Rumenco","city_id":569943,"qty":2},"Rumenc\u00f3 Los \u00c1lamos-569943":{"name":"Rumenc\u00f3 Los \u00c1lamos","city_id":569943,"qty":1},"San Antonio-569943":{"name":"San Antonio","city_id":569943,"qty":1},"SAN CARLOS-569943":{"name":"SAN CARLOS","city_id":569943,"qty":6},"San Cayetano-569943":{"name":"San Cayetano","city_id":569943,"qty":2},"San Jacinto-569943":{"name":"San Jacinto","city_id":569943,"qty":1},"San jer\u00f3nimo-569943":{"name":"San jer\u00f3nimo","city_id":569943,"qty":1},"SAN JOSE-569943":{"name":"SAN JOSE","city_id":569943,"qty":2},"San Juan-569943":{"name":"San Juan","city_id":569943,"qty":3},"Santa Barbara-569943":{"name":"Santa Barbara","city_id":569943,"qty":3},"Santa Celina-569943":{"name":"Santa Celina","city_id":569943,"qty":1},"Santa Rita-569943":{"name":"Santa Rita","city_id":569943,"qty":3},"Shopping Los Gallegos-569943":{"name":"Shopping Los Gallegos","city_id":569943,"qty":1},"Sierra de los Padres-569943":{"name":"Sierra de los Padres","city_id":569943,"qty":7},"Stella Maris-569943":{"name":"Stella Maris","city_id":569943,"qty":2},"Terminal Vieja-569943":{"name":"Terminal Vieja","city_id":569943,"qty":1},"Tribunales-569943":{"name":"Tribunales","city_id":569943,"qty":1},"Universidad Nacional-569943":{"name":"Universidad Nacional","city_id":569943,"qty":3},"Villa Golf-570140":{"name":"Villa Golf","city_id":570140,"qty":1},"Villa Primera-569943":{"name":"Villa Primera","city_id":569943,"qty":4}},"currencies":{"1":{"name":"USD","qty":705},"2":{"name":"$","qty":67}},"developments":{"content":{"648":"Residencias Roque Su\u00e1rez","690":"Barrio Privado Casonas del Haras","691":"Apartamentos Casonas del Haras","1132":"TORRE ALSINA - RESIDENCIAS SAN LORENZO","1134":"RESIDENCIAS OLAVARR\u00cdA","1192":"Casas llave en mano - Casonas del Haras ","1193":"RESIDENCIAS SAN LORENZO","1194":"Edificio Villa Luj\u00e1n","1195":"Edificio Strobel Trust","1202":"Edificio Torre Unzu\u00e9","1203":"Downtown Center","1206":"EDIFICIO EIRE","1207":"EDIFICIO RIVAS TRUST","1208":"Edificio Terminal G\u00fcemes Trust","1249":"BOULEVARD CENTER","1254":"EDIFICIO AVELLANEDA 1686","1255":"EDIFICIO ROCA TRUST II","1256":"EDIFICIO VARESE TRUST","1257":"OCEAN VIEW I","1258":"OFFICES TRUST ","1259":"C\u00d3RDOBA 2041","1260":"LA RIOJA 3366","1261":"SOL DE ROCA I","1262":"SOL DE ROCA II","1263":"COL\u00d3N 3445","1264":"EDIFICIO LOS TILOS ","1265":"EDIFICIO GASC\u00d3N 2744","1266":"OCEAN VIEW II","1267":"EDIFICIO RAWSON 2370","1268":"ROCA TRUST I","1269":"ARGOST TRUST","1274":"POLO 226"},"total":32},"cache":true})
		}
	}
</script>
