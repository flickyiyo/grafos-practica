import NodosX from './NodosX';
import NodosY from './NodosY';
import NodosRel from './NodosRel';
import NodosValor from './NodosValor';
const Nodos = {};
const keys = Object.getOwnPropertyNames(NodosX);
for (const key of keys) {
  Nodos[key] = {
    x: NodosX[key].x,
    y: NodosY[key].y,
    rels: NodosRel[key],
    valor: NodosValor[key].valor,
  }
}

export default Nodos;