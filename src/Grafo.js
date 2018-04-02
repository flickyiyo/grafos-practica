import {observable, computed, autorun} from 'mobx';
export class Arista  {
  destino;
  constructor(destino) {
    this.destino = destino;
  }
}
export class Nodo {
  valor;
  aristas =new Array() ;
  constructor(valor) {
    this.valor = valor;
  }

  setArista = (...nodos) => {
    nodos.forEach(nodo => {
      this.aristas.push(nodo);
    })
  }

}

export class Grafo {
  @observable nodoActual;
  raiz;
  visitados = [];
  constructor(nodo) {
    this.nodoActual = nodo;
    this.raiz = {...nodo};
  }
  @computed get disponibles() {
    return this.nodoActual.aristas.map(arista => arista)
  }
  busquedaProfundidad(valor) {
    let actual = {...this.nodoActual};
    this.arbolGeneradorProfundidad(actual, valor);
    if(!this.visitados.includes(valor)){
      console.log('No se encontro el valor');
    } else {
      console.log('encontrado en la iteracion ', this.contador);
    }
    this.contador=0;
    this.visitados=[];
  }

  busquedaAnchura(valor) {
    let actual = new Nodo(null);
    actual.setArista(this.nodoActual);
    if(this.arbolGeneradorAnchura(actual, valor)){
      console.log('encontrado en la iteracion ', this.contador);
    } else {
      console.log("no se encontro");
    }
    this.contador=0;
    this.visitados=[];
  }

  contador = 0;

  arbolGeneradorAnchura(actual, valor) {
    let queue = [actual];
    let {visitados} = this;
    while(queue!=0) {
      this.contador++;
      let nodo = queue.shift();
      if(!visitados.includes(nodo.valor)) {
        visitados.push(nodo.valor);
        if(nodo.valor==valor){
          return true
        } else {
          for(let i = 0; i < nodo.aristas.length; i++) {
            queue.push(nodo.aristas[i]);
          }
        }
      }
    }
    // this.contador++;
    // if(!this.visitados.includes(actual.valor)){
    //   this.visitados.push(actual.valor);
    // }
    // for(let i = 0; i< actual.aristas.length; i++) {
    //   if(actual.aristas[i].valor == valor){
    //     return true;
    //   } else {
    //     this.visitados.push(actual.aristas[i].valor);
    //   }
    // }
    // for(let i = 0; i< actual.aristas.length; i++ ){
    //   this.arbolGeneradorAnchura(actual.aristas[i], valor);
    // }
  }

  arbolGeneradorProfundidad(actual, valor) {
    this.contador++;
    if(actual.valor==valor) {
      this.visitados.push(actual.valor);
      return true;
    }
    if(this.visitados.includes(actual.valor)){
      return false;
    } else {
      this.visitados.push(actual.valor);
    }
    
    actual.aristas.forEach(arista => {
      if(!this.visitados.includes(arista.valor) && !this.visitados.includes(valor)) {
        if(this.arbolGeneradorProfundidad(arista, valor)){
          return true;
        }
      } 
    });
  } 
}

let entrada1 = new Nodo('entrada1');
let entrada2 = new Nodo('entrada2');
let entrada3 = new Nodo('entrada3');
let j = new Nodo('j');
let h = new Nodo('h');
let i = new Nodo('i');
let a = new Nodo('a');
let b = new Nodo('b');
let c = new Nodo('c');
let d = new Nodo('d');
let e = new Nodo('e');
let f = new Nodo('f');
let g = new Nodo('g');
let k = new Nodo('k');
let l = new Nodo('l');
let o = new Nodo('o');
let p = new Nodo('p');
let r = new Nodo('r');

entrada1.setArista(j, i, h);
entrada2.setArista(j, g, f);
entrada3.setArista(a, r);
a.setArista(entrada3, b, d);
b.setArista(a, c, r, d, f);
c.setArista(r, b, f);
d.setArista(p, o, l, k);
e.setArista(k, f, g);
f.setArista(e, k, b, c, entrada2);
g.setArista(e, h, j, entrada2);
h.setArista(g, entrada1);
i.setArista(entrada1, g);
j.setArista(entrada1, entrada2, f, g);
k.setArista(e, f, d, l);
l.setArista(k, l, o);
o.setArista(l, p, d);
p.setArista(o, d);


let grafo = new Grafo(entrada1);
console.log(grafo);

window.grafo = grafo;

export default grafo;