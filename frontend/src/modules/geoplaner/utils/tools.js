import L from "leaflet"

export const cleanJson = (jsonData) => {
    return JSON.parse(jsonData.replace(/\\"/g, '"'));
}

export const latLng = (data) => {
    let dep = formatNumber(data.dep.value)
    let prov = formatNumber(data.prov.value)
    let dist = formatNumber(data.dist.value)
    return dep + prov + dist
}

export const formatNumber = (numero) => {
    let numeroFormateado = numero.toString().padStart(2, '0')
    return numeroFormateado
}

export const invertLatLng = (coordinates) => {
    let invertedCoordinates = []

    for (let i = 0; i < coordinates.length; i++) {
        let latLng = L.latLng(coordinates[i][1], coordinates[i][0])
        invertedCoordinates.push([latLng.lat, latLng.lng])
    }

    return invertedCoordinates
}