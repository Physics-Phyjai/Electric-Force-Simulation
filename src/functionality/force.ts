import { Charge } from "../type/charge";
import { Force } from "../type/force";

const findForce = (chargeList: Array<Charge>): Array<Charge> => {
  const data = <Array<Array<Force>>>[];
  for (let i = 0; i < chargeList.length; i++) {
    data[i] = <Array<Force>>[];
  }

  for (let i = 0; i < chargeList.length; i++) {
    for (let j = i + 1; j < chargeList.length; j++) {
      let forceI = Force.of(chargeList[i], chargeList[j]);
      let forceJ = Force.of(chargeList[j], chargeList[i]);
      data[i].push(forceI);
      data[j].push(forceJ);
    }
  }
  for (let i = 0; i < data.length; i++) {
    let force = data[i].reduce(Force.add);

    chargeList[i].setForce(force);
  }
  return chargeList;
};

export { findForce };
