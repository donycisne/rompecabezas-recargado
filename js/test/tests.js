var expect = chai.expect;

describe('Creación', function() {
    'use strict';

describe('Juego', function() {
    it('El Objeto Juego está definido', function(done) {
      if (!window.Juego){
        done(err);
      }
      else{ 
        done();
      }
    });
});

describe('Tamaño de la grilla', function() {
    it('La grilla tiene el tamaño correcto', function() {
      //se crea la grilla con un valor de cantidad de piezas por lado
      Juego.cantidadDePiezasPorLado = 5;
      Juego.crearGrilla();
      //se evalua si el tamaño de la grilla creada es correcto
      expect(Juego.grilla.length).to.equal(Juego.cantidadDePiezasPorLado);
      expect(Juego.grilla[0].length).to.equal(Juego.cantidadDePiezasPorLado);
    });
  });

describe('Posicion valida', function(){
    it('La posicion esta dentro de la grilla', function() {
      //Creo posiciones para comprobar si esta adentro o afuera de la grilla
      var invalido = posicionValida(-1, -1)
      var valido = posicionValida(2, 2)
      //se evaluan las posiciones
      expect(invalido).to.equal(false);
      expect(valido).to.equal(true);
    });
  });

  //Falta un test mas
});
