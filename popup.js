// popup.js - 팝업 동작 스크립트

document.addEventListener('DOMContentLoaded', function () {
    const totalSumElement = document.getElementById('totalSum');
    const lastSelectionElement = document.getElementById('lastSelection');
    const numbersListElement = document.getElementById('numbersList');
    const resetBtnElement = document.getElementById('resetBtn');

    // 페이지 로드 시 데이터 가져오기
    loadData();

    // 리셋 버튼 이벤트 리스너
    resetBtnElement.addEventListener('click', function () {
        if (confirm('모든 데이터를 초기화하시겠습니까?')) {
            resetData();
        }
    });

    // 주기적으로 데이터 업데이트 (1초마다)
    setInterval(loadData, 1000);

    // 데이터 로드 함수
    function loadData() {
        chrome.runtime.sendMessage({ type: 'GET_DATA' }, function (response) {
            if (response) {
                updateUI(response);
            }
        });
    }

    // UI 업데이트 함수
    function updateUI(data) {
        // 총합 업데이트
        totalSumElement.textContent = formatNumber(data.totalSum || 0);

        // 마지막 선택된 텍스트 업데이트
        if (data.lastSelectedText) {
            lastSelectionElement.textContent = `"${data.lastSelectedText.substring(0, 50)}${data.lastSelectedText.length > 50 ? '...' : ''}"`;
        } else {
            lastSelectionElement.textContent = '드래그해서 숫자를 선택해보세요!';
        }

        // 최근 숫자 목록 업데이트
        updateNumbersList(data.extractedNumbers || []);
    }

    // 숫자 목록 업데이트 함수
    function updateNumbersList(numbers) {
        if (numbers.length === 0) {
            numbersListElement.innerHTML = '<div class="no-data">아직 추출된 숫자가 없습니다.</div>';
            return;
        }

        // 최근 순서로 정렬 (최신 것부터)
        const sortedNumbers = [...numbers].reverse();

        numbersListElement.innerHTML = sortedNumbers
            .map(
                (item) => `
      <div class="number-item">
        <div>
          <span class="number-value">${formatNumber(item.value)}</span>
          <div style="font-size: 10px; color: #999; margin-top: 2px;">
            "${item.text.substring(0, 30)}${item.text.length > 30 ? '...' : ''}"
          </div>
        </div>
        <div class="number-time">${item.timestamp}</div>
      </div>
    `
            )
            .join('');
    }

    // 숫자 포맷팅 함수
    function formatNumber(num) {
        if (num === 0) return '0';

        // 소수점 처리
        if (num % 1 !== 0) {
            return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
        }

        return num.toLocaleString();
    }

    // 데이터 리셋 함수
    function resetData() {
        chrome.runtime.sendMessage({ type: 'RESET_DATA' }, function (response) {
            if (response && response.success) {
                // UI 즉시 업데이트
                totalSumElement.textContent = '0';
                lastSelectionElement.textContent = '드래그해서 숫자를 선택해보세요!';
                numbersListElement.innerHTML = '<div class="no-data">아직 추출된 숫자가 없습니다.</div>';

                // 성공 메시지 표시
                showMessage('데이터가 초기화되었습니다!');
            }
        });
    }

    // 메시지 표시 함수
    function showMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.style.cssText = `
      position: fixed;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: #4CAF50;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 12px;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    `;
        messageElement.textContent = message;

        document.body.appendChild(messageElement);

        setTimeout(() => {
            messageElement.remove();
        }, 2000);
    }
});
