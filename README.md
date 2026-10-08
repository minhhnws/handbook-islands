# Handbook Learning Harness Engineering (EN / VI)

> Comprehensive Handbook & Practical Guide based on [`walkinglabs/learn-harness-engineering`](https://github.com/walkinglabs/learn-harness-engineering) tailored for modern agent architectures, with deep-dive integration for **Pi Coding Agent** (`harness-pi`).

---

## 🌐 Languages / Ngôn ngữ

- [English Handbook & Lessons](#english-overview)
- [Cẩm nang & Bài học Tiếng Việt](#tong-quan-tieng-viet)

---

<a id="english-overview"></a>
## 🇬🇧 English Overview

**Harness Engineering** is the discipline of designing and managing the external environment, persistent state, strict verification gates, instruction architectures, and execution constraints around AI coding agents.

> **Fundamental Law of Harness Engineering:**  
> $$\text{Agent Reliability} = f(\text{Model Weights}, \text{Harness Infrastructure})$$  
> A capable model in a poor harness will hallucinate, suffer amnesia, and fail. The same model inside a production-grade harness works deterministically on long-running complex software engineering tasks.

### 📚 Structure & Content Navigation

```
harness-pi/
├── handbook/
│   ├── en/                                # English Handbook
│   │   ├── 01-introduction-to-harness-engineering.md
│   │   ├── 02-the-five-core-subsystems.md
│   │   ├── 03-the-five-file-standard.md
│   │   ├── 04-implementing-harness-on-projects.md
│   │   ├── 05-pi-agent-harness-deep-dive.md
│   │   └── 06-loop-and-graph-engineering.md
│   └── vi/                                # Vietnamese Handbook
│       ├── 01-gioi-thieu-ve-harness-engineering.md
│       ├── 02-nam-he-thong-con-cot-loi.md
│       ├── 03-tieu-chuan-bo-5-tep-harness.md
│       ├── 04-trien-khai-harness-vao-du-an.md
│       ├── 05-phan-tich-chuyen-sau-pi-agent-harness.md
│       └── 06-ky-thuat-vong-lap-va-do-thi.md
├── lessons/
│   ├── en/                                # 14 Lectures & 8 Projects in English
│   │   ├── 01-lectures-summary-L01-L14.md
│   │   └── 02-projects-guide-P01-P08.md
│   └── vi/                                # 14 Bài giảng & 8 Dự án thực hành (Tiếng Việt)
│       ├── 01-tong-hop-bai-hoc-L01-L14.md
│       └── 02-huong-dan-thuc-hanh-P01-P08.md
└── templates/                             # Ready-to-use Harness Templates
    ├── AGENTS.md
    ├── feature_list.json
    ├── progress.md
    ├── init.sh
    └── session-handoff.md
```

### 🚀 Core Takeaways
1. **The 5-Subsystem Architecture**: Instructions, State, Verification, Scope Isolation, Session Continuity.
2. **The 5-File Standard**: `AGENTS.md`, `feature_list.json`, `progress.md`, `init.sh`, `session-handoff.md`.
3. **Pi Agent Philosophy**: Minimal core + fully programmable extensions (lifecycle hooks, pluggable compaction, session trees, on-demand skills).
4. **Autonomous Execution**: Evolution from single agent runs to Maker-Checker loops (Loop Engineering) and DAG multi-agent graphs (Graph Engineering).

---

<a id="tong-quan-tieng-viet"></a>
## 🇻🇳 Tổng quan Tiếng Việt

**Kỹ thuật Harness (Harness Engineering)** là ngành kiến trúc thiết kế môi trường bên ngoài, cơ chế lưu trữ trạng thái, các cổng kiểm chứng cơ học (verification gates), cấu trúc chỉ dẫn và giới hạn phạm vi thực thi bao bọc xung quanh các AI Coding Agent.

> **Định luật cốt lõi của Harness Engineering:**  
> $$\text{Độ tin cậy của Agent} = f(\text{Trọng số mô hình}, \text{Hạ tầng Harness})$$  
> Khi AI Agent thất bại trong các bài toán kéo dài nhiều phiên làm việc, nguyên nhân thường không nằm ở năng lực mô hình, mà là do suy thoái ngữ cảnh, chứng "mất trí nhớ phiên" (session amnesia) và thiếu các chốt kiểm tra cơ học.

### 📌 Lộ trình nghiên cứu nhanh:
1. **[Cẩm nang lý thuyết (Handbook)](harness-pi/handbook/vi/01-gioi-thieu-ve-harness-engineering.md)**: Hiểu tường tận 5 hệ thống con và bộ tiêu chuẩn 5 tệp.
2. **[Phân tích chuyên sâu Pi Agent](harness-pi/handbook/vi/05-phan-tich-chuyen-sau-pi-agent-harness.md)**: Cách Pi biến toàn bộ runtime thành bề mặt lập trình mở rộng qua Hooks, Compaction tùy biến và Cây phiên (Session Tree).
3. **[Tóm tắt 14 bài giảng (L01-L14)](harness-pi/lessons/vi/01-tong-hop-bai-hoc-L01-L14.md)**: Hệ thống hóa toàn bộ kiến thức của khóa học.
4. **[Hướng dẫn 8 dự án thực hành (P01-P08)](harness-pi/lessons/vi/02-huong-dan-thuc-hanh-P01-P08.md)**: Các bước triển khai thực tế trên dự án.
5. **[Mẫu tệp chuẩn (Templates)](harness-pi/templates/)**: Bộ khung 5 tệp sẵn sàng sao chép vào dự án của bạn.

