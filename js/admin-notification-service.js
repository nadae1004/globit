// Admin Notification Service Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page
    initializePage();
    
    // Set up event listeners
    setupEventListeners();
});

function initializePage() {
    // Initialize search functionality
    initializeSearch();
}

function setupEventListeners() {
    // Search button click
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    // Enter key in search inputs
    const searchInputs = document.querySelectorAll('#phone-search, #service-status');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    });
    
    // Terminate buttons
    const terminateBtns = document.querySelectorAll('.terminate-btn');
    terminateBtns.forEach(btn => {
        btn.addEventListener('click', handleTerminate);
    });
    
    // Region cells - open popup
    const regionCells = document.querySelectorAll('.region-cell');
    regionCells.forEach(cell => {
        cell.addEventListener('click', handleRegionClick);
    });
    
    // Popup close button
    const popupClose = document.querySelector('.popup-close');
    if (popupClose) {
        popupClose.addEventListener('click', closeRegionPopup);
    }
    
    // Popup secondary button (취소)
    const popupSecondaryBtn = document.querySelector('.popup-btn-secondary');
    if (popupSecondaryBtn) {
        popupSecondaryBtn.addEventListener('click', closeRegionPopup);
    }
    
    // Popup primary button (서비스 정보 수정)
    const popupPrimaryBtn = document.querySelector('.popup-btn-primary');
    if (popupPrimaryBtn) {
        popupPrimaryBtn.addEventListener('click', handleServiceUpdate);
    }
    
    // Close popup when clicking overlay
    const popupOverlay = document.getElementById('region-popup');
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                closeRegionPopup();
            }
        });
    }
    
    // Close popup with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeRegionPopup();
        }
    });
}

function initializeSearch() {
    // Set default values
    const phoneInput = document.getElementById('phone-search');
    const statusSelect = document.getElementById('service-status');
    
    if (phoneInput) {
        phoneInput.value = '010-1234-4567';
    }
    
    if (statusSelect) {
        statusSelect.value = 'inactive'; // Set to "해지" as shown in Figma
    }
}

function handleSearch() {
    const phoneInput = document.getElementById('phone-search');
    const statusSelect = document.getElementById('service-status');
    
    const phone = phoneInput ? phoneInput.value : '';
    const status = statusSelect ? statusSelect.value : '';
    
    console.log('Search:', { phone, status });
    
    // Here you would typically make an API call to search for data
    // For now, we'll just show a loading state
    showLoadingState();
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingState();
        // Update table with search results
        updateTableWithSearchResults(phone, status);
    }, 1000);
}

function handleTerminate(event) {
    const button = event.currentTarget;
    const row = button.closest('.table-row');
    const phoneCell = row.querySelector('.table-cell:first-child');
    const phone = phoneCell ? phoneCell.textContent : '';
    
    if (confirm(`전화번호 ${phone}의 서비스를 해지하시겠습니까?`)) {
        // Show loading state
        button.disabled = true;
        button.innerHTML = '<span>처리중...</span>';
        
        // Simulate API call
        setTimeout(() => {
            // Update the row to show terminated status
            const statusCell = row.querySelector('.table-cell:nth-child(4)');
            if (statusCell) {
                statusCell.textContent = '해지';
                statusCell.style.color = '#adaeb9';
            }
            
            // Reset button
            button.disabled = false;
            button.innerHTML = `
                <img src="images/btn_block.svg" alt="신청해지" width="20" height="20">
                <span>신청해지</span>
            `;
            
            // Show success message
            showNotification('서비스가 성공적으로 해지되었습니다.', 'success');
        }, 1500);
    }
}


function showLoadingState() {
    const tableBody = document.querySelector('.table-body');
    if (tableBody) {
        tableBody.style.opacity = '0.5';
        tableBody.style.pointerEvents = 'none';
    }
}

function hideLoadingState() {
    const tableBody = document.querySelector('.table-body');
    if (tableBody) {
        tableBody.style.opacity = '1';
        tableBody.style.pointerEvents = 'auto';
    }
}

function updateTableWithSearchResults(phone, status) {
    // This would typically update the table with new data from the API
    console.log('Updating table with search results:', { phone, status });
    
    // For demo purposes, we'll just show a notification
    showNotification('검색이 완료되었습니다.', 'info');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-family: 'Pretendard', sans-serif;
        font-size: 14px;
        font-weight: 500;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Region Popup Functions
function handleRegionClick(event) {
    const cell = event.currentTarget;
    const phoneNumber = cell.dataset.phone;
    
    // Open the popup
    openRegionPopup(phoneNumber);
}

function openRegionPopup(phoneNumber) {
    const popup = document.getElementById('region-popup');
    const phoneInput = document.getElementById('popup-phone');
    
    if (popup) {
        // Set phone number in popup
        if (phoneInput && phoneNumber) {
            phoneInput.value = phoneNumber;
        }
        
        // Show popup with animation
        popup.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
}

function closeRegionPopup() {
    const popup = document.getElementById('region-popup');
    
    if (popup) {
        popup.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

function handleServiceUpdate() {
    // Get selected regions
    const checkboxes = document.querySelectorAll('.region-checkbox:checked:not(:disabled)');
    const selectedRegions = Array.from(checkboxes).map((checkbox, index) => {
        const row = checkbox.closest('.popup-table-row');
        const cells = row.querySelectorAll('.popup-table-cell');
        return {
            region: cells[0].textContent,
            code: cells[1].textContent,
            latitude: cells[2].textContent,
            longitude: cells[3].textContent
        };
    });
    
    // Get time range
    const timeSelects = document.querySelectorAll('.time-select');
    const startHour = timeSelects[0].value;
    const startMin = timeSelects[1].value;
    const endHour = timeSelects[2].value;
    const endMin = timeSelects[3].value;
    
    console.log('Service Update:', {
        phone: document.getElementById('popup-phone').value,
        timeRange: `${startHour}:${startMin} ~ ${endHour}:${endMin}`,
        selectedRegions: selectedRegions
    });
    
    // Show loading state
    const primaryBtn = document.querySelector('.popup-btn-primary');
    if (primaryBtn) {
        primaryBtn.disabled = true;
        primaryBtn.innerHTML = '<span>처리중...</span>';
    }
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        if (primaryBtn) {
            primaryBtn.disabled = false;
            primaryBtn.innerHTML = '<span>서비스 정보 수정</span>';
        }
        
        // Close popup
        closeRegionPopup();
        
        // Show success message
        showNotification('서비스 정보가 성공적으로 수정되었습니다.', 'success');
    }, 1500);
}

// Add CSS for spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
