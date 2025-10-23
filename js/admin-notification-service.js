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
    
    // Initialize pagination
    initializePagination();
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
    
    // Pagination event listeners
    setupPaginationEventListeners();
    
    // Popup pagination event listeners
    setupPopupPaginationEventListeners();
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
    
    // Reset pagination to first page when searching
    currentPage = 1;
    updatePaginationDisplay();
    updateTableDisplay();
    
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
        
        // Initialize popup pagination
        initializePopupPagination();
        
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

// Pagination functionality
let currentPage = 1;
let totalPages = 15; // 총 150건, 페이지당 10건
let itemsPerPage = 10;

// Popup pagination functionality
let popupCurrentPage = 1;
let popupTotalPages = 3; // 총 25건, 페이지당 10건
let popupItemsPerPage = 10;

function initializePagination() {
    updatePaginationDisplay();
}

function initializePopupPagination() {
    updatePopupPaginationDisplay();
    updatePopupTableDisplay();
}

function setupPaginationEventListeners() {
    // First page button
    const firstBtn = document.querySelector('.pagination-btn-first');
    if (firstBtn) {
        firstBtn.addEventListener('click', () => goToPage(1));
    }
    
    // Previous page button
    const prevBtn = document.querySelector('.pagination-btn-prev');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
    }
    
    // Next page button
    const nextBtn = document.querySelector('.pagination-btn-next');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
    }
    
    // Last page button
    const lastBtn = document.querySelector('.pagination-btn-last');
    if (lastBtn) {
        lastBtn.addEventListener('click', () => goToPage(totalPages));
    }
    
    // Page number buttons
    const pageBtns = document.querySelectorAll('.pagination-page');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const pageNum = parseInt(btn.textContent);
            goToPage(pageNum);
        });
    });
}

function goToPage(page) {
    if (page < 1 || page > totalPages || page === currentPage) {
        return;
    }
    
    currentPage = page;
    updatePaginationDisplay();
    updateTableDisplay();
    showNotification(`페이지 ${page}로 이동했습니다.`, 'info');
}

function updatePaginationDisplay() {
    // Update pagination info
    const paginationInfo = document.querySelector('.pagination-info span');
    if (paginationInfo) {
        const startItem = (currentPage - 1) * itemsPerPage + 1;
        const endItem = Math.min(currentPage * itemsPerPage, 150);
        paginationInfo.innerHTML = `총 <strong>150</strong>건 중 <strong>${startItem}-${endItem}</strong>건 표시`;
    }
    
    // Update button states
    const firstBtn = document.querySelector('.pagination-btn-first');
    const prevBtn = document.querySelector('.pagination-btn-prev');
    const nextBtn = document.querySelector('.pagination-btn-next');
    const lastBtn = document.querySelector('.pagination-btn-last');
    
    if (firstBtn) firstBtn.disabled = currentPage === 1;
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
    if (lastBtn) lastBtn.disabled = currentPage === totalPages;
    
    // Update page number buttons
    updatePageNumberButtons();
}

function updatePageNumberButtons() {
    const pageButtons = document.querySelectorAll('.pagination-page');
    const pagesContainer = document.querySelector('.pagination-pages');
    
    if (!pagesContainer) return;
    
    // Clear existing buttons
    pagesContainer.innerHTML = '';
    
    // Calculate which pages to show
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    // Adjust range if we're near the beginning or end
    if (endPage - startPage < 4) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + 4);
        } else if (endPage === totalPages) {
            startPage = Math.max(1, endPage - 4);
        }
    }
    
    // Create page buttons
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'pagination-page';
        pageBtn.textContent = i;
        
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        
        pageBtn.addEventListener('click', () => goToPage(i));
        pagesContainer.appendChild(pageBtn);
    }
}

function updateTableDisplay() {
    // Hide all table rows
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        row.style.display = 'none';
    });
    
    // Show rows for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, tableRows.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        if (tableRows[i]) {
            tableRows[i].style.display = 'grid';
        }
    }
}

// Popup pagination functions
function setupPopupPaginationEventListeners() {
    // Popup first page button
    const popupFirstBtn = document.querySelector('.popup-pagination-btn-first');
    if (popupFirstBtn) {
        popupFirstBtn.addEventListener('click', () => goToPopupPage(1));
    }
    
    // Popup previous page button
    const popupPrevBtn = document.querySelector('.popup-pagination-btn-prev');
    if (popupPrevBtn) {
        popupPrevBtn.addEventListener('click', () => goToPopupPage(popupCurrentPage - 1));
    }
    
    // Popup next page button
    const popupNextBtn = document.querySelector('.popup-pagination-btn-next');
    if (popupNextBtn) {
        popupNextBtn.addEventListener('click', () => goToPopupPage(popupCurrentPage + 1));
    }
    
    // Popup last page button
    const popupLastBtn = document.querySelector('.popup-pagination-btn-last');
    if (popupLastBtn) {
        popupLastBtn.addEventListener('click', () => goToPopupPage(popupTotalPages));
    }
    
    // Popup page number buttons
    const popupPageBtns = document.querySelectorAll('.popup-pagination-page');
    popupPageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const pageNum = parseInt(btn.textContent);
            goToPopupPage(pageNum);
        });
    });
}

function goToPopupPage(page) {
    if (page < 1 || page > popupTotalPages || page === popupCurrentPage) {
        return;
    }
    
    popupCurrentPage = page;
    updatePopupPaginationDisplay();
    updatePopupTableDisplay();
}

function updatePopupPaginationDisplay() {
    // Update popup pagination info
    const popupPaginationInfo = document.querySelector('.popup-pagination-info span');
    if (popupPaginationInfo) {
        const startItem = (popupCurrentPage - 1) * popupItemsPerPage + 1;
        const endItem = Math.min(popupCurrentPage * popupItemsPerPage, 25);
        popupPaginationInfo.innerHTML = `총 <strong>25</strong>건 중 <strong>${startItem}-${endItem}</strong>건 표시`;
    }
    
    // Update popup button states
    const popupFirstBtn = document.querySelector('.popup-pagination-btn-first');
    const popupPrevBtn = document.querySelector('.popup-pagination-btn-prev');
    const popupNextBtn = document.querySelector('.popup-pagination-btn-next');
    const popupLastBtn = document.querySelector('.popup-pagination-btn-last');
    
    if (popupFirstBtn) popupFirstBtn.disabled = popupCurrentPage === 1;
    if (popupPrevBtn) popupPrevBtn.disabled = popupCurrentPage === 1;
    if (popupNextBtn) popupNextBtn.disabled = popupCurrentPage === popupTotalPages;
    if (popupLastBtn) popupLastBtn.disabled = popupCurrentPage === popupTotalPages;
    
    // Update popup page number buttons
    updatePopupPageNumberButtons();
}

function updatePopupPageNumberButtons() {
    const popupPagesContainer = document.querySelector('.popup-pagination-pages');
    
    if (!popupPagesContainer) return;
    
    // Clear existing buttons
    popupPagesContainer.innerHTML = '';
    
    // Calculate which pages to show
    let startPage = Math.max(1, popupCurrentPage - 2);
    let endPage = Math.min(popupTotalPages, popupCurrentPage + 2);
    
    // Adjust range if we're near the beginning or end
    if (endPage - startPage < 4) {
        if (startPage === 1) {
            endPage = Math.min(popupTotalPages, startPage + 4);
        } else if (endPage === popupTotalPages) {
            startPage = Math.max(1, endPage - 4);
        }
    }
    
    // Create popup page buttons
    for (let i = startPage; i <= endPage; i++) {
        const popupPageBtn = document.createElement('button');
        popupPageBtn.className = 'popup-pagination-page';
        popupPageBtn.textContent = i;
        
        if (i === popupCurrentPage) {
            popupPageBtn.classList.add('active');
        }
        
        popupPageBtn.addEventListener('click', () => goToPopupPage(i));
        popupPagesContainer.appendChild(popupPageBtn);
    }
}

function updatePopupTableDisplay() {
    // Hide all popup table rows
    const popupTableRows = document.querySelectorAll('.popup-table-row');
    popupTableRows.forEach(row => {
        row.style.display = 'none';
    });
    
    // Show rows for current popup page
    const startIndex = (popupCurrentPage - 1) * popupItemsPerPage;
    const endIndex = Math.min(startIndex + popupItemsPerPage, popupTableRows.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        if (popupTableRows[i]) {
            popupTableRows[i].style.display = 'grid';
        }
    }
}
