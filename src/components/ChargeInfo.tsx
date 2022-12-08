import { Position } from "../type/canvas"
import { Charge } from "../type/charge"
import { toPointFive } from "../utils/convert"

const renderChargeInfo = (charge: Charge, position: Position) => {
    const divElement = document.createElement("div")
    divElement.id = "chargeinfo-hover"
    divElement.style.display = "flex"
    divElement.style.flexDirection = "column"
    divElement.style.position = "absolute"
    divElement.style.left = position.x + "px"
    divElement.style.top = position.y + "px"
    divElement.style.padding = "10px"
    divElement.style.background = "white"
    divElement.style.borderRadius = "5px"
    divElement.style.boxShadow = "0px 2px 6px rgba(0, 0, 0, 0.22)"
    divElement.innerHTML = `
        <div style="display:flex;">
            <div style="width: 20px;height: 20px;border-radius: 10px;margin-right: .5rem;background:${charge.color}"></div>
            <div style="font-weight: 600">${charge.name}</div>
        </div>
        <div style="padding-top: .25rem">
        X: ${toPointFive(charge.x)} cm Y: ${Math.round(charge.y * 2) / 2} cm Q: ${charge.charge} μC F: ${charge.force.magnitude.toFixed(2)} N
        </div>
    `
    document.body.appendChild(divElement)
}

export { renderChargeInfo }