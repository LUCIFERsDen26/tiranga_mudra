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
		const country = document.getElementById('country');
		const state = document.getElementById('state');
		const pinCode = document.getElementById('pinCode');
		const refCode = document.getElementById('refCode');
		const errorMessage = document.getElementById('erroMessage');

		// Basic input validation
		if (!emailInput.value || !firstName.value || !country.value || !state.value || !pinCode.value) {
			errorMessage.textContent = 'Please fill in all required fields';
			return;
		  }
		
		if (country.value === 'Select Country' || state.value === 'Select State') {
			errorMessage.textContent = 'Please select a valid country and state';
			return;
		  }
		
		console.log(validateEmail(emailInput.value))
		if (!validateEmail(emailInput.value)){
			errorMessage.textContent = 'Please valid email';
			return;	
		}

		const data = {
			email: emailInput.value,
			name: firstName.value,
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
				showref.textContent =  "Your referral code :" + responseData.message;
				// Handle successful submission (e.g., close popup, display success message)
				submitedPopupOverlay.style.display='block';
				closePopupFunc(); // Close the popup after form submission
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
const countDate = new Date('August 15, 2024 00:00:00').getTime();

const interval = setInterval(() =>{
	const now = new Date().getTime();
	const gap = countDate -  now;
	if(gap<0){
		clearInterval(interval);
		updateDuration(0);
		return;
	}
	updateDuration(gap);
}, 1000);

const updateDuration =()=>{
	const now = new Date().getTime();
	const gap = countDate - now;
	const sec = 1000;
	const min = sec * 60;
	const hour = min * 60;
	const day = hour * 24;
	
	let textDays = Math.floor(gap/day);
	let textHours = Math.floor((gap%day)/hour);
	let textMins = Math.floor((gap%hour)/min);
	let textSecs = Math.floor((gap%min)/sec);
	document.querySelector('.days').innerHTML = textDays;
	document.querySelector('.hours').innerHTML = textHours;
	document.querySelector('.minutes').innerHTML = textMins;
	document.querySelector('.seconds').innerHTML = textSecs;
	
}
updateDuration();

function getCount() {
	fetch('/count')
	  .then(response => response.json())
	  .then(data => {
		const countValueElement = document.querySelector('.totalFlags');
		countValueElement.textContent = data.count_value;
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