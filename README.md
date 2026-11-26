<div align="center">

# 🎙 MicEQ

### Microphone Equalizer & Effects Studio for Discord
### Эквалайзер и студия эффектов для микрофона в Discord

**BetterDiscord plugin · Плагин для BetterDiscord**

[⬇ Download / Скачать](../../releases) · [🔌 VB-CABLE](https://vb-audio.com/Cable/) · [🧩 BetterDiscord](https://betterdiscord.app)

<br>

<img src="screenshots/01-presets.png" alt="MicEQ — presets and controls" width="860">

<br>

👇 **Choose your language / Выберите язык** 👇

</div>

<details open>
<summary><h2>🇬🇧 English</h2></summary>

**MicEQ** is a [BetterDiscord](https://betterdiscord.app) plugin that turns Discord into a full microphone processing studio: a 10-band equalizer, ready-made presets, bitcrusher ("crunchy" lo-fi sound), distortion, compressor, noise gate and more. Everything is configured inside Discord, with no separate audio software.

> ℹ️ The plugin interface is in Russian. In this guide every control is given in English with the on-screen Russian label in *italics*.

## ✨ Features

- 🎚 **10-band equalizer** (31 Hz – 16 kHz, ±24 dB) with an interactive graph and live spectrum
- 🎛 **14 presets**: clean, warm, bright, podcast, radio, telephone, megaphone, crunchy and more
- 👾 **Bitcrusher** (1–16 bit, sample-rate decimation up to 32×) for the "crunchy" lo-fi sound
- 🔥 **Distortion**, **compressor**, **noise gate**, **high-pass / low-pass filters**
- 🔊 **Preamp** and **output gain** for extra loudness
- 🛡 **Safety ceiling**: a hard loudness limit to protect your hearing and your listeners'
- 🔇 **Noise suppression** and echo cancellation switches
- 🎧 **Self-monitoring test** to hear yourself with the effects
- 🔌 **Bridge to a virtual cable**, so everyone in the voice channel hears the processed sound
- 💾 Settings are **saved automatically**

## 🖼 Interface overview

### 🎛 Presets and main controls

<p align="center"><img src="screenshots/01-presets.png" alt="Presets and main controls" width="860"></p>

At the top of the settings you can find three buttons:

| Button | What it does |
|---|---|
| **● Processing ON** (*«Обработка ВКЛ»*) | Turns the effects on or off instantly. When off, your original microphone sound is sent. |
| **🎧 Test** (*«Тест (слышать себя)»*) | Lets you hear yourself with the effects. Use headphones to avoid feedback. |
| **↺ Reset** (*«Сброс»*) | Resets all settings to default. |

Below is the grid of **14 presets**. One click applies a full setup, and you can then fine-tune it with the sliders.

| Preset | Sound |
|---|---|
| 🎚 No effects (*Без эффектов*) | The original microphone sound |
| ✨ Clean voice (*Чистый голос*) | Gentle EQ and light compression |
| 🔥 Warm (*Тёплый*) | More bass, softer treble |
| 💎 Bright (*Яркий*) | More treble and clarity |
| 🎙 Podcast / radio voice (*Подкаст / радио-голос*) | Full, punchy voice with a noise gate |
| 📻 Radio (*Радио*) | Narrow-band broadcast sound |
| 📞 Telephone (*Телефон*) | Lo-fi phone call |
| 📢 Megaphone (*Мегафон*) | Harsh, loud bullhorn |
| 🌊 Underwater (*Подводный*) | Muffled, deep sound |
| 👾 8-bit robot (*8-бит робот*) | Retro digital voice |
| 💀 Crunchy (*Шакал*) | Bitcrushed, low-quality sound |
| ☠ ULTRA-CRUNCHY (*УЛЬТРА-ШАКАЛ*) | Extreme distortion and crushing |
| 📈 Maximum loudness (*Максимальная громкость*) | Strong compression and boost |
| 🔊 Bass crunch (*Бас-шакал*) | Heavy bass with crunch |

The yellow notice under the buttons reminds you that the loudness ceiling is a hard limit and that extreme presets are harsh. Always check the sound quietly and with headphones first.

### 🎚 10-band equalizer

<p align="center"><img src="screenshots/02-equalizer.png" alt="10-band equalizer" width="860"></p>

The equalizer has **10 bands**: 31, 62, 125, 250, 500 Hz and 1k, 2k, 4k, 8k, 16k. Each slider boosts or cuts its band by up to **±24 dB**, and the value is shown above it. Move the slider up to boost a range and down to cut it:

- **31–125 Hz**: bass and body of the voice
- **250–500 Hz**: warmth (too much makes the voice "boomy")
- **1–4 kHz**: speech clarity and presence
- **8–16 kHz**: air and brightness

Above the equalizer there is an **interactive graph** with your frequency response curve and a live spectrum of the microphone. You can drag the points with the mouse, and a double click resets a band.

<!-- Add a screenshot of the graph as screenshots/06-graph.png and uncomment the next line -->
<!-- <p align="center"><img src="screenshots/06-graph.png" alt="Interactive graph" width="860"></p> -->

### ⚙️ Processing

<p align="center"><img src="screenshots/03-processing.png" alt="Processing sliders" width="860"></p>

| Slider | Range | What it does |
|---|---|---|
| **Preamp** (*Предусилитель*) | −20…+30 dB | Boosts the signal before the effects |
| **High-pass filter** (*Фильтр низов*) | 20–1000 Hz | Cuts rumble and low noise below the chosen frequency |
| **Low-pass filter** (*Фильтр верхов*) | 1–20 kHz | Cuts everything above the chosen frequency |
| **Noise gate** (*Шумоподавитель (гейт)*) | −90…−20 dB | Silences the microphone when you are quiet. "off" at the minimum |
| **Compressor: threshold** (*порог*) | −60…0 dB | Level above which loud parts are reduced. "off" at 0 |
| **Compressor: ratio** (*степень*) | 1…20 | How strongly loud parts are reduced. "off" at 1 |
| **Crunch: bit depth** (*разрядность*) | 1–16 bit | Lower value gives a rougher, more "digital" sound. "off" at 16 |
| **Crunch: decimation** (*децимация частоты*) | 1–32× | Reduces the sample rate for a lo-fi effect. "off" at 1 |
| **Distortion (drive)** (*Дисторшн*) | 0–20 | Overdrive amount. "off" at 0 |
| **Output gain** (*Выходная громкость*) | −20…+20 dB | Final volume before the limiter |
| **🛡 Loudness ceiling** (*Потолок громкости*) | −30…−3 dBFS | Hard limit that sound can never exceed. Default −12 dBFS |
| **Self-monitoring volume** (*Громкость самопрослушивания*) | 0–1 | Volume of what you hear in the Test mode |

> 💡 For a really crunchy and loud microphone, lower the bit depth, increase the decimation and drive, then raise the preamp. The ceiling keeps it from getting painfully loud.

### 🔇 Noise suppression

<p align="center"><img src="screenshots/04-noise-suppression.png" alt="Noise suppression settings" width="860"></p>

- **Noise suppression** (*«Шумоподавление»*):
  - **Off** (*«Выкл»*): clean sound, best for effects
  - **Browser (WebRTC)** (*«Браузерное»*): removes constant background noise
- **Echo cancellation** (*«Эхоподавление»*): checkbox, enable it only if you use speakers.

> ⚠️ In Discord itself (**Voice & Video**) set Noise Suppression to **None** and turn off Echo Cancellation and Automatic Gain Control. Otherwise Discord will filter your effects as noise.

### 🔌 Bridge to a virtual cable

<p align="center"><img src="screenshots/05-bridge.png" alt="Bridge to a virtual cable" width="860"></p>

The desktop version of Discord captures the microphone with its own native audio engine, which plugins cannot access. So MicEQ processes your microphone itself and sends the result to a **virtual audio cable**. In Discord you select the cable as the input device, and everyone in the voice channel hears the processed sound.

```
Microphone → MicEQ (EQ + effects) → CABLE Input ══► CABLE Output → Discord → everyone
```

| Control | What to choose |
|---|---|
| **Microphone (input)** (*«Микрофон (вход)»*) | Your real microphone, or the default one |
| **Output (CABLE Input)** (*«Вывод (CABLE Input)»*) | **CABLE Input (VB-Audio Virtual Cable)** |
| **▶ Start bridge** (*«Запустить мост»*) | Starts the processing and sending |
| **↻ Refresh list** (*«Обновить список»*) | Reloads the device list |

## 📋 Requirements

- 💻 Discord desktop app
- 🧩 [BetterDiscord](https://betterdiscord.app)
- 🔌 A virtual audio cable: **[VB-CABLE (free)](https://vb-audio.com/Cable/)**

## 🚀 Installation from scratch

### 1️⃣ Install BetterDiscord
1. Close Discord completely (also from the system tray).
2. Go to <https://betterdiscord.app> and download the installer.
3. Run it, choose **Install BetterDiscord**, select your Discord version (usually *Stable*) and finish.
4. Start Discord. A **BetterDiscord** section should appear in User Settings.

### 2️⃣ Download the plugin
1. Open the **[Releases](../../releases)** page of this repository.
2. Download **`MicEQ.plugin.js`**. Keep the file name exactly as is.

### 3️⃣ Install the virtual cable (VB-CABLE)
1. Download it from the official site: **<https://vb-audio.com/Cable/>**
2. Extract the ZIP archive.
3. Right-click **`VBCABLE_Setup_x64.exe`** → **Run as administrator** → **Install Driver**.
4. Restart your computer.

> macOS and Linux users can use any virtual audio device instead (for example BlackHole on macOS or a null sink in PulseAudio/PipeWire on Linux). The setup is the same: MicEQ outputs to the virtual device, and Discord uses it as input.

### 4️⃣ Put the plugin into the plugins folder
1. In Discord open **User Settings → BetterDiscord → Plugins**.
2. Click **Open Plugins Folder**.
3. Move `MicEQ.plugin.js` into that folder (default path on Windows: `%appdata%\BetterDiscord\plugins`).

### 5️⃣ Enable the plugin
In **User Settings → BetterDiscord → Plugins**, turn on the **MicEQ** switch.

### 6️⃣ Set up the bridge
1. Click the **gear icon** next to MicEQ.
2. Scroll down to **🔌 Bridge** (*«Мост в Discord»*) and select your real microphone in **Microphone (input)**.
3. In **Output (CABLE Input)** select **CABLE Input (VB-Audio Virtual Cable)**. If the list is empty, press **↻ Refresh list**.
4. Press **▶ Start bridge**.

### 7️⃣ Configure Discord
Open **User Settings → Voice & Video** and set:
- **Input Device: CABLE Output (VB-Audio Virtual Cable)**
- **Noise Suppression: None**
- Turn **Echo Cancellation** and **Automatic Gain Control** off
- Do **not** select the cable as the Discord *output* device

### 8️⃣ Choose a preset and test
Pick a preset or tune the equalizer yourself. Press **🎧 Test** to hear yourself (wear headphones) and ask a friend to listen at a low volume first.

## 💡 Tips

- Start quiet. Extreme presets (Ultra-Crunchy, Megaphone) are harsh by design. If it hurts to listen, lower the **ceiling** to −18…−20 dBFS.
- The bridge must be running whenever you want to be heard with effects. Press **⏹ Stop bridge** or switch Discord's input back to your real microphone to turn the processing off.

## 🛠 Troubleshooting

| Problem | Solution |
|---|---|
| Nobody hears me | Make sure the bridge is started and Discord input is **CABLE Output**. |
| The device list is empty | Press **Refresh list**. Microphone permission must be granted. |
| Echo / feedback | Wear headphones. Don't set Discord's output to the cable. Stop the **Test**. |
| Sound is quiet | Raise Preamp or Output gain, or raise the ceiling slightly. |
| Sound is cut off | Set Discord's noise suppression to **None**. |
| No sound after a Discord update | Re-enable the plugin or restart Discord, then press **Start bridge** again. |

## ⚠️ Disclaimer

MicEQ is an unofficial, community-made plugin and is not affiliated with Discord or BetterDiscord. Modifying the Discord client may violate Discord's Terms of Service. Use it at your own risk. Very loud audio can damage hearing, so be considerate of other people in your voice channel.

</details>

<details>
<summary><h2>🇷🇺 Русский</h2></summary>

**MicEQ** — плагин для [BetterDiscord](https://betterdiscord.app), который превращает Discord в полноценную студию обработки микрофона: 10-полосный эквалайзер, готовые пресеты, битовый «шакал» (bitcrusher), дисторшн, компрессор, шумовой гейт и многое другое. Всё настраивается прямо в Discord, без отдельных программ для звука.

## ✨ Возможности

- 🎚 **10-полосный эквалайзер** (31 Гц – 16 кГц, ±24 дБ) с интерактивным графиком и живым спектром
- 🎛 **14 пресетов**: чистый голос, тёплый, яркий, подкаст, радио, телефон, мегафон, шакал и другие
- 👾 **Bitcrusher** (1–16 бит, децимация частоты до 32×) для «шакального» lo-fi звука
- 🔥 **Дисторшн**, **компрессор**, **шумовой гейт**, **фильтры низов и верхов**
- 🔊 **Предусилитель** и **выходная громкость** для дополнительной громкости
- 🛡 **Потолок громкости**: жёсткий предел, который защищает слух вам и собеседникам
- 🔇 Переключатели **шумоподавления** и эхоподавления
- 🎧 **Тест с самопрослушиванием**, чтобы слышать себя с эффектами
- 🔌 **Мост в виртуальный кабель**, чтобы все в голосовом канале слышали обработанный звук
- 💾 Настройки **сохраняются автоматически**

## 🖼 Обзор интерфейса

### 🎛 Пресеты и основные кнопки

<p align="center"><img src="screenshots/01-presets.png" alt="Пресеты и основные кнопки" width="860"></p>

В верхней части настроек находятся три кнопки:

| Кнопка | Что делает |
|---|---|
| **● Обработка ВКЛ** | Мгновенно включает и выключает эффекты. В выключенном состоянии отправляется звук обычного микрофона. |
| **🎧 Тест (слышать себя)** | Позволяет услышать себя с эффектами. Используйте наушники, чтобы не было эха. |
| **↺ Сброс** | Возвращает все настройки к значениям по умолчанию. |

Ниже расположена сетка из **14 пресетов**. Один клик применяет готовую настройку, дальше её можно подкрутить слайдерами.

| Пресет | Звук |
|---|---|
| 🎚 Без эффектов | Оригинальный звук микрофона |
| ✨ Чистый голос | Мягкий эквалайзер и лёгкая компрессия |
| 🔥 Тёплый (больше низов) | Больше баса, мягче верха |
| 💎 Яркий (больше верхов) | Больше верхов и чёткости |
| 🎙 Подкаст / радио-голос | Плотный выразительный голос с гейтом |
| 📻 Радио (узкая полоса) | Узкополосный «эфирный» звук |
| 📞 Телефон | Lo-fi звук телефонного звонка |
| 📢 Мегафон | Резкий громкий рупор |
| 🌊 Подводный | Приглушённый глубокий звук |
| 👾 8-бит робот | Ретро-цифровой голос |
| 💀 Шакал | «Убитый» битами звук низкого качества |
| ☠ УЛЬТРА-ШАКАЛ | Экстремальные искажения |
| 📈 Максимальная громкость | Сильная компрессия и усиление |
| 🔊 Бас-шакал | Тяжёлый бас с «шакалом» |

Жёлтое предупреждение под кнопками напоминает, что потолок громкости работает как жёсткий предел, а экстремальные пресеты очень резкие. Сначала всегда проверяйте звук тихо и в наушниках.

### 🎚 10-полосный эквалайзер

<p align="center"><img src="screenshots/02-equalizer.png" alt="10-полосный эквалайзер" width="860"></p>

В эквалайзере **10 полос**: 31, 62, 125, 250, 500 Гц и 1k, 2k, 4k, 8k, 16k. Каждый слайдер усиливает или ослабляет свою полосу до **±24 дБ**, значение показано над ним. Двигайте слайдер вверх, чтобы усилить диапазон, и вниз, чтобы ослабить:

- **31–125 Гц**: бас и «тело» голоса
- **250–500 Гц**: тепло (если слишком много, голос «бубнит»)
- **1–4 кГц**: разборчивость речи и присутствие
- **8–16 кГц**: воздух и яркость

Над эквалайзером находится **интерактивный график** с кривой вашей настройки и живым спектром микрофона. Точки можно перетаскивать мышью, двойной клик сбрасывает полосу.

<!-- Добавь скриншот графика как screenshots/06-graph.png и раскомментируй строку ниже -->
<!-- <p align="center"><img src="screenshots/06-graph.png" alt="Интерактивный график" width="860"></p> -->

### ⚙️ Обработка

<p align="center"><img src="screenshots/03-processing.png" alt="Слайдеры обработки" width="860"></p>

| Слайдер | Диапазон | Что делает |
|---|---|---|
| **Предусилитель** | −20…+30 дБ | Усиливает сигнал перед эффектами |
| **Фильтр низов (HP)** | 20–1000 Гц | Убирает гул и низкий шум ниже выбранной частоты |
| **Фильтр верхов (LP)** | 1–20 кГц | Срезает всё выше выбранной частоты |
| **Шумоподавитель (гейт)** | −90…−20 дБ | Выключает микрофон, когда вы молчите. В минимуме «выкл» |
| **Компрессор: порог** | −60…0 дБ | Уровень, выше которого громкие участки уменьшаются. На 0 «выкл» |
| **Компрессор: степень** | 1…20 | Насколько сильно уменьшаются громкие участки. На 1 «выкл» |
| **Шакал: разрядность** | 1–16 бит | Чем меньше значение, тем грубее и «цифровее» звук. На 16 «выкл» |
| **Шакал: децимация частоты** | 1–32× | Снижает частоту дискретизации для lo-fi эффекта. На 1 «выкл» |
| **Дисторшн (драйв)** | 0–20 | Сила перегруза. На 0 «выкл» |
| **Выходная громкость** | −20…+20 дБ | Итоговая громкость перед лимитером |
| **🛡 Потолок громкости (защита слуха)** | −30…−3 dBFS | Жёсткий предел, выше которого звук не поднимется. По умолчанию −12 dBFS |
| **Громкость самопрослушивания (тест)** | 0–1 | Громкость того, что вы слышите в режиме теста |

> 💡 Для очень шакального и громкого микрофона уменьшите разрядность, увеличьте децимацию и драйв, затем поднимите предусилитель. Потолок не даст звуку стать болезненно громким.

### 🔇 Шумоподавление

<p align="center"><img src="screenshots/04-noise-suppression.png" alt="Настройки шумоподавления" width="860"></p>

- **Шумоподавление**:
  - **Выкл**: чистый звук, лучше всего для эффектов
  - **Браузерное (WebRTC)**: убирает постоянный фоновый шум
- **Эхоподавление**: галочка, включайте только если используете колонки.

> ⚠️ В самом Discord (**Голос и видео**) поставьте шумоподавление **Нет**, выключите эхоподавление и автоматическую регулировку усиления. Иначе Discord будет глушить ваши эффекты как шум.

### 🔌 Мост в виртуальный кабель

<p align="center"><img src="screenshots/05-bridge.png" alt="Мост в виртуальный кабель" width="860"></p>

Настольный Discord снимает звук с микрофона собственным нативным аудиодвижком, до которого плагины не достают. Поэтому MicEQ сам обрабатывает микрофон и отправляет результат в **виртуальный аудиокабель**. В Discord вы выбираете этот кабель как устройство ввода, и все в голосовом канале слышат уже обработанный звук.

```
Микрофон → MicEQ (эквалайзер + эффекты) → CABLE Input ══► CABLE Output → Discord → все слышат
```

| Элемент | Что выбрать |
|---|---|
| **Микрофон (вход)** | Ваш настоящий микрофон или микрофон по умолчанию |
| **Вывод (CABLE Input)** | **CABLE Input (VB-Audio Virtual Cable)** |
| **▶ Запустить мост** | Запускает обработку и отправку звука |
| **↻ Обновить список** | Перезагружает список устройств |

## 📋 Что понадобится

- 💻 Приложение Discord для компьютера
- 🧩 [BetterDiscord](https://betterdiscord.app)
- 🔌 Виртуальный аудиокабель: **[VB-CABLE (бесплатно)](https://vb-audio.com/Cable/)**

## 🚀 Установка с нуля

### 1️⃣ Установите BetterDiscord
1. Полностью закройте Discord (в том числе в трее).
2. Откройте <https://betterdiscord.app> и скачайте установщик.
3. Запустите его, выберите **Install BetterDiscord**, укажите свою версию Discord (обычно *Stable*) и завершите установку.
4. Запустите Discord. В настройках пользователя появится раздел **BetterDiscord**.

### 2️⃣ Скачайте плагин
1. Откройте страницу **[Releases](../../releases)** этого репозитория.
2. Скачайте файл **`MicEQ.plugin.js`**. Имя файла менять нельзя.

### 3️⃣ Установите виртуальный кабель (VB-CABLE)
1. Скачайте его с официального сайта: **<https://vb-audio.com/Cable/>**
2. Распакуйте ZIP-архив.
3. Нажмите правой кнопкой на **`VBCABLE_Setup_x64.exe`** → **Запуск от имени администратора** → **Install Driver**.
4. Перезагрузите компьютер.

> Пользователи macOS и Linux могут использовать любое виртуальное аудиоустройство (например, BlackHole на macOS или null sink в PulseAudio/PipeWire на Linux). Схема та же: MicEQ выводит звук в виртуальное устройство, а Discord берёт его как вход.

### 4️⃣ Переместите плагин в папку плагинов
1. В Discord откройте **Настройки → BetterDiscord → Плагины**.
2. Нажмите **Открыть папку плагинов**.
3. Перенесите в неё файл `MicEQ.plugin.js` (путь по умолчанию в Windows: `%appdata%\BetterDiscord\plugins`).

### 5️⃣ Включите плагин
В разделе **Настройки → BetterDiscord → Плагины** включите переключатель **MicEQ**.

### 6️⃣ Настройте мост
1. Нажмите на **шестерёнку** рядом с MicEQ.
2. Прокрутите вниз до блока **🔌 Мост в Discord** и выберите свой настоящий микрофон в поле **Микрофон (вход)**.
3. В поле **Вывод (CABLE Input)** выберите **CABLE Input (VB-Audio Virtual Cable)**. Если список пуст, нажмите **↻ Обновить список**.
4. Нажмите **▶ Запустить мост**.

### 7️⃣ Настройте Discord
Откройте **Настройки → Голос и видео** и установите:
- **Устройство ввода: CABLE Output (VB-Audio Virtual Cable)**
- **Шумоподавление: Нет**
- Выключите **Эхоподавление** и **Автоматическую регулировку усиления**
- **Не** выбирайте кабель как устройство *вывода* в Discord

### 8️⃣ Выберите пресет и проверьте
Выберите пресет или настройте эквалайзер вручную. Нажмите **🎧 Тест**, чтобы услышать себя (в наушниках), и сначала попросите друга послушать на небольшой громкости.

## 💡 Советы

- Начинайте с тихого уровня. Экстремальные пресеты (ультра-шакал, мегафон) резкие по задумке. Если слушать больно, опустите **потолок громкости** до −18…−20 dBFS.
- Мост должен быть запущен, пока вы хотите, чтобы вас слышали с эффектами. Нажмите **⏹ Остановить мост** или верните в Discord свой обычный микрофон, чтобы отключить обработку.

## 🛠 Решение проблем

| Проблема | Решение |
|---|---|
| Меня никто не слышит | Проверьте, что мост запущен, а вход в Discord — **CABLE Output**. |
| Пустой список устройств | Нажмите **Обновить список**. Нужно разрешение на доступ к микрофону. |
| Эхо / фон | Наденьте наушники. Не ставьте кабель на вывод Discord. Остановите **Тест**. |
| Тихий звук | Поднимите предусилитель или выходную громкость, или чуть увеличьте потолок. |
| Звук обрывается | Поставьте шумоподавление Discord на **Нет**. |
| Не работает после обновления Discord | Перевключите плагин или перезапустите Discord и снова нажмите **Запустить мост**. |

## ⚠️ Отказ от ответственности

MicEQ — неофициальный плагин от сообщества, он не связан с Discord и BetterDiscord. Модификация клиента Discord может нарушать условия использования Discord. Вы используете плагин на свой риск. Очень громкий звук может повредить слух, поэтому учитывайте комфорт других людей в голосовом канале.

</details>
