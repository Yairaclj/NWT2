import { Util } from "./util.js";
import { Dao } from "./dao.js";
const navUsuarios = document.getElementById("navUsuarios");
const navUsuarios2 = document.getElementById("navUsuarios2");
const navUsuarios3 = document.getElementById("navUsuarios3");
export class Navegacion {
  static sesionActualiza(rol) {
    Util.setVisible(navUsuarios, rol["Administrador"]);
    Util.setVisible(navUsuarios2, rol["Cliente"]);
    Util.setVisible(navUsuarios3, rol["Trabajador"]);
  }
  static sesionInicia(rol) {
    Util.setVisible(navUsuarios, false);
    Util.setVisible(navUsuarios2, false);
    Util.setVisible(navUsuarios3, false);
    window.usuarioListo = new Promise(resolve => {
      if (rol) {
        firebase.auth().onAuthStateChanged(
          user => {
            const hayUsuario = user && user.email;
            if (hayUsuario) {
              window.xd = user.email;
              Dao.buscaCampo("Usuario", "upperCue",
                user.email.toUpperCase())
                .then(usuarios => {
                  let autorizado = false;
                  for (const usuario of usuarios) {
                    Navegacion.sesionActualiza(usuario.rolIds);
                    if (rol.filter(r => usuario.rolIds[r]).length>0) {
                      autorizado = true;
                    }
                  }
                  if (!autorizado) {
                    alert("Usuario no autorizado.");
                    Util.regresa();
                  } else {
                    resolve(user.email);
                  }
                })
                .catch(e => {
                  Util.muestraError(e);
                  Util.regresa();
                });
            } else {
              alert("Usuario no autorizado.");
              Util.regresa();
            }
          },
          Util.muestraError);
      }
    });
  }
}
