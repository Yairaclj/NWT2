export class Dao {
  static agrega(entidad, modelo) {
    const ref = firebase.database().ref(entidad).push();
    modelo.id = ref.key;
    return ref.set(modelo);
  }
  static agregaa(entidad, modelo, id) {
    const ref = firebase.database().ref(entidad).child(id);
    modelo.id = id;
    return ref.set(modelo);
  }
  static agregas(entidad, modelo, entidad2, modelo2) {
    const ref = firebase.database().ref(entidad).push();
    ref.key;
    const ref2 = firebase.database().ref(entidad2).child(ref.key);    
    modelo.id = ref.key;
    modelo2.id = ref.key;
    return ref.set(modelo),ref2.set(modelo2);
  }
  
  static modifica(entidad, modelo) {
    return firebase.database().ref(entidad).child(modelo.id).set(modelo);
  }
  static elimina(entidad, id) {
    return firebase.database().ref(entidad).child(id).remove();
  }
  static eliminas(entidad, entidad2 ,id) {
    const ref = firebase.database().ref(entidad).child(id)
    const ref2 = firebase.database().ref(entidad2).child(id)
    return ref.remove(),ref2.remove();
  }
  static observa(entidad, orderBy, funcion, resultado, error) {
    firebase.database().ref(entidad).orderByChild(orderBy).on("value",
        dataSnapshot => {
          const filas = [];
          dataSnapshot.forEach(ds => {
            const modelo = ds.val();
            modelo.id = ds.key;
            const fila = funcion(modelo);
            fila.id = modelo.id;
            filas.push(fila);
          });
          resultado(filas);
        },
        error);
  }
  static consulta(entidad, orderBy, funcion) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(entidad).orderByChild(orderBy).once("value",
          dataSnapshot => {
            const filas = [];
            dataSnapshot.forEach(ds => {
              const modelo = ds.val();
              modelo.id = ds.key;
              const fila = funcion(modelo);
              fila.id = modelo.id;
              filas.push(fila);
            });
            resolve(filas);
          },
          reject);
    });
  }
  static busca(entidad, id) {
    return new Promise((resolve, reject) =>
        firebase.database().ref(entidad).child(id).once("value",
            dataSnapshot => {
              if (dataSnapshot.exists) {
                const modelo = dataSnapshot.val();
                modelo.id = dataSnapshot.key;
                resolve(modelo);
              } else {
                resolve(null);
              }
            },
            reject));
  }
  static buscaCampo(entidad, campo, valor) {
    return new Promise((resolve, reject) =>
        firebase.database().ref(entidad).orderByChild(campo).equalTo(valor)
            .once("value",
                dataSnapshot => {
                  const lista = [];
                  dataSnapshot.forEach(ds => {
                    const modelo = ds.val();
                    modelo.id = ds.key;
                    lista.push(modelo);
                  });
                  resolve(lista);
                },
                reject));
  }
}
