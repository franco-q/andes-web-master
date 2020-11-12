<template>
	<div class="item">
		<span class="item-featured" v-if="(status || reappraised) && status == 'available'">
			{{ !highlight && reappraised ? "RETASADO" : "DESTACADA" }}
		</span>
		<span class="item-status" v-if="status_str">{{ status_str }}</span>
		<div class="item-figure embed-responsive embed-responsive-16by9" :style="'background-image: url(' + img + ')'"></div>
		<div class="item-pricing">
			<span class="item-price">{{ currency.name }} {{ price }}</span>
			<span class="item-type">{{ property_type.name + " en " + transaction_type.name }}</span>
		</div>
		<ul class="item-details">
			<li class="item-detail" v-if="rooms"><i class="icon-home"></i> {{ rooms }} Ambientes</li>
			<li class="item-detail" v-if="bedrooms"><i class="icon-bed"></i> {{ bedrooms }} Dorm</li>
			<li class="item-detail" v-if="bathrooms"><i class="icon-droplet"></i> {{ bathrooms }} Baños</li>
			<li class="item-detail" v-if="m2_covered || m2">
				<i class="icon-codeopen"></i>
				{{ m2_covered ? m2_covered + " m² Cub" : "Sup. " + m2 + "m²" }}
			</li>
		</ul>
		<h4 class="item-title">{{ title }}</h4>
		<address class="item-address"><i class="icon-location"></i> {{ address }} {{ address_number }}, {{ city.name }}</address>
	</div>
</template>

<script>
	export default {
		props: [
			"address",
			"address_number",
			"amenities",
			"bathrooms",
			"bedrooms",
			"city",
			"country",
			"currency",
			"disposition",
			"expenses",
			"expenses_currency",
			"garages",
			"google_map_data",
			"hectares",
			"highlight",
			"id",
			"images",
			"images360_qty",
			"images_qty",
			"img",
			"m2",
			"m2_covered",
			"neighborhood",
			"payment",
			"plans_qty",
			"price",
			"property_type",
			"reappraised",
			"reference",
			"rooms",
			"short_description",
			"slideshow",
			"state",
			"status",
			"status_str",
			"tags",
			"title",
			"tours360_qty",
			"transaction_type",
			"videos_qty",
			"year"
		]
	}
</script>

<style></style>
