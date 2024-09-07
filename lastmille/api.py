from __future__ import unicode_literals

import requests
import json

import frappe
from frappe.model.document import Document
from frappe.utils import now_datetime



@frappe.whitelist(allow_guest=True)
def historyGeoLastMille(ubigeo):

    data = frappe.db.sql("select ubigeo, geojson, date from `tabgeoLastmille` where ubigeo = ubigeo")
    return data

@frappe.whitelist(allow_guest=True)
def saveGeoHistory(ubigeo,geojson):
    current_datetime = now_datetime()
    data = frappe.get_doc({
    'doctype': 'geohistory',
    'ubigeo': ubigeo,
    'geojson': json.dumps(geojson),
    'date': current_datetime
    })
    data.insert()
    return data

@frappe.whitelist(allow_guest=True)
def getGeoHistory(ubigeo):
    current_datetime = now_datetime()
    filters = {
        "ubigeo": ubigeo
    }
    data = frappe.get_list(
        "geohistory", 
        filters=filters, 
        limit=10,
        fields=["name", "ubigeo", "geojson", "date","owner"]
        )
    
    return data

@frappe.whitelist(allow_guest=True)
def get_geo(ubigeo):
    current_datetime = now_datetime()
    filters = {
        "ubigeo": ubigeo
    }
    data = frappe.get_list(
        "geohistory",
        filters=filters,
        limit=1,
        fields=["name", "ubigeo", "geojson", "date","owner"],
        order_by='date desc'
        )

    if len(data) == 0:
        return {"success":False,"message":"No se encontró el poligono."}

    return {"success":True,"message":"Poligono encontrado.","data":data[0]}


@frappe.whitelist(allow_guest=True)
def get_geo_post():

    dataSend = frappe.form_dict.sendData
    values = json.loads(dataSend)

    current_datetime = now_datetime()
    filters = {
        "ubigeo": values.get("ubigeo")
    }
    data = frappe.get_list(
        "geohistory",
        filters=filters,
        limit=1,
        fields=["name", "ubigeo", "geojson", "date","owner"],
        order_by='date desc'
    )

    if len(data) == 0:
        return {"success":False,"message":"No se encontró el poligono."}

    return {"success":True,"message":"Poligono encontrado.","data":data[0]}