
const drawModel = async () => {
    model.personer.liste = [];

    let personRef = db.collection('personer');
    let allePersoner = await personRef.get();
    for (const person of allePersoner.docs) {
        model.personer.liste.push(
            {
                id: person.id,
                navn: person.data().navn,
                erValgt: person.data().erValgt,
            }
        )
    }

    const info = db.collection('info')
    info.get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            model.personer.velgAlle = doc.data().velgAlle;
            model.personer.trekkAntall = doc.data().trekkAntall;
        })
    })   
    visPersoner()
    
}

const drawModelDraws = async () => {
    model.trekninger = [];

    let trekkRef = db.collection('trekninger');
    alleTrekk = await trekkRef.orderBy('tid', 'desc').get();
    for (const trekk of alleTrekk.docs) {
        model.trekninger.push({
            deltakere: trekk.data().deltakere,
            tid: trekk.data().tid,
            vinnere: trekk.data().vinnere
        })
    }

}