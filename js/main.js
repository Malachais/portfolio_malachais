const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const backToTop = document.getElementById("backToTop");
const contactForm = document.getElementById("contact-form");
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navAnchors.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === `#${current}`) {
      link.classList.add("active");
    }
  });
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    const btn = contactForm.querySelector("button");
    btn.textContent = "Enviando...";
    btn.disabled = true;

    try {
      const resposta = await fetch("https://malachais-backend.onrender.com/contato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email, mensagem })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        btn.textContent = "Erro ❌";
        alert(dados.erro || "Erro ao enviar");
        btn.disabled = false;
        return;
      }

      btn.textContent = "Enviado ✔";
      contactForm.reset();

    } catch (error) {
      btn.textContent = "Erro ❌";
      alert("Erro ao conectar com o servidor");
      btn.disabled = false;
    }
  });
}

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.15
});

reveals.forEach((item) => observer.observe(item));