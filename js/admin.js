/* =========================================================
   PANEL ADMIN — CHUAZ
========================================================= */
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const formatPrice = (v) => '$' + Number(v).toLocaleString('es-CO');

  /* =========================================================
     ESTADO INICIAL
  ========================================================= */
  const STORE_KEY = 'chuaz_admin_state';

  const defaultState = {
    businesses: [
      { id: 'b1', name: 'La Pizzería', category: 'pizza', phone: '+57 300 111 1111', email: 'lapizzeria@chuaz.com', address: 'Calle 45 #12-30, Chapinero', desc: 'Pizza artesanal con masa madre', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', commission: 12, status: 'active', rating: 4.8, orders: 342, createdAt: '2024-08-12' },
      { id: 'b2', name: 'Burger House', category: 'burgers', phone: '+57 300 222 2222', email: 'burgerhouse@chuaz.com', address: 'Carrera 7 #56-12, Zona Rosa', desc: 'Hamburguesas artesanales', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80', commission: 12, status: 'active', rating: 4.6, orders: 287, createdAt: '2024-08-15' },
      { id: 'b3', name: 'Sakura Sushi', category: 'sushi', phone: '+57 300 333 3333', email: 'sakura@chuaz.com', address: 'Calle 85 #15-40, Zona G', desc: 'Sushi fresco japonés', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80', commission: 14, status: 'active', rating: 4.9, orders: 198, createdAt: '2024-09-01' },
      { id: 'b4', name: 'Farmacia Vida', category: 'pharmacy', phone: '+57 300 444 4444', email: 'farmaciavida@chuaz.com', address: 'Calle 63 #24-15, Galerías', desc: 'Medicamentos y cuidado personal', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=80', commission: 10, status: 'active', rating: 4.8, orders: 156, createdAt: '2024-09-10' },
      { id: 'b5', name: 'TechStore', category: 'tech', phone: '+57 300 555 5555', email: 'techstore@chuaz.com', address: 'Carrera 15 #85-30, Zona T', desc: 'Gadgets y accesorios', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=400&q=80', commission: 15, status: 'pending', rating: 0, orders: 0, createdAt: 'Hace 2 h' },
      { id: 'b6', name: 'Mundo Mascotas', category: 'pets', phone: '+57 300 666 6666', email: 'mascotas@chuaz.com', address: 'Calle 80 #15-30, Zona Norte', desc: 'Todo para tu mascota', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80', commission: 12, status: 'pending', rating: 0, orders: 0, createdAt: 'Hace 1 día' },
      { id: 'b7', name: 'Pizza Nostra', category: 'pizza', phone: '+57 300 777 7777', email: 'nostra@chuaz.com', address: 'Calle 100 #15-05, Usaquén', desc: 'Pizza italiana', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80', commission: 12, status: 'suspended', rating: 4.5, orders: 112, createdAt: '2024-07-20' }
    ],
    riders: [
      { id: 'r1', name: 'Juan Martínez', phone: '+57 300 555 1234', email: 'juan@chuaz.com', vehicle: 'moto', plate: 'ABC-123', zone: 'Zona Norte', status: 'active', rating: 4.9, ordersCompleted: 342, joinedAt: '2024-06-10' },
      { id: 'r2', name: 'Carlos Ramírez', phone: '+57 300 666 2345', email: 'carlos@chuaz.com', vehicle: 'bicicleta', plate: 'N/A', zone: 'Zona Centro', status: 'active', rating: 4.7, ordersCompleted: 215, joinedAt: '2024-07-02' },
      { id: 'r3', name: 'Andrea López', phone: '+57 300 777 3456', email: 'andrea@chuaz.com', vehicle: 'moto', plate: 'XYZ-789', zone: 'Zona Sur', status: 'active', rating: 4.8, ordersCompleted: 189, joinedAt: '2024-08-14' },
      { id: 'r4', name: 'Pedro González', phone: '+57 300 888 4567', email: 'pedro@chuaz.com', vehicle: 'auto', plate: 'QRS-456', zone: 'Zona Occidente', status: 'pending', rating: 0, ordersCompleted: 0, joinedAt: 'Hace 3 h' },
      { id: 'r5', name: 'Laura Torres', phone: '+57 300 999 5678', email: 'laura@chuaz.com', vehicle: 'bicicleta', plate: 'N/A', zone: 'Zona Norte', status: 'pending', rating: 0, ordersCompleted: 0, joinedAt: 'Hace 5 h' },
      { id: 'r6', name: 'Diego Herrera', phone: '+57 300 123 6789', email: 'diego@chuaz.com', vehicle: 'moto', plate: 'LMN-321', zone: 'Zona Centro', status: 'suspended', rating: 4.2, ordersCompleted: 78, joinedAt: '2024-05-20' }
    ],
    orders: [
      { id: 'CH-1042', businessId: 'b1', business: 'La Pizzería', client: 'María Camila R.', rider: 'Juan Martínez', total: 27400, status: 'nuevo', date: 'Hoy, 1:20 PM' },
      { id: 'CH-1041', businessId: 'b2', business: 'Burger House', client: 'Julián Rojas', rider: 'Carlos Ramírez', total: 24900, status: 'preparando', date: 'Hoy, 1:05 PM' },
      { id: 'CH-1040', businessId: 'b3', business: 'Sakura Sushi', client: 'Andrea L.', rider: 'Andrea López', total: 55800, status: 'camino', date: 'Hoy, 12:30 PM' },
      { id: 'CH-1039', businessId: 'b1', business: 'La Pizzería', client: 'Carlos M.', rider: 'Juan Martínez', total: 43800, status: 'entregado', date: 'Hoy, 11:45 AM' },
      { id: 'CH-1038', businessId: 'b4', business: 'Farmacia Vida', client: 'Sofía P.', rider: 'Carlos Ramírez', total: 8500, status: 'cancelado', date: 'Hoy, 10:30 AM' },
      { id: 'CH-1037', businessId: 'b2', business: 'Burger House', client: 'Pedro G.', rider: 'Andrea López', total: 18900, status: 'entregado', date: 'Hoy, 9:15 AM' }
    ],
    users: [
      { id: 'u1', name: 'María Camila R.', email: 'maria@example.com', phone: '+57 310 111 1111', orders: 24, status: 'active' },
      { id: 'u2', name: 'Julián Rojas', email: 'julian@example.com', phone: '+57 310 222 2222', orders: 12, status: 'active' },
      { id: 'u3', name: 'Andrea L.', email: 'andrea@example.com', phone: '+57 310 333 3333', orders: 8, status: 'active' },
      { id: 'u4', name: 'Carlos M.', email: 'carlos@example.com', phone: '+57 310 444 4444', orders: 15, status: 'active' },
      { id: 'u5', name: 'Sofía P.', email: 'sofia@example.com', phone: '+57 310 555 5555', orders: 6, status: 'suspended' }
    ],
    promos: [
      { id: 'pr1', title: 'Envío gratis hoy', desc: 'En pedidos mayores a $25.000', badge: 'Envío gratis', discount: 0 },
      { id: 'pr2', title: 'Hasta 40% OFF', desc: 'En restaurantes y tiendas destacadas', badge: '40% OFF', discount: 40 },
      { id: 'pr3', title: 'Chuaz Plus', desc: 'Envíos ilimitados desde $9.900 al mes', badge: 'Plus', discount: 0 }
    ],
    config: {
      commission: 12,
      baseDelivery: 2500,
      riderBase: 6500,
      riderPerKm: 800,
      platformOpen: true,
      autoApproveBiz: false,
      autoApproveRider: false,
      appMessage: '¡Bienvenido a Chuaz! Pide lo que necesites hoy.',
      supportEmail: 'soporte@chuaz.com',
      supportPhone: '+57 601 555 0000'
    },
    transactions: [
      { id: 't1', date: 'Hoy, 1:20 PM', order: 'CH-1042', amount: 27400, commission: 3288, status: 'pending' },
      { id: 't2', date: 'Hoy, 11:45 AM', order: 'CH-1039', amount: 43800, commission: 5256, status: 'paid' },
      { id: 't3', date: 'Hoy, 9:15 AM', order: 'CH-1037', amount: 18900, commission: 2268, status: 'paid' },
      { id: 't4', date: 'Ayer, 8:30 PM', order: 'CH-1030', amount: 32500, commission: 3900, status: 'paid' },
      { id: 't5', date: 'Ayer, 7:15 PM', order: 'CH-1028', amount: 15600, commission: 1872, status: 'paid' }
    ],
    notifications: [
      { id: 'n1', title: 'Nuevo negocio pendiente', text: 'TechStore solicitó registro', read: false },
      { id: 'n2', title: 'Nuevo repartidor pendiente', text: 'Pedro González espera aprobación', read: false },
      { id: 'n3', title: 'Meta del día', text: 'GMV superó los $150.000', read: true }
    ]
  };

  let state = loadState();
  let bizFilter = 'all';
  let riderFilter = 'all';
  let orderFilter = 'all';
  let bizSearch = '';
  let riderSearch = '';
  let userSearch = '';

  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return JSON.parse(JSON.stringify(defaultState));
      const parsed = JSON.parse(raw);
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
  const titles = {
    resumen: ['Resumen', 'Vista global de la operación'],
    negocios: ['Negocios', 'Registra, aprueba y administra negocios'],
    repartidores: ['Repartidores', 'Registra, aprueba y administra repartidores'],
    pedidos: ['Pedidos', 'Todos los pedidos de la plataforma'],
    usuarios: ['Usuarios', 'Clientes registrados en Chuaz'],
    promociones: ['Promociones', 'Campañas y ofertas globales'],
    finanzas: ['Finanzas', 'GMV, comisiones y transacciones'],
    configuracion: ['Configuración', 'Parámetros globales de la plataforma']
  };

  function switchSection(name) {
    document.querySelectorAll('.section').forEach((s) => s.classList.remove('active'));
    const target = $('section-' + name);
    if (target) target.classList.add('active');

    document.querySelectorAll('.side-link').forEach((l) => {
      l.classList.toggle('active', l.dataset.section === name);
    });

    const [t, sub] = titles[name] || ['Admin', ''];
    $('pageTitle').textContent = t;
    $('pageSubtitle').textContent = sub;

    closeSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (name === 'resumen') renderResumen();
    if (name === 'negocios') renderBiz();
    if (name === 'repartidores') renderRiders();
    if (name === 'pedidos') renderOrders();
    if (name === 'usuarios') renderUsers();
    if (name === 'promociones') renderPromos();
    if (name === 'finanzas') renderFinanzas();
    if (name === 'configuracion') fillConfig();
  }

  /* =========================================================
     SIDEBAR
  ========================================================= */
  function openSidebar() {
    $('sidebar').classList.add('open');
    $('sidebarOverlay').classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    $('sidebar').classList.remove('open');
    $('sidebarOverlay').classList.remove('show');
    document.body.style.overflow = '';
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

  function updateBadges() {
    const pendingBiz = state.businesses.filter((b) => b.status === 'pending').length;
    const pendingRiders = state.riders.filter((r) => r.status === 'pending').length;
    const bizBadge = $('badgeBiz');
    const riderBadge = $('badgeRiders');
    bizBadge.textContent = pendingBiz;
    bizBadge.classList.toggle('show', pendingBiz > 0);
    riderBadge.textContent = pendingRiders;
    riderBadge.classList.toggle('show', pendingRiders > 0);
  }

  /* =========================================================
     RESUMEN
  ========================================================= */
  function renderResumen() {
    const activeBiz = state.businesses.filter((b) => b.status === 'active').length;
    const pendingBiz = state.businesses.filter((b) => b.status === 'pending').length;
    const activeRiders = state.riders.filter((r) => r.status === 'active').length;
    const pendingRiders = state.riders.filter((r) => r.status === 'pending').length;
    const ordersToday = state.orders.length;
    const ordersInProgress = state.orders.filter((o) => o.status !== 'entregado' && o.status !== 'cancelado').length;
    const gmv = state.orders
      .filter((o) => o.status !== 'cancelado')
      .reduce((s, o) => s + o.total, 0);

    $('kpiBizActive').textContent = activeBiz;
    $('kpiBizPending').textContent = `${pendingBiz} pendientes`;
    $('kpiRidersActive').textContent = activeRiders;
    $('kpiRidersPending').textContent = `${pendingRiders} por aprobar`;
    $('kpiOrders').textContent = ordersToday;
    $('kpiOrdersActive').textContent = `${ordersInProgress} en curso`;
    $('kpiGMV').textContent = formatPrice(gmv);
    $('kpiGMVTrend').textContent = '+12% vs ayer';

    // Chart
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const values = [180000, 220000, 165000, 260000, 240000, 320000, 290000];
    const max = Math.max(...values);
    $('salesChart').innerHTML = days.map((d, i) => `
      <div class="chart-bar-wrap">
        <div class="chart-bar" style="height:${(values[i] / max) * 100}%"></div>
        <span class="chart-label">${d}</span>
      </div>
    `).join('');

    // Pending list (últimos 4 pendientes entre negocios y repartidores)
    const pending = [
      ...state.businesses.filter((b) => b.status === 'pending').map((b) => ({
        type: 'Negocio', id: b.id, name: b.name, sub: b.category, image: b.image
      })),
      ...state.riders.filter((r) => r.status === 'pending').map((r) => ({
        type: 'Repartidor', id: r.id, name: r.name, sub: r.zone, image: null
      }))
    ].slice(0, 4);

    $('pendingList').innerHTML = pending.length === 0
      ? '<p style="font-size:.82rem;color:var(--text-3);text-align:center;padding:1rem 0;">No hay solicitudes pendientes.</p>'
      : pending.map((p) => `
        <div class="pending-item">
          ${p.image ? `<img src="${p.image}" alt="${p.name}" />` : `
            <div class="rider-avatar" style="width:38px;height:38px;font-size:.72rem;">${initials(p.name)}</div>
          `}
          <div class="pending-info">
            <strong>${p.name}</strong>
            <span>${p.type} · ${p.sub}</span>
          </div>
          <div class="pending-actions">
            <button class="btn-approve" data-approve="${p.type}" data-id="${p.id}">Aprobar</button>
            <button class="btn-reject" data-reject="${p.type}" data-id="${p.id}">Rechazar</button>
          </div>
        </div>
      `).join('');

    $('pendingList').querySelectorAll('[data-approve]').forEach((btn) => {
      btn.addEventListener('click', () => approveItem(btn.dataset.approve, btn.dataset.id));
    });
    $('pendingList').querySelectorAll('[data-reject]').forEach((btn) => {
      btn.addEventListener('click', () => rejectItem(btn.dataset.reject, btn.dataset.id));
    });

    // Recent orders
    $('recentOrders').innerHTML = state.orders.slice(0, 5).map((o) => `
      <tr>
        <td><span class="order-id">${o.id}</span></td>
        <td>${o.business}</td>
        <td>${o.client}</td>
        <td>${formatPrice(o.total)}</td>
        <td><span class="status-badge status-${o.status}">${labelStatus(o.status)}</span></td>
        <td><button class="btn-edit" style="padding:.35rem .7rem;border-radius:6px;font-size:.72rem;font-weight:600;" data-goto-orders>Ver</button></td>
      </tr>
    `).join('');

    document.querySelectorAll('[data-goto-orders]').forEach((b) => {
      b.addEventListener('click', () => switchSection('pedidos'));
    });

    updateBadges();
  }

  function approveItem(type, id) {
    if (type === 'Negocio') {
      const b = state.businesses.find((x) => x.id === id);
      if (b) { b.status = 'active'; showToast(`Negocio ${b.name} aprobado`); }
    } else {
      const r = state.riders.find((x) => x.id === id);
      if (r) { r.status = 'active'; showToast(`Repartidor ${r.name} aprobado`); }
    }
    saveState();
    renderResumen();
  }

  function rejectItem(type, id) {
    if (type === 'Negocio') {
      const b = state.businesses.find((x) => x.id === id);
      if (b) { b.status = 'suspended'; showToast(`Negocio ${b.name} rechazado`); }
    } else {
      const r = state.riders.find((x) => x.id === id);
      if (r) { r.status = 'suspended'; showToast(`Repartidor ${r.name} rechazado`); }
    }
    saveState();
    renderResumen();
  }

  function labelStatus(s) {
    return { nuevo: 'Nuevo', preparando: 'Preparando', camino: 'En camino', entregado: 'Entregado', cancelado: 'Cancelado', active: 'Activo', pending: 'Pendiente', suspended: 'Suspendido' }[s] || s;
  }

  /* =========================================================
     NEGOCIOS
  ========================================================= */
  function renderBiz() {
    let list = [...state.businesses];
    if (bizFilter !== 'all') list = list.filter((b) => b.status === bizFilter);
    if (bizSearch) {
      const q = bizSearch.toLowerCase();
      list = list.filter((b) =>
        b.name.toLowerCase().includes(q) || b.address.toLowerCase().includes(q)
      );
    }

    const grid = $('bizGrid');
    if (list.length === 0) {
      grid.innerHTML = `<div class="panel-card" style="grid-column:1/-1;text-align:center;color:var(--text-3)">No hay negocios con este filtro.</div>`;
      return;
    }

    grid.innerHTML = list.map((b) => `
      <div class="biz-card">
        <div class="biz-media">
          <img src="${b.image}" alt="${b.name}" />
          <span class="biz-status ${b.status}">${labelStatus(b.status)}</span>
        </div>
        <div class="biz-body">
          <h3>${b.name}</h3>
          <p>${b.desc}</p>
          <div class="biz-meta">
            <span>${categoryLabel(b.category)}</span>
            <span>★ ${b.rating || 'N/A'}</span>
            <span>${b.orders} pedidos</span>
            <span>${b.commission}% comisión</span>
          </div>
        </div>
        <div class="biz-actions">
          ${b.status === 'pending' ? `<button class="btn-approve" data-biz-approve="${b.id}">Aprobar</button>` : ''}
          ${b.status === 'active' ? `<button class="btn-secondary" data-biz-suspend="${b.id}">Suspender</button>` : ''}
          ${b.status === 'suspended' ? `<button class="btn-approve" data-biz-approve="${b.id}">Reactivar</button>` : ''}
          <button class="btn-edit" data-edit-biz="${b.id}">Editar</button>
          <button class="btn-delete" data-delete-biz="${b.id}">Eliminar</button>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('[data-biz-approve]').forEach((b) => b.addEventListener('click', () => {
      const biz = state.businesses.find((x) => x.id === b.dataset.bizApprove);
      if (biz) { biz.status = 'active'; saveState(); renderBiz(); updateBadges(); showToast(`${biz.name} aprobado`); }
    }));
    grid.querySelectorAll('[data-biz-suspend]').forEach((b) => b.addEventListener('click', () => {
      const biz = state.businesses.find((x) => x.id === b.dataset.bizSuspend);
      if (biz) { biz.status = 'suspended'; saveState(); renderBiz(); updateBadges(); showToast(`${biz.name} suspendido`); }
    }));
    grid.querySelectorAll('[data-edit-biz]').forEach((b) => b.addEventListener('click', () => openBizModal(b.dataset.editBiz)));
    grid.querySelectorAll('[data-delete-biz]').forEach((b) => b.addEventListener('click', () => {
      if (confirm('¿Eliminar este negocio?')) {
        state.businesses = state.businesses.filter((x) => x.id !== b.dataset.deleteBiz);
        saveState();
        renderBiz();
        updateBadges();
        showToast('Negocio eliminado');
      }
    }));
  }

  function categoryLabel(c) {
    return {
      pizza: 'Pizza', burgers: 'Hamburguesas', sushi: 'Sushi', healthy: 'Saludable',
      desserts: 'Postres', drinks: 'Bebidas', pharmacy: 'Farmacia', tech: 'Tecnología',
      store: 'Tiendas', pets: 'Mascotas', liquor: 'Licores', beauty: 'Belleza'
    }[c] || c;
  }

  /* =========================================================
     REPARTIDORES
  ========================================================= */
  function renderRiders() {
    let list = [...state.riders];
    if (riderFilter !== 'all') list = list.filter((r) => r.status === riderFilter);
    if (riderSearch) {
      const q = riderSearch.toLowerCase();
      list = list.filter((r) =>
        r.name.toLowerCase().includes(q) || r.phone.includes(q)
      );
    }

    const wrap = $('riderList');
    if (list.length === 0) {
      wrap.innerHTML = `<div class="panel-card" style="text-align:center;color:var(--text-3)">No hay repartidores con este filtro.</div>`;
      return;
    }

    wrap.innerHTML = list.map((r) => `
      <div class="rider-card">
        <div class="rider-avatar">${initials(r.name)}</div>
        <div class="rider-info">
          <strong>${r.name}</strong>
          <span>${r.phone} · ${r.email}</span>
          <div class="rider-meta">
            <span>${vehicleLabel(r.vehicle)} ${r.plate !== 'N/A' ? '· ' + r.plate : ''}</span>
            <span>${r.zone}</span>
            <span>★ ${r.rating || 'N/A'}</span>
            <span>${r.ordersCompleted} entregas</span>
            <span class="status-badge status-${r.status}">${labelStatus(r.status)}</span>
          </div>
        </div>
        <div class="rider-actions">
          ${r.status === 'pending' ? `<button class="btn-approve" data-rider-approve="${r.id}">Aprobar</button>` : ''}
          ${r.status === 'active' ? `<button class="btn-secondary" data-rider-suspend="${r.id}">Suspender</button>` : ''}
          ${r.status === 'suspended' ? `<button class="btn-approve" data-rider-approve="${r.id}">Reactivar</button>` : ''}
          <button class="btn-edit" data-edit-rider="${r.id}">Editar</button>
          <button class="btn-delete" data-delete-rider="${r.id}">Eliminar</button>
        </div>
      </div>
    `).join('');

    wrap.querySelectorAll('[data-rider-approve]').forEach((b) => b.addEventListener('click', () => {
      const r = state.riders.find((x) => x.id === b.dataset.riderApprove);
      if (r) { r.status = 'active'; saveState(); renderRiders(); updateBadges(); showToast(`${r.name} aprobado`); }
    }));
    wrap.querySelectorAll('[data-rider-suspend]').forEach((b) => b.addEventListener('click', () => {
      const r = state.riders.find((x) => x.id === b.dataset.riderSuspend);
      if (r) { r.status = 'suspended'; saveState(); renderRiders(); updateBadges(); showToast(`${r.name} suspendido`); }
    }));
    wrap.querySelectorAll('[data-edit-rider]').forEach((b) => b.addEventListener('click', () => openRiderModal(b.dataset.editRider)));
    wrap.querySelectorAll('[data-delete-rider]').forEach((b) => b.addEventListener('click', () => {
      if (confirm('¿Eliminar este repartidor?')) {
        state.riders = state.riders.filter((x) => x.id !== b.dataset.deleteRider);
        saveState();
        renderRiders();
        updateBadges();
        showToast('Repartidor eliminado');
      }
    }));
  }

  function vehicleLabel(v) {
    return { moto: 'Moto', bicicleta: 'Bicicleta', auto: 'Auto', a_pie: 'A pie' }[v] || v;
  }

  function initials(name) {
    return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  }

  /* =========================================================
     PEDIDOS
  ========================================================= */
  function renderOrders() {
    let list = [...state.orders];
    if (orderFilter !== 'all') list = list.filter((o) => o.status === orderFilter);

    const tbody = $('ordersTable');
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-3);padding:2rem;">No hay pedidos con este filtro.</td></tr>`;
      return;
    }
    tbody.innerHTML = list.map((o) => `
      <tr>
        <td><span class="order-id">${o.id}</span></td>
        <td>${o.business}</td>
        <td>${o.client}</td>
        <td>${o.rider}</td>
        <td>${formatPrice(o.total)}</td>
        <td><span class="status-badge status-${o.status}">${labelStatus(o.status)}</span></td>
      </tr>
    `).join('');
  }

  /* =========================================================
     USUARIOS
  ========================================================= */
  function renderUsers() {
    let list = [...state.users];
    if (userSearch) {
      const q = userSearch.toLowerCase();
      list = list.filter((u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }

    const tbody = $('usersTable');
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-3);padding:2rem;">No hay usuarios con esta búsqueda.</td></tr>`;
      return;
    }
    tbody.innerHTML = list.map((u) => `
      <tr>
        <td><strong>${u.name}</strong></td>
        <td>${u.email}</td>
        <td>${u.phone}</td>
        <td>${u.orders}</td>
        <td><span class="status-badge status-${u.status}">${labelStatus(u.status)}</span></td>
        <td>
          <button class="btn-secondary" style="padding:.35rem .7rem;border-radius:6px;font-size:.72rem;font-weight:600;" data-toggle-user="${u.id}">
            ${u.status === 'active' ? 'Suspender' : 'Activar'}
          </button>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('[data-toggle-user]').forEach((b) => b.addEventListener('click', () => {
      const u = state.users.find((x) => x.id === b.dataset.toggleUser);
      if (u) {
        u.status = u.status === 'active' ? 'suspended' : 'active';
        saveState();
        renderUsers();
        showToast(`Usuario ${u.name} ${u.status === 'active' ? 'activado' : 'suspendido'}`);
      }
    }));
  }

  /* =========================================================
     PROMOCIONES
  ========================================================= */
  function renderPromos() {
    const grid = $('promosGrid');
    if (state.promos.length === 0) {
      grid.innerHTML = `<div class="panel-card" style="grid-column:1/-1;text-align:center;color:var(--text-3)">No hay promociones globales.</div>`;
      return;
    }
    grid.innerHTML = state.promos.map((p) => `
      <div class="promo-item">
        <span class="promo-badge">${p.badge || 'Promo'}</span>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        ${p.discount > 0 ? `<span class="promo-discount">-${p.discount}%</span>` : ''}
        <div class="promo-actions">
          <button class="btn-edit" data-edit-promo="${p.id}">Editar</button>
          <button class="btn-delete" data-delete-promo="${p.id}">Eliminar</button>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('[data-edit-promo]').forEach((b) => b.addEventListener('click', () => openPromoModal(b.dataset.editPromo)));
    grid.querySelectorAll('[data-delete-promo]').forEach((b) => b.addEventListener('click', () => {
      if (confirm('¿Eliminar esta promoción?')) {
        state.promos = state.promos.filter((p) => p.id !== b.dataset.deletePromo);
        saveState();
        renderPromos();
        showToast('Promoción eliminada');
      }
    }));
  }

  /* =========================================================
     FINANZAS
  ========================================================= */
  function renderFinanzas() {
    const gmvMonth = state.transactions.reduce((s, t) => s + t.amount, 0);
    const commission = state.transactions.reduce((s, t) => s + t.commission, 0);
    const riderPayments = state.transactions.filter((t) => t.status === 'pending').reduce((s, t) => s + t.amount, 0);

    $('finGMV').textContent = formatPrice(gmvMonth);
    $('finCommission').textContent = formatPrice(commission);
    $('finRiderPayments').textContent = formatPrice(riderPayments);

    $('transactionsTable').innerHTML = state.transactions.map((t) => `
      <tr>
        <td>${t.date}</td>
        <td><span class="order-id">${t.order}</span></td>
        <td>${formatPrice(t.amount)}</td>
        <td>${formatPrice(t.commission)}</td>
        <td><span class="status-badge status-${t.status === 'paid' ? 'entregado' : 'pending'}">${t.status === 'paid' ? 'Pagado' : 'Pendiente'}</span></td>
      </tr>
    `).join('');
  }

  /* =========================================================
     CONFIGURACIÓN
  ========================================================= */
  function fillConfig() {
    const c = state.config;
    $('cfgCommission').value = c.commission;
    $('cfgBaseDelivery').value = c.baseDelivery;
    $('cfgRiderBase').value = c.riderBase;
    $('cfgRiderPerKm').value = c.riderPerKm;
    $('cfgPlatformOpen').checked = c.platformOpen;
    $('cfgAutoApproveBiz').checked = c.autoApproveBiz;
    $('cfgAutoApproveRider').checked = c.autoApproveRider;
    $('cfgAppMessage').value = c.appMessage;
    $('cfgSupportEmail').value = c.supportEmail;
    $('cfgSupportPhone').value = c.supportPhone;
  }

  /* =========================================================
     MODALES
  ========================================================= */
  function openModal(id) {
    $(id).classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(id) {
    $(id).classList.remove('open');
    document.body.style.overflow = '';
  }

  function openBizModal(id) {
    const isEdit = !!id;
    $('bizModalTitle').textContent = isEdit ? 'Editar negocio' : 'Registrar negocio';
    $('bizId').value = id || '';

    if (isEdit) {
      const b = state.businesses.find((x) => x.id === id);
      if (b) {
        $('bizName').value = b.name;
        $('bizCategory').value = b.category;
        $('bizPhone').value = b.phone;
        $('bizEmail').value = b.email;
        $('bizAddress').value = b.address;
        $('bizDesc').value = b.desc;
        $('bizImage').value = b.image;
        $('bizCommission').value = b.commission;
        $('bizStatus').value = b.status;
      }
    } else {
      $('bizForm').reset();
      $('bizId').value = '';
      $('bizCommission').value = state.config.commission;
      $('bizStatus').value = 'pending';
    }
    openModal('bizModal');
  }

  function openRiderModal(id) {
    const isEdit = !!id;
    $('riderModalTitle').textContent = isEdit ? 'Editar repartidor' : 'Registrar repartidor';
    $('riderId').value = id || '';

    if (isEdit) {
      const r = state.riders.find((x) => x.id === id);
      if (r) {
        $('riderName').value = r.name;
        $('riderPhone').value = r.phone;
        $('riderEmail').value = r.email;
        $('riderVehicle').value = r.vehicle;
        $('riderPlate').value = r.plate;
        $('riderZone').value = r.zone;
        $('riderStatus').value = r.status;
      }
    } else {
      $('riderForm').reset();
      $('riderId').value = '';
      $('riderStatus').value = 'pending';
    }
    openModal('riderModal');
  }

  function openPromoModal(id) {
    const isEdit = !!id;
    $('promoModalTitle').textContent = isEdit ? 'Editar promoción' : 'Nueva promoción';
    $('promoId').value = id || '';

    if (isEdit) {
      const p = state.promos.find((x) => x.id === id);
      if (p) {
        $('promoTitle').value = p.title;
        $('promoDesc').value = p.desc;
        $('promoBadge').value = p.badge || '';
        $('promoDiscount').value = p.discount || '';
      }
    } else {
      $('promoForm').reset();
      $('promoId').value = '';
    }
    openModal('promoModal');
  }

  /* =========================================================
     INIT
  ========================================================= */
  function init() {
    renderNotifications();
    updateBadges();
    renderResumen();

    // Sidebar
    $('menuToggle').addEventListener('click', openSidebar);
    $('sidebarClose').addEventListener('click', closeSidebar);
    $('sidebarOverlay').addEventListener('click', closeSidebar);

    document.querySelectorAll('.side-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        switchSection(link.dataset.section);
      });
    });
    document.querySelectorAll('[data-section]').forEach((link) => {
      if (!link.classList.contains('side-link')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          switchSection(link.dataset.section);
        });
      }
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

    // Filtros negocios
    document.querySelectorAll('[data-biz-filter]').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-biz-filter]').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        bizFilter = chip.dataset.bizFilter;
        renderBiz();
      });
    });
    $('bizSearch').addEventListener('input', (e) => {
      bizSearch = e.target.value.trim();
      renderBiz();
    });

    // Filtros repartidores
    document.querySelectorAll('[data-rider-filter]').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-rider-filter]').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        riderFilter = chip.dataset.riderFilter;
        renderRiders();
      });
    });
    $('riderSearch').addEventListener('input', (e) => {
      riderSearch = e.target.value.trim();
      renderRiders();
    });

    // Filtros pedidos
    document.querySelectorAll('[data-order-filter]').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-order-filter]').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        orderFilter = chip.dataset.orderFilter;
        renderOrders();
      });
    });

    // Búsqueda usuarios
    $('userSearch').addEventListener('input', (e) => {
      userSearch = e.target.value.trim();
      renderUsers();
    });

    // Registro negocio
    $('btnAddBiz').addEventListener('click', () => openBizModal());
    $('bizForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = $('bizId').value;
      const data = {
        name: $('bizName').value.trim(),
        category: $('bizCategory').value,
        phone: $('bizPhone').value.trim(),
        email: $('bizEmail').value.trim(),
        address: $('bizAddress').value.trim(),
        desc: $('bizDesc').value.trim(),
        image: $('bizImage').value.trim() || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
        commission: Number($('bizCommission').value),
        status: $('bizStatus').value
      };
      if (id) {
        const b = state.businesses.find((x) => x.id === id);
        Object.assign(b, data);
        showToast('Negocio actualizado');
      } else {
        state.businesses.unshift({
          id: 'b' + Date.now(),
          rating: 0,
          orders: 0,
          createdAt: 'Hoy',
          ...data
        });
        showToast('Negocio registrado');
      }
      saveState();
      closeModal('bizModal');
      renderBiz();
      updateBadges();
    });

    // Registro repartidor
    $('btnAddRider').addEventListener('click', () => openRiderModal());
    $('riderForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = $('riderId').value;
      const data = {
        name: $('riderName').value.trim(),
        phone: $('riderPhone').value.trim(),
        email: $('riderEmail').value.trim(),
        vehicle: $('riderVehicle').value,
        plate: $('riderPlate').value.trim() || 'N/A',
        zone: $('riderZone').value.trim(),
        status: $('riderStatus').value
      };
      if (id) {
        const r = state.riders.find((x) => x.id === id);
        Object.assign(r, data);
        showToast('Repartidor actualizado');
      } else {
        state.riders.unshift({
          id: 'r' + Date.now(),
          rating: 0,
          ordersCompleted: 0,
          joinedAt: 'Hoy',
          ...data
        });
        showToast('Repartidor registrado');
      }
      saveState();
      closeModal('riderModal');
      renderRiders();
      updateBadges();
    });

    // Promociones
    $('btnAddPromoGlobal').addEventListener('click', () => openPromoModal());
    $('promoForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = $('promoId').value;
      const data = {
        title: $('promoTitle').value.trim(),
        desc: $('promoDesc').value.trim(),
        badge: $('promoBadge').value.trim(),
        discount: Number($('promoDiscount').value) || 0
      };
      if (id) {
        const p = state.promos.find((x) => x.id === id);
        Object.assign(p, data);
        showToast('Promoción actualizada');
      } else {
        state.promos.unshift({ id: 'pr' + Date.now(), ...data });
        showToast('Promoción creada');
      }
      saveState();
      closeModal('promoModal');
      renderPromos();
    });

    // Config
    $('configForm').addEventListener('submit', (e) => {
      e.preventDefault();
      state.config = {
        commission: Number($('cfgCommission').value),
        baseDelivery: Number($('cfgBaseDelivery').value),
        riderBase: Number($('cfgRiderBase').value),
        riderPerKm: Number($('cfgRiderPerKm').value),
        platformOpen: $('cfgPlatformOpen').checked,
        autoApproveBiz: $('cfgAutoApproveBiz').checked,
        autoApproveRider: $('cfgAutoApproveRider').checked,
        appMessage: $('cfgAppMessage').value.trim(),
        supportEmail: $('cfgSupportEmail').value.trim(),
        supportPhone: $('cfgSupportPhone').value.trim()
      };
      saveState();
      showToast('Configuración guardada correctamente');
    });
    $('configReset').addEventListener('click', () => {
      fillConfig();
      showToast('Cambios descartados');
    });

    // Cerrar modales
    document.querySelectorAll('[data-close]').forEach((el) => {
      el.addEventListener('click', () => closeModal(el.dataset.close));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        ['bizModal', 'riderModal', 'promoModal'].forEach((id) => closeModal(id));
        closeSidebar();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();