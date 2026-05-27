---
name: date-a-historical
description: Script writing skill for "Date a Historical" — time-displacement comedy series. Use when writing, reviewing, or fixing scripts for the show: checking dialogue naturalness, character voice consistency, and historical-language accuracy. Also handles shotlist and production workflow via `shotlist builder`.
---

# Date a Historical — Script & Production Skill

"Date a Historical" is a time-displacement comedy series. Historical figures (Turing, Tesla, …) are transported into a modern dating-show setting. Comedy comes from collision of eras, vocabularies, and worldviews.

---

## SHOTLIST / PRODUCTION WORKFLOW

Trigger the full AI video production workflow with: `shotlist builder`
Full production guidelines are documented in `~/CLAUDE.md`.

---

## COMEDY RULES / 對白原則

### 對白自然度：念出來測試

寫完**每一句**英文對白，都要在腦中「念出來」或想像一個真人會不會這樣講。
**文法正確、但沒有真人會這樣說**的句子 = AI 腔，必須改。
中文翻譯同理：避免翻譯腔（生硬、直譯、書面）。

#### 常見 AI 腔徵兆（看到就改）

1. **不及物動詞硬當完整句**
   - ❌ "It initiated."（initiate 是及物動詞，單獨用很僵）
   - ✅ "It moved first." / "It started."
   - ❌「它主動了。」→ ✅「它先動作。」

2. **過度技術／論文措辭塞進口語**
   - ❌ "Are you a sufficiently convincing transmission of one?"
   - ✅ "Are you a real person, or a very convincing copy of one?"

3. **刻意的修飾贅詞 / 文謅謅的細節**
   - ❌ "They've listed how it thinks, on the side of the carton, in grey."
   - ✅ "They've printed how it thinks. On the side of the box."

4. **翻譯腔中文**：直譯英文語序、用書面詞而非口語
   - ❌「它主動了」「我看不到你們任何一個」（生硬）
   - ✅ 用台灣口語白話，照人實際會講的方式

---

### 關鍵分辨：AI 腔 ≠ 角色腔（不要誤砍）

有些「不像日常人話」的句子，其實是**角色設定**，不是 bug。動了反而失味。

| 句子 | 判定 | 原因 |
|---|---|---|
| "The hand is a passive instrument."（手是被動儀器）| ✅ 留 | 特斯拉本來就浮誇、把一切講成工程術語，這是角色腔 |
| "I'd like a moment."（可以給我一點時間）| ✅ 留 | 圖靈的英式克制，角色腔 |
| "It initiated."（它主動了）| ❌ 改 | 這不是圖靈的精準腔，是 AI 把句子寫僵了 |

#### 唯一判準（每句自問）

> **這句僵，是「AI 把它寫僵了」，還是「這個角色本來就會這樣講」？**
> - 前者（AI 腔）→ 改成自然的講法
> - 後者（角色腔）→ 留著，那是人物的聲音

圖靈精準像機器、特斯拉浮誇像演講——這些是刻意的角色聲音，要保護。
AI 腔則是「任何角色講都一樣僵」的那種句子——那才是要清掉的。

---

### 第三道關：年代語言考據（古人不會有的詞）

前兩道關（像不像人話、像不像這個角色）之外，時代錯置喜劇還有第三道關：
**這個詞 / 這個片語，那個年代那個人會有嗎？**

文法對、也像那個角色會講，但**那個年代根本還沒這個詞**——一樣要改。

#### 抓法：對每個現代感的詞問三件事
1. 這個概念在角色的卒年之前存在嗎？
2. 這個「詞」在那時候是這個意思嗎？（很多字古今意思不同）
3. 這個片語是哪個語言/文化/年代的俚語？角色屬於那裡嗎？

#### EP.2 實際抓到的例子
| 原句 | 問題 | 改成 |
|---|---|---|
| "No prompt."（沒有提示）| "prompt" 當「給系統的輸入」是電腦時代詞，圖靈年代只有劇場提詞/形容詞義 | "I hadn't asked it anything." |
| "I ran the numbers."（我算了機率）| 源自 1920s 美式非法彩券俚語，是現代商業口語；劍橋出身的英國數學家不會這樣講 | "I worked out the odds." |
| "computer"（指機器）| 圖靈年代 "computer" 指「做計算的人」 | "computing machine" |
| "logic gates"（邏輯閘）| 術語 1950s 後才標準化 | "valves"（真空管，英式、年代對）|

#### 注意：現代物件「本身的名字」不算錯置
角色在**念螢幕上的字**或**被告知**現代物件名稱（Wi-Fi、password、CAPTCHA、video call），這是合理的——那是現代世界的專有名詞，不是角色自己的年代詞彙。錯置抓的是**角色用來描述/比喻的詞**，不是物件的固有名稱。

#### 中文同理
翻譯時避免用現代中文網路語/外來語去翻古人的話。但「現代物件名稱」（Wi-Fi、密碼）保留原樣或音譯即可。

---

### 第四道關：這個角色「會這樣說話」嗎？

前三道關抓的是「用詞」對不對，第四道關抓「**這個角色根本會不會講這句話**」。
即使用詞自然、年代正確、不像 AI 寫的，如果這句話**違背角色的世界觀或性格**，一樣是寫壞了。

#### 最常見的踩雷模式
**強迫角色「找證據」「補來源」，但這個角色根本不需要。**

寫對白時很容易下意識想「讓論點站得住」，於是替角色補一個出處。但很多角色——特別是浮誇自信型、世界觀堅定型——**根本不解釋、不舉證、不引用**。他們直接斷言，因為他們確信。讓他們講出「我看過」「我聽到」「上次有個人」這種句子，反而把角色變理性了，違背設定。

#### EP.2 實例
- ❌ **特斯拉：「它也對店裡上一個人說了 hello。」** — 暗示他看過另一個顧客開機。但腳本裡沒有這個畫面，邏輯漏洞。而且更深的問題是：**特斯拉根本不需要看過另一個人才能斷言**，他就是相信「機器＝重複」，這是他的世界觀。
- ✅ **特斯拉：「它當然這樣講。它是機器啊。它每次都講一樣的話。」** — 直接斷言，不舉證。這才是浮誇自信的特斯拉。

#### 自問檢查
寫完每一句，問：
1. 這個角色**會這樣思考**嗎？（用詞、邏輯、世界觀符合嗎）
2. 這個角色**需要這樣解釋/舉證**嗎？（會不會他根本不屑解釋？）
3. 這句話**有沒有暗示一個腳本沒拍到的事件**？（如果有，這事件必須在劇本裡真實發生過，否則是邏輯漏洞）

第 3 點特別重要：**對白裡的指涉，必須有觀眾看得到的來源**。角色不能引用觀眾沒看過的東西——除非那是他的回憶/史實，且符合角色背景。

---

## 「人在講話」 vs 「文字在被寫」總結

四道關合起來，就是「人在講話」這個感覺的具體拆解：
1. **AI 腔檢查**：念出來會卡嗎？（任何角色都不會這樣講）
2. **角色腔保護**：這句僵是因為這個角色就這樣（保留）還是 AI 寫僵了（改）
3. **年代考據**：那個年代那個人有這個詞嗎
4. **角色邏輯**：這個角色會這樣思考、需要這樣解釋嗎；指涉的事件腳本裡有發生嗎

寫對白前先想：**這個人，此刻，會脫口而出什麼**。而不是「我要怎麼把這個資訊塞進對白」。前者是角色在講話，後者是劇本在塞資訊。

---

## 來源備註

四道關（自然度 + 角色腔 + 年代考據 + 角色邏輯）提煉自 EP.2「It initiated」「No prompt」「I ran the numbers」「上一個人說了 hello」修正案。
