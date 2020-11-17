import $ from 'jquery'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import '../styles/index.scss'

import '../../node_modules/bootstrap/js/src/util'
import '../../node_modules/bootstrap/js/src/carousel'
import '../../node_modules/bootstrap/js/src/collapse'
import Vue from 'vue'
import VueRouter from 'vue-router'

import Filter from './filter'
import Search from './search'
import Carousel from './carousel'
import enquire from 'enquire.js'

gsap.registerPlugin(ScrollTrigger)
gsap.config({
	nullTargetWarn: false
})

Vue.use(VueRouter)

const instances = [
	{ el: '#filter', render: h => h(Filter) },
	{ el: '#search', render: h => h(Search), router: new VueRouter({ mode: 'history', base: '/dnx/' }) },
	{ el: '#slide-header', render: h => h(Carousel) }
]

instances.map(config => {
	if (document.querySelector(config.el)) {
		new Vue(config)
	}
})

$(window).on('load', function() {
	'use strict'
	let offcanvas_collapse = document.querySelector('.offcanvas-collapse')
	let navbar_wrap_animation = gsap.fromTo(
		'#home-navbar .navbar-wrap',
		{ opacity: 0, y: -200 },
		{ opacity: 1, y: 0, duration: 0.7, delay: 0.5, paused: true }
	)
	let offcanvas_collapse_animation, nav_item_animation

	navbar_wrap_animation.play()

	enquire
		.register('screen and (max-width: 992px)', () => {
			offcanvas_collapse_animation = gsap.fromTo(
				offcanvas_collapse,
				{ opacity: 0, x: document.body.offsetWidth },
				{
					opacity: 1,
					duration: 0.5,
					ease: 'circ',
					x: -16,
					paused: true
				}
			)

			nav_item_animation = gsap.fromTo(
				offcanvas_collapse.querySelectorAll('.nav-item'),
				{ opacity: 0, x: document.body.offsetWidth },
				{
					opacity: 1,
					duration: 0.7,
					stagger: 0.1,
					ease: 'circ',
					x: 0
				}
			)

			offcanvas_collapse_animation.reverse()
			nav_item_animation.reverse()

			$('[data-toggle="offcanvas"]').on('click.menu', e => {
				$(e.currentTarget).toggleClass('is-active')
				if (offcanvas_collapse_animation.reversed()) {
					offcanvas_collapse_animation.play()
					nav_item_animation.play()
				} else {
					nav_item_animation.reverse()
					offcanvas_collapse_animation.reverse()
				}
			})
		})
		.register('screen and (min-width: 993px)', function() {
			gsap.to([offcanvas_collapse, offcanvas_collapse.querySelectorAll('.nav-item')], { opacity: 1, x: 0, clearProps: 'all' })
			$('[data-toggle="offcanvas"]')
				.off('click.menu')
				.removeClass('is-active')
		})

	var $tilt = $('.tilt')

	gsap.set($tilt, { transformStyle: 'preserve-3d' })

	$tilt.on('mousemove', e => {
		var sxPos = (e.offsetX / e.target.offsetWidth) * 100
		var syPos = (e.offsetY / e.target.offsetHeight) * 100
		gsap.to(e.currentTarget.children[0], 0.5, {
            rotationY: 0.15 * sxPos, rotationX: 0.10 * syPos, rotationZ: 0.10,
			transformPerspective: 500,
			transformOrigin: 'center center'
		})
	})

	gsap.to(document.body, {
		opacity: 1,
		duration: 0.7
	})

	gsap.from('.icon-bar a', {
		scrollTrigger: {
			trigger: '.icon-bar',
			start: 'top center',
			end: 'top 40%',
			scrub: 1
		},
		opacity: 0,
		stagger: 0.8,
		ease: 'circ',
		x: 100
	})

	gsap.from('.icon-bar a', {
		scrollTrigger: {
			trigger: '.icon-bar',
			start: 'top center',
			end: '=1800px center',
			pin: true
		}
	})

	gsap.from('.props .item', {
		scrollTrigger: {
			trigger: '.props .item'
		},
		y: 300,
		stagger: 0.1,
		ease: 'back',
		duration: 1.2
	})

	gsap.from('.devs .item', {
		scrollTrigger: {
			trigger: '.devs .item'
		},
		opacity: 0,
		stagger: 0.1,
		ease: 'circ',
		scale: 0.8,
		y: 200,
		duration: 1.2
	})

	gsap.from('.home-badge', {
		scrollTrigger: {
			trigger: '.home-badges',
			start: 'center 80%',
			markers: true,
			end: 'center 80%'
		},
		opacity: 0,
		scale: 0,
		duration: 0.5
	})

	gsap.from('.news .item', {
		scrollTrigger: {
			trigger: '.news',
			start: 'center bottom',
			end: 'top center'
		},
		opacity: 0,
		stagger: 0.4,
		x: 400,
		duration: 0.8
	})

	gsap.from('.whatsapp-fixed', {
		scrollTrigger: {
			trigger: '.whatsapp-fixed',
			start: 'top center',
			end: 'top 40%',
			scrub: 1
		},
		opacity: 0,
		stagger: 0.8,
		ease: 'circ',
		x: -100
	})

	gsap.from('.whatsapp-fixed', {
		scrollTrigger: {
			trigger: '.whatsapp-fixed',
			start: 'top 89%',
			end: '=2750 bottom',
			pinSpacing: false,
			pin: true
		}
	})

	$('hr').on('click', () => {
		$([document.documentElement, document.body]).animate({ scrollTop: 0 })
	})
})
