// Меню бургер

const iconMenu = document.querySelector('.menu__icon');
const menuList = document.querySelector('.menu__list');
if (iconMenu) {
	iconMenu.addEventListener("click", function(e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuList.classList.toggle('_active');
	});
}

// Прокрутка при клике

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header__content').offsetHeight;

				if(iconMenu.classList.contains('_active')) {
					document.body.classList.remove('_lock');
					iconMenu.classList.remove('_active');
					menuList.classList.remove('_active');
				}

				window.scrollTo({
					top: gotoBlockValue,
					behavior: "smooth"
				});
				e.preventDefault();
		}
	}
}

// Анимация при скролле

const animItems  = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll(){
		for (let index = 0; index < animItems.length; index++){
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			}else{
				if(!animItem.classList.contains('_anim-no-hide')) {
				animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}