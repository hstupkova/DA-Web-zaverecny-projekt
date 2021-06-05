import React from 'react';
import './style.css';

import Activity from '../Activity';
import { activities } from './activities.js';

const Home = () => (
  <main className="home">
    <h1 className="heading">Frontend English</h1>

    <section className="introduction">
      <div className="introduction__picture-wrapper">
        <img
          className="introduction__picture"
          src="./assets/programmer.svg"
          alt="programmer"
        />
      </div>
      <p className="introduction__text">
        Uvažuješ nad prací frontendisty a obáváš se práce v mezinárodním týmu kvůli angličtině? Lámeš si při čtení dokumentace hlavu nad anglickou terminologií? Věříme, že zde najdeš pomoc při studiu odborných anglických slovíček. Stačí si vybrat, kterou aktivitou si přeješ začít.
      </p>
    </section>

    <section className="activities">
      <h2 className="subheading">Aktivity</h2>

      <div className="activities__list">
        {
          activities.map(item => { return (
              <div className="activities__list-item" key={item.id}>
                <Activity
                  name={item.name}
                  text={item.text}
                  path={item.path}
                  image={item.image} />
              </div> )})
        }
      </div>
    </section>


  </main>
);

export default Home;