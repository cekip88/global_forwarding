import G_G from "./libs/G_G.js";
import {G_Bus} from "./libs/G_Control.js";

class Front extends G_G {
	constructor() {
		super();
		const _ = this;
		// G_Bus
	}

	define() {
		const _ = this;
		_.componentName = 'front';
		G_Bus.on(_, [
			'headBurgerClick',
			'showHeadSubmenu',
			'showHeadForm',
			'closeHeadForm',
			'mainSliderPrev',
			'mainSliderNext',
			'mainSliderDotClick',
		]);
	}

	headBurgerClick({item,event}) {
		const _ = this;
		event.preventDefault();

		let head = item.closest('.head');

		if (!item.classList.contains('active')) {
			head.classList.add('active');
			item.classList.add('active');
		} else {
			head.classList.remove('active');
			item.classList.remove('active');

			head.querySelectorAll('.showed').forEach(active => {
				_.closeHeadSubmenu({item:active.previousElementSibling})
			})
		}
	}

	showHeadSubmenu({item,event}) {
		const _ = this;
		event.preventDefault();

		let list = item.nextElementSibling;

		if (!item.classList.contains('active')) {
			list.classList.add('active');
			item.classList.add('active');
			setTimeout(()=>{
				list.classList.add('showed')
			},350)
		} else {
			_.closeHeadSubmenu({item})
		}
	}
	closeHeadSubmenu({item}) {
		const _ = this;
		let list = item.nextElementSibling;

		list.classList.remove('showed');
		list.querySelectorAll('.showed').forEach(active=> {
			active.previousElementSibling.classList.remove('active');
			active.classList.remove('showed');
			setTimeout(()=>{
				active.classList.remove('active');
			})
		})
		setTimeout(()=>{
			list.classList.remove('active');
			item.classList.remove('active');
		})
	}

	showHeadForm({item,event}) {
		const _ = this;
		let
			selector = item.getAttribute('data-target'),
			elem = document.querySelector(selector);

		elem.classList.add('active');
	}
	closeHeadForm({item,event}) {
		const _ = this;
		item.closest('FORM').classList.remove('active')
	}

	mainSliderPrev({item, event}) {
		const _ = this;
		let slider = item.nextElementSibling;
		let slide = slider.querySelector('.main-slide');
		let offset = slider.getAttribute('data-offset') ?? 0;
		let dots = item.parentElement.lastElementChild;

		let newOffset = offset * 1 - 1;
		if (newOffset < 0) return;
		slider.setAttribute('data-offset', newOffset.toString());
		slide.style = `margin-left:-${newOffset * 1 * 100}%`;

		let dot = dots.children[newOffset];
		dots.querySelector('.active').classList.remove('active');
		dot.classList.add('active');
	}

	mainSliderNext({item, event}) {
		const _ = this;
		let slider = item.previousElementSibling;
		let slide = slider.querySelector('.main-slide');
		let offset = slider.getAttribute('data-offset') ?? 0;
		let dots = item.parentElement.lastElementChild;

		let newOffset = offset * 1 + 1;
		if (newOffset + 1 > slider.children.length) return;
		slider.setAttribute('data-offset', newOffset.toString());
		slide.style = `margin-left:-${newOffset * 1 * 100}%`;

		let dot = dots.children[newOffset];
		dots.querySelector('.active').classList.remove('active');
		dot.classList.add('active');
	}

	mainSliderDotClick({item, event}) {
		const _ = this;
		let dot = event.target;
		if (!dot.classList.contains('main-slider_dot')) return;

		let activeDot = item.querySelector('.active');
		if (activeDot === dot) return;

		activeDot.classList.remove('active');
		dot.classList.add('active');

		let offset = 0;
		for (let i = 0; i < item.children.length; i++) {
			let children = item.children[i];
			if (children === dot) {
				offset = i;
				break;
			}
		}

		let slider = item.parentElement.querySelector('.main-slider_inner');
		let slide = slider.querySelector('.main-slide');

		slider.setAttribute('data-offset', offset.toString());
		slide.style = `margin-left:-${offset * 1 * 100}%`;
	}
}

new Front();