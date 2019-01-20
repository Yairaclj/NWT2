export class Util {
  static registraServiceWorker() {
    /* Registra un service worker para instalar la aplicación en el caché
     * del navegador. */
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js")
          .then(registro => {
            console.log("Service Worker registrado.");
            console.log(registro);
          })
          .catch(Util.muestraError);
    }
  }
  static agregaTemplate(element, template) {
    element.appendChild(document.importNode(template.content, true));
  }
  static regresa() {
    window.location = "index.html";
  }
  static texto(s){
    return s ? s : "";
  }
  static valida(condicion, mensaje) {
    if (!condicion) {
      throw new Error(mensaje);
    }
  }
  static muestraError(e) {
    console.error(e);
    alert(e.message);
  }
  static setVisible(element, visible) {
    if (element) {
      if (visible) {
        element.style.height = "";
        element.style.width = "";
        element.style.overflow = "";
      } else {
        element.style.height = "0";
        element.style.width = "0";
        element.style.overflow = "hidden";
      }
      element.style.display = visible ? "" : "none";
    }
  }
  static getValores(select) {
    const valores = {};
    for (const option of select.options) {
      if (option.selected) {
        valores[option.value] = true;
      }
    }
    return valores;
  }
  static creaObjeto(valor) {
    const obj = {};
    obj[valor] = true;
    return obj;
  }
  static agregaOpciones(select, valores, filas) {
    select.innerHTML = "";
    for (const fila of filas) {
      const option = document.createElement("option");
      option.value = fila.id;
      option.selected = valores && valores[fila.id];
      option.text = fila.texto1;
      select.appendChild(option);
    }
  }
  static agregaFilas(element, lista, detalle, template,templateVacio) {
    element.innerHTML = "";
    if (lista) {
      for (const fila of lista) {
        const a = template.content.querySelector("a");
        if (a) {
          a.href = detalle + "?id=" + encodeURIComponent(fila.id);
          a.textContent = fila.texto1;
        }
        const div = template.content.querySelector("div");
        if (div) {
          div.textContent = fila.texto2;
        }
        const img = template.content.querySelector("img");
        if (img) {
          img.src = fila.img;
          img.alt = fila.alt;
        }
        Util.agregaTemplate(element, template);
      }
    } else {
      Util.agregaTemplate(element, templateVacio);
    }
  }
}
