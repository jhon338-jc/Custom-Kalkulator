class CustomCSSManager {
    constructor() {
        this.textarea = document.getElementById('cssInput');
        this.styleElement = document.getElementById('custom-css');
        this.applyBtn = document.getElementById('applyBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.aiPrompt = document.getElementById('aiPrompt');
        this.copyPromptBtn = document.getElementById('copyPromptBtn');
        this.generateBtn = document.getElementById('generateWithAI');
        
        this.init();
    }
    
    init() {
        this.loadSavedCSS();
        this.addEventListeners();
        this.setupAIPrompt();
    }
    
    loadSavedCSS() {
        const savedCSS = localStorage.getItem('customCalculatorCSS');
        if (savedCSS) {
            this.textarea.value = savedCSS;
            this.applyCSS(savedCSS);
        } else {
            // Default COMIC PUNK theme
            const defaultCSS = `.calculator {
    background-color: #3d1d5a;
    border: 4px solid #000000;
    border-radius: 20px;
    box-shadow: 10px 10px 0 #000000;
}
.display {
    background-color: #000000;
    color: #00e5ff;
    border-bottom: 3px solid #fbc02d;
}
.previous-operand { color: #fbc02d; }
.current-operand { font-size: 2rem; font-family: monospace; }
.btn {
    background-color: #1a092c;
    border: 2px solid #000000;
    border-radius: 12px;
    color: #ffffff;
}
.btn:active { transform: translate(3px, 3px); }
.btn-operator { background-color: #00e5ff; color: #000000; }
.btn-function { background-color: #fbc02d; color: #000000; }
.btn-equals { background-color: #00e5ff; color: #000000; }`;
            this.textarea.value = defaultCSS;
            this.applyCSS(defaultCSS);
        }
    }
    
    applyCSS(css) {
        if (!css || css.trim() === '') {
            this.styleElement.textContent = '';
            return;
        }
        this.styleElement.textContent = css;
        this.showToast('✨ CSS berhasil diterapkan!');
    }
    
    saveCSS(css) {
        localStorage.setItem('customCalculatorCSS', css);
    }
    
    resetToDefault() {
        if (confirm('Yakin ingin mereset semua CSS custom?')) {
            localStorage.removeItem('customCalculatorCSS');
            this.loadSavedCSS();
            this.showToast('🔄 CSS direset ke default');
        }
    }
    
    clearTextarea() {
        this.textarea.value = '';
        this.textarea.focus();
        this.showToast('✏️ Textarea dibersihkan');
    }
    
    setupAIPrompt() {
        // Ganti isi prompt sesuai perintah JHON
        this.aiPrompt.value = `BUATKAN SAYA KODE CSS UNTUK TAMPILAN KALKULATOR`;
        
        this.copyPromptBtn.addEventListener('click', () => {
            this.aiPrompt.select();
            document.execCommand('copy');
            this.showToast('📋 Prompt berhasil disalin! Tempelkan ke ChatGPT/Claude/Gemini');
        });
        
        this.generateBtn.addEventListener('click', () => {
            const prompt = this.aiPrompt.value;
            if (prompt) {
                navigator.clipboard.writeText(prompt);
                this.showToast('✅ Prompt disalin! Buka ChatGPT/Claude/Gemini dan tempelkan');
                if (confirm('Buka ChatGPT untuk generate CSS? (Klik OK untuk membuka)')) {
                    window.open('https://chat.openai.com', '_blank');
                }
            }
        });
    }
    
    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }
    
    addEventListeners() {
        this.applyBtn.addEventListener('click', () => {
            const css = this.textarea.value;
            this.applyCSS(css);
            this.saveCSS(css);
        });
        
        this.resetBtn.addEventListener('click', () => this.resetToDefault());
        this.clearBtn.addEventListener('click', () => this.clearTextarea());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.customCSSManager = new CustomCSSManager();
});
