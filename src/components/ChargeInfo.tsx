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
    divElement.style.width = "200px"
    if(position.x + 250 > window.innerWidth) {
        divElement.style.left = (position.x - 210) + "px"
    }
    if(position.y + 100 > window.innerHeight) {
        divElement.style.top = (position.y - 100) + "px"
    }
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
        X: ${toPointFive(charge.x)} cm Y: ${Math.round(charge.y * 2) / 2} cm <br> Q: ${charge.charge} μC F: ${charge.force.magnitude.toFixed(2)} N 
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(${charge.force.getAngle()}deg)">
        <path d="M8.00002 16C7.71669 16 7.47936 15.904 7.28802 15.712C7.09602 15.5207 7.00002 15.2834 7.00002 15V3.82505L2.12502 8.70005C1.92502 8.90005 1.68736 9.00005 1.41202 9.00005C1.13736 9.00005 0.900024 8.90005 0.700024 8.70005C0.500024 8.50005 0.400024 8.26672 0.400024 8.00005C0.400024 7.73338 0.500024 7.50005 0.700024 7.30005L7.30002 0.700048C7.40002 0.600048 7.50836 0.529049 7.62502 0.487049C7.74169 0.445715 7.86669 0.425049 8.00002 0.425049C8.13336 0.425049 8.26269 0.445715 8.38802 0.487049C8.51269 0.529049 8.61669 0.600048 8.70002 0.700048L15.3 7.30005C15.5 7.50005 15.6 7.73338 15.6 8.00005C15.6 8.26672 15.5 8.50005 15.3 8.70005C15.1 8.90005 14.8624 9.00005 14.587 9.00005C14.3124 9.00005 14.075 8.90005 13.875 8.70005L9.00002 3.82505V15C9.00002 15.2834 8.90436 15.5207 8.71302 15.712C8.52102 15.904 8.28336 16 8.00002 16Z" fill="#444"/>
        </svg>
        </div>
    `
    document.body.appendChild(divElement)
}

export { renderChargeInfo }