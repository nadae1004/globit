// Notification Service Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializePrivacyConsent();
    initializeStationSelection();
    initializeMapInteraction();
    initializeFormValidation();
    initializeTimeSelection();
    initializeMapPopups();
    initializeMapTableConnection();
    initializeServiceButtons();
});

// Privacy Consent Functionality
function initializePrivacyConsent() {
    const consentYes = document.getElementById('consent-yes');
    const consentNo = document.getElementById('consent-no');
    const confirmBtn = document.querySelector('.consent-buttons .btn-primary');
    const cancelBtn = document.querySelector('.consent-buttons .btn-secondary');

    confirmBtn.addEventListener('click', function() {
        if (consentYes.checked) {
            // Show image modal instead of directly showing service section
            showImageModal();
        } else if (consentNo.checked) {
            showNotification('개인정보 수집 동의가 필요합니다.', 'error');
        } else {
            showNotification('개인정보 수집 동의를 선택해주세요.', 'error');
        }
    });

    cancelBtn.addEventListener('click', function() {
        if (confirm('정말 취소하시겠습니까?')) {
            window.location.href = '/index.html';
        }
    });
}

// Station Selection Functionality
function initializeStationSelection() {
    const stationCheckboxes = document.querySelectorAll('.station-checkbox');
    const maxSelections = 10; // Maximum number of stations that can be selected

    stationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedBoxes = document.querySelectorAll('.station-checkbox:checked');
            
            if (checkedBoxes.length > maxSelections) {
                this.checked = false;
                showNotification(`최대 ${maxSelections}개까지 선택할 수 있습니다.`, 'warning');
                return;
            }

            // Update map points based on selection
            updateMapPoints();
            updateTableRowHighlight(this);
        });
    });

}

// Map Interaction Functionality
function initializeMapInteraction() {
    const mapPoints = document.querySelectorAll('.map-point');

    mapPoints.forEach((point, index) => {
        point.addEventListener('click', function() {
            // Remove active class from all points
            mapPoints.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked point
            this.classList.add('active');
        });
    });
}

function updateMapPoints() {
    const checkedBoxes = document.querySelectorAll('.station-checkbox:checked');
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach((point, index) => {
        const checkbox = document.querySelectorAll('.station-checkbox')[index];
        if (checkbox && checkbox.checked) {
            point.classList.add('selected');
        } else {
            point.classList.remove('selected');
        }
    });
}


// Form Validation (Simplified)
function initializeFormValidation() {
    // No validation needed since phone is disabled
    // Service buttons are for display only
}

// Time Selection Functionality
function initializeTimeSelection() {
    const timeSelects = document.querySelectorAll('.time-select');
    
    timeSelects.forEach(select => {
        select.addEventListener('change', function() {
            validateTimeRange();
        });
    });
}

function getSelectedTimeRange() {
    const startHour = document.querySelector('.time-group:first-child .time-select:first-child').value;
    const startMinute = document.querySelector('.time-group:first-child .time-select:last-child').value;
    const endHour = document.querySelector('.time-group:last-child .time-select:first-child').value;
    const endMinute = document.querySelector('.time-group:last-child .time-select:last-child').value;
    
    return {
        start: `${startHour}:${startMinute}`,
        end: `${endHour}:${endMinute}`
    };
}

function validateTimeRange() {
    const timeRange = getSelectedTimeRange();
    const startTime = new Date(`2000-01-01 ${timeRange.start}`);
    const endTime = new Date(`2000-01-01 ${timeRange.end}`);
    
    if (startTime >= endTime) {
        showNotification('시작 시간은 종료 시간보다 빨라야 합니다.', 'warning');
    }
}

// Utility Functions
function showImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.add('show');
    
    // Add click event to image
    const imageContainer = modal.querySelector('.modal-image-container');
    imageContainer.addEventListener('click', function() {
        hideImageModal();
        showServiceSection();
    });
    
    // Add click event to modal background to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideImageModal();
        }
    });
    
    // Add escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            hideImageModal();
        }
    });
}

function hideImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
}

function showServiceSection() {
    const serviceSection = document.querySelector('.service-section');
    serviceSection.classList.add('visible');
    
    // Scroll to service section smoothly
    setTimeout(() => {
        serviceSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 300);
}

function updateTableRowHighlight(checkbox) {
    const row = checkbox.closest('.table-row');
    if (checkbox.checked) {
        row.style.backgroundColor = '#f8f9ff';
    } else {
        row.style.backgroundColor = '';
    }
}

// Map Popup Functionality
function initializeMapPopups() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    const stationData = [
        { name: '육지 연화', code: 'C530002', status: '운영중' },
        { name: '거제 연화', code: 'C530003', status: '점검중' },
        { name: '통영 연화', code: 'C530004', status: '운영중' },
        { name: '고성 연화', code: 'C530005', status: '운영중' },
        { name: '사천 연화', code: 'C530006', status: '운영중' },
        { name: '남해 연화', code: 'C530007', status: '운영중' },
        { name: '하동 연화', code: 'C530008', status: '운영중' },
        { name: '진주 연화', code: 'C530009', status: '운영중' },
        { name: '창원 연화', code: 'C530010', status: '운영중' },
        { name: '김해 연화', code: 'C530011', status: '운영중' },
        { name: '양산 연화', code: 'C530012', status: '운영중' },
        { name: '밀양 연화', code: 'C530013', status: '운영중' },
        { name: '울산 연화', code: 'C530014', status: '점검중' },
        { name: '부산 연화', code: 'C530015', status: '운영중' },
        { name: '거제 연화2', code: 'C530016', status: '운영중' },
        { name: '통영 연화2', code: 'C530017', status: '운영중' }
    ];

    mapPoints.forEach((mapPoint, index) => {
        // Skip if popup already exists
        if (mapPoint.querySelector('.map-popup')) return;

        const data = stationData[index];
        if (!data) return;

        const popup = document.createElement('div');
        popup.className = 'map-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <div class="popup-header">
                    <h3>${data.name}</h3>
                    <div class="station-code">${data.code}</div>
                </div>
                <div class="popup-status">
                    <span>${data.status}</span>
                </div>
            </div>
        `;
        
        mapPoint.appendChild(popup);
    });
}

// Map and Table Connection
function initializeMapTableConnection() {
    const checkboxes = document.querySelectorAll('.station-checkbox');
    const mapPoints = document.querySelectorAll('.map-point');
    
    // Initialize map points based on current table state
    syncMapWithTable();
    
    // Add event listeners to checkboxes
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', function() {
            updateMapPointState(index, this.checked);
        });
    });
    
    // Add event listeners to map points
    mapPoints.forEach((mapPoint, index) => {
        if (!mapPoint.classList.contains('disabled')) {
            mapPoint.addEventListener('click', function() {
                const checkbox = checkboxes[index];
                if (checkbox && !checkbox.disabled) {
                    checkbox.checked = !checkbox.checked;
                    updateMapPointState(index, checkbox.checked);
                }
            });
        }
    });
}

function syncMapWithTable() {
    const checkboxes = document.querySelectorAll('.station-checkbox');
    
    checkboxes.forEach((checkbox, index) => {
        const mapPoint = document.querySelector(`[data-table-index="${index}"]`);
        const tempCircle = mapPoint?.querySelector('.temp-circle');
        
        if (mapPoint && tempCircle) {
            // Reset all states first
            mapPoint.classList.remove('selected');
            tempCircle.classList.remove('selected');
            
            // Apply state based on checkbox
            if (checkbox.checked) {
                mapPoint.classList.add('selected');
                tempCircle.classList.add('selected');
            }
        }
    });
}

function updateMapPointState(index, isSelected) {
    const mapPoint = document.querySelector(`[data-table-index="${index}"]`);
    const tempCircle = mapPoint?.querySelector('.temp-circle');
    
    if (mapPoint && tempCircle) {
        if (mapPoint.classList.contains('disabled')) {
            return; // Don't update disabled points
        }
        
        if (isSelected) {
            mapPoint.classList.add('selected');
            tempCircle.classList.add('selected');
        } else {
            mapPoint.classList.remove('selected');
            tempCircle.classList.remove('selected');
        }
    }
}

// Service Button Functionality
function initializeServiceButtons() {
    const applyButton = document.querySelector('.action-buttons .btn-primary');
    const cancelButton = document.querySelector('.action-buttons .btn-secondary');
    
    if (applyButton) {
        applyButton.addEventListener('click', function() {
            handleServiceApplication();
        });
    }
    
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            handleServiceCancellation();
        });
    }
}

function handleServiceApplication() {
    // Check if any stations are selected
    const selectedCheckboxes = document.querySelectorAll('.station-checkbox:checked');
    
    if (selectedCheckboxes.length === 0) {
        showNotification('최소 1개 이상의 관측점을 선택해주세요.', 'warning');
        return;
    }
    
    // Show success message
    showNotification('서비스 신청이 완료되었습니다.', 'success');
    
    // Optional: Add loading state or redirect
    setTimeout(() => {
        showNotification('관측점 ' + selectedCheckboxes.length + '개에 대한 알림 서비스가 활성화되었습니다.', 'info');
    }, 2000);
}

function handleServiceCancellation() {
    // Show confirmation dialog
    if (confirm('정말로 서비스를 해지하시겠습니까?')) {
        showNotification('서비스 해지가 완료되었습니다.', 'success');
        
        // Optional: Clear all selections
        setTimeout(() => {
            const checkboxes = document.querySelectorAll('.station-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            syncMapWithTable();
            showNotification('모든 관측점 선택이 해제되었습니다.', 'info');
        }, 2000);
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Create notification content with icon
    const notificationContent = document.createElement('div');
    notificationContent.style.display = 'flex';
    notificationContent.style.alignItems = 'center';
    notificationContent.style.gap = '12px';
    
    // Create icon element
    const icon = document.createElement('img');
    icon.src = '/images/error_ic.svg';
    icon.alt = 'Error Icon';
    icon.style.width = '20px';
    icon.style.height = '20px';
    icon.style.flexShrink = '0';
    
    // Create message element
    const messageElement = document.createElement('span');
    messageElement.textContent = message;
    
    // Append icon and message to content
    notificationContent.appendChild(icon);
    notificationContent.appendChild(messageElement);
    
    // Append content to notification
    notification.appendChild(notificationContent);
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '16px 24px';
    notification.style.borderRadius = '8px';
    notification.style.color = '#ffffff';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '10000';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}
