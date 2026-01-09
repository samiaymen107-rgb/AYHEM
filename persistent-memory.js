const persistentMemory = {
  storageKey: "ayhemPersistentMemory",
  data: [],

  // تحميل البيانات من LocalStorage أو بدء جديدة
  load: function() {
    const saved = localStorage.getItem(this.storageKey);
    this.data = saved ? JSON.parse(saved) : [];
  },

  // تخزين سؤال وإجابات AI
  saveEntry: function(question, answer) {
    const entry = {
      question,
      answer,
      timestamp: new Date().toISOString()
    };
    this.data.push(entry);
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  },

  // البحث عن أسئلة مشابهة لتحسين التنبؤ
  searchSimilar: function(query) {
    return this.data.filter(item => item.question.includes(query));
  }
};

// تحميل البيانات فور تشغيل الصفحة
persistentMemory.load();
