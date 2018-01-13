var Juego = {
 


  // Mezclar piezas
  mezclarPiezas: function(veces){
    if(veces<=0){return;}
    var direcciones = [40, 38, 39, 37];
    var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
    this.moverEnDireccion(direccion);
    setTimeout(function(){
      this.mezclarPiezas(veces-1);
    },50);
  },


  // Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
  // su posición con otro elemento
  
 

  // Movimientos restantes
  movimientosRestantes: function(){
    if(this.contadorDeMovimientos > 0){
      this.contadorDeMovimientos--;
      document.getElementById("movimientos-restantes").innerHTML = this.contadorDeMovimientos;
    }else{
      this.mostrarCartelPerdedor();
    }
  },

   //Fin - Mover las piezas clickeando
  calcularMovimientosNivel: function(valorInput){
    this.movimientosTotales = (this.cantidadDePiezasPorLado * this.cantidadDePiezasPorLado) * valorInput;
    this.contadorDeMovimientos = this.movimientosTotales;
    document.getElementById("contadorDeMovimientos").innerHTML = this.contadorDeMovimientos;
  },

  

}