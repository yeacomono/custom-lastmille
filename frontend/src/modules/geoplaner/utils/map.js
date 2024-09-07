import "leaflet/dist/leaflet.css"

import '@bopen/leaflet-area-selection/dist/index.css'
import { DrawAreaSelection } from '@bopen/leaflet-area-selection'

import L from "leaflet"

export default class mapLeft {
    polygon = []
    controls = []
    markers = []
    drawAreas = []
    contents = []
    mapGeneral = {}

    constructor(leafletjs) {
        this.id = leafletjs.id
        this.lat = leafletjs.lat
        this.lng = leafletjs.lng
        this.zoom = leafletjs.zoom
        this.maxZoom = leafletjs.maxZoom
        this.mapGeneral = this.mapGeneral


    }
    get createMap() {
        return this.map()
    }

    map() {
        let coordinates = [this.lat, this.lng]
        let mapDisplay = L.map(this.id).setView(coordinates, this.zoom)

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: this.maxZoom,
            attribution: '&copy; <a href="http://lareael.com">GeoPlaner</a>',
        }).addTo(mapDisplay)
        this.mapGeneral = mapDisplay
        return mapDisplay
    }
    panelCreate() {

    }
    cleanAll() {
        this.mapGeneral.remove()
        this.polygon = []
        this.controls = []
        this.markers = []
        this.drawAreas = []
        this.contents = []
        this.mapGeneral = {}
    }
    cleanMap() {

        const polygon = this.polygon

        for (let i in polygon) {
            this.mapGeneral.removeLayer(polygon[i])
        }
        this.polygon = []

        const controls = this.controls

        for (let i in controls) {
            this.mapGeneral.removeControl(controls[i])
        }
        this.controls = []
    }
    polyAdd(coordinates) {
        return L.polygon(coordinates).addTo(this.mapGeneral)
    }
    mapCenter(polygon) {
        this.mapGeneral.flyTo(polygon.getCenter(), 10, { animate: false })
    }

}   