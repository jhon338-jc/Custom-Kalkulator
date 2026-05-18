class CustomCSSManager {
    constructor() {
        this.textarea = document.getElementById('cssInput');
        this.styleElement = document.getElementById('custom-css');
        this.applyBtn = document.getElementById('applyBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.templateBtns = document.querySelectorAll('.template-card');
        
        this.init();
    }
    
    init() {
        this.loadSavedCSS();
        this.addEventListeners();
        this.setupTemplates();
    }
    
    loadSavedCSS() {
        // Ambil dari localStorage
        const savedCSS = localStorage.getItem('customCalculatorCSS');
        if (savedCSS) {
            this.textarea.value = savedCSS;
            this.applyCSS(savedCSS);
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
        // Simpan ke localStorage
        localStorage.setItem('customCalculatorCSS', css);
    }
    
    resetToDefault() {
        if (confirm('Yakin ingin mereset semua CSS custom?')) {
            this.textarea.value = '';
            this.styleElement.textContent = '';
            localStorage.removeItem('customCalculatorCSS');
            this.showToast('🔄 CSS direset ke default');
        }
    }
    
    clearTextarea() {
        this.textarea.value = '';
        this.textarea.focus();
        this.showToast('✏️ Textarea dibersihkan');
    }
    
    loadTemplate(templateName) {
        const templates = {
            neon: `.calculator {
    background: #0a0a0a;
    border: 2px solid #00ff00;
    box-shadow: 0 0 30px rgba(0,255,0,0.3);
    border-radius: 20px;
}

.display {
    background: #001a00;
    color: #00ff00;
    font-family: 'Courier New', monospace;
    text-shadow: 0 0 5px #00ff00;
}

.btn {
    background: #1a1a1a;
    color: #00ff00;
    border: 1px solid #00ff00;
    border-radius: 10px;
    transition: all 0.2s;
}

.btn:hover {
    background: #00ff00;
    color: #0a0a0a;
    box-shadow: 0 0 10px #00ff00;
    transform: scale(1.05);
}

.btn-equals {
    background: #00ff00;
    color: #0a0a0a;
    font-weight: bold;
}`,
            dark: `.calculator {
    background: #1a1a2e;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.display {
    background: #0f0f1a;
    color: #e94560;
}

.btn {
    background: #16213e;
    color: #e94560;
    border-radius: 12px;
    transition: all 0.2s;
}

.btn:hover {
    background: #e94560;
    color: #16213e;
}

.btn-operator {
    color: #ff6b6b;
}

.btn-equals {
    background: #e94560;
    color: white;
}`,
            glass: `.calculator {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    border: 1px solid rgba(255,255,255,0.2);
}

.display {
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(5px);
    color: white;
}

.btn {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(5px);
    color: white;
    border-radius: 15px;
    transition: all 0.2s;
}

.btn:hover {
    background: rgba(255,255,255,0.2);
    transform: translateY(-2px);
}

.btn-equals {
    background: linear-gradient(135deg, #667eea, #764ba2);
}`,
            retro: `.calculator {
    background: #2b2b2b;
    border: 4px solid #00ff00;
    box-shadow: 8px 8px 0 #00ff00;
    border-radius: 0;
}

.display {
    background: #000000;
    color: #00ff00;
    font-family: 'Courier New', monospace;
    border: 2px solid #00ff00;
}

.btn {
    background: #1a1a1a;
    color: #00ff00;
    border-radius: 0;
    font-family: monospace;
    border: 1px solid #00ff00;
    transition: all 0.2s;
}

.btn:hover {
    background: #00ff00;
    color: #000000;
}

.btn-equals {
    background: #00ff00;
    color: #000000;
}`,
            minimal: `.calculator {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.display {
    background: #f8f9fa;
    color: #212529;
}

.btn {
    background: #ffffff;
    color: #495057;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    transition: all 0.2s;
}

.btn:hover {
    background: #f8f9fa;
}

.btn-operator {
    color: #0d6efd;
}

.btn-equals {
    background: #0d6efd;
    color: white;
}`,
            sunset: `.calculator {
    background: linear-gradient(135deg, #ff6b6b, #feca57);
    border-radius: 30px;
}

.display {
    background: rgba(0,0,0,0.2);
    color: #fff4e6;
}

.btn {
    background: rgba(255,255,255,0.2);
    color: #fff4e6;
    border-radius: 50%;
    margin: 4px;
    transition: all 0.2s;
}

.btn:hover {
    background: rgba(255,255,255,0.4);
    transform: rotate(3deg);
}

.btn-operator {
    background: rgba(255,107,107,0.8);
}

.btn-equals {
    background: #feca57;
    color: #ff6b6b;
}`,
            cyberpunk: `.calculator {
    background: #0ff0fe;
    border: 3px solid #ff00ff;
    box-shadow: 10px 10px 0 #ff00ff;
    border-radius: 0;
}

.display {
    background: #000000;
    color: #0ff0fe;
    font-family: monospace;
    border-bottom: 2px solid #ff00ff;
}

.btn {
    background: #1a0033;
    color: #0ff0fe;
    border-radius: 0;
    font-family: monospace;
    clip-path: polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%);
    transition: all 0.2s;
}

.btn:hover {
    background: #ff00ff;
    color: #0ff0fe;
    transform: skewX(-5deg);
}

.btn-equals {
    background: #ff00ff;
    color: #0ff0fe;
}`
        };
        
        const css = templates[templateName];
        if (css) {
            this.textarea.value = css;
            this.applyCSS(css);
            this.saveCSS(css);
            this.showToast(`✅ Template "${templateName}" diterapkan!`);
        }
    }
    
    setupTemplates() {
        this.templateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const template = btn.dataset.template;
                this.loadTemplate(template);
            });
        });
    }
    
    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.style.background = '#10b981';
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }
    
    addEventListeners() {
        // Apply button
        this.applyBtn.addEventListener('click', () => {
            const css = this.textarea.value;
            this.applyCSS(css);
            this.saveCSS(css);
        });
        
        // Reset button
        this.resetBtn.addEventListener('click', () => this.resetToDefault());
        
        // Clear button
        this.clearBtn.addEventListener('click', () => this.clearTextarea());
    }
}

// Initialize CustomCSSManager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.customCSSManager = new CustomCSSManager();
});