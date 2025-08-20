// サンプルデータ - 本番環境では実際のAPI接続に置き換える
const SAMPLE_DATA = {
    // 生徒データ
    students: [
        {
            id: 'student001',
            name: '田中 太郎',
            grade: '高校2年',
            class: 'A組',
            profile: {
                strengths: ['数学', 'プログラミング', '論理的思考'],
                weaknesses: ['英語', '文章作成', 'プレゼンテーション'],
                favoriteSubjects: ['数学', '物理', '情報'],
                communicationStyle: 'チャット形式',
                characteristics: ['内向的', '分析好き', '集中力高い'],
                goals: '大学受験で理系学部に進学',
                dreams: 'AIエンジニアになりたい'
            },
            copilotLogs: generateCopilotLogs('田中 太郎', ['数学', 'プログラミング', '物理'], ['英語', '文章作成'])
        },
        {
            id: 'student002',
            name: '佐藤 花子',
            grade: '高校1年',
            class: 'B組',
            profile: {
                strengths: ['英語', '文学', 'コミュニケーション'],
                weaknesses: ['数学', '物理', '計算問題'],
                favoriteSubjects: ['英語', '国語', '歴史'],
                communicationStyle: '音声対話',
                characteristics: ['外向的', '創造的', '協調性高い'],
                goals: '英検1級合格',
                dreams: '国際的な仕事に就きたい'
            },
            copilotLogs: generateCopilotLogs('佐藤 花子', ['英語', '文学', '国語'], ['数学', '物理'])
        },
        {
            id: 'student003',
            name: '山田 一郎',
            grade: '高校3年',
            class: 'A組',
            profile: {
                strengths: ['化学', '生物', '実験'],
                weaknesses: ['古文', '漢文', '暗記'],
                favoriteSubjects: ['化学', '生物', '地学'],
                communicationStyle: 'ビデオ通話',
                characteristics: ['探究心旺盛', '慎重', '協力的'],
                goals: '医学部進学',
                dreams: '医師になって地域医療に貢献したい'
            },
            copilotLogs: generateCopilotLogs('山田 一郎', ['化学', '生物', '実験'], ['古文', '漢文'])
        },
        {
            id: 'student004',
            name: '鈴木 美咲',
            grade: '高校1年',
            class: 'C組',
            profile: {
                strengths: ['美術', 'デザイン', '創造性'],
                weaknesses: ['数学', '統計', '論理問題'],
                favoriteSubjects: ['美術', '音楽', '現代文'],
                communicationStyle: 'チャット形式',
                characteristics: ['芸術的', '感性豊か', '独創的'],
                goals: '美術大学進学',
                dreams: 'グラフィックデザイナーになりたい'
            },
            copilotLogs: generateCopilotLogs('鈴木 美咲', ['美術', 'デザイン', '創造性'], ['数学', '統計'])
        },
        {
            id: 'student005',
            name: '高橋 健太',
            grade: '高校2年',
            class: 'B組',
            profile: {
                strengths: ['体育', 'リーダーシップ', 'チームワーク'],
                weaknesses: ['理科', '実験', '細かい作業'],
                favoriteSubjects: ['体育', '現代社会', '倫理'],
                communicationStyle: '対面会話',
                characteristics: ['活発', 'リーダー気質', '社交的'],
                goals: '体育教師になる',
                dreams: '学校体育の指導者として生徒を育成したい'
            },
            copilotLogs: generateCopilotLogs('高橋 健太', ['体育', 'リーダーシップ', '現代社会'], ['理科', '実験'])
        },
        {
            id: 'student006',
            name: '渡辺 麻衣',
            grade: '高校3年',
            class: 'C組',
            profile: {
                strengths: ['国語', '文学', '読書'],
                weaknesses: ['数学', '計算', '公式'],
                favoriteSubjects: ['国語', '日本史', '倫理'],
                communicationStyle: 'チャット形式',
                characteristics: ['内省的', '思慮深い', '文学好き'],
                goals: '国語教師になる',
                dreams: '文学の素晴らしさを生徒に伝えたい'
            },
            copilotLogs: generateCopilotLogs('渡辺 麻衣', ['国語', '文学', '日本史'], ['数学', '計算'])
        },
        {
            id: 'student007',
            name: '伊藤 翔太',
            grade: '高校1年',
            class: 'A組',
            profile: {
                strengths: ['音楽', '楽器演奏', '作曲'],
                weaknesses: ['地理', '地図', '空間把握'],
                favoriteSubjects: ['音楽', '数学', '物理'],
                communicationStyle: 'ビデオ通話',
                characteristics: ['芸術的', '集中力高い', '創作好き'],
                goals: '音楽大学進学',
                dreams: '作曲家になって映画音楽を作りたい'
            },
            copilotLogs: generateCopilotLogs('伊藤 翔太', ['音楽', '作曲', '数学'], ['地理', '空間把握'])
        },
        {
            id: 'student008',
            name: '中村 智子',
            grade: '高校2年',
            class: 'A組',
            profile: {
                strengths: ['心理学', '人間観察', 'カウンセリング'],
                weaknesses: ['化学', '実験', '計算'],
                favoriteSubjects: ['現代社会', '倫理', '生物'],
                communicationStyle: '対面会話',
                characteristics: ['共感的', '聞き上手', '思いやり深い'],
                goals: '心理学を学ぶ',
                dreams: 'スクールカウンセラーになりたい'
            },
            copilotLogs: generateCopilotLogs('中村 智子', ['心理学', '現代社会', '生物'], ['化学', '実験'])
        },
        {
            id: 'student009',
            name: '小林 大輝',
            grade: '高校3年',
            class: 'B組',
            profile: {
                strengths: ['情報', 'プログラミング', 'システム設計'],
                weaknesses: ['古典', '暗記', '文法'],
                favoriteSubjects: ['情報', '数学', '英語'],
                communicationStyle: 'チャット形式',
                characteristics: ['論理的', '技術志向', '問題解決型'],
                goals: '情報系大学進学',
                dreams: 'システムエンジニアになってIT社会に貢献したい'
            },
            copilotLogs: generateCopilotLogs('小林 大輝', ['プログラミング', '情報', 'システム設計'], ['古典', '暗記'])
        },
        {
            id: 'student010',
            name: '加藤 愛美',
            grade: '高校1年',
            class: 'B組',
            profile: {
                strengths: ['家庭科', '調理', '栄養学'],
                weaknesses: ['物理', '力学', '計算'],
                favoriteSubjects: ['家庭科', '生物', '化学'],
                communicationStyle: 'ビデオ通話',
                characteristics: ['実践的', '世話好き', '丁寧'],
                goals: '栄養士の資格取得',
                dreams: '管理栄養士として健康な食生活を広めたい'
            },
            copilotLogs: generateCopilotLogs('加藤 愛美', ['家庭科', '調理', '栄養学'], ['物理', '力学'])
        },
        {
            id: 'student011',
            name: '松本 雄介',
            grade: '高校2年',
            class: 'C組',
            profile: {
                strengths: ['世界史', '地理', '文化研究'],
                weaknesses: ['数学', '統計', 'グラフ'],
                favoriteSubjects: ['世界史', '地理', '現代社会'],
                communicationStyle: 'チャット形式',
                characteristics: ['知識欲旺盛', '分析的', '国際的視野'],
                goals: '国際関係学を学ぶ',
                dreams: '外交官になって国際平和に貢献したい'
            },
            copilotLogs: generateCopilotLogs('松本 雄介', ['世界史', '地理', '国際関係'], ['数学', '統計'])
        },
        {
            id: 'student012',
            name: '木村 彩花',
            grade: '高校3年',
            class: 'A組',
            profile: {
                strengths: ['ダンス', 'パフォーマンス', '表現力'],
                weaknesses: ['理科', '実験', '観察'],
                favoriteSubjects: ['体育', '音楽', '現代文'],
                communicationStyle: '対面会話',
                characteristics: ['表現豊か', 'エネルギッシュ', '人を惹きつける'],
                goals: 'ダンサーになる',
                dreams: 'プロダンサーとして舞台で活躍したい'
            },
            copilotLogs: generateCopilotLogs('木村 彩花', ['ダンス', 'パフォーマンス', '表現'], ['理科', '実験'])
        },
        {
            id: 'student013',
            name: '清水 拓也',
            grade: '高校1年',
            class: 'C組',
            profile: {
                strengths: ['経済', 'ビジネス', '数字分析'],
                weaknesses: ['文学', '感情表現', '創作'],
                favoriteSubjects: ['現代社会', '数学', '英語'],
                communicationStyle: 'チャット形式',
                characteristics: ['合理的', 'ビジネス思考', '効率重視'],
                goals: '経済学部進学',
                dreams: '起業家になって社会問題を解決したい'
            },
            copilotLogs: generateCopilotLogs('清水 拓也', ['経済', 'ビジネス', '数字分析'], ['文学', '創作'])
        },
        {
            id: 'student014',
            name: '藤田 美波',
            grade: '高校2年',
            class: 'B組',
            profile: {
                strengths: ['写真', '映像制作', 'ビジュアル'],
                weaknesses: ['数学', '計算', '公式暗記'],
                favoriteSubjects: ['美術', '情報', '現代文'],
                communicationStyle: 'ビデオ通話',
                characteristics: ['視覚的', 'クリエイティブ', '技術志向'],
                goals: '映像制作を学ぶ',
                dreams: '映画監督になって感動作品を作りたい'
            },
            copilotLogs: generateCopilotLogs('藤田 美波', ['写真', '映像制作', '美術'], ['数学', '計算'])
        },
        {
            id: 'student015',
            name: '岡田 健斗',
            grade: '高校3年',
            class: 'C組',
            profile: {
                strengths: ['機械', '工学', '設計'],
                weaknesses: ['英語', '語学', 'コミュニケーション'],
                favoriteSubjects: ['物理', '数学', '技術'],
                communicationStyle: 'チャット形式',
                characteristics: ['技術志向', '実践的', '集中力高い'],
                goals: '工学部進学',
                dreams: 'エンジニアになってロボット開発に携わりたい'
            },
            copilotLogs: generateCopilotLogs('岡田 健斗', ['機械', '工学', '設計'], ['英語', '語学'])
        },
        {
            id: 'student016',
            name: '野村 さくら',
            grade: '高校1年',
            class: 'A組',
            profile: {
                strengths: ['園芸', '生物', '環境'],
                weaknesses: ['数学', '計算問題', '公式'],
                favoriteSubjects: ['生物', '地学', '家庭科'],
                communicationStyle: 'ビデオ通話',
                characteristics: ['自然愛好', '優しい', '観察力'],
                goals: '農学部進学',
                dreams: '環境保護に関わる仕事に就きたい'
            },
            copilotLogs: generateCopilotLogs('野村 さくら', ['園芸', '生物', '環境'], ['数学', '計算問題'])
        },
        {
            id: 'student017',
            name: '石川 竜太',
            grade: '高校2年',
            class: 'A組',
            profile: {
                strengths: ['スポーツ', '体力', '競技'],
                weaknesses: ['古典', '文語文', '暗記'],
                favoriteSubjects: ['体育', '現代社会', '生物'],
                communicationStyle: '対面会話',
                characteristics: ['活発', '競争心', 'チームプレイヤー'],
                goals: 'プロスポーツ選手',
                dreams: 'オリンピックに出場したい'
            },
            copilotLogs: generateCopilotLogs('石川 竜太', ['スポーツ', '体力', '競技'], ['古典', '文語文'])
        },
        {
            id: 'student018',
            name: '橋本 恵子',
            grade: '高校3年',
            class: 'B組',
            profile: {
                strengths: ['外国語', '文化交流', '国際理解'],
                weaknesses: ['数学', '理科', '計算'],
                favoriteSubjects: ['英語', '世界史', '現代文'],
                communicationStyle: 'ビデオ通話',
                characteristics: ['国際的', '語学センス', '文化的関心'],
                goals: '語学系大学進学',
                dreams: '通訳者になって国際会議で活躍したい'
            },
            copilotLogs: generateCopilotLogs('橋本 恵子', ['外国語', '文化交流', '英語'], ['数学', '理科'])
        },
        {
            id: 'student019',
            name: '森田 直樹',
            grade: '高校1年',
            class: 'B組',
            profile: {
                strengths: ['建築', 'デザイン', '空間設計'],
                weaknesses: ['生物', '暗記', '細かい知識'],
                favoriteSubjects: ['数学', '美術', '技術'],
                communicationStyle: 'チャット形式',
                characteristics: ['空間的', '設計思考', 'ビジョナリー'],
                goals: '建築学科進学',
                dreams: '建築家になって人々の生活を豊かにしたい'
            },
            copilotLogs: generateCopilotLogs('森田 直樹', ['建築', 'デザイン', '空間設計'], ['生物', '暗記'])
        },
        {
            id: 'student020',
            name: '池田 真理',
            grade: '高校2年',
            class: 'C組',
            profile: {
                strengths: ['看護', '医療', '人助け'],
                weaknesses: ['物理', '力学', '計算'],
                favoriteSubjects: ['生物', '化学', '現代社会'],
                communicationStyle: '対面会話',
                characteristics: ['思いやり深い', '責任感', 'ケア志向'],
                goals: '看護学部進学',
                dreams: '看護師になって患者さんをサポートしたい'
            },
            copilotLogs: generateCopilotLogs('池田 真理', ['看護', '医療', '生物'], ['物理', '力学'])
        },
        {
            id: 'student021',
            name: '山口 洋平',
            grade: '高校3年',
            class: 'A組',
            profile: {
                strengths: ['法律', '論理', '議論'],
                weaknesses: ['理科', '実験', '観察'],
                favoriteSubjects: ['現代社会', '倫理', '現代文'],
                communicationStyle: 'チャット形式',
                characteristics: ['論理的', '正義感', '説得力'],
                goals: '法学部進学',
                dreams: '弁護士になって社会正義を実現したい'
            },
            copilotLogs: generateCopilotLogs('山口 洋平', ['法律', '論理', '議論'], ['理科', '実験'])
        },
        {
            id: 'student022',
            name: '田村 光',
            grade: '高校1年',
            class: 'C組',
            profile: {
                strengths: ['料理', '味覚', '創作'],
                weaknesses: ['数学', 'グラフ', '統計'],
                favoriteSubjects: ['家庭科', '化学', '美術'],
                communicationStyle: 'ビデオ通話',
                characteristics: ['創造的', '手先器用', '味覚敏感'],
                goals: '調理師免許取得',
                dreams: 'シェフになって人々を料理で幸せにしたい'
            },
            copilotLogs: generateCopilotLogs('田村 光', ['料理', '味覚', '創作'], ['数学', 'グラフ'])
        },
        {
            id: 'student023',
            name: '坂本 美穂',
            grade: '高校2年',
            class: 'B組',
            profile: {
                strengths: ['ファッション', 'デザイン', 'トレンド'],
                weaknesses: ['古典', '文語', '暗記'],
                favoriteSubjects: ['美術', '現代文', '英語'],
                communicationStyle: 'チャット形式',
                characteristics: ['ファッショナブル', 'トレンド感度', '美的センス'],
                goals: 'ファッション業界就職',
                dreams: 'ファッションデザイナーになりたい'
            },
            copilotLogs: generateCopilotLogs('坂本 美穂', ['ファッション', 'デザイン', 'トレンド'], ['古典', '文語'])
        },
        {
            id: 'student024',
            name: '内田 健一',
            grade: '高校3年',
            class: 'C組',
            profile: {
                strengths: ['農業', '植物', '自然'],
                weaknesses: ['英語', '外国語', 'コミュニケーション'],
                favoriteSubjects: ['生物', '地学', '化学'],
                communicationStyle: '対面会話',
                characteristics: ['自然愛好', '実直', '忍耐強い'],
                goals: '農業大学進学',
                dreams: '農家になって安全な食材を提供したい'
            },
            copilotLogs: generateCopilotLogs('内田 健一', ['農業', '植物', '自然'], ['英語', '外国語'])
        },
        {
            id: 'student025',
            name: '長谷川 由美',
            grade: '高校1年',
            class: 'A組',
            profile: {
                strengths: ['保育', '子供', '教育'],
                weaknesses: ['数学', '計算', '公式'],
                favoriteSubjects: ['現代社会', '音楽', '美術'],
                communicationStyle: 'ビデオ通話',
                characteristics: ['子供好き', '面倒見良い', '明朗'],
                goals: '保育士資格取得',
                dreams: '保育士になって子供たちの成長を支えたい'
            },
            copilotLogs: generateCopilotLogs('長谷川 由美', ['保育', '子供', '教育'], ['数学', '計算'])
        },
        {
            id: 'student026',
            name: '平田 翔',
            grade: '高校2年',
            class: 'A組',
            profile: {
                strengths: ['ゲーム', 'プログラミング', 'ストーリー'],
                weaknesses: ['古典', '漢文', '暗記'],
                favoriteSubjects: ['情報', '数学', '現代文'],
                communicationStyle: 'チャット形式',
                characteristics: ['創造的', 'ゲーム好き', 'ストーリーテラー'],
                goals: 'ゲーム業界就職',
                dreams: 'ゲームクリエイターになって感動的な作品を作りたい'
            },
            copilotLogs: generateCopilotLogs('平田 翔', ['ゲーム', 'プログラミング', 'ストーリー'], ['古典', '漢文'])
        },
        {
            id: 'student027',
            name: '近藤 りな',
            grade: '高校3年',
            class: 'B組',
            profile: {
                strengths: ['観光', '地域', '文化'],
                weaknesses: ['物理', '計算', '公式'],
                favoriteSubjects: ['地理', '世界史', '現代社会'],
                communicationStyle: 'ビデオ通話',
                characteristics: ['社交的', '文化的関心', '旅行好き'],
                goals: '観光学部進学',
                dreams: '観光業で地域活性化に貢献したい'
            },
            copilotLogs: generateCopilotLogs('近藤 りな', ['観光', '地域', '文化'], ['物理', '計算'])
        },
        {
            id: 'student028',
            name: '吉田 海斗',
            grade: '高校1年',
            class: 'B組',
            profile: {
                strengths: ['海洋', '船舶', '航海'],
                weaknesses: ['国語', '文章読解', '古典'],
                favoriteSubjects: ['地学', '物理', '地理'],
                communicationStyle: '対面会話',
                characteristics: ['冒険心', '海好き', '実践的'],
                goals: '海洋学部進学',
                dreams: '船長になって世界の海を航海したい'
            },
            copilotLogs: generateCopilotLogs('吉田 海斗', ['海洋', '船舶', '航海'], ['国語', '文章読解'])
        },
        {
            id: 'student029',
            name: '小川 みどり',
            grade: '高校2年',
            class: 'C組',
            profile: {
                strengths: ['環境', '自然保護', 'エコロジー'],
                weaknesses: ['数学', '統計', 'データ分析'],
                favoriteSubjects: ['生物', '地学', '現代社会'],
                communicationStyle: 'チャット形式',
                characteristics: ['環境意識', '責任感', '持続可能志向'],
                goals: '環境学部進学',
                dreams: '環境保護活動家になって地球を守りたい'
            },
            copilotLogs: generateCopilotLogs('小川 みどり', ['環境', '自然保護', 'エコロジー'], ['数学', '統計'])
        },
        {
            id: 'student030',
            name: '横山 大樹',
            grade: '高校3年',
            class: 'A組',
            profile: {
                strengths: ['宇宙', '天文', '物理'],
                weaknesses: ['生物', '暗記', '細かい知識'],
                favoriteSubjects: ['物理', '数学', '地学'],
                communicationStyle: 'ビデオ通話',
                characteristics: ['好奇心旺盛', '理論志向', '宇宙好き'],
                goals: '宇宙工学を学ぶ',
                dreams: '宇宙飛行士になって宇宙を探査したい'
            },
            copilotLogs: generateCopilotLogs('横山 大樹', ['宇宙', '天文', '物理'], ['生物', '暗記'])
        }
    ],
    
    // 学習アドバイステンプレート
    adviceTemplates: {
        strengths: {
            mathematics: '数学が得意なあなたは、論理的思考力に優れています。この強みを活かして理系科目全般の理解を深めましょう。',
            english: '英語が得意なあなたは、国際的な視野を持っています。この強みを活かして他の言語学習にも挑戦してみましょう。',
            communication: 'コミュニケーション能力に優れているあなたは、グループ学習やプレゼンテーションで力を発揮できます。'
        },
        weaknesses: {
            mathematics: '数学が苦手な場合は、基礎から段階的に学習することが重要です。毎日少しずつでも継続することで必ず向上します。',
            english: '英語が苦手な場合は、まず興味のあるトピックから始めましょう。音楽や映画など好きなものを通じて学習すると効果的です。',
            presentation: 'プレゼンテーションが苦手な場合は、まず少人数での発表から始めて徐々に慣れていきましょう。'
        }
    }
};

// Copilotログ生成関数
function generateCopilotLogs(studentName, strengths, weaknesses) {
    const topics = [
        // 数学系
        '数学の微分問題', '積分の応用問題', '三角関数のグラフ', '確率と統計', '数列の問題',
        '複素数の計算', 'ベクトルの内積', '関数の極値', '数学的帰納法', '場合の数',
        
        // 英語系
        '英語の長文読解', '英作文の添削', 'リスニング対策', '英文法の質問', '語彙力向上',
        '英語プレゼンテーション', '英会話練習', '英検対策', 'TOEIC準備', '英語論文読解',
        
        // 理科系
        '物理の力学問題', '化学の化学式', '生物の遺伝', '地学の地震', '実験レポート',
        '化学反応式', '電気回路', '細胞分裂', '岩石の分類', '天体観測',
        
        // 国語系
        '古文の読解', '漢文の書き下し', '現代文の論説', '小説の分析', '詩の解釈',
        '文学史', '敬語の使い方', '作文指導', '読書感想文', '討論の準備',
        
        // 社会系
        '世界史の年表', '日本史の出来事', '地理の気候', '現代社会の問題', '政治制度',
        '経済の仕組み', '国際関係', '憲法の理解', '歴史人物', '地形図の読み方',
        
        // その他
        'プログラミング基礎', 'アルゴリズム', 'データベース', 'ネットワーク', 'AI技術',
        '美術技法', '音楽理論', '体育理論', '保健知識', '家庭科実習',
        '心理学基礎', '哲学思想', '倫理問題', '環境問題', '技術革新'
    ];

    const summaries = [
        '基本概念の理解に課題があり、より詳しい説明を求めた',
        '応用問題で躓いており、解法のパターンを学習したい',
        '理論は理解できているが、実践での適用が困難',
        '暗記項目が多く、効率的な学習方法を相談',
        'グループワークでの発表準備について相談',
        '試験対策として重要ポイントを確認',
        '他の科目との関連性について質問',
        '実生活での応用例について興味を示した',
        '将来の進路との関連で学習意欲を高めたい',
        '苦手意識があり、学習のモチベーション向上を図りたい'
    ];

    const adviceTemplates = [
        '基礎から段階的に学習し、理解を深めることを推奨します',
        '多くの問題に取り組み、パターンを覚えることが重要です',
        '実際の例を通じて理解を深めることをお勧めします',
        '視覚的な資料や図を活用して学習効果を高めましょう',
        '定期的な復習と自己確認テストを実施することを推奨します',
        '他の生徒との議論や教え合いを通じて理解を深めましょう',
        '興味のある分野から始めて学習意欲を維持しましょう',
        '小さな目標を設定して達成感を積み重ねることが大切です',
        '間違いを恐れず、積極的に質問することを心がけましょう',
        '継続的な学習習慣の確立が最も重要です'
    ];

    const logs = [];
    const baseDate = new Date('2025-01-01');
    
    // 50件のログを生成
    for (let i = 0; i < 50; i++) {
        // 日付を過去240日間の範囲でランダムに生成
        const randomDays = Math.floor(Math.random() * 240);
        const logDate = new Date(baseDate);
        logDate.setDate(logDate.getDate() + randomDays);
        
        // 強みと弱みに関連するトピックを選択
        let selectedTopic;
        if (i % 3 === 0 && strengths.length > 0) {
            // 強みに関連するトピック
            const strengthKeywords = strengths.join('|').toLowerCase();
            const relatedTopics = topics.filter(topic => 
                strengthKeywords.includes('数学') && topic.includes('数学') ||
                strengthKeywords.includes('英語') && topic.includes('英語') ||
                strengthKeywords.includes('物理') && topic.includes('物理') ||
                strengthKeywords.includes('化学') && topic.includes('化学') ||
                strengthKeywords.includes('生物') && topic.includes('生物') ||
                strengthKeywords.includes('プログラミング') && topic.includes('プログラミング') ||
                strengthKeywords.includes('美術') && topic.includes('美術') ||
                strengthKeywords.includes('音楽') && topic.includes('音楽')
            );
            selectedTopic = relatedTopics.length > 0 ? 
                relatedTopics[Math.floor(Math.random() * relatedTopics.length)] : 
                topics[Math.floor(Math.random() * topics.length)];
        } else if (i % 4 === 0 && weaknesses.length > 0) {
            // 弱みに関連するトピック
            const weaknessKeywords = weaknesses.join('|').toLowerCase();
            const relatedTopics = topics.filter(topic => 
                weaknessKeywords.includes('数学') && topic.includes('数学') ||
                weaknessKeywords.includes('英語') && topic.includes('英語') ||
                weaknessKeywords.includes('物理') && topic.includes('物理') ||
                weaknessKeywords.includes('化学') && topic.includes('化学') ||
                weaknessKeywords.includes('古典') && topic.includes('古文') ||
                weaknessKeywords.includes('文章') && topic.includes('作文')
            );
            selectedTopic = relatedTopics.length > 0 ? 
                relatedTopics[Math.floor(Math.random() * relatedTopics.length)] : 
                topics[Math.floor(Math.random() * topics.length)];
        } else {
            // ランダムなトピック
            selectedTopic = topics[Math.floor(Math.random() * topics.length)];
        }

        const log = {
            date: logDate.toISOString().split('T')[0],
            topic: selectedTopic,
            summary: summaries[Math.floor(Math.random() * summaries.length)],
            advice: adviceTemplates[Math.floor(Math.random() * adviceTemplates.length)]
        };
        
        logs.push(log);
    }
    
    // 日付順にソート（新しい順）
    return logs.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// データをグローバルに公開
window.SAMPLE_DATA = SAMPLE_DATA;