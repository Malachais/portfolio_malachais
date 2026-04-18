require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// 🔐 CORS (somente seu site)
app.use(cors({
  origin: "https://malachais.github.io"
}));

app.use(express.json());

// 📩 Configuração de email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 🚀 Rota principal
app.post("/contato", async (req, res) => {
  try {
    const { nome, email, mensagem } = req.body;

    // 🔍 Validação
    if (!nome || !email || !mensagem) {
      return res.status(400).json({ erro: "Preencha todos os campos." });
    }

    if (mensagem.length > 1000) {
      return res.status(400).json({ erro: "Mensagem muito longa." });
    }

    // 📧 Email
    const mailOptions = {
      from: `"Portfólio Malachai's" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `💼 Novo pedido de ${nome}`,
      text: `
Nome: ${nome}
Email: ${email}

Mensagem:
${mensagem}
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      sucesso: true,
      mensagem: "Mensagem enviada com sucesso!"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: "Erro interno no servidor."
    });
  }
});

// 🔥 Porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});