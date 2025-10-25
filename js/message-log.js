// Message Log Page JavaScript

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
    const searchInputs = document.querySelectorAll('#date-from, #date-to, #message-type, #send-status');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    });
    
    // Resend buttons
    const resendBtns = document.querySelectorAll('.resend-btn');
    resendBtns.forEach(btn => {
        btn.addEventListener('click', handleResend);
    });
    
    // Pagination event listeners
    setupPaginationEventListeners();
}

function initializeSearch() {
    // Set default values based on Figma design
    const dateFromInput = document.getElementById('date-from');
    const dateToInput = document.getElementById('date-to');
    const messageTypeSelect = document.getElementById('message-type');
    const sendStatusSelect = document.getElementById('send-status');
    
    if (dateFromInput) {
        dateFromInput.value = '2025-08-01';
    }
    
    if (dateToInput) {
        dateToInput.value = '2025-08-31';
    }
    
    if (messageTypeSelect) {
        messageTypeSelect.value = 'high-temp'; // 고수온 예보
    }
    
    if (sendStatusSelect) {
        sendStatusSelect.value = 'success'; // 성공
    }
}

function handleSearch() {
    const dateFromInput = document.getElementById('date-from');
    const dateToInput = document.getElementById('date-to');
    const messageTypeSelect = document.getElementById('message-type');
    const sendStatusSelect = document.getElementById('send-status');
    
    const dateFrom = dateFromInput ? dateFromInput.value : '';
    const dateTo = dateToInput ? dateToInput.value : '';
    const messageType = messageTypeSelect ? messageTypeSelect.value : '';
    const sendStatus = sendStatusSelect ? sendStatusSelect.value : '';
    
    console.log('Search:', { dateFrom, dateTo, messageType, sendStatus });
    
    // Validate date range
    if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) {
        showNotification('시작일자는 종료일자보다 이전이어야 합니다.', 'error');
        return;
    }
    
    // Here you would typically make an API call to search for data
    // For now, we'll just show a loading state
    showLoadingState();
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingState();
        // Update table with search results
        updateTableWithSearchResults(dateFrom, dateTo, messageType, sendStatus);
    }, 1000);
}

function handleResend(event) {
    const button = event.currentTarget;
    const row = button.closest('.table-row');
    const phoneCell = row.querySelector('.table-cell:nth-child(2)');
    const messageTypeCell = row.querySelector('.table-cell:nth-child(3)');
    const phone = phoneCell ? phoneCell.textContent : '';
    const messageType = messageTypeCell ? messageTypeCell.textContent : '';
    
    if (confirm(`전화번호 ${phone}로 ${messageType} 메시지를 재전송하시겠습니까?`)) {
        // Show loading state
        button.disabled = true;
        button.innerHTML = '<span>전송중...</span>';
        
        // Simulate API call with random success/failure
        setTimeout(() => {
            const isSuccess = Math.random() > 0.3; // 70% success rate
            
            if (isSuccess) {
                // Success case
                const statusCell = row.querySelector('.table-cell:nth-child(4)');
                if (statusCell) {
                    statusCell.textContent = '재전송중';
                    statusCell.style.color = '#0064dd';
                }
                
                // Reset button after a delay
                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = `
                        <img src="images/forward_media.svg" alt="재전송" width="20" height="20">
                        <span>재전송</span>
                    `;
                    
                    // Update status to success
                    if (statusCell) {
                        statusCell.textContent = '성공';
                        statusCell.style.color = '#18181a';
                    }
                    
                    // Show success message
                    showNotification('메시지가 성공적으로 재전송되었습니다.', 'success');
                }, 2000);
            } else {
                // Failure case
                const statusCell = row.querySelector('.table-cell:nth-child(4)');
                if (statusCell) {
                    statusCell.textContent = '실패';
                    statusCell.style.color = '#f44336';
                }
                
                // Reset button
                button.disabled = false;
                button.innerHTML = `
                    <img src="images/forward_media.svg" alt="재전송" width="20" height="20">
                    <span>재전송</span>
                `;
                
                // Show failure message
                showNotification('메시지 재전송에 실패했습니다. 다시 시도해주세요.', 'error');
            }
        }, 1000);
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

function updateTableWithSearchResults(dateFrom, dateTo, messageType, sendStatus) {
    // This would typically update the table with new data from the API
    console.log('Updating table with search results:', { dateFrom, dateTo, messageType, sendStatus });
    
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

// Pagination functionality
let currentPage = 1;
let totalPages = 15; // 총 150건, 페이지당 10건
let itemsPerPage = 10;

function initializePagination() {
    updatePaginationDisplay();
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

// Add CSS for spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
