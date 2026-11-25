/* =========================================================
   PANEL DE NEGOCIOS — CHUAZ
========================================================= */
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const formatPrice = (v) => '$' + Number(v).toLocaleString('es-CO');

  /* =========================================================
     ESTADO INICIAL (persistido en localStorage)
  ========================================================= */
  const STORE_KEY = 'chuaz_panel_state';

  const defaultState = {
    business: {
      name: 'La Pizzería',
      category: 'pizza',
      phone: '+57 300 123 4567',
      email: 'contacto@lapizzeria.com',
      address: 'Calle 45 #12-30, Chapinero',
      description: 'Pizza artesanal con ingredientes frescos y masa madre.',
      deliveryCost: 0,
      freeDelivery: true,
      time: '25-35 min',
      openTime: '10:00',
      closeTime: '22:00',
      openNow: true
    },
    products: [
      { id: 'p1', name: 'Pizza Margarita', desc: 'Tomate, mozzarella y albahaca fresca', price: 18900, oldPrice: 22000, category: 'pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80', sold: 42 },
      { id: 'p2', name: 'Pizza Pepperoni', desc: 'Doble pepperoni y queso mozzarella', price: 24900, oldPrice: null, category: 'pizza', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80', sold: 35 },
      { id: 'p3', name: 'Pizza Cuatro Quesos', desc: 'Mozzarella, parmesano, gorgonzola y provolone', price: 27900, oldPrice: null, category: 'pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', sold: 21 },
      { id: 'p4', name: 'Limonada natural 1L', desc: 'Recién hecha con limón y hierbabuena', price: 8500, oldPrice: null, category: 'drinks', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&q=80', sold: 28 }
    ],
    orders: [
      { id: 'CH-1042', client: 'María Camila R.', address: 'Calle 53 #24-10, Galerías', items: '1x Pizza Margarita, 1x Limonada', total: 27400, status: 'nuevo', time: 'Hace 3 min' },
      { id: 'CH-1041', client: 'Julián Rojas', address: 'Carrera 7 #56-12, Zona Rosa', items: '1x Pizza Pepperoni', total: 24900, status: 'preparando', time: 'Hace 12 min' },
      { id: 'CH-1040', client: 'Andrea L.', address: 'Calle 45 #12-30, Chapinero', items: '2x Pizza Cuatro Quesos', total: 55800, status: 'camino', time: 'Hace 25 min' },
      { id: 'CH-1039', client: 'Carlos M.', address: 'Calle 70 #5-22, Quinta Camacho', items: '1x Pizza Margarita, 1x Pizza Pepperoni', total: 43800, status: 'entregado', time: 'Hace 1 h' },
      { id: 'CH-1038', client: 'Sofía P.', address: 'Carrera 13 #63-45, Chapinero', items: '1x Limonada', total: 8500, status: 'cancelado', time: 'Hace 2 h' }
    ],
    promos: [
      { id: 'pr1', title: '2x1 en margaritas', desc: 'Todos los miércoles en tu pizza favorita', badge: '2x1', discount: 50 },
      { id: 'pr2', title: 'Envío gratis', desc: 'En pedidos superiores a $25.000', badge: 'Envío gratis', discount: 0 }
    ],
    reviews: [
      { id: 'r1', author: 'María Camila R.', rating: 5, date: 'Hace 2 días', text: 'La mejor pizza de la ciudad. Llegó caliente y rápido. ¡Recomendadísimos!', reply: null },
      { id: 'r2', author: 'Julián Rojas', rating: 4, date: 'Hace 5 días', text: 'Muy buena atención y sabor. El empaque podría mejorar un poco.', reply: 'Gracias Julián, tomamos nota para seguir mejorando.' },
      { id: 'r3', author: 'Andrea L.', rating: 5, date: 'Hace 1 semana', text: 'Pedido perfecto, la pizza Cuatro Quesos es espectacular.', reply: null },
      { id: 'r4', author: 'Carlos M.', rating: 3, date: 'Hace 2 semanas', text: 'Rico pero tardó un poco más de lo esperado.', reply: null }
    ],
    notifications: [
      { id: 'n1', title: 'Nuevo pedido CH-1042', text: 'María Camila R. hizo un pedido', read: false },
      { id: 'n2', title: 'Reseña nueva', text: 'Andrea L. te dejó 5 estrellas', read: false },
      { id: 'n3', title: 'Producto agotado', text: 'Revisa tu inventario', read: true }
    ]
  };

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return JSON.parse(JSON.stringify(defaultState));
      return JSON.parse(raw);
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
     NAVEGACIÓN ENTRE SECCIONES
  ========================================================= */
  const sectionTitles = {
    resumen: ['Resumen', 'Vista general de tu negocio'],
    pedidos: ['Pedidos', 'Gestiona los pedidos en curso'],
    productos: ['Productos', 'Administra tu menú'],
    promociones: ['Promociones', 'Crea ofertas para tus clientes'],
    resenas: ['Reseñas', 'Lo que dicen tus clientes'],
    perfil: ['Perfil del negocio', 'Configura tu información y envío']
  };

  function switchSection(name) {
    document.querySelectorAll('.section').forEach((s) => s.classList.remove('active'));
    const target = $('section-' + name);
    if (target) target.classList.add('active');

    document.querySelectorAll('.side-link').forEach((l) => {
      l.classList.toggle('active', l.dataset.section === name);
    });

    const [t, sub] = sectionTitles[name] || ['Panel', ''];
    $('pageTitle').textContent = t;
    $('pageSubtitle').textContent = sub;

    closeSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (name === 'resumen') renderResumen();
    if (name === 'pedidos') renderOrders();
    if (name === 'productos') renderProducts();
    if (name === 'promociones') renderPromos();
    if (name === 'resenas') renderReviews();
    if (name === 'perfil') fillProfileForm();
  }

  /* =========================================================
     SIDEBAR (móvil)
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
    const unread = state.notifications.filter(n => !n.read).length;
    $('notifDot').classList.toggle('show', unread > 0);

    list.innerHTML = state.notifications.map(n => `
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
     RENDER RESUMEN
  ========================================================= */
  function renderResumen() {
    const ordersToday = state.orders.length;
    const ventas = state.orders
      .filter(o => o.status !== 'cancelado')
      .reduce((s, o) => s + o.total, 0);

    $('kpiVentas').textContent = formatPrice(ventas);
    $('kpiPedidos').textContent = ordersToday;
    $('kpiRating').textContent = getAvgRating().toFixed(1);
    $('kpiRatingCount').textContent = `${state.reviews.length} reseñas`;
    $('kpiTiempo').textContent = state.business.time;
    $('kpiPedidosTrend').textContent = `${state.orders.filter(o => o.status !== 'entregado' && o.status !== 'cancelado').length} en curso`;
    $('kpiVentasTrend').textContent = '+12% vs ayer';

    // Chart
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const values = [60, 75, 55, 90, 70, 100, 80];
    const max = Math.max(...values);
    $('salesChart').innerHTML = days.map((d, i) => `
      <div class="chart-bar-wrap">
        <div class="chart-bar" style="height:${(values[i] / max) * 100}%"></div>
        <span class="chart-label">${d}</span>
      </div>
    `).join('');

    // Top productos
    const top = [...state.products].sort((a, b) => b.sold - a.sold).slice(0, 4);
    $('topProducts').innerHTML = top.map(p => `
      <div class="top-product">
        <img src="${p.image}" alt="${p.name}" />
        <div class="top-product-info">
          <strong>${p.name}</strong>
          <span>${p.sold} vendidos</span>
        </div>
        <span class="top-product-price">${formatPrice(p.price)}</span>
      </div>
    `).join('');

    // Pedidos recientes
    $('recentOrders').innerHTML = state.orders.slice(0, 5).map(o => `
      <tr>
        <td><span class="order-id">${o.id}</span></td>
        <td>${o.client}</td>
        <td><div class="order-products">${o.items}</div></td>
        <td>${formatPrice(o.total)}</td>
        <td><span class="status-badge status-${o.status}">${labelStatus(o.status)}</span></td>
        <td><button class="btn-edit" style="padding:.35rem .7rem;border-radius:6px;font-size:.72rem;font-weight:600;" data-open-order="${o.id}">Ver</button></td>
      </tr>
    `).join('');

    $('recentOrders').querySelectorAll('[data-open-order]').forEach(btn => {
      btn.addEventListener('click', () => switchSection('pedidos'));
    });

    updateBadge();
  }

  function labelStatus(s) {
    return { nuevo: 'Nuevo', preparando: 'Preparando', camino: 'En camino', entregado: 'Entregado', cancelado: 'Cancelado' }[s] || s;
  }

  function updateBadge() {
    const pendientes = state.orders.filter(o => o.status === 'nuevo' || o.status === 'preparando').length;
    const badge = $('badgePedidos');
    badge.textContent = pendientes;
    badge.style.display = pendientes ? 'grid' : 'none';
  }

  /* =========================================================
     RENDER PEDIDOS
  ========================================================= */
  let orderFilter = 'all';

  function renderOrders() {
    const list = orderFilter === 'all' ? state.orders : state.orders.filter(o => o.status === orderFilter);
    const grid = $('ordersGrid');

    if (list.length === 0) {
      grid.innerHTML = `<div class="panel-card" style="grid-column:1/-1;text-align:center;color:var(--text-3)">No hay pedidos en este estado.</div>`;
      return;
    }

    grid.innerHTML = list.map(o => `
      <div class="order-card">
        <div class="order-card-top">
          <strong>${o.id}</strong>
          <span class="status-badge status-${o.status}">${labelStatus(o.status)}</span>
        </div>
        <div class="order-client">${o.client}</div>
        <div class="order-address">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${o.address}
        </div>
        <div class="order-items">${o.items}</div>
        <div class="order-foot">
          <div>
            <div class="order-total">${formatPrice(o.total)}</div>
            <small style="color:var(--text-3);font-size:.72rem;">${o.time}</small>
          </div>
          <div class="order-actions">
            ${o.status === 'nuevo' ? `<button class="btn btn-primary btn-sm" data-action="preparando" data-id="${o.id}">Aceptar</button>` : ''}
            ${o.status === 'preparando' ? `<button class="btn btn-primary btn-sm" data-action="camino" data-id="${o.id}">Enviar</button>` : ''}
            ${o.status === 'camino' ? `<button class="btn btn-primary btn-sm" data-action="entregado" data-id="${o.id}">Entregado</button>` : ''}
            ${(o.status === 'nuevo' || o.status === 'preparando') ? `<button class="btn btn-ghost btn-sm" data-action="cancelado" data-id="${o.id}">Cancelar</button>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const order = state.orders.find(o => o.id === btn.dataset.id);
        if (order) {
          order.status = btn.dataset.action;
          saveState();
          renderOrders();
          updateBadge();
          showToast('Pedido actualizado a ' + labelStatus(order.status));
        }
      });
    });
  }

  /* =========================================================
     RENDER PRODUCTOS
  ========================================================= */
  let productFilter = 'all';

  function renderProducts() {
    const list = productFilter === 'all'
      ? state.products
      : state.products.filter(p => p.category === productFilter);

    const grid = $('productsGrid');
    if (list.length === 0) {
      grid.innerHTML = `<div class="panel-card" style="grid-column:1/-1;text-align:center;color:var(--text-3)">No tienes productos en esta categoría.</div>`;
      return;
    }

    grid.innerHTML = list.map(p => `
      <div class="product-card">
        <div class="product-media">
          <img src="${p.image}" alt="${p.name}" />
          ${p.oldPrice ? `<span class="product-offer">Oferta</span>` : ''}
        </div>
        <div class="product-body">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="product-price-row">
            <span class="product-price">${formatPrice(p.price)}</span>
            ${p.oldPrice ? `<span class="product-old">${formatPrice(p.oldPrice)}</span>` : ''}
          </div>
        </div>
        <div class="product-actions">
          <button class="btn-edit" data-edit-product="${p.id}">Editar</button>
          <button class="btn-delete" data-delete-product="${p.id}">Eliminar</button>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('[data-edit-product]').forEach(btn => {
      btn.addEventListener('click', () => openProductModal(btn.dataset.editProduct));
    });
    grid.querySelectorAll('[data-delete-product]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('¿Eliminar este producto?')) {
          state.products = state.products.filter(p => p.id !== btn.dataset.deleteProduct);
          saveState();
          renderProducts();
          showToast('Producto eliminado');
        }
      });
    });
  }

  /* =========================================================
     RENDER PROMOCIONES
  ========================================================= */
  function renderPromos() {
    const grid = $('promosGrid');
    if (state.promos.length === 0) {
      grid.innerHTML = `<div class="panel-card" style="grid-column:1/-1;text-align:center;color:var(--text-3)">Aún no tienes promociones activas.</div>`;
      return;
    }

    grid.innerHTML = state.promos.map(pr => `
      <div class="promo-item">
        <span class="promo-badge">${pr.badge || 'Promo'}</span>
        <h3>${pr.title}</h3>
        <p>${pr.desc}</p>
        ${pr.discount > 0 ? `<span class="promo-discount">-${pr.discount}%</span>` : ''}
        <div class="promo-actions">
          <button class="btn-edit" data-edit-promo="${pr.id}">Editar</button>
          <button class="btn-delete" data-delete-promo="${pr.id}">Eliminar</button>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('[data-edit-promo]').forEach(btn => {
      btn.addEventListener('click', () => openPromoModal(btn.dataset.editPromo));
    });
    grid.querySelectorAll('[data-delete-promo]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('¿Eliminar esta promoción?')) {
          state.promos = state.promos.filter(p => p.id !== btn.dataset.deletePromo);
          saveState();
          renderPromos();
          showToast('Promoción eliminada');
        }
      });
    });
  }

  /* =========================================================
     RENDER RESEÑAS
  ========================================================= */
  function getAvgRating() {
    if (state.reviews.length === 0) return 0;
    return state.reviews.reduce((s, r) => s + r.rating, 0) / state.reviews.length;
  }

  function renderReviews() {
    const avg = getAvgRating();
    $('reviewAvg').textContent = avg.toFixed(1);
    $('reviewCount').textContent = `${state.reviews.length} reseñas`;

    $('reviewStars').innerHTML = Array.from({ length: 5 }, (_, i) => `
      <svg viewBox="0 0 24 24" fill="${i < Math.round(avg) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    `).join('');

    // Bars
    const counts = [0, 0, 0, 0, 0];
    state.reviews.forEach(r => counts[5 - r.rating]++);
    $('reviewBars').innerHTML = counts.map((c, i) => `
      <div class="review-bar-row">
        <span>${5 - i}</span>
        <div class="review-bar-track"><div class="review-bar-fill" style="width:${state.reviews.length ? (c / state.reviews.length) * 100 : 0}%"></div></div>
        <span>${c}</span>
      </div>
    `).join('');

    // Lista
    $('reviewsList').innerHTML = state.reviews.map(r => `
      <div class="review-card">
        <div class="review-head">
          <div class="review-avatar">${initials(r.author)}</div>
          <div class="review-meta">
            <strong>${r.author}</strong>
            <small>${r.date}</small>
          </div>
          <div class="review-stars">
            ${Array.from({ length: 5 }, (_, i) => `
              <svg viewBox="0 0 24 24" fill="${i < r.rating ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            `).join('')}
          </div>
        </div>
        <p class="review-text">${r.text}</p>
        ${r.reply ? `<div class="review-reply"><strong>Tu respuesta:</strong> ${r.reply}</div>` : `<button class="btn-edit" style="padding:.35rem .7rem;border-radius:6px;font-size:.72rem;font-weight:600;width:fit-content;" data-reply="${r.id}">Responder</button>`}
      </div>
    `).join('');

    $('reviewsList').querySelectorAll('[data-reply]').forEach(btn => {
      btn.addEventListener('click', () => {
        const r = state.reviews.find(x => x.id === btn.dataset.reply);
        if (!r) return;
        const reply = prompt('Tu respuesta:');
        if (reply) {
          r.reply = reply;
          saveState();
          renderReviews();
          showToast('Respuesta enviada');
        }
      });
    });
  }

  function initials(name) {
    return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  }

  /* =========================================================
     FORMULARIO PERFIL
  ========================================================= */
  function fillProfileForm() {
    const b = state.business;
    $('bizName').value = b.name;
    $('bizCategory').value = b.category;
    $('bizPhone').value = b.phone;
    $('bizEmail').value = b.email;
    $('bizAddress').value = b.address;
    $('bizDesc').value = b.description;
    $('bizDelivery').value = b.deliveryCost;
    $('bizTime').value = b.time;
    $('bizOpen').value = b.openTime;
    $('bizClose').value = b.closeTime;
    $('bizOpenNow').checked = b.openNow;
    $('bizFreeDelivery').checked = b.freeDelivery;

    updateBusinessMini();
  }

  function updateBusinessMini() {
    $('bizMiniName').textContent = state.business.name;
    $('bizMiniStatus').textContent = state.business.openNow ? 'Abierto' : 'Cerrado';
    $('bizMiniStatus').className = 'status-pill ' + (state.business.openNow ? 'online' : '');
    $('topbarUser').querySelector('strong').textContent = state.business.name;
  }

  /* =========================================================
     MODAL PRODUCTO
  ========================================================= */
  function openProductModal(id) {
    const isEdit = !!id;
    $('productModalTitle').textContent = isEdit ? 'Editar producto' : 'Nuevo producto';
    $('productId').value = id || '';
    if (isEdit) {
      const p = state.products.find(x => x.id === id);
      if (p) {
        $('productName').value = p.name;
        $('productDesc').value = p.desc;
        $('productPrice').value = p.price;
        $('productOldPrice').value = p.oldPrice || '';
        $('productCategory').value = p.category;
        $('productImage').value = p.image;
      }
    } else {
      $('productForm').reset();
      $('productId').value = '';
    }
    openModal('productModal');
  }

  /* =========================================================
     MODAL PROMO
  ========================================================= */
  function openPromoModal(id) {
    const isEdit = !!id;
    $('promoModalTitle').textContent = isEdit ? 'Editar promoción' : 'Nueva promoción';
    $('promoId').value = id || '';
    if (isEdit) {
      const p = state.promos.find(x => x.id === id);
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

  /* =========================================================
     INIT
  ========================================================= */
  function init() {
    renderNotifications();
    updateBadge();
    renderResumen();
    updateBusinessMini();

    // Sidebar
    $('menuToggle').addEventListener('click', openSidebar);
    $('sidebarClose').addEventListener('click', closeSidebar);
    $('sidebarOverlay').addEventListener('click', closeSidebar);

    document.querySelectorAll('.side-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        switchSection(link.dataset.section);
      });
    });
    document.querySelectorAll('[data-section]').forEach(link => {
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
      state.notifications.forEach(n => n.read = true);
      saveState();
      renderNotifications();
      showToast('Notificaciones marcadas como leídas');
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#notifPanel') && !e.target.closest('#notifBtn')) {
        $('notifPanel').classList.remove('open');
      }
    });

    // Filtros pedidos
    document.querySelectorAll('[data-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-filter]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        orderFilter = chip.dataset.filter;
        renderOrders();
      });
    });

    // Filtros productos
    document.querySelectorAll('[data-product-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-product-filter]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        productFilter = chip.dataset.productFilter;
        renderProducts();
      });
    });

    // Producto: abrir modal
    $('btnAddProduct').addEventListener('click', () => openProductModal());

    // Producto: guardar
    $('productForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = $('productId').value;
      const data = {
        name: $('productName').value.trim(),
        desc: $('productDesc').value.trim(),
        price: Number($('productPrice').value),
        oldPrice: $('productOldPrice').value ? Number($('productOldPrice').value) : null,
        category: $('productCategory').value,
        image: $('productImage').value.trim() || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80'
      };

      if (id) {
        const p = state.products.find(x => x.id === id);
        Object.assign(p, data);
        showToast('Producto actualizado');
      } else {
        state.products.unshift({
          id: 'p' + Date.now(),
          sold: 0,
          ...data
        });
        showToast('Producto creado');
      }

      saveState();
      closeModal('productModal');
      renderProducts();
      renderResumen();
    });

    // Promo: abrir modal
    $('btnAddPromo').addEventListener('click', () => openPromoModal());

    // Promo: guardar
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
        const p = state.promos.find(x => x.id === id);
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

    // Cerrar modales
    document.querySelectorAll('[data-close]').forEach(el => {
      el.addEventListener('click', () => closeModal(el.dataset.close));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        ['productModal', 'promoModal'].forEach(id => closeModal(id));
        closeSidebar();
      }
    });

    // Form perfil
    $('profileForm').addEventListener('submit', (e) => {
      e.preventDefault();
      state.business.name = $('bizName').value.trim();
      state.business.category = $('bizCategory').value;
      state.business.phone = $('bizPhone').value.trim();
      state.business.email = $('bizEmail').value.trim();
      state.business.address = $('bizAddress').value.trim();
      state.business.description = $('bizDesc').value.trim();
      state.business.deliveryCost = Number($('bizDelivery').value);
      state.business.time = $('bizTime').value.trim();
      state.business.openTime = $('bizOpen').value;
      state.business.closeTime = $('bizClose').value;
      state.business.openNow = $('bizOpenNow').checked;
      state.business.freeDelivery = $('bizFreeDelivery').checked;
      saveState();
      updateBusinessMini();
      showToast('Perfil actualizado correctamente');
    });

    $('profileReset').addEventListener('click', () => {
      fillProfileForm();
      showToast('Cambios descartados');
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();