// ========== LOGIN ==========
const form = document.getElementById("loginForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const usuarios = [
      { email: "admin@empresa.com", pass: "admin123", rol: "admin", plan: "admin" },
      { email: "cliente1@demo.com", pass: "cliente123", rol: "cliente", plan: "estandar" },
      { email: "cliente2@demo.com", pass: "cliente123", rol: "cliente", plan: "avanzada" },
      { email: "cliente3@demo.com", pass: "cliente123", rol: "cliente", plan: "premium" }
    ];

    const user = usuarios.find(u => u.email === email && u.pass === password);

    if (user) {
      sessionStorage.setItem("usuario", JSON.stringify(user));
      localStorage.setItem("email", user.email);
      localStorage.setItem("rol", user.rol);
      localStorage.setItem("plan", user.plan);

      if (user.rol === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "dashboard_cliente.html";
      }
    } else {
      document.getElementById("loginError").style.display = "block";
    }
  });
}

// ========== PANEL DE USUARIO ==========
const usuario = JSON.parse(sessionStorage.getItem("usuario"));
if (usuario) {
  const nombre = document.getElementById("nombreUsuario");
  const tipo = document.getElementById("tipoPlan");
  const panel = document.getElementById("panelUsuario");

  if (nombre) nombre.innerText = usuario.email || "Invitado";
  if (tipo) tipo.innerText = usuario.plan || "Sin plan";

  if (panel) {
    switch (usuario.plan) {
      case "estandar":
        panel.style.backgroundColor = "#E3F2FD"; break;
      case "avanzada":
        panel.style.backgroundColor = "#FFF3E0"; break;
      case "premium":
        panel.style.backgroundColor = "#F3E5F5"; break;
    }
  }
}

// ========== MERCADOPAGO SANDBOX ==========
const mp = new MercadoPago('APP_USR-81e69534-157a-4083-901e-499484e16f49', { locale: 'es-AR' });

async function getPreference(tipo) {
  const email = localStorage.getItem("email") || "sin_email@demo.com";

  const res = await fetch(`crear_preferencia.php?tipo=${tipo}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  const data = await res.json();
  return data.id;
}

async function redirectToCheckout(prefId) {
  try {
    await mp.checkout({
      preference: {
        id: prefId
      },
      autoOpen: true
    });
  } catch (err) {
    console.error("Error en redirección a MercadoPago:", err);
  }
}

// Botones de compra
const btnStd = document.getElementById("pay-std");
const btnAdv = document.getElementById("pay-adv");
const btnPrem = document.getElementById("pay-prem");

if (btnStd) btnStd.addEventListener("click", async () => {
  const prefId = await getPreference("estandar");
  redirectToCheckout(prefId);
});
if (btnAdv) btnAdv.addEventListener("click", async () => {
  const prefId = await getPreference("avanzada");
  redirectToCheckout(prefId);
});
if (btnPrem) btnPrem.addEventListener("click", async () => {
  const prefId = await getPreference("premium");
  redirectToCheckout(prefId);
});

// ========== CARRUSEL SWIPER ==========
if (document.querySelector('.metasSwiper')) {
  new Swiper('.metasSwiper', {
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
  });
}
if (document.querySelector('.testimoniosSwiper')) {
  new Swiper('.testimoniosSwiper', {
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    autoplay: { delay: 5000, disableOnInteraction: false }
  });
}

// ========== AOS ==========
if (typeof AOS !== 'undefined') AOS.init();

// ========== PDF ==========
if (document.getElementById("pdf-render")) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
  const url = 'ejemploArmado.pdf';
  let pdfDoc = null, pageNum = 1;
  const canvas = document.getElementById("pdf-render"),
        ctx = canvas.getContext("2d");

  pdfjsLib.getDocument(url).promise.then(doc => {
    pdfDoc = doc;
    document.getElementById("page-count").textContent = doc.numPages;
    renderPage(pageNum);
  });

  function renderPage(num) {
    pdfDoc.getPage(num).then(page => {
      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext = { canvasContext: ctx, viewport };
      page.render(renderContext);
      document.getElementById("page-num").textContent = num;
    });
  }

  document.getElementById("prev-page").addEventListener("click", () => {
    if (pageNum > 1) {
      pageNum--;
      renderPage(pageNum);
    }
  });

  document.getElementById("next-page").addEventListener("click", () => {
    if (pageNum < pdfDoc.numPages) {
      pageNum++;
      renderPage(pageNum);
    }
  });

  const toggleBtn = document.getElementById("toggle-pdf");
  const pdfContainer = document.getElementById("pdf-container");
  toggleBtn.addEventListener("click", () => {
    pdfContainer.classList.toggle("pdf-hidden");
    toggleBtn.classList.toggle("rotado");
  });
}
