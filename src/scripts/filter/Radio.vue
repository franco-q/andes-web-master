<style lang="scss" scoped>
	.radio-component {
		> input {
			opacity: 0;
			position: absolute;

			+ label > .input-box {
				display: inline-block;
				border: 1px solid #ddd;
				border-radius: 50%;
				margin: 0;
				padding: 0;
				width: 1em;
				height: 1em;
				background: #fff;
				overflow: hidden;
				vertical-align: -5%;
				user-select: none;

				> .input-box-circle {
					display: block;
					margin: 50%;
					width: 0%;
					height: 0%;
					background: #000;
					border-radius: 50%;
					opacity: 0;
					transition: width 0.15s ease-in, height 0.15s ease-in, margin 0.15s ease-in;
				}
			}

			&:checked + label > .input-box > .input-box-circle {
				opacity: 1;
				margin: 22%;
				width: 56%;
				height: 56%;
			}

			&:disabled + label {
				opacity: 0.7;
			}
		}
	}
</style>

<template>
	<div class="radio-component">
		<input
			type="radio"
			:id="id"
			:name="name"
			:value="value"
			:class="className"
			:required="required"
			:disabled="disabled"
			@change="onChange"
			:checked="state"
		/>
		<label :for="id">
			<slot name="input-box">
				<span class="input-box">
					<span class="input-box-circle"></span>
				</span>
			</slot>
			<slot></slot>
		</label>
	</div>
</template>

<script>
	export default {
		model: {
			prop: 'modelValue',
			event: 'input'
		},

		props: {
			id: {
				type: String,
				default: function() {
					return 'radio-id-' + this._uid
				}
			},
			name: {
				type: String,
				default: null
			},
			value: {
				default: ''
			},
			modelValue: {
				default: undefined
			},
			className: {
				type: String,
				default: null
			},
			checked: {
				type: Boolean,
				default: false
			},
			required: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			model: {}
		},

		computed: {
			state() {
				if (this.modelValue === undefined) {
					return this.checked
				}

				return this.modelValue === this.value
			}
		},

		methods: {
			onChange() {
				this.toggle()
			},

			toggle() {
				this.$emit('input', this.state ? '' : this.value)
			}
		},

		watch: {
			checked(newValue) {
				if (newValue !== this.state) {
					this.toggle()
				}
			}
		},

		mounted() {
			if (this.checked && !this.state) {
				this.toggle()
			}
		}
	}
</script>
