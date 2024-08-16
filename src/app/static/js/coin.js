document.addEventListener("DOMContentLoaded", function () {
	const coin = document.querySelector(".coins");

	const keyframes = [
		{ transform: "rotateY(0deg)" },
		{ transform: "rotateY(180deg)" },
		{ transform: "rotateY(360deg)" }
	];
	const options = {
		duration: 2000, // Duration of one complete flip
		iterations: Infinity, // Continuous flipping
		easing: "linear"
	};

	// Start the animation
	if (coin) {
		coin.animate(keyframes, options);
	}
});