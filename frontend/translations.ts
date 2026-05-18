export const translations = {
  en: {
    // Header
    auditSubtitle: "AI Citation Auditor",
    howItWorks: "How it works",
    aboutLink: "About",
    previewBadge: "Free Research Preview",

    // Hero
    heroTitle: "Verify Academic Citations",
    heroTitleHighlight: "Instantly",
    heroDesc: "Don't let AI hallucinations ruin your research. Paste your text below to audit citations against real academic databases.",

    // Input Column
    inputLabel: "Input Source",
    inputSubLabel: "Supports ChatGPT, Claude, Gemini",
    tryExampleBtn: "🎲 Try Example",
    placeholder: "Paste text here...\nExample: 'As discussed by Ekman (1999) in his study on basic emotions...'",
    charCount: "characters",
    checkBtn: "Check Citations",
    verifyingBtn: "Verifying...",

    // Result Column
    reportLabel: "Audit Report",
    readyTitle: "Ready to verify",
    readyDesc: "Paste any academic text on the left. Veru will cross-reference citations against 250M+ real papers.",
    processingTitle: "Running forensic analysis...",
    processingDesc: "Connecting to OpenAlex & Google Search",
    noCitationsTitle: "No citations detected",
    noCitationsDesc: "Try pasting a text that contains references like 'Author (Year)' or 'Title by Author'.",

    // Audit Cards (UI Labels)
    sourceMatch: "Source Match",
    viewFullText: "View Full Text",
    confidence: "Conf.",

    // Status Labels (UI Only)
    status: {
      REAL: "REAL",
      FAKE: "FAKE",
      MISMATCH: "MISMATCH",
      UNVERIFIED: "UNVERIFIED",
      SUSPICIOUS: "SUSPICIOUS",
      MINOR_ERROR: "MINOR ERROR"
    },

    // Veru Write teaser
    veruWriteBadge: "Coming soon",
    veruWriteTitle: "Introducing Veru Write",
    veruWriteDesc: "An AI writing assistant that drafts academic content with real, verified sources built in — so you never have to audit citations after the fact.",
    veruWritePt1: "Retrieves real papers before generating prose",
    veruWritePt2: "Every citation verified by Veru Audit",
    veruWritePt3: "Zero hallucinated references",
    veruWriteLearnMore: "Learn more about Veru Write",

    // Features Section
    whyTitle: "Why use Veru?",
    whyDesc: "ChatGPT and other LLMs often hallucinate citations. Veru acts as your forensic auditor.",
    feat1Title: "Real Database Check",
    feat1Desc: "We cross-reference every citation against <strong>OpenAlex</strong>, a massive database of 250 million+ academic works.",
    feat2Title: "Anti-Hallucination",
    feat2Desc: "Our \"Auditor\" AI compares the user's claim against the <strong>actual abstract</strong> to detect mismatched or fake summaries.",
    feat3Title: "Google Grounding",
    feat3Desc: "If a paper isn't in the database, we use <strong>Google Search</strong> to perform a final forensic sweep of the web.",

    // History Drawer
    historyTitle: "Audit History",
    noHistoryTitle: "No history yet",
    noHistoryDesc: "Your recent audits will appear here",
    clearHistory: "Clear History",
    citationsCount: "citations",
    fakeDetected: "FAKE DETECTED",

    // Footer
    rightsReserved: "All rights reserved.",

    // Survey Widget
    surveyNudgeTitle: "Got 1 minute?",
    surveyNudgeDesc: "Help us build a better Veru — take a quick 4-question survey.",
    surveyNudgeCta: "Sure, let's go",
    surveyNudgeDismiss: "Maybe later",
    surveyTitle: "Quick Survey",
    surveySubtitle: "4 questions · under 1 minute",
    surveyProgress: "Question {current} of {total}",
    surveyNext: "Next",
    surveyBack: "Back",
    surveySubmit: "Submit",
    surveyThanksTitle: "Thank you!",
    surveyThanksDesc: "Your feedback helps us shape Veru into something truly useful.",
    surveyClose: "Close",
    surveySelectMax: "Select up to {max}",
    surveyOtherPlaceholder: "Please specify...",
    surveyQ1: "What tool do you usually use to write academic documents?",
    surveyQ1Options: ["Google Docs", "Microsoft Word", "Overleaf / LaTeX", "Markdown", "Notion", "ChatGPT / Gemini / Claude", "Other"],
    surveyQ2: "What are your biggest pain points in academic writing? (Choose up to 2)",
    surveyQ2Options: ["Citation verification", "Finding reliable sources", "Formatting", "LaTeX / Overleaf complexity", "Exporting to PDF / LaTeX", "AI-generated citations", "Collaboration", "Other"],
    surveyQ3: "If Veru could let you check citations while writing, would you be interested?",
    surveyQ3Options: ["Yes, I would try it.", "Maybe, depending on the workflow.", "No, I only need citation checking after writing."],
    surveyQ4: "How would you best describe your role?",
    surveyQ4Options: ["Undergraduate student", "Graduate student", "Researcher", "Professor / TA", "Other"],
  },

  zh: {
    // Header
    auditSubtitle: "AI 引用核查工具",
    howItWorks: "工作原理",
    aboutLink: "关于我们",
    previewBadge: "免费预览版",

    // Hero
    heroTitle: "即刻核查学术引用",
    heroTitleHighlight: "真实性",
    heroDesc: "别让 AI 幻觉毁了你的研究。粘贴文本，立即在权威学术数据库中进行法医级审计。",

    // Input Column
    inputLabel: "输入来源",
    inputSubLabel: "支持 ChatGPT, Claude, Gemini",
    tryExampleBtn: "🎲 试试示例",
    placeholder: "在此粘贴文本...\n示例：'正如 Ekman (1999) 在其关于基本情绪的研究中所述...'",
    charCount: "字符",
    checkBtn: "开始核查",
    verifyingBtn: "核查中...",

    // Result Column
    reportLabel: "审计报告",
    readyTitle: "准备就绪",
    readyDesc: "在左侧粘贴任何学术文本。Veru 将在 2.5 亿+ 篇真实论文库中进行交叉比对。",
    processingTitle: "正在进行法医级分析...",
    processingDesc: "正在连接 OpenAlex 与 Google Search",
    noCitationsTitle: "未检测到引用",
    noCitationsDesc: "请尝试粘贴包含“作者 (年份)”或“文献标题”的文本。",

    // Audit Cards (UI Labels)
    sourceMatch: "匹配来源",
    viewFullText: "查看全文",
    confidence: "置信度",

    // Status Labels (汉化映射)
    status: {
      REAL: "真实存在 (REAL)",
      FAKE: "虚假文献 (FAKE)",
      MISMATCH: "内容不符 (MISMATCH)",
      UNVERIFIED: "无法验证 (UNVERIFIED)",
      SUSPICIOUS: "疑似捏造 (SUSPICIOUS)",
      MINOR_ERROR: "轻微错误 (MINOR ERROR)"
    },

    // Veru Write teaser
    veruWriteBadge: "即将推出",
    veruWriteTitle: "Veru Write 即将上线",
    veruWriteDesc: "AI 学术写作助手，在生成内容的同时嵌入真实、可核查的引用——让你无需事后再审查。",
    veruWritePt1: "先检索真实论文，再生成文本",
    veruWritePt2: "每条引用均经 Veru Audit 自动核查",
    veruWritePt3: "零幻觉引用",
    veruWriteLearnMore: "了解更多关于 Veru Write",

    // Features Section
    whyTitle: "为什么选择 Veru？",
    whyDesc: "ChatGPT 等大模型经常编造（幻觉）引用。Veru 是您的学术法医审计员。",
    feat1Title: "真实数据库核验",
    feat1Desc: "我们将每一个引用与包含 2.5 亿+ 学术成果的 <strong>OpenAlex</strong> 数据库进行交叉比对。",
    feat2Title: "反幻觉机制",
    feat2Desc: "我们的“审计 AI”会对比用户声称的内容与<strong>真实摘要</strong>，精准识别“缝合怪”或编造的总结。",
    feat3Title: "Google 全网兜底",
    feat3Desc: "如果数据库中未收录，我们将调用 <strong>Google Search</strong> 进行全网法医级扫描。",

    // History Drawer
    historyTitle: "审计历史",
    noHistoryTitle: "暂无历史记录",
    noHistoryDesc: "您最近的审计记录将显示在这里",
    clearHistory: "清除历史",
    citationsCount: "条引用",
    fakeDetected: "发现虚假",

    // Footer
    rightsReserved: "保留所有权利。",

    // Survey Widget
    surveyNudgeTitle: "花一分钟帮帮我们？",
    surveyNudgeDesc: "只需回答 4 个问题，帮助我们打造更好的 Veru。",
    surveyNudgeCta: "好啊，去做",
    surveyNudgeDismiss: "下次再说",
    surveyTitle: "快速问卷",
    surveySubtitle: "4 个问题 · 不到 1 分钟",
    surveyProgress: "第 {current} 题，共 {total} 题",
    surveyNext: "下一题",
    surveyBack: "上一题",
    surveySubmit: "提交",
    surveyThanksTitle: "感谢你！",
    surveyThanksDesc: "你的反馈将帮助我们把 Veru 打造成真正有用的工具。",
    surveyClose: "关闭",
    surveySelectMax: "最多选 {max} 项",
    surveyOtherPlaceholder: "请填写...",
    surveyQ1: "你通常用什么工具写学术文档？",
    surveyQ1Options: ["Google Docs", "Microsoft Word", "Overleaf / LaTeX", "Markdown", "Notion", "ChatGPT / Gemini / Claude", "其他"],
    surveyQ2: "你在学术写作中最大的痛点是什么？（最多选 2 项）",
    surveyQ2Options: ["引用核查", "寻找可靠来源", "格式排版", "LaTeX / Overleaf 复杂度", "导出为 PDF / LaTeX", "AI 生成的引用", "协作", "其他"],
    surveyQ3: "如果 Veru 可以让你一边写作、一边自动检查引用，你会感兴趣吗？",
    surveyQ3Options: ["会，我会试试。", "也许，取决于具体工作流程。", "不，我只需要在写完后检查引用。"],
    surveyQ4: "你如何描述自己的身份？",
    surveyQ4Options: ["本科生", "研究生", "研究人员", "教授 / 助教", "其他"],
  }
};

export type Language = 'en' | 'zh';
export type Translation = typeof translations.en;