/* ═══════════════════════════════════════════════════
   NOCTHARIS — MAIN JAVASCRIPT
   Matrix Rain, Terminal Typing, Scroll Effects, Form
   ═══════════════════════════════════════════════════ */

/* ── MATRIX RAIN ─────────────────────────────────── */
(function initMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars  = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF$@#%&!<>[]{}|/\\';
  const fontSize = 14;
  let cols  = Math.floor(canvas.width / fontSize);
  let drops = Array.from({ length: cols }, () => Math.random() * -50);

  window.addEventListener('resize', () => {
    cols  = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
  });

  function drawMatrix() {
    ctx.fillStyle = 'rgba(10,10,10,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font      = `${fontSize}px "Share Tech Mono", monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x    = i * fontSize;
      const y    = drops[i] * fontSize;

      // Leading character brighter
      ctx.fillStyle = drops[i] < 2 ? '#ccffcc' : '#00ff41';
      ctx.globalAlpha = 0.85;
      ctx.fillText(char, x, y);
      ctx.globalAlpha = 1;

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 0.5;
    }
  }

  setInterval(drawMatrix, 45);
})();


/* ── CUSTOM CURSOR ───────────────────────────────── */
(function initCursor() {
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  if (!cursor || window.innerWidth <= 480) return;

  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top  = my + 'px';
  });

  (function animCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(animCursor);
  })();

  // Hover effect on interactive elements
  const interactives = 'a, button, .service-card, .social-card, .badge, input, textarea, select';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactives)) {
      cursor.style.transform    = 'translate(-50%,-50%) scale(1.6)';
      cursor.style.borderColor  = '#fff';
      cursor.style.opacity      = '0.6';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactives)) {
      cursor.style.transform   = 'translate(-50%,-50%) scale(1)';
      cursor.style.borderColor = 'var(--green)';
      cursor.style.opacity     = '1';
    }
  });
})();


/* ── NAVBAR SCROLL ───────────────────────────────── */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const backTop  = document.getElementById('backTop');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;

    // Scrolled class
    navbar.classList.toggle('scrolled', sy > 50);

    // Back to top
    if (backTop) backTop.classList.toggle('visible', sy > 400);

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
      if (sy >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  // Back to top click
  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();


/* ── MOBILE NAV TOGGLE ───────────────────────────── */
(function initMobileNav() {
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.querySelectorAll('span').forEach(s => {
        s.style.transform = ''; s.style.opacity = '';
      });
    });
  });
})();


/* ── TERMINAL HERO TYPEWRITER ────────────────────── */
(function initHeroTerminal() {
  const output = document.getElementById('terminalOutput');
  if (!output) return;

  const lines = [
    { text: '> Inicializando sistema...',    cls: 'out-line',       delay: 600 },
    { text: '> Carregando perfil...',         cls: 'out-line',       delay: 400 },
    { text: 'Name:    MALACHAIS',             cls: 'out-line white', delay: 200 },
    { text: 'Role:    Hacker Ético & Dev',    cls: 'out-line white', delay: 200 },
    { text: 'Lab:     Cripta do Caos',        cls: 'out-line white', delay: 200 },
    { text: 'OS:      Kali Linux / Arch',     cls: 'out-line white', delay: 200 },
    { text: 'Status:  [ ONLINE ]',            cls: 'out-line green', delay: 300 },
    { text: '> Acesso concedido. ✓',          cls: 'out-line green', delay: 400 },
  ];

  let i = 0;
  function addLine() {
    if (i >= lines.length) return;
    const div = document.createElement('div');
    div.className = lines[i].cls;
    output.appendChild(div);
    typeText(div, lines[i].text, 28, () => {
      i++;
      setTimeout(addLine, lines[i - 1]?.delay || 200);
    });
  }
  setTimeout(addLine, 1200);
})();


/* ── HERO ROLE TYPEWRITER ────────────────────────── */
(function initRoleTyper() {
  const el = document.getElementById('roleText');
  if (!el) return;

  const roles = [
    'Hacker Ético',
    'Pentester',
    'Desenvolvedor Web',
    'Analista de Segurança',
    'Explorador do Oculto Digital',
    'Python & JS Developer',
  ];
  let ri = 0, ci = 0, deleting = false;

  function tick() {
    const current = roles[ri];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
      setTimeout(tick, 60);
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, 30);
    }
  }
  setTimeout(tick, 2500);
})();


/* ── HELPER: TYPE TEXT ───────────────────────────── */
function typeText(el, text, speed, cb) {
  let i = 0;
  function step() {
    el.textContent += text[i++];
    if (i < text.length) setTimeout(step, speed);
    else if (cb) cb();
  }
  step();
}


/* ── SCROLL REVEAL ───────────────────────────────── */
(function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.section-header, .sobre-grid, .skill-category, .service-card, .social-card, .tools-section, .order-wrap'
  );

  targets.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
})();


/* ── SKILL BARS ANIMATION ────────────────────────── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();


/* ── CHAR COUNTER ────────────────────────────────── */
(function initCharCounter() {
  const textarea  = document.getElementById('description');
  const countEl   = document.getElementById('charCount');
  if (!textarea || !countEl) return;

  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    countEl.textContent = len;
    countEl.style.color = len > 900 ? '#ff4444' : len > 700 ? '#ffcc00' : '';
    if (textarea.value.length > 1000) textarea.value = textarea.value.slice(0, 1000);
  });
})();


/* ── FORM VALIDATION & SUBMIT ────────────────────── */
(function initOrderForm() {
  const form        = document.getElementById('orderForm');
  const feedback    = document.getElementById('formFeedback');
  const feedbackClose = document.getElementById('feedbackClose');
  if (!form) return;

  function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }
  function clearErrors() {
    ['errName', 'errEmail', 'errService', 'errDesc'].forEach(id => showError(id, ''));
  }

  function validate() {
    clearErrors();
    let valid = true;

    const name    = document.getElementById('clientName').value.trim();
    const email   = document.getElementById('clientEmail').value.trim();
    const service = document.getElementById('serviceType').value;
    const desc    = document.getElementById('description').value.trim();

    if (!name) {
      showError('errName', '⚠ Informe seu nome ou nickname.');
      valid = false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('errEmail', '⚠ Insira um e-mail válido.');
      valid = false;
    }
    if (!service) {
      showError('errService', '⚠ Selecione o tipo de serviço.');
      valid = false;
    }
    if (!desc || desc.length < 20) {
      showError('errDesc', '⚠ Descreva o projeto (mínimo 20 caracteres).');
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitBtn  = document.getElementById('submitBtn');
    const btnText    = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Loading state
    btnText.style.display    = 'none';
    btnLoading.style.display = 'flex';
    submitBtn.disabled       = true;

    const urgency = document.querySelector('input[name="urgency"]:checked')?.value || 'media';

    const data = {
      clientName:   document.getElementById('clientName').value.trim(),
      clientEmail:  document.getElementById('clientEmail').value.trim(),
      serviceType:  document.getElementById('serviceType').value,
      urgency:      urgency,
      description:  document.getElementById('description').value.trim(),
      budget:       document.getElementById('budget').value.trim() || 'Não informado',
      status:       'pendente',
      createdAt:    new Date().toISOString(),
    };

    try {
      const response = await fetch('tables/service_requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Erro ao enviar');

      showFeedback(true, data.clientName);
      form.reset();
      document.getElementById('charCount').textContent = '0';

    } catch (err) {
      showFeedback(false);
    } finally {
      btnText.style.display    = '';
      btnLoading.style.display = 'none';
      submitBtn.disabled       = false;
    }
  });

  function showFeedback(success, name = '') {
    const icon  = document.getElementById('feedbackIcon');
    const title = document.getElementById('feedbackTitle');
    const msg   = document.getElementById('feedbackMsg');

    if (success) {
      icon.textContent  = '✓';
      title.textContent = ' PEDIDO RECEBIDO';
      msg.textContent   = `Olá, ${name}! Seu pedido foi registrado com sucesso na Cripta do Caos. Você receberá uma resposta em breve no e-mail informado. Obrigado por confiar no trabalho de Noctharis.`;
      feedback.querySelector('.feedback-terminal').style.borderColor = 'rgba(0,255,65,0.4)';
      feedback.querySelector('.feedback-header').style.color = '#00ff41';
    } else {
      icon.textContent  = '✗';
      title.textContent = ' ERRO NO ENVIO';
      msg.textContent   = 'Houve um problema ao registrar seu pedido. Por favor, tente novamente ou entre em contato diretamente pelo e-mail.';
      feedback.querySelector('.feedback-terminal').style.borderColor = 'rgba(255,68,68,0.4)';
      feedback.querySelector('.feedback-header').style.color = '#ff4444';
    }

    form.closest('.order-wrap').style.display = 'none';
    feedback.style.display = 'block';
    feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  if (feedbackClose) {
    feedbackClose.addEventListener('click', () => {
      feedback.style.display = 'none';
      form.closest('.order-wrap').style.display = '';
      window.scrollTo({ top: document.getElementById('pedido').offsetTop - 80, behavior: 'smooth' });
    });
  }
})();


/* ── GLITCH EFFECT RANDOM TRIGGER ───────────────── */
(function initGlitchRandom() {
  const el = document.querySelector('.glitch');
  if (!el) return;
  setInterval(() => {
    if (Math.random() > 0.7) {
      el.style.textShadow = `${Math.random()*4-2}px 0 #ff0000, ${Math.random()*-4+2}px 0 #00ff41`;
      setTimeout(() => { el.style.textShadow = ''; }, 120);
    }
  }, 2000);
})();


/* ── PARTICLE CLICK EFFECT ───────────────────────── */
(function initClickParticles() {
  document.addEventListener('click', (e) => {
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('div');
      Object.assign(p.style, {
        position:      'fixed',
        left:          e.clientX + 'px',
        top:           e.clientY + 'px',
        width:         '4px',
        height:        '4px',
        background:    '#00ff41',
        borderRadius:  '50%',
        pointerEvents: 'none',
        zIndex:        '9998',
        transition:    'all 0.6s ease',
        transform:     'translate(-50%,-50%)',
        boxShadow:     '0 0 6px #00ff41',
      });
      document.body.appendChild(p);

      const angle  = (i / 6) * Math.PI * 2;
      const dist   = 30 + Math.random() * 40;
      const dx     = Math.cos(angle) * dist;
      const dy     = Math.sin(angle) * dist;

      requestAnimationFrame(() => {
        p.style.left    = (e.clientX + dx) + 'px';
        p.style.top     = (e.clientY + dy) + 'px';
        p.style.opacity = '0';
        p.style.width   = '2px';
        p.style.height  = '2px';
      });

      setTimeout(() => p.remove(), 700);
    }
  });
})();


/* ── ACTIVE NAV STYLE ────────────────────────────── */
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--green) !important;
    background: rgba(0,255,65,0.06) !important;
    border-color: rgba(0,255,65,0.2) !important;
  }
`;
document.head.appendChild(style);


/* ── COUNTER STATS (easter egg) ─────────────────── */
(function initHexClock() {
  // Add a cool hex timestamp in the terminal footer area if present
  const footer = document.querySelector('.footer-copy');
  if (!footer) return;

  function hexTime() {
    const now = Date.now();
    const hex = '0x' + now.toString(16).toUpperCase();
    return hex;
  }

  const hexEl = document.createElement('span');
  hexEl.style.cssText = 'font-family:var(--font-mono);color:#1a3a1a;font-size:0.65rem;margin-left:12px;';
  footer.appendChild(hexEl);

  setInterval(() => { hexEl.textContent = hexTime(); }, 1000);
})();


/* ── KONAMI CODE EASTER EGG ──────────────────────── */
(function initKonami() {
  const code  = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  document.addEventListener('keydown', e => {
    if (e.key === code[pos]) {
      pos++;
      if (pos === code.length) {
        pos = 0;
        showEasterEgg();
      }
    } else {
      pos = 0;
    }
  });

  function showEasterEgg() {
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position:   'fixed',
      inset:      '0',
      background: 'rgba(0,0,0,0.92)',
      zIndex:     '99999',
      display:    'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
      color:      '#00ff41',
      fontSize:   '1rem',
      cursor:     'pointer',
      textAlign:  'center',
      padding:    '20px',
    });
    overlay.innerHTML = `
      <div style="font-size:3rem;margin-bottom:20px;">💀</div>
      <div style="font-family:var(--font-head);font-size:1.5rem;letter-spacing:4px;margin-bottom:16px;">ACCESS GRANTED</div>
      <div style="color:#888;line-height:1.8;">
        &gt; Você descobriu o código secreto da Cripta do Caos.<br>
        &gt; Parabéns, hacker. Você tem o espírito certo.<br>
        &gt; Noctharis aprovaria.<br><br>
        <span style="color:#555;font-size:0.75rem;">[ clique para fechar ]</span>
      </div>
    `;
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  }
})();
