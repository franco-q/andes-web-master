<template>
	<div class="list-view">
		<div class="item row" v-for="item in content" :key="item.id">
			<div class="col-4 pr-1">
				<div class="overflow-hidden position-relative">
					<span class="item-featured" v-if="(item.status || item.reappraised) && item.status == 'available'">
						{{ !item.highlight && item.reappraised ? "RETASADO" : "DESTACADA" }}
					</span>
					<span class="item-status" v-if="item.status_str">{{ item.status_str }}</span>
					<div class="item-figure embed-responsive embed-responsive-4by3" :style="'background-image: url(' + item.img + ')'"></div>
					<div class="item-pricing">
						<span class="item-price">{{ item.currency.name }} {{ item.price }}</span>
						<span class="item-type">{{ item.property_type.name + " en " + item.transaction_type.name }}</span>
					</div>
				</div>
			</div>
			<div class="col-8 d-flex flex-column">
				<h4 class="item-title">{{ item.title }}</h4>
				<address class="item-address">
					<i class="icon-location"></i> {{ item.address }} {{ item.address_number }}, {{ item.city.name }}
				</address>
				<p class="item-desc">{{ item.short_description }}</p>
				<ul class="item-details" v-if="item.rooms || item.bedrooms || item.bathrooms || item.m2_covered || item.m2">
					<li class="item-detail" v-if="item.rooms"><i class="icon-home"></i> {{ item.rooms }} Ambientes</li>
					<li class="item-detail" v-if="item.bedrooms"><i class="icon-bed"></i> {{ item.bedrooms }} Dorm</li>
					<li class="item-detail" v-if="item.bathrooms"><i class="icon-droplet"></i> {{ item.bathrooms }} Baños</li>
					<li class="item-detail" v-if="item.m2_covered || item.m2">
						<i class="icon-codeopen"></i>
						{{ item.m2_covered ? item.m2_covered + " m² Cub" : "Sup. " + item.m2 + "m²" }}
					</li>
				</ul>
			</div>
		</div>
		<div class="col-12 pagination mt-3" v-if="total > pageSize">
			<p class="pagination-summary">
				Total de Inmuebles: {{ total }}, mostrando del {{ pageNumber * pageSize }} al {{ pageNumber * pageSize + pageSize }}
			</p>
			<div class="pagination-list">
				<router-link v-if="pageNumber > 1" :to="{ query: { list: null, p: pageNumber - 1 } }" class="pagination-item pagination-item_prev">
					Anterior
				</router-link>
				<template v-for="(p, n) in pagination">
					<router-link
						v-if="p"
						:key="'p_' + n"
						:to="{ query: { ...$route.query, list: null, p } }"
						class="pagination-item"
						:class="{ 'pagination-item_active': p == pageNumber }"
						>{{ p }}</router-link
					>
					<span v-else :key="'p_' + n" class="pagination-item pagination-item_dots">...</span>
				</template>
				<router-link
					v-if="pageNumber < total"
					:to="{ query: { list: null, p: pageNumber + 1 } }"
					class="pagination-item pagination-item_next"
				>
					Siguiente
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			pageNumber: { type: Number, default: 1 },
			pageSize: { type: Number, default: 1 },
			total: { type: Number, default: 1 },
			content: { type: Array, default: () => [] }
		},

		computed: {
			pagination() {
				var current = this.pageNumber,
					last = Math.ceil(this.total / this.pageSize),
					delta = 2,
					left = current - delta,
					right = current + delta + 1,
					range = [],
					rangeWithDots = [],
					l

				for (let i = 1; i <= last; i++) {
					if (i == 1 || i == last || (i >= left && i < right)) {
						range.push(i)
					}
				}

				for (let i of range) {
					if (l) {
						if (i - l === 2) {
							rangeWithDots.push(l + 1)
						} else if (i - l !== 1) {
							rangeWithDots.push(null)
						}
					}
					rangeWithDots.push(i)
					l = i
				}

				return rangeWithDots
			}
		}
	}
</script>

<style></style>
