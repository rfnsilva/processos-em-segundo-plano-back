import Mail from '../lib/Mail';

export default {
  key: 'EmailRegister',
  async handle({ data }) {
    const { user } = data;
    
    try {
      await Mail.sendMail({
        from: 'administrador <dc1d1eeef9-eb0505@inbox.mailtrap.io>',
        to: user.email,
        subject: "teste envio de email",
        html: `<p>ola sucesso ao enviar email teste</p>`
      })
    } catch (error) {
      console.log(error)
    }
  }
}