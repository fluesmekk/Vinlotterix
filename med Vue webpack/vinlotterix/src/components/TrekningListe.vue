<template>
  <div class="innhold" id="innhold">
    <p v-for="(trekning, i) in trekninger">
      <small>
        {{dagsNavn[new Date(trekning.tid).getDay()]}}
        {{lagDatoTekstForVisning(new Date(trekning.tid))}}
      </small>
      <br>
      <b :class="'førsteTrekning' + i ">
        {{trekning.vinnere.length === 1 ? 'Vinneren' : 'Vinnerne'}}
        er {{lagTekstListe(trekning.vinnere)}}!
      </b>
      <br>
      <small>
        Trukket fra totalt {{trekning.deltakere.length}} personer:
        {{lagTekstListe(trekning.deltakere)}}
      </small>
    </p>
  </div>
</template>

<script>
export default {
  name: "TrekningListe",
  data() {
    return {
      props: ["trekningerProp"],
      data: function() {
        return {
          trekninger: [],
          dagsNavn: [
            "søndag",
            "mandag",
            "tirsdag",
            "onsdag",
            "torsdag",
            "fredag",
            "lørdag"
          ]
        };
      },
      created: function() {
        this.trekninger.push(...this.trekningerProp);
      },
      methods: {
        lagDatoTekstForVisning: function(dato) {
          return dato
            .toLocaleString()
            .replace(",", "")
            .substr(0, 15);
        },
        lagTekstListe: function(liste) {
          if (liste.length === 0) return "";
          if (liste.length === 1) return liste[0];

          const tekstListe = liste.join(", ");
          const indexSisteKomma = tekstListe.lastIndexOf(",");
          return (
            tekstListe.substr(0, indexSisteKomma) +
            " og " +
            tekstListe.substr(indexSisteKomma + 1)
          );
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
