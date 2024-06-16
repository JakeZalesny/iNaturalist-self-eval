let data = {};
let url = '';

document.getElementById('searchBar').addEventListener('submit', (event) => {
    event.preventDefault();

    let query = document.getElementById('query').value;

    while (query === '') {
        query = prompt('Please enter a valid query');
    }
    if (query !== '') {
        url = `https://api.inaturalist.org/v1/places/autocomplete?q=${encodeURIComponent(query)}&order_by=area`;
    }
    console.log(`URL: ${url}`);

    getResults().then(() => renderResults()).catch(error => {
        console.error('Error:', error);
    });
});

/**
 * Fetches data from the API and stores it in the `data` variable.
 *
 * @return {Promise<void>} A Promise that resolves when the data is fetched and stored.
 */
async function getResults() {
    try {
        // Fetch data from the API
        const response = await fetch(url);

        // Check if the response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response body as JSON and store it in the `data` variable
        data = await response.json();
        console.log('Data fetched:', data);
    } catch (error) {
        console.error('Fetching error:', error);
    }
}

const renderResults = () => {
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';

    if (data.results && data.results.length > 0) {
        const ul = document.createElement('ul');

        data.results.forEach(element => {
            const li = document.createElement('li');
            li.textContent = element.display_name; // Corrected the reference here
            ul.appendChild(li);
        });

        resultsContainer.appendChild(ul);
    } else {
        resultsContainer.textContent = 'No results found';
    }
}
