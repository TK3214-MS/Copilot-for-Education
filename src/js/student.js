// 生徒向けJavaScript機能

class StudentApp {
    constructor() {
        this.currentStudent = null;
        this.studyPlan = null;
        this.init();
    }

    async init() {
        try {
            // 現在の生徒データを読み込み（実際にはログイン機能で設定）
            this.currentStudent = await Utils.api.fetchStudentData('student001');
            this.renderDashboard();
            this.setupEventListeners();
        } catch (error) {
            console.error('初期化エラー:', error);
            Utils.ui.showError(document.getElementById('main-content'), '初期化に失敗しました。');
        }
    }

    setupEventListeners() {
        // 学習計画ボタン
        document.getElementById('create-plan-btn')?.addEventListener('click', () => {
            this.showStudyPlanModal();
        });

        // アドバイス詳細ボタン
        document.getElementById('advice-detail-btn')?.addEventListener('click', () => {
            this.showAdviceDetail();
        });

        // ログ表示ボタン
        document.getElementById('show-logs-btn')?.addEventListener('click', () => {
            this.toggleLogsSection();
        });
    }

    renderDashboard() {
        if (!this.currentStudent) return;

        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="container">
                <div class="grid grid-2">
                    <!-- 学習状況カード -->
                    <div class="card learning-status">
                        <h2 class="card-title">
                            <i class="fas fa-chart-line"></i>
                            あなたの学習状況
                        </h2>
                        <div class="profile-section">
                            <h3 style="color: #0056b3; margin-bottom: 0.5rem;">得意分野</h3>
                            <div class="tags-container">
                                ${this.currentStudent.profile.strengths.map(strength => 
                                    `<span class="strength-item">${strength}</span>`
                                ).join('')}
                            </div>
                        </div>
                        <div class="profile-section">
                            <h3 style="color: #cc6600; margin-bottom: 0.5rem;">改善点</h3>
                            <div class="tags-container">
                                ${this.currentStudent.profile.weaknesses.map(weakness => 
                                    `<span class="weakness-item">${weakness}</span>`
                                ).join('')}
                            </div>
                        </div>
                        <div class="profile-section">
                            <h3 style="color: #0056b3; margin-bottom: 0.5rem;">好きな科目</h3>
                            <div class="tags-container">
                                ${this.currentStudent.profile.favoriteSubjects.map(subject => 
                                    `<span class="strength-item">${subject}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- アドバイスカード -->
                    <div class="card advice-section">
                        <h2 class="card-title">
                            <i class="fas fa-lightbulb"></i>
                            今日のアドバイス
                        </h2>
                        ${this.generateAdvice()}
                        <button id="advice-detail-btn" class="btn btn-secondary mt-2">
                            詳細なアドバイスを見る
                        </button>
                    </div>

                    <!-- 目標・夢 -->
                    <div class="card">
                        <h2 class="card-title">
                            <i class="fas fa-star"></i>
                            あなたの目標
                        </h2>
                        <div class="profile-section">
                            <h3 style="color: #0056b3;">短期目標</h3>
                            <p>${this.currentStudent.profile.goals}</p>
                        </div>
                        <div class="profile-section">
                            <h3 style="color: #0056b3;">将来の夢</h3>
                            <p>${this.currentStudent.profile.dreams}</p>
                        </div>
                    </div>

                    <!-- 学習計画 -->
                    <div class="card study-plan">
                        <h2 class="card-title">
                            学習計画を立てよう
                        </h2>
                        <p>あなたの強みと弱点を分析して、効果的な学習計画を提案します。</p>
                        <div class="mt-2">
                            <button id="create-plan-btn" class="btn btn-primary">
                                学習計画を作成
                            </button>
                            <button id="show-logs-btn" class="btn btn-secondary">
                                学習履歴を確認
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 統計情報 -->
                <div class="grid grid-3 mt-3">
                    <div class="stat-card">
                        <span class="stat-number">${this.currentStudent.copilotLogs.length}</span>
                        <span class="stat-label">Copilotとの会話回数</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">${this.currentStudent.profile.strengths.length}</span>
                        <span class="stat-label">得意分野</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">${this.calculateProgressPercentage()}%</span>
                        <span class="stat-label">学習進捗</span>
                    </div>
                </div>

                <!-- 学習ログセクション（最初は非表示） -->
                <div id="logs-section" style="display: none;">
                    <div class="card mt-3">
                        <h2 class="card-title">
                            <i class="fas fa-history"></i>
                            最近の学習履歴
                        </h2>
                        <div id="logs-container">
                            ${this.renderLogs()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // アニメーションを適用
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                Animation.fadeIn(card);
            }, index * 100);
        });
    }

    generateAdvice() {
        if (!this.currentStudent) return '';

        const weaknesses = this.currentStudent.profile.weaknesses;
        const strengths = this.currentStudent.profile.strengths;
        
        let advice = '';
        
        // 弱点に対するアドバイス
        if (weaknesses.length > 0) {
            const weakness = weaknesses[0];
            if (weakness.includes('英語')) {
                advice += '<div class="advice-item"><span class="advice-icon">📚</span>英語学習のコツ：毎日少しずつでも英語に触れることが大切です。好きな映画や音楽から始めてみましょう。</div>';
            } else if (weakness.includes('数学')) {
                advice += '<div class="advice-item"><span class="advice-icon">🔢</span>数学学習のコツ：基礎からしっかり理解することが重要です。解けない問題があっても諦めずに、段階的に取り組みましょう。</div>';
            } else {
                advice += `<div class="advice-item"><span class="advice-icon">💡</span>${weakness}の改善：基礎から段階的に学習することで必ず向上します。</div>`;
            }
        }

        // 強みを活かすアドバイス
        if (strengths.length > 0) {
            const strength = strengths[0];
            advice += `<div class="advice-item"><span class="advice-icon">⭐</span>あなたの強みである${strength}を活かして、他の分野の学習にも応用してみましょう。</div>`;
        }

        return advice || '<p>継続的な学習を心がけて、バランスよく成長していきましょう！</p>';
    }

    renderLogs() {
        if (!this.currentStudent || !this.currentStudent.copilotLogs) return '';

        return this.currentStudent.copilotLogs
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(log => `
                <div class="log-item">
                    <div class="log-date">${Utils.getRelativeDate(log.date)}</div>
                    <div class="log-topic">${log.topic}</div>
                    <div class="log-summary">${log.summary}</div>
                    ${log.advice ? `<div class="advice-item mt-1"><span class="advice-icon">💡</span>${log.advice}</div>` : ''}
                </div>
            `).join('');
    }

    calculateProgressPercentage() {
        // 簡易的な進捗計算（実際にはより複雑な計算を行う）
        const totalLogs = this.currentStudent?.copilotLogs.length || 0;
        const strengths = this.currentStudent?.profile.strengths.length || 0;
        const weaknesses = this.currentStudent?.profile.weaknesses.length || 0;
        
        return Math.min(Math.round((totalLogs * 10 + strengths * 5) / (weaknesses * 2 + 1)), 100);
    }

    showStudyPlanModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;

        modal.innerHTML = `
            <div class="card" style="max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
                <h2 class="card-title">学習計画の提案</h2>
                <div id="study-plan-content">
                    ${this.generateStudyPlan()}
                </div>
                <div class="mt-3">
                    <button class="btn btn-primary" onclick="this.closest('.card').parentElement.remove()">
                        計画を保存
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.card').parentElement.remove()">
                        閉じる
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        Animation.fadeIn(modal);
    }

    generateStudyPlan() {
        if (!this.currentStudent) return '';

        const weaknesses = this.currentStudent.profile.weaknesses;
        const strengths = this.currentStudent.profile.strengths;

        let plan = '<div class="study-plan-content">';
        
        plan += '<h3 style="color: #0056b3;">今週の重点目標</h3>';
        if (weaknesses.length > 0) {
            plan += `<div class="goal-item">📖 ${weaknesses[0]}の基礎復習（毎日30分）</div>`;
        }
        if (strengths.length > 0) {
            plan += `<div class="goal-item">⭐ ${strengths[0]}の応用問題に挑戦（週3回）</div>`;
        }

        plan += '<h3 style="color: #0056b3; margin-top: 1.5rem;">推奨学習スケジュール</h3>';
        const schedule = [
            '月曜日: 基礎復習 + 得意分野の応用',
            '火曜日: 弱点科目の集中学習',
            '水曜日: 復習テスト',
            '木曜日: 新しい分野の学習',
            '金曜日: 総合復習',
            '土曜日: 好きな科目の深掘り',
            '日曜日: 次週の計画立て'
        ];

        schedule.forEach(item => {
            plan += `<div class="schedule-item" style="padding: 0.5rem; margin: 0.25rem 0; background: #f0f8ff; border-left: 3px solid #007acc; border-radius: 4px;">${item}</div>`;
        });

        plan += '</div>';
        return plan;
    }

    showAdviceDetail() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;

        modal.innerHTML = `
            <div class="card" style="max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
                <h2 class="card-title">詳細なアドバイス</h2>
                <div class="advice-detail-content">
                    ${this.generateDetailedAdvice()}
                </div>
                <button class="btn btn-primary mt-3" onclick="this.closest('.card').parentElement.remove()">
                    閉じる
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        Animation.fadeIn(modal);
    }

    generateDetailedAdvice() {
        if (!this.currentStudent) return '';

        let advice = '';
        const profile = this.currentStudent.profile;

        // 強みを活かすアドバイス
        advice += '<h3 style="color: #0056b3;">強みを更に伸ばすために</h3>';
        profile.strengths.forEach(strength => {
            if (strength.includes('数学')) {
                advice += '<div class="advice-item">📊 数学の強みを活かして、物理や化学の計算問題にも挑戦してみましょう。</div>';
            } else if (strength.includes('英語')) {
                advice += '<div class="advice-item">🌍 英語力を活かして、海外のニュースや文献を読んでみましょう。</div>';
            } else {
                advice += `<div class="advice-item">⭐ ${strength}の知識を他の分野にも応用してみましょう。</div>`;
            }
        });

        // 弱点克服のアドバイス
        advice += '<h3 style="color: #cc6600; margin-top: 1.5rem;">弱点克服のステップ</h3>';
        profile.weaknesses.forEach((weakness, index) => {
            advice += `<div class="weakness-advice">
                <h4>Step ${index + 1}: ${weakness}の改善</h4>
                <ul style="margin-left: 1rem;">
                    <li>基礎概念の復習から始める</li>
                    <li>毎日少しずつでも継続する</li>
                    <li>理解できない部分は積極的に質問する</li>
                    <li>定期的に理解度をチェックする</li>
                </ul>
            </div>`;
        });

        return advice;
    }

    toggleLogsSection() {
        const logsSection = document.getElementById('logs-section');
        const btn = document.getElementById('show-logs-btn');
        
        if (logsSection.style.display === 'none') {
            logsSection.style.display = 'block';
            Animation.slideDown(logsSection);
            btn.textContent = '学習履歴を隠す';
        } else {
            logsSection.style.display = 'none';
            btn.textContent = '学習履歴を確認';
        }
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('student-theme')) {
        window.studentApp = new StudentApp();
    }
});