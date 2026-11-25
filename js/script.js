/* =========================================================
   CHUAZ — script global
========================================================= */
(function () {
  'use strict';

  /* =========================================================
     DATOS
  ========================================================= */
  const verticals = [
    { id: 'food', name: 'Comida', icon: 'food' },
    { id: 'pharmacy', name: 'Farmacia', icon: 'pharmacy' },
    { id: 'tech', name: 'Tecnología', icon: 'tech' },
    { id: 'store', name: 'Tiendas', icon: 'store' },
    { id: 'pets', name: 'Mascotas', icon: 'pets' },
    { id: 'liquor', name: 'Licores', icon: 'liquor' },
    { id: 'beauty', name: 'Belleza', icon: 'beauty' }
  ];

  const foodCategories = [
    { id: 'all', name: 'Todos' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'burgers', name: 'Hamburguesas' },
    { id: 'sushi', name: 'Sushi' },
    { id: 'healthy', name: 'Saludable' },
    { id: 'desserts', name: 'Postres' },
    { id: 'drinks', name: 'Bebidas' }
  ];

  /* Datos de negocios con horarios, contraentrega y más pedidos */
  const businesses = [
    {
      id: 1, vertical: 'food', category: 'pizza',
      name: 'La Pizzería', rating: 4.8, time: '25-35 min',
      freeDelivery: true, deliveryCost: 0, priceRange: '$$',
      address: 'Calle 45 #12-30, Chapinero',
      openTime: '11:00', closeTime: '23:00', acceptsCash: true,
      topSelling: 'Pizza Margarita',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 101, name: 'Pizza Margarita', desc: 'Tomate, mozzarella y albahaca fresca', price: 18900, oldPrice: 22000, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80' },
        { id: 102, name: 'Pizza Pepperoni', desc: 'Doble pepperoni y queso mozzarella', price: 24900, oldPrice: null, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80' },
        { id: 103, name: 'Pizza Cuatro Quesos', desc: 'Mozzarella, parmesano, gorgonzola y provolone', price: 27900, oldPrice: null, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 2, vertical: 'food', category: 'burgers',
      name: 'Burger House', rating: 4.6, time: '20-30 min',
      freeDelivery: false, deliveryCost: 2500, priceRange: '$$',
      address: 'Carrera 7 #56-12, Zona Rosa',
      openTime: '12:00', closeTime: '22:30', acceptsCash: false,
      topSelling: 'Doble Cheeseburger',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 201, name: 'Doble Cheeseburger', desc: 'Dos carnes, queso cheddar y salsa especial', price: 22500, oldPrice: 26000, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80' },
        { id: 202, name: 'BBQ Bacon Burger', desc: 'Tocino crujiente, salsa BBQ y cebolla caramelizada', price: 24900, oldPrice: null, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=300&q=80' },
        { id: 203, name: 'Papas rústicas', desc: 'Porción grande con especias de la casa', price: 8900, oldPrice: null, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 3, vertical: 'food', category: 'sushi',
      name: 'Sakura Sushi', rating: 4.9, time: '35-45 min',
      freeDelivery: true, deliveryCost: 0, priceRange: '$$$',
      address: 'Calle 85 #15-40, Zona G',
      openTime: '12:00', closeTime: '23:30', acceptsCash: true,
      topSelling: 'Roll California',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 301, name: 'Roll California (12 uds)', desc: 'Cangrejo, aguacate y pepino', price: 29900, oldPrice: 34900, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80' },
        { id: 302, name: 'Roll Spicy Tuna', desc: 'Atún fresco, sriracha y cebollín', price: 32900, oldPrice: null, image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=300&q=80' },
        { id: 303, name: 'Sashimi Salmón', desc: '8 cortes de salmón fresco', price: 35900, oldPrice: null, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 4, vertical: 'food', category: 'healthy',
      name: 'Verde & Fresco', rating: 4.7, time: '20-30 min',
      freeDelivery: false, deliveryCost: 1900, priceRange: '$$',
      address: 'Calle 70 #5-22, Quinta Camacho',
      openTime: '08:00', closeTime: '20:00', acceptsCash: true,
      topSelling: 'Bowl de quinoa',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 401, name: 'Bowl de quinoa', desc: 'Quinoa, aguacate, garbanzo y vegetales', price: 24500, oldPrice: 28000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80' },
        { id: 402, name: 'Ensalada César', desc: 'Pollo grillado, parmesano y aderezo César', price: 21900, oldPrice: null, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=300&q=80' },
        { id: 403, name: 'Smoothie verde', desc: 'Espinaca, manzana, piña y jengibre', price: 12900, oldPrice: null, image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 5, vertical: 'food', category: 'desserts',
      name: 'Dulce Tentación', rating: 4.8, time: '15-25 min',
      freeDelivery: true, deliveryCost: 0, priceRange: '$$',
      address: 'Carrera 11 #93-20, Chicó',
      openTime: '10:00', closeTime: '21:00', acceptsCash: true,
      topSelling: 'Torta de chocolate',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 501, name: 'Torta de chocolate', desc: 'Triple capa con ganache', price: 15900, oldPrice: 19000, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80' },
        { id: 502, name: 'Cheesecake de fresa', desc: 'Base de galleta y fresas frescas', price: 14900, oldPrice: null, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=300&q=80' },
        { id: 503, name: 'Brownie con helado', desc: 'Brownie caliente y helado de vainilla', price: 17900, oldPrice: null, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 6, vertical: 'food', category: 'pizza',
      name: 'Pizza Nostra', rating: 4.5, time: '30-40 min',
      freeDelivery: false, deliveryCost: 2000, priceRange: '$$',
      address: 'Calle 100 #15-05, Usaquén',
      openTime: '11:30', closeTime: '22:00', acceptsCash: false,
      topSelling: 'Pizza Pepperoni',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 601, name: 'Pizza Pepperoni', desc: 'Clásica con pepperoni y mozzarella', price: 27900, oldPrice: null, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80' },
        { id: 602, name: 'Pizza Hawaiana', desc: 'Jamón, piña y mozzarella', price: 25900, oldPrice: null, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 7, vertical: 'food', category: 'burgers',
      name: 'Smash & Co.', rating: 4.7, time: '25-35 min',
      freeDelivery: true, deliveryCost: 0, priceRange: '$$',
      address: 'Carrera 13 #63-45, Chapinero',
      openTime: '12:00', closeTime: '23:00', acceptsCash: true,
      topSelling: 'Smash Burger BBQ',
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 701, name: 'Smash Burger BBQ', desc: 'Carne smash, BBQ y aros de cebolla', price: 24900, oldPrice: 28900, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=300&q=80' },
        { id: 702, name: 'Smash Clásica', desc: 'Carne smash, queso americano y pepinillos', price: 21900, oldPrice: null, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 8, vertical: 'food', category: 'drinks',
      name: 'Bebidas Express', rating: 4.4, time: '10-20 min',
      freeDelivery: false, deliveryCost: 1000, priceRange: '$',
      address: 'Calle 53 #24-10, Galerías',
      openTime: '09:00', closeTime: '20:00', acceptsCash: true,
      topSelling: 'Limonada natural 1L',
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 801, name: 'Limonada natural 1L', desc: 'Recién hecha con limón y hierbabuena', price: 8500, oldPrice: null, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=300&q=80' },
        { id: 802, name: 'Limonada de coco', desc: 'Cremosa y refrescante', price: 9900, oldPrice: null, image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 20, vertical: 'pharmacy', category: 'medicine',
      name: 'Farmacia Vida', rating: 4.8, time: '25-35 min',
      freeDelivery: true, deliveryCost: 0, priceRange: '$$',
      address: 'Calle 63 #24-15, Galerías',
      openTime: '07:00', closeTime: '23:00', acceptsCash: true,
      topSelling: 'Acetaminofén 500mg',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 2001, name: 'Acetaminofén 500mg x20', desc: 'Analgésico y antipirético', price: 8500, oldPrice: null, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80' },
        { id: 2002, name: 'Ibuprofeno 400mg x10', desc: 'Antiinflamatorio no esteroideo', price: 9900, oldPrice: 12000, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=300&q=80' },
        { id: 2003, name: 'Alcohol antiséptico 500ml', desc: 'Desinfección de heridas', price: 6500, oldPrice: null, image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=300&q=80' },
        { id: 2004, name: 'Tapabocas x50', desc: 'Caja desechable 3 capas', price: 15900, oldPrice: null, image: 'https://images.unsplash.com/photo-1586942593568-3f4e4e3b4f8d?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 21, vertical: 'pharmacy', category: 'medicine',
      name: 'Droguería Central', rating: 4.6, time: '20-30 min',
      freeDelivery: false, deliveryCost: 2500, priceRange: '$$',
      address: 'Carrera 7 #45-02, Centro',
      openTime: '08:00', closeTime: '20:00', acceptsCash: false,
      topSelling: 'Loratadina 10mg',
      image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 2101, name: 'Loratadina 10mg x10', desc: 'Antialérgico', price: 7900, oldPrice: null, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80' },
        { id: 2102, name: 'Suero oral 500ml', desc: 'Rehidratación', price: 4900, oldPrice: null, image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 22, vertical: 'pharmacy', category: 'medicine',
      name: 'Farmacia 24/7', rating: 4.7, time: '15-25 min',
      freeDelivery: true, deliveryCost: 0, priceRange: '$$',
      address: 'Calle 100 #20-15, Usaquén',
      openTime: '00:00', closeTime: '23:59', acceptsCash: true,
      topSelling: 'Vitamina C 500mg',
      image: 'https://images.unsplash.com/photo-1580281658223-9b93f18ae9ae?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 2201, name: 'Vitamina C 500mg x30', desc: 'Refuerzo del sistema inmune', price: 18900, oldPrice: null, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=300&q=80' },
        { id: 2202, name: 'Termómetro digital', desc: 'Medición rápida y precisa', price: 25900, oldPrice: null, image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 30, vertical: 'tech', category: 'tech',
      name: 'TechStore', rating: 4.7, time: '40-60 min',
      freeDelivery: true, deliveryCost: 0, priceRange: '$$$',
      address: 'Carrera 15 #85-30, Zona T',
      openTime: '10:00', closeTime: '21:00', acceptsCash: false,
      topSelling: 'Audífonos Bluetooth',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 3001, name: 'Audífonos Bluetooth', desc: 'Cancelación de ruido, 30h batería', price: 189900, oldPrice: 229900, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80' },
        { id: 3002, name: 'Cargador USB-C 65W', desc: 'Carga rápida universal', price: 89900, oldPrice: null, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=300&q=80' },
        { id: 3003, name: 'Smartwatch Deportivo', desc: 'Monitor cardíaco y GPS', price: 349900, oldPrice: 399900, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80' },
        { id: 3004, name: 'Power Bank 20.000mAh', desc: 'Carga 3 dispositivos a la vez', price: 129900, oldPrice: null, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 31, vertical: 'tech', category: 'tech',
      name: 'CompuMundo', rating: 4.5, time: '50-70 min',
      freeDelivery: false, deliveryCost: 5000, priceRange: '$$$',
      address: 'Calle 19 #5-30, Centro',
      openTime: '09:00', closeTime: '19:00', acceptsCash: true,
      topSelling: 'Teclado mecánico RGB',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 3101, name: 'Teclado mecánico RGB', desc: 'Switches azules, retroiluminado', price: 259900, oldPrice: null, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80' },
        { id: 3102, name: 'Mouse inalámbrico', desc: 'Ergonómico, 1600 DPI', price: 79900, oldPrice: null, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 40, vertical: 'store', category: 'store',
      name: 'MiniMarket 24h', rating: 4.6, time: '20-30 min',
      freeDelivery: false, deliveryCost: 2500, priceRange: '$',
      address: 'Calle 72 #10-15, Chapinero',
      openTime: '00:00', closeTime: '23:59', acceptsCash: true,
      topSelling: 'Leche entera 1L',
      image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 4001, name: 'Leche entera 1L', desc: 'Larga vida', price: 4200, oldPrice: null, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300&q=80' },
        { id: 4002, name: 'Pan tajado 500g', desc: 'Blanco y suave', price: 6800, oldPrice: null, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80' },
        { id: 4003, name: 'Huevos x12', desc: 'AA frescos', price: 12500, oldPrice: null, image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=300&q=80' },
        { id: 4004, name: 'Arroz 1kg', desc: 'Grano largo', price: 4800, oldPrice: null, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 41, vertical: 'store', category: 'store',
      name: 'Tienda Express', rating: 4.5, time: '15-25 min',
      freeDelivery: true, deliveryCost: 0, priceRange: '$',
      address: 'Carrera 11 #70-25, Quinta Camacho',
      openTime: '07:00', closeTime: '22:00', acceptsCash: true,
      topSelling: 'Papel higiénico x4',
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 4101, name: 'Papel higiénico x4', desc: 'Doble hoja', price: 8900, oldPrice: null, image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=300&q=80' },
        { id: 4102, name: 'Detergente 1kg', desc: 'Ropa blanca y color', price: 15900, oldPrice: null, image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 50, vertical: 'pets', category: 'pets',
      name: 'Mundo Mascotas', rating: 4.8, time: '30-40 min',
      freeDelivery: true, deliveryCost: 0, priceRange: '$$',
      address: 'Calle 80 #15-30, Zona Norte',
      openTime: '09:00', closeTime: '20:00', acceptsCash: true,
      topSelling: 'Concentrado perro 3kg',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 5001, name: 'Concentrado perro 3kg', desc: 'Pollo y arroz, todas las razas', price: 45900, oldPrice: 52900, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=300&q=80' },
        { id: 5002, name: 'Arena para gato 5kg', desc: 'Aglomerante, control de olores', price: 22900, oldPrice: null, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80' },
        { id: 5003, name: 'Juguete mordedor', desc: 'Caucho resistente', price: 12900, oldPrice: null, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 60, vertical: 'liquor', category: 'liquor',
      name: 'Licorería Central', rating: 4.7, time: '20-30 min',
      freeDelivery: false, deliveryCost: 2000, priceRange: '$$',
      address: 'Calle 60 #22-10, Galerías',
      openTime: '10:00', closeTime: '23:00', acceptsCash: true,
      topSelling: 'Cerveza 6-pack',
      image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 6001, name: 'Cerveza 6-pack', desc: 'Lager nacional', price: 24900, oldPrice: null, image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=300&q=80' },
        { id: 6002, name: 'Vino tinto 750ml', desc: 'Cabernet Sauvignon', price: 45900, oldPrice: 52900, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80' }
      ]
    },
    {
      id: 70, vertical: 'beauty', category: 'beauty',
      name: 'Belleza Total', rating: 4.6, time: '30-40 min',
      freeDelivery: true, deliveryCost: 0, priceRange: '$$',
      address: 'Carrera 13 #85-20, Chicó',
      openTime: '09:00', closeTime: '20:00', acceptsCash: false,
      topSelling: 'Crema facial hidratante',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
      menu: [
        { id: 7001, name: 'Crema facial hidratante', desc: '50ml, todo tipo de piel', price: 38900, oldPrice: null, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80' },
        { id: 7002, name: 'Labial mate', desc: 'Larga duración', price: 22900, oldPrice: null, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=300&q=80' }
      ]
    }
  ];

  /* =========================================================
     CARRUSEL PUBLICITARIO (datos)
  ========================================================= */
  const carouselSlides = [
    {
      tag: 'Entrega a domicilio',
      title: 'De todo lo que necesites',
      desc: 'Comida, farmacia, tecnología y más hasta tu puerta.',
      cta: 'Pedir ahora',
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80'
    },
    {
      tag: 'Paquetería y encomiendas',
      title: 'Envía y recibe sin salir',
      desc: 'Tu paquete seguro y a tiempo en cualquier parte de la ciudad.',
      cta: 'Enviar paquete',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
    },
    {
      tag: 'Entrega en 30 min',
      title: 'Rápido, confiable y a tiempo',
      desc: 'Miles de pedidos entregados cada día en tu ciudad.',
      cta: 'Conocer más',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  /* =========================================================
     ESTADO
  ========================================================= */
  let activeVertical = 'food'; // 'food', 'pharmacy', 'tech', etc.
  let activeCategory = 'all';
  let cart = [];
  let appQuery = '';
  let webQuery = '';
  let appExploreQuery = '';
  let webExploreQuery = '';
  let carouselIndex = { app: 0, web: 0 };

  /* =========================================================
     UTILIDADES
  ========================================================= */
  const $ = (id) => document.getElementById(id);
  const formatPrice = (v) => '$' + v.toLocaleString('es-CO');

  let toastTimer;
  function showToast(msg) {
    const t = $('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  const verticalIcons = {
    food: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10"/></svg>`,
    pharmacy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M8 8V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/></svg>`,
    tech: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="14" rx="2"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="18" x2="12" y2="20"/></svg>`,
    store: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l1.5-5h15L21 9"/><path d="M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9"/><path d="M9 22V12h6v10"/></svg>`,
    pets: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="9" r="2"/><circle cx="18" cy="9" r="2"/><circle cx="9" cy="5" r="2"/><circle cx="15" cy="5" r="2"/><path d="M12 12c-3 0-6 3-6 5a3 3 0 0 0 6 0 3 3 0 0 0 6 0c0-2-3-5-6-5z"/></svg>`,
    liquor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2h8l-1 10H9L8 2z"/><path d="M12 12v7"/><path d="M8 22h8"/></svg>`,
    beauty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2h6v4H9z"/><path d="M7 6h10v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6z"/><line x1="7" y1="11" x2="17" y2="11"/></svg>`,
    all: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`
  };

  /* =========================================================
     CARRUSEL
  ========================================================= */
  function renderCarousel(which) {
    const trackId = which === 'app' ? 'appCarouselTrack' : 'webCarouselTrack';
    const dotsId = which === 'app' ? 'appCarouselDots' : 'webCarouselDots';
    const track = $(trackId);
    const dots = $(dotsId);
    if (!track || !dots) return;

    track.innerHTML = carouselSlides.map((s) => `
      <div class="carousel-slide">
        <img src="${s.image}" alt="${s.title}" loading="lazy" />
        <div class="carousel-content">
          <span class="carousel-tag">${s.tag}</span>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
          <a href="#" class="carousel-cta">${s.cta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>
      </div>
    `).join('');

    dots.innerHTML = carouselSlides.map((_, i) => `<button class="carousel-dot ${i === 0 ? 'active' : ''}" data-i="${i}" aria-label="Ir al slide ${i + 1}"></button>`).join('');

    dots.querySelectorAll('.carousel-dot').forEach((dot) => {
      dot.addEventListener('click', () => goToSlide(which, Number(dot.dataset.i)));
    });

    updateCarousel(which);
  }

  function updateCarousel(which) {
    const trackId = which === 'app' ? 'appCarouselTrack' : 'webCarouselTrack';
    const dotsId = which === 'app' ? 'appCarouselDots' : 'webCarouselDots';
    const track = $(trackId);
    const dots = $(dotsId);
    if (!track || !dots) return;
    const i = carouselIndex[which];
    track.style.transform = `translateX(-${i * 100}%)`;
    dots.querySelectorAll('.carousel-dot').forEach((d, idx) => d.classList.toggle('active', idx === i));
  }

  function goToSlide(which, i) {
    carouselIndex[which] = (i + carouselSlides.length) % carouselSlides.length;
    updateCarousel(which);
  }

  function bindCarouselButtons() {
    document.querySelectorAll('.carousel-btn[data-carousel]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const which = btn.dataset.carousel;
        const dir = btn.classList.contains('carousel-prev') ? -1 : 1;
        goToSlide(which, carouselIndex[which] + dir);
      });
    });
  }

  /* =========================================================
     FILTROS
  ========================================================= */
  function getVerticalBusinesses(vertical) {
    if (vertical === 'all') return businesses;
    return businesses.filter((b) => b.vertical === vertical);
  }

  function filterByQuery(list, query) {
    if (!query) return list;
    const q = query.toLowerCase();
    return list.filter((b) =>
      b.name.toLowerCase().includes(q) ||
      b.address.toLowerCase().includes(q) ||
      b.menu.some((m) => m.name.toLowerCase().includes(q))
    );
  }

  function getHomeList(query) {
    // Si estamos filtrando por una vertical específica (distinta a 'food')
    if (activeVertical && activeVertical !== 'food') {
      let list = businesses.filter((b) => b.vertical === activeVertical);
      return filterByQuery(list, query);
    }
    
    // Comportamiento por defecto (Inicio): mostrar solo comida con su categoría
    let list = businesses.filter((b) => b.vertical === 'food');
    if (activeCategory !== 'all') list = list.filter((b) => b.category === activeCategory);
    return filterByQuery(list, query);
  }

  /* =========================================================
     TARJETAS
  ========================================================= */
  function businessCardHTML(b, extraClass) {
    const verticalName = verticals.find((v) => v.id === b.vertical)?.name || b.vertical;
    const isApp = extraClass === 'app-card';
    return `
      <article class="${extraClass} reveal" data-id="${b.id}">
        <div class="${isApp ? 'app-card-media' : 'web-card-media'}">
          <img src="${b.image}" alt="${b.name}" loading="lazy" />
          ${b.freeDelivery ? '<span class="badge-free">Envío gratis</span>' : ''}
          <span class="badge-type">${verticalIcons[b.vertical] || ''} ${verticalName}</span>
        </div>
        <div class="${isApp ? 'app-card-body' : 'web-card-body'}">
          <div class="app-card-row">
            <h3 class="app-card-title">${b.name}</h3>
            <span class="rating">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ${b.rating}
            </span>
          </div>
          <div class="app-card-meta">
            <span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${b.time}
            </span>
            <span>${b.priceRange}</span>
            <span>${b.menu.length} productos</span>
          </div>
          <div class="app-card-meta" style="font-size:.72rem;">
            <span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${b.address}
            </span>
          </div>
          <div class="app-card-meta" style="font-size:.72rem;">
            <span title="Horario">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${b.openTime} – ${b.closeTime}
            </span>
            <span title="Contraentrega">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/></svg>
              ${b.acceptsCash ? 'Contraentrega' : 'Solo pago digital'}
            </span>
          </div>
          <div class="app-card-foot">
            <span class="dish"><strong>${formatPrice(b.menu[0].price)}</strong> &middot; ${b.menu[0].name}</span>
            <span class="view-btn">Ver productos</span>
          </div>
        </div>
      </article>
    `;
  }

  function bindBusinessCards(container) {
    if (!container) return;
    container.querySelectorAll('.app-card, .web-card').forEach((card) => {
      card.addEventListener('click', () => openBusiness(Number(card.dataset.id)));
    });
  }

  /* =========================================================
     RENDER HOME APP
  ========================================================= */
  function renderAppChips() {
    const el = $('appChips');
    if (!el) return;
    
    // Ocultar los chips si no estamos en la vertical de comida
    if (activeVertical !== 'food' && activeVertical !== 'all') {
      el.style.display = 'none';
      return;
    } else {
      el.style.display = 'flex';
    }

    el.innerHTML = foodCategories
      .map((c) => `<button class="chip ${c.id === activeCategory ? 'active' : ''}" data-id="${c.id}" role="tab" aria-selected="${c.id === activeCategory}">${c.name}</button>`)
      .join('');
    el.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        activeCategory = chip.dataset.id;
        renderAppChips(); renderAppList(); renderWebSidebar(); renderWebGrid();
      });
    });
  }

  function renderAppList() {
    const list = getHomeList(appQuery);
    const countEl = $('appResultsCount');
    const listEl = $('appList');
    if (!listEl) return;
    if (countEl) countEl.textContent = `${list.length} resultado${list.length !== 1 ? 's' : ''}`;

    if (list.length === 0) {
      listEl.innerHTML = `<div class="empty"><strong>Sin resultados</strong>Intenta con otra categoría o término.</div>`;
      return;
    }

    listEl.innerHTML = list.map((b) => businessCardHTML(b, 'app-card')).join('');
    bindBusinessCards(listEl);
    observeReveals();
  }

  /* =========================================================
     RENDER HOME WEB
  ========================================================= */
  function renderWebSidebar() {
    const el = $('webSideCats');
    if (!el) return;
    
    // Ocultar sidebar si no estamos en comida
    if (activeVertical !== 'food' && activeVertical !== 'all') {
      el.style.display = 'none';
      return;
    } else {
      el.style.display = 'block';
    }

    el.innerHTML = foodCategories
      .map((c) => `<button class="side-item ${c.id === activeCategory ? 'active' : ''}" data-id="${c.id}">${verticalIcons.all}${c.name}</button>`)
      .join('') + `<div class="side-divider"></div>`;
    el.querySelectorAll('.side-item').forEach((item) => {
      item.addEventListener('click', () => {
        activeCategory = item.dataset.id;
        renderWebSidebar(); renderWebGrid(); renderAppChips(); renderAppList();
      });
    });
  }

  function renderWebGrid() {
    const list = getHomeList(webQuery);
    const countEl = $('webResultsCount');
    const gridEl = $('webGrid');
    if (!gridEl) return;
    if (countEl) countEl.textContent = `${list.length} negocio${list.length !== 1 ? 's' : ''}`;

    if (list.length === 0) {
      gridEl.innerHTML = `<div class="empty"><strong>Sin resultados</strong>Intenta con otra categoría o término.</div>`;
      return;
    }

    gridEl.innerHTML = list.map((b) => businessCardHTML(b, 'web-card')).join('');
    bindBusinessCards(gridEl);
    observeReveals();
  }

  /* =========================================================
     VERTICALES RÁPIDAS (home) CON FILTRADO
  ========================================================= */
  function renderQuickVerticals() {
    // Función que construye el HTML de los botones
    const buildHTML = () => verticals.map((v) => `
      <button class="quick-vertical" data-id="${v.id}">
        <div class="quick-vertical-icon">${verticalIcons[v.icon]}</div>
        <span>${v.name}</span>
      </button>
    `).join('');

    const appEl = $('quickVerticalsApp');
    const webEl = $('quickVerticalsWeb');

    if (appEl) appEl.innerHTML = buildHTML();
    if (webEl) webEl.innerHTML = buildHTML();

    // Lógica de click para filtrar
    const bindQuickFilters = (container) => {
      if (!container) return;
      container.querySelectorAll('.quick-vertical').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const verticalId = btn.dataset.id;
          
          // Actualizamos el estado global
          activeVertical = verticalId;
          activeCategory = 'all'; // Reseteamos la categoría de comida

          // Actualizamos el título de la sección
          const titleElApp = document.querySelector('.app-section-head h2');
          const titleElWeb = document.querySelector('.web-grid-head h2');
          const verticalName = verticals.find(v => v.id === verticalId)?.name || 'Todos';
          
          if (titleElApp) titleElApp.textContent = `Negocios de ${verticalName}`;
          if (titleElWeb) titleElWeb.textContent = `Negocios de ${verticalName}`;

          // Refrescamos las listas
          renderAppList();
          renderWebGrid();
          renderAppChips(); 
          renderWebSidebar();

          // Hacemos scroll suave hacia la lista en móviles
          if (document.body.dataset.page === 'inicio' && window.innerWidth < 900) {
            const section = document.querySelector('.app-section');
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    };

    bindQuickFilters(appEl);
    bindQuickFilters(webEl);
  }

  /* =========================================================
     LO MÁS PEDIDO
  ========================================================= */
  function renderTopSelling() {
    const top = businesses
      .filter((b) => b.topSelling)
      .slice(0, 6);

    const buildCard = (b, i) => `
      <div class="top-sell-card" data-id="${b.id}">
        <div class="top-sell-media">
          <img src="${b.image}" alt="${b.name}" loading="lazy" />
          <span class="top-sell-rank">${i + 1}</span>
        </div>
        <div class="top-sell-body">
          <h4>${b.topSelling}</h4>
          <p>${b.name}</p>
          <div class="top-sell-price">${formatPrice(b.menu[0].price)}</div>
        </div>
      </div>
    `;

    const appEl = $('topSellingApp');
    const webEl = $('topSellingWeb');
    if (appEl) appEl.innerHTML = top.map((b, i) => buildCard(b, i)).join('');
    if (webEl) webEl.innerHTML = top.map((b, i) => buildCard(b, i)).join('');

    [appEl, webEl].forEach((el) => {
      if (!el) return;
      el.querySelectorAll('.top-sell-card').forEach((card) => {
        card.addEventListener('click', () => openBusiness(Number(card.dataset.id)));
      });
    });
  }

  /* =========================================================
     EXPLORAR APP
  ========================================================= */
  function renderAppVerticals() {
    const el = $('appVerticals');
    if (!el) return;
    el.innerHTML = verticals
      .map((v) => `
        <button class="app-vertical ${v.id === activeVertical ? 'active' : ''}" data-id="${v.id}">
          <div class="app-vertical-icon">${verticalIcons[v.icon]}</div>
          <h4>${v.name}</h4>
        </button>
      `)
      .join('');
    el.querySelectorAll('.app-vertical').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeVertical = btn.dataset.id;
        renderAppVerticals();
        renderAppExploreList();
      });
    });
  }

  function renderAppExploreList() {
    const list = filterByQuery(getVerticalBusinesses(activeVertical), appExploreQuery);
    const verticalName = verticals.find((v) => v.id === activeVertical)?.name || 'Todos';
    const titleEl = $('appExploreTitle');
    const countEl = $('appExploreCount');
    const listEl = $('appExploreList');
    if (!listEl) return;

    if (titleEl) titleEl.textContent = activeVertical === 'all' ? 'Todos los negocios' : verticalName;
    if (countEl) countEl.textContent = `${list.length} negocio${list.length !== 1 ? 's' : ''}`;

    if (list.length === 0) {
      listEl.innerHTML = `<div class="empty"><strong>Sin resultados</strong>Prueba con otra categoría o término.</div>`;
      return;
    }

    listEl.innerHTML = list.map((b) => businessCardHTML(b, 'app-card')).join('');
    bindBusinessCards(listEl);
    observeReveals();
  }

  /* =========================================================
     EXPLORAR WEB
  ========================================================= */
  function renderWebVerticals() {
    const el = $('webVerticals');
    if (!el) return;
    el.innerHTML = verticals
      .map((v) => {
        const count = getVerticalBusinesses(v.id).length;
        return `
          <button class="vertical-card ${v.id === activeVertical ? 'active' : ''}" data-id="${v.id}">
            <div class="vertical-icon">${verticalIcons[v.icon]}</div>
            <h4>${v.name}</h4>
            <span>${count} negocios</span>
          </button>
        `;
      })
      .join('');
    el.querySelectorAll('.vertical-card').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeVertical = btn.dataset.id;
        renderWebVerticals();
        renderWebExploreGrid();
      });
    });
  }

  function renderWebExploreGrid() {
    const list = filterByQuery(getVerticalBusinesses(activeVertical), webExploreQuery);
    const verticalName = verticals.find((v) => v.id === activeVertical)?.name || 'Todos';
    const titleEl = $('webExploreTitle');
    const countEl = $('webExploreCount');
    const gridEl = $('webExploreGrid');
    if (!gridEl) return;

    if (titleEl) titleEl.textContent = activeVertical === 'all' ? 'Todos los negocios' : verticalName;
    if (countEl) countEl.textContent = `${list.length} negocio${list.length !== 1 ? 's' : ''}`;

    if (list.length === 0) {
      gridEl.innerHTML = `<div class="empty"><strong>Sin resultados</strong>Prueba con otra categoría o término.</div>`;
      return;
    }

    gridEl.innerHTML = list.map((b) => businessCardHTML(b, 'web-card')).join('');
    bindBusinessCards(gridEl);
    observeReveals();
  }

  /* =========================================================
     MODAL NEGOCIO
  ========================================================= */
  function openBusiness(id) {
    const b = businesses.find((x) => x.id === id);
    if (!b) return;

    const modal = $('restaurantModal');
    if (!modal) return;

    $('modalImg').src = b.image;
    $('modalImg').alt = b.name;
    $('modalName').textContent = b.name;
    $('modalRating').innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ${b.rating}`;
    $('modalTime').textContent = b.time;
    $('modalDelivery').textContent = b.freeDelivery ? 'Envío gratis' : `Envío ${formatPrice(b.deliveryCost)}`;
    $('modalAddress').innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> ${b.address}`;
    $('modalMenuTitle').textContent = b.vertical === 'food' ? 'Menú destacado' : 'Productos destacados';

    // Información del negocio (horario, contraentrega, más pedido)
    const infoEl = $('modalBusinessInfo');
    if (infoEl) {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const [oh, om] = b.openTime.split(':').map(Number);
      const [ch, cm] = b.closeTime.split(':').map(Number);
      const openMin = oh * 60 + om;
      const closeMin = ch * 60 + cm;
      const isOpen = closeMin >= openMin
        ? currentMinutes >= openMin && currentMinutes <= closeMin
        : currentMinutes >= openMin || currentMinutes <= closeMin;

      infoEl.innerHTML = `
        <span class="info-chip ${isOpen ? 'open' : 'closed'}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${isOpen ? 'Abierto' : 'Cerrado'} · ${b.openTime}–${b.closeTime}
        </span>
        <span class="info-chip ${b.acceptsCash ? 'cash' : 'no-cash'}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/></svg>
          ${b.acceptsCash ? 'Contraentrega' : 'Solo pago digital'}
        </span>
        <span class="info-chip">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Más pedido: ${b.topSelling}
        </span>
      `;
    }

    $('modalMenu').innerHTML = b.menu.map((m) => `
      <div class="menu-item">
        <img src="${m.image}" alt="${m.name}" loading="lazy" />
        <div class="menu-item-info">
          <h4>${m.name}</h4>
          <p>${m.desc}</p>
          <div class="menu-item-foot">
            <span class="menu-item-price">${formatPrice(m.price)}${m.oldPrice ? `<span class="old">${formatPrice(m.oldPrice)}</span>` : ''}</span>
            <button class="add-item-btn" data-biz="${b.id}" data-item="${m.id}">Agregar</button>
          </div>
        </div>
      </div>
    `).join('');

    $('modalMenu').querySelectorAll('.add-item-btn').forEach((btn) => {
      btn.addEventListener('click', () => addToCart(Number(btn.dataset.biz), Number(btn.dataset.item)));
    });

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeBusiness() {
    const modal = $('restaurantModal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* =========================================================
     CARRITO (localStorage)
  ========================================================= */
  const CART_KEY = 'chuaz_cart';

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      cart = raw ? JSON.parse(raw) : [];
    } catch (e) {
      cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) { /* noop */ }
  }

  function addToCart(bizId, itemId) {
    const b = businesses.find((x) => x.id === bizId);
    if (!b) return;
    const m = b.menu.find((x) => x.id === itemId);
    if (!m) return;

    const key = `${bizId}-${itemId}`;
    const existing = cart.find((i) => i.key === key);
    if (existing) existing.qty += 1;
    else cart.push({
      key, id: itemId, name: m.name, business: b.name, price: m.price,
      image: m.image, qty: 1, deliveryCost: b.deliveryCost
    });

    saveCart();
    updateCart();
    showToast(`${m.name} agregado`);
  }

  function removeFromCart(key) {
    cart = cart.filter((i) => i.key !== key);
    saveCart();
    updateCart();
  }

  function calcTotals() {
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = cart.length === 0 ? 0 : Math.max(...cart.map((i) => i.deliveryCost));
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }

  function updateCart() {
    const count = cart.reduce((s, i) => s + i.qty, 0);

    const appBadge = $('appCartBadge');
    if (appBadge) { appBadge.textContent = count; appBadge.classList.toggle('show', count > 0); }
    const webBadge = $('webCartBadge');
    if (webBadge) { webBadge.textContent = count; webBadge.classList.toggle('show', count > 0); }

    const { subtotal, shipping, total } = calcTotals();

    if ($('subtotalEl')) $('subtotalEl').textContent = formatPrice(subtotal);
    if ($('shippingEl')) $('shippingEl').textContent = shipping === 0 ? 'Gratis' : formatPrice(shipping);
    if ($('totalEl')) $('totalEl').textContent = formatPrice(total);

    if ($('subtotalElWeb')) $('subtotalElWeb').textContent = formatPrice(subtotal);
    if ($('shippingElWeb')) $('shippingElWeb').textContent = shipping === 0 ? 'Gratis' : formatPrice(shipping);
    if ($('totalElWeb')) $('totalElWeb').textContent = formatPrice(total);

    renderCartPageContent();

    const drawerBody = $('drawerBody');
    if (drawerBody) {
      if (cart.length === 0) {
        drawerBody.innerHTML = `
          <div class="drawer-empty">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <p>Tu carrito está vacío</p>
          </div>`;
      } else {
        drawerBody.innerHTML = cart.map((i) => `
          <div class="cart-line">
            <img src="${i.image}" alt="${i.name}" loading="lazy" />
            <div class="cart-line-info">
              <h4>${i.name}</h4>
              <p>${i.business} &middot; x${i.qty}</p>
            </div>
            <span class="cart-line-price">${formatPrice(i.price * i.qty)}</span>
            <button class="remove-btn" data-key="${i.key}" aria-label="Eliminar ${i.name}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
              </svg>
            </button>
          </div>
        `).join('');
        drawerBody.querySelectorAll('.remove-btn').forEach((b) =>
          b.addEventListener('click', () => removeFromCart(b.dataset.key))
        );
      }
    }
  }

  function renderCartPageContent() {
    const renderInto = (el) => {
      if (!el) return;
      if (cart.length === 0) {
        el.innerHTML = 'Tu carrito está vacío. Agrega productos desde los negocios.';
        el.style.color = 'var(--text-3)';
        return;
      }
      el.style.color = 'var(--text)';
      el.style.textAlign = 'left';
      el.innerHTML = cart.map((i) => `
        <div class="cart-line" style="margin-bottom:.85rem;">
          <img src="${i.image}" alt="${i.name}" loading="lazy" />
          <div class="cart-line-info">
            <h4>${i.name}</h4>
            <p>${i.business} &middot; x${i.qty}</p>
          </div>
          <span class="cart-line-price">${formatPrice(i.price * i.qty)}</span>
          <button class="remove-btn" data-key="${i.key}" aria-label="Eliminar ${i.name}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
            </svg>
          </button>
        </div>
      `).join('');
      el.querySelectorAll('.remove-btn').forEach((b) =>
        b.addEventListener('click', () => removeFromCart(b.dataset.key))
      );
    };
    renderInto($('cartPageContent'));
    renderInto($('cartPageContentWeb'));
  }

  /* =========================================================
     DRAWER
  ========================================================= */
  function openDrawer() {
    const drawer = $('drawer');
    if (!drawer) return;
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    const closeBtn = $('drawerClose');
    if (closeBtn) closeBtn.focus();
  }
  function closeDrawer() {
    const drawer = $('drawer');
    if (!drawer) return;
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  function handleCheckout() {
    if (cart.length === 0) { showToast('Tu carrito está vacío'); return; }
    const { total } = calcTotals();
    showToast(`Pedido confirmado por ${formatPrice(total)}`);
    cart = [];
    saveCart();
    updateCart();
    closeDrawer();
  }

  /* =========================================================
     INIT
  ========================================================= */
  function init() {
    loadCart();

    // Carruseles
    renderCarousel('app');
    renderCarousel('web');
    bindCarouselButtons();

    // Drawer listeners
    if ($('drawerOverlay')) $('drawerOverlay').addEventListener('click', closeDrawer);
    if ($('drawerClose')) $('drawerClose').addEventListener('click', closeDrawer);
    if ($('modalOverlay')) $('modalOverlay').addEventListener('click', closeBusiness);
    if ($('modalClose')) $('modalClose').addEventListener('click', closeBusiness);

    // Checkout
    if ($('checkoutBtn')) $('checkoutBtn').addEventListener('click', handleCheckout);
    if ($('checkoutBtnWeb')) $('checkoutBtnWeb').addEventListener('click', handleCheckout);

    // Carrito desde los nav
    document.querySelectorAll('[data-tab="carrito"]').forEach((el) => {
      el.addEventListener('click', (e) => {
        if (document.body.dataset.page === 'carrito') return;
        if (el.id === 'appCartTab' || el.id === 'webCartNav') {
          e.preventDefault();
          openDrawer();
        }
      });
    });

    // Login demo
    ['loginBtnApp', 'loginBtnWeb', 'loginBtnWebMain'].forEach((id) => {
      const btn = $(id);
      if (btn) btn.addEventListener('click', () => showToast('Inicio de sesión próximamente'));
    });
    document.querySelectorAll('.btn-login').forEach((btn) => {
      btn.addEventListener('click', () => showToast('Inicio de sesión próximamente'));
    });

    // Render por página
    const page = document.body.dataset.page;

    if (page === 'inicio') {
      renderAppChips();
      renderAppList();
      renderWebSidebar();
      renderWebGrid();
      renderQuickVerticals();
      renderTopSelling();

      if ($('appSearchBtn')) $('appSearchBtn').addEventListener('click', () => {
        appQuery = $('appSearchInput').value.trim();
        renderAppList();
      });
      if ($('appSearchInput')) $('appSearchInput').addEventListener('input', () => {
        appQuery = $('appSearchInput').value.trim();
        renderAppList();
      });
      if ($('webSearchBtn')) $('webSearchBtn').addEventListener('click', () => {
        webQuery = $('webSearchInput').value.trim();
        renderWebGrid();
      });
      if ($('webSearchInput')) $('webSearchInput').addEventListener('input', () => {
        webQuery = $('webSearchInput').value.trim();
        renderWebGrid();
      });
    }

    if (page === 'explorar') {
      renderAppVerticals();
      renderAppExploreList();
      renderWebVerticals();
      renderWebExploreGrid();

      if ($('appExploreSearchBtn')) $('appExploreSearchBtn').addEventListener('click', () => {
        appExploreQuery = $('appExploreSearchInput').value.trim();
        renderAppExploreList();
      });
      if ($('appExploreSearchInput')) $('appExploreSearchInput').addEventListener('input', () => {
        appExploreQuery = $('appExploreSearchInput').value.trim();
        renderAppExploreList();
      });
      if ($('webExploreSearchBtn')) $('webExploreSearchBtn').addEventListener('click', () => {
        webExploreQuery = $('webExploreSearchInput').value.trim();
        renderWebExploreGrid();
      });
      if ($('webExploreSearchInput')) $('webExploreSearchInput').addEventListener('input', () => {
        webExploreQuery = $('webExploreSearchInput').value.trim();
        renderWebExploreGrid();
      });
    }

    updateCart();

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const drawer = $('drawer');
        if (drawer && drawer.classList.contains('open')) closeDrawer();
        const modal = $('restaurantModal');
        if (modal && modal.classList.contains('open')) closeBusiness();
      }
    });

    observeReveals();
  }

  /* =========================================================
     REVEAL
  ========================================================= */
  let revealObserver;
  function observeReveals() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    }
    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => revealObserver.observe(el));
  }

  /* =========================================================
     ARRANQUE
  ========================================================= */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();