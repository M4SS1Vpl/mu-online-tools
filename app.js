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

  if (viewId === 'homeView') document.getElementById('tabHomeBtn')?.classList.add('active');
  if (viewId === 'calcView') document.getElementById('tabCalcBtn')?.classList.add('active');
  if (viewId === 'bossView') document.getElementById('tabBossBtn')?.classList.add('active');
  if (viewId === 'timerView') document.getElementById('tabTimerBtn')?.classList.add('active');
  if (viewId === 'eventsView') document.getElementById('tabEventsBtn')?.classList.add('active');
  if (viewId === 'speedView') {
    document.getElementById('tabSpeedBtn')?.classList.add('active');
    updateSpeedGaps();
  }
}
window.switchTab = switchTab;

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
          { lvlGap: "Lvl 1", speed: "1 - 127" },
          { lvlGap: "Lvl 2", speed: "128 - 155" },
          { lvlGap: "Lvl 3", speed: "156 - 188" },
          { lvlGap: "Lvl 4", speed: "189 - 229" },
          { lvlGap: "Lvl 5", speed: "230 - 283" },
          { lvlGap: "Lvl 6", speed: "284 - 288" }
        ]
      }
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
          { lvlGap: "Lvl 1", speed: "1 - 131" },
          { lvlGap: "Lvl 2", speed: "132 - 156" },
          { lvlGap: "Lvl 3", speed: "157 - 187" },
          { lvlGap: "Lvl 4", speed: "188 - 229" },
          { lvlGap: "Lvl 5", speed: "230 - 287" },
          { lvlGap: "Lvl 6", speed: "288" }
        ]
      }
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
        skillName: "Triple Shot, Ice Arrow, Focus Shot",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 174" },
          { lvlGap: "Lvl 2", speed: "175 - 216" },
          { lvlGap: "Lvl 3", speed: "217 - 274" },
          { lvlGap: "Lvl 4", speed: "275 - FULL" }
        ]
      },
      {
        skillName: "Holy Bolt, Buffs",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 119" },
          { lvlGap: "Lvl 2", speed: "120 - 141" },
          { lvlGap: "Lvl 3", speed: "142 - 167" },
          { lvlGap: "Lvl 4", speed: "168 - 199" },
          { lvlGap: "Lvl 5", speed: "200 - 238" },
          { lvlGap: "Lvl 6", speed: "239 - FULL" }
        ]
      }
    ]
  },
  mg: {
    name: "Magic Gladiator / Duel Master",
    img: "img/party.png",
    agiRatio: "10 Agility = 1 Speed",
    skills: [
      {
        skillName: "Chaos Blade, Fire Blood",
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
        skillName: "Gigantic Storm, Havok Spear, Dark Blast",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 186" },
          { lvlGap: "Lvl 2", speed: "187 - 208" },
          { lvlGap: "Lvl 3", speed: "209 - 239" },
          { lvlGap: "Lvl 4", speed: "240 - 281" },
          { lvlGap: "Lvl 5", speed: "282 - 339" },
          { lvlGap: "Lvl 6", speed: "340 - 351" }
        ]
      }
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
          { lvlGap: "Lvl 6", speed: "274 - FULL" }
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
          { lvlGap: "Lvl 5", speed: "188 - FULL" }
        ]
      },
      {
        skillName: "Death Scythe",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 119" },
          { lvlGap: "Lvl 2", speed: "120 - 134" },
          { lvlGap: "Lvl 3", speed: "135 - 151" },
          { lvlGap: "Lvl 4", speed: "152 - 170" },
          { lvlGap: "Lvl 5", speed: "171 - FULL" }
        ]
      }
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
          { lvlGap: "Lvl 1", speed: "1 - 161" },
          { lvlGap: "Lvl 2", speed: "162 - 199" },
          { lvlGap: "Lvl 3", speed: "200 - 245" },
          { lvlGap: "Lvl 4", speed: "246 - 298" },
          { lvlGap: "Lvl 5", speed: "299 - 366" },
          { lvlGap: "Lvl 6", speed: "367 - FULL" }
        ]
      }
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
          { lvlGap: "Lvl 6", speed: "248 - FULL" }
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
          { lvlGap: "Lvl 6", speed: "239 - FULL" }
        ]
      }
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
          { lvlGap: "Lvl 1", speed: "1 - 165" },
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
      }
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
          { lvlGap: "Lvl 4", speed: "372 - FULL" }
        ]
      },
      {
        skillName: "Inertia Sword",
        gaps: [
          { lvlGap: "Lvl 1", speed: "1 - 239" },
          { lvlGap: "Lvl 2", speed: "240 - 284" },
          { lvlGap: "Lvl 3", speed: "285 - 340" },
          { lvlGap: "Lvl 4", speed: "341 - FULL" }
        ]
      }
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
          { lvlGap: "Lvl 6", speed: "284 - 304" }
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
          { lvlGap: "Lvl 1", speed: "1 - 147" },
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
          { lvlGap: "Lvl 9", speed: "285" }
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

  const heroNameEl = document.getElementById('hero-name');
  const heroImgEl = document.getElementById('hero-img');
  
  if (heroNameEl) heroNameEl.innerText = data.name;
  if (heroImgEl) {
    heroImgEl.src = data.img;
    heroImgEl.onerror = function() { this.src = 'img/party.png'; };
  }

  const agiContainer = document.getElementById('agi-ratio-container');
  if (agiContainer) {
    agiContainer.innerHTML = `
      <div class="agi-title">Przelicznik Agility:</div>
      <div class="agi-value">${data.agiRatio}</div>
    `;
  }

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
  // Zaznaczanie tekstu po podwójnym kliknięciu w inputy
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('dblclick', function () {
      this.select();
    });
  });

  // Nawigacja zakładkami
  document.getElementById('tabHomeBtn')?.addEventListener('click', () => switchTab('homeView'));
  document.getElementById('tabCalcBtn')?.addEventListener('click', () => switchTab('calcView'));
  document.getElementById('tabBossBtn')?.addEventListener('click', () => switchTab('bossView'));
  document.getElementById('tabTimerBtn')?.addEventListener('click', () => switchTab('timerView'));
  document.getElementById('tabEventsBtn')?.addEventListener('click', () => switchTab('eventsView'));
  document.getElementById('tabSpeedBtn')?.addEventListener('click', () => switchTab('speedView'));

  // SYSTEM DŹWIĘKÓW
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

  // 2. BOSS TIMER LOGIKA
  let bossData = JSON.parse(localStorage.getItem('mu_boss_data') || '[]');
  let selectedRowId = null;

  function updateSystemClock() {
    const clockEl = document.getElementById('systemClock');
    if (clockEl) clockEl.innerText = new Date().toTimeString().split(' ')[0];
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
    const bossSelect = document.getElementById('bossSelect');
    const bossChEl = document.getElementById('bossCh');
    const bossTimeEl = document.getElementById('bossTimeInput');

    if (!bossSelect || !bossChEl || !bossTimeEl) return;

    const boss = bossSelect.value;
    const ch = bossChEl.value.trim();
    const timeVal = bossTimeEl.value.trim();

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
    bossTimeEl.value = '';
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

  // 3. WIELOKROTNE TIMERY
  let customTimers = [];

  document.getElementById('addCustomTimerBtn')?.addEventListener('click', () => {
    const labelInput = document.getElementById('customTimerLabel');
    const minInput = document.getElementById('customTimerMinutes');

    const label = labelInput ? labelInput.value.trim() || 'Timer' : 'Timer';
    const minutes = minInput ? parseInt(minInput.value) || 10 : 10;

    const newTimer = {
      id: Date.now(),
      label: label,
      remainingSeconds: minutes * 60,
      isRunning: true
    };

    customTimers.push(newTimer);
    if (labelInput) labelInput.value = '';
    playSound('click');
    renderCustomTimers();
  });

  function renderCustomTimers() {
    const container = document.getElementById('activeTimersContainer');
    if (!container) return;

    container.innerHTML = '';

    customTimers.forEach(timer => {
      const card = document.createElement('div');
      card.className = `timer-card ${timer.remainingSeconds <= 0 ? 'finished' : ''}`;

      const m = String(Math.floor(timer.remainingSeconds / 60)).padStart(2, '0');
      const s = String(timer.remainingSeconds % 60).padStart(2, '0');

      card.innerHTML = `
        <div class="timer-card-title">${timer.label}</div>
        <div class="timer-card-time">${m}:${s}</div>
        <div class="timer-card-controls">
          <button class="btn-secondary toggle-btn">${timer.isRunning ? 'Pauza' : 'Start'}</button>
          <button class="btn-danger delete-btn">Usuń</button>
        </div>
      `;

      card.querySelector('.toggle-btn').addEventListener('click', () => {
        timer.isRunning = !timer.isRunning;
        renderCustomTimers();
      });

      card.querySelector('.delete-btn').addEventListener('click', () => {
        customTimers = customTimers.filter(t => t.id !== timer.id);
        renderCustomTimers();
      });

      container.appendChild(card);
    });
  }

  setInterval(() => {
    let changed = false;
    customTimers.forEach(timer => {
      if (timer.isRunning && timer.remainingSeconds > 0) {
        timer.remainingSeconds--;
        changed = true;
        if (timer.remainingSeconds === 0) {
          playSound('ready');
        }
      }
    });
    if (changed) renderCustomTimers();
  }, 1000);

  // 4. HARMONOGRAM EVENTÓW
  const eventsData = {
    bc: { 
      name: "Blood Castle", 
      tbodyId: "bcTableBody",
      times: ["00:10", "00:40", "01:10", "01:40", "02:10", "02:40", "03:10", "03:40", "05:10", "07:10", "09:10", "11:10", "13:10", "15:10", "17:10", "19:10", "21:10", "21:40", "22:10", "22:40", "23:10"]
    },
    ds: { 
      name: "Devil Square", 
      tbodyId: "dsTableBody",
      times: ["00:20", "00:50", "01:20", "01:50", "02:20", "02:50", "03:20", "03:50", "05:20", "07:20", "09:20", "11:20", "13:20", "15:20", "17:20", "19:20", "21:20", "21:50", "22:20", "22:50", "23:20"]
    },
    cc: { 
      name: "Chaos Castle", 
      tbodyId: "ccTableBody",
      times: ["01:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00", "23:00"]
    }
  };

  function getEventTimes(utcStr) {
    const [h, m] = utcStr.split(':').map(Number);
    const now = new Date();
    
    let startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), h, m, 0));
    let entryDate = new Date(startDate.getTime() - 5 * 60 * 1000);

    if (startDate < now) {
      startDate.setUTCDate(startDate.getUTCDate() + 1);
      entryDate = new Date(startDate.getTime() - 5 * 60 * 1000);
    }

    return { entryDate, startDate };
  }

  function getLocalEntryTimeStr(utcStr) {
    const [h, m] = utcStr.split(':').map(Number);
    const now = new Date();
    const eventDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), h, m, 0));
    eventDate.setMinutes(eventDate.getMinutes() - 5);

    return `${String(eventDate.getHours()).padStart(2, '0')}:${String(eventDate.getMinutes()).padStart(2, '0')}`;
  }

  function renderTables(allUpcoming) {
    Object.keys(eventsData).forEach(key => {
      const ev = eventsData[key];
      const tbody = document.getElementById(ev.tbodyId);
      if (!tbody) return;

      const activeEventForType = allUpcoming.find(u => u.typeKey === key);

      tbody.innerHTML = '';
      ev.times.forEach((utcTime, idx) => {
        const isCurrent = activeEventForType && activeEventForType.utcTime === utcTime;
        const row = document.createElement('tr');
        
        if (isCurrent) {
          row.className = 'row-next-event';
        }

        let statusBadge = '<span style="opacity: 0.6;">Planowany</span>';
        if (isCurrent) {
          statusBadge = activeEventForType.isOpen 
            ? '<span class="status-badge-next" style="background: #e74c3c; box-shadow: 0 0 10px rgba(231,76,60,0.8);">OTWARTY!</span>' 
            : '<span class="status-badge-next">NAJBLIŻSZY</span>';
        }

        row.innerHTML = `
          <td>${idx + 1}</td>
          <td><strong class="time-text">${getLocalEntryTimeStr(utcTime)}</strong></td>
          <td>${statusBadge}</td>
        `;
        tbody.appendChild(row);
      });
    });
  }

  // Obiekt globalny dźwięku dla eventów
  const eventSound = new Audio('sound/iEventStart.wav');
  const eventAlertPlayed = new Set(); // Zapobiega wielokrotnemu odtwarzaniu w tej samej sekundzie otwarcia

  function updateEventsSystem() {
    const now = new Date();
    let allUpcoming = [];

    Object.keys(eventsData).forEach(key => {
      const ev = eventsData[key];
      ev.times.forEach(utcTime => {
        const { entryDate, startDate } = getEventTimes(utcTime);
        const isOpen = now >= entryDate && now < startDate;
        const diffMs = isOpen ? (startDate - now) : (entryDate - now);

        allUpcoming.push({
          typeKey: key,
          name: ev.name,
          utcTime: utcTime,
          entryDate: entryDate,
          startDate: startDate,
          isOpen: isOpen,
          diffMs: diffMs,
          sortKey: isOpen ? (startDate - now) : (entryDate - now + 10000000)
        });
      });
    });

    allUpcoming.sort((a, b) => a.sortKey - b.sortKey);
    const top5 = allUpcoming.slice(0, 5);

    // SPRAWDZENIE DŹWIĘKU DLA NAJBLIŻSZEGO EVENTU (Gdy włącza się czerwona animacja "OTWARTE!")
    const soundToggle = document.getElementById('eventSoundToggle');
    if (top5.length > 0 && soundToggle && soundToggle.checked) {
      const nearest = top5[0];
      const eventUniqueKey = nearest.typeKey + "_" + nearest.utcTime;

      // Jeśli event właśnie wszedł w stan otwarcia (isOpen) i jeszcze nie zagrał dźwięk
      if (nearest.isOpen) {
        if (!eventAlertPlayed.has(eventUniqueKey)) {
          eventSound.currentTime = 0;
          eventSound.play().catch(e => console.log("Odtwarzanie dźwięku zablokowane przez przeglądarkę:", e));
          eventAlertPlayed.add(eventUniqueKey);
        }
      } else {
        // Resetujemy stan, gdy event minie lub jeszcze nie nadszedł
        eventAlertPlayed.delete(eventUniqueKey);
      }
    }

    const gridContainer = document.querySelector('.upcoming-events-grid');
    if (gridContainer) {
      gridContainer.innerHTML = '';

      top5.forEach((item) => {
        const totalSec = Math.floor(item.diffMs / 1000);
        const hrs = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = Math.floor(totalSec % 60);
        const localEntryStr = getLocalEntryTimeStr(item.utcTime);

        const mStr = String(m).padStart(2, '0');
        const sStr = String(s).padStart(2, '0');

        let timerFormatted = hrs > 0 ? `${hrs}h ${mStr}m ${sStr}s` : `${mStr}m ${sStr}s`;
        let timerHTML = `<div class="event-card-timer">${timerFormatted}</div>`;

        if (item.isOpen) {
          timerHTML = `
            <div class="event-card-timer-box">
              <span class="open-label">OTWARTE!</span>
              <span class="event-card-timer">${mStr}m ${sStr}s</span>
            </div>
          `;
        }

        const card = document.createElement('div');
        card.className = `event-card ${item.isOpen ? 'open-now' : ''}`;
        card.innerHTML = `
          <div class="event-card-name">${item.name}</div>
          ${timerHTML}
          <div class="event-card-localtime">Wejście: <strong>${localEntryStr}</strong> (lokalny)</div>
        `;
        gridContainer.appendChild(card);
      });
    }

    renderTables(allUpcoming);
  }

  setInterval(updateEventsSystem, 1000);
  updateEventsSystem();

  // Obsługa przełączania zakładek wewnątrz Eventów
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.event-tab-btn');
    if (btn) {
      document.querySelectorAll('.event-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.event-tab-content').forEach(box => {
        box.style.display = 'none';
        box.classList.remove('active');
      });

      const targetTab = btn.getAttribute('data-tab');
      const activeBox = document.getElementById('tab-' + targetTab);
      if (activeBox) {
        activeBox.style.display = 'block';
        activeBox.classList.add('active');
      }
    }
  });
});