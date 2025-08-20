// 教員向けJavaScript機能

class TeacherApp {
    constructor() {
        this.students = [];
        this.selectedStudent = null;
        this.filters = {
            grade: '',
            class: '',
            search: ''
        };
        this.init();
    }

    async init() {
        try {
            await this.loadStudents();
            this.renderDashboard();
            this.setupEventListeners();
        } catch (error) {
            console.error('初期化エラー:', error);
            Utils.ui.showError(document.getElementById('main-content'), '初期化に失敗しました。');
        }
    }

    async loadStudents() {
        try {
            Utils.ui.showLoading(document.getElementById('main-content'));
            this.students = await Utils.api.fetchAllStudents();
        } catch (error) {
            console.error('生徒データの読み込みエラー:', error);
            throw error;
        }
    }

    setupEventListeners() {
        // フィルタ要素のイベントリスナー
        document.getElementById('grade-filter')?.addEventListener('change', (e) => {
            this.filters.grade = e.target.value;
            this.filterAndRenderStudents();
        });

        document.getElementById('class-filter')?.addEventListener('change', (e) => {
            this.filters.class = e.target.value;
            this.filterAndRenderStudents();
        });

        document.getElementById('search-input')?.addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.filterAndRenderStudents();
        });

        // エクスポートボタン
        document.getElementById('export-btn')?.addEventListener('click', () => {
            this.exportStudentData();
        });
    }

    renderDashboard() {
        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="container">
                <!-- ダッシュボード統計 -->
                <div class="dashboard-stats">
                    <div class="stat-widget">
                        <span class="stat-value">${this.students.length}</span>
                        <span class="stat-description">総生徒数</span>
                    </div>
                    <div class="stat-widget">
                        <span class="stat-value">${this.getActiveStudentsCount()}</span>
                        <span class="stat-description">アクティブ生徒</span>
                    </div>
                    <div class="stat-widget">
                        <span class="stat-value">${this.getAverageLogCount()}</span>
                        <span class="stat-description">平均相談回数</span>
                    </div>
                    <div class="stat-widget">
                        <span class="stat-value">${this.getUniqueGrades().length}</span>
                        <span class="stat-description">対象学年</span>
                    </div>
                </div>

                <!-- フィルタセクション -->
                <div class="filter-section">
                    <h3 style="color: #1e7e34; margin-bottom: 1rem;">生徒フィルタ</h3>
                    <div class="filter-row">
                        <div class="filter-group">
                            <label class="form-label">学年</label>
                            <select id="grade-filter" class="form-input">
                                <option value="">全ての学年</option>
                                ${this.getUniqueGrades().map(grade => 
                                    `<option value="${grade}">${grade}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="filter-group">
                            <label class="form-label">クラス</label>
                            <select id="class-filter" class="form-input">
                                <option value="">全てのクラス</option>
                                ${this.getUniqueClasses().map(cls => 
                                    `<option value="${cls}">${cls}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="filter-group">
                            <label class="form-label">検索</label>
                            <input type="text" id="search-input" class="form-input" placeholder="生徒名で検索...">
                        </div>
                        <div class="filter-group">
                            <label class="form-label">&nbsp;</label>
                            <button id="export-btn" class="btn btn-secondary">
                                <i class="fas fa-download"></i> エクスポート
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 生徒一覧 -->
                <div id="students-container">
                    ${this.renderStudentsList()}
                </div>

                <!-- 生徒詳細モーダル用の空間 -->
                <div id="student-detail-modal"></div>
            </div>
        `;

        // アニメーション適用
        this.animateElements();
    }

    renderStudentsList() {
        const filteredStudents = this.getFilteredStudents();
        
        if (filteredStudents.length === 0) {
            return '<div class="text-center" style="padding: 2rem; color: #6c757d;">該当する生徒が見つかりません。</div>';
        }

        return `
            <div class="student-list">
                ${filteredStudents.map(student => this.renderStudentCard(student)).join('')}
            </div>
        `;
    }

    renderStudentCard(student) {
        const lastLogDate = student.copilotLogs.length > 0 
            ? Utils.getRelativeDate(student.copilotLogs[0].date)
            : '記録なし';

        return `
            <div class="student-card" onclick="teacherApp.showStudentDetail('${student.id}')">
                <div class="student-header">
                    <div>
                        <div class="student-name">${student.name}</div>
                        <div style="color: #6c757d; font-size: 0.9rem;">${student.grade} ${student.class}</div>
                    </div>
                    <div class="student-grade">${student.copilotLogs.length}回相談</div>
                </div>
                
                <div class="student-info">
                    <div style="margin-bottom: 0.5rem;">
                        <strong>得意分野:</strong>
                        <div class="profile-tags">
                            ${student.profile.strengths.slice(0, 3).map(strength => 
                                `<span class="tag tag-strength">${strength}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 0.5rem;">
                        <strong>目標:</strong> ${student.profile.goals}
                    </div>
                    
                    <div style="color: #6c757d; font-size: 0.85rem;">
                        最終相談: ${lastLogDate}
                    </div>
                </div>
            </div>
        `;
    }

    getFilteredStudents() {
        return this.students.filter(student => {
            const matchesGrade = !this.filters.grade || student.grade === this.filters.grade;
            const matchesClass = !this.filters.class || student.class === this.filters.class;
            const matchesSearch = !this.filters.search || 
                student.name.toLowerCase().includes(this.filters.search.toLowerCase());
            
            return matchesGrade && matchesClass && matchesSearch;
        });
    }

    filterAndRenderStudents() {
        const container = document.getElementById('students-container');
        container.innerHTML = this.renderStudentsList();
        this.animateElements();
    }

    showStudentDetail(studentId) {
        const student = this.students.find(s => s.id === studentId);
        if (!student) return;

        this.selectedStudent = student;
        
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
            overflow-y: auto;
            padding: 20px;
        `;

        modal.innerHTML = `
            <div class="card" style="max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2 class="card-title" style="margin: 0;">${student.name} の詳細情報</h2>
                    <button onclick="this.closest('.card').parentElement.remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
                </div>
                
                ${this.renderStudentDetailContent(student)}
            </div>
        `;

        document.body.appendChild(modal);
        Animation.fadeIn(modal);
    }

    renderStudentDetailContent(student) {
        return `
            <div class="student-profile">
                <!-- 基本情報 -->
                <div class="profile-section">
                    <div class="profile-title">
                        <i class="fas fa-user profile-icon"></i>
                        基本情報
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div><strong>学年:</strong> ${student.grade}</div>
                        <div><strong>クラス:</strong> ${student.class}</div>
                        <div><strong>コミュニケーションスタイル:</strong> ${student.profile.communicationStyle}</div>
                    </div>
                </div>

                <!-- 学習特性 -->
                <div class="profile-section">
                    <div class="profile-title">
                        <i class="fas fa-star profile-icon"></i>
                        得意分野
                    </div>
                    <div class="profile-tags">
                        ${student.profile.strengths.map(strength => 
                            `<span class="tag tag-strength">${strength}</span>`
                        ).join('')}
                    </div>
                </div>

                <div class="profile-section">
                    <div class="profile-title">
                        <i class="fas fa-exclamation-triangle profile-icon"></i>
                        改善が必要な分野
                    </div>
                    <div class="profile-tags">
                        ${student.profile.weaknesses.map(weakness => 
                            `<span class="tag tag-weakness">${weakness}</span>`
                        ).join('')}
                    </div>
                </div>

                <!-- 好きな科目 -->
                <div class="profile-section">
                    <div class="profile-title">
                        <i class="fas fa-heart profile-icon"></i>
                        好きな科目
                    </div>
                    <div class="profile-tags">
                        ${student.profile.favoriteSubjects.map(subject => 
                            `<span class="tag tag-subject">${subject}</span>`
                        ).join('')}
                    </div>
                </div>

                <!-- 性格特性 -->
                <div class="profile-section">
                    <div class="profile-title">
                        <i class="fas fa-brain profile-icon"></i>
                        性格特性
                    </div>
                    <div class="profile-tags">
                        ${student.profile.characteristics.map(char => 
                            `<span class="tag tag-characteristic">${char}</span>`
                        ).join('')}
                    </div>
                </div>

                <!-- 目標と夢 -->
                <div class="goals-section">
                    <div class="profile-title">
                        <i class="fas fa-bullseye profile-icon"></i>
                        目標と将来の夢
                    </div>
                    <div class="goal-item">
                        <div class="goal-label">短期目標</div>
                        <div class="goal-content">${student.profile.goals}</div>
                    </div>
                    <div class="goal-item">
                        <div class="goal-label">将来の夢</div>
                        <div class="goal-content">${student.profile.dreams}</div>
                    </div>
                </div>

                <!-- Copilot会話ログ -->
                <div class="communication-log">
                    <div class="log-header">
                        <i class="fas fa-comments"></i>
                        Copilot との会話履歴 (${student.copilotLogs.length}件)
                    </div>
                    ${student.copilotLogs.map(log => `
                        <div class="log-entry">
                            <div class="log-meta">
                                <span class="log-topic">${log.topic}</span>
                                <span class="log-date">${Utils.formatDate(log.date)}</span>
                            </div>
                            <div class="log-content">
                                <div style="margin-bottom: 0.5rem;"><strong>相談内容:</strong> ${log.summary}</div>
                                ${log.advice ? `<div style="color: #28a745;"><strong>アドバイス:</strong> ${log.advice}</div>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- アクションボタン -->
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="teacherApp.generateStudentReport('${student.id}')">
                        <i class="fas fa-file-alt"></i> レポート生成
                    </button>
                    <button class="btn btn-secondary" onclick="teacherApp.scheduleFollowUp('${student.id}')">
                        <i class="fas fa-calendar"></i> フォローアップ予定
                    </button>
                    <button class="btn btn-secondary" onclick="teacherApp.sendMessage('${student.id}')">
                        <i class="fas fa-envelope"></i> メッセージ送信
                    </button>
                </div>
            </div>
        `;
    }

    generateStudentReport(studentId) {
        const student = this.students.find(s => s.id === studentId);
        if (!student) return;

        const report = {
            studentName: student.name,
            grade: student.grade,
            class: student.class,
            generatedAt: new Date().toISOString(),
            summary: {
                strengths: student.profile.strengths,
                weaknesses: student.profile.weaknesses,
                goals: student.profile.goals,
                dreams: student.profile.dreams,
                totalCopilotSessions: student.copilotLogs.length
            },
            recommendations: this.generateRecommendations(student)
        };

        // JSON形式でダウンロード
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${student.name}_学習レポート_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        Utils.ui.showSuccess('レポートが生成されました');
    }

    generateRecommendations(student) {
        const recommendations = [];

        // 弱点に基づく推奨事項
        student.profile.weaknesses.forEach(weakness => {
            recommendations.push(`${weakness}の基礎復習を重点的に行うことを推奨します。`);
        });

        // 強みを活かす提案
        student.profile.strengths.forEach(strength => {
            recommendations.push(`${strength}の強みを活かして、関連分野の応用学習を促進することを推奨します。`);
        });

        // Copilot利用状況に基づく提案
        if (student.copilotLogs.length < 3) {
            recommendations.push('Copilotをより積極的に活用することで、学習効果の向上が期待できます。');
        }

        return recommendations;
    }

    scheduleFollowUp(studentId) {
        Utils.ui.showSuccess(`${this.selectedStudent.name}さんのフォローアップを予定に追加しました`);
    }

    sendMessage(studentId) {
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
            z-index: 1001;
        `;

        modal.innerHTML = `
            <div class="card" style="max-width: 500px; width: 90%;">
                <h3 class="card-title">メッセージ送信</h3>
                <div class="form-group">
                    <label class="form-label">宛先: ${this.selectedStudent.name}</label>
                </div>
                <div class="form-group">
                    <label class="form-label">件名</label>
                    <input type="text" class="form-input" placeholder="件名を入力">
                </div>
                <div class="form-group">
                    <label class="form-label">メッセージ</label>
                    <textarea class="form-input" rows="5" placeholder="メッセージを入力"></textarea>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-primary" onclick="this.closest('.card').parentElement.remove(); teacherApp.sendMessageAction();">
                        送信
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.card').parentElement.remove();">
                        キャンセル
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    sendMessageAction() {
        Utils.ui.showSuccess('メッセージを送信しました');
    }

    exportStudentData() {
        const data = {
            exportDate: new Date().toISOString(),
            totalStudents: this.students.length,
            students: this.students.map(student => ({
                ...student,
                summary: {
                    strengthsCount: student.profile.strengths.length,
                    weaknessesCount: student.profile.weaknesses.length,
                    copilotSessionsCount: student.copilotLogs.length
                }
            }))
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `生徒データ一覧_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        Utils.ui.showSuccess('データをエクスポートしました');
    }

    // ヘルパーメソッド
    getActiveStudentsCount() {
        return this.students.filter(student => student.copilotLogs.length > 0).length;
    }

    getAverageLogCount() {
        const totalLogs = this.students.reduce((sum, student) => sum + student.copilotLogs.length, 0);
        return Math.round(totalLogs / this.students.length) || 0;
    }

    getUniqueGrades() {
        return [...new Set(this.students.map(student => student.grade))].sort();
    }

    getUniqueClasses() {
        return [...new Set(this.students.map(student => student.class))].sort();
    }

    animateElements() {
        const cards = document.querySelectorAll('.student-card, .stat-widget');
        cards.forEach((card, index) => {
            setTimeout(() => {
                Animation.fadeIn(card);
            }, index * 50);
        });
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('teacher-theme')) {
        window.teacherApp = new TeacherApp();
    }
});