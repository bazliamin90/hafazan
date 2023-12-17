const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
  <style>
    header {
      position: sticky;
      top: 0px;
      background-color: black;
	  z-index: 99;
    }

	#nav{
      .border:1px solid red;
      .border-width:1px 0;
      list-style:none;
      margin:0;
      padding:10px;
      text-align:center;
	  font-size: 12px;
	  font-family:'Poppins', sans-serif;

    }
    #nav li{
      position:relative;
      display:inline;
    }
    #nav a{
      display:inline-block;
      padding:5px 10px;
    }
    #nav ul{
      position:absolute;
      /*top:100%; Uncommenting this makes the dropdowns work in IE7 but looks a little worse in all other browsers. Your call. */
      left:-9999px;
      margin:0;
      padding:0;
      text-align:left;
    }
    #nav ul li{
      display:block;
    }
    #nav li:hover ul{
      left:0;
    }
    #nav li:hover a{
      text-decoration:underline;
      background:white;
      color: black;
    }
    #nav li:hover ul a{
      text-decoration:none;
      background:solid;
    }
    #nav li:hover ul a:hover{
      text-decoration:underline;
      background:#f1f1f1;
    }
    #nav ul a{
      white-space:normal;
      display:block;
      border-bottom:1px solid #ccc;
    }
    a{
      color:white;
      text-decoration:none;
      font-weight:bold;
    }
    a:hover{
      text-decoration:underline;
      background:#f1f1f1;
    }

	@media (max-width:400px) {
		#nav{
			.border:1px solid grey;
			.border-width:1px 0;
			list-style:none;
			margin:0;
			padding:0;
			text-align:center;
			font-size: 9px;
			font-family:Martian Mono;
		}
		}
  </style>


  <header>
    <ul id="nav">

		<li>
		<a href="index.html">Surah Pendek</a>
		</li>

		<li>
		<a href="index2.html">Al-Mulk</a>
		</li>

                <li>
		<a href="index3.html">About</a>
		</li>

	</ul>
  </header>
`;

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });

    shadowRoot.appendChild(headerTemplate.content);
  }
}

customElements.define('header-component', Header);
