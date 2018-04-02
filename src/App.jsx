import React from 'react';
import { inject, observer } from 'mobx-react';
@inject('store') @observer
class App extends React.Component {
  handleSubmit(ev) {
    ev.preventDefault();
  }

  cambiarNodoActual(nodo) {
    this.props.store.nodoActual = nodo;
  }

  render() {
    return (
      <div>
        <button 
          onClick={() => {
            this.props.store.busquedaAnchura(this.valor.value)
          }}
        >
          buscar por anchura
        </button>
        <button onClick={() => {
          console.log(this.valor.value)
          this.props.store.busquedaProfundidad(this.valor.value)} 
        }>
        
          Buscar por profundidad
        </button>
        <input type="text" placeholder="valor a buscar" ref={(input) => this.valor = input} />
        <h1>Actual: {this.props.store.nodoActual.valor}</h1>
          {this.props.store.disponibles.map(nodo => {
            return <button
              onClick={this.cambiarNodoActual.bind(this, nodo)}
            >
              {nodo.valor}
            </button>
          })}
      </div>
    )
  }
}

export default App;