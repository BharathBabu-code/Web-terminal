const terminalContainer = document.getElementById('terminal');
const commandInput = document.getElementById('command-input');
const outputLog = document.getElementById('output-log');

terminalContainer.addEventListener('click', () => {
    commandInput.focus();
});

commandInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const rawInput = commandInput.value.trim(); 
        
        printHistoryLine(rawInput);        
        commandInput.value = '';
        terminalContainer.scrollTop = terminalContainer.scrollHeight;
    }
});

function printHistoryLine(inputString) {
    const historyLine = document.createElement('div');
    historyLine.classList.add('input-line'); 
    
    historyLine.innerHTML = `
        <span class="prompt">guest@device:~$</span>
        <span class="command-text">${inputString}</span>
    `;
    
    outputLog.appendChild(historyLine);
}