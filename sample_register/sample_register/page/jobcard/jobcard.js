frappe.provide('frappe.pages');
frappe.provide('frappe.views');
frappe.provide('sample_register');
frappe.require("assets/frappe/js/lib/slickgrid/slick.grid.js");
frappe.require("assets/frappe/js/lib/slickgrid/slick.grid.css");
frappe.require("assets/frappe/js/lib/slickgrid/slick.core.js");
frappe.require("assets/frappe/js/lib/slickgrid/slick.editors.js");
frappe.require("assets/frappe/js/lib/slickgrid/slick.formatters.js");
frappe.require("assets/frappe/js/lib/slickgrid/plugins/slick.checkboxselectcolumn.js");
frappe.require("assets/frappe/js/lib/slickgrid/plugins/slick.rowselectionmodel.js");
frappe.require("assets/frappe/js/lib/slickgrid/plugins/slick.autotooltips.js");
frappe.require("assets/frappe/js/lib/slickgrid/plugins/slick.cellrangedecorator.js");
frappe.require("assets/frappe/js/lib/slickgrid/plugins/slick.cellrangeselector.js");
frappe.require("assets/frappe/js/lib/slickgrid/plugins/slick.cellcopymanager.js");
frappe.require("assets/frappe/js/lib/slickgrid/plugins/slick.cellexternalcopymanager.js");
frappe.require("assets/frappe/js/lib/slickgrid/plugins/slick.cellselectionmodel.js");
frappe.require("assets/frappe/js/lib/slickgrid/plugins/slick.rowselectionmodel.js");
frappe.require("assets/frappe/js/lib/slickgrid/plugins/slick.cellselectionmodel.js");


frappe.pages['jobcard'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Job Card Creation',
		single_column: true
	});
	var options = {
		doctype: "Sample Entry Register",
		parent: page
	};
	$("<table width='100%>\
  <tr>\
    <td valign='top' width='50%'>\
      <div id='myGrid' style='width:100%;height:500px;''></div>\
    </td>\
  </tr>\
</table>").appendTo($(wrapper).find('.layout-main-section'));
	setTimeout(function(){
		new new sample_register.JobCard(options, wrapper, page);	
	}, 1)
	frappe.breadcrumbs.add("Sample Register");

}

sample_register.JobCard = Class.extend({
	init: function(opts, wrapper,page) {
		$.extend(this, opts);
		this.make_filters(wrapper);
		this.prepare_data();
			this.page.main.find(".page").css({"padding-top": "0px"});
	//this.page.add_menu_item(__("Create Job"), function() {this.create_job();	}, true);
	},
	make_fun: function(){
            this.page.set_title(__("Dashboard") + " - " + __("Job Card Creation"));

     },
    make: function(){
        this._super();
        this.make_fun();
    },
    make_filters: function(wrapper){
		var me = this;
		this.page = wrapper.page;
		this.page.set_primary_action(__("Create Job Card"),
			function() { me.refresh(); }, "icon-refresh")
		this.page.add_menu_item(__("Set Priority"), function() {me.set_priority_data();	}, true);
		this.page.add_menu_item(__("Set Standard"), function() {me.set_standards_data();	}, true);
		this.page.add_menu_item(__("Set Priority & Standard"), function() {me.set_sample_data();	}, true);
		this.page.add_menu_item(__("Refresh"), function() { location.reload(); }, true);


		// this.sample_entry_register = this.page.add_field({fieldtype:"Link", label:"Sample Entry Register",
		// fieldname:"sample_entry_register", options:"Sample Entry Register"});
		// this.with_job_card = this.page.add_field({fieldtype:"Check", label:"With Job Card",
		// 	fieldname:"with_job_card"});
		// this.with_job_card.$input.on("change", function() {
		// 	with_job=$(this).prop("checked")
		// 	msgprint(with_job);
		// 	var data = [];
		// 	grid.setData(data);
		// 	grid.render();   wokring

		// 	//data with and without job

		// 	 frappe.call({
		// 		method: "sample_register.sample_register.page.jobboard.jobboard.get_sample_data",
		// 		type: "GET",
		// 		args: {
		// 			args:{

		// 			}
		// 		},
		// 		callback: function(r){
		// 			if(r.message){
		// 				me.data = r.message;
		// 				me.make_grid(r.message,columns,options)
		// 				//me.waiting.toggle(false);

		// 			}
		// 		}
		// 	});
		// 	//data with and without job end

		// });
	},
//job function

//job function end
     create_job: function(){
    	frappe.msgprint("Creating job in JobCard")
     },

	filters: [

		//{fieldtype:"Link", label: __("Sample Entry Register"),options:"Sample Entry Register"}
	],

	setup_columns: function() {
		var std_columns = [];
		//this.make_date_range_columns();
		//this.columns = std_columns;
	},
	check_formatter: function(row, cell, value, columnDef, dataContext) {
		return repl('<input type="checkbox" data-id="%(id)s" \
			class="plot-check" %(checked)s>', {
				"id": dataContext.id,
				"checked": dataContext.checked ? 'checked="checked"' : ""
			})
	},
	set_sample_data: function(){
		//sample data entry start
		var me = this;
		var selectedData = [],
		selectedIndexes;
		selectedIndexes = grid.getSelectedRows();
		jQuery.each(selectedIndexes, function (index, value) {
		selectedData.push(grid.getDataItem(value));
		});
	 	var d = frappe.prompt([
	    {label:__("Priority"), fieldtype:"Select",options: ["1-Emergency","2-Urgent", "3-Normal"],fieldname:"priority",'reqd': 1},
	    {fieldtype: "Column Break"},
	    {label:__("Standards"), fieldtype:"Link",options: "Standard",fieldname:"standards", 'reqd': 1},
	    {fieldtype: "Section Break"},
	    {'fieldname': 'test', 'fieldtype': 'HTML',options: "", 'label': 'test', 'reqd': 0},
		],
		function(values){
		    var c = d.get_values();
			var me = this;
		     frappe.call({
					method: "sample_register.sample_register.page.jobboard.jobboard.set_sample_data",
					 args: {
					 	"priority": c.priority,
					 	"standards": c.standards,
					 	"selectedData":selectedData
					 },	
					callback: function(r) {
	  				  location.reload();				}
				});

		},
		'Select Test',
		'Submit'
		);
		//sample data entry end
	},
	//set priority
	set_priority_data: function(){
		var me = this;
		var selectedData = [],
		selectedIndexes;
		selectedIndexes = grid.getSelectedRows();
		jQuery.each(selectedIndexes, function (index, value) {
		selectedData.push(grid.getDataItem(value));
		});
		var d = frappe.prompt([
		{label:__("Priority"), fieldtype:"Select",options: ["1-Emergency","2-Urgent", "3-Normal"],fieldname:"priority",'reqd': 1},			],
		function(values){
		    var c = d.get_values();
			var me = this;
		     frappe.call({
					method: "sample_register.sample_register.page.jobboard.jobboard.set_priority_data",
					 args: {
					 	"priority": c.priority,
					 	"selectedData":selectedData
					 },	
					callback: function(r) {
	  				  location.reload();				}
				});

		},
		'Select Test',
		'Submit'
		);
	},
	//set priority end

	//set standards
	set_standards_data: function(){
		var me = this;
		var selectedData = [],
		selectedIndexes;
		selectedIndexes = grid.getSelectedRows();
		jQuery.each(selectedIndexes, function (index, value) {
		selectedData.push(grid.getDataItem(value));
		});
		var d = frappe.prompt([
	    {label:__("Standards"), fieldtype:"Link",options: "Standard",fieldname:"standards", 'reqd': 1},
			],
		function(values){
		    var c = d.get_values();
			var me = this;
		     frappe.call({
					method: "sample_register.sample_register.page.jobboard.jobboard.set_standards_data",
					 args: {
					 	"standards": c.standards,
					 	"selectedData":selectedData
					 },	
					callback: function(r) {
	  				  location.reload();				}
				});

		},
		'Select Test',
		'Submit'
		);
	},
	//set standards end
	refresh: function(){
		//this.check_mandatory_fields()
		var me = this;
		// msgprint(me.with_job_card);
		//this.waiting.toggle(true);
		//msgprint(this.page.fields_dict.sample_entry_register.get_parsed_value());
		//msgprint(grid);
		//test selection

		var selectedData = [],
		selectedIndexes;
		selectedIndexes = grid.getSelectedRows();
		jQuery.each(selectedIndexes, function (index, value) {
		selectedData.push(grid.getDataItem(value));
		});
			//msgprint(selectedData);
			//msgprint("selected samples are:");
			// for(r in selectedData){
			 	//msgprint(selectedData[0]["sampleid"])   //print selected sample id
			// }
			//msgprint(selectedData[0]["sampleid"]);  //selected data contains row data of currently selected checkbox
           // var rows = grid.getData();
            //msgprint(rows[0]["sampleid"]);
           // msgprint(rows[1]["sampleid"]);
            //msgprint(rows[2]["sampleid"]);
            //msgprint(rows);

	        //for (r in rows) {
	         //       msgprint(rows[r]["sampleid"]); //print all sample id
	         //   }
        
		    
		 // frappe prompt box code
		 var d = new frappe.prompt([
		    {label:__("Test Group"), fieldtype:"Link",
							options: "Test Group",
							fieldname:"test_group"},
		    {fieldtype: "Column Break"},
		    {'fieldname': 'select_test', 'fieldtype': 'HTML',options: "Select Test Group<br>", 'label': 'Select Test', 'reqd': 0},
		    {fieldtype: "Section Break"},
		   // {'fieldname': 'comment', 'fieldtype': 'Text', 'label': 'Selected Test', 'reqd': 1},
		    {'fieldname': 'test', 'fieldtype': 'HTML', 'label': 'test', 'reqd': 0},
		    {fieldtype: "Section Break"},
		  //  {'fieldtype': 'Button',	'label': __('Add')}, 
			],
			function(values){
			    var c = d.get_values();
				var me = this;
			   //submision of prompt box
		        var test_list = [];
		        //test_list.push("test_1");
		        //test_list.push("test_2");
		        //test_list.push("test_3");
		        //msgprint(test_list);

		        //var test_list_1 = [];
				$(".frappe-control input:checkbox:checked").each ( function() {
					test_list.push($(this).val());
		 	//alert ( $(this).val() );
				});


	   //getting check test
       //msgprint(c.test_group)
       //msgprint(selectedData)
        //create job card against each sample
	     frappe.call({
				method: "sample_register.sample_register.page.jobboard.jobboard.create_job_card_1",
				 args: {
				 	"test_group": c.test_group,
				 	"selectedData":selectedData,
				 	"test_list_unicode":test_list
				 },	
				callback: function(r) {
				if (cur_frm) {
							cur_frm.reload_doc();
						}
				}
			});

	  //   return frappe.call({
			// 	method: "sample_register.sample_register.page.jobboard.jobboard.create_job_card",
			// 	 args: {
			// 	 	"test_group": c.test_group
			// 	 },	
			// 	callback: function(r) {
			// 	if (cur_frm) {
			// 				cur_frm.reload_doc();
			// 			}
			// 	}
			// });
	},
	'Select Test',
	'Submit'
	);
		d.get_input("test_group").on("change", function() {
		var test_group = d.get_value("test_group");
//get test data

		 frappe.call({
			method: "sample_register.sample_register.page.jobboard.jobboard.get_test_data",
			type: "GET",
			args: {
				"test_group": test_group
			},
			callback: function(r){
				if(r.message){
					me.test_data = r.message;

				// $.each(r.message, function(idx, val){
				// 	 $("<input type='checkbox' name='"+val[0]+"' value='Bike'>"+val[0]+"<br>").appendTo(d.fields_dict.test.wrapper);
				// });

				//for loop to apend data
					// d.fields_dict.test.wrapper=" "
					// $('<div id="id1"></div>').appendTo(d.fields_dict.test.wrapper);
					// $( "#id1" ).replaceWith('<div id="id1"></div>');
					 //$( "#id1" ).empty();
					//$("#id1").text("d");
					// $(".frappe-control input:checkbox:checked").each ( function() {
					// test_list.push($(this).val());
				 // 	//alert ( $(this).val() );
					// 	});
                    //remove allready checked checkbox for test
					$('.frappe-control input:checkbox').removeAttr('checked');
					 // html = '<div id="id1">'
				  //   for (var i = 0; i<r.message.get_test_data.length; i++) {
				  //   	  html += "<input type='checkbox' class='select' id='_select' name='"+r.message.get_test_data[i][0]+"' value='"+r.message.get_test_data[i][0]+"'>"+r.message.get_test_data[i][0]+"<br>"
				  //   	// $("<input type='checkbox' class='select' id='_select' name='"+r.message.get_test_data[i][0]+"' value='"+r.message.get_test_data[i][0]+"'>"+r.message.get_test_data[i][0]+"<br>").appendTo( "#id1" );
				  //   	// $("<input type='checkbox' class='select' id='_select' name='"+r.message.get_test_data[i][0]+"' value='"+r.message.get_test_data[i][0]+"'>"+r.message.get_test_data[i][0]+"<br>").appendTo(d.fields_dict.test.wrapper);
				  //   }
				  //   html += '</div>'	
				    html=""
				    html += '<div class="testCont"  style="max-height: 200px;overflow: auto;overflow-x: hidden;min-height:150px">'
				    for (var i = 0; i<r.message.get_test_data.length; i=i+2) {
				    	// html += "<input type='checkbox' class='select' id='_select' name='"+r.message.get_test_data[i][0]+"' value='"+r.message.get_test_data[i][0]+"'>"+r.message.get_test_data[i][0]+"<br>"
				    	html += "<div class='row'>  <div class='col-sm-6'>"
				    	html += "<input type='checkbox' class='select' id='_select' name='"+r.message.get_test_data[i][0]+"' value='"+r.message.get_test_data[i][0]+"'>"+r.message.get_test_data[i][0]+ "</div>"
						html +=	 "<div class='col-sm-6'>"
						if(r.message.get_test_data[(i + 1)]){
							j=i+1;
				    		html +=	 "<input type='checkbox' class='select' id='_select' name='"+r.message.get_test_data[j][0]+"' value='"+r.message.get_test_data[j][0]+"'>"+r.message.get_test_data[j][0]+ "</div> </div>"
				    	}
				    }

				   //  for (var i = 0; i<r.message.get_test_data.length; i++) {
							// 	  <div class="row">\
							// 	    <div class="col-sm-6">\
				   //  	  html += "<input type='checkbox' class='select' id='_select' name='"+r.message.get_test_data[i][0]+"' value='"+r.message.get_test_data[i][0]+"'>"+r.message.get_test_data[i][0]+"<br>"
							// 	    </div>\
							// 	    <div class="col-sm-6">\
				   //  	  html += "<input type='checkbox' class='select' id='_select' name='"+r.message.get_test_data[i][0]+"' value='"+r.message.get_test_data[i][0]+"'>"+r.message.get_test_data[i][0]+"<br>"
							// 	    </div>\
							// 	  </div>\
							// </div>'
				   //  }
				   html += '</div>'	
				 //end of for loop to apend data
                  	var wrapper = d.fields_dict.test.$wrapper;
                  	wrapper.empty();
					wrapper.html(html);
					// html.appendTo
				  // $("#id1").html(html);

				 //apend selected sample
				 selected_sample_html="<p>Selected sample to perform Test: </p>"
				  for(r in selectedData){
			       selected_sample_html+="<p>"+selectedData[r]["sampleid"]+"</p>"
			    }

				var wrapper_sample = d.fields_dict.select_test.$wrapper;
				wrapper_sample.html(selected_sample_html);
				// $('<div id="id2"></div>').appendTo(d.fields_dict.select_test.wrapper);
				// $( "#id2" ).replaceWith('<div id="id2"><p>Selected sample to perform Test: </p></div>');
			 //    for(r in selectedData){
			 //       $("<p>"+selectedData[r]["sampleid"]+"</p>").appendTo("#id2");
			 //    }
				 //end of apend seleted sample

				}
			}
		});
//end of get test data
		return false;
	});

		 // end of frappe prompt box code
		//test selection
	},

	prepare_data: function() {
		var me = this;
	//slick start
        function requiredFieldValidator(value) {
            if (value == null || value == undefined || !value.length) {
                return {valid: false, msg: "This is a required field"};
            } else {
                return {valid: true, msg: null};
            }
        }
		var columns = [];
		  var options = {
		    enableCellNavigation: true,
		    enableColumnReorder: false,
		    showHeaderRow: true,
		    headerRowHeight: 30,
		    explicitInitialization: true, //shoud be true
		    multiColumnSort: true,
		  };
		  var columnFilters = {};

		  //   function myFilter(item) {
		  //   for (var columnId in columnFilters) {
		  //     if (columnId !== undefined && columnFilters[columnId] !== "") {
		  //       var c = grid.getColumns()[grid.getColumnIndex(columnId)];
		  //       if (item[c.field] != columnFilters[columnId]) {
		  //         return false;
		  //       }
		  //     }
		  //   }
		  //   return true;
		  // }



		var grid;
  		var data=[];
			 frappe.call({
				method: "sample_register.sample_register.page.jobboard.jobboard.get_sample_data",
				type: "GET",
				args: {
					args:{

					}
				},
				callback: function(r){
					if(r.message){
						me.data = r.message;
						me.make_grid(r.message,columns,options)
						//me.waiting.toggle(false);

					}
				}
			});
 //this.wrapper.find('[type="checkbox"]').attr(data-id, '3');
//$(".plot-check").hide() 
  //slick end

	

		//this.data = [total_tickets, days_to_close, hours_to_close, hours_to_respond];
	},

	//function split to make new grid from frappe.call
	make_grid:function(data1,columns,options){

			$(function () {
		    var data = [];

		    for (var i = 0; i<data1.get_sample_data.length; i++) {
		      data[i] = {
		      	id: ""+i+" ",
		      	checked:true,
		        sampleid: data1.get_sample_data[i][1],
		        customer: data1.get_sample_data[i][2],
		        type: data1.get_sample_data[i][3],
		        priority: data1.get_sample_data[i][4],
		        standard: data1.get_sample_data[i][5],
		        test_group: data1.get_sample_data[i][6]
		      };
		    }
		    grid = new Slick.Grid("#myGrid", data, columns, options);
		    
		        var checkboxSelector = new Slick.CheckboxSelectColumn({
      			cssClass: "slick-cell-checkboxsel"
   				 });
    			columns.push(checkboxSelector.getColumnDefinition());
			      columns.push(
    {id: "id", name: "Sr.No", field: "id", minWidth:5},
    {id: "sample_id", name: "Sample Id", field: "sampleid", minWidth:120},
    {id: "customer", name: "Customer", field: "customer",minWidth:200},
    {id: "type", name: "Type", field: "type",minWidth:120},
    {id: "priority", name: "Priority", field: "priority",minWidth:120},
    {id: "standard", name: "Standard", field: "standard",minWidth:120}
    // {id: "test_group", name: "Test Group", field: "test_group",minWidth:120}
			       );



			// grid = new Slick.Grid("#myGrid", data, columns, options);	


  var columnFilters = {};

	        dataView = new Slick.Data.DataView();

   			grid = new Slick.Grid("#myGrid", dataView, columns, options);

  //  	  function filter(item) {
  //   for (var columnId in columnFilters) {
  //     if (columnId !== undefined && columnFilters[columnId] !== "") {
  //       var c = grid.getColumns()[grid.getColumnIndex(columnId)];
  //       if (item[c.field] != columnFilters[columnId]) {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // }
  		  function filter(item) {
        // Regex pattern to validate numbers
        var patRegex_no = /^[$]?[-+]?[0-9.,]*[$%]?$/; // a number negative/positive with decimals with/without $, %

        for (var columnId in columnFilters) {
            if (columnId !== undefined && columnFilters[columnId] !== "") {
                var c = grid.getColumns()[grid.getColumnIndex(columnId)];
                var filterVal = columnFilters[columnId].toLowerCase();
                var filterChar1 = filterVal.substring(0, 1); // grab the 1st Char of the filter field, so we could detect if it's a condition or not

                if(item[c.field] == null)
                    return false;

                // First let see if the user supplied a condition (<, <=, >, >=, !=, <>, =, ==)
                // Substring on the 1st Char is enough to find out if it's a condition or not
                // if a condition is supplied, we might have to transform the values (row values & filter value) before comparing
                // for a String (we'll do a regular indexOf), for a number (parse to float then compare), for a date (create a Date Object then compare)
                if( filterChar1 == '<' || filterChar1 == '>' || filterChar1 == '!' || filterChar1 == '=') {
                    // We found a Condition filter, find the white space index position of the condition substring (should be index 1 or 2)
                    var idxFilterSpace = filterVal.indexOf(" ");

                    if( idxFilterSpace > 0 ) {
                        // Split the condition & value of the full filter String
                        var condition = filterVal.substring(0, idxFilterSpace);
                        filterNoCondVal = columnFilters[columnId].substring(idxFilterSpace+1);

                        // Which type are the row values? We'll convert to proper format before applying the condition
                        // Then apply the condition comparison: String (we'll do a regular indexOf), number (parse to float then compare)
                        if( patRegex_no.test(item[c.field]) ) {                             
                            if( testCondition(condition, parseFloat(item[c.field]), parseFloat(filterNoCondVal)) == false ) 
                                return false;
                        // whatever is remain will be tested as a regular String format     
                        }else {                             
                            if ( testCondition(condition, item[c.field].toLowerCase(), filterNoCondVal.toLowerCase()) == false )
                                return false;
                        }
                    } 
                }else{
                    if (item[c.field].toLowerCase().indexOf(columnFilters[columnId].toLowerCase()) == -1)
                        return false;
                }
            }
        }
        return true;
    }

    dataView.onRowCountChanged.subscribe(function (e, args) {
      grid.updateRowCount();
      grid.render();
    });
    dataView.onRowsChanged.subscribe(function (e, args) {
      grid.invalidateRows(args.rows);
      grid.render();
    });
    $(grid.getHeaderRow()).delegate(":input", "change keyup", function (e) {
      var columnId = $(this).data("columnId");
      if (columnId != null) {
        columnFilters[columnId] = $.trim($(this).val());
        dataView.refresh();
      }
    });
    grid.onHeaderRowCellRendered.subscribe(function(e, args) {
        $(args.node).empty();
        $("<input type='text'>")
           .data("columnId", args.column.id)
           .val(columnFilters[args.column.id])
           .appendTo(args.node);
    });

		    grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow: false}));
		    grid.registerPlugin(checkboxSelector);
		    grid.init();

		    dataView.beginUpdate();

		    dataView.setItems(data);

		    dataView.setFilter(filter);

		    dataView.endUpdate();

		       		    var columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);

		  })


	},
	//new grid end frappe.call
});
