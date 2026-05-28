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

### 第五道關：視角層（比字詞層更深，最重要、最容易失守）

前四道關抓「**字詞**」對不對。第五道關抓「**視角**」對不對——這個角色「**看世界的角度**」是不是不小心預設了他不該懂的東西。

這是 Date a Historical 整個節目最仰賴的東西：**古人用他們自己時代的視角看現代物件**。一旦角色講了一句「現代人才會講的話」、用了一個「現代人才會有的角度」，節目的喜劇引擎當場崩塌。

#### 為什麼這層比字詞層更難察覺
字詞錯（"prompt"、"factory greeting"）很明顯——查就知道那個年代有沒有這個詞。但**視角錯**是整句話的「假設」錯了：用的詞可能都對，但角色用這句話時，已經**預設他懂他不該懂的東西**。

#### 真實案例：特斯拉看 iPhone hello
- ❌ **「它是機器啊。它每次都講一樣的話。」** ← 視角錯。這是一個**已經理解 iPhone**、覺得它沒什麼的人會講的話。1943 年死的特斯拉沒有「智慧型手機是一台機器」這個概念。
- ❌ **「出廠預設的問候」** ← 視角錯。「factory greeting」是大量生產 + 軟體時代的詞。他怎麼會懂這套產品邏輯？
- ❌ **「這間店裡每一台機器」** ← 視角錯。他剛剛驗收一整面發光展示機牆——對他來說那是奇蹟，不是「店裡每一台機器」。把奇蹟降格成「一堆一樣的機器」這種**平常心**，違背他的濾鏡。

- ✅ **「一道電流通過它，一個形狀亮起來。每一次都是同樣的電流、同樣的形狀。這不是打招呼，這是一個被敲響的鐘。」** ← 視角對。他用 19 世紀的詞（電流、形狀、鐘）解釋他不懂的東西，浮誇、認真、零平常心。

#### 自問檢查（每句古人對白都要過）
1. 這句話的**視角**，是不是已經預設角色懂他不該懂的東西？
2. 這個**詞**，他世界裡會有嗎？
3. 這個**比喻**，他會用嗎？
4. 他現在的**態度**（平常心、嫌制式、像懂行）符合他第一次見到這個奇蹟嗎？

#### 核心原則
角色看現代物件應該像 **19 世紀電機工程師面對一個違反他所有認知的物件**：用他自己時代的詞（電流、共振、變壓器、鐘、塔、馬力）解釋他不懂的東西。**浮誇、認真、零平常心。**

平常心是節目的死亡——一旦角色覺得「這沒什麼」，引擎就停了。古人面對 iPhone / WiFi / ChatGPT 永遠是奇蹟，永遠是違反認知，永遠用他們的時代詞彙拼命想搞懂。這個「拼命想搞懂」的反差，才是節目的核心喜劇。

#### 失守的徵兆（看到就紅燈）
- 角色用「現代產品邏輯」的詞（factory、default、settings、algorithm、network）
- 角色嫌現代物件「制式」「沒新意」（這預設他見過很多同類）
- 角色把奇蹟說成「一台機器」「一堆機器」（這預設他知道這類東西普遍存在）
- 角色平常心、聳肩、無所謂（這預設他不再被它震懾）
- 角色用任何「比較級」（this one is just / it's the same as）暗示他有別的對照組

---

## SCRIPT FORMAT / 格式規則

### 對白行不含情緒／動作指示（分鏡階段才寫）

來源：Becca 反覆強調的規則，最新觸發為 EP.2 ACT 3「(湊近手機，像在端詳一個變壓器)」。
嚴重性：違反會把劇本寫成 AI 小說腔，必查。

#### 對白行只能包含三種內容

1. **純台詞**（角色實際說出口的話）
2. **必要的收件人標記**：`*(to phone)*` / `*(to Tesla)*` / `*(對著手機)*` / `*(對特斯拉)*` — 這些是「這句對誰講」，影響台詞語意，必要時保留
3. **場景音場 / producer 中性語氣**：`*(無對白)*` / `*(完全中性語氣)*` — 少數例外

#### 禁止在對白行裡寫

- **情緒指示**：`*(quiet)*` / `*(緊張)*` / `*(微微前傾)*` / `*(被冒犯)*`
- **動作指示**：`*(湊近手機)*` / `*(輕敲盒子)*` / `*(把手機翻過去看背面)*` / `*(沒抬頭)*` / `*(在筆記本上寫)*`
- **比喻型演法**：`*(像端詳一個變壓器)*` / `*(像紅毯走位)*`
- 任何形容**演員怎麼演**的括號內容

#### 為什麼

這些屬於分鏡階段（shot list / Seedance prompt / 首尾幀 prompt）的視覺指示，不屬於對白本身。混在對白行裡會：

1. **把劇本寫成 AI 小說腔** — 讀起來像小說旁白，不像真人講話的劇本
2. **重複工作** — 分鏡階段本來就要寫一遍動作/情緒，對白行先寫一次只會雙倍維護
3. **限制視覺自由** — 對白先綁定了動作，分鏡反而綁手綁腳；應該分鏡時看著台詞自由設計鏡頭

#### 自我檢查（寫完每行對白都過）

看每個 `*( )*`，問：
- 它是「這句對誰講」嗎？→ **保留**（收件人）
- 它是「演員怎麼演 / 做什麼動作 / 帶什麼情緒」嗎？→ **刪掉**，移到分鏡階段

#### 例子對照

❌ 錯誤（情緒/動作塞進對白行）：
```
> **TESLA:** *(leans down to the phone, peers at it the way one might peer at a transformer)* It isn't speaking, Alan.
> **特斯拉：** *(湊近手機，像在端詳一個變壓器)* 它不是在說話，Alan。
```

✅ 正確（純台詞，動作留給分鏡）：
```
> **TESLA:** It isn't speaking, Alan.
> **特斯拉：** 它不是在說話，Alan。
```

分鏡階段，另一個檔案/欄位寫：
```
[Shot 3.X | 手持中景] Tesla leans down to the phone, peers at it the way one might peer at a transformer. Line: "It isn't speaking, Alan."
```

#### 跟「對白可信度五道關」的關係

五道關抓的是「這句話本身對不對」（用詞、視角、邏輯）。
這條抓的是「這句話旁邊不該有什麼」（情緒動作指示）。
兩者並列：寫對白時前者過字、後者過格式。

**純台詞 + 必要收件人標記 = 對白行的完整格式。多一個字都是錯。**

---

### 短戲場景寫作守則（從「ACT 3 開機 Hello」七輪修正提煉）

來源：EP.2 ACT 3「Hello」場景重寫七輪的失誤模式整理。
守住的話 9 行就成立；沒守住，短戲會自動長出 17 行有毒對白。

#### 失誤模式對照表（每一條都從同一場戲犯出來的）

| # | 失誤模式 | v1 病例 | v7 修正 | 對應五道關 |
|---|---|---|---|---|
| 1 | **強迫角色「找證據」** | 特斯拉「它對店裡上一個人說了 hello」（沒拍到的事件） | 拿掉一切引用未發生事件的句子 | 第四關（角色邏輯） |
| 2 | **角色預設懂他不該懂的東西** | 特斯拉「它是機器啊」「它每次都講一樣的話」（1943 卒的人不會這樣淡定講量產邏輯） | 改成「玻璃發光了。沒有燈絲」（他畢生參照點失效，被打敗） | 第五關（視角層） |
| 3 | **替角色找看似聰明的解釋** | 「電流通過、形狀亮起、被敲響的鐘」（特斯拉憑什麼一眼就「知道」這是電流？他根本不知道） | 角色不假裝懂，誠實說出「沒有燈絲、沒有用墨水」這種他真實會問的疑問 | 第五關 |
| 4 | **小事觸發大哉問（偷推進度）** | 對著一個 hello 就跳到「跟人到底差在哪」 | 哲學辯論的子彈留給 ACT 5 ChatGPT 真正回答時用 | 規模/節奏 |
| 5 | **硬塞「有重量」的收尾** | 「讓人不舒服的就是這個」（前面沒鋪到任何讓他不舒服的事） | 改成「『出廠。預設問候。』Useful.」（沒情緒、純行為，喜劇從荒謬感漏出） | 對白行不含情緒 |
| 6 | **對白行塞情緒/動作括號** | `*(glancing over)* *(writing in notebook)* *(beat, unsettled)*` 滿場 | 全部清掉，動作留給分鏡 | 對白行不含情緒 |
| 7 | **confessional 升級成論文** | 「整件事就在 hello 裡。如果你分不出來……」（圖靈在事後總結一個小事件） | 整段砍掉。confessional 不放這裡，留給更值得的場 | 規模/節奏 |

#### 核心原則：「小事就是小事」

短戲（一個小事件、一個小發現、一個過場）的最大陷阱是**把它寫成大事**。
這會以三種方式發生：

1. **角色被迫升級反應** — 他講出比這個情境該有的還多/還深的話
2. **作者偷推進度** — 把後面才該講的哲學在這裡先講掉，浪費子彈
3. **每場都有「金句收尾」** — 強迫每場戲都要意味深長，最後變成全集都在演論文摘要

#### 「這場戲值不值得這個反應？」自問檢查

寫完一場戲，問自己：
- 這場戲**實際發生**了多少？（一個 hello = 很小；一段哲學對答 = 大）
- 角色的反應**規模**對嗎？（小事 → 小驚奇；大事 → 大震驚）
- 我有沒有把**後面該講的東西**在這裡先講掉？
- 有沒有任何「金句收尾」是硬塞的？

如果規模對不上 → 收得更小。不要怕場戲看起來「不夠重」——
**真正的重量是用全集節奏堆出來的**，不是每場各自堆。

#### 漸強線：節奏由大局決定，不由場景決定

每集要有**漸強線**：哪幾場是高峰、哪幾場是平地。
EP.2 為例：

- ACT 1 角色建立 — 平
- ACT 2 開箱 — 平
- ACT 3 Hello — **小驚奇（必須收得小，給後面留空間）**
- ACT 4 WiFi — 第一次高點（特斯拉願景成真）
- ACT 5 ChatGPT — **智力對撞高潮（真正的哲學辯論在這裡爆）**
- ACT 6 CAPTCHA — Shorts 主場景（崩潰）
- ACT 7 視訊 + Crack — 喜劇高潮 → 情感餘震
- ACT 8 Stinger — 視覺收尾

**ACT 3 收得小，是為了 ACT 5 炸得開。**
如果 ACT 3 就把「跟人差在哪」講完了，ACT 5 就空了。

寫每一場前先問：**這場在漸強線上是平地還是高峰？平地就要收小。**

#### 行數參考（避免膨脹的硬指標）

短戲（平地、小發現、過場）的健康行數：
- 對白：**5–10 行**
- 不放 confessional（confessional 留給高峰幕）
- 純台詞、無動作括號

如果寫到 15 行以上、又塞了 confessional —— **十之八九已經膨脹了**，回頭砍。
ACT 3 從 17 行 + confessional → 9 行純台詞，約剩 1/3，這是正確的瘦身比例。

#### 一句話總結

**短戲的紀律**：規模對、不偷推進度、不替角色舉證、不淡定、不替角色「想聰明的解釋」、不塞情緒括號、不硬給金句收尾、不放不值得的 confessional。

純行為 + 純台詞 + 角色真實視角。完。

---

### 情緒高峰幕寫作守則（從「ACT 4 WiFi」修正提煉）

來源：EP.2 ACT 4「WiFi」場景重寫的失誤模式整理。
對應幕型：**情緒高峰幕**（角色生命主題被當面回放的時刻），跟「短戲」（小發現、過場）相對。

#### v1 vs v 終 對照

**v1（有毒）：**
```
TURING: It won't continue until it connects to an outside network. …So it can't think on its own. Its mind isn't *in* here. It's a terminal. It's borrowing a brain from somewhere else—
TESLA: Borrowing it through *what.* Give me the word.
TURING: …"Wireless."
TESLA: Wireless. The whole building is sitting inside an invisible field. Right now. I lit glass tubes in '93 with no wires running to them. People thought it was a trick. They called me a sorcerer.
PRODUCER (O.S.): …It's the Wi-Fi. There's a password at the counter.
TESLA: You are standing inside my field.
TURING: I'm standing inside *its* field. You're measuring the electricity. I'm measuring how far away it keeps its *mind.* Same discovery. You only see half of it—
TESLA: Half? I see *all* of it. You see a metal slab that gets warm—
[Screen: ENTER PASSWORD.]
TURING: It wants a password.
TESLA: …A password.
TURING: Your free, infinite field for all mankind. Eight characters. It's taped to the counter.
TESLA: …They put a tollgate on my field.
TURING: That's exactly what Morgan said.
TESLA: Do not say that name to me.
TURING: …We're connected.
TESLA: …He'd have *loved* this.
```

**v 終（修正後）：**
```
TURING: It says it won't go any further until it joins something called a "network."
TESLA: A what.
TURING: A network. I don't know either.
PRODUCER (O.S.): …It needs the Wi-Fi. The radio signal. The whole building has it.
TESLA: …The whole building has what.
PRODUCER (O.S.): A signal. Through the air.
TESLA: …Show me where.
PRODUCER (O.S.): You can't see it.
TESLA: Of course not. It's modulated. What frequency.
PRODUCER (O.S.): …I don't know that.
TESLA: It will be in the megahertz. Higher. Tens of megahertz. No — higher. To carry a picture, a sound, a written word, all of it at once, you would need hundreds. Thousands of megahertz. That isn't possible. That is an oscillation faster than any coil I ever built.
PRODUCER (O.S.): …It's about two and a half gigahertz.
TESLA: …Two and a half thousand million oscillations. Per second. Inside this room.
PRODUCER (O.S.): Yes.
TESLA: …Through the walls. To every device. Simultaneously.
[Producer doesn't answer. Beat.]
TESLA: I designed a tower for this. In 1901. On Long Island. They wrote letters to the editor calling me a charlatan. They were standing inside it and they did not know.
TURING: Nikola?
TESLA: I am perfectly fine.
TURING: You're standing very still.
TESLA: I have not moved because I am *thinking,* Alan. There is a signal in this room. I waited my whole life for this room.
[Screen: ENTER PASSWORD.]
TURING: It wants a password.
TESLA: …A password.
TURING: For your signal through the air. Eight characters. It's taped to the counter.
TESLA: …They put a tollgate on it.
TURING: …
TURING: …We're connected.
TESLA: Morgan would have *loved* this.
```

#### 失誤模式對照（八種）

| # | 失誤模式 | v1 病例 | v 終 修正 |
|---|---|---|---|
| 1 | **角色預設懂他不該懂的東西** | 圖靈一看「連網」就斷言「它的腦不在裡面、它是個終端」；特斯拉一看 WiFi 提示就講「整棟樓在一個場裡」 | 兩人都老實說「我也不知道」、被製作組告知「無線電訊號」後才反應 |
| 2 | **小事偷推進度、把後面該講的先講掉** | WiFi 一連線就跳到「機器智能哪裡來」——這是 ACT 5 ChatGPT 才該炸的哲學辯論 | 哲學留給 ACT 5，這幕只處理「特斯拉的願景成真」 |
| 3 | **替角色舉證** | 圖靈知道「Morgan 當年講的一模一樣」——他不可能知道兩人的對話細節 | 砍掉，Morgan 只由特斯拉自己口中說出 |
| 4 | **角色辯論太工整像辯題** | 「你只看到一半／我看到全部／你看到一塊發熱金屬板」 | 砍掉正面對撞，兩人各自沉浸不互嗆 |
| 5 | **製作組像 NPC 連點頭** | 五個「Yes/對」連發確認特斯拉假設 | 只給一個關鍵「對」（24 億次那刻），其他併成特斯拉自言自語＋製作組沉默 |
| 6 | **重複句湊節奏** | 「Morgan would have liked」緊接「Morgan would have loved」 | 砍第一句，讓 Morgan 收尾一次爆出、份量集中 |
| 7 | **角色用歷史當「論證武器」** | 特斯拉「我 1893 年點亮過玻璃燈管，被叫巫師！」（自誇、論證、討拍） | 改成「他們現在就站在裡面，他們不知道」（歷史是傷口，不是武器） |
| 8 | **沒給情緒落地的空間** | 一路咬合對撞、沒有沉默 | 加入製作組沉默、圖靈「……」、「我這輩子都在等這個房間」讓情緒落地 |

#### 情緒高峰幕的兩個關鍵原則

**原則 1：用「專業＋誠實困惑」展現驚嘆，不用宣告。**

角色面對他生命主題成真，最有力的反應不是流眼淚、不是宣告勝利，是**他的天才還在運轉、用他的專業去推算、然後撞到自己知識的邊界**。

特斯拉「驚嘆 WiFi」的走法：
1. 用他懂的物理推算（megahertz、線圈震盪）
2. 自己推算出「不可能」（上千 MHz 太快）
3. 被真實數字打到（2.4 GHz）
4. 重複那個物理量（24 億次震盪、每一秒、就在這房間）——因為腦子接受不了
5. 把它跟自己的歷史連起來（Wardenclyffe）——淡淡的悲傷，不自憐

這比「Behold! Mankind has done it!」好十倍。

**原則 2：歷史是「對照組／傷口」，不是「論證武器」。**

角色提自己的過去，不是為了證明「我說得對」，而是**眼前的事勾出了那段傷**。

- ❌「我 1893 年就做過了！他們罵我是巫師！」（自誇、論證、討拍）
- ✅「我為了這個設計了一座塔。1901 年。長島。他們罵我是騙子。**他們現在就站在裡面，他們不知道。**」（重點在「沒人記得是我先想到的」）

#### 規模對照表（哪種幕用哪種寫法）

| 幕型 | 典型場景 | 健康行數 | 寫法 | EP.2 例 |
|---|---|---|---|---|
| 短戲（小發現/過場） | 開機 Hello、過場 | 5–10 行 | 規模對、不大哉問、不放 confessional | ACT 3 |
| 情緒高峰幕 | 角色生命主題被當面回放 | 25–35 行 | 專業＋誠實困惑、歷史是傷口、沉默讓情緒落地 | ACT 4 |
| 智力對撞高峰 | 角色核心命題被真實挑戰 | 30–40 行 | 雙人濾鏡正面對撞、術語密集、三層結構 | ACT 5（ChatGPT） |
| 喜劇崩潰幕 | 角色被推到設定的反面 | 20–30 行 | 高速崩潰、配重角色擋焦、Shorts hook 站得住 | ACT 6（CAPTCHA） |
| Stinger | 收尾畫面 | 純視覺/極短 | 無對白或一句畫外音，純圖像做工 | ACT 8 |

「情緒高峰幕」vs「智力對撞高峰」差別：
- 情緒高峰幕是**一個角色的時刻**（ACT 4 是特斯拉的），另一角色是觀察者/陪伴
- 智力對撞高峰是**兩個角色的時刻**，兩條濾鏡正面交火

#### 一句話總結

**情緒高峰幕的紀律**：專業誠實推算 + 被真實打到 + 歷史當傷口（不當武器）+ 給情緒落地的沉默 + 收尾單次爆出（不重複湊節奏）。

不流淚、不感慨、不浮誇宣告。讓他重複那個物理量，因為他腦子接受不了。

---

## 「人在講話」 vs 「文字在被寫」總結

五道關合起來，就是「人在講話」這個感覺的具體拆解：
1. **AI 腔檢查**：念出來會卡嗎？（任何角色都不會這樣講）
2. **角色腔保護**：這句僵是因為這個角色就這樣（保留）還是 AI 寫僵了（改）
3. **年代考據**：那個年代那個人有這個詞嗎
4. **角色邏輯**：這個角色會這樣思考、需要這樣解釋嗎；指涉的事件腳本裡有發生嗎
5. **視角層**：這個角色看世界的角度，有沒有預設他不該懂的東西（最深、最重要）

寫對白前先想：**這個人，此刻，會脫口而出什麼**。而不是「我要怎麼把這個資訊塞進對白」。前者是角色在講話，後者是劇本在塞資訊。

---

## CHARACTER RESEARCH / 角色研究

### 辨識弧：古人面對現代科技的階段性反應

來源：EP.2 ACT 4 WiFi 場景（特斯拉的 Hertz 1887 → 線圈 → 調變 → 終於認出是自己的塔）提煉。
關連：「對白可信度五道關 > 第五關（視角層）」最具體、最可操作的版本。
嚴重性：違反此條 = 節目核心引擎被拆掉。

#### 原則：不准一秒認祖歸宗

當角色遇到一個跟他畢生工作有關的現代物件時，他不能一秒就「認祖歸宗」——一句「啊這是我發明的」「啊這就是我的塔」會立刻拆掉節目的喜劇引擎跟情感重量。

正確的反應是經過一個**辨識弧（recognition arc）**，慢慢從困惑走到認出。

#### 辨識弧的五個階段

1. **先困惑/驚嘆** → 重複對方剛說的話、追問
   > 特斯拉：「……穿過空氣的訊號。」「……是電磁波嗎。」

2. **用畢生詞彙嘗試描述** → 引用自己時代的實驗、術語、人物
   > 特斯拉：「Hertz 1887 年做過實驗，一個火花、一個迴路。我用了那個原理做過共振電路。」

3. **撞到知識邊界** → 對照自己的成就跟眼前規模的差距
   > 特斯拉：「但 Hertz 的訊號傳不到一個房間外。我的線圈最遠是幾公尺。你說的這個訊號……整棟樓？」

4. **學新詞** → 現代術語由「製作組」或「對方角色」講出來，本角色重複它、咀嚼它、用自己的比喻消化它
   > 製作組：「……它是被調變過的。」
   > 特斯拉：「……調變。你的意思是，他們找到方法把訊息『刻』進那條曲線裡。」

5. **才慢慢意識到「等等，這跟我的東西是同一個」** → 不一定要明說，可以是一個沉默、一個畫面、或一句很小的承認
   > 特斯拉：「我為了這個設計了一座塔。1901 年。在長島。」

**關鍵：第 5 階段才是「認出」。前面 1–4 階段拒絕被跳過。如果你寫一個角色一句就跳到第 5，就是錯的。**

#### 為什麼這條這麼重要

節目的核心**喜劇引擎**是「他們不懂」。如果角色一秒就懂，沒有錯位、沒有差距、沒有「太大的人塞進太小的情境」的反差。

節目的核心**情感重量**是「他們的願景被世界用陌生的方式實現」。如果他們一秒認出來，那個被陌生化的痛就沒了——「我以為這跟我有關，但我已經認不出它了」這個感受才是金。

辨識弧讓觀眾看到角色**重新學習自己畢生的領域**——這個又好笑又心酸。

---

### 每集每角色必填模板

每集每個角色都要填以下四個欄位，作為對白寫作的骨架。

#### ① Lifetime Vocabulary（畢生詞彙清單，5–10 個）

列出這個角色真實用過的術語、實驗名、人名、概念名。這些是他描述眼前事物時唯一可以用的工具。

**特斯拉範例（1856–1943）：**
- 電磁波 / electromagnetic wave
- Hertz 實驗（1887 火花、迴路）
- 共振電路 / resonant circuit
- 線圈（特斯拉線圈）
- 變壓器 / transformer
- 馬力（10 萬馬力 @ 尼加拉瀑布）
- 火花、放電、震盪
- Edison（永遠的對照組）

❌ 不能用的：晶片、像素、軟體、頻寬、bit、二進位、digital、algorithm、network protocol

#### ② Direct Ancestry Mapping（直接下游清單）

列出本集會出現的現代物件中，哪些是這個角色工作的直接下游。這些物件他要走完整個辨識弧。

**EP.2 特斯拉範例：**
- WiFi → 無線傳輸的下游（直接祖先：Wardenclyffe）
- 視訊通話 → 無線訊號的下游
- 無線充電 → Wardenclyffe 的下游
- 電池 → 電力儲存的下游（較遠，但關聯）

#### ③ Recognition Arc Per Object（每個物件的辨識弧）

針對每個下游物件，寫出他該走的 3–5 階段。這是這集對白寫作的骨架。

**EP.2 特斯拉 × WiFi 範例：**

| 階段 | 內容 |
|---|---|
| 1 困惑 | 「穿過空氣的訊號」「是電磁波嗎」 |
| 2 畢生詞彙 | Hertz 1887、共振電路、自己的線圈幾公尺 |
| 3 撞知識邊界 | 「但我的最遠幾公尺，你說整棟樓？」 |
| 4 學新詞 | 製作組給「調變」，特斯拉用「刻進曲線」消化 |
| 5 認出 | 「我為了這個設計了一座塔。1901 年。」 |

#### ④ Not-Related Tech（無關現代物件清單）

列出本集會出現、但不是這個角色下游的現代物件。他只能用畢生詞彙描述，永遠不 claim、不認。

**EP.2 特斯拉範例：**
- iPhone 螢幕本身（顯示技術不是他的下游）→ 只能說「玻璃發光、沒有燈絲、有字浮在上面」
- ChatGPT 語音（語音合成不是他的下游）→ 只能說「它從盒子裡發出聲音」
- CAPTCHA（驗證系統不是他的下游）→ 只能困惑「為什麼要我證明我不是機器」

---

### 兩個角色互動時的特別規則

每集有兩個角色，他們的辨識弧會互相幫襯或互相錯位：

**互相幫襯**：A 角色的下游 = B 角色完全不懂的東西。B 可以當「外行觀眾的替身」反問 A，幫 A 完成辨識弧。
> EP.2 例：圖靈不懂特斯拉的 Wardenclyffe，所以特斯拉的 WiFi 辨識弧由特斯拉自己跑、圖靈當旁觀者。

**互相錯位**：同一個現代物件同時是 A 跟 B 的下游，兩人的辨識弧同時跑、互相打斷。
> EP.2 例：ACT 5 的 ChatGPT——對特斯拉是電力的下游（他關心耗電）、對圖靈是 AI 的下游（他關心思考），兩條辨識弧在同一個物件上錯位對撞。

---

### 失誤檢查清單（寫每場戲前過一遍）

對每個有現代物件的場景：

- [ ] 角色用的詞，有沒有出現在他的 Lifetime Vocabulary 清單裡？
- [ ] 如果這個現代物件是他的下游，他有沒有走完辨識弧的 5 個階段？
- [ ] 還是我讓他一句就跳到第 5 階段（一秒認出）了？
- [ ] 如果這個現代物件不是他的下游，他有沒有不小心 claim 它？
- [ ] 現代術語有沒有由「製作組」或「對方角色」講出，而不是這個古人講？
- [ ] 角色學新詞時，有沒有用他的時代比喻消化它（不是直接吸收）？

任何一條沒過 = 重寫那場戲。

---

## 來源備註

五道關（自然度 + 角色腔 + 年代考據 + 角色邏輯 + 視角）提煉自 EP.2「It initiated」「No prompt」「I ran the numbers」「上一個人說了 hello」「它是機器啊每次都講一樣的話」修正案。
