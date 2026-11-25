/* =========================================================
   PANEL REPARTIDOR — CHUAZ
========================================================= */
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const formatPrice = (v) => '$' + Number(v).toLocaleString('es-CO');

  /* =========================================================
     ESTADO INICIAL
  ========================================================= */
  const STORE_KEY = 'chuaz_rider_state';

  const defaultState = {
    rider: {
      name: 'Juan Martínez',
      phone: '+57 300 555 1234',
      email: 'juan.martinez@chuaz.com',
      vehicle: 'moto',
      plate: 'ABC-123',
      zone: 'Zona Norte - Chapinero, Usaquén',
      rating: 4.9,
      ordersCompleted: 342
    },
    availability: false,
    onlineSince: null,
    activeOrderId: null,
    availableOrders: [
      { id: 'CH-2101', client: 'María C.', clientPhone: '+57 300 111 2233', pickup: 'La Pizzería', pickupAddress: 'Calle 45 #12-30, Chapinero', drop: 'Calle 53 #24-10, Galerías', distance: '2.4 km', time: '18 min', pay: 8500, tip: 1500, items: '1x Pizza Margarita, 1x Limonada' },
      { id: 'CH-2102', client: 'Julián R.', clientPhone: '+57 300 222 3344', pickup: 'Burger House', pickupAddress: 'Carrera 7 #56-12, Zona Rosa', drop: 'Carrera 13 #63-45, Chapinero', distance: '3.1 km', time: '22 min', pay: 10200, tip: 0, items: '1x Doble Cheeseburger, 1x Papas' },
      { id: 'CH-2103', client: 'Andrea L.', clientPhone: '+57 300 333 4455', pickup: 'Farmacia Vida', pickupAddress: 'Calle 63 #24-15, Galerías', drop: 'Calle 70 #5-22, Quinta Camacho', distance: '1.8 km', time: '14 min', pay: 6900, tip: 800, items: '1x Acetaminofén, 1x Alcohol' }
    ],
    activeOrder: null,
    history: [
      { id: 'CH-2098', client: 'Carlos M.', pickup: 'Sakura Sushi', drop: 'Calle 85 #15-40', pay: 12500, tip: 2000, date: 'Hoy, 1:20 PM', status: 'entregado' },
      { id: 'CH-2095', client: 'Sofía P.', pickup: 'Smash & Co.', drop: 'Carrera 13 #63-45', pay: 9800, tip: 0, date: 'Hoy, 12:05 PM', status: 'entregado' },
      { id: 'CH-2090', client: 'Pedro G.', pickup: 'La Pizzería', drop: 'Calle 45 #12-30', pay: 8200, tip: 1200, date: 'Ayer, 8:30 PM', status: 'entregado' },
      { id: 'CH-2085', client: 'Laura T.', pickup: 'MiniMarket 24h', drop: 'Carrera 11 #70-25', pay: 7500, tip: 500, date: 'Ayer, 6:45 PM', status: 'entregado' }
    ],
    movements: [
      { id: 'm1', label: 'Pago pedido CH-2098', amount: 14500, date: 'Hoy, 1:20 PM', type: 'income' },
      { id: 'm2', label: 'Pago pedido CH-2095', amount: 9800, date: 'Hoy, 12:05 PM', type: 'income' },
      { id: 'm3', label: 'Retiro a Nequi', amount: -50000, date: 'Ayer, 9:00 AM', type: 'withdraw' },
      { id: 'm4', label: 'Pago pedido CH-2090', amount: 9400, date: 'Ayer, 8:30 PM', type: 'income' },
      { id: 'm5', label: 'Bono por metas', amount: 5000, date: 'Hace 3 días', type: 'income' }
    ],
    notifications: [
      { id: 'n1', title: 'Nuevo pedido disponible', text: 'CH-2101 · 2.4 km · $8.500', read: false },
      { id: 'n2', title: 'Meta diaria alcanzada', text: '¡Vas por buen camino!', read: false },
      { id: 'n3', title: 'Documentos verificados', text: 'Tu licencia fue aprobada', read: true }
    ]
  };

  let state = loadState();
  let activeView = 'inicio';
  let historyFilter = 'all';
  let onlineTimer = null;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return JSON.parse(JSON.stringify(defaultState));
      const parsed = JSON.parse(raw);
      // Rehidratar listas si faltan
      return Object.assign(JSON.parse(JSON.stringify(defaultState)), parsed);
    } catch (e) {
      return JSON.parse(JSON.stringify(defaultState));
    }
  }

  function saveState() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* noop */ }
  }

  /* =========================================================
     TOAST
  ========================================================= */
  let toastTimer;
  function showToast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  /* =========================================================
     NAVEGACIÓN
  ========================================================= */
  const viewTitles = {
    inicio: 'Inicio',
    activo: 'Pedido en curso',
    ganancias: 'Ganancias',
    historial: 'Historial',
    perfil: 'Perfil'
  };

  function switchView(name) {
    activeView = name;
    document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
    const target = $('view-' + name);
    if (target) target.classList.add('active');

    document.querySelectorAll('.tab').forEach((t) => {
      t.classList.toggle('active', t.dataset.view === name);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (name === 'inicio') renderInicio();
    if (name === 'activo') renderActiveOrder();
    if (name === 'ganancias') renderEarnings();
    if (name === 'historial') renderHistory();
    if (name === 'perfil') renderProfile();
  }

  /* =========================================================
     DISPONIBILIDAD
  ========================================================= */
  function setAvailability(on) {
    state.availability = on;
    state.onlineSince = on ? Date.now() : null;
    saveState();
    renderInicio();
    if (on) {
      showToast('Estás en línea. Recibirás pedidos.');
      startOnlineTimer();
    } else {
      showToast('Te has desconectado.');
      stopOnlineTimer();
    }
  }

  function startOnlineTimer() {
    stopOnlineTimer();
    updateOnlineTime();
    onlineTimer = setInterval(updateOnlineTime, 30000);
  }
  function stopOnlineTimer() {
    if (onlineTimer) clearInterval(onlineTimer);
    onlineTimer = null;
  }
  function updateOnlineTime() {
    const el = $('kpiOnline');
    if (!el) return;
    if (!state.availability || !state.onlineSince) {
      el.textContent = '0h 0m';
      return;
    }
    const diff = Date.now() - state.onlineSince;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    el.textContent = `${h}h ${m}m`;
  }

  /* =========================================================
     RENDER INICIO
  ========================================================= */
  function renderInicio() {
    const card = $('statusCard');
    const pill = $('statusPill');
    const title = $('statusTitle');
    const subtitle = $('statusSubtitle');
    const toggle = $('availabilityToggle');

    toggle.checked = state.availability;
    card.classList.toggle('online', state.availability);
    card.classList.toggle('offline', !state.availability);

    if (state.availability) {
      pill.textContent = 'En línea';
      title.textContent = 'Estás disponible';
      subtitle.textContent = 'Recibirás solicitudes de pedidos cercanos.';
      startOnlineTimer();
    } else {
      pill.textContent = 'Desconectado';
      title.textContent = 'Conéctate para recibir pedidos';
      subtitle.textContent = 'Activa tu disponibilidad y empieza a ganar.';
      stopOnlineTimer();
    }

    // KPIs
    const todayEarned = state.history
      .filter((h) => h.date.startsWith('Hoy'))
      .reduce((s, h) => s + h.pay + (h.tip || 0), 0);
    $('kpiEarnings').textContent = formatPrice(todayEarned);
    $('kpiOrders').textContent = state.history.filter((h) => h.date.startsWith('Hoy')).length;
    $('kpiRating').textContent = state.rider.rating.toFixed(1);
    $('kpiRatingCount').textContent = `${state.rider.ordersCompleted} entregas`;

    // Pedidos disponibles
    const list = $('availableList');
    const empty = $('availableEmpty');
    const count = $('availableCount');

    if (!state.availability) {
      list.innerHTML = '';
      empty.style.display = 'flex';
      count.textContent = '0';
    } else if (state.availableOrders.length === 0) {
      list.innerHTML = '';
      empty.style.display = 'flex';
      count.textContent = '0';
    } else {
      empty.style.display = 'none';
      count.textContent = state.availableOrders.length;
      list.innerHTML = state.availableOrders.map((o) => availableOrderHTML(o)).join('');
      bindAcceptButtons();
    }

    updateBadge();
  }

  function availableOrderHTML(o) {
    return `
      <div class="order-card">
        <div class="order-head">
          <span class="order-id">${o.id}</span>
          <span class="order-pay">${formatPrice(o.pay + (o.tip || 0))}</span>
        </div>
        <div class="order-info">
          <div class="order-line">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <div>
              <strong>${o.pickup}</strong>
              <small>${o.pickupAddress}</small>
            </div>
          </div>
          <div class="order-line">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10"/></svg>
            <div>
              <strong>${o.client}</strong>
              <small>${o.drop}</small>
            </div>
          </div>
        </div>
        <div class="order-meta">
          <span>${o.distance}</span>
          <span>${o.time}</span>
          <span>${o.items}</span>
        </div>
        <div class="order-actions">
          <button class="btn btn-ghost btn-sm" data-reject="${o.id}">Rechazar</button>
          <button class="btn btn-primary btn-sm" data-accept="${o.id}">Aceptar</button>
        </div>
      </div>
    `;
  }

  function bindAcceptButtons() {
    document.querySelectorAll('[data-accept]').forEach((btn) => {
      btn.addEventListener('click', () => acceptOrder(btn.dataset.accept));
    });
    document.querySelectorAll('[data-reject]').forEach((btn) => {
      btn.addEventListener('click', () => rejectOrder(btn.dataset.reject));
    });
  }

  function acceptOrder(id) {
    const order = state.availableOrders.find((o) => o.id === id);
    if (!order) return;

    state.availableOrders = state.availableOrders.filter((o) => o.id !== id);
    state.activeOrder = {
      ...order,
      status: 'aceptado',
      acceptedAt: Date.now()
    };
    saveState();
    showToast('Pedido aceptado');
    switchView('activo');
    renderInicio();
  }

  function rejectOrder(id) {
    state.availableOrders = state.availableOrders.filter((o) => o.id !== id);
    saveState();
    renderInicio();
    showToast('Pedido rechazado');
  }

  /* =========================================================
     PEDIDO ACTIVO
  ========================================================= */
  const steps = [
    { key: 'aceptado', label: 'Pedido aceptado', desc: 'Dirígete al punto de recogida' },
    { key: 'recogido', label: 'Producto recogido', desc: 'Confirma que tienes el pedido' },
    { key: 'camino', label: 'En camino', desc: 'Dirígete al cliente' },
    { key: 'entregado', label: 'Entregado', desc: 'Confirma la entrega al cliente' }
  ];

  function renderActiveOrder() {
    const wrap = $('activeOrderWrap');
    const empty = $('activeEmpty');
    const order = state.activeOrder;

    updateBadge();

    if (!order) {
      wrap.innerHTML = '';
      empty.style.display = 'flex';
      return;
    }
    empty.style.display = 'none';

    const currentIndex = steps.findIndex((s) => s.key === order.status);

    const timelineHTML = steps.map((step, i) => {
      const isDone = i < currentIndex;
      const isCurrent = i === currentIndex;
      return `
        <div class="step ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}">
          <div class="step-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              ${isDone || isCurrent ? '<polyline points="20 6 9 17 4 12"/>' : '<circle cx="12" cy="12" r="3"/>'}
            </svg>
          </div>
          <div class="step-content">
            <strong>${step.label}</strong>
            <span>${step.desc}</span>
          </div>
        </div>
      `;
    }).join('');

    const nextAction = order.status === 'aceptado' ? 'recogido'
      : order.status === 'recogido' ? 'camino'
      : order.status === 'camino' ? 'entregado'
      : null;

    const nextLabels = {
      recogido: 'Confirmar recogida',
      camino: 'Ir al cliente',
      entregado: 'Confirmar entrega'
    };

    wrap.innerHTML = `
      <div class="active-order">
        <div class="active-order-hero">
          <span class="status-pill">${statusLabel(order.status)}</span>
          <h3>${order.id}</h3>
          <p>${order.client} · ${formatPrice(order.pay + (order.tip || 0))}</p>
        </div>

        <div class="map-view">
          <div class="map-path"></div>
          <div class="map-pin pickup" style="left:20%;top:55%;">A</div>
          <div class="map-pin rider" style="left:50%;top:45%;">T</div>
          <div class="map-pin drop" style="left:78%;top:38%;">B</div>
        </div>

        <div class="timeline">
          ${timelineHTML}
        </div>

        <div class="contact-card">
          <div class="contact-row">
            <div class="contact-avatar">${initials(order.client)}</div>
            <div class="contact-info">
              <strong>${order.client}</strong>
              <span>${order.drop}</span>
            </div>
          </div>
          <div class="contact-actions">
            <a class="btn btn-ghost" href="tel:${order.clientPhone}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
              Llamar
            </a>
            <a class="btn btn-ghost" href="https://maps.google.com/?q=${encodeURIComponent(order.drop)}" target="_blank" rel="noopener">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
              Navegar
            </a>
          </div>
        </div>

        ${nextAction ? `
          <div class="active-actions">
            <button class="btn btn-primary" id="nextStepBtn">${nextLabels[nextAction]}</button>
          </div>
        ` : ''}
      </div>
    `;

    if (nextAction) {
      $('nextStepBtn').addEventListener('click', () => advanceOrder(nextAction));
    }
  }

  function advanceOrder(nextStatus) {
    const order = state.activeOrder;
    if (!order) return;

    if (nextStatus === 'entregado') {
      // Completar y mover a historial
      const now = new Date();
      const timeStr = `Hoy, ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() < 12 ? 'AM' : 'PM'}`;
      state.history.unshift({
        id: order.id,
        client: order.client,
        pickup: order.pickup,
        drop: order.drop,
        pay: order.pay,
        tip: order.tip,
        date: timeStr,
        status: 'entregado'
      });
      state.movements.unshift({
        id: 'm' + Date.now(),
        label: `Pago pedido ${order.id}`,
        amount: order.pay + (order.tip || 0),
        date: timeStr,
        type: 'income'
      });
      state.rider.ordersCompleted += 1;

      state.activeOrder = null;
      saveState();
      showToast('Pedido completado. ¡Buen trabajo!');
      updateBadge();
      switchView('historial');
      return;
    }

    order.status = nextStatus;
    saveState();
    renderActiveOrder();
    showToast('Estado actualizado: ' + statusLabel(nextStatus));
  }

  function statusLabel(s) {
    return {
      aceptado: 'Aceptado',
      recogido: 'Recogido',
      camino: 'En camino',
      entregado: 'Entregado'
    }[s] || s;
  }

  function updateBadge() {
    const badge = $('badgeActivo');
    if (!badge) return;
    const count = state.activeOrder ? 1 : 0;
    badge.textContent = count;
    badge.classList.toggle('show', count > 0);
  }

  /* =========================================================
     HISTORIAL
  ========================================================= */
  function renderHistory() {
    let list = state.history;
    if (historyFilter === 'hoy') list = list.filter((h) => h.date.startsWith('Hoy'));
    else if (historyFilter === 'semana') list = list.filter((h) => !h.date.startsWith('Hace'));
    else if (historyFilter === 'mes') list = list;

    const container = $('historialList');
    const count = $('historialCount');
    count.textContent = list.length;

    if (list.length === 0) {
      container.innerHTML = `<div class="empty-state"><strong>Sin pedidos</strong><p>Aquí verás tus entregas completadas.</p></div>`;
      return;
    }

    container.innerHTML = list.map((h) => `
      <div class="history-card">
        <div class="history-head">
          <div>
            <span class="order-id">${h.id}</span>
            <span class="status-badge status-${h.status}">${h.status}</span>
          </div>
          <span class="history-earn">${formatPrice(h.pay + (h.tip || 0))}</span>
        </div>
        <div class="history-info">
          ${h.pickup} → ${h.drop}
        </div>
        <div class="history-date">${h.client} · ${h.date}</div>
      </div>
    `).join('');
  }

  /* =========================================================
     GANANCIAS
  ========================================================= */
  function renderEarnings() {
    const weekTotal = state.movements
      .filter((m) => m.type === 'income')
      .reduce((s, m) => s + m.amount, 0);
    const pending = Math.max(0, weekTotal - 50000);

    $('weekEarnings').textContent = formatPrice(weekTotal);
    $('pendingPayout').textContent = formatPrice(pending);

    // Chart
    const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const values = [65000, 78000, 52000, 91000, 84000, 120000, 98000];
    const max = Math.max(...values);
    $('earningsChart').innerHTML = labels.map((l, i) => `
      <div class="bar-wrap">
        <div class="bar" style="height:${(values[i] / max) * 100}%"></div>
        <span class="bar-label">${l}</span>
      </div>
    `).join('');

    // Movimientos
    $('movementsList').innerHTML = state.movements.map((m) => `
      <div class="movement">
        <div class="movement-icon ${m.type === 'income' ? 'positive' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${m.type === 'income'
              ? '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>'
              : '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>'}
          </svg>
        </div>
        <div class="movement-info">
          <strong>${m.label}</strong>
          <span>${m.date}</span>
        </div>
        <span class="movement-amount ${m.type === 'withdraw' ? 'negative' : ''}">
          ${m.type === 'withdraw' ? '' : '+'}${formatPrice(m.amount)}
        </span>
      </div>
    `).join('');
  }

  /* =========================================================
     PERFIL
  ========================================================= */
  function renderProfile() {
    const r = state.rider;
    $('profileName').textContent = r.name;
    $('profileAvatar').textContent = initials(r.name);
    $('topbarAvatar').textContent = initials(r.name);
    $('profileRole').textContent = `Repartidor en ${vehicleLabel(r.vehicle)} · ${r.zone.split(' - ')[0]}`;
    $('profileRating').textContent = r.rating.toFixed(1);
    $('profileOrders').textContent = `${r.ordersCompleted} pedidos completados`;

    $('riderName').value = r.name;
    $('riderPhone').value = r.phone;
    $('riderEmail').value = r.email;
    $('riderVehicle').value = r.vehicle;
    $('riderPlate').value = r.plate;
    $('riderZone').value = r.zone;

    // Documentos
    $('docsList').innerHTML = `
      <div class="doc-item">
        <div class="doc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M15 8h3M15 12h3M7 16h10"/></svg></div>
        <div class="doc-info"><strong>Cédula de ciudadanía</strong><span>Verificado · 12/03/2024</span></div>
        <span class="doc-status ok">OK</span>
      </div>
      <div class="doc-item">
        <div class="doc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
        <div class="doc-info"><strong>Licencia de conducción</strong><span>Verificado · 12/03/2024</span></div>
        <span class="doc-status ok">OK</span>
      </div>
      <div class="doc-item">
        <div class="doc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
        <div class="doc-info"><strong>SOAT de la moto</strong><span>Vence en 8 meses</span></div>
        <span class="doc-status ok">OK</span>
      </div>
      <div class="doc-item">
        <div class="doc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
        <div class="doc-info"><strong>Antecedentes</strong><span>En proceso de verificación</span></div>
        <span class="doc-status pending">Pendiente</span>
      </div>
    `;
  }

  function vehicleLabel(v) {
    return { moto: 'moto', bicicleta: 'bicicleta', auto: 'auto', a_pie: 'a pie' }[v] || v;
  }

  function initials(name) {
    return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  }

  /* =========================================================
     NOTIFICACIONES
  ========================================================= */
  function renderNotifications() {
    const list = $('notifList');
    const unread = state.notifications.filter((n) => !n.read).length;
    $('notifDot').classList.toggle('show', unread > 0);

    list.innerHTML = state.notifications.map((n) => `
      <div class="notif-item">
        <div class="notif-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </div>
        <div class="notif-body">
          <strong>${n.title}</strong>
          <span>${n.text}</span>
        </div>
      </div>
    `).join('');
  }

  /* =========================================================
     INIT
  ========================================================= */
  function init() {
    // Render inicial
    renderInicio();
    renderNotifications();
    updateBadge();

    // Toggle de disponibilidad
    $('availabilityToggle').addEventListener('change', (e) => {
      setAvailability(e.target.checked);
    });

    // Navegación tabs
    document.querySelectorAll('.tab').forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        switchView(tab.dataset.view);
      });
    });

    // Filtros historial
    document.querySelectorAll('[data-history-filter]').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-history-filter]').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        historyFilter = chip.dataset.historyFilter;
        renderHistory();
      });
    });

    // Notificaciones
    $('notifBtn').addEventListener('click', () => $('notifPanel').classList.toggle('open'));
    $('notifClear').addEventListener('click', () => {
      state.notifications.forEach((n) => (n.read = true));
      saveState();
      renderNotifications();
      showToast('Notificaciones marcadas como leídas');
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#notifPanel') && !e.target.closest('#notifBtn')) {
        $('notifPanel').classList.remove('open');
      }
    });

    // Avatar → perfil
    $('topbarAvatar').addEventListener('click', () => switchView('perfil'));

    // Retiro
    $('btnPayout').addEventListener('click', () => {
      const pending = state.movements.filter((m) => m.type === 'income').reduce((s, m) => s + m.amount, 0);
      if (pending < 20000) {
        showToast('El mínimo para retiro es $20.000');
        return;
      }
      state.movements.unshift({
        id: 'm' + Date.now(),
        label: 'Retiro solicitado',
        amount: -pending,
        date: 'Ahora',
        type: 'withdraw'
      });
      saveState();
      renderEarnings();
      showToast('Retiro solicitado. Llegará en 24 h.');
    });

    // Guardar perfil
    $('profileSave').addEventListener('click', () => {
      state.rider.name = $('riderName').value.trim();
      state.rider.phone = $('riderPhone').value.trim();
      state.rider.email = $('riderEmail').value.trim();
      state.rider.vehicle = $('riderVehicle').value;
      state.rider.plate = $('riderPlate').value.trim();
      state.rider.zone = $('riderZone').value.trim();
      saveState();
      renderProfile();
      showToast('Perfil actualizado correctamente');
    });

    // Reanudar timer si estaba online
    if (state.availability && state.onlineSince) {
      startOnlineTimer();
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();