// ============================================
// Events Page Functionality
// ============================================

// Event data structure (in Kajabi, this would come from your database/API)
const eventsData = {
    'event-1': {
        id: 'event-1',
        title: 'Leadership Summit 2024',
        date: 'March 15, 2024',
        time: '10:00 AM - 2:00 PM EST',
        location: 'Virtual Event - Zoom Link Provided',
        type: 'virtual'
    },
    'event-2': {
        id: 'event-2',
        title: 'Certification Workshop: School Leadership',
        date: 'April 20, 2024',
        time: '9:00 AM - 4:00 PM EST',
        location: '123 Education Center, New York, NY 10001',
        type: 'in-person'
    },
    'event-3': {
        id: 'event-3',
        title: 'Monthly Networking Session',
        date: 'May 10, 2024',
        time: '6:00 PM - 7:30 PM EST',
        location: 'Virtual Event - Microsoft Teams',
        type: 'virtual'
    }
};

// ============================================
// Registration Modal Functions
// ============================================
function openRegistrationModal(eventId) {
    const modal = document.getElementById('registrationModal');
    const eventData = eventsData[eventId];
    
    if (modal && eventData) {
        // Set event ID
        document.getElementById('eventId').value = eventId;
        
        // Set event title in modal
        const modalTitle = document.getElementById('modalEventTitle');
        if (modalTitle) {
            modalTitle.textContent = eventData.title;
        }
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeRegistrationModal() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        const form = document.getElementById('registrationForm');
        if (form) {
            form.reset();
        }
    }
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('registrationModal');
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeRegistrationModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeRegistrationModal();
            }
        });
    }
});

// ============================================
// Registration Form Handling
// ============================================
function handleRegistration(event) {
    event.preventDefault();
    
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateRegistrationForm(data)) {
        return;
    }
    
    // In Kajabi, you would use:
    // 1. Kajabi.form.submit() to submit to a Kajabi form
    // 2. Or create a custom offer and redirect to checkout
    // 3. Or use Kajabi API to create a contact/registration
    
    console.log('Registration data:', data);
    
    // Simulate API call
    setTimeout(function() {
        // Close registration modal
        closeRegistrationModal();
        
        // Show success message
        showSuccessMessage();
        
        // In Kajabi, you would:
        // - Create a contact with the registration data
        // - Add them to an email sequence
        // - Send confirmation email via Kajabi automation
        // - Add them to the event's contact list
    }, 500);
}

function validateRegistrationForm(data) {
    // Basic validation
    if (!data.firstName || !data.lastName || !data.email) {
        alert('Please fill in all required fields.');
        return false;
    }
    
    if (!validateEmail(data.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (!data.terms) {
        alert('Please agree to the Terms and Conditions.');
        return false;
    }
    
    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// Success Message
// ============================================
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'flex';
        successMessage.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'none';
        successMessage.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close success message when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const successMessage = document.getElementById('successMessage');
    
    if (successMessage) {
        successMessage.addEventListener('click', function(e) {
            if (e.target === successMessage) {
                closeSuccessMessage();
            }
        });
    }
});

// ============================================
// Event Filtering and Search
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('eventSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventsGrid = document.getElementById('eventsGrid');
    const noEvents = document.getElementById('noEvents');
    
    let currentFilter = 'all';
    let searchTerm = '';
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            searchTerm = e.target.value.toLowerCase();
            filterEvents();
        }, 300));
    }
    
    // Filter buttons
    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter
            currentFilter = this.dataset.filter;
            filterEvents();
        });
    });
    
    function filterEvents() {
        const eventCards = eventsGrid.querySelectorAll('.event-card-detailed');
        let visibleCount = 0;
        
        eventCards.forEach(function(card) {
            const categories = card.dataset.category || '';
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            
            // Check filter
            let matchesFilter = false;
            if (currentFilter === 'all') {
                matchesFilter = true;
            } else if (currentFilter === 'upcoming') {
                matchesFilter = categories.includes('upcoming');
            } else if (currentFilter === 'past') {
                matchesFilter = categories.includes('past');
            } else if (currentFilter === 'virtual') {
                matchesFilter = categories.includes('virtual');
            } else if (currentFilter === 'in-person') {
                matchesFilter = categories.includes('in-person');
            }
            
            // Check search
            const matchesSearch = !searchTerm || 
                title.includes(searchTerm) || 
                description.includes(searchTerm);
            
            // Show/hide card
            if (matchesFilter && matchesSearch) {
                card.style.display = 'grid';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no events message
        if (noEvents) {
            if (visibleCount === 0) {
                noEvents.style.display = 'block';
            } else {
                noEvents.style.display = 'none';
            }
        }
    }
});

// ============================================
// Debounce Helper
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// Kajabi Integration Helpers
// ============================================

/**
 * Example function to integrate with Kajabi Forms
 * Replace this with actual Kajabi form integration
 */
function submitToKajabiForm(formData, formId) {
    // In Kajabi, you would use:
    // Kajabi.form.submit({
    //     formId: formId,
    //     data: formData
    // });
    
    console.log('Submitting to Kajabi form:', formId, formData);
}

/**
 * Example function to create a free offer/registration
 * In Kajabi, you can create a free offer and redirect users to it
 */
function redirectToKajabiOffer(offerId) {
    // In Kajabi, you would redirect to:
    // window.location.href = `/offers/${offerId}`;
    
    console.log('Redirecting to Kajabi offer:', offerId);
}

/**
 * Example function to add contact to Kajabi
 * This would typically be done via Kajabi API or webhook
 */
function addContactToKajabi(contactData) {
    // This would typically be done via:
    // 1. Kajabi API
    // 2. Webhook integration
    // 3. Zapier/Make.com integration
    
    console.log('Adding contact to Kajabi:', contactData);
}
