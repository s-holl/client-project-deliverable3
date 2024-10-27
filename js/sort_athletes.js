// sorts the items in #individual-results (aka each .athlete)
function sortItems(sort_option) {
    const items = Array.from(document.querySelectorAll('#individual-results .athlete'));
    
    items.sort((a, b) => {
        const nameA = a.querySelector('h3').textContent.trim();
        const nameB = b.querySelector('h3').textContent.trim();
        
        // name - ascending
        if (sort_option === 'name-asc') {
            return nameA.localeCompare(nameB);
        }
        // name - descending
        else if (sort_option === 'name-desc') {
            return nameB.localeCompare(nameA);
        }

        const placeA = a.querySelector('dd').textContent.trim();
        const placeB = b.querySelector('dd').textContent.trim();

        // place/time - ascending
        if (sort_option === 'place-asc') {
            return placeA.localeCompare(placeB);
        } 
        // place/time - descending
        else {
            return placeB.localeCompare(placeA);
        }
    });

    const container = document.querySelector('#individual-results');
    items.forEach(item => container.appendChild(item)); // Append sorted items
}

// Initial sorting based on default selected option
const defaultSortOption = document.getElementById('sort-options').value;
sortItems(defaultSortOption);

// Event listener for sorting on option change
document.getElementById('sort-options').addEventListener('change', function() {
    sortItems(this.value);
});