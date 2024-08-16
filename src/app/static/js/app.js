// Api key for location

var config ={
	cUrl: 'https://api.countrystatecity.in/v1/countries',
	cKey: 'VmNQVXRkaW4yb3Zobk5CaWFLZ0VVUGxKOWdWTDZra2ZCQkl0N0JOdg=='

}

var stateSelect = document.querySelector('#state');

function loadCountries() {
    // Replace the default "Select Country" dropdown with radio buttons
    const radioGroup = document.querySelector('.radio-group');
    radioGroup.innerHTML = `
        <label><input type="radio" name="country" value="India" /> India</label>
        <label><input type="radio" name="country" value="Other" /> Other</label>
    `;
    
    // Add event listeners for the radio buttons to toggle the state dropdown
    document.querySelectorAll('input[name="country"]').forEach(radio => {
        radio.addEventListener('change', toggleStateDropdown);
    });
}

function toggleStateDropdown() {
    const selectedCountry = document.querySelector('input[name="country"]:checked').value;

    if (selectedCountry === 'India') {
        stateSelect.style.display = 'block';
        loadStates(); // Load states only when "India" is selected
    } else {
        stateSelect.style.display = 'none';
        stateSelect.innerHTML = ''; // Clear the state options when hidden
    }
}

function loadStates(){
    stateSelect.innerHTML = '<option value="">Select State*</option>';

    fetch(`${config.cUrl}/IN/states`, { headers: { "X-CSCAPI-KEY": config.cKey } })
        .then(Response => Response.json())
        .then(data => {
			// Sort the states alphabetically by name
            data.sort((a, b) => a.name.localeCompare(b.name));
            data.forEach(state => {
                const option = document.createElement('option');
                option.value = state.iso2;
                option.textContent = state.name;
                stateSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error Loading:', error));
}

// Call loadCountries to initialize the radio buttons
loadCountries();

// Hide the state dropdown initially
stateSelect.style.display = 'none';