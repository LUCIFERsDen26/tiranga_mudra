// Api key for location

var config ={
	cUrl: 'https://api.countrystatecity.in/v1/countries',
	cKey: 'VmNQVXRkaW4yb3Zobk5CaWFLZ0VVUGxKOWdWTDZra2ZCQkl0N0JOdg=='

}

var countrySelect = document.querySelector('#country');
var stateSelect = document.querySelector('#state');
//var citySelect = document.querySelector('#city');

function loadCountries() {
		let apiEndPoint = config.cUrl;

		fetch(apiEndPoint, { headers: { "X-CSCAPI-KEY": config.cKey } })
			.then(Response => Response.json())
			.then(data => {
				// console.log(data);
				data.forEach(country => {
					const option = document.createElement('option')
					option.value = country.iso2
					option.textContent = country.name
					countrySelect.appendChild(option)
				});
			})
			.catch(error => console.error('Error Loading:', error))
}
loadCountries();

function loadStates(){
    const selectCountryCode = countrySelect.value;
    stateSelect.innerHTML = '<option value="">Select State</option>'
    
    fetch(`${config.cUrl}/${selectCountryCode}/states`,{headers: {"X-CSCAPI-KEY": config.cKey}})
    .then(Response => Response.json())
			.then(data => {
				// console.log(data);
				data.forEach(state => {
					const option = document.createElement('option')
					option.value = state.iso2
					option.textContent = state.name
					stateSelect.appendChild(option)
				});
			})
			.catch(error => console.error('Error Loading:', error))
};


