/**
* makeLabel ();
* @param String fs_str
* @return Object Element
*/
function makeLabel (fs_str)
{
	return document.createTextNode (fs_str);
}
/**
* makeElement ();
* @param String fs_type 
* @param Object fo_data
* @return Object $ls_htmlTag;
*/
function makeElement (fs_type, fo_data, fo_val) 
{

	var ls_type; 	var ls_htmlTag = '';
	// Storing html elements into JS object
	var lo_tags = {"0":"text", "1":"button", "2":"reset", "3":"submit", "4":"hidden", "5":"password", "6":"radio", "7":"checkbox"};
	for (ls_tag in lo_tags) {
		if (lo_tags[ls_tag] == fs_type) 
			ls_type = lo_tags[ls_tag];
	}
	switch (fs_type)
	{
		case "form":
			var ls_formTag = document.createElement (fs_type);
			// #Set attributes for <form>
			if (fo_data != null) {
				for (ls_attr in fo_data) 
					ls_formTag.setAttribute (ls_attr, fo_data[ls_attr]);
			}
			ls_htmlTag = ls_formTag;
			break;
		// Creating form all elements
		case "input" :

			// Creating input element
			var ls_inputTag = document.createElement ("input");
			ls_inputTag.setAttribute ("type", fs_type);
			// #set attributes for input tag
			if (fo_data != null) {
				for (ls_attr in fo_data) 
					ls_inputTag.setAttribute (ls_attr, fo_data[ls_attr]);
			}
			ls_htmlTag = ls_inputTag;

			break;
		case "textarea":
			var ls_inputTag = document.createElement (fs_type);
			// #set attributes for input tag
			if (fo_data != null) {
				for (ls_attr in fo_data) 
					ls_inputTag.setAttribute (ls_attr, fo_data[ls_attr]);
			}
			ls_htmlTag = ls_inputTag;
			break;
		case "select":
			// Creating <select>
			var ls_selectTag = document.createElement (fs_type);
			var ls_optionTag = document.createElement ("option");
			if (fo_data != null) {
				for (ls_attr in fo_data) 
					ls_selectTag.setAttribute (ls_attr, fo_data[ls_attr]);
			}
			// Checking multiple attribute
			if (fo_data["multi"] == "multiple") 
				ls_selectTag.setAttribute ("multiple"," multiple");
			// Looping for getting <option>


			for (ls_optVal in fo_val) {
				var ls_optionTag = document.createElement ("option");
					
					ls_optVal = ls_optVal.split(":::");
					//console.log(ls_optVal[0]);
					//console.log('hii');
					//console.log(ls_optVal[1]);
				
				if(ls_optVal[1]==='selected'){
					ls_optionTag.setAttribute ("value",ls_optVal[0]);
					ls_optionTag.setAttribute ("selected","selected");
					// Creating text node for <option>
					ls_optionTag.appendChild (document.createTextNode (ls_optVal[0]));
					// Appending <option> to <select>
					ls_selectTag.appendChild (ls_optionTag);
				
				}else{
					ls_optionTag.setAttribute ("value", fo_val[ls_optVal]);
					// Creating text node for <option>
					ls_optionTag.appendChild (document.createTextNode (ls_optVal[0]));
					// Appending <option> to <select>
					ls_selectTag.appendChild (ls_optionTag);

				}

			}
			ls_htmlTag = ls_selectTag;
			break;

		case "table":
			// Creating <table>
			var ls_tableTag = document.createElement (fs_type);
			if (fo_data != null) {
				for (ls_attr in fo_data) 
					ls_tableTag.setAttribute (ls_attr, fo_data[ls_attr]);
			}
			ls_htmlTag = ls_tableTag;
			break; 

		case  "div":
			// Creating <div>
			var ls_divTag = document.createElement (fs_type);
			if (fo_data != null) {
					for (ls_attr in fo_data) 
						ls_divTag.setAttribute (ls_attr, fo_data[ls_attr]);
			}
			else 
				ls_htmlTag = "Attributes are not found";
			ls_htmlTag = ls_divTag;
			break;
			default:
				var ls_tag = document.createElement (fs_type);
				
				if (fo_data != null) {
					for (ls_attr in fo_data) 
						ls_tag.setAttribute (ls_attr, fo_data[ls_attr]);
			}
			else 
				ls_htmlTag = "Attributes are not found";
				
				ls_htmlTag = ls_tag;
				break;
	}
	return ls_htmlTag;
}

/**
* makeSubElement ();
* 
* @param String fs_tableTag
* @param String fs_trTag
* @param String fs_colTag
* @param Integer fi_cnt
*
* @return Object fs_tableTag
*/
function makeSubElement (fs_tableTag, fs_trTag, fs_colTag, fi_rows, fi_cols)
{
	//alert(typeof (Number (fi_rows)));
	// Creating <font>
	var ls_fontTag = document.createElement ("font");
	ls_fontTag.setAttribute ("color", "red");
	// checking the value is number or not
	if (fi_rows == null || fi_rows == "") {
		// Creating text node to n<font>
		ls_fontTag.appendChild (document.createTextNode ("# Error: Given Parametrs of "+ fs_tableTag+ " are not valid"));
		fs_tableTag = ls_fontTag;
	}else {
		// Checking column type 
		if (fs_colTag == "th" ) {
			// Creating <tr>
			var ls_trTag = document.createElement (fs_trTag);
			// Looping for headings
			for (var li_m=0; li_m<fi_rows; li_m++) {
				// Creating <td>
				var ls_colTag = document.createElement (fs_colTag);
				// Creating text fof <td>
				ls_colTag.appendChild (document.createTextNode ("Head "+  li_m));
				// Appending <td> to <tr.
				ls_trTag.appendChild (ls_colTag);
			}
			// Appending <tr> to <table>
			fs_tableTag.appendChild (ls_trTag);
		}else if (fi_cols == null || fi_cols == "") {
			// Creating text node to n<font>
			ls_fontTag.appendChild (document.createTextNode ("# Error: Given Parametrs of "+ fs_tableTag+ " are not valid"));
			fs_tableTag = ls_fontTag;
		}else {
			// Looping for getting rows and columns
			for (var li_m=0; li_m<fi_rows; li_m++) {
				// Creating <tr>
				var ls_trTag = document.createElement (fs_trTag);
				// Loooping for getting columns
				for (var li_n=0; li_n<fi_cols; li_n++) {
					// Creating <td>
					var ls_colTag = document.createElement (fs_colTag);
					// Creating text node for <td>
					ls_colTag.appendChild (document.createTextNode ("col "+ li_m+","+li_n));
					// Appending <td> to <tr>
					ls_trTag.appendChild (ls_colTag);
				}
				// Appending <tr> to <table>
				fs_tableTag.appendChild (ls_trTag);
			}
		}
	}
	return fs_tableTag;
}

