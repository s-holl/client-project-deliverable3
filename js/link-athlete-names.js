function expand_targetResults(targetResults) {
    if (targetResults) {
        targetResults.style.display = 'grid'; // show targetResults in grid form
    }
}


document.querySelectorAll('#summary .athlete').forEach(span => {
    const textToLink = span.textContent; // Get the text of the clicked span
        
    // Find the corresponding h3 and the associated Results
    const targetHeader = Array.from(document.querySelectorAll('.athlete h3')).find(h3 => h3.textContent === textToLink);
    
    /* match background color of name in the summary to that of the corresponding individual results header */
    const heading_color = window.getComputedStyle(targetHeader).backgroundColor;
    span.style.backgroundColor = heading_color;

    /* when clicked, link to individual results */
    span.addEventListener('click', () => {
        const targetResults1 = targetHeader ? targetHeader.nextElementSibling : null; // Get the corresponding Results
        const targetResults2 = targetResults1 ? targetResults1.nextElementSibling : null;
        const targetResults = [targetResults1, targetResults2];

        // Get the height of the first h2 header
        const h2Height = document.querySelector('h2') ? document.querySelector('h2').offsetHeight : 0;

        // Scroll to the target header if found
        if (targetHeader) {
            // Expand the content if it's hidden
            targetResults.forEach( targetResults_n => {
                expand_targetResults(targetResults_n);
            });

            // Calculate the target position
            const targetPosition = targetHeader.getBoundingClientRect().top + window.scrollY - h2Height; 
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});