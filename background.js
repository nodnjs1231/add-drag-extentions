// background.js - 서비스 워커

// 확장 프로그램 설치 시 초기 데이터 설정
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        totalSum: 0,
        extractedNumbers: [],
        lastSelectedText: '',
    });
    console.log('Add Drag extension installed');
});

// content script로부터 메시지 수신
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'NUMBERS_EXTRACTED') {
        handleNumbersExtracted(message.numbers, message.selectedText);
    } else if (message.type === 'GET_DATA') {
        // 팝업에서 현재 데이터 요청
        chrome.storage.local.get(['totalSum', 'extractedNumbers', 'lastSelectedText'], (data) => {
            sendResponse(data);
        });
        return true; // 비동기 응답을 위해 true 반환
    } else if (message.type === 'RESET_DATA') {
        // 데이터 리셋
        chrome.storage.local.set(
            {
                totalSum: 0,
                extractedNumbers: [],
                lastSelectedText: '',
            },
            () => {
                sendResponse({ success: true });
            }
        );
        return true;
    }
});

// 숫자 추출 처리 함수
function handleNumbersExtracted(numbers, selectedText) {
    chrome.storage.local.get(['totalSum', 'extractedNumbers'], (data) => {
        const currentSum = data.totalSum || 0;
        const currentNumbers = data.extractedNumbers || [];

        // 새로 추출된 숫자들을 합계에 추가
        const newSum = numbers.reduce((sum, num) => sum + num, 0);
        const updatedSum = currentSum + newSum;

        // 추출된 숫자들을 기록에 추가 (최근 10개만 보관)
        const updatedNumbers = [
            ...currentNumbers,
            ...numbers.map((num) => ({
                value: num,
                text: selectedText,
                timestamp: new Date().toLocaleTimeString(),
            })),
        ].slice(-10);

        // 저장
        chrome.storage.local.set({
            totalSum: updatedSum,
            extractedNumbers: updatedNumbers,
            lastSelectedText: selectedText,
        });

        // 뱃지 업데이트 (총합 표시)
        chrome.action.setBadgeText({
            text: updatedSum.toString(),
        });

        chrome.action.setBadgeBackgroundColor({
            color: '#4CAF50',
        });

        console.log('Numbers added:', numbers, 'New total:', updatedSum);
    });
}
