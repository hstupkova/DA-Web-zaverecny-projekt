import React, { useEffect, useState } from 'react';
import './style.css';
import Button from '../Button';

const About = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sender, setSender] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted && sender !== '' && email !== '' && message !== '') {
      fetch('https://submit-form.com/w8T4R7vf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          sender,
          email,
          message,
        }),
      });
    }
  }, [submitted]);

  return (
    <main className="about">
      <h1 className="heading">O projektu</h1>
      <p className="text">
        Projekt Frontend English má za cíl podpořit studentky{' '}
        <a href="https://www.czechitas.cz/kurzy/digitalni-akademie-web">
          Digitální akademie Czechitas
        </a>
        , které se chtějí stát frontend vývojářkami, na jejich cestě za vysněnou
        prací. Nabízená cvičení pomáhají zlepšit si slovní zásobu a zároveň
        poskytují možnost si i otestovat základní znalosti z UX, HTML, CSS,
        JavaScriptu a Reactu.
      </p>
      <p className="text">
        Tato webová aplikace vznikla jako závěrečný projekt studentek jarního
        běhu Digitální akademie WEB v roce 2021 pod dohledem mentora Petra
        Heraleckého. Zvukové záznamy byly vytvořeny ve spolupráci s Nadeemem
        Meghji. Bližší informace o Czechitas naleznete na jejich stránkách{' '}
        <a href="https://www.czechitas.cz/">zde</a>.
      </p>
      <h2 className="subheading">Eva Jánošková</h2>
      <p className="text">
        Webovou aplikací na osvojení anglických slovíček propojuji své dva
        zájmy. Na kurzech Czechitas se ráda vzdělávám v oblasti IT. Zároveň můj
        velký koníček je i studium cizích jazyků, jež mě momentálně živí a
        jejichž znalost ve svém volném čase s radostí předávám dál.
      </p>
      <p className="text">
        Vzhledem k tomu, že nás COVID-19 uvěznil v našich domovech, jsem
        nesmírně vděčná, že si toto období mohu zpříjemnit v komunitě Czechitas
        a zároveň se naučit mnoho nového. Věřím, že se tímto projektem přiblížím
        o krok blíž mému snu pracovat v IT a zároveň pomocí této aplikace
        podpořím své spolužačky i v jejich úsílí za vysněnou prací.
      </p>
      <h2 className="subheading">Hana Stupková</h2>
      <p className="text">
        Vystudovala jsem kartografii a geoinformatiku a po škole pracovala v IT
        firmě; nejprve v různých GIS, poté se ze mě stal analytik (což
        zahrnovalo jak práci s datovými modely a zadávání úkolů pro
        programátory, tak třeba i analýzu a psaní dokumentů pro různé úřady ve
        státní správě).
      </p>
      <p className="text">
        Zhruba před rokem a půl jsem objevila Czechitas a covidové období
        využila k rozšiřování si znalostí v oblasti IT (jestli dobře počítám,
        absolvovala jsem už 9 kurzů na různá témata). Zlomem byl kurz Staň se
        kódérkou, kde jsem objevila frontend a to, že mě kódování velmi baví. V
        digitální akademii jsem se chtěla naučit JavaScript a React a jejich
        znalost si vyzkoušet při kódování nějakého pěkného interaktivního
        projektu.
      </p>
      <h2 className="subheading">Chcete nás kontaktovat?</h2>

      {submitted ? (
        <p className="text">Děkujeme za zprávu!</p>
      ) : (
        <>
          <p className="text">
            Vyplňte prosím následující formulář (všechna pole jsou povinná).
          </p>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="hidden"
              name="_feedback.success.title"
              value="Vaše zpráva byla odeslána!"
            />
            <div className="form-field">
              <label htmlFor="name">Jméno</label>
              <input
                type="text"
                id="name"
                name="name"
                required=""
                className="form-field__name"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                required=""
                className="form-field__email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="message">Vzkaz</label>
              <textarea
                id="message"
                name="message"
                required=""
                className="form-field__message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <Button type="submit" page="about">
              Odeslat
            </Button>
          </form>
        </>
      )}
    </main>
  );
};

export default About;
