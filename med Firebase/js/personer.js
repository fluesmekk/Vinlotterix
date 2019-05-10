// view
function visPersoner() {
  let html = `<table>
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
                           onclick="velgPerson(${person.id})" 
                           ${lagHtmlChecked(person.erValgt)}"/></td>
                <td>${person.navn}</td>
                <td><button class="litenKnapp"  onclick="slettPerson(${person.id})">x</button></td>
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

async function leggTilPerson() {
  const navn = document.getElementById('nyPerson').value;
  try {
    let personObj = await db.collection('personer').add({ navn });
    model.personer.liste.push(
      { id: personObj.id, navn: navn, erValgt: true });
    visPersoner();
  } catch (error) {
    console.error(error);
  }
}

function velgPerson(id) {
  const person = finnPerson(id);
  person.erValgt = !person.erValgt;
  visPersoner();
}

function slettPerson(id) {
  model.personer.liste = model.personer.liste.filter(p => p.id !== id);
  visPersoner();
}

async function trekk() {
  let antall = model.personer.trekkAntall;
  const personerListe = model.personer.liste.filter(p => p.erValgt);
  const indekser = Array.from(personerListe.keys());
  const vinnere = [];
  while (antall-- > 0 && indekser.length > 0) {
    const tilfeldigIndeks = Math.floor(Math.random() * indekser.length);
    const indeks = indekser.splice(tilfeldigIndeks, 1);
    vinnere.push(personerListe[indeks].navn);
  }
  let nyTrekning = {
    vinnere: vinnere,
    tid: lagDatoTekstNåForLagring(),
    deltakere: personerListe.map(p => p.navn)
  }; 
  try {
    let trekningKopi = JSON.parse(JSON.stringify(nyTrekning));
    trekningKopi.tid = new Date(trekningKopi.tid);
    await db.collection('trekninger').add(trekningKopi);
    model.trekninger.unshift(nyTrekning);
    visTrekninger();
  } catch (error) {
    console.error(error);
  }  
}

function justerAntall(delta) {
  model.personer.trekkAntall =
    Math.max(1, model.personer.trekkAntall + delta);
  visPersoner();
}

function finnPerson(id) {
  return model.personer.liste.filter(p => p.id === id)[0];
}