import axios from "axios";
import { useEffect, useState } from "react";
import Input from "./Input";
import moment from "moment";

function ListaMoedasApi(props) {
  const [moedas, setMoedas] = useState("");
  const [moedaDe, setMoedaDe] = useState("");
  const [moedaPara, setMoedaPara] = useState("");
  const [valor, setValor] = useState("1");
  const [dadosParidade, setParidade] = useState({});
  const [erroConversao, setErroConversao] = useState("0");

  const getMoedas = () => {
    axios
      .get("https://economia.awesomeapi.com.br/json/available/uniq")
      .then((response) => {
        const { data } = response;
        setMoedas(data);
        setMoedaDe("BRL");
        setMoedaPara("USD");
      });
  };

  const converter = () => {
    if (moedaDe && moedaPara) {
      axios
        .get(`https://economia.awesomeapi.com.br/last/${moedaDe}-${moedaPara}`)
        .then((response) => {
          const { data } = response;
          setParidade(data);
          setErroConversao(false);
        })
        .catch((error) => {
          setErroConversao(true);
        });
    }
  };
  const inverterMoedas = () => {
    setMoedaDe(moedaPara);
    setMoedaPara(moedaDe);
  };
  const alterarValor = (e) => {
    if (e === "") {
      setValor(0);
    } else {
      setValor(e);
    }
  };

  useEffect(() => {
    getMoedas();
  }, []);

  useEffect(() => {
    converter();
  }, [moedaDe, moedaPara]);
  return (
    <>
      <div className="row ml-4 grid grid-cols-12">
        <div className="col-span-2">
          <label className="text-sm">Valor &nbsp;</label>
          <Input
            type="number"
            id="valor"
            placeholder="0.00"
            min="1"
            step="0.01"
            value={valor}
            onChange={(e) => alterarValor(e.target.value)}
          />
        </div>
        <div className="col-span-3">
          <label className="text-sm">Converter de: &nbsp;</label>
          <select
            onChange={(e) => setMoedaDe(e.target.value)}
            id="moedaDe"
            value={moedaDe}
            className="text-center text-sm border rounded-md border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:shadow-md"
          >
            {Object.keys(moedas).map((moedaCod) => (
              <option key={moedaCod} value={moedaCod}>
                {moedas[moedaCod]}
              </option>
            ))}
          </select>
        </div>
        <button
          className="mr-5 rounded bg-green-400 text-black font-semibold hover:bg-green-500 "
          onClick={inverterMoedas}
        >
          Inverter
        </button>
        <div className="col-span-3">
          <label className="text-sm">Converter para: &nbsp;</label>
          <select
            value={moedaPara}
            onChange={(e) => setMoedaPara(e.target.value)}
            id="moedaPara"
            className="text-center text-sm border rounded-md border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:shadow-md"
          >
            {Object.keys(moedas).map((moedaCod) => (
              <option key={moedaCod} value={moedaCod}>
                {moedas[moedaCod]}
              </option>
            ))}
          </select>
        </div>
        <button
          className="rounded bg-green-400 text-black font-semibold hover:bg-green-500"
          onClick={converter}
          id="converter"
        >
          Converter
        </button>
      </div>
      <div className="text-center mt-5">
        {!erroConversao &&
          Object.keys(dadosParidade).map((dados) => (
            <p key={dados} value={dados}>
              {valor} de {dadosParidade[dados].code} vale{" "}
              {parseInt(valor) * dadosParidade[dados].bid} de{" "}
              {dadosParidade[dados].codein} <br /> Horário da atualização:{" "}
              {moment(dadosParidade[dados].create_date).format(
                "DD/MM/YYYY H:m:ss"
              )}
            </p>
          ))}
        {erroConversao && <p>Paridade não encontrada pela API</p>}
      </div>
    </>
  );
}
export default ListaMoedasApi;
