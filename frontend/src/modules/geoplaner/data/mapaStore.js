import { defineStore } from 'pinia'
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { DrawAreaSelection } from '@bopen/leaflet-area-selection'
import { invertLatLng } from "../utils/tools"
import { createResource } from 'frappe-ui'

export const mapaStore = defineStore('mapa', {
    state: () => ({
        title: 'GeoPlaner',
        mapaGeneral: {},

        historyEditPolygon:[],
        drawPolygon: {},
        ubigeoID: '',
        latlngAreaDraw: {},
        areaSelection: {},
        createBtn: false,
        saveBtn: false,
        editBtn: false,
        classMap: {},
        polygonEdit: {},
        polygonCoordinatesEdit: {}
    }),
    actions: {
        drawAreaSelectionMap() {
            this.areaSelection = new DrawAreaSelection({
                onPolygonReady: (polygon) => {
                    this.drawPolygon = polygon
                    this.latlngAreaDraw = JSON.stringify(polygon.toGeoJSON(3), undefined, 2)
                    this.classMap.polygon.push(polygon)
                },
                onPolygonDblClick: (polygon, control, ev) => {
                },
                onButtonActivate: () => {
                    this.saveBtn = true
                    this.createBtn = false
                    this.editBtn = false
                },
                onButtonDeactivate: (polygon) => {
                    this.saveBtn = true
                    this.createBtn = false
                    this.editBtn = false
                },
            })
            this.mapaGeneral.addControl(this.areaSelection)
            this.classMap.controls.push(this.areaSelection)
        },
        async saveLatlngSelectionDraw() {
           
            try {
                const geometry = JSON.parse(this.latlngAreaDraw)
                if (Object.entries(geometry).length === 0) {
                    return
                }
                let post = await createResource({
                    url: 'lastmille.api.saveGeoHistory',
                    params: {
                        ubigeo: this.ubigeoID,
                        geojson: this.latlngAreaDraw
                    }
                })
                const result = await post.fetch()
                
                return result
            } catch (error) {
                return error.message
            }

        },
        editSelectionDraw() {

            this.mapaGeneral.removeLayer(this.polygonEdit)
            this.drawAreaSelectionMap()

            const brect = this.mapaGeneral.getContainer().getBoundingClientRect();
            const points = []
            const coordinates = this.polygonCoordinatesEdit

            for (let i = 0; i < coordinates.length - 1; i++) {
                let point = this.mapaGeneral.latLngToContainerPoint([coordinates[i][1], coordinates[i][0]]);
                points.push(point)
                this.mapaGeneral.fire("as:point-add",
                    new MouseEvent("click", {
                        clientX: point.x + brect.left,
                        clientY: point.y + +brect.top
                    })
                )
            }
            this.saveBtn = true
            this.createBtn = false
            this.editBtn = false
        },
        centerMap() {
            if(this.classMap.polygon.length){
                let center = this.classMap.polygon[0].getCenter()
                this.mapaGeneral.flyTo(center, 11)
            }
        },
    },
    getters: {

   
    }
})

