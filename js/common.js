// Меню бургер

const iconMenu = document.querySelector(".menu__icon");
const menuList = document.querySelector(".menu__list");
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle("_lock");
		iconMenu.classList.toggle("_active");
		menuList.classList.toggle("_active");
	});
}

// Прокрутка при клике

const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
if (menuLinks.length > 0) {
	menuLinks.forEach((menuLink) => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector(".header__content").offsetHeight;

			if (iconMenu.classList.contains("_active")) {
				document.body.classList.remove("_lock");
				iconMenu.classList.remove("_active");
				menuList.classList.remove("_active");
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth",
			});
			e.preventDefault();
		}
	}
}

// Кнопка вверх

function scrollUp(to, duration = 700) {
	const element = document.scrollingElement || document.documentElement,
		start = element.scrollTop,
		change = to - start,
		startDate = +new Date(),
		// t = current time
		// b = start value
		// c = change in value
		// d = duration
		easeInOutQuad = function (t, b, c, d) {
			t /= d / 2;
			if (t < 1) return (c / 2) * t * t + b;
			t--;
			return (-c / 2) * (t * (t - 2) - 1) + b;
		},
		animateScroll = function () {
			const currentDate = +new Date();
			const currentTime = currentDate - startDate;
			element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
			if (currentTime < duration) {
				requestAnimationFrame(animateScroll);
			} else {
				element.scrollTop = to;
			}
		};
	animateScroll();
}

document.addEventListener("DOMContentLoaded", function () {
	let btn = document.querySelector("#toTop");
	window.addEventListener("scroll", function () {
		// Если прокрутили дальше 1499px, показываем кнопку
		if (pageYOffset > 1500) {
			btn.classList.add("show");
			// Иначе прячем
		} else {
			btn.classList.remove("show");
		}
	});

	// При клике прокручиваем на самый верх
	btn.onclick = function (click) {
		click.preventDefault();
		scrollUp(0, 600);
	};
});

// Анимация при скролле

const animItems = document.querySelectorAll("._anim-items");

if (animItems.length > 0) {
	window.addEventListener("scroll", animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
				animItem.classList.add("_active");
			} else {
				if (!animItem.classList.contains("_anim-no-hide")) {
					animItem.classList.remove("_active");
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}

// Fancybox

$(".requestButton").click(function () {
	$.fancybox.open({
		src: "#requestForm",
		scrolling: "hidden",
	});
});

// Настройка формы

$("#form_input_i1 input").attr("placeholder", "Имя");
$("#form_input_i2 input").attr("placeholder", "Компания");
$("#form_input_i3 input").attr("placeholder", "Телефон");
$("#form_input_i4 input").attr("placeholder", "E-mail");
$("#form_input_i5 input").attr("placeholder", "Комментарий");
// $("textarea").attr("placeholder", "Комментарий");

$("#requestForm .former").prepend('<input type="hidden" name="form_id" value="' + $("#requestFormId").data("id") + '">');

$(".checkbox-field, .checkbox-field+.input.text").wrapAll("<div class='policy-checkbox'>");

$(".sendbutton").attr("value", "Купить");
$(".sendbutton").addClass("btn_bright");
