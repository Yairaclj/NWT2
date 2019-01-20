
customElements.define("boton-visibilidad", class extends HTMLElement {
  connectedCallback() {
    this.addEventListener("click", () => this.oyeClic());
    this.muestraTexto();
  }
  muestraTexto() {
    this.textContent =
        previousElementSibling.type === "password" ? "Muestra" : "Oculta";
  }
  oyeClic() {
    const previo = this.previousElementSibling;
    previo.type = previo.type === "password" ? "text" : "password";
    this.muestraTexto();
  }
});
