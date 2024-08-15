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
var firsttime = true;
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
    function openPopup(){
		
		const cookieValue = getCookie('DataCookie');		
	
		if (cookieValue) {
			try {
				// Parse the cookie value into a JSON object
				const cookieData = JSON.parse(cookieValue);
				
				// Use the cookieData as needed
				console.log('Cookie data:', cookieData);
				
				// Call the function to create and display the referral link
				if(firsttime){
					displayReferralLink(cookieData);
					firsttime=false;
				}
				else{
					return;
				}
				
			} catch (e) {
				// Handle the case where the cookie value is not valid JSON
				console.error('Error parsing cookie data:', e);
				
				// Continue with opening the popup (or handle the error as needed)
				popupOverlay.style.display = 'block';
				mainbody.classList.add("stopscroll");
			}
		} else {
			// Cookie not found, proceed as normal
			popupOverlay.style.display = 'block';
			mainbody.classList.add("stopscroll");
		}
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
		const emailInput = document.getElementById('emailInput');
		const firstName = document.getElementById('firstName');
		const phoneno = document.getElementById('phoneNo');
		const country = document.getElementById('country');
		const state = document.getElementById('state');
		const pinCode = document.getElementById('pinCode');
		const refCode = document.getElementById('refCode');
		const errorMessage = document.getElementById('erroMessage');

		// Basic input validation
		if (!emailInput.value.toLowerCase() || !firstName.value || !country.value || !state.value || !pinCode.value || !phoneno.value) {
			errorMessage.textContent = 'Please fill in all required fields';
			return;
		  }
		
		if (country.value === 'Select Country' || state.value === 'Select State') {
			errorMessage.textContent = 'Please select a valid country and state';
			return;
		  }
		
		
		if (!validateEmail(emailInput.value.toLowerCase())){
			errorMessage.textContent = 'Please valid email';
			return;	
		}
		if (!validatePhoneNumber(phoneno.value)){
			errorMessage.textContent = 'Please valid phone number';
			return;	
		}

		const data = {
			email: emailInput.value.toLowerCase(),
			name: firstName.value.toLowerCase(),
			phone_no: phoneno.value,
			country: country.value,
			state: state.value,
			pin_code: pinCode.value,
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

				// build data:
				const Data = {
					refCode: responseData.message,
					link: ref_link,
					name: firstName.value.toLowerCase()					
				};
				
				// Handle successful submission (e.g., close popup, display success message)
				submitedPopupOverlay.style.display='block';
				
				closePopupFunc(); // Close the popup after form submission
				mainbody.classList.add("stopscroll");
				getCount()

				setCookie('DataCookie', Data, 7);
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

var ref_link = "2047tirangamudra.in/reference/"

function getCount() {
	fetch('/count')
	  .then(response => response.json())
	  .then(data => {
		const countValueElement = document.querySelector('.totalFlags');
		countValueElement.textContent = "Total flag donated- "+ data.count_value;
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

	function setCookie(name, jsonData, days, sameSite = 'Strict') {
		// Convert JSON object to a string
		const jsonString = JSON.stringify(jsonData);
	
		// Create a cookie with the given name, value, and expiration date
		let expires = "";
		if (days) {
			const date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
			expires = "; expires=" + date.toUTCString();
		}
	
		// Detect if the site is using HTTPS
		const isSecure = window.location.protocol === 'https:';
	
		// Construct cookie string with security attributes
		let cookieString = `${name}=${encodeURIComponent(jsonString)}${expires}; path=/`;
		
		if (isSecure) {
			cookieString += "; Secure";
		}
		
		cookieString += `; SameSite=${sameSite}`;
		
		document.cookie = cookieString;
	}

	function getCookie(name) {
		const nameEQ = name + "=";
		const ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0) {
				return decodeURIComponent(c.substring(nameEQ.length, c.length));
			}
		}
		return null;
	}
	

	// Function to create and display the referral link
function displayReferralLink(Data) {
    // Get the target div by its ID
    const reflink = document.getElementById('createreflink');
	const yourname = document.getElementById('createyournameref');

	// Create a new <h5> element
    const h5Element = document.createElement('h6');
	// Set the text content of the link
    h5Element.textContent = "Hello "+ Data.name +", your referrals:";
	// Append the link element to the container
    yourname.appendChild(h5Element);


    // Create a new <a> element
    const linkElement = document.createElement('a');
    // Set the href attribute to the provided URL
    linkElement.href = Data.link;
    // Set the text content of the link
    linkElement.textContent = Data.link;
    // Optionally, set the target attribute to open the link in a new tab
    linkElement.target = '_blank';

    // Append the link element to the container
    reflink.appendChild(linkElement);

    // Display the 'allreadysubmited' div by changing its display style
    document.getElementById('allreadysubmited').style.display = 'block';
}