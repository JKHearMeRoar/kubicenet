import PhotoSwipeLightbox from '/js/photoswipe-lightbox.esm.js';
const lightbox = new PhotoSwipeLightbox({
	gallery: '#my-gallery',
	children: 'a',
	pswpModule: () => import('/js/photoswipe.esm.js')
});
lightbox.init();