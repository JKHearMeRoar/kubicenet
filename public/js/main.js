function animateNumber(targetNumber, duration) {
	const startingNumber = 0;
	const startTime = performance.now();
	const numberElement = document.getElementById(targetNumber);
	const numberElementValue = parseInt(numberElement.textContent, 10);

	function updateNumber(currentTime) {
		const elapsedTime = currentTime - startTime;
		if (elapsedTime >= duration) {
			// Animation finished
			numberElement.textContent = numberElementValue;
			return;
		}

		const progress = elapsedTime / duration;
		const logarithmicProgress = 1 - Math.pow(1 - progress, 4); // Adjust the power (4) for desired effect
		const currentNumber = Math.round(startingNumber + (numberElementValue - startingNumber) * logarithmicProgress);

		numberElement.textContent = currentNumber;

		// Request the next animation frame
		requestAnimationFrame(updateNumber);
	}

	// Start the animation
	requestAnimationFrame(updateNumber);
}


// Usage
animateNumber("age", 3000);
// animateNumber("git", 3000);

/*

$(function () {

	$("a[href^='#']").on("click", function (e) {
		e.preventDefault();
		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top
		}, 1000);
	});

	var scroll = window.location.hash;

	if ($(window.location.hash).length > 0) {
		$("html, body").animate({
			scrollTop: $(window.location.hash).offset().top
		}, 1000);
	}

});
*/