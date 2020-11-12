<template>
	<div id="slider-header">
		<div id="slide-header" class="carousel slide">
			<ol class="carousel-indicators">
				<li v-for="(a, c) in items" data-target="#slide-header" :data-slide-to="c" :class="{ active: c == 0 }" :key="c"></li>
			</ol>
			<div class="carousel-inner">
				<div v-for="(item, i) in items" :key="item.id" class="carousel-item" :class="{ active: i == 0 }">
					<div class="overflow-hidden">
						<div class="container-lg position-relative">
							<h3 class="carousel-item-title">
								{{ item.type }} <strong>{{ item.name }}</strong
								><small><a href="#">ver mas</a></small>
							</h3>
						</div>
						<img :src="item.images[0].big" :alt="item.description" class="d-block" style="min-width:100%;min-height:100%" />
					</div>
				</div>
			</div>
			<a class="carousel-control-prev" href="#slide-header" role="button" data-slide="prev">
				<span class="icon-angle-left" aria-hidden="true"></span>
				<span class="sr-only">Previous</span>
			</a>
			<a class="carousel-control-next" href="#slide-header" role="button" data-slide="next">
				<span class="icon-angle-right" aria-hidden="true"></span>
				<span class="sr-only">Next</span>
			</a>
		</div>
	</div>
</template>
<script>
import Inmokey from '../Inmokey'
import $ from 'jquery'
import img1 from '@/images/02.jpg'
import img2 from '@/images/03.jpg'
import img3 from '@/images/04.jpg'
import img4 from '@/images/05.jpg'
import { gsap } from 'gsap'

const images = [img2, img1, img3, img4]

export default {
	data() {
		return { items: [] }
	},
	beforeMount() {
		// Inmokey.getDevelopments({}, ({ content }) => {
		// 	this.items = content
		// })
		let c = 0
		this.items = [
			{
				id: 1274,
				name: 'POLO 226',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: 2,
				rooms: '',
				address: 'Ruta 226 ',
				address_number: 'km 8',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/7\/4\/main_8425.jpg',
				description:
					'Polo 226.\nNaves destinadas a log\u00edstica, distribuci\u00f3n e industria. \nDesde los 240m2. \nUnidades con entrega inmediata y en construcci\u00f3n. \nExcelentes materiales, docks de carga, espacios comunes y propios de maniobras y circulaci\u00f3n. \nCarga y descarga, iluminaci\u00f3n y seguridad las 24 hs. \n\n\n',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/7\/4\/thumb_d-1274-280420094442-436931.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/7\/4\/d-1274-280420094442-436931.jpg',
						id: 'id_03676798169062674'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/7\/4\/thumb_d-1274-280420094438-166369.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/7\/4\/d-1274-280420094438-166369.jpg',
						id: 'id_08246889639881516'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/7\/4\/thumb_d-1274-280420094443-150958.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/7\/4\/d-1274-280420094443-150958.jpg',
						id: 'id_09321231158811141'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/7\/4\/thumb_d-1274-280420094447-969562.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/7\/4\/d-1274-280420094447-969562.jpg',
						id: 'id_041473891220010795'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/7\/4\/thumb_d-1274-280420094535-607887.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/7\/4\/d-1274-280420094535-607887.jpeg',
						id: 'id_020375278830974097'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/7\/4\/thumb_d-1274-280420094537-884270.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/7\/4\/d-1274-280420094537-884270.jpeg',
						id: 'id_05089188872108512'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/7\/4\/thumb_d-1274-280420094536-866671.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/7\/4\/d-1274-280420094536-866671.jpeg',
						id: 'id_024137813396197716'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/7\/4\/thumb_d-1274-280420094540-373521.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/7\/4\/d-1274-280420094540-373521.jpg',
						id: 'id_03390073520497412'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/7\/4\/thumb_d-1274-280420094557-932700.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/7\/4\/d-1274-280420094557-932700.jpg',
						id: 'id_04497009089177426'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/7\/4\/thumb_d-1274-280420094555-431803.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/7\/4\/d-1274-280420094555-431803.jpeg',
						id: 'id_08253147487234471'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/7\/4\/thumb_d-1274-280420094556-670672.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/7\/4\/d-1274-280420094556-670672.jpeg',
						id: 'id_08349878143523628'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/7\/4\/thumb_d-1274-280420094555-341188.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/7\/4\/d-1274-280420094555-341188.jpeg',
						id: 'id_0035646207467026736'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/7\/4\/thumb_d-1274-280420094558-399260.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/7\/4\/d-1274-280420094558-399260.jpeg',
						id: 'id_06213267165857417'
					}
				]
			},
			{
				id: 1269,
				name: 'ARGOST TRUST',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: null,
				rooms: '',
				address: 'Sarmiento',
				address_number: '3084',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/6\/9\/main_7239.jpg',
				description:
					'Argost Trust, edificio redidencial ubicado sobre calle Sarmiento en Zona G\u00fcemes. \nUnidades de 2 y 3 ambientes con balcones a la calle. \n6 pisos, 11 unidades funcionales. \nCocheras. \n\nEntregado en 2012.',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/9\/thumb_d-1269-270420125322-671330.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/9\/d-1269-270420125322-671330.jpg',
						id: 'id_0816445960779214'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/9\/thumb_d-1269-270420125322-392281.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/9\/d-1269-270420125322-392281.jpg',
						id: 'id_009454465154348601'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/9\/thumb_d-1269-270420125321-750871.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/9\/d-1269-270420125321-750871.jpg',
						id: 'id_08591722337375567'
					}
				]
			},
			{
				id: 1268,
				name: 'ROCA TRUST I',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: 2,
				rooms: '4',
				address: 'Roca',
				address_number: '1475',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/6\/8\/main_211.jpg',
				description:
					'Edificio Roca Trust I residencial ubicado en Zona G\u00fcemes. \nPisos exclusivos.\n5 pisos, 5 unidades funcionales. \nAmplios balcones a la calle.\nCocheras. \n\nEntregado en 2014.\n\n\n',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/8\/thumb_d-1268-270420094550-635565.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/8\/d-1268-270420094550-635565.JPG',
						id: 'id_036745567924657063'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/8\/thumb_d-1268-270420094552-908273.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/8\/d-1268-270420094552-908273.JPG',
						id: 'id_09128509737396004'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/8\/thumb_d-1268-270420094551-495717.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/8\/d-1268-270420094551-495717.JPG',
						id: 'id_04272811239408929'
					}
				]
			},
			{
				id: 1267,
				name: 'EDIFICIO RAWSON 2370',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: null,
				rooms: '',
				address: 'Rawson',
				address_number: '2370',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/6\/7\/main_1922.jpg',
				description:
					'Edificio Rawson 2370, residencial.\nSemi-pisos de 3 ambientes.\n4 pisos, 8 unidades funcionales.\nBalcones a la calle.\nCocheras.\n\nEntregado en 2011.',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/7\/thumb_d-1267-270420093908-248581.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/7\/d-1267-270420093908-248581.jpg',
						id: 'id_04447346855368335'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/7\/thumb_d-1267-270420093906-106262.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/7\/d-1267-270420093906-106262.jpg',
						id: 'id_09288154808123326'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/7\/thumb_d-1267-270420093907-952589.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/7\/d-1267-270420093907-952589.jpg',
						id: 'id_0502904905302487'
					}
				]
			},
			{
				id: 1266,
				name: 'OCEAN VIEW II',
				slogan: 'Frente al Mar',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: null,
				rooms: '',
				address: 'Felix U. Camet ',
				address_number: '1100',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/6\/6\/main_2753.jpg',
				description:
					'Edificio Ocean View II, frente al mar.\nUnidades de 2 y 3 ambientes.\nBalcones con grandes visuales.\nCocheras.\n6 pisos, 17 unidades funcionales.\n\nEntregado en 2016.',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/6\/thumb_d-1266-270420093446-479757.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/6\/d-1266-270420093446-479757.jpeg',
						id: 'id_09902052786414894'
					}
				]
			},
			{
				id: 1265,
				name: 'EDIFICIO GASC\u00d3N 2744',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: null,
				rooms: '',
				address: 'Gasc\u00f3n',
				address_number: '2744',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/6\/5\/main_781.jpg',
				description:
					'Edificio Gasc\u00f3n 2744\nOficinas de 47 a 64 m2. \n6 pisos, 12 unidades funcionales. \nCocheras.\n\nEntregado en 2012.',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/5\/thumb_d-1265-270420092424-640606.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/5\/d-1265-270420092424-640606.jpg',
						id: 'id_008796855844386409'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/5\/thumb_d-1265-270420092422-696303.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/5\/d-1265-270420092422-696303.jpg',
						id: 'id_06700613390784267'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/5\/thumb_d-1265-270420092423-741075.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/5\/d-1265-270420092423-741075.jpg',
						id: 'id_05073862359430912'
					}
				]
			},
			{
				id: 1264,
				name: 'EDIFICIO LOS TILOS ',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: null,
				rooms: '',
				address: 'Diagonal Pueyrred\u00f3n',
				address_number: '3245',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/6\/4\/main_6255.jpg',
				description: 'Edificio Los Tilos.\nPisos exclusivos con vista al Boulevard. \nBalcones a la calle. \n\nEntregado en 2009.',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/4\/thumb_d-1264-270420091949-895648.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/4\/d-1264-270420091949-895648.jpg',
						id: 'id_07864076533961031'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/4\/thumb_d-1264-270420091948-653171.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/4\/d-1264-270420091948-653171.jpg',
						id: 'id_07813936301435478'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/4\/thumb_d-1264-270420091948-712389.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/4\/d-1264-270420091948-712389.jpg',
						id: 'id_029212526026062346'
					}
				]
			},
			{
				id: 1263,
				name: 'COL\u00d3N 3445',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: 3,
				rooms: '1',
				address: 'Av. Col\u00f3n',
				address_number: '3445',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/6\/3\/main_585.jpg',
				description:
					'Col\u00f3n 3445, edificio de Oficinas con unidades de 47 a 64 m2. \nPisos exclusivos. \n10 pisos, 30 unidades funcionales. \nCocheras. \n\nEntregado en 2011.\n',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/3\/thumb_d-1263-240420052637-604128.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/3\/d-1263-240420052637-604128.jpg',
						id: 'id_0645745293579159'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/3\/thumb_d-1263-240420052638-874811.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/3\/d-1263-240420052638-874811.jpg',
						id: 'id_03889245391885128'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/3\/thumb_d-1263-240420052641-702483.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/3\/d-1263-240420052641-702483.jpg',
						id: 'id_03400734149917146'
					}
				]
			},
			{
				id: 1262,
				name: 'SOL DE ROCA II',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: null,
				rooms: '',
				address: 'Roca',
				address_number: '1634',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/6\/2\/main_733.jpg',
				description:
					'Edificio Sol de Roca II. \nSemi-pisos de 2 y 3 ambientes. 5 pisos. \nBalcones a la calle. \nCocheras en PB.\n\nEntregado en 2013.',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/2\/thumb_d-1262-240420112437-456653.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/2\/d-1262-240420112437-456653.JPG',
						id: 'id_08919791893364002'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/2\/thumb_d-1262-240420112501-215510.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/2\/d-1262-240420112501-215510.JPG',
						id: 'id_01526979372543742'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/2\/thumb_d-1262-240420112441-168931.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/2\/d-1262-240420112441-168931.JPG',
						id: 'id_009256861591253873'
					}
				]
			},
			{
				id: 1261,
				name: 'SOL DE ROCA I',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: null,
				rooms: '',
				address: '',
				address_number: '',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/6\/1\/main_7189.jpg',
				description:
					'Edificio Sol de Roca I, zona residencial. \nSemi-pisos de 2 y 3 ambientes. 5 pisos. \nBalcones a la calle.\nCocheras en PB y subsuelo. \n\nEntregado en 2012.',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/1\/thumb_d-1261-240420111727-404294.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/1\/d-1261-240420111727-404294.jpg',
						id: 'id_05264339721474425'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/1\/thumb_d-1261-240420111728-531125.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/1\/d-1261-240420111728-531125.jpg',
						id: 'id_06597323357181286'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/1\/thumb_d-1261-240420111729-976540.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/1\/d-1261-240420111729-976540.jpg',
						id: 'id_040601221183926994'
					}
				]
			},
			{
				id: 1260,
				name: 'LA RIOJA 3366',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: null,
				rooms: '',
				address: 'La Rioja ',
				address_number: '3366',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/6\/0\/main_4323.jpg',
				description:
					'Edificio La Rioja 3366.\nUnidades de 1, 2 y 3 ambientes. 4 pisos. \nCocheras en PB y Subsuelo. \nBalcones a la calle. \n\nEntregado en 2012.',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/0\/thumb_d-1260-240420111228-873905.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/0\/d-1260-240420111228-873905.jpg',
						id: 'id_012322539808803734'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/0\/thumb_d-1260-240420111229-350364.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/0\/d-1260-240420111229-350364.jpg',
						id: 'id_015811428306431785'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/6\/0\/thumb_d-1260-240420111230-295612.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/6\/0\/d-1260-240420111230-295612.jpg',
						id: 'id_06493871890992913'
					}
				]
			},
			{
				id: 1259,
				name: 'C\u00d3RDOBA 2041',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: null,
				rooms: '',
				address: '',
				address_number: '',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/5\/9\/main_4222.jpg',
				description:
					'Edificio C\u00f3rdoba 2041.\nSemi-pisos de 2 y 3 ambientes. 8 Pisos.\nLocal Comercial en Planta Baja. \nCocheras en PB. \n\nEntregado en 2010.\n',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/9\/thumb_d-1259-240420110621-716483.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/9\/d-1259-240420110621-716483.jpg',
						id: 'id_09464664763228885'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/9\/thumb_d-1259-240420110620-888542.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/9\/d-1259-240420110620-888542.jpg',
						id: 'id_06574310042961689'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/9\/thumb_d-1259-240420110622-712411.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/9\/d-1259-240420110622-712411.jpg',
						id: 'id_020487599747895402'
					}
				]
			},
			{
				id: 1258,
				name: 'OFFICES TRUST ',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: null,
				rooms: '',
				address: 'Moreno',
				address_number: '2876',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/5\/8\/main_7961.jpg',
				description:
					'Edificio Offices Trust, ubicado en zona Centro sobre calle Moreno. \nOficinas y Locales Comerciales. \n7 pisos, 16 Unidades Funcionales. \n1 Ascensor. \n\nEntregado en 2013.',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/8\/thumb_d-1258-240420110044-151912.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/8\/d-1258-240420110044-151912.JPG',
						id: 'id_09321298014896069'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/8\/thumb_d-1258-240420110045-830386.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/8\/d-1258-240420110045-830386.JPG',
						id: 'id_02801975345896346'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/8\/thumb_d-1258-240420110046-434028.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/8\/d-1258-240420110046-434028.JPG',
						id: 'id_02757440728827645'
					}
				]
			},
			{
				id: 1257,
				name: 'OCEAN VIEW I',
				slogan: 'Frente al Mar',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: null,
				rooms: '',
				address: 'Felix U. Camet ',
				address_number: '1100',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/5\/7\/main_8712.jpg',
				description:
					'Edificio Ocean View I, con excelentes visuales al Mar.\nSemi-pisos de 2 y 3 ambientes. 6 pisos. \nBalcones a la calle.\nCocheras en PB.\n\nEntregado en 2012.',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/7\/thumb_d-1257-240420104048-259393.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/7\/d-1257-240420104048-259393.jpg',
						id: 'id_05658199046943397'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/7\/thumb_d-1257-240420104049-898773.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/7\/d-1257-240420104049-898773.jpg',
						id: 'id_0053269300039963774'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/7\/thumb_d-1257-240420104047-596798.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/7\/d-1257-240420104047-596798.jpg',
						id: 'id_04607237468211389'
					}
				]
			},
			{
				id: 1256,
				name: 'EDIFICIO VARESE TRUST',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: 1,
				rooms: '2',
				address: 'Gasc\u00f3n',
				address_number: '457',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/5\/6\/main_3348.jpg',
				description:
					'Edificio Varese Trust, ubicado en la excelente zona de Playa Varese, a pasos de la costa y el mar. \nSemipisos de 2 ambientes con excelentes visuales al Mar.\nHall de ingreso, quincho y terraza com\u00fan con jacuzzi. \nCocheras en PB y en subsuelo por rampa. \nUn ascensor, pocas unidades en el edificio. \n ...',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/6\/thumb_d-1256-230420025007-276862.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/6\/d-1256-230420025007-276862.jpg',
						id: 'id_021489347327146002'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/6\/thumb_d-1256-230420025008-733022.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/6\/d-1256-230420025008-733022.jpg',
						id: 'id_05412790254422468'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/6\/thumb_d-1256-230420025025-716112.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/6\/d-1256-230420025025-716112.jpg',
						id: 'id_044747052206623006'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/6\/thumb_d-1256-230420025109-427218.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/6\/d-1256-230420025109-427218.jpeg',
						id: 'id_07821334120444765'
					}
				]
			},
			{
				id: 1255,
				name: 'EDIFICIO ROCA TRUST II',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: 1,
				rooms: '3',
				address: 'Sarmiento ',
				address_number: '3297',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/5\/5\/main_8660.jpg',
				description:
					'Edificio Roca Trust II, en esquina de Roca y Sarmiento, ubicado muy cerca del Centro Comercial G\u00fcemes y de calle Olavarr\u00eda. \nSemi-pisos de 3 ambientes con balcones a la calle.\nCocheras en PB.\nHall de ingreso. Quincho y terraza com\u00fan en el \u00faltimo piso.\n\nEntregado en 2016.\n',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/5\/thumb_d-1255-230420100019-943707.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/5\/d-1255-230420100019-943707.jpg',
						id: 'id_040556024900585297'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/5\/thumb_d-1255-230420100024-349668.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/5\/d-1255-230420100024-349668.jpg',
						id: 'id_011976523310661791'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/5\/thumb_d-1255-230420051905-100309.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/5\/d-1255-230420051905-100309.jpeg',
						id: 'id_029830554126494213'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/5\/thumb_d-1255-230420051904-513327.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/5\/d-1255-230420051904-513327.jpeg',
						id: 'id_06929874066532616'
					}
				]
			},
			{
				id: 1254,
				name: 'EDIFICIO AVELLANEDA 1686',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: 1,
				rooms: '4',
				address: 'Avellaneda ',
				address_number: '1686',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/5\/4\/main_9853.jpg',
				description:
					'Edificio ubicado en Avellaneda y Las Heras, excelente ubicaci\u00f3n de Zona G\u00fcemes, a pocas cuadras del Paseo Aldrey y del Centro Comercial G\u00fcemes.\nSemi-pisos de 2 amnbientes y Pisos de 4 ambientes. \nHall de ingreso y quincho com\u00fan. \nCocheras en PB. \n\nEntregado en 2016.',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/4\/thumb_d-1254-230420094809-649766.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/4\/d-1254-230420094809-649766.jpg',
						id: 'id_0023104312322085097'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/4\/thumb_d-1254-230420094810-475785.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/4\/d-1254-230420094810-475785.jpg',
						id: 'id_08739546580926632'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/5\/4\/thumb_d-1254-230420094811-589394.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/5\/4\/d-1254-230420094811-589394.jpeg',
						id: 'id_08271332269083989'
					}
				]
			},
			{
				id: 1249,
				name: 'BOULEVARD CENTER',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: 5,
				rooms: '3',
				address: 'Diagonal Pueyrred\u00f3n',
				address_number: '3200',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/4\/9\/main_5406.jpg',
				description:
					'Edificio Boulevard Center de Gran Categor\u00eda, sobre calle Diagonal Pueyrred\u00f3n y Av. Independencia. \nIngreso con Seguridad, Quincho Com\u00fan, dos ascensores. \nLocales en PB y tres unidades de Departamento por piso.\nDepartamentos de 2 y de 3 ambientes con balcones y amplias visuales. \nDetalles de Termi...',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/4\/9\/thumb_d-1249-220420091416-391372.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/4\/9\/d-1249-220420091416-391372.jpg',
						id: 'id_09355341417279912'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/4\/9\/thumb_d-1249-220420091417-777039.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/4\/9\/d-1249-220420091417-777039.jpg',
						id: 'id_017085564069559012'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/4\/9\/thumb_d-1249-220420091419-957700.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/4\/9\/d-1249-220420091419-957700.jpg',
						id: 'id_06317056889912394'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/4\/9\/thumb_d-1249-230420052419-305590.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/4\/9\/d-1249-230420052419-305590.JPG',
						id: 'id_020593996716115304'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/4\/9\/thumb_d-1249-230420052418-500082.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/4\/9\/d-1249-230420052418-500082.JPG',
						id: 'id_08295929749964615'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/4\/9\/thumb_d-1249-230420052421-546839.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/4\/9\/d-1249-230420052421-546839.JPG',
						id: 'id_047000409960767087'
					}
				]
			},
			{
				id: 1208,
				name: 'Edificio Terminal G\u00fcemes Trust',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: 1,
				rooms: '2',
				address: 'Castelli',
				address_number: '1575',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/0\/8\/main_5384.jpg',
				description:
					'Edificio Terminal G\u00fcemes Trust, a pasos del Paseo Aldrey y del Centro Comercial G\u00fcemes. \nSemi-pisos de 2 1\/2 y 3 ambientes.\nHall de acceso, quincho y terraza com\u00fan.\nCocheras en PB. \n\nEntregado en 2015.',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/8\/thumb_d-1208-220420065047-901282.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/8\/d-1208-220420065047-901282.jpg',
						id: 'id_011856930246235997'
					}
				]
			},
			{
				id: 1207,
				name: 'EDIFICIO RIVAS TRUST',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: 3,
				rooms: '3',
				address: 'Rivas ',
				address_number: '2462',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/0\/7\/main_6941.jpg',
				description:
					'Edificio Rivas Trust, en excelente ubicaci\u00f3n en Playa Varese con vistas al Mar y a Torre Tanque\/Stella Maris.\nSemi-pisos de 2 y 3 ambientes con vista lateral al mar. \nCocheras en PB y en Subsuelo por rampa. \nHall de ingreso, un ascensor. \n\nEntregado en 2014.',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/7\/thumb_d-1207-220420044126-257523.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/7\/d-1207-220420044126-257523.JPG',
						id: 'id_06501722123329896'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/7\/thumb_d-1207-220420044129-969024.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/7\/d-1207-220420044129-969024.JPG',
						id: 'id_07068921941524029'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/7\/thumb_d-1207-220420044137-804301.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/7\/d-1207-220420044137-804301.jpeg',
						id: 'id_04868891908144424'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/7\/thumb_d-1207-220420044144-785670.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/7\/d-1207-220420044144-785670.jpeg',
						id: 'id_09586569153696729'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/7\/thumb_d-1207-220420044145-160515.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/7\/d-1207-220420044145-160515.jpeg',
						id: 'id_05471948067098866'
					}
				]
			},
			{
				id: 1206,
				name: 'EDIFICIO EIRE',
				slogan: 'Alberti 3373',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: 3,
				rooms: '2-3',
				address: 'Alberti ',
				address_number: '3373',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/0\/6\/main_6300.jpg',
				description:
					'Edificio Eire, ubicado en Barrio San Jos\u00e9, en excelente entorno y barrio residencial. \nSemi-pisos de 2 y 3 ambientes, dando al frente y al contrafrente, con vistas abiertas y mucha luz interior. \nCocheras en PB y Subsuelo con rampa. Bauleras. \nHall de ingreso y terraza com\u00fan. \n\nEntregado en 2018.',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/6\/thumb_d-1206-220420042944-783788.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/6\/d-1206-220420042944-783788.JPG',
						id: 'id_07505600836867774'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/6\/thumb_d-1206-220420042952-578007.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/6\/d-1206-220420042952-578007.JPG',
						id: 'id_00864451400593298'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/6\/thumb_d-1206-220420042953-960949.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/6\/d-1206-220420042953-960949.JPG',
						id: 'id_006877509395809733'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/6\/thumb_d-1206-220420042959-431393.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/6\/d-1206-220420042959-431393.jpeg',
						id: 'id_00255337704691585'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/6\/thumb_d-1206-220420043003-460613.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/6\/d-1206-220420043003-460613.jpeg',
						id: 'id_028491293816242136'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/6\/thumb_d-1206-220420043011-107097.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/6\/d-1206-220420043011-107097.jpeg',
						id: 'id_07229736496514474'
					}
				]
			},
			{
				id: 1203,
				name: 'Downtown Center',
				slogan: '',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: 9,
				rooms: '1-2',
				address: 'San Mart\u00edn',
				address_number: '3060',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/0\/3\/main_8080.jpg',
				description:
					'Edificio Downtown Center ubicado en Zona Centro de la ciudad. \nDepartamentos de 1 y 2 ambientes distribuidos en 9 pisos, con vistas abiertas y diferentes orientaciones. \nCocheras en PB y Subsuelo por rampa. \nAcceso con rejas y Hall de entrada apartado de la calle. \n\nEntregado en 2015.',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/3\/thumb_d-1203-220420041139-510091.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/3\/d-1203-220420041139-510091.jpg',
						id: 'id_05167080257440619'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/3\/thumb_d-1203-220420041140-229343.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/3\/d-1203-220420041140-229343.jpg',
						id: 'id_09429741998233026'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/3\/thumb_d-1203-220420041149-649501.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/3\/d-1203-220420041149-649501.jpg',
						id: 'id_0254455677827619'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/3\/thumb_d-1203-220420041150-289538.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/3\/d-1203-220420041150-289538.jpg',
						id: 'id_08203623198246346'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/3\/thumb_d-1203-220420041148-865140.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/3\/d-1203-220420041148-865140.jpg',
						id: 'id_09689711831332877'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/3\/thumb_d-1203-220420041159-635114.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/3\/d-1203-220420041159-635114.jpg',
						id: 'id_06583354073466461'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/3\/thumb_d-1203-220420041204-453313.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/3\/d-1203-220420041204-453313.JPG',
						id: 'id_00034868043325160247'
					}
				]
			},
			{
				id: 1202,
				name: 'Edificio Torre Unzu\u00e9',
				slogan: 'Frente al mar',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: null,
				rooms: '',
				address: 'Felix U. Camet ',
				address_number: '21',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/0\/2\/main_4320.jpg',
				description:
					'Edificio Torre Unzu\u00e9, primera l\u00ednea frente al mar.\nDepartamentos de 2 y 3 ambientes de distintos metrajes y vistas. Unidades con excelente vista al mar y a la ciudad. \nCocheras en PB y Subsuelo por rampa. \nHall de acceso, dos ascensores, espacio de Quincho\/Sum, Pileta Climatizada y Terraza com\u00fan ...',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/2\/thumb_d-1202-220420014958-792825.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/2\/d-1202-220420014958-792825.jpeg',
						id: 'id_07670483706768736'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/2\/thumb_d-1202-220420014952-698169.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/2\/d-1202-220420014952-698169.jpeg',
						id: 'id_07919882417824828'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/2\/thumb_d-1202-220420014953-942854.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/2\/d-1202-220420014953-942854.jpeg',
						id: 'id_058551580972323'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/2\/thumb_d-1202-220420015003-321377.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/2\/d-1202-220420015003-321377.jpeg',
						id: 'id_09833820634032848'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/2\/thumb_d-1202-220420014951-662484.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/2\/d-1202-220420014951-662484.jpeg',
						id: 'id_03498618862541534'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/2\/thumb_d-1202-220420014955-970228.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/2\/d-1202-220420014955-970228.jpeg',
						id: 'id_006243141639732719'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/2\/thumb_d-1202-220420014957-580683.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/2\/d-1202-220420014957-580683.jpeg',
						id: 'id_02542610408581394'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/2\/thumb_d-1202-220420014954-640292.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/2\/d-1202-220420014954-640292.jpeg',
						id: 'id_023203010134998525'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/2\/thumb_d-1202-220420015004-616997.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/2\/d-1202-220420015004-616997.jpeg',
						id: 'id_0182139197745548'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/2\/thumb_d-1202-220420014956-449012.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/2\/d-1202-220420014956-449012.jpeg',
						id: 'id_06332602164977887'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/2\/thumb_d-1202-220420015000-448208.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/2\/d-1202-220420015000-448208.jpeg',
						id: 'id_02533700225783815'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/2\/thumb_d-1202-220420014959-530394.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/2\/d-1202-220420014959-530394.jpeg',
						id: 'id_048545093765914316'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/2\/thumb_d-1202-220420015002-699574.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/2\/d-1202-220420015002-699574.jpeg',
						id: 'id_07596199507465047'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/0\/2\/thumb_d-1202-220420015001-676853.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/0\/2\/d-1202-220420015001-676853.jpeg',
						id: 'id_06805200651401704'
					}
				]
			},
			{
				id: 1195,
				name: 'Edificio Strobel Trust',
				slogan: 'Frente al Mar',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: null,
				rooms: '',
				address: 'Felix U. Camet ',
				address_number: '200',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/9\/5\/main_7443.jpg',
				description:
					'Edificio Strobel Trust frente al mar, en la zona Norte de la ciudad. \nExcelentes vistas panor\u00e1micas. \nEspacios comunes con Hall de Acceso, Parrilla descubierta en Terraza.\nDepartamentos de 2, 3 y 4 ambientes.\nCocheras en PB y en Subsuelo.  \nDetalles de Gran Categor\u00eda.\n\nEntregado en 2019.\n',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/5\/thumb_d-1195-220420013528-854193.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/5\/d-1195-220420013528-854193.jpg',
						id: 'id_05727600731409621'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/5\/thumb_d-1195-220420013530-274659.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/5\/d-1195-220420013530-274659.jpg',
						id: 'id_02757432992050768'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/5\/thumb_d-1195-220420013556-547848.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/5\/d-1195-220420013556-547848.jpg',
						id: 'id_033107449780583953'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/5\/thumb_d-1195-220420013559-727321.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/5\/d-1195-220420013559-727321.jpg',
						id: 'id_0645276836525499'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/5\/thumb_d-1195-220420013557-768409.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/5\/d-1195-220420013557-768409.jpg',
						id: 'id_06075181264744067'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/5\/thumb_d-1195-220420013558-419024.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/5\/d-1195-220420013558-419024.jpg',
						id: 'id_06187110696143079'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/5\/thumb_d-1195-220420013803-608880.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/5\/d-1195-220420013803-608880.jpg',
						id: 'id_04498557986609717'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/5\/thumb_d-1195-220420013813-991054.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/5\/d-1195-220420013813-991054.jpg',
						id: 'id_06166500151307397'
					}
				]
			},
			{
				id: 1194,
				name: 'Edificio Villa Luj\u00e1n',
				slogan: 'Playa Chica',
				stage: 'Terminada',
				possession: 'Inmediata',
				type: 'Edificio',
				units: 7,
				rooms: '2-3-4',
				address: 'Arist\u00f3bulo del Valle ',
				address_number: '2574',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/9\/4\/main_6499.jpg',
				description:
					'Edificio Villa Luj\u00e1n en excelente ubicaci\u00f3n de Playa Chica\/Varese.\nAl frente en el chalet funcionan los amenities: Sala de lectura, quincho, gimnasio, sala de juegos y piscina climatizada exterior con deck.\nComo factor diferenciador se destaca la Puesta en Valor del Chalet de car\u00e1cter Patrimonial...',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/4\/thumb_d-1194-220420102607-444661.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/4\/d-1194-220420102607-444661.jpg',
						id: 'id_08318958339342373'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/4\/thumb_d-1194-220420102557-624809.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/4\/d-1194-220420102557-624809.jpeg',
						id: 'id_0030691351845515857'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/4\/thumb_d-1194-220420102601-981324.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/4\/d-1194-220420102601-981324.jpeg',
						id: 'id_028743211425078763'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/4\/thumb_d-1194-220420102559-692248.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/4\/d-1194-220420102559-692248.jpeg',
						id: 'id_09560625037081198'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/4\/thumb_d-1194-220420102603-402777.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/4\/d-1194-220420102603-402777.jpeg',
						id: 'id_07320721857341079'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/4\/thumb_d-1194-220420102609-867768.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/4\/d-1194-220420102609-867768.jpeg',
						id: 'id_07293052479910698'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/4\/thumb_d-1194-220420102608-831940.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/4\/d-1194-220420102608-831940.jpeg',
						id: 'id_05929308636422905'
					}
				]
			},
			{
				id: 1193,
				name: 'RESIDENCIAS SAN LORENZO',
				slogan: 'Zona G\u00fcemes',
				stage: 'En Construcci\u00f3n',
				possession: 'Noviembre 2021',
				type: 'Edificio',
				units: 1,
				rooms: '',
				address: 'San Lorenzo ',
				address_number: '1550',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/9\/3\/main_1653.jpg',
				description:
					'- RESINDECIAS SAN LORENZO -\n\nSe ubica en el barrio Guemes sobre calle San Lorenzo al 1550 - Mar del Plata.\n\nTrata de un Edificio de Viviendas sobre un terreno de 37 metros lineales de frente con grandes aventanamientos a los jardines de Guemes. El complejo en su totalidad cuenta con 55 metros por ca...',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/3\/thumb_d-1193-210420014534-393160.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/3\/d-1193-210420014534-393160.JPG',
						id: 'id_0002925588201068585'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/3\/thumb_d-1193-210420014535-684945.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/3\/d-1193-210420014535-684945.jpeg',
						id: 'id_026342162897984833'
					}
				]
			},
			{
				id: 1192,
				name: 'Casas llave en mano - Casonas del Haras ',
				slogan: 'Casonas del Haras ',
				stage: 'En Construcci\u00f3n',
				possession: 'A\u00f1o 2022',
				type: 'Barrio Privado \/ Country',
				units: 1,
				rooms: '3',
				address: 'Av. Jorge Newbery ',
				address_number: '3050',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/9\/2\/main_6795.jpg',
				description:
					'Casonas del Haras es un Barrio Privado desarrollado sobre 6.5 hect\u00e1reas de campo dentro del Haras Santa Mar\u00eda del Mar.\nLas casas ser\u00e1n de 160 m2 hasta 300 m2, en lotes de 900 m2 hasta 1.700 m2.\nSe encuentra ubicado en la zona consolidada de barrios privados hacia las Playas del Sur de la ciudad d...',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/2\/thumb_d-1192-210420010815-392728.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/2\/d-1192-210420010815-392728.JPG',
						id: 'id_09564068322980348'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/2\/thumb_d-1192-210420010818-816205.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/2\/d-1192-210420010818-816205.JPG',
						id: 'id_012238346793517718'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/2\/thumb_d-1192-210420010817-709343.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/2\/d-1192-210420010817-709343.JPG',
						id: 'id_06011707123356498'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/2\/thumb_d-1192-210420010820-981536.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/2\/d-1192-210420010820-981536.JPG',
						id: 'id_03402188800573771'
					}
				]
			},
			{
				id: 1134,
				name: 'RESIDENCIAS OLAVARR\u00cdA',
				slogan: '',
				stage: 'En Pozo',
				possession: 'A\u00f1o 2023',
				type: 'Edificio',
				units: 7,
				rooms: '2-3-4',
				address: 'Olavarr\u00eda ',
				address_number: '2845',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/3\/4\/main_8724.jpg',
				description:
					'Emprendimiento en excelente ubicaci\u00f3n de Zona G\u00fcemes, sobre terreno de 20 metros de frente por 52 metros de fondo. Entorno verde. Basamento comercial y unidades de 2 y 3 ambientes, con posibilidad de unificaci\u00f3n para lograr unidades de mayor dimensi\u00f3n.\nDetalles de terminaci\u00f3n de primera calidad...',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/3\/4\/thumb_d-1134-210220112445-673394.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/3\/4\/d-1134-210220112445-673394.jpeg',
						id: 'id_07868248646313747'
					}
				]
			},
			{
				id: 1132,
				name: 'TORRE ALSINA - RESIDENCIAS SAN LORENZO',
				slogan: '',
				stage: 'En Construcci\u00f3n',
				possession: 'Octubre 2021',
				type: 'Edificio',
				units: 2,
				rooms: '4',
				address: 'Alsina esq. San Lorenzo',
				address_number: '',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/3\/2\/main_7402.jpg',
				description:
					'TORRE ALSINA - RESINDECIAS SAN LORENZO -\n\nSe ubica en el barrio Guemes sobre calle Alsina esq. San Lorenzo - Mar del Plata.\n\nTrata de un Edificio de Viviendas sobre un terreno de 25 metros lineales de frente por Alsina y 55 metros por San Lorenzo, con grandes aventanamientos a los jardines de Guemes...',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/3\/2\/thumb_d-1132-200220041533-779135.jpeg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/3\/2\/d-1132-200220041533-779135.jpeg',
						id: 'id_0004894874152232553'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/3\/2\/thumb_d-1132-200220041543-409550.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/3\/2\/d-1132-200220041543-409550.JPG',
						id: 'id_0850682166803598'
					}
				]
			},
			{
				id: 691,
				name: 'Apartamentos Casonas del Haras',
				slogan: 'Casonas del Haras',
				stage: 'En Pozo',
				possession: 'A\u00f1o 2022',
				type: 'Barrio Privado \/ Country',
				units: 2,
				rooms: '1-2',
				address: 'Av. Jorge Newbery',
				address_number: '3050',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/9\/1\/main_2565.jpg',
				description:
					'Casonas del Haras trata de un Barrio Privado de Casonas con Apartamentos en construcci\u00f3n sobre 6 hect\u00e1reas de campo, con un Gran Entorno conformado por el Haras Santa Mar\u00eda del Mar, el Golf Acantilados, campos linderos con posibilidad de expansi\u00f3n de este Emprendimiento y las Playas del Sur.\n\nEl...',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/1\/thumb_d-691-220420120916-507138.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/1\/d-691-220420120916-507138.JPG',
						id: 'id_06282919136822087'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/1\/thumb_d-691-220420120917-516650.JPG',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/1\/d-691-220420120917-516650.JPG',
						id: 'id_0015518652478391237'
					}
				]
			},
			{
				id: 690,
				name: 'Barrio Privado Casonas del Haras',
				slogan: 'Casonas del Haras',
				stage: 'En Pozo',
				possession: 'Marzo 2021',
				type: 'Barrio Privado \/ Country',
				units: 3,
				rooms: '',
				address: 'Av. Jorge Newbery ',
				address_number: '3050',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/9\/0\/main_9768.jpg',
				description:
					'Trata de un Barrio Privado conformado por 371 Lotes destinados a viviendas que van de los 600 a los 1.000 m2 desarrollados en 54 hect\u00e1reas de campo a 700 metros del Mar. \n\nSe encuentra ubicado en la zona consolidada de barrios privados hacia las Playas del Sur de la ciudad de Mar del Plata con un e...',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/0\/thumb_d-690-190618094502-620029.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/0\/d-690-190618094502-620029.jpg',
						id: 'id_0811775849054359'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/0\/thumb_d-690-220420121145-934215.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/0\/d-690-220420121145-934215.jpg',
						id: 'id_06419682057432046'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/0\/thumb_d-690-220420121148-721255.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/0\/d-690-220420121148-721255.jpg',
						id: 'id_0659678743593934'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/0\/thumb_d-690-220420121147-604672.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/0\/d-690-220420121147-604672.jpg',
						id: 'id_0005318886549743995'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/0\/thumb_d-690-220420121303-696546.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/0\/d-690-220420121303-696546.jpg',
						id: 'id_06210428125436478'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/',
						id: 'id_029196117080794903'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/9\/0\/thumb_d-690-230420055616-936832.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/9\/0\/d-690-230420055616-936832.jpg',
						id: 'id_033398088284207206'
					}
				]
			},
			{
				id: 648,
				name: 'Residencias Roque Su\u00e1rez',
				slogan: '(T\u00edo Curzio)',
				stage: 'En Construcci\u00f3n',
				possession: 'Diciembre 2020',
				type: 'Edificio',
				units: 4,
				rooms: '1-2-3-4',
				address: 'Av. Col\u00f3n',
				address_number: '860',
				main_image: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/1920x1080\/4\/8\/main_9828.jpg',
				description:
					'Edificio Residencial frente al Mar de Playa Varese.\n\u2022 La constructora llave en mano es Coarsa SA (una de las principales de la ciudad) http:\/\/www.coarsaobras.com.ar\n\t\u2022 Espatolero y Lorenzo cuenta con 27 Edificios desarrollados en Mar del Plata (20 Entregados) www.espatoleroylorenzo.com\n\t\u2022 Los ...',
				images: [
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/4\/8\/thumb_d-648-160518123555-581336.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/4\/8\/d-648-160518123555-581336.jpg',
						id: 'id_039022268499296664'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/4\/8\/thumb_d-648-160518123649-214699.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/4\/8\/d-648-160518123649-214699.jpg',
						id: 'id_05655067624734218'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/4\/8\/thumb_d-648-160518124247-626380.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/4\/8\/d-648-160518124247-626380.jpg',
						id: 'id_001119714271688843'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/4\/8\/thumb_d-648-230420055915-578703.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/4\/8\/d-648-230420055915-578703.jpg',
						id: 'id_07055139248615732'
					},
					{
						small: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w100\/4\/8\/thumb_d-648-230420055939-798976.jpg',
						big: 'https:\/\/cdn-thumbnailer-developments.inmokey.com\/d\/w1920\/4\/8\/d-648-230420055939-798976.jpg',
						id: 'id_07711989649633164'
					}
				]
			}
		]
			.slice(0, 8)
			.map(item => {
				item.images[0].big = images[c]
				c = c < images.length - 1 ? c + 1 : 0
				return item
			})
	},
	mounted() {
		$(this.$el)
			.carousel()
			.on('slide.bs.carousel', e => {
				gsap.from(e.relatedTarget.querySelector('.carousel-item-title'), {
					opacity: 0,
					x: 200,
					duration: 0.7,
					delay: 0.5
				})
			})
	}
}
</script>
