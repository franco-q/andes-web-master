<template>
	<div class="flex-fill my-2">
		<div class="h-100" ref="googleMap"></div>
	</div>
</template>

<script>
	import OverlappingMarkerSpiderfier from "overlapping-marker-spiderfier"
	var google

	const h = (tag, attr, content_) =>
		"<" +
		tag +
		" " +
		Object.entries(attr)
			.map(([key, val]) => key + '="' + val + '"')
			.join(" ") +
		">" +
		(content_ || "") +
		"</" +
		tag +
		">"

	export default {
		props: {
			profile: Object,
			content: Array,
			mapConfig: Object,
			apiKey: String
		},
		data() {
			return {
				map: null
			}
		},
		mounted() {
			google = window.google
			this.initializeMap()
		},

		methods: {
			initializeMap() {
				const mapContainer = this.$refs.googleMap

				var mapOptions = {
					styles: [
						{ featureType: "all", elementType: "labels.text", stylers: [{ visibility: "off" }] },
						{
							featureType: "all",
							elementType: "labels.text.fill",
							stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }, { visibility: "off" }]
						},
						{
							featureType: "all",
							elementType: "labels.text.stroke",
							stylers: [{ visibility: "off" }, { color: "#ffffff" }, { lightness: 16 }]
						},
						{ featureType: "all", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
						{ featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#fefefe" }, { lightness: 20 }] },
						{
							featureType: "administrative",
							elementType: "geometry.stroke",
							stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }]
						},
						{ featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 20 }] },
						{ featureType: "poi", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 21 }] },
						{ featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#dedede" }, { lightness: 21 }] },
						{ featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }, { lightness: 17 }] },
						{
							featureType: "road.highway",
							elementType: "geometry.stroke",
							stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }]
						},
						{ featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 18 }] },
						{ featureType: "road.local", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 16 }] },
						{ featureType: "transit", elementType: "geometry", stylers: [{ color: "#f2f2f2" }, { lightness: 19 }] },
						{ featureType: "water", elementType: "geometry", stylers: [{ color: "#e9e9e9" }, { lightness: 17 }] }
					],
					center: (([lat, lng]) => new google.maps.LatLng(lat, lng))(this.profile.sucursals[0].map_marker),
					mapTypeId: google.maps.MapTypeId.hybrid,
					zoom: 12,
					animation: google.maps.Animation.DROP,
					disableDefaultUI: false,
					mapTypeControlOptions: {
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
					streetViewControl: false,
					overviewMapControl: true,
					rotateControl: true,
					rotateControlOptions: {
						position: google.maps.ControlPosition.LEFT_CENTER
					},
					fullscreenControl: false,
					fullscreenControlOptions: {
						position: google.maps.ControlPosition.TOP_RIGHT
					}
				}

				this.map = new google.maps.Map(mapContainer, mapOptions)

				const oms = new OverlappingMarkerSpiderfier(this.map, {
					markersWontMove: true,
					markersWontHide: true,
					basicFormatEvents: true,
					nearbyDistance: 30
				})

				this.content
					.filter(item => item.google_map_data.lat_lng)
					.map(item => {
						var [lat, lng] = item.google_map_data.lat_lng.split(",")

						var marker = new google.maps.Marker({
							map: this.map,
							animation: google.maps.Animation.DROP,
							position: new google.maps.LatLng(lat, lng)
						})

						const content = []

						if ((item.highlight || item.reappraised) && item.status == "available") {
							content.push(h("span", { class: "item-featured" }, !item.highlight && item.reappraised ? "RETASADO" : "DESTACADA"))
						}

						if (item.status_str) {
							content.push(h("span", { class: "item-status" }, item.status_str))
						}

						content.push(
							h("div", {
								class: "item-figure embed-responsive embed-responsive-16by9",
								style: "background-image: url(" + item.img + ")"
							})
						)
						content.push(
							h(
								"div",
								{ class: "item-pricing" },
								h("span", { class: "item-price m-auto" }, item.currency.name + " " + item.price)
							)
						)

						if (item.rooms || item.bedrooms || item.bathrooms || item.m2_covered) {
							content.push(
								h(
									"ul",
									{ class: "item-details" },
									(item.rooms
										? h("li", { class: "item-detail" }, h("i", { class: "icon-home" }) + item.rooms + " Ambientes")
										: "") +
										(item.bedrooms
											? h("li", { class: "item-detail" }, h("i", { class: "icon-bed" }) + item.bedrooms + " Dorm")
											: "") +
										(item.bathrooms
											? h("li", { class: "item-detail" }, h("i", { class: "icon-droplet" }) + item.bathrooms + " Baños")
											: "") +
										(item.m2_covered
											? h(
													"li",
													{ class: "item-detail" },
													h("i", { class: "icon-codeopen" }) +
														(item.m2_covered ? item.m2_covered + "  m² Cub" : "Sup. " + item.m2 + "m²")
											  )
											: "")
								)
							)
						}

						content.push(h("h4", { class: "item-title" }, item.title))
						content.push(
							h(
								"address",
								{ class: "item-address px-1" },
								h("i", { class: "item-location" }, item.address + " " + item.address_number + ", " + item.city.name)
							)
						)

						const infowindow = new google.maps.InfoWindow({
							content: h("a", {}, h("div", { class: "item" }, content.join("")))
						})

						marker.addListener("click", () => {
							infowindow.open(this.map, marker)
						})

						oms.addMarker(marker)
					})
			}
		},

		watch: {
			content(a) {
			this.initializeMap()
			}
		}
	}
</script>

<style></style>
