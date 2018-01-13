var Juego = {

  crearGrilla: function(){
    this.grilla = []
    for(var i=0; i<this.cantidadDePiezasPorLado; i++ ){
      this.grilla.push([]);
    }
    for(var i=1; i<=this.cantidadDePiezasPorLado; i++ ){
      for(var j=0; j<this.cantidadDePiezasPorLado; j++ ){
        this.grilla[j].push(i + this.cantidadDePiezasPorLado * j);
      }
    }
  },

  configurarCanvas: function(){
    this.game = document.getElementById("game");
    this.contexto = this.game.getContext("2d");
  },

  cargarImagen: function (e) {    
    this.anchoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
    this.altoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
    this.anchoDeRompecabezas = this.anchoPiezas * this.cantidadDePiezasPorLado;
    this.altoDeRompecabezas = this.altoPiezas * this.cantidadDePiezasPorLado;
    this.configurarCanvas();
  },

  iniciarImagen: function (callback) {
    this.imagen = new Image();
    var self = this;
    this.imagen.addEventListener('load', function () {
      self.cargarImagen.call(self);
      callback();
    }, false);
    this.imagen.src = "images/imagen.jpg";
  },

  crearPiezas: function(){
    this.piezas = []
    for(var i = 0; i < this.cantidadDePiezasPorLado; i++){
      this.piezas[i] = [];
      for(var j = 0; j < this.cantidadDePiezasPorLado; j++){
        this.piezas[i][j] = [];
        this.piezas[i][j].x = i;
        this.piezas[i][j].y = j;
      }
    }
  },

  construirPiezas: function(){
    for(i = 0; i < this.cantidadDePiezasPorLado; i++){
      for(j = 0; j < this.cantidadDePiezasPorLado; j++){
        var x = this.piezas[i][j].x;
        var y = this.piezas[i][j].y;
        this.contexto.drawImage(this.imagen, x * this.anchoPiezas, y * this.altoPiezas, this.anchoPiezas, this.altoPiezas, i * this.anchoPiezas, j * this.altoPiezas, this.anchoPiezas, this.altoPiezas);
      }
    }
  },

  restarMovimientos: function(){
    if(document.getElementById("movimiento-contador").innerHTML > 1 ) {
      document.getElementById("movimiento-contador").innerHTML--;
    } else {
      document.getElementById("movimiento-contador").innerHTML = 0;
      this.mostrarCartelPerdedor();
    }
  },

  chequearSiGano: function(){
    var posicionInicial = 1;
    for (var i = 0; i < this.grilla.length; i++) {
      for (var j = 0; j < this.grilla.length; j++) {
        if (this.grilla[i][j] === posicionInicial) {
          posicionInicial++;
        }
      }
    }
    posicionInicial === Math.pow(this.cantidadDePiezasPorLado, 2) + 1 ?
      this.mostrarCartelGanador() : this.restarMovimientos()
  },

  mostrarCartelGanador: function(){
    swal("Ganaste :)", "Felicitaciones", "success",)
  },

  mostrarCartelPerdedor: function(){
    swal('Perdiste :(', 'Intentar otra vez', 'error')
  },

  intercambiarPosiciones: function(filaPos1, columnaPos1, filaPos2, columnaPos2){
    var posicion1 = this.grilla[filaPos1][columnaPos1];
    var posicion2 = this.grilla[filaPos2][columnaPos2];
    this.grilla[filaPos1][columnaPos1] = posicion2;
    this.grilla[filaPos2][columnaPos2] = posicion1;

    var piezaGuardada = [];
    piezaGuardada = this.piezas[filaPos1][columnaPos1];
    this.piezas[filaPos1][columnaPos1] = this.piezas[filaPos2][columnaPos2];
    this.piezas[filaPos2][columnaPos2] = piezaGuardada;

    this.construirPiezas();
    this.piezaVacia(filaPos2, columnaPos2);
  },
  
  piezaVacia: function(h, v){
    this.contexto.beginPath();
    this.contexto.rect(h * this.anchoPiezas, v * this.altoPiezas, this.altoPiezas, this.anchoPiezas);
    this.contexto.fillStyle = '#fff';
    this.contexto.fill();
  },

  actualizarPosicionVacia: function(nuevaFila,nuevaColumna){
    this.posicionVaciaFila = nuevaFila;
    this.posicionVaciaColumna = nuevaColumna;
  },

  posicionValida: function(fila, columna){
    return(fila >= 0 && fila < this.cantidadDePiezasPorLado) && (columna >= 0 && columna < this.cantidadDePiezasPorLado)
  },

  moverEnDireccion: function(direccion){
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;

    if(direccion == 40){
      nuevaFilaPiezaVacia = this.posicionVaciaFila;
      nuevaColumnaPiezaVacia = this.posicionVaciaColumna+1;
    }
    else if (direccion == 38) {
      nuevaFilaPiezaVacia = this.posicionVaciaFila;
      nuevaColumnaPiezaVacia = this.posicionVaciaColumna-1;
    }
    else if (direccion == 39) {
      nuevaFilaPiezaVacia = this.posicionVaciaFila+1;
      nuevaColumnaPiezaVacia = this.posicionVaciaColumna;
    }    
    else if (direccion == 37) {    
      nuevaFilaPiezaVacia = this.posicionVaciaFila-1;
      nuevaColumnaPiezaVacia = this.posicionVaciaColumna;
    }

    if (this.posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
      this.intercambiarPosiciones(this.posicionVaciaFila, this.posicionVaciaColumna,
      nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
      this.actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    }
  },

  capturarTeclas: function(){
    var self = this;
    document.body.onkeydown = (function(evento) {
      if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
        self.moverEnDireccion(evento.which);
        var gano = self.chequearSiGano();
        if(gano){
          setTimeout(function(){
            self.mostrarCartelGanador();
          },500);
        }
        evento.preventDefault();
      }
    });
  },

  elegirNivel: function(){    
    var valor = $( "input:checked" ).val()
    var self = this;

    $( "#nivel-facil" ).on( "click", function() {
      valor = 3
      this.cantidadDePiezasPorLado = valor
      document.getElementById('cantidadPiezasPorLado').textContent = valor
      document.getElementById('movimiento-contador').textContent = 45
      self.iniciar()
    });                 
    $( "#nivel-intermedio" ).on( "click", function() {
      valor = 4
      this.cantidadDePiezasPorLado = valor
      document.getElementById('cantidadPiezasPorLado').textContent = valor
      document.getElementById('movimiento-contador').textContent = 60
      self.iniciar()
    });
    $( "#nivel-dificil" ).on( "click", function() {
      valor = 5
      this.cantidadDePiezasPorLado = valor
      document.getElementById('cantidadPiezasPorLado').textContent = valor
      document.getElementById('movimiento-contador').textContent = 85
      self.iniciar()
    });
  },

  piezasClick: function(){
    self = this;
    document.getElementById('game').onmousemove = function(e){
    self.posicionClick.x = Math.floor((e.pageX - this.offsetLeft) / self.anchoPiezas);
    self.posicionClick.y = Math.floor((e.pageY - this.offsetTop) / self.altoPiezas);
    }
  },

  espacioPiezas: function(x1, y1, x2, y2){
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }, 

  moverClick: function(){
    this.piezasClick();
    self = this;
    $('#game').click(function(){
      if (self.espacioPiezas(self.posicionVaciaFila, self.posicionVaciaColumna, self.posicionClick.x, self.posicionClick.y) == 1){
        self.intercambiarPosiciones(self.posicionVaciaFila, self.posicionVaciaColumna, self.posicionClick.x, self.posicionClick.y);
        self.actualizarPosicionVacia(self.posicionClick.x, self.posicionClick.y);
        self.chequearSiGano()
      }
    });
  },

  mezclarPiezas: function(veces){
    if(veces<=0){return;}
    var self = this;
    var direcciones = [40, 38, 39, 37];
    var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
    this.moverEnDireccion(direccion);
    setTimeout(function(){
      self.mezclarPiezas(veces-1);
    },50);
    
  },

  botonMezclar: function(){
    var self = this;
    $("#mezclar").on( "click", function() {
      self.iniciar()
    });
  },

  iniciar: function (cantMovimientos) {    
    this.posicionClick = new Object;
    this.posicionClick.x = 0;
    this.posicionClick.y = 0;
    this.cantidadDePiezasPorLado = Number(document.getElementById('cantidadPiezasPorLado').textContent);
    this.crearGrilla();
    this.elegirNivel();
    this.posicionValida();
    this.botonMezclar();
    this.posicionVaciaFila = this.cantidadDePiezasPorLado - 1;
    this.posicionVaciaColumna = this.cantidadDePiezasPorLado - 1;
    var self = this;
    this.iniciarImagen(function (){
      self.crearPiezas();
      self.construirPiezas();
      self.piezaVacia(self.posicionVaciaFila, self.posicionVaciaColumna);
      self.mezclarPiezas(1);
      self.capturarTeclas();
      self.moverClick();
    });
  }
}

Juego.iniciar();