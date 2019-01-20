customElements.define("campos-usuario", class extends HTMLElement {
  connectedCallback() {
    this.innerHTML =
        `<p>
          <label accesskey="A">
            Rol
            <select name="Rol" multiple></select>
          </label>
        </p>
        <p>
          <label accesskey="R">
            Descripcion de los Roles
            <select id="rol" name="rol[]" multiple></select>
          </label>
        </p>`;
  }
});
