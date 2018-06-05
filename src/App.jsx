import React from 'react';
import { inject, observer } from 'mobx-react';
import grafoInformado from './GrafoInformado';
@inject('store') @observer
class App extends React.Component {
  handleSubmit(ev) {
    ev.preventDefault();
  }

  cambiarNodoActual(nodo) {
    this.props.store.nodoActual = nodo.destino;
  }



  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.store.primeroElMejor(this.valor.value, false)
          }}
        >
          Distancia
        </button>
        <button
          onClick={() => {
            this.props.store.primeroElMejor(this.valor.value, true)
          }}
        >
          Tiempo
        </button>
        <button onClick={() => this.props.store.colina(this.valor.value)} >
          Colina
        </button>
        <button onClick={() => this.props.store.aEstrella(this.valor.value)} >
          A*
        </button>
        <button onClick={() => this.props.store.costoUniforme(this.valor.value)} >
          Costo uniforme
        </button>
        <button onClick={() => {
          console.log(this.valor.value)
          this.props.store.busquedaProfundidad(this.valor.value)
        }
        }>

          Buscar por profundidad
        </button>
        <input type="text" placeholder="valor a buscar" ref={(input) => this.valor = input} />
        <h1>Actual: {this.props.store.nodoActual.valor}</h1>
        {this.props.store.disponibles.map(nodo => {
          return <button
            onClick={this.cambiarNodoActual.bind(this, nodo)}
          >
            {nodo.destino.valor} : {nodo.peso}
          </button>
        })}
      </div>
    )
  }
}

export default App;