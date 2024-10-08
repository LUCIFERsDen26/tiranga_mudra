(function() {
	'use strict';

	var tinyslider = function() {
		var el = document.querySelectorAll('.testimonial-slider');

		if (el.length > 0) {
			var slider = tns({
				container: '.testimonial-slider',
				items: 1,
				axis: "horizontal",
				controlsContainer: "#testimonial-nav",
				swipeAngle: false,
				speed: 700,
				nav: true,
				controls: true,
				autoplay: true,
				autoplayHoverPause: true,
				autoplayTimeout: 3500,
				autoplayButtonOutput: false
			});
		}
	};
	tinyslider();

	


	var sitePlusMinus = function() {

		var value,
    		quantity = document.getElementsByClassName('quantity-container');

		function createBindings(quantityContainer) {
	      var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
	      var increase = quantityContainer.getElementsByClassName('increase')[0];
	      var decrease = quantityContainer.getElementsByClassName('decrease')[0];
	      increase.addEventListener('click', function (e) { increaseValue(e, quantityAmount); });
	      decrease.addEventListener('click', function (e) { decreaseValue(e, quantityAmount); });
	    }

	    function init() {
	        for (var i = 0; i < quantity.length; i++ ) {
						createBindings(quantity[i]);
	        }
	    };

	    function increaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        console.log(quantityAmount, quantityAmount.value);

	        value = isNaN(value) ? 0 : value;
	        value++;
	        quantityAmount.value = value;
	    }

	    function decreaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        value = isNaN(value) ? 0 : value;
	        if (value > 0) value--;

	        quantityAmount.value = value;
	    }
	    
	    init();
		
	};
	sitePlusMinus();


})()

// popup start 
document.addEventListener('DOMContentLoaded', function () {

    const popupOverlay = document.querySelector("#popupOverlay");
	const submitedPopupOverlay = document.querySelector("#popupOverlay2");
    const popups = document.querySelector("#popup");
    const closePopup = document.querySelector("#closePopup");
	const submitedClosePopup = document.querySelector("#closePopup2");
    const emailInput = document.querySelector("#emailInput");
	const button = document.querySelector(".popup-btn");
	const formSubmit = document.querySelector("#form-submit");
	const mainbody = document.querySelector("body");
    // Function to open the popup
	button.addEventListener('click',openPopup);
    function openPopup() {
        popupOverlay.style.display = 'block';
		mainbody.classList.add("stopscroll");
    }
    // Function to close the popup
    function closePopupFunc() {
        popupOverlay.style.display = 'none';
		mainbody.classList.remove("stopscroll");
    }
	function submitedClosePopupFunc() {
		submitedPopupOverlay.style.display = 'none';
		mainbody.classList.remove("stopscroll");
    }
    // Function to submit the signup form
	formSubmit.addEventListener('click',submitForm);
    function submitForm() {
        
		// Add your form submission logic here
		//const emailInput = document.getElementById('emailInput');
		const firstName = document.getElementById('firstName');
		const phoneno = document.getElementById('phoneNo');
		const country = document.querySelector('input[name="country"]:checked')		
		const state = document.getElementById('state');		
		//const pinCode = document.getElementById('pinCode');
		const refCode = document.getElementById('refCode');
		const errorMessage = document.getElementById('erroMessage');
        console.log(country);


		// Basic input validation
		if (!firstName.value || !country || !phoneno.value) {//|| !state.value || !pinCode.value || !emailInput.value.toLowerCase()) {
			errorMessage.textContent = 'Please fill in all required fields';
			return;
		  }
		


		if (country.value === 'India') {
			if(state.value === '') {
			errorMessage.textContent = 'Please select a valid State';
			return;
		  }
		}
		
		
		//if (!validateEmail(emailInput.value.toLowerCase())){
		//	errorMessage.textContent = 'Please valid email';
		//	return;	
		//}
		if (!validatePhoneNumber(phoneno.value)){
			errorMessage.textContent = 'Please valid phone number';
			return;	
		}

		const data = {
			//email: emailInput.value.toLowerCase(),
			name: firstName.value.toLowerCase(),
			phone_no: phoneno.value,
			country: country.value,
			state: state.value,
			//pin_code: pinCode.value,
			reff_by: refCode.value,
		  };
		
		
		fetch('/submit', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
			
		  })
		  .then(response => response.json())
		  .then(responseData => {
			 
			if (responseData.err == "error"){
				errorMessage.textContent = responseData.message
			}
			else{
				
				let showref = document.getElementById('refCodeshow')
				showref.textContent =  "Your referral code: " + responseData.message;
				ref_link = ref_link+responseData.message
				// Handle successful submission (e.g., close popup, display success message)
				submitedPopupOverlay.style.display='block';
				
				closePopupFunc(); // Close the popup after form submission
				mainbody.classList.add("stopscroll");
				getCount()
			}
			 
		  })
		  
		//submitedPopupOverlay.style.display='block';
        //closePopupFunc(); // Close the popup after form submission
    }

	submitedClosePopup.addEventListener('click',submitedClosePopupFunc);
    // Event listeners
    // Close the popup when the close button is clicked
    closePopup.addEventListener('click', closePopupFunc);
    // Close the popup when clicking outside the popup content
    popupOverlay.addEventListener('click', function (event) {
        if (event.target === popupOverlay) {
            closePopupFunc();
        }
    });
    // You can customize and expand these functions based on your specific requirements.

	

});

// popup end 

// Countdown function start
// const countDate = new Date('August 15, 2024 00:00:00').getTime();

// const interval = setInterval(() =>{
// 	const now = new Date().getTime();
// 	const gap = countDate -  now;
// 	if(gap<0){
// 		clearInterval(interval);
// 		updateDuration(0);
// 		return;
// 	}
// 	updateDuration(gap);
// }, 1000);

// const updateDuration =()=>{
// 	const now = new Date().getTime();
// 	const gap = countDate - now;
// 	const sec = 1000;
// 	const min = sec * 60;
// 	const hour = min * 60;
// 	const day = hour * 24;
	
// 	let textDays = Math.floor(gap/day);
// 	let textHours = Math.floor((gap%day)/hour);
// 	let textMins = Math.floor((gap%hour)/min);
// 	let textSecs = Math.floor((gap%min)/sec);
// 	document.querySelector('.days').innerHTML = textDays;
// 	document.querySelector('.hours').innerHTML = textHours;
// 	document.querySelector('.minutes').innerHTML = textMins;
// 	document.querySelector('.seconds').innerHTML = textSecs;
	
//}
//updateDuration();

var ref_link = "https://www.2047tirangamudra.in/reference/"

function getCount() {
	fetch('/count')
	  .then(response => response.json())
	  .then(data => {
		const countValueElement = document.querySelector('.totalFlags');
		countValueElement.textContent = "Total flag donated- "+data.count_value;
	  })
	  .catch(error => {
		console.error('Error fetching count:', error);
		// Handle error, e.g., display an error message
	  });
  	}

	function validateEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	  }
	
	function validatePhoneNumber(phoneNumber) {
		// Basic phone number validation (adjust regex as needed)
		const phoneRegex = /^\d{10}$/; // Matches 10 digits
		return phoneRegex.test(phoneNumber);
	  }
//video auto play start

	var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Function to initialize the YouTube IFrame API
    function onYouTubeIframeAPIReady() {
        const player = new YT.Player('youtube-video', {
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    // Function that runs when the player is ready
    function onPlayerReady(event) {
        const iframe = document.getElementById('youtube-video');
        
        iframe.addEventListener('mouseenter', function() {
            event.target.setVolume(60); // Set volume to 60%
			event.target.setLoop(true);
            event.target.playVideo();    // Play the video
        });

        // iframe.addEventListener('mouseleave', function() {
        //     event.target.pauseVideo();   // Pause the video when the mouse leaves
        // });
    };

	//youtube video end

	//whatsapp share button
	document.getElementById('whatsapp-share').addEventListener('click', function() {
        
		var textToShare = document.getElementById('text-to-share').innerText;
        
        // Handle special characters and encode the text
        textToShare = encodeURIComponent(textToShare);

        // Create the WhatsApp share link
        var whatsappLink = 'https://wa.me/?text=' + textToShare +'%0A'+ ref_link;
		console.log(whatsappLink)
        // Redirect to the WhatsApp link
        window.location.href = whatsappLink;
		
    });

//flip coin 
// 	const coin = document.getElementById("coin");

// 	coin.addEventListener("click", function () {
// 	const keyframes = [
// 		{ transform: "rotateY(0deg)" },
// 		{ transform: "rotateY(360deg)" }
// 	];
// 	const options = {
// 		duration: 2000,
// 		iterations: Infinity,
// 		easing: "linear"
// 	};
// 	const animation = coin.animate(keyframes, options);

// 	animation.onfinish = function () {
// 		console.log("End");
// 	};
// });

const coin = document.querySelector(".coin");
const keyframes = [
	{ transform: "rotateY(0deg)" },
	{ transform: "rotateY(360deg)" }
];
const options = {
	duration: 2700, // Slowed down the speed of the flip
	iterations: Infinity, // Continuous flipping
	easing: "linear"
};

// Automatically start the animation
const animation = coin.animate(keyframes, options);

animation.onfinish = function () {
	console.log("End");
};

	