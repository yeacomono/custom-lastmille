<template>
  <div id="mapa" class="relative h-[500px] w-full"></div>
</template>
<script>

import '../css/dashboard.css'

import { createResource,toast } from 'frappe-ui'
import { cleanJson, invertLatLng } from '../utils/tools'
import mapLeft from '../utils/map'
import { mapaStore } from '../data/mapaStore'
import { filterStore } from '../data/filterStore'


export default {
  data() {
    return {
      polygonDrawArea: {},
      latlng: {},
      polygonEdit: {},
      polygonCoordinatesEdit: {},
      dataMap: {
        lat: -12.073232554050806,
        lng: -77.01761714441973,
        zoom: 12,
        maxZoom: 25,
        id: 'mapa',
      },
    }
  },
  components: {},
  methods: {
    async loaderMap_LEFT() {
      const map = new mapLeft(this.dataMap)
      this.storeM.classMap = map
      this.storeM.mapaGeneral = map.createMap
      this.storeM.classMap.panelCreate()

    },
    async LoadGeoDistrito(ubigeoId) {
      if (ubigeoId) {
        const classMap = this.storeM.classMap
        const provincia = ubigeoId.substring(4, 0)

        try {
          await import(`../data/geo/${provincia}/${ubigeoId}.json`)
            .then(async (response) => {

              let json = await cleanJson(response.default.geometry)
              let invertedCoordinates = invertLatLng(json.coordinates[0][0])

              console.error("coordinadas_invertidas",invertedCoordinates);

              const polygon = await classMap.polyAdd(invertedCoordinates)

              classMap.polygon.push(polygon)
              classMap.mapCenter(polygon)

              await this.loadDataMap(ubigeoId)

            }).catch((error) => {
              toast({
                title: 'Error',
                text: error.message,
                icon: 'alert-triangle',
                iconClasses: 'text-red-500',
                position: 'top-center',
                timeout: 3,
              })
              return 
            })

        } catch (error) {
          toast({
                title: 'Error',
                text: 'Problemas de conexión',
                icon: 'alert-triangle',
                iconClasses: 'text-red-500',
                position: 'top-center',
                timeout: 3,
              })
          return 
        }

      }
    },
    async loadDataMap(ubigeoID) {

      const classMap = this.storeM.classMap
      const store = this.storeM

      let post = await createResource({
        url: 'lastmille.api.getGeoHistory',
        params: { ubigeo: ubigeoID },
      })
      const data = await post.fetch()

      if (data.length == 0) {
        store.createBtn = true
        return
      }
      const geometry = JSON.parse(data[0].geojson)
      if (Object.entries(geometry).length === 0) {
        store.createBtn = true
        return
      }

      store.historyEditPolygon = data

      store.editBtn = true

      const coordinates = JSON.parse(JSON.parse(data[0].geojson)).geometry.coordinates[0]

      console.error("coordinates", coordinates)

      let invertedCoordinates = invertLatLng(coordinates)
      const polygon = await classMap.polyAdd(invertedCoordinates)

      store.polygonCoordinatesEdit = coordinates
      store.polygonEdit = polygon
      classMap.polygon.push(polygon)
    },
    async cleanAllMap() {
      this.polygonEdit = {}
      const store = this.storeM
      store.createBtn = false
      store.editBtn = false
      store.saveBtn = false
      store.historyEditPolygon = []
      store.classMap.cleanAll()
      await this.loaderMap_LEFT()
    },
  },
  async mounted() {
    await this.loaderMap_LEFT()
    console.log(frappe,'frappe')
  },
  watch: {
    ubigeo(newQuestion, oldQuestion) {
      this.cleanAllMap()
      if (newQuestion) {
        this.storeM.ubigeoID = newQuestion
        this.LoadGeoDistrito(newQuestion)
      }
    },
  },
  computed: {
    ubigeo() {
      return this.storeF.ubigeoSelector
    },
  },
  setup() {
    const storeM = mapaStore()
    const storeF = filterStore()
    return {
      storeM,
      storeF,
    }
  },
}
</script>
