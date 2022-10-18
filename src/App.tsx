import { useEffect, useState } from "react";
import Button from "./components/Button";
import ChargeCard from "./components/ChargeCard";
import style from "./style/App.module.css";
import { Charge } from "./type/charge";
function App() {
  const [chargeList, setChargeList] = useState<Array<Charge>>([]);

  useEffect(() => {
    setChargeList([
      new Charge("Charge 1", 2, 10, 10, "#FF0000"),
      new Charge("Charge 2", 2, 10, 10, "#00FF00"),
      new Charge("Charge 3", 2, 10, 10, "#0000FF"),
    ]);
  }, []);
  return (
    <div className={style.app}>
      <div className={style.leftPanel}>
        {chargeList.map((charge) => (<ChargeCard charge={charge} />))}
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button text="Add new charge" icon="plus" onClick={() => {}} />
        </div>
      </div>
      <div className={style.rightPanel}>Test 2</div>
    </div>
  );
}

export default App;
