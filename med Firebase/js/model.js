var model = {
  personer: {
    velgAlle: false,
    trekkAntall: 1,
    liste: [
      { id: 100, navn: 'Per', erValgt: true },
      { id: 101, navn: 'Pål', erValgt: true },
      { id: 102, navn: 'Espen', erValgt: false },
      { id: 103, navn: 'Ole', erValgt: true },
    ]
  },
  trekninger: [
    {
      vinnere: ['Ole'],
      tid: '2018-10-17 17:10',
      deltakere: ['Per', 'Pål', 'Ole']
    }
    , {
      vinnere: ['Per', 'Pål', 'Knut'],
      tid: '2018-10-11 17:10',
      deltakere: ['Per', 'Pål', 'Ole', 'Knut', 'Gunnar']
    }
  ]
};

async function hentDataFraFirestore() {
  try {
    let personerDoc = await db.collection('personer').orderBy('navn').get();
    model.personer.liste = personerDoc.docs.map(mapPerson);
    let trekningerDoc = await db.collection('trekninger').orderBy('tid', 'desc').get();
    model.trekninger = trekningerDoc.docs.map(mapTrekning);
    visPersoner();
  } catch (error) {
    console.error(error);
  }
}

function mapPerson(personDoc) {
  let personObj = personDoc.data();
  personObj.id = personDoc.id;
  personObj.erValgt = true;
  return personObj;
}

function mapTrekning(trekningDoc) {
  let trekningObj = trekningDoc.data();
  trekningObj.tid = trekningObj.tid.toDate().toISOString().substr(0,16);
  return trekningObj;
}
