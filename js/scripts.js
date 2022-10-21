const switchTheme = (evt) => {
	const switchBtn = evt.target;
	if (switchBtn.textContent.toLowerCase() === "light") {
		switchBtn.textContent = "dark";
		// localStorage.setItem("theme", "dark");
		document.documentElement.setAttribute("data-theme", "dark");
		cambiarIconsmenu("dark")

	} else {
		switchBtn.textContent = "light";
		// localStorage.setItem("theme", "light"); //add this
		document.documentElement.setAttribute("data-theme", "light");
		cambiarIconsmenu("light")
	}
};

const switchModeBtn = document.querySelector(".switch-btn");
switchModeBtn.addEventListener("click", switchTheme, false);

let currentTheme = "dark";
// currentTheme = localStorage.getItem("theme")
// 	? localStorage.getItem("theme")
// 	: null;

if (currentTheme) {
	document.documentElement.setAttribute("data-theme", currentTheme);
	switchModeBtn.textContent = currentTheme;
}


function aoutsidebarMenu() {
	$(".arrow").css("display", "none")
	$(".sidebarMenu").animate({ width: '5.3vw' }, 400)
	$(".icon").css("display", "flex")
	$(".close-menu").css("display", "flex")
}

function closeSidebarMenu() {
	$(".arrow").css("display", "flex")
	$(".sidebarMenu").animate({ width: '2.3vw' }, 400)
	$(".icon").css("display", "none")
	$(".close-menu").css("display", "none")
}

function screen_change(id) {
	$(".icon").removeClass("select-icon")
	$(".icon-" + id).addClass("select-icon")
}

function cambiarIconsmenu(theme) {
	if (theme == "light") {
		$(".icon-home").attr("src", "./img/sidebar-menu/home-2.png")
		$(".icon-book").attr("src", "./img/sidebar-menu/book-2.png")
		$(".icon-stack").attr("src", "./img/sidebar-menu/stack-2.png")
		$(".icon-idea").attr("src", "./img/sidebar-menu/idea-2.png")
		$(".icon-contact").attr("src", "./img/sidebar-menu/contact-2.png")
	} else {
		if (theme == "dark") {
			$(".icon-home").attr("src", "./img/sidebar-menu/home.png")
			$(".icon-book").attr("src", "./img/sidebar-menu/book.png")
			$(".icon-stack").attr("src", "./img/sidebar-menu/stack.png")
			$(".icon-idea").attr("src", "./img/sidebar-menu/idea.png")
			$(".icon-contact").attr("src", "./img/sidebar-menu/contact.png")
		}
	}

}