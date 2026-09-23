// ==========================================
// FUNKCJA PRZEŁĄCZANIA ZAKŁADOK (GLOBALNA)
// ==========================================
function switchTab(viewId) {
  const cards = document.querySelectorAll('.calculator-card');
  cards.forEach(card => card.classList.add('hidden'));

  const activeCard = document.getElementById(viewId);
  if (activeCard) {
    activeCard.classList.remove('hidden');
  }

  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  if (viewId === 'calcView') document.getElementById('tabCalcBtn')?.classList.add('active');
  if (viewId === 'bossView') document.getElementById('tabBossBtn')?.classList.add('active');
  if (viewId === 'speedView') {
    document.getElementById('tabSpeedBtn')?.classList.add('active');
    updateSpeedGaps();
  }
}

// BAZA DANYCH SPEED GAPS I PRZELICZNIKÓW AGI
const speedGapsData = {
  dw: {
    name: "Dark Wizard / SM / Grand Master",
    img: "img/sm.png",
    agiRatio: "10 Agility = 1 Speed",
    skills: [
      {
        skillName: "Meteor Storm",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1-127" },
          { lvlGap: "Lvl 2", speed: "128 - 155" },
          { lvlGap: "Lvl 3", speed: "156 - 188" },
          { lvlGap: "Lvl 4", speed: "189 - 229" },
          { lvlGap: "Lvl 5", speed: "230 - 283" },
          { lvlGap: "Lvl 6", speed: "284 - 288" }
        ]
      },
    ]
  },
  dk: {
    name: "Dark Knight / BK / BM",
    img: "img/party.png",
    agiRatio: "15 Agility = 1 Speed",
    skills: [
      {
        skillName: "Blow",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1-131" },
          { lvlGap: "Lvl 2", speed: "132 - 156" },
          { lvlGap: "Lvl 3", speed: "157 - 187" },
          { lvlGap: "Lvl 4", speed: "188 - 229" },
          { lvlGap: "Lvl 5", speed: "230 - 287" },
          { lvlGap: "Lvl 6", speed: "288" }
        ]
      },
    ]
  },
  elf: {
    name: "Fairy Elf / Muse Elf / High Elf",
    img: "img/party.png",
    agiRatio: "22 Agility = 1 Speed",
    skills: [
      {
        skillName: "Raining Arrow",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 151" },
          { lvlGap: "Lvl 2", speed: "152 - 187" },
          { lvlGap: "Lvl 3", speed: "188 - 237" },
          { lvlGap: "Lvl 4", speed: "238 - 275" }
        ]
      },
      {
        skillName: "Triple Shot,Ice Arrow,Focus Shot",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 174" },
          { lvlGap: "Lvl 2", speed: "175 - 216" },
          { lvlGap: "Lvl 3", speed: "217 - 274" },
          { lvlGap: "Lvl 4", speed: "275 - FULL" }
        ]
      },
      {
        skillName: "Holy Bolt,Buffs",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 119" },
          { lvlGap: "Lvl 2", speed: "120 - 141" },
          { lvlGap: "Lvl 3", speed: "142 - 167" },
          { lvlGap: "Lvl 4", speed: "168 - 199" },
          { lvlGap: "Lvl 5", speed: "200 - 238" },
          { lvlGap: "Lvl 6", speed: "239 - FULL" },
        ]
      },
    ]
  },
  mg: {
    name: "Magic Gladiator / Duel Master",
    img: "img/party.png",
    agiRatio: "10 Agility = 1 Speed",
    skills: [
      {
        skillName: "Chaos Blade,Fire Blood",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 188" },
          { lvlGap: "Lvl 2", speed: "189 - 210" },
          { lvlGap: "Lvl 3", speed: "211 - 236" },
          { lvlGap: "Lvl 4", speed: "237 - 269" },
          { lvlGap: "Lvl 5", speed: "270 - 312" },
          { lvlGap: "Lvl 6", speed: "313 - 351" }
        ]
      },
      {
        skillName: "Gigantic Storm, Havok Spear,Dark Blast",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 186" },
          { lvlGap: "Lvl 2", speed: "187 - 208" },
          { lvlGap: "Lvl 3", speed: "209 - 239" },
          { lvlGap: "Lvl 4", speed: "240 - 281" },
          { lvlGap: "Lvl 5", speed: "282 - 339" },
          { lvlGap: "Lvl 6", speed: "340 - 351" }
        ]
      },
    ]
  },
  dl: {
    name: "Dark Lord / Lord Emperor",
    img: "img/party.png",
    agiRatio: "10 Agility = 1 Speed",
    skills: [
      {
        skillName: "All Skills",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 140" },
          { lvlGap: "Lvl 2", speed: "141 - 162" },
          { lvlGap: "Lvl 3", speed: "163 - 189" },
          { lvlGap: "Lvl 4", speed: "190 - 225" },
          { lvlGap: "Lvl 5", speed: "226 - 273" },
          { lvlGap: "Lvl 6", speed: "274 - FULL" },
        ]
      }
    ]
  },
  sum: {
    name: "Summoner / Dimension Master",
    img: "img/party.png",
    agiRatio: "20 Agility = 1 Speed",
    skills: [
      {
        skillName: "Fire Beast",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 102" },
          { lvlGap: "Lvl 2", speed: "103 - 124" },
          { lvlGap: "Lvl 3", speed: "125 - 151" },
          { lvlGap: "Lvl 4", speed: "152 - 187" },
          { lvlGap: "Lvl 5", speed: "188 - FULL" },
        ]
      },
      {
        skillName: "Death Scythe",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 119" },
          { lvlGap: "Lvl 2", speed: "120 - 134" },
          { lvlGap: "Lvl 3", speed: "135 - 151" },
          { lvlGap: "Lvl 4", speed: "152 - 170" },
          { lvlGap: "Lvl 5", speed: "171 - FULL" },
        ]
      },
    ]
  },
  rf: {
    name: "Rage Fighter / Fist Master",
    img: "img/party.png",
    agiRatio: "8 Agility = 1 Speed",
    skills: [
      {
        skillName: "Dark Side",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 283" },
          { lvlGap: "Lvl 2", speed: "284 - 314" },
          { lvlGap: "Lvl 3", speed: "315 - 349" },
          { lvlGap: "Lvl 4", speed: "350 - 391" },
          { lvlGap: "Lvl 5", speed: "392 - 440" },
          { lvlGap: "Lvl 6", speed: "441 - FULL" }
        ]
      },
      {
        skillName: "Spirit Hook",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 283" },
          { lvlGap: "Lvl 2", speed: "162 - 199" },
          { lvlGap: "Lvl 3", speed: "200 - 245" },
          { lvlGap: "Lvl 4", speed: "246 - 298" },
          { lvlGap: "Lvl 5", speed: "299 - 366" },
          { lvlGap: "Lvl 6", speed: "367 - FULL" },
        ]
      },
    ]
  },
  gl: {
    name: "Grow Lancer / Mirage Lancer",
    img: "img/party.png",
    agiRatio: "20 Agility = 1 Speed",
    skills: [
      {
        skillName: "Oversting",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 149" },
          { lvlGap: "Lvl 2", speed: "150 - 169" },
          { lvlGap: "Lvl 3", speed: "170 - 191" },
          { lvlGap: "Lvl 4", speed: "192 - 217" },
          { lvlGap: "Lvl 5", speed: "218 - 247" },
          { lvlGap: "Lvl 6", speed: "248 - FULL" },
        ]
      },
      {
        skillName: "Wild Breath",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 119" },
          { lvlGap: "Lvl 2", speed: "120 - 141" },
          { lvlGap: "Lvl 3", speed: "142 - 168" },
          { lvlGap: "Lvl 4", speed: "169 - 199" },
          { lvlGap: "Lvl 5", speed: "200 - 238" },
          { lvlGap: "Lvl 6", speed: "239 - FULL" },
        ]
      },
    ]
  },
  rw: {
    name: "Rune Wizard / Rune Master",
    img: "img/party.png",
    agiRatio: "12 Agility = 1 Speed",
    skills: [
      {
        skillName: "Lightning Storm",
        gaps: [
          { lvlGap: "Lvl 1", speed: "0 - 165" },
          { lvlGap: "Lvl 2", speed: "166 - 183" },
          { lvlGap: "Lvl 3", speed: "184 - 202" },
          { lvlGap: "Lvl 4", speed: "203 - 224" },
          { lvlGap: "Lvl 5", speed: "225 - 249" },
          { lvlGap: "Lvl 6", speed: "250 - FULL" }
        ]
      },
      {
        skillName: "Magic Arrow",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 173" },
          { lvlGap: "Lvl 2", speed: "174 - 193" },
          { lvlGap: "Lvl 3", speed: "194 - 216" },
          { lvlGap: "Lvl 4", speed: "217 - 242" },
          { lvlGap: "Lvl 5", speed: "243 - 273" },
          { lvlGap: "Lvl 6", speed: "274 - FULL" }
        ]
      },
    ]
  },
  sl: {
    name: "Slayer / Royal Slayer",
    img: "img/party.png",
    agiRatio: "10 Agility = 1 Speed",
    skills: [
      {
        skillName: "Pierce Attack",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 237" },
          { lvlGap: "Lvl 2", speed: "238 - 299" },
          { lvlGap: "Lvl 3", speed: "300 - 371" },
          { lvlGap: "Lvl 4", speed: "372 - FULL" },
        ]
      },
      {
        skillName: "Inertia Sword",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 239" },
          { lvlGap: "Lvl 2", speed: "240 - 284" },
          { lvlGap: "Lvl 3", speed: "285 - 340" },
          { lvlGap: "Lvl 4", speed: "341 - FULL" },
        ]
      },
    ]
  },
  gc: {
    name: "Gun Crusher / Master Gunner",
    img: "img/party.png",
    agiRatio: "15 Agility = 1 Speed",
    skills: [
      {
        skillName: "Busting Flare",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 122" },
          { lvlGap: "Lvl 2", speed: "123 - 141" },
          { lvlGap: "Lvl 3", speed: "142 - 166" },
          { lvlGap: "Lvl 4", speed: "167 - 198" },
          { lvlGap: "Lvl 5", speed: "199 - 245" },
          { lvlGap: "Lvl 6", speed: "246 - FULL" }
        ]
      }
    ]
  },
  ww: {
    name: "White Wizard / Glory Wizard",
    img: "img/party.png",
    agiRatio: "10 Agility = 1 Speed",
    skills: [
      {
        skillName: "Spear Storm",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 127" },
          { lvlGap: "Lvl 2", speed: "128 - 155" },
          { lvlGap: "Lvl 3", speed: "156 - 188" },
          { lvlGap: "Lvl 4", speed: "189 - 229" },
          { lvlGap: "Lvl 5", speed: "230 - 283" },
          { lvlGap: "Lvl 6", speed: "284 - 304" },
        ]
      }
    ]
  },
  lem: {
    name: "Lemuria / Mage",
    img: "img/party.png",
    agiRatio: "10 Agility = 1 Speed",
    skills: [
      {
        skillName: "Ultimate Force",
        gaps: [
          { lvlGap: "Lvl 1", speed: "0 - 147" },
          { lvlGap: "Lvl 2", speed: "148 - 164" },
          { lvlGap: "Lvl 3", speed: "165 - 184" },
          { lvlGap: "Lvl 4", speed: "185 - 211" },
          { lvlGap: "Lvl 5", speed: "212 - 247" },
          { lvlGap: "Lvl 6", speed: "248 - FULL" }
        ]
      }
    ]
  },
  ik: {
    name: "Illusion Knight / Mystic Knight",
    img: "img/party.png",
    agiRatio: "10 Agility = 1 Speed",
    skills: [
      {
        skillName: "Blade Storm",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 216" },
          { lvlGap: "Lvl 2", speed: "217 - 239" },
          { lvlGap: "Lvl 3", speed: "240 - 266" },
          { lvlGap: "Lvl 4", speed: "267 - 299" },
          { lvlGap: "Lvl 5", speed: "300 - 341" },
          { lvlGap: "Lvl 6", speed: "342 - 350" }
        ]
      }
    ]
  },
  al: {
    name: "Alchemist / Alchemic Master",
    img: "img/party.png",
    agiRatio: "11 Agility = 1 Speed",
    skills: [
      {
        skillName: "Countless Weapon",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 147" },
          { lvlGap: "Lvl 2", speed: "148 - 175" },
          { lvlGap: "Lvl 3", speed: "176 - 208" },
          { lvlGap: "Lvl 4", speed: "209 - 249" },
          { lvlGap: "Lvl 5", speed: "250 - 303" },
          { lvlGap: "Lvl 6", speed: "304 - 329" }
        ]
      }
    ]
  },
  cru: {
    name: "Crusader",
    img: "img/party.png",
    agiRatio: "12 Agility = 1 Speed",
    skills: [
      {
        skillName: "Sacred Impact",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 109" },
          { lvlGap: "Lvl 2", speed: "110 - 124" },
          { lvlGap: "Lvl 3", speed: "125 - 140" },
          { lvlGap: "Lvl 4", speed: "141 - 159" },
          { lvlGap: "Lvl 5", speed: "160 - 182" },
          { lvlGap: "Lvl 6", speed: "183 - 210" },
          { lvlGap: "Lvl 7", speed: "211 - 243" },
          { lvlGap: "Lvl 8", speed: "244 - 284" },
          { lvlGap: "Lvl 9", speed: "285" },
        ]
      }
    ]
  }
};

// FUNKCJA DYNAMICZNIE RENDERUJĄCA PIONOWY UKŁAD SPEED GAPS
function updateSpeedGaps() {
  const heroSelect = document.getElementById('hero-class');
  if (!heroSelect) return;

  const selectedClass = heroSelect.value;
  const data = speedGapsData[selectedClass];

  if (!data) return;

  // Podmiana danych nagłówka
  document.getElementById('hero-name').innerText = data.name;
  document.getElementById('hero-img').src = data.img;

  // Podmiana przelicznika AGI w 2 liniach
  const agiContainer = document.getElementById('agi-ratio-container');
  if (agiContainer) {
    agiContainer.innerHTML = `
      <div class="agi-title">Przelicznik Agility:</div>
      <div class="agi-value">${data.agiRatio}</div>
    `;
  }

  // Generowanie tabel dla umiejętności
  const container = document.getElementById('gap-info-content');
  if (!container) return;

  let html = '';

  data.skills.forEach(sk => {
    html += `
      <div class="skill-section">
        <h4 class="skill-title">Czar / Skill: <span>${sk.skillName}</span></h4>
        <div class="table-container">
          <table class="boss-table gap-table">
            <thead>
              <tr>
                <th style="width: 35%;">GAP (Lvl)</th>
                <th>SPEED</th>
              </tr>
            </thead>
            <tbody>
    `;

    sk.gaps.forEach(item => {
      html += `
        <tr>
          <td style="font-weight: bold; color: #00b37e;">${item.lvlGap}</td>
          <td>${item.speed}</td>
        </tr>
      `;
    });

    html += `
            </tbody>
          </table>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('dblclick', function () {
      this.select();
    });
  });

  // AUDIO SYSTEM
  const sounds = {
    click: new Audio('sound/eMeleeHit5.wav'),
    warning: new Audio('sound/eMedal.wav'),
    ready: new Audio('sound/eGem.wav')
  };

  let audioUnlocked = false;
  function unlockAudio() {
    if (audioUnlocked) return;
    Object.values(sounds).forEach(snd => {
      snd.play().then(() => {
        snd.pause();
        snd.currentTime = 0;
      }).catch(() => {});
    });
    audioUnlocked = true;
    document.removeEventListener('click', unlockAudio);
  }
  document.addEventListener('click', unlockAudio);

  function playSound(type) {
    if (sounds[type]) {
      sounds[type].currentTime = 0;
      sounds[type].play().catch(err => console.log("Przeglądarka zablokowała dźwięk:", err));
    }
  }

  const playedWarning = new Set();
  const playedReady = new Set();

  // 1. KALKULATOR EXP
  const calcBtn = document.getElementById('calcBtn');

  function calculateTime(currentLevel, desiredLevel, expPerSecond, barValue, expDatabase) {
    if (desiredLevel <= currentLevel) throw new Error("Docelowy level musi być większy niż aktualny.");
    if (expPerSecond <= 0) throw new Error("EXP na sekundę musi być większy od zera.");
    if (barValue < 0 || barValue > 10) throw new Error("Bar musi być w zakresie 0–10.");

    const expThisLevel = expDatabase[currentLevel];
    if (expThisLevel === undefined) throw new Error(`Brak danych EXP dla poziomu ${currentLevel}.`);

    const progressRatio = barValue / 10.0;
    const remainingInCurrent = expThisLevel * (1.0 - progressRatio);

    let remainingFullLevels = 0;
    for (let lvl = currentLevel + 1; lvl < desiredLevel; lvl++) {
      if (expDatabase[lvl] !== undefined) {
        remainingFullLevels += expDatabase[lvl];
      } else {
        throw new Error(`Brak danych EXP dla poziomu ${lvl}.`);
      }
    }

    const remainingExp = remainingInCurrent + remainingFullLevels;
    if (remainingExp <= 0) return { days: 0, hours: 0, minutes: 0, totalExp: 0, remainingInCurrent: 0 };

    const totalSeconds = remainingExp / expPerSecond;
    const totalMinutes = Math.round(totalSeconds / 60);

    const days = Math.floor(totalMinutes / (24 * 60));
    const minutesLeft = totalMinutes % (24 * 60);
    const hours = Math.floor(minutesLeft / 60);
    const minutes = minutesLeft % 60;

    return { days, hours, minutes, totalExp: remainingExp, remainingInCurrent };
  }

  calcBtn?.addEventListener('click', () => {
    try {
      const currentLvl = parseInt(document.getElementById('currentLvl').value);
      const targetLvl = parseInt(document.getElementById('targetLvl').value);
      const expPerSec = parseFloat(document.getElementById('expPerSec').value);
      const expBar = parseFloat(document.getElementById('expBar').value) || 0;

      const expDatabase = typeof exp_data !== 'undefined' ? exp_data : (typeof EXP_TO_NEXT !== 'undefined' ? EXP_TO_NEXT : null);
      if (!expDatabase) {
        alert("Błąd: Nie załadowano bazy exp_data.js!");
        return;
      }

      const res = calculateTime(currentLvl, targetLvl, expPerSec, expBar, expDatabase);

      document.getElementById('currentLevelRemainingExp').innerText = Math.round(res.remainingInCurrent).toLocaleString('pl-PL');
      document.getElementById('expNeeded').innerText = Math.round(res.totalExp).toLocaleString('pl-PL');
      document.getElementById('timeToTarget').innerText = `${res.days} dni, ${res.hours} godzin, ${res.minutes} minut`;
    } catch (err) {
      alert(err.message);
    }
  });

  // TIMER TESTU
  let timerInterval = null;
  const timerDisplay = document.getElementById('timerDisplay');

  document.getElementById('startTimerBtn')?.addEventListener('click', () => {
    clearInterval(timerInterval);
    let sec = (parseInt(document.getElementById('timerMinutes').value) || 10) * 60;

    const updateDisp = (s) => {
      const h = Math.floor(s / 3600).toString().padStart(2, '0');
      const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
      const sc = Math.floor(s % 60).toString().padStart(2, '0');
      timerDisplay.innerText = `${h}:${m}:${sc}`;
    };

    updateDisp(sec);
    timerInterval = setInterval(() => {
      sec--;
      if (sec <= 0) {
        clearInterval(timerInterval);
        updateDisp(0);
        playSound('ready');
        alert('Czas testu dobiegł końca!');
      } else {
        updateDisp(sec);
      }
    }, 1000);
  });

  document.getElementById('stopTimerBtn')?.addEventListener('click', () => {
    clearInterval(timerInterval);
    const mins = parseInt(document.getElementById('timerMinutes').value) || 10;
    const h = Math.floor((mins * 60) / 3600).toString().padStart(2, '0');
    const m = Math.floor(((mins * 60) % 3600) / 60).toString().padStart(2, '0');
    timerDisplay.innerText = `${h}:${m}:00`;
  });

  // 2. BOSS TIMER LOGIKA
  let bossData = JSON.parse(localStorage.getItem('mu_boss_data') || '[]');
  let selectedRowId = null;

  function updateSystemClock() {
    const now = new Date();
    document.getElementById('systemClock').innerText = now.toTimeString().split(' ')[0];
  }
  setInterval(updateSystemClock, 1000);
  updateSystemClock();

  function formatHM(dateObj) {
    const h = dateObj.getHours().toString().padStart(2, '0');
    const m = dateObj.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  function saveBosses() {
    localStorage.setItem('mu_boss_data', JSON.stringify(bossData));
  }

  document.getElementById('addBossBtn')?.addEventListener('click', () => {
    const boss = document.getElementById('bossSelect').value;
    const ch = document.getElementById('bossCh').value.trim();
    const timeVal = document.getElementById('bossTimeInput').value.trim();

    if (!ch) {
      alert("Podaj numer CH!");
      return;
    }

    const parts = timeVal.split(':');
    if (parts.length !== 2) {
      alert("Format czasu to H:M (np. 0:30 lub 1:15)!");
      return;
    }

    const h = parseInt(parts[0]);
    const m = parseInt(parts[1]);

    if (isNaN(h) || isNaN(m) || h < 0 || m < 0 || m > 59 || (h === 0 && m === 0)) {
      alert("Wpisz poprawny czas w formacie H:M!");
      return;
    }

    const duplicate = bossData.some(b => b.boss === boss && String(b.ch) === ch);
    if (duplicate) {
      alert(`"${boss}" na CH ${ch} jest już na liście!`);
      return;
    }

    const targetDate = new Date(Date.now() + (h * 3600 + m * 60) * 1000);
    const internalId = 'boss_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);

    bossData.push({
      id: internalId,
      boss,
      ch,
      targetTime: targetDate.toISOString()
    });

    playSound('click');
    saveBosses();
    renderBossTable();
    document.getElementById('bossTimeInput').value = '';
  });

  function renderBossTable() {
    bossData.sort((a, b) => new Date(a.targetTime) - new Date(b.targetTime));

    const tbody = document.getElementById('bossTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const now = new Date();

    bossData.forEach((item, index) => {
      const tObj = new Date(item.targetTime);
      const secs = (tObj - now) / 1000;

      let remainsText = '';
      let statusClass = '';

      if (secs > 120) {
        const mins = Math.ceil(secs / 60);
        remainsText = mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins} min`;
      } else if (secs > 0) {
        remainsText = `${Math.floor(secs)} sek!`;
        statusClass = 'status-warning';

        if (!playedWarning.has(item.id)) {
          playSound('warning');
          playedWarning.add(item.id);
        }
      } else {
        remainsText = '!!! READY !!!';
        statusClass = 'status-ready';

        if (!playedReady.has(item.id)) {
          playSound('ready');
          playedReady.add(item.id);
        }
      }

      const tr = document.createElement('tr');
      if (item.id === selectedRowId) tr.classList.add('selected');

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${formatHM(tObj)}</td>
        <td class="${statusClass}">${item.boss}</td>
        <td class="${statusClass}">${item.ch}</td>
        <td class="${statusClass}">${remainsText}</td>
      `;

      tr.addEventListener('click', () => {
        document.querySelectorAll('#bossTableBody tr').forEach(r => r.classList.remove('selected'));
        tr.classList.add('selected');
        selectedRowId = item.id;
      });

      tbody.appendChild(tr);
    });
  }

  setInterval(renderBossTable, 1000);
  renderBossTable();

  document.getElementById('removeSelectedBtn')?.addEventListener('click', () => {
    if (!selectedRowId) {
      alert("Zaznacz wiersz w tabeli, który chcesz usunąć.");
      return;
    }
    bossData = bossData.filter(b => b.id !== selectedRowId);
    playedWarning.delete(selectedRowId);
    playedReady.delete(selectedRowId);
    selectedRowId = null;
    saveBosses();
    renderBossTable();
  });

  document.getElementById('clearAllBossesBtn')?.addEventListener('click', () => {
    if (confirm("Wyczyścić całą listę bossów?")) {
      bossData = [];
      playedWarning.clear();
      playedReady.clear();
      selectedRowId = null;
      saveBosses();
      renderBossTable();
    }
  });

  updateSpeedGaps();
});