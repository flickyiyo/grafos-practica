import NodosX from './NodosX';
import NodosY from './NodosY';
import NodosRel from './NodosRel';
import NodosValor from './NodosValor';
import NodosAltuar from './NodosAltura';
const Nodos = {};
const keys = Object.getOwnPropertyNames(NodosX);
for (const key of keys) {
  Nodos[key] = {
    x: NodosX[key].x,
    y: NodosY[key].y,
    rels: NodosRel[key],
    valor: NodosValor[key].valor,
    altura: NodosAltuar[key]
  }
}

export default Nodos;