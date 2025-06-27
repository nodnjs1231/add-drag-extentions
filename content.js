// content.js - 웹 페이지에 주입되어 실행되는 스크립트

let isDragging = false;
let isProcessingSelection = false; // 선택 처리 중인지 확인하는 플래그 추가

// 숫자 추출 함수 - 다양한 숫자 형식 지원 (음수, 소수, 쉼표 포함)
function extractNumbers(text) {
    if (!text || typeof text !== 'string') {
        return [];
    }

    // 숫자 패턴 매칭: 음수, 소수, 쉼표 포함 숫자
    const regex = /(-?\d+(?:,\d+)*(?:\.\d+)?)/g;
    const matches = text.match(regex);

    if (!matches) return [];

    // 쉼표 제거하고 숫자로 변환
    return matches.map((match) => parseFloat(match.replace(/,/g, ''))).filter((num) => !isNaN(num));
}

// 선택된 텍스트 처리 함수
function processSelectedText() {
    if (isProcessingSelection) return; // 이미 처리 중이면 중복 처리 방지

    isProcessingSelection = true;
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
        // 선택된 텍스트에서 숫자 추출
        const numbers = extractNumbers(selectedText);

        if (numbers.length > 0) {
            // 배경 스크립트에 추출된 숫자들 전송
            chrome.runtime.sendMessage({
                type: 'NUMBERS_EXTRACTED',
                numbers: numbers,
                selectedText: selectedText,
            });
        }
    }

    setTimeout(() => {
        isProcessingSelection = false; // 처리 완료 후 플래그 초기화
    }, 100);
}

// 마우스 다운 이벤트 - 드래그 시작 감지
document.addEventListener('mousedown', function () {
    isDragging = true;
});

// 마우스 업 이벤트 - 드래그 종료 및 텍스트 선택 감지
document.addEventListener('mouseup', function () {
    if (isDragging) {
        setTimeout(processSelectedText, 100); // 약간의 지연을 두어 선택이 완료되도록 함
        isDragging = false;
    }
});

// 키보드로 텍스트 선택 시에도 동작하도록 selection change 이벤트 추가
let selectionTimeout;
document.addEventListener('selectionchange', function () {
    if (!isDragging) {
        // 마우스 드래그 중이 아닐 때만 처리
        clearTimeout(selectionTimeout);
        selectionTimeout = setTimeout(processSelectedText, 300);
    }
});

console.log('Add Drag extension content script loaded');
