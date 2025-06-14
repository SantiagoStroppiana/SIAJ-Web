// ========== LOGIN ==========
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let loginInput = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      // ✅ Excepción para cuentas sandbox sin @
      if (!loginInput.includes("@") && loginInput.startsWith("TESTUSER")) {
        // lo dejamos como está
      }

      const email = loginInput;

      const usuarios = [
        { email: "admin@demo.com", pass: "admin123", rol: "admin" },
        { email: "cliente1@demo.com", pass: "cliente123", rol: "cliente", plan: "estandar" },
        { email: "cliente2@demo.com", pass: "cliente123", rol: "cliente", plan: "avanzada" },
        { email: "cliente3@demo.com", pass: "cliente123", rol: "cliente", plan: "premium" },

        // CUENTAS REALES DE PRUEBA SANDBOX
        { email: "TESTUSER1682381616", pass: "3aaglutoka", rol: "admin" },
        { email: "TESTUSER1252951849", pass: "ogWuBDZkUY", rol: "cliente", plan: "premium" }
      ];

      const user = usuarios.find(u => u.email === email && u.pass === password);

      if (user) {
        sessionStorage.setItem("usuario", JSON.stringify(user));
        localStorage.setItem("email", user.email);
        localStorage.setItem("rol", user.rol);
        localStorage.setItem("plan", user.plan || "");
        window.location.href = user.rol === "admin" ? "admin.html" : "index.html";
      } else {
        alert("Login incorrecto");
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
    if (tipo) {
      tipo.innerText = usuario.plan || "Sin plan";
      tipo.classList.remove("plan-estandar", "plan-avanzada", "plan-premium");
      switch (usuario.plan) {
        case "estandar": tipo.classList.add("plan-estandar"); break;
        case "avanzada": tipo.classList.add("plan-avanzada"); break;
        case "premium": tipo.classList.add("plan-premium"); break;
      }
    }

    if (panel) {
      switch (usuario.plan) {
        case "estandar": panel.style.backgroundColor = "#E3F2FD"; break;
        case "avanzada": panel.style.backgroundColor = "#FFF3E0"; break;
        case "premium": panel.style.backgroundColor = "#F3E5F5"; break;
      }
    }
  }

  // ========== MERCADOPAGO ==========
  const mpKey = "TEST-APP_USR-81e69534-157a-4083-901e-499484e16f49";

  function esperarMercadoPago(callback) {
    const intervalo = setInterval(() => {
      if (typeof MercadoPago !== "undefined") {
        clearInterval(intervalo);
        callback();
      }
    }, 100);
  }

  esperarMercadoPago(() => {
    const mp = new MercadoPago(mpKey, { locale: "es-AR" });

    ["std", "adv", "prem"].forEach(tipo => {
      const btn = document.getElementById(`pay-${tipo}`);
      if (btn) {
        btn.addEventListener("click", async () => {
          const plan = tipo === "std" ? "estandar" : tipo === "adv" ? "avanzada" : "premium";
          const prefId = await getPreference(plan);
          window.location.href = `pago.html?preferenceId=${prefId}`;
        });
      }
    });
  });

  async function getPreference(tipo) {
    const email = localStorage.getItem("email") || "sin_email@demo.com";
    const res = await fetch(`crear_preferencia.php?tipo=${tipo}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    return data.id;
  }

  // ========== HEADER LOGIN/LOGOUT ==========
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("rol");
  const dropdown = document.getElementById("userDropdown");

  if (email && dropdown) {
    dropdown.innerHTML = `
      <button id="userToggle" class="user-btn">👤 Bienvenido ${email} ▾</button>
      <div class="dropdown-content" id="dropdownMenu">
        <p>Rol: ${role}</p>
        <a href="${role === 'admin' ? 'admin.html' : 'dashboard_cliente.html'}">Ir al dashboard</a>
        <button id="logoutBtn">Cerrar sesión</button>
      </div>
    `;

    document.getElementById("userToggle").addEventListener("click", () => {
      dropdown.classList.toggle("show");
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "login.html";
    });
  }

  // ========== PROTECCIÓN index.html SOLO CLIENTES ==========
  const path = window.location.pathname;
  if (path.includes("index.html")) {
    if (!email || role !== "cliente") {
      window.location.href = "login.html";
    }
  }

  // ========== Mostrar productos solo si es cliente ==========
  const productosLink = document.querySelector(".productos-link");
  if (productosLink && role === "cliente") {
    productosLink.style.display = "inline-block";
  }

  // ========== AOS INIT ==========
  if (typeof AOS !== "undefined") AOS.init();
});

// ========== ADMIN - Mostrar compras ==========
if (window.location.pathname.includes("admin.html")) {
  const rol = localStorage.getItem("rol");
  if (rol !== "admin") {
    window.location.href = "login.html";
  } else {
    fetch("compras.json")
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar compras.json");
        return res.json();
      })
      .then(data => {
        console.log("Compras cargadas:", data);
        const tabla = document.getElementById("tablaCompras");
        const total = document.getElementById("totalMonto");
        let sum = 0;

        data.forEach(c => {
          const fila = document.createElement("tr");
          fila.innerHTML = `
            <td>${c.email}</td>
            <td>${c.pack}</td>
            <td>${new Date(c.fecha).toLocaleString()}</td>
            <td>$${c.monto}</td>
          `;
          tabla.appendChild(fila);
          sum += c.monto;
        });

        total.textContent = `$${sum}`;
      })
      .catch(err => {
        console.error("Error al cargar compras:", err);
        document.getElementById("tablaCompras").innerHTML = "<tr><td colspan='4'>Error al cargar compras.json</td></tr>";
      });
  }
}
