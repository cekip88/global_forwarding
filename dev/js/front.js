import G_G from "./libs/G_G.js";
import { G_Bus } from "./libs/G_Control.js";

class Front extends G_G{
  constructor(){
    super();
    const _ = this;
    // G_Bus
  }
  define(){
    const _ = this;
    _.componentName = 'front';
    G_Bus.on(_,[
        'mainSliderPrev',
        'mainSliderNext',
        'mainSliderDotClick',
    ]);
  }
	mainSliderPrev({item,event}){
		const _ = this;
		let slider = item.nextElementSibling;
		let slide = slider.querySelector('.main-slide');
		let offset = slider.getAttribute('data-offset') ?? 0;
		let dots = item.parentElement.lastElementChild;

		let newOffset = offset * 1 - 1;
		if (newOffset < 0) return;
		slider.setAttribute('data-offset',newOffset.toString());
		slide.style = `margin-left:-${newOffset * 1 * 100}%`;

		let dot = dots.children[newOffset];
		dots.querySelector('.active').classList.remove('active');
		dot.classList.add('active');
	}
	mainSliderNext({item,event}){
		const _ = this;
		let slider = item.previousElementSibling;
		let slide = slider.querySelector('.main-slide');
		let offset = slider.getAttribute('data-offset') ?? 0;
		let dots = item.parentElement.lastElementChild;

		let newOffset = offset * 1 + 1;
		if (newOffset + 1 > slider.children.length) return;
		slider.setAttribute('data-offset',newOffset.toString());
		slide.style = `margin-left:-${newOffset * 1 * 100}%`;

		let dot = dots.children[newOffset];
		dots.querySelector('.active').classList.remove('active');
		dot.classList.add('active');
	}
	mainSliderDotClick({item,event}){
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

		slider.setAttribute('data-offset',offset.toString());
		slide.style = `margin-left:-${offset * 1 * 100}%`;
	}
}

new Front();