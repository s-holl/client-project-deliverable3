function toggleSection(sectionId, button) {
    console.log('Button clicked!');
    const section = document.getElementById(sectionId);
    const isExpanded = section.hidden; // get if section is currently hidden
    console.log('Section is expanded:', !isExpanded);

    section.hidden = !isExpanded; // get & set the opposite of the current state
    button.setAttribute('aria-expanded', !isExpanded); // set as the opposite

    // Change the icon to correspond correctly:
    const icon = button.firstElementChild;
    if (isExpanded) {
        icon.classList.remove('fa-plus-square');
        icon.classList.add('fa-minus-square');
    } else {
        icon.classList.remove('fa-minus-square');
        icon.classList.add('fa-plus-square');
    }

    button.setAttribute('aria-label', isExpanded ? 'Collapse' : 'Expand');
    console.log('Updated aria-label:', button.getAttribute('aria-label'));

    // Move focus to the section content
    if (!isExpanded) {
        section.focus();
    }

}

// Allow toggling with click
document.querySelectorAll('.toggle-athlete').forEach(button => {
    button.addEventListener('click', function() {
        const sectionId = this.getAttribute('aria-controls');
        toggleSection(sectionId, this);
    });
});
