customElements.define("form-navegacion", class extends HTMLElement {
  connectedCallback() {
    this.innerHTML =
       `<ul>
          <li><a href="index.html">Sesión</a>  </li>
          
          <li id="navUsuarios" > 
		  <a href="usuarios.html">Usuarios</a> &nbsp
          <a href="servicios.html">Servicios</a>&nbsp
          <a href="trabajadores.html">Trabajadores</a>&nbsp
      </li>
      
      <li id="navUsuarios2" > 
          <a href="serviciosCli.html">Servicios</a>&nbsp
          <a href="usuarioCli.html">Modificar Perfil</a>&nbsp
      </li>
      
      <li id="navUsuarios3" > 
          <a href="pedidos.html">Solicitudes</a>&nbsp
          <a href="usuarioTra.html">Perfil</a>&nbsp
      </li>
        </ul>
        `;
  }
});
