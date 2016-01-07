
frappe.provide("sample_register.sample_register");
cur_frm.add_fetch('customer','customer_name','customer_name');
cur_frm.add_fetch('customer','customer_code','customer_code');



frappe.ui.form.on("Contract", "closing_date", function(frm,doctype,name) {
	if(frm.doc.closing_date && frm.doc.start_date){
		var closing_date = new Date(frm.doc.closing_date);
		var order_date = new Date(frm.doc.start_date);
		if(closing_date<order_date){
			msgprint("Contract Closing Date must be greater than order date");
                        validated = false;
               }
	}

});
frappe.ui.form.on("Contract", "start_date", function(frm,doctype,name) {
	if(frm.doc.closing_date && frm.doc.start_date){
		var closing_date = new Date(frm.doc.closing_date);
		var order_date = new Date(frm.doc.start_date);
		if(order_date>closing_date){
			msgprint("Contract Start Date must be small than Closing Date");
                        validated = false;
                }
	}

});
frappe.ui.form.on("Contract", "validate", function(frm,doctype,name) {
	if(frm.doc.closing_date && frm.doc.start_date){
		var closing_date = new Date(frm.doc.closing_date);
		var order_date = new Date(frm.doc.start_date);
		if(order_date>closing_date){
			msgprint("Contract Start Date must be small than Closing Date");
                        validated = false;
                }
	}

});

// Method to get address details
cur_frm.cscript.admin_address = function(doc,cdt,cdn){

	erpnext.utils.get_address_display(this.frm, "admin_address","admin_address_details");
}


//frappe call for retriveing administrative contact details and setting all details to a field
cur_frm.cscript.administrative_contact = function(doc,cdt,cdn){
	frappe.call({
			method:"erpnext.crm.doctype.order_register.order_register.get_contact_details",
			args:{"contact": doc.administrative_contact},
			callback: function(r) {
				if (r.message){
					doc.administrative_contact_details = (r.message['contact_display'] + '<br>' + r.message['contact_person'] + '<br>' + r.message['contact_email'] + '<br>' + r.message['contact_mobile'] + '<br>' + r.message['contact_personal_email'])
					refresh_field('administrative_contact_details')
				}
				
			}
		});

}


//frappe call for retriveing billing contact details and setting all details to a field
cur_frm.cscript.billing_contact = function(doc,cdt,cdn){
	frappe.call({
			method:"erpnext.crm.doctype.order_register.order_register.get_contact_details",
			args:{"contact": doc.billing_contact},
			callback: function(r) {
				if (r.message){
					doc.billing_contact_details = (r.message['contact_display'] + '<br>' + r.message['contact_person'] + '<br>' + r.message['contact_email'] + '<br>' + r.message['contact_mobile'] + '<br>' + r.message['contact_personal_email'])
					refresh_field('billing_contact_details')
				}
				
			}
		});

}


// Return query for getting administrative contact name in link field
cur_frm.fields_dict['administrative_contact'].get_query = function(doc) {
	return {
		filters: {
			
			"admin_contact": 1,
			"customer": doc.customer
		}
	}
}

// Return query for getting billing contact name in link field
cur_frm.fields_dict['billing_contact'].get_query = function(doc) {
	return {
		filters: {
			
			"billing_contact": 1,
			"customer": doc.customer

		}
	}
}


// Return query for getting admin address details
cur_frm.fields_dict['admin_address'].get_query = function(doc) {
	return {
		filters: {
			
			"address_type": 'Administrative',
			"customer": doc.customer
		}
	}
}
//create work order
frappe.ui.form.on("Contract", "refresh", function(frm,doctype,name) {

		cur_frm.add_custom_button(__('Create Work Order'),
			cur_frm.cscript.make_work_order, frappe.boot.doctype_icons["Quotation"],
			"btn-default");
});


sample_register.sample_register.Contract = frappe.ui.form.Controller.extend({
	make_work_order: function() {
		frappe.model.open_mapped_doc({
			method: "sample_register.sample_register.doctype.contract.contract.make_work_order",
			frm: cur_frm
		})
	}
});
$.extend(cur_frm.cscript, new sample_register.sample_register.Contract ({frm: cur_frm}));

