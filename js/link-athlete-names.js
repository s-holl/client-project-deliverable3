// same as function in collapsible-header-button
function toggleSection(sectionId, button) {
    console.log('TOGGLING');
    console.log('Button clicked!');
    const section = document.getElementById(sectionId);
    const isExpanded = section.hidden; // get if section is currently hidden
    console.log('Section is expanded:', !isExpanded);

    section.hidden = !isExpanded; // get & set the opposite of the current state
    button.setAttribute('aria-expanded', isExpanded); // update aria-expanded
    console.log('aria-expanded update to:', isExpanded);

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
    console.log('END TOGGLING');
}

// translate the athlete's name into the corresponding HTML ID for the athlete
function sanitizeToHTMLid(inputString) {
    // Replace spaces with dashes
    let sanitizedString = inputString.replace(/ /g, '-');
    
    // Remove any invalid characters (anything that's not a letter, digit, hyphen, or underscore)
    sanitizedString = sanitizedString.replace(/[^a-zA-Z0-9-_]/g, '');
    
    // Remove leading digits
    while (sanitizedString && /^\d/.test(sanitizedString)) {
        sanitizedString = sanitizedString.slice(1);
    }
    
    return sanitizedString;
}

// jump down to correct athlete section, expand if necessary
function jumpAndExpand(a, event) {
    console.log("about to Jump and Expand!!");
    const sectionId = sanitizeToHTMLid(a.textContent);

    // expand the section if it isn't already expanded
    const buttons = document.querySelectorAll('#individual-results button.toggle-athlete');
    buttons.forEach(button => {
        console.log('buttons aria-expanded:', button.getAttribute('aria-expanded'))
        if (button.getAttribute('aria-controls') === sectionId && button.getAttribute('aria-expanded') === 'false') {
            console.log('toggling from summary...');
            toggleSection(sectionId, button);
            console.log('end toggling from summary.');
        }
    });

    console.log('Time to jump...')
    // prevent the default behavior (jumping to the section)
    event.preventDefault();

    // Get the target element by the href value (which is an ID selector)
    const targetElement = document.getElementById(sectionId);

    // If the target element exists, scroll to it with an offset
    if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + document.documentElement.scrollTop;
        console.log('Target postition:', targetPosition);
        // calculate offset of link from viewport top (based on sticky headers)
        const offsetHeight = document.querySelector('h2').offsetHeight + document.querySelector('button.toggle-athlete').offsetHeight;
        
        // Scroll to the target position minus the desired offset
        window.scrollTo({
            top: targetPosition - offsetHeight,
            behavior: 'auto'
        });
    }
}

// find all athlete names in the summary
const elements = document.querySelectorAll('#summary .athlete');

// for each athlete name in the summary, add a relative link to the athlete's corresponding sanitized ID
elements.forEach((element) => {
    const anchor = document.createElement('a');
    anchor.href = '#' + sanitizeToHTMLid(element.textContent);
    // Wrap the current element with the new anchor tag
    element.parentNode.insertBefore(anchor, element);
    anchor.appendChild(element);
});

// summary athlete name click/keydown triggers
document.querySelectorAll('#summary a').forEach(a => {
    a.addEventListener('click', function(event) {
        console.log('Summary athlete name clicked!');
        jumpAndExpand(a, event);
    });
    a.addEventListener('keydown', function(event) {
        console.log('Keydown event triggered.');
        // only for Enter or Spacebar
        if (event.key === 'Enter' || event.key === ' ') {
            console.log('Summary athlete name entered/spaced!');
            jumpAndExpand(a, event);
        }
    });
});