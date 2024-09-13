import { useEffect, useState } from 'react';
import './Contact.css';
import Contactform from './Contactform';

function Contact() {

   

    useEffect (() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <>
        <section id='contactheadline'>
            <h2>Quack! Wir beißen nicht &ndash; lass uns quatschen!</h2>
        </section>
        <section id='contactdetails' >
            <p>
            📧 <a href="mailto:mrfrog@nofrog-webdesign.de">mrfrog@nofrog-webdesign.de</a> <br />
            📞 <a href="tel: 0049 1512 5679439">0049 1512 5679439</a> <br />
            📍 Tizianstraße 121, 80638 München
            </p>
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d665.3474792201079!2d11.520362999302854!3d48.16056590000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e76478894a791%3A0x557f73d33d99fd1a!2sTizianstra%C3%9Fe%20121%2C%2080638%20M%C3%BCnchen!5e0!3m2!1sde!2sde!4v1725481634454!5m2!1sde!2sde"
            id='iframesmap'
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Embed"
            ></iframe>
        </section>
        <Contactform></Contactform>
        
    </>
  )
}

export default Contact