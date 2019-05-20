<template>
  <div class="innhold" id="innhold">
    <table>
      <tr>
        <td>
          <input type="checkbox" v-model="velgAlle" @click="velgAlleEllerIngen">
        </td>
        <td>
          <b>Personer</b>
        </td>
        <td></td>
      </tr>
      <tr v-for="person in liste">
        <td>
          <input type="checkbox" v-model="person.erValgt">
        </td>
        <td>{{person.navn}}</td>
        <td>
          <button class="litenKnapp" @click="slettPerson(person.id)">x</button>
        </td>
      </tr>
      <tr>
        <td></td>
        <td colspan="3">
          <input size="6" type="text" v-model="nyPerson">
          <button class="litenKnapp" @click="leggTilPerson">legg til person</button>
        </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td colspan="3">
          <button class="knapp" @click="trekk">Trekk!</button>
          <input type="number" size="1" v-model="trekkAntall">
          <button class @click="trekkAntall++">▲</button>
          <button class @click="trekkAntall = Math.max(1,personer.trekkAntall -1)">▼</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "PersonListe",
  data() {
    return {
      nyPerson: "",
      velgAlle: false,
      trekkAntall: 1,
      liste: []
    };
  },
  props: ["personerProp"],
  created: function() {
    this.liste.push(...this.personerProp);
  },
  methods: {
    velgAlleEllerIngen: function() {
      let verdi = !this.velgAlle;
      for (let person of this.liste) {
        person.erValgt = verdi;
      }
    },
    slettPerson: function(id) {
      let index = this.liste.findIndex(p => p.id === id);
      if (index == -1) return;
      this.liste.splice(index, 1);
      this.$emit("oppdatert-personliste", this.liste);
    },
    leggTilPerson: function() {
      const id =
        this.liste
          .map(p => p.id)
          .reduce((max, value) => Math.max(max, value), -1) + 1;
      this.liste.push({ id: id, navn: this.nyPerson, erValgt: true });
      this.nyPerson = "";
      this.$emit("oppdatert-personliste", this.liste);
    },
    trekk: function() {
      this.$emit("trekk", this.trekkAntall);
    }
  }
};
</script>

<style scoped>
</style>