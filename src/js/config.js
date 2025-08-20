// 設定ファイル - API接続情報等の変数定義
const CONFIG = {
    // API エンドポイント
    API_BASE_URL: 'https://api.example.com/v1',
    COPILOT_API_URL: 'https://copilot-api.example.com',
    
    // Microsoft 365 Copilot 設定
    MICROSOFT_365_CLIENT_ID: 'your-client-id-here',
    MICROSOFT_365_TENANT_ID: 'your-tenant-id-here',
    
    // アプリケーション設定
    APP_NAME: 'School Life Assistant',
    VERSION: '1.0.0',
    
    // デバッグ設定
    DEBUG_MODE: true,
    
    // データ更新間隔（分）
    DATA_REFRESH_INTERVAL: 30,
    
    // UI設定
    ANIMATION_DURATION: 300,
    
    // ローカルストレージキー
    STORAGE_KEYS: {
        USER_PREFERENCES: 'school_app_user_prefs',
        CACHED_DATA: 'school_app_cached_data',
        LAST_LOGIN: 'school_app_last_login'
    }
};

// 設定をグローバルに公開
window.CONFIG = CONFIG;