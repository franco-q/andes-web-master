<template>
	<div class="position-relative">
		<div v-if="loading" class="spinner-wrap"><div class="spinner"></div></div>
		<div class="row search">
			<div class="col-lg-8 d-flex flex-column">
				<div class="d-flex">
					<div class="search-sorting">
						<span>ORDENAR POR</span>
						<Treeselect v-bind="TreeselectOptions" v-model="model.sorting" :options="options.sorting" placeholder="Orden por Defecto" />
					</div>
					<div class="search-views">
						<a href="?list" class="search-views-opt" :class="{ selected: $route.query.hasOwnProperty('list') }">
							<i class="icon-th-list"></i>
						</a>
						<a href="?grid" class="search-views-opt" :class="{ selected: $route.query.hasOwnProperty('grid') }">
							<i class="icon-th-large"></i>
						</a>
						<a href="?gmap" class="search-views-opt" :class="{ selected: $route.query.hasOwnProperty('gmap') }">
							<i class="icon-globe"></i>
						</a>
					</div>
				</div>
				<template v-if="properties !== {} && profile !== {}">
					<component :is="view" v-bind="properties" :profile="profile" />
				</template>
			</div>
			<div class="col-lg-4 ">
				<div class="search-form ">
					<div class="form-row">
						<h3 class="col-12 search-form-title">REALIZA <strong>TU BÚSQUEDA</strong></h3>
						<div class="form-group col-12">
							<Treeselect
								v-bind="TreeselectOptions"
								v-model="model.transactionType"
								:options="options.transaction_types"
								placeholder="Tipo de Operación"
							/>
						</div>
						<div class="form-group col-12">
							<Treeselect
								v-bind="TreeselectOptions"
								multiple
								v-model="model.propertyType"
								:options="options.property_types"
								placeholder="Tipo de Propiedad"
							/>
						</div>
						<div class="form-group col-12">
							<Treeselect v-bind="TreeselectOptions" v-model="model.city" :options="options.cities" placeholder="Ciudad" />
						</div>
						<div class="form-group col-12">
							<Treeselect
								v-bind="TreeselectOptions"
								multiple
								v-model="model.neighborhood"
								:options="options.neighborhoods"
								placeholder="Zona o Barrio"
							/>
						</div>
						<div class="form-group col-6">
							<Treeselect v-bind="TreeselectOptions" multiple v-model="model.rooms" placeholder="Ambientes" :options="options.rooms" />
						</div>
						<div class="form-group col-6">
							<Treeselect
								v-bind="TreeselectOptions"
								multiple
								v-model="model.bedrooms"
								placeholder="Dormitorios"
								:options="options.bedrooms"
							/>
						</div>
						<div class="form-group col-6">
							<Treeselect
								v-bind="TreeselectOptions"
								multiple
								v-model="model.bathrooms"
								placeholder="Baños"
								:options="options.bathrooms"
							/>
						</div>
						<div class="form-group col-6">
							<Treeselect
								v-bind="TreeselectOptions"
								multiple
								v-model="model.garages"
								placeholder="Cocheras"
								:options="options.garages"
							/>
						</div>
						<div class="form-group col-4">
							<Treeselect v-bind="TreeselectOptions" v-model="model.currency" placeholder="Moneda" :options="options.currencies" />
						</div>
						<div class="form-group col-4">
							<input type="number" class="form-control" step="1000" v-model="model.minPrice" placeholder="Desde" />
						</div>
						<div class="form-group col-4">
							<input type="number" class="form-control" step="1000" v-model="model.maxPrice" placeholder="Hasta" />
						</div>
						<div class="form-group col-12">
							<input type="text" class="form-control" v-model="model.reference" placeholder="Nro Referencia #" />
						</div>
						<div class="form-group col-12 m-0">
							<button type="button" id="buscar" class="search-form-submit" value="Buscar" @click.prevent="search">
								Buscar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Treeselect from "@riophae/vue-treeselect"
	import Inmokey from "../Inmokey.js"
	import Grid from "./Grid"
	import List from "./List"
	import Gmap from "./Gmap"

	const status_types = {
		rented: "Alquilado",
		reserved: "Reservado",
		selled: "Vendido"
	}

	export default {
		name: "search",

		components: { Treeselect, Grid, List, Gmap },

		data() {
			return {
				TreeselectOptions: {
					limit: 0,
					limitText: count => `${count} seleccionados`,
					noOptionsText: "No hay opciones disponibles",
					noResultsText: "No se encuentran resultados"
				},
				profile: {},
				settings: {},
				properties: {},
				loading: true,
				model: {
					pageSize: this.$route.query.hasOwnProperty("gmap") ? 100 : 8,
					pageNumber: this.$route.query.p || 1,
					propertyType: null,
					transactionType: null,
					city: null,
					neighborhood: null,
					rooms: null,
					bedrooms: null,
					bathrooms: null,
					garages: null,
					currency: null,
					minPrice: null,
					maxPrice: null,
					reference: null,
					sorting: null
				}
			}
		},

		watch: {
			$route: {
				handler({ query }) {
					this.model.pageNumber = query.p
					this.search()
				}
			}
		},

		methods: {
			search() {
				this.loading = true
				var params = {}

				if (this.model.pageSize) {
					params.pageSize = this.model.pageSize
				}

				if (this.model.pageNumber) {
					params.pageNumber = this.model.pageNumber
				}

				if (this.model.currency) {
					params.currency = this.model.currency
				}

				if (this.model.propertyType) {
					params.propertyType = "[" + this.model.propertyType.join(",") + "]"
				}

				if (this.model.transactionType) {
					params.transactionType = this.model.transactionType
				}

				if (this.model.city) {
					params.city = this.model.city
				}

				if (this.model.neighborhood) {
					params.neighborhood = "[" + this.model.neighborhood.join(",") + "]"
				}

				if (this.model.rooms) {
					params.rooms = "[" + this.model.rooms.join(",") + "]"
				}

				if (this.model.bedrooms) {
					params.bedrooms = "[" + this.model.bedrooms.join(",") + "]"
				}

				if (this.model.bathrooms) {
					params.bathrooms = "[" + this.model.bathrooms.join(",") + "]"
				}

				if (this.model.garages) {
					params.garages = "[" + this.model.garages.join(",") + "]"
				}

				if (this.model.minPrice) {
					params.minPrice = this.model.minPrice
				}

				if (this.model.maxPrice) {
					params.maxPrice = this.model.maxPrice
				}

				if (this.model.reference) {
					params.reference = this.model.reference
				}

				if (this.model.sorting) {
					params.sorting = this.model.sorting
				}

				Inmokey.getProperties(params, properties => {
					properties.content = properties.content.map(item => {
						item.status_str = status_types[item.status]
						item.img = item.images[0].medium
						return item
					})
					this.properties = properties
					this.loading = false
				})
			}
		},

		computed: {
			view() {
				return ["gmap", "grid", "list"].find(view => this.$route.query.hasOwnProperty(view)) || "grid"
			},
			options() {
				return {
					sorting: [
						{ id: "highlightPriceDesc", label: "Mayor precio" },
						{ id: "highlightPriceAsc", label: "Menor precio" },
						{ id: "highlightDesc", label: "Más recientes" },
						{ id: "highlightAsc", label: "Más antiguas" }
					],
					rooms: [
						{ id: 1, label: "1 Amb." },
						{ id: 2, label: "2 Amb." },
						{ id: 3, label: "3 Amb." },
						{ id: 4, label: "4 Amb." },
						{ id: "5,6,7,8,9,10", label: "+5 Amb" }
					],
					bedrooms: [
						{ id: 1, label: "1 Dorm." },
						{ id: 2, label: "2 Dorm." },
						{ id: 3, label: "3 Dorm." },
						{ id: 4, label: "4 Dorm." },
						{ id: "5,6,7,8,9,10", label: "+5 Dorm" }
					],
					bathrooms: [
						{ id: 1, label: "1 Baño" },
						{ id: 2, label: "2 Baños" },
						{ id: 3, label: "3 Baños" },
						{ id: 4, label: "4 Baños" },
						{ id: "5,6,7,8,9,10", label: "+5 Baños" }
					],
					garages: [
						{ id: 1, label: "1 Cochera" },
						{ id: 2, label: "2 Cocheras" },
						{ id: 3, label: "3 Cocheras" },
						{ id: 4, label: "4 Cocheras" },
						{ id: "5,6,7,8,9,10", label: "+5 Cocheras" }
					],
					currencies: [
						{ id: 1, label: "USD" },
						{ id: 2, label: "$" }
					],
					transaction_types: this.settings.transaction_types
						? Object.entries(this.settings.transaction_types).map(([id, value]) => ({ id, label: value.name }))
						: [],
					property_types: this.settings.property_types
						? Object.entries(this.settings.property_types).map(([id, value]) => ({ id, label: value.name }))
						: [],
					cities: this.settings.cities
						? Object.entries(this.settings.cities)
								.filter(
									([id, value]) =>
										value.name.trim() && Object.values(this.settings.neighborhoods).some(({ city_id }) => id == city_id)
								)
								.map(([id, value]) => ({ id, label: value.name }))
						: [],
					neighborhoods: this.settings.neighborhoods
						? Object.entries(this.settings.neighborhoods)
								.filter(([id, value]) => value.qty && value.name.trim() && (this.model.city ? this.model.city == value.city_id : 1))
								.map(([id, value]) => ({ id, label: value.name }))
						: []
				}
			}
		},

		beforeMount() {
			this.loading = true
				Inmokey.getProfile(profile => {
					this.profile = profile
					console.log(profile);
			Inmokey.getSettings(settings => {
				this.settings = settings
					this.search()
					this.loading = false
				})
			})
		}
	}
</script>
