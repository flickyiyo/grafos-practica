import { observable, computed, autorun } from 'mobx';
import _ from 'lodash';
import Nodos from './Nodos';
// import NodosX from './NodosX';
// import NodosY from './NodosY';

// console.log({ ...NodosX, ...NodosY });
// console.log(Object.getOwnPropertyNames(NodosX).length === Object.getOwnPropertyNames(NodosY).length);
// const keys = Object.getOwnPropertyNames(NodosX);
// const Nodos = {}
// for (const key of keys) {
//   Nodos[key] = {
//     ...NodosX[key],
//     ...NodosY[key]
//   }
// }

console.log(Nodos);

export class Arista {
  destino;
  peso;
  constructor(destino, peso = 0) {
    this.destino = destino;
    this.peso = peso;
  }
}
export class Nodo {
  valor;
  x; y;
  aristas = new Array();
  constructor(valor, x = 0, y = 0) {
    this.valor = valor;
    this.x = x;
    this.y = y;
  }

  setArista = (...nodos) => {
    let aristas = [];
    nodos.forEach(nodo => {
      const peso = parseInt(Math.random() * 10);
      aristas.push(new Arista(nodo, peso));
    });

    this.aristas = aristas.sort((a, b) => a.peso - b.peso);
    console.log(this.aristas);
  }

}

export class Grafo {
  @observable nodoActual;
  raiz;
  visitados = [];
  constructor(nodo) {
    this.nodoActual = nodo;
    this.raiz = { ...nodo };
  }
  @computed get disponibles() {
    return this.nodoActual.aristas.map(arista => arista)
  }

  // primeroElMejor(valor, actual = this.nodoActual) {
  //   if (actual.valor === valor || actual === valor)
  //     const destino = Nodos[valor];
  //   const inicio = Nodos[actual.valor || actual];
  //   const arreglo = [];
  //   const corto = { distancia: undefined, index: -1 }
  //   Nodos[actual.valor].rels.forEach((nodo, index) => {
  //     const distancia = this.getDistancia(nodo, destino)
  //     arreglo.push({ ...nodo, distancia });
  //     if (arreglo[index].distancia < corto.distancia && corto.index > -1) {
  //       corto = { distancia, index }
  //     }
  //   });

  //   this.primeroElMejor(valor, )
  // }

  getTiempo(nodo1, nodo2) {
    const distancia = this.getDistancia(nodo1, nodo2);
    const velocidadPromedio = 5000;
    const tiempo = velocidadPromedio / distancia;
    const t = tiempo / 3600;
    return t;
  }
  isVisitado(valor, arreglo = []) {
    for (const el of arreglo) {
      if (el === valor) {
        return true;
      }
    }
    return false;
  }

  colina(valor, actual = Nodos[this.nodoActual.valor]) {
    console.log(actual);
    if (actual.valor === valor) {
      return true;
    }
    const destino = Nodos[valor];
    const corto = {
      distancia: Infinity,
      nodo: undefined
    };
    for (const rel of actual.rels) {
      const nodo = Nodos[rel];
      const distancia = this.getDistancia(nodo, destino);
      console.log(distancia, rel);
      if (distancia < corto.distancia) {
        corto.nodo = nodo;
        corto.distancia = distancia;
      }
    }
    if (this.colina(valor, corto.nodo)) {
      return true;
    }
  }
  examinados = [];

  aEstrella(valor, actual = Nodos[this.nodoActual.valor]) {
    if (valor === actual.valor) {
      return true;
    }

    this.visitados.push(actual.valor);
    const destino = Nodos[valor];
    const lista = [];
    for (const el of actual.rels) {
      const nodo = Nodos[el];
      const distanciaAlDestino = this.getDistancia(nodo, destino);
      const distanciaAlSiguiente = this.getDistancia(actual, nodo);
      const distancia = distanciaAlDestino + distanciaAlSiguiente;
      lista.push({ ...nodo, distancia });
    }
    lista.sort((a, b) => a.distancia - b.distancia);
    while (lista.length !== 0) {

      const n = lista.shift();
      // console.log(n);
      this.examinados.push(n);

      const rels = this.getDistanciasOfRels(n, destino);
      // if(rels.find(n => n.valor === valor)) {
      //   return true;
      // }
      if(this.aEstrella(valor, n)) {
        this.padres.push(actual);
        console.log('padres', this.padres);
        return true;
      }
      // this.lista = this.lista.concat(rels);
      // this.lista.sort((a, b) => a.distancia - b.distancia);
    }
  }

  getDistanciasOfRels(nodo, destino) {
    const lista = [];
    const actual = Nodos[this.nodoActual.valor];
    for (const el of nodo.rels) {
      const distancia = this.getDistancia(nodo, destino);
      lista.push({ ...Nodos[el], distancia: nodo.distancia + distancia });
    }
    return lista.sort((a, b) => a.distancia - b.distancia);
  }

  lista = [];
  primeroElMejor(valor, flag) {
    if (flag) {
      this.heuristica = this.getTiempo;
      this.primero(valor);
      console.log('visitados', this.visitados);

    }
    else {
      this.heuristica = this.getDistancia;
      this.primero(valor);
      console.log('visitados', this.visitados);

    }
    this.padres.unshift(this.nodoActual.valor);
    console.log('padres', this.padres);

  }
  padres = [];
  primero(valor, actual = Nodos[this.nodoActual.valor], distanciaRecorrida = -1) {
    console.log('Entrando a primero el mejor', valor, actual, distanciaRecorrida)
    if (actual.valor === valor) {
      console.log('Encontrado', actual);
      return true;
    }
    if (!this.isVisitado(actual.valor, this.visitados)) {
      this.visitados.push(actual.valor);
    }
    const destino = Nodos[valor];
    let flag = false;
    let corto = { index: -1, distancia: Infinity };
    const arr = []
    console.log(actual);
    for (let i = 0; i < actual.rels.length; i++) {
      const nodo = Nodos[actual.rels[i]];
      if (nodo.valor === valor) {
        return true;
      }
      const distancia = this.heuristica(nodo, destino);
      if (!this.isVisitado(nodo.valor, this.visitados)) {
        this.visitados.push(nodo.valor);
        arr.push({ ...nodo, distancia });
      }
    }
    arr.sort((a, b) => a.distancia - b.distancia);
    console.log('/////////', arr.map(n => n));
    while (arr.length !== 0) {
      const n = arr.shift();
      if (this.primero(valor, n, distanciaRecorrida + n.distancia)) {
        this.padres.unshift(n.valor);
        console.log('ultimo padre', n.valor)
        return true;
      }
    }
    // this.padres.filter((n) => n === actual.valor);

    // this.primero(valor, Nodos[arreglo[corto.index].valor], distanciaRecorrida + corto.distancia);

  }
  getDistancia(nodo1, nodo2) {
    const diffX = Math.pow(nodo2.x - nodo1.x, 2);
    const diffY = Math.pow(nodo2.y - nodo1.y, 2);
    
    return Math.sqrt(diffX + diffY);
  }

  costoUniforme(valor) {
    let queue = [{ nodo: this.nodoActual, peso: 0 }];
    let visitados = [];
    while (queue != 0) {
      console.log(queue);

      let { nodo, peso } = queue.shift();
      if (nodo.valor == valor) {
        console.log('alklk', queue);
        return queue;
      }
      for (let arista of nodo.aristas) {
        if (arista.destino.valor == nodo.valor) { continue; }
        let n = arista.destino;
        let peso2 = arista.peso;
        const element = { nodo: n, peso: peso + peso2 };
        if (visitados.find((e) => e.nodo.valor == n.valor && e.peso == peso + peso2)) {
          continue;
        }

        queue.unshift(element);
        queue.sort((a, b) => a.peso - b.peso);
        if (n.valor === valor) {
          visitados.push(element);
        }
        console.log(queue);
      }
    }
  }

  busquedaProfundidad(valor) {
    let actual = { ...this.nodoActual };
    this.arbolGeneradorProfundidad(actual, valor);
    if (!this.visitados.includes(valor)) {
      console.log('No se encontro el valor');
    } else {
      console.log('encontrado en la iteracion ', this.contador);
      console.log(this.visitados);
    }
    this.contador = 0;
    this.visitados = [];
  }

  busquedaAnchura(valor) {
    let actual = new Nodo(null);
    actual.setArista(this.nodoActual);
    if (this.arbolGeneradorAnchura({ ...this.nodoActual }, valor)) {
      console.log('encontrado en la iteracion ', this.contador);
      console.log(this.visitados);

    } else {
      console.log("no se encontro");
    }
    this.contador = 0;
    this.visitados = [];
  }


  contador = 0;

  arbolGeneradorAnchura(actual, valor) {
    let queue = [actual];
    let { visitados } = this;
    while (queue != 0) {
      this.contador++;
      let nodo = queue.shift();
      if (!visitados.includes(nodo.valor)) {
        visitados.push(nodo.valor);
        if (nodo.valor == valor) {
          return true
        } else {
          for (let i = 0; i < nodo.aristas.length; i++) {
            queue.push(nodo.aristas[i]);
          }
        }
      }
    }
  }

  arbolGeneradorProfundidad(actual, valor) {
    let stack = [actual];
    let { visitados } = this;
    while (stack != 0) {
      this.contador++;
      let nodo = stack.pop();
      if (!visitados.includes(nodo.valor)) {
        visitados.push(nodo.valor);
        if (nodo.valor == valor) {
          return true
        } else {
          for (let i = 0; i < nodo.aristas.length; i++) {
            stack.push(nodo.aristas[i]);
          }
        }
      }
    }
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
e.setArista(k, f, g, e);
f.setArista(e, k, b, c, entrada2);
g.setArista(e, h, j, entrada2);
h.setArista(g, entrada1, i);
i.setArista(entrada1, g, h);
j.setArista(entrada1, entrada2, f, g);
k.setArista(e, f, d, l);
l.setArista(k, l, o);
o.setArista(l, p, d);
p.setArista(o, d);


let grafo = new Grafo(entrada1);
console.log(grafo);

window.grafo = grafo;

export default grafo;