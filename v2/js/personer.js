// view
function visPersoner() {
  let html = `<table>
                <tr>
                  <td><input type="checkbox"
                             onclick="velgAlleEllerIngen(this.checked)"
                             ${lagHtmlChecked(model.personer.velgAlle)}/></td>
                  <td>Personer</td>
                  <td>
                    <button class="litenKnapp" onclick="leggTilPerson()">+</button>
                    <button class="litenKnapp" onclick="redigerPersoner()">✎</button>
                  </td>
                </tr>`;
  for (let person of model.personer.liste) {
    html += `<tr>
                <td><input type="checkbox"
                           onclick="velgPerson(${person.id})" 
                           ${lagHtmlChecked(person.erValgt)}"/></td>
                <td>${person.navn}</td>
                <td><button class="litenKnapp"  onclick="slettPerson(${person.id})">x</button></td>
              </tr>`;
  }
  html += `<tr>
              <td colspan="3">
                <button class="knapp" onclick="trekk()">Trekk!</button>
                <input type="text" size="1" value="1"/>
                <button class="" onclick="justerAntall(1)">▲</button>
                <button class="" onclick="justerAntall(-1)">▼</button>
              </td>
            </tr>
          </table>`;
  document.getElementById('innhold').innerHTML = html;
}

function lagHtmlChecked(valgt) {
  return valgt ? 'checked="checked"' : '';
}

// controller
function velgAlleEllerIngen(alle) {
  model.personer.velgAlle = alle;
  for (let person of model.personer.liste) {
    person.erValgt = alle;
  }
  console.log(alle);
  console.log(model.personer);
  visPersoner();
}

function leggTilPerson() {

}

function redigerPersoner() {

}

function velgPerson(id) {

}

function slettPerson(id) {

}

function trekk() {

}

function justerAntall(delta) {

}