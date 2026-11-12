const nodemailer=require('nodemailer');

const sendEmail=async (options)=>{
    const transport={
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:false,
        requireTLS:true,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS,
        }
    };

    console.log('SMTP Config:', {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        passLength: process.env.SMTP_PASS?.length,
        secure: false,
        requireTLS: true
    });

   const transporter= nodemailer.createTransport(transport);

   const message={
      from:`${process.env.SMTP_FROM_NAME}<${process.env.SMTP_FROM_EMAIL}>`,
      to:options.email,
      subject:options.subject,
      text:options.message
   }

  try{
    return await transporter.sendMail(message);
  }catch(error){
    console.error('Email sending error:',error.message);
    throw error;
  }

}

module.exports=sendEmail;