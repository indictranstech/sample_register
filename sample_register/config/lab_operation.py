from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("Tools"),
			"icon": "icon-wrench",
			"items": [
				{
					"type": "doctype",
					"name": "TRB Session",
					"label": _("TRB Session - Create Batch"),
					"description": _("Create TRB Session Batch"),
				},
				{
					"type": "doctype",
					"name": "TRB Session Batch",
					"label": _("TRB Session - Update Batch"),
					"description": _("Update TRB Session Batch"),
				},
				{
					"type": "report",
					"name":"TRB Session Report",
					"doctype": "Job Card Creation",
					"is_query_report": True,
				},
			]
		},
		{
			"label": _("Test Result Book"),
			"icon": "icon-star",
			"items": [
				{
					"type": "doctype",
					"name": "Water Content Test",
					"description": _("Water Content Test"),
				},
				{
					"type": "doctype",
					"name": "Neutralisation Value Test",
					"description": _(" Neutralisation Value Test"),
				},
				{
					"type": "doctype",
					"name": "Flash point by Penskey Martin",
					"description": _(" Flash point by Penskey Martin"),
				},
				{
					"type": "doctype",
					"name": "Interfacial Tension Test",
					"description": _("Interfacial Tension Test"),
				},
				{
					"type": "doctype",
					"name": "Furan Content",
					"description": _("Furan Content Test"),
				},
				{
					"type": "doctype",
					"name": "Dissolved Gas Analysis",
					"description": _("Dissolved Gas Analysis"),
				},
			]
		},

	]