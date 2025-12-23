const nodemailer = require('nodemailer');

export default async (req, res) => {
  // Permitir apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { nomeCompleto, email, telefone, servicoInteresse, mensagem } = req.body;

  // Validação básica
  if (!nomeCompleto || !email || !mensagem) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email para ti (recepção) semore faça
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'cmtecnologia12@gmail.com',
      subject: `🎯 Novo Contacto - ${nomeCompleto}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h2 style="color: #7c3aed; border-bottom: 3px solid #7c3aed; padding-bottom: 10px;">📬 Novo Formulário Recebido</h2>
          
          <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>👤 Nome:</strong> ${nomeCompleto}</p>
            <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>📱 Telefone:</strong> ${telefone || 'Não fornecido'}</p>
            <p><strong>🔧 Serviço de Interesse:</strong> ${servicoInteresse || 'Não especificado'}</p>
          </div>

          <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #7c3aed;">💬 Mensagem:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${mensagem}</p>
          </div>

          <div style="background: #ede9fe; padding: 10px; border-left: 4px solid #7c3aed; margin: 15px 0;">
            <p><small>⏰ Recebido em: ${new Date().toLocaleString('pt-PT')}</small></p>
          </div>
        </div>
      `,
      replyTo: email,
    });

    // Email de confirmação para o cliente
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '✅ Recebemos a tua Mensagem - C&M Tecnologia',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h2 style="color: #7c3aed;">Obrigado, ${nomeCompleto}! ✨</h2>
          
          <p>Recebemos a tua mensagem com sucesso!</p>
          
          <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p>Entraremos em contacto assim que possível através do email <strong>${email}</strong> ou pelo telefone <strong>${telefone || 'fornecido no formulário'}</strong>.</p>
            
            <p style="margin-top: 20px;">
              <strong>Dados da tua solicitação:</strong><br>
              Serviço: ${servicoInteresse || 'Não especificado'}
            </p>
          </div>

          <div style="background: #ede9fe; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>📞 C&M Tecnologia</strong><br>
            Telefone: +351 961 227 666<br>
            Email: cmtecnologia12@gmail.com</p>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 30px; text-align: center;">
            Este é um email automático. Não é necessário responder.
          </p>
        </div>
      `,
    });

    res.status(200).json({ 
      success: true, 
      message: 'Email enviado com sucesso! Entraremos em contacto brevemente.' 
    });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ 
      error: 'Erro ao enviar email. Tenta novamente mais tarde.',
      details: error.message 
    });
  }
};
