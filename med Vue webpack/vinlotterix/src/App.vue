<template>
  <div id="app">
    <div class="page" :class="showMenu ? '' : 'pageUtenMeny'" id="page">
      <div class="header" id="header">
        <button @click="visOgSkjulMeny" class="knapp">☰</button> Vinlotterix 🍷
      </div>
      <router-view class="innhold"/>
      <div v-if="showMenu" class="meny" id="meny">
        <button class="knapp fixed" @click="currentPage = 'personer'">Personer</button>
        <br>
        <button class="knapp fixed" @click="currentPage = 'trekninger'">Trekninger</button>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      showMenu: true,
      currentPage: "personer",
      personer: [
        { id: 100, navn: "Per", erValgt: true },
        { id: 101, navn: "Pål", erValgt: true },
        { id: 102, navn: "Espen", erValgt: false },
        { id: 103, navn: "Ole", erValgt: true }
      ],
      trekninger: [
        {
          vinnere: ["Ole"],
          tid: "2018-10-17 17:10",
          deltakere: ["Per", "Pål", "Ole"]
        },
        {
          vinnere: ["Per", "Pål", "Knut"],
          tid: "2018-10-11 17:10",
          deltakere: ["Per", "Pål", "Ole", "Knut", "Gunnar"]
        }
      ]
    };
  },
  methods: {
    visOgSkjulMeny: function() {
      this.showMenu = !this.showMenu;
    },
    lagDatoTekstForLagring: function(dato) {
      return dato
        .toISOString()
        .substr(0, 16)
        .replace("T", " ");
    },
    lagDatoTekstNåForLagring: function() {
      return this.lagDatoTekstForLagring(new Date());
    },
    trekk: function(antall) {
      const personerListe = this.personer.filter(p => p.erValgt);
      const indekser = Array.from(personerListe.keys());
      const vinnere = [];
      while (antall-- > 0 && indekser.length > 0) {
        const tilfeldigIndeks = Math.floor(Math.random() * indekser.length);
        const indeks = indekser.splice(tilfeldigIndeks, 1);
        vinnere.push(personerListe[indeks].navn);
      }
      this.trekninger.unshift({
        vinnere: vinnere,
        tid: this.lagDatoTekstNåForLagring(),
        deltakere: personerListe.map(p => p.navn)
      });
      this.currentPage = "trekninger";
    },
    oppdaterPersoner: function(personer) {
      this.personer.length = 0;
      this.personer.push(...personer);
    }
  }
};
</script>

<style src="@/assets/vinlotterix.css">
</style>
