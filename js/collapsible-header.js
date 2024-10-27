document.querySelectorAll('.athlete h3').forEach(header => {
    header.addEventListener('click', () => {
        let contentElements = []; // Array to store the two content elements
        let contentEltsDisplay = 'grid';
        let content = header.nextElementSibling; // Start with the first sibling
        let count = 0; // Counter for hidden elements

        // Collect the next two content elements
        while (content && count < 2) {
            contentElements.push(content);
            content = content.nextElementSibling; // Move to the next sibling
            count++; // Increment the counter
        }

        // Toggle visibility for the collected content elements
        contentElements.forEach(content => {
            if (content.style.display === 'grid') {
                content.style.display = 'none'; // Hide content
                content.classList.remove('grid');
                contentEltsDisplay = 'none';
            } else {
                content.style.display = 'grid'; // Show content
                content.classList.add('grid');
                contentEltsDisplay = 'grid';
            }
        });
        if (contentEltsDisplay === 'grid') {
            header.querySelector('i').classList.remove('fa-plus-square');
            header.querySelector('i').classList.add('fa-minus-square');
            header.querySelector('i').setAttribute('aria-label', "Collapsed");
        } else {
            header.querySelector('i').classList.remove('fa-minus-square');
            header.querySelector('i').classList.add('fa-plus-square');
            header.querySelector('i').setAttribute('aria-label', "Expanded");
        }
    });
});