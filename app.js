document.addEventListener('DOMContentLoaded', () => {
  // --- ZARZĄDZANIE ZAKŁADKAMI ---
  const tabCalcBtn = document.getElementById('tabCalcBtn');
  const tabBossBtn = document.getElementById('tabBossBtn');
  const calcView = document.getElementById('calcView');
  const bossView = document.getElementById('bossView');

  tabCalcBtn?.addEventListener('click', () => {
    tabCalcBtn.classList.add('active');
    tabBossBtn.classList.remove('active');
    calcView.classList.remove('hidden');
    bossView.classList.add('hidden');
  });

  tabBossBtn?.addEventListener('click', () => {
    tabBossBtn.classList.add('active');
    tabCalcBtn.classList.remove('active');
    bossView.classList.remove('hidden');
    calcView.classList.add('hidden');
  });

  // --- ZAZNACZANIE TEKSTU DBLCLICK ---
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('dblclick', function () {
      this.select();
    });
  });

  // ==========================================
  // ODSŁUCH DŹWIĘKÓW (AUDIO SYSTEM)
  // ==========================================
  const sounds = {
    click: new Audio('sound/eMeleeHit5.wav'),
    warning: new Audio('sound/eMedal.wav'),
    ready: new Audio('sound/eGem.wav')
  };

  // Odblokowanie audio w przeglądarce przy pierwszej interakcji
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

  // Set-y do śledzenia odtworzonych alarmów (tak jak w Pythonie)
  const playedWarning = new Set();
  const playedReady = new Set();


  // ==========================================
  // 1. KALKULATOR EXP
  // ==========================================
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

  // --- TIMER TESTU ---
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


  // ==========================================
  // 2. BOSS TIMER LOGIKA
  // ==========================================
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

    playSound('click'); // Dźwięk dodania bossa
    saveBosses();
    renderBossTable();
    document.getElementById('bossTimeInput').value = '';
  });

  function renderBossTable() {
    bossData.sort((a, b) => new Date(a.targetTime) - new Date(b.targetTime));

    const tbody = document.getElementById('bossTableBody');
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

        // Odtwórz dźwięk ostrzeżenia (tylko raz dla danego timera)
        if (!playedWarning.has(item.id)) {
          playSound('warning');
          playedWarning.add(item.id);
        }
      } else {
        remainsText = '!!! READY !!!';
        statusClass = 'status-ready';

        // Odtwórz dźwięk gotowości (tylko raz dla danego timera)
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
});