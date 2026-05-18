class CustomCSSManager {
    constructor() {
        this.textarea = document.getElementById('cssInput');
        this.styleElement = document.getElementById('custom-css');
        this.applyBtn = document.getElementById('applyBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.templateBtns = document.querySelectorAll('.template-card');
        this.aiPrompt = document.getElementById('aiPrompt');
        this.copyPromptBtn = document.getElementById('copyPromptBtn');
        this.generateBtn = document.getElementById('generateWithAI');
        
        this.init();
    }
    
    init() {
        this.loadSavedCSS();
        this.addEventListeners();
        this.setupTemplates();
        this.setupAIPrompt();
    }
    
    loadSavedCSS() {
        const savedCSS = localStorage.getItem('customCalculatorCSS');
        if (savedCSS) {
            this.textarea.value = savedCSS;
            this.applyCSS(savedCSS);
        } else {
            // Set default dark purple theme
            const defaultCSS = `.calculator {
    background: linear-gradient(135deg, #2d1b4e, #1a0b2e);
    border-radius: 28px;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
    border: 1px solid rgba(124, 58, 237, 0.3);
}

.display {
    background: #0f0720;
    color: #e9d5ff;
}

.previous-operand {
    color: #c084fc;
}

.current-operand {
    color: #e9d5ff;
}

.btn {
    background: #2d1b4e;
    color: #e9d5ff;
    border-radius: 16px;
}

.btn-number {
    background: #1a1030;
}

.btn-operator {
    background: #3b1e6b;
    color: #c084fc;
}

.btn-function {
    color: #f472b6;
}

.btn-equals {
    background: linear-gradient(135deg, #7c3aed, #a78bfa);
    color: white;
}

.btn:hover {
    transform: scale(1.02);
    background: #7c3aed;
}`;
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
            this.textarea.value = '';
            this.styleElement.textContent = '';
            localStorage.removeItem('customCalculatorCSS');
            this.loadSavedCSS();
            this.showToast('🔄 CSS direset ke default dark ungu');
        }
    }
    
    clearTextarea() {
        this.textarea.value = '';
        this.textarea.focus();
        this.showToast('✏️ Textarea dibersihkan');
    }
    
    setupAIPrompt() {
        // Set default prompt
        this.aiPrompt.value = `"Buatkan CSS untuk kalkulator dengan tema dark purple galaxy, warna ungu keemasan, tombol bulat elegan, efek glow, font modern sci-fi, border gradient, hover effect scale"`;
        
        // Copy prompt button
        this.copyPromptBtn.addEventListener('click', () => {
            this.aiPrompt.select();
            document.execCommand('copy');
            this.showToast('📋 Prompt berhasil disalin! Tempelkan ke ChatGPT/Claude/Gemini');
        });
        
        // Generate button - open AI
        this.generateBtn.addEventListener('click', () => {
            const prompt = this.aiPrompt.value;
            if (prompt) {
                // Copy prompt to clipboard and open AI
                navigator.clipboard.writeText(prompt);
                this.showToast('✅ Prompt disalin! Buka ChatGPT/Claude/Gemini dan tempelkan');
                
                // Optional: open ChatGPT
                if (confirm('Buka ChatGPT untuk generate CSS? (Klik OK untuk membuka)')) {
                    window.open('https://chat.openai.com', '_blank');
                }
            }
        });
    }
    
    loadTemplate(templateName) {
        const templates = {
            'dark-purple': `.calculator {
    background: linear-gradient(135deg, #2d1b4e, #1a0b2e);
    border-radius: 28px;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
    border: 1px solid rgba(124, 58, 237, 0.3);
}
.display { background: #0f0720; color: #e9d5ff; }
.btn { background: #2d1b4e; color: #e9d5ff; border-radius: 16px; }
.btn-number { background: #1a1030; }
.btn-operator { background: #3b1e6b; color: #c084fc; }
.btn-function { color: #f472b6; }
.btn-equals { background: linear-gradient(135deg, #7c3aed, #a78bfa); color: white; }
.btn:hover { transform: scale(1.02); background: #7c3aed; }`,
            
            neon: `.calculator {
    background: #0a0a0a;
    border: 2px solid #00ff00;
    box-shadow: 0 0 30px rgba(0,255,0,0.3);
    border-radius: 20px;
}
.display { background: #001a00; color: #00ff00; font-family: monospace; text-shadow: 0 0 5px #00ff00; }
.btn { background: #1a1a1a; color: #00ff00; border: 1px solid #00ff00; border-radius: 10px; }
.btn:hover { background: #00ff00; color: #0a0a0a; box-shadow: 0 0 10px #00ff00; transform: scale(1.05); }
.btn-equals { background: #00ff00; color: #0a0a0a; }`,
            
            glass: `.calculator {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    border: 1px solid rgba(255,255,255,0.2);
}
.display { background: rgba(0,0,0,0.3); backdrop-filter: blur(5px); color: white; }
.btn { background: rgba(255,255,255,0.1); backdrop-filter: blur(5px); color: white; border-radius: 15px; }
.btn:hover { background: rgba(255,255,255,0.2); transform: translateY(-2px); }
.btn-equals { background: linear-gradient(135deg, #667eea, #764ba2); }`,
            
            galaxy: `.calculator {
    background: radial-gradient(circle at 30% 10%, #1a0033, #0a0015);
    border: 1px solid #ffd700;
    box-shadow: 0 0 40px rgba(255,215,0,0.2);
    border-radius: 30px;
}
.display { background: rgba(0,0,0,0.5); color: #ffd700; font-family: 'Orbitron', monospace; text-shadow: 0 0 10px #ffd700; }
.btn { background: rgba(26,0,51,0.8); color: #ffd700; border-radius: 50%; border: 1px solid #ffd700; }
.btn:hover { background: #ffd700; color: #1a0033; transform: rotate(3deg) scale(1.05); }
.btn-equals { background: #ffd700; color: #1a0033; }`,
            
            minimal: `.calculator {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.display { background: #f8f9fa; color: #212529; }
.btn { background: #ffffff; color: #495057; border-radius: 8px; border: 1px solid #e9ecef; }
.btn:hover { background: #f8f9fa; }
.btn-operator { color: #0d6efd; }
.btn-equals { background: #0d6efd; color: white; }`,
            
            sunset: `.calculator {
    background: linear-gradient(135deg, #ff6b6b, #feca57);
    border-radius: 30px;
}
.display { background: rgba(0,0,0,0.2); color: #fff4e6; }
.btn { background: rgba(255,255,255,0.2); color: #fff4e6; border-radius: 50%; margin: 4px; }
.btn:hover { background: rgba(255,255,255,0.4); transform: rotate(3deg); }
.btn-operator { background: rgba(255,107,107,0.8); }
.btn-equals { background: #feca57; color: #ff6b6b; }`
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
