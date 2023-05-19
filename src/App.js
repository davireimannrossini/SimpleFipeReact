import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';



function App() {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);
  const [fipeInfo, setFipeInfo] = useState(null);

  useEffect(() => {
    buscarMarcas();
  }, []);

  function buscarMarcas() {
    const url = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setMarcas(data);
      })
      .catch(error => console.error(error));
  }

  function buscarModelos(marcaCodigo) {
    const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setModelos(data.modelos);
      })
      .catch(error => console.error(error));
  }

  function buscarAnos(marcaCodigo, modeloCodigo) {
    const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setAnos(data);
      })
      .catch(error => console.error(error));
  }

  function buscarFipeInfo(marcaCodigo, modeloCodigo, anoCodigo) {
    const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos/${anoCodigo}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setFipeInfo(data);
      })
      .catch(error => console.error(error));
  }

  return (
    <div className="container">
      <h2>Consulta de Marcas e Modelos de Carro</h2>

      <div className="spacer"></div>

      {/* FABRICANTE / MARCA */}
      <div className="form-group">
        <label htmlFor="marcas">Selecione a marca do carro:</label>
        <select className="form-control form-select form-select-lg" id="marcas" onChange={(e) => buscarModelos(e.target.value)}>
          <option value="">Selecione o fabricante...</option>
          {marcas.map(marca => (
            <option key={marca.codigo} value={marca.codigo}>{marca.nome}</option>
          ))}
        </select>
      </div>

      {/* MODELO */}
      <div className="form-group">
        <label htmlFor="modelos">Modelos:</label>
        <select className="form-control form-select form-select-lg" id="modelos" disabled={!modelos.length} onChange={(e) => buscarAnos(document.getElementById('marcas').value, e.target.value)}>
          <option value="">Selecione o modelo...</option>
          {modelos.map(modelo => (
            <option key={modelo.codigo} value={modelo.codigo}>{modelo.nome}</option>
          ))}
        </select>
      </div>

      {/* ANO */}
      <div className="form-group">
        <label htmlFor="anos">Anos:</label>
        <select className="form-control form-select form-select-lg" id="anos" disabled={!anos.length} onChange={(e) => buscarFipeInfo(document.getElementById('marcas').value, document.getElementById('modelos').value, e.target.value)}>
          <option value="">Selecione o ano...</option>
          {anos.map(ano => (
            <option key={ano.codigo} value={ano.codigo}>{ano.nome}</option>
          ))}
        </select>
      </div>

      {/* RESULTADO */}
      {fipeInfo && (
        <div className="fipe-info container jumbotron">
          <h4>Informações</h4>
          <table className="table table-striped">
            <tbody>
              <tr>
                <td><span id="tipoVeiculo">Tipo de Veículo: {fipeInfo.TipoVeiculo}</span></td>
              </tr>
              <tr>
                <td><span id="marca">Marca: {fipeInfo.Marca}</span></td>
              </tr>
              <tr>
                <td><span id="modelo">Modelo: {fipeInfo.Modelo}</span></td>
              </tr>
              <tr>
                <td><span id="anoModelo">Ano do Modelo: {fipeInfo.AnoModelo}</span></td>
              </tr>
              <tr>
                <td><span id="combustivel">Combustível: {fipeInfo.Combustivel}</span></td>
              </tr>
              <tr>
                <td><span id="codigoFipe">Código FIPE: {fipeInfo.CodigoFipe}</span></td>
              </tr>
              <tr>
                <td><span id="mesReferencia">Mês de Referência: {fipeInfo.MesReferencia}</span></td>
              </tr>
              <tr>
                <td><span id="valor">Valor: {fipeInfo.Valor}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
