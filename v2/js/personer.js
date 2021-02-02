// view
function visPersoner() {
  document.getElementById('innhold').innerHTML = '';
  let html = '';
  html = `<table>
                <tr>
                  <td><input type="checkbox"
                             onclick="velgAlleEllerIngen(this.checked)"
                             ${lagHtmlChecked(model.personer.velgAlle)}/></td>
                  <td><b>Personer</b></td>
                  <td>
                    <!--<button class="litenKnapp" onclick="redigerPersoner()">✎</button>-->
                  </td>
                </tr>`;
  for (let person of model.personer.liste) {
    html += `<tr>
                <td><input type="checkbox"
                           onclick="velgPerson('${person.id}')" 
                           ${lagHtmlChecked(person.erValgt)}"/></td>
                <td>${person.navn}</td>
                <td><button class="litenKnapp"  onclick="slettPerson('${person.id}')">x</button></td>
              </tr>`;
  }
  html += `<tr>
              <td></td>
              <td colspan="3">
                <input size="6" type="text" id="nyPerson"/>
                <button class="litenKnapp" onclick="leggTilPerson()">legg til person</button>
              </td>
           </tr>
           <tr><td>&nbsp;</td></tr>
           <tr>
              <td colspan="3">
                <button class="knapp" onclick="trekk()">Trekk!</button>
                <input type="number" size="1" value="${model.personer.trekkAntall}" onchange="model.personer.trekkAntall = parseInt(this.value)"/>
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
  visPersoner();
}

function leggTilPerson() {
  const navn = document.getElementById('nyPerson').value;
  db.collection('personer').add({
    navn: navn,
    erValgt: false,
  })
  drawModel();

}

function velgPerson(id) {
  for (personer of model.personer.liste) {
    if (personer.id == id) {
      if (personer.erValgt == true) {
        console.log(id)
        db.collection('personer').doc(id).update({
          erValgt: false
        })
      } else {
        db.collection('personer').doc(id).update({
          erValgt: true
        })
      }
      
      
    }
  }
  drawModel()
}

function slettPerson(id) {
  db.collection('personer').doc(id).delete();
  drawModel();
}


function trekk() {
  
  let antall = model.personer.trekkAntall;
  console.log(antall)
  const personerListe = model.personer.liste.filter(p => p.erValgt);
  const indekser = Array.from(personerListe.keys());
  const vinnere = [];
  while (antall-- > 0 && indekser.length > 0) {
    const tilfeldigIndeks = Math.floor(Math.random() * indekser.length);
    const indeks = indekser.splice(tilfeldigIndeks, 1);
    vinnere.push(personerListe[indeks].navn);
  }
  db.collection('trekninger').add({
    vinnere: vinnere,
    tid: new Date(),
    deltakere: personerListe.map(p => p.navn)
  })
  drawModelDraws()
  visTrekninger()
}


function justerAntall(delta) {
  model.personer.trekkAntall =
    Math.max(1, model.personer.trekkAntall + delta);
  visPersoner();
}

function finnPerson(id) {
  return model.personer.liste.filter(p => p.id === id)[0];
}