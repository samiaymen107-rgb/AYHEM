# ai_connector.py — ربط البيانات بالذكاء

from datetime import datetime

# ---------------------------
# ذاكرة الجلسة (Session Memory)
# ---------------------------
session_memory = []

def add_to_session(data):
    entry = {
        "session_id": len(session_memory)+1,
        "timestamp": datetime.now().isoformat(),
        "current_data": data
    }
    session_memory.append(entry)
    return entry

# ---------------------------
# الذاكرة الدائمة (Persistent Memory)
# ---------------------------
persistent_memory = []

def commit_to_persistent(entry):
    record = {
        "persistent_id": len(persistent_memory)+1,
        "recorded_data": entry["current_data"],
        "metadata": entry["timestamp"]
    }
    persistent_memory.append(record)
    return record

# ---------------------------
# التخزين الخارجي (External Storage)
# ---------------------------
external_storage = []

def backup_external(record):
    backup = {
        "external_id": len(external_storage)+1,
        "encrypted_backup": str(record),  # تبسيط التشفير كمثال
        "transfer_protocol": "local"
    }
    external_storage.append(backup)
    return backup

# ---------------------------
# وظيفة ذكية تربط كل شيء
# ---------------------------
def process_data(data):
    # إضافة للذاكرة الجلسة
    session_entry = add_to_session(data)
    
    # نقل للذاكرة الدائمة
    persistent_entry = commit_to_persistent(session_entry)
    
    # عمل نسخة خارجية
    backup_entry = backup_external(persistent_entry)
    
    # توقيع رمزي
    sig = "AYMEN × AI"
    
    return {
        "session": session_entry,
        "persistent": persistent_entry,
        "external": backup_entry,
        "signature": sig
    }

# مثال سريع
if __name__ == "__main__":
    result = process_data({"text": "تجربة ربط الذكاء"})
    print(result)
