<template>
	<div class="grid-view">
		<div class="row">
			<div class="col-sm-6" v-for="item in content" :key="item.id">
				<Item v-bind="item" />
			</div>
			<div class="col-12 pagination mt-3" v-if="total > pageSize">
				<p class="pagination-summary">
					Total de Inmuebles: {{ total }}, mostrando del {{ pageNumber * pageSize }} al {{ pageNumber * pageSize + pageSize }}
				</p>
				<div class="pagination-list">
					<router-link v-if="pageNumber > 1" :to="{ query: { p: pageNumber - 1 } }" class="pagination-item pagination-item_prev"
						>Anterior</router-link
					>
					<template v-for="(p, n) in pagination">
						<a v-if="p" :key="'p_' + n" :href="p" class="pagination-item" :class="{ 'pagination-item_active': p == pageNumber }">{{
							p
						}}</a>
						<span v-else :key="'p_' + n" class="pagination-item pagination-item_dots">...</span>
					</template>
					<router-link v-if="pageNumber < total" :to="{ query: { p: pageNumber + 1 } }" class="pagination-item pagination-item_next"
						>Siguiente</router-link
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Item from "./Item"
	export default {
		components: { Item },
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
