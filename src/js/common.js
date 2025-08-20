// 共通JavaScript機能

// ユーティリティ関数
const Utils = {
    // 日付フォーマット
    formatDate: (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // 相対日付表示
    getRelativeDate: (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return '昨日';
        if (diffDays === 0) return '今日';
        if (diffDays <= 7) return `${diffDays}日前`;
        return Utils.formatDate(dateString);
    },

    // ローカルストレージ操作
    storage: {
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('ストレージへの保存に失敗:', error);
                return false;
            }
        },

        get: (key, defaultValue = null) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error('ストレージからの読み込みに失敗:', error);
                return defaultValue;
            }
        },

        remove: (key) => {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.error('ストレージからの削除に失敗:', error);
                return false;
            }
        }
    },

    // API呼び出し（サンプル実装）
    api: {
        // Microsoft 365 Copilotからのデータ取得（模擬）
        fetchCopilotLogs: async (studentId) => {
            // 本番環境では実際のAPI呼び出しを実装
            if (CONFIG.DEBUG_MODE) {
                // サンプルデータを返す
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const student = SAMPLE_DATA.students.find(s => s.id === studentId);
                        resolve(student ? student.copilotLogs : []);
                    }, 500);
                });
            }
            
            try {
                const response = await fetch(`${CONFIG.COPILOT_API_URL}/logs/${studentId}`, {
                    headers: {
                        'Authorization': `Bearer ${this.getAuthToken()}`,
                        'Content-Type': 'application/json'
                    }
                });
                return await response.json();
            } catch (error) {
                console.error('Copilotログの取得に失敗:', error);
                throw error;
            }
        },

        // 生徒データの取得
        fetchStudentData: async (studentId) => {
            if (CONFIG.DEBUG_MODE) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const student = SAMPLE_DATA.students.find(s => s.id === studentId);
                        resolve(student || null);
                    }, 300);
                });
            }

            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}/students/${studentId}`, {
                    headers: {
                        'Authorization': `Bearer ${this.getAuthToken()}`,
                        'Content-Type': 'application/json'
                    }
                });
                return await response.json();
            } catch (error) {
                console.error('生徒データの取得に失敗:', error);
                throw error;
            }
        },

        // 全生徒データの取得
        fetchAllStudents: async () => {
            if (CONFIG.DEBUG_MODE) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(SAMPLE_DATA.students);
                    }, 500);
                });
            }

            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}/students`, {
                    headers: {
                        'Authorization': `Bearer ${this.getAuthToken()}`,
                        'Content-Type': 'application/json'
                    }
                });
                return await response.json();
            } catch (error) {
                console.error('生徒データの取得に失敗:', error);
                throw error;
            }
        },

        // 認証トークンの取得（Microsoft 365認証）
        getAuthToken: () => {
            // 本番環境ではMicrosoft 365の認証フローを実装
            return Utils.storage.get('auth_token', 'dummy-token');
        }
    },

    // UI操作ヘルパー
    ui: {
        // ローディング表示
        showLoading: (element) => {
            element.innerHTML = '<div class="loading"></div>';
        },

        // エラー表示
        showError: (element, message) => {
            element.innerHTML = `
                <div style="color: #dc3545; text-align: center; padding: 2rem;">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>${message}</p>
                </div>
            `;
        },

        // 成功メッセージ表示
        showSuccess: (message) => {
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 4px;
                z-index: 1000;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            `;
            toast.textContent = message;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.remove();
            }, 3000);
        },

        // スムーズスクロール
        smoothScrollTo: (element) => {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
};

// アニメーション機能
const Animation = {
    // フェードイン
    fadeIn: (element, duration = 300) => {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },

    // スライドダウン
    slideDown: (element, duration = 300) => {
        element.style.height = '0';
        element.style.overflow = 'hidden';
        element.style.display = 'block';
        
        const fullHeight = element.scrollHeight;
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.height = (fullHeight * progress) + 'px';
            
            if (progress >= 1) {
                element.style.height = 'auto';
                element.style.overflow = 'visible';
            } else {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
};

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    console.log('School Life Assistant アプリケーション開始');
    
    // 最終ログイン時刻を記録
    Utils.storage.set(CONFIG.STORAGE_KEYS.LAST_LOGIN, new Date().toISOString());
});

// グローバルに公開
window.Utils = Utils;
window.Animation = Animation;