# 💀 NOCTHARIS — Portfólio Profissional

> *"Todo sistema tem uma falha. Todo erro é uma oportunidade. E todo conhecimento oculto pode ser revelado."*

---

## 🧠 Sobre o Projeto

Portfólio pessoal de **Noctharis**, especialista em hacking ético, segurança ofensiva e desenvolvimento de software. O site possui tema **dark/hacker** com efeitos de terminal, chuva Matrix, glitch e partículas — construído em HTML puro, CSS e JavaScript sem frameworks.

---

## ✅ Funcionalidades Implementadas

### 🎨 Visual & UX
- [x] Tema dark com verde néon (`#00ff41`) e fundo preto (`#0a0a0a`)
- [x] **Chuva Matrix** animada em canvas (background)
- [x] **Efeito de scanlines** e ruído de tela analógica
- [x] **Cursor personalizado** com anel seguidor
- [x] **Efeito Glitch** no nome MALACHAI'S
- [x] **Partículas** ao clicar em qualquer lugar da tela
- [x] Scroll suave entre seções
- [x] **Scroll reveal** com animações de entrada
- [x] Design **totalmente responsivo** (mobile, tablet, desktop)

### 📐 Seções
- [x] **Hero** — Terminal animado com output de whoami, typewriter de cargos, nome com glitch
- [x] **Sobre** — Biografia completa, avatar com anéis pulsantes, scanner, especialidades
- [x] **Habilidades** — Barras de progresso animadas (JavaScript, Python, HTML, CSS, Linux, Pentest, etc.)
- [x] **Ferramentas** — Badges de ferramentas (Metasploit, Nmap, Burp Suite, Wireshark, etc.)
- [x] **Serviços** — 6 cards de serviços com destaque em popular
- [x] **Redes Sociais** — Cards com placeholders para links reais
- [x] **Pedido de Serviço** — Formulário funcional com validação e armazenamento
- [x] **Footer** — Logo, links, contato, status operacional

### ⚙️ Funcionalidades Técnicas
- [x] **Navbar responsiva** com hamburger menu mobile
- [x] **Navbar ativa** conforme scroll (highlight automático)
- [x] **Back to Top** button
- [x] Formulário com **validação client-side**
- [x] Formulário com **envio para API** (`tables/service_requests`)
- [x] **Feedback visual** após envio (sucesso/erro)
- [x] Contador de caracteres no campo de descrição
- [x] **Easter Egg** — Código Konami (↑↑↓↓←→←→BA)
- [x] Hex timestamp animado no footer

---

## 🌐 Caminhos e URIs

| Página | Caminho |
|--------|---------|
| Principal | `/index.html` |
| Estilos | `/css/style.css` |
| JavaScript | `/js/main.js` |

### Âncoras (Single Page)
| Seção | Âncora |
|-------|--------|
| Home/Hero | `#home` |
| Sobre | `#sobre` |
| Habilidades | `#habilidades` |
| Serviços | `#servicos` |
| Redes Sociais | `#redes` |
| Pedido de Serviço | `#pedido` |

### API de Dados
| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `tables/service_requests` | `POST` | Criar pedido de serviço |
| `tables/service_requests` | `GET` | Listar pedidos |
| `tables/service_requests/{id}` | `PATCH` | Atualizar status do pedido |
| `tables/service_requests/{id}` | `DELETE` | Deletar pedido |

---

## 📊 Modelo de Dados

### Tabela: `service_requests`

| Campo | Tipo | Opções |
|-------|------|--------|
| `id` | text | — |
| `clientName` | text | — |
| `clientEmail` | text | — |
| `serviceType` | text | pentest, vulnerabilidades, scripts, web, redes, lab, outro |
| `urgency` | text | baixa, media, alta |
| `description` | rich_text | — |
| `budget` | text | — |
| `status` | text | pendente, em_andamento, concluido, cancelado |
| `createdAt` | datetime | — |

---

## 🔧 Como Personalizar

### 1. Adicionar links das redes sociais
No `index.html`, localize a seção `#redes` e altere o atributo `href` dos cards:
```html
<a href="https://github.com/SEU_USUARIO" class="social-card" id="social-github" target="_blank">
```

### 2. Adicionar e-mail de contato
Substitua `seuemail@gmail.com` nos dois locais do `index.html`:
- `id="contactEmail"` (seção de pedido)
- `id="footerEmail"` (rodapé)

### 3. Foto de perfil
Quando tiver uma foto, substitua o ícone de avatar no `index.html`:
```html
<!-- Substitua o bloco .avatar-icon por: -->
<img src="images/noctharis.jpg" alt="Noctharis" class="avatar-photo"/>
```

---

## 🚀 Próximas Etapas Recomendadas

- [ ] **Painel de administração** — visualizar e gerenciar pedidos recebidos
- [ ] **Seção de Projetos/Portfólio** — exibir projetos e ferramentas criadas
- [ ] **Blog técnico** — posts sobre pentest, writeups de CTF
- [ ] **Certificações** — exibir certs (CEH, OSCP, CompTIA, etc.)
- [ ] **Integração com e-mail** — notificação automática ao receber pedido
- [ ] **Página 404 customizada** com tema hacker

---

## 🛠 Tecnologias Utilizadas

- **HTML5** — Estrutura semântica
- **CSS3** — Animações, gradientes, Grid e Flexbox
- **JavaScript Vanilla** — Efeitos, TypeWriter, Matrix Canvas, Form API
- **Font Awesome 6** (CDN) — Ícones
- **Google Fonts** — Share Tech Mono, Orbitron, Rajdhani
- **Table API REST** — Persistência de pedidos de serviço

---

*© 2026 MALACHAI'S — Cripta do Caos. Todos os direitos reservados.*
