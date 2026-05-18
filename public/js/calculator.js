class Calculator {
    constructor() {
        this.previousOperandElement = document.getElementById('previousOperand');
        this.currentOperandElement = document.getElementById('currentOperand');
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.initEventListeners();
        this.updateDisplay();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+': computation = prev + current; break;
            case '-': computation = prev - current; break;
            case '*': computation = prev * current; break;
            case '/': 
                if (current === 0) {
                    this.showToast('Tidak bisa dibagi 0!', 'error');
                    return;
                }
                computation = prev / current;
                break;
            case '%': computation = prev % current; break;
            default: return;
        }
        
        this.currentOperand = Math.round(computation * 1000000) / 1000000;
        this.currentOperand = this.currentOperand.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentOperandElement.textContent = this.currentOperand;
        if (this.operation != null) {
            const symbols = { '+': '+', '-': '−', '*': '×', '/': '÷', '%': '%' };
            this.previousOperandElement.textContent = `${this.previousOperand} ${symbols[this.operation]}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.style.background = type === 'success' ? '#10b981' : '#ef4444';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    initEventListeners() {
        // Number buttons
        document.querySelectorAll('[data-number]').forEach(btn => {
            btn.addEventListener('click', () => this.appendNumber(btn.dataset.number));
        });

        // Operator buttons
        document.querySelectorAll('[data-operator]').forEach(btn => {
            btn.addEventListener('click', () => this.chooseOperation(btn.dataset.operator));
        });

        // Function buttons
        document.querySelector('[data-action="clear"]')?.addEventListener('click', () => this.clear());
        document.querySelector('[data-action="delete"]')?.addEventListener('click', () => this.delete());
        document.querySelector('[data-action="equals"]')?.addEventListener('click', () => this.compute());

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (/[0-9]/.test(e.key)) this.appendNumber(e.key);
            if (e.key === '.') this.appendNumber('.');
            if (e.key === '+') this.chooseOperation('+');
            if (e.key === '-') this.chooseOperation('-');
            if (e.key === '*') this.chooseOperation('*');
            if (e.key === '/') this.chooseOperation('/');
            if (e.key === '%') this.chooseOperation('%');
            if (e.key === 'Enter' || e.key === '=') this.compute();
            if (e.key === 'Backspace') this.delete();
            if (e.key === 'Escape') this.clear();
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.calculator = new Calculator();
});