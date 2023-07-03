import { useEffect } from "react";
import axios from "axios";
function apiCotacao() {
  axios
    .get("https://economia.awesomeapi.com.br/json/available/uniq")
    .then((response) => {
      console.log(response.data);
    });
}

function App() {
  useEffect(() => {
    apiCotacao();
  }, []);
  return (
    <>
      <div className="text-center mt-5 text-3xl">Conversão de Moedas</div>
      <div className="row ml-4 grid grid-cols-12">
        <div className="col-span-2">
          <label className="text-sm">Valor</label>
          <input
            type="number"
            id="valor"
            placeholder="0.00"
            className="text-center text-sm border rounded-md border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:shadow-md"
          />
        </div>
        <div className="col-span-2">
          <label className="text-sm">Converter de</label>
          <div>
            <select
              id="moeda 1"
              placeholder="0.00"
              className="text-center text-sm border rounded-md border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:shadow-md"
            >
              <option value=""></option>
              <option value=""></option>
              <option value=""></option>
              <option value=""></option>
              <option value=""></option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
