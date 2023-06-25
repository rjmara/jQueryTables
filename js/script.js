$( function() {
    $("#tableSpace").tabs();
});

// js object for handling table formation
let handleTable = {
    minRows: 1,
    minCols: 1,
    maxRows: 5,
    maxCols: 5,

    deletePrevTable: function() {
        const table = document.getElementById("userTable");
        table.remove()
    },

    createTable: function() {
        var table = document.createElement("table");
        var tabIndex = $("#tabs li").length;
        table.id = "userTable" + tabIndex; 
        
        for (let r = handleTable.minRows - 1; r <= handleTable.maxRows; r++) {
            let row = document.createElement('tr');

            for (let c = handleTable.minCols - 1; c <= handleTable.maxCols; c++) {
                let col = document.createElement('td');
                if (c == handleTable.minCols - 1 && r == handleTable.minRows - 1) {
                    col.innerHTML = " ";
                } else if (c == handleTable.minCols - 1) {
                    col.innerHTML = r;
                    col.style.backgroundColor = "black";
                    col.style.color = "white";
                } else if (r == handleTable.minRows - 1) {
                    col.innerHTML = c;
                    col.style.backgroundColor = "black";
                    col.style.color = "white";
                }
                else {
                    col.innerHTML = c * r;
                }
                row.appendChild(col);
            }
            table.appendChild(row);
        }
        document.getElementById('tableSpace').appendChild(table);
    },

    clearForm: function() {
        $("#appForm").validate().resetForm();
        //document.getElementById("appForm").reset();
        
    }
};

document.getElementById("appForm").addEventListener("submit", function(event){
    event.preventDefault();
    regenerateTable();
});

function regenerateTable() {
  
    var minRowVal = $("#minRowVal").val();
    var minColVal = $("#minColVal").val();
    var maxRowVal = $("#maxRowVal").val();
    var maxColVal = $("#maxColVal").val();
  
    if (minRowVal >= -50 && minColVal >= -50 &&
        maxRowVal <= 50 && maxColVal <= 50 &&
        !(minColVal > maxColVal || minColVal > maxColVal) &&
        (minColVal !== "" && minRowVal !== "" && maxColVal !== "" && maxRowVal !== "") &&
        minRowVal.indexOf(".") == -1 && minColVal.indexOf(".") == -1 && 
        maxRowVal.indexOf(".") == -1 && maxColVal.indexOf(".") == -1
    ) {
        handleTable['minRows'] = minRowVal;
        handleTable['minCols'] = minColVal;
        handleTable['maxRows'] = maxRowVal;
        handleTable['maxCols'] = maxColVal;
        handleTable.clearForm();
        handleTable.createTable();

        var tabIndex = $("#tabs li").length; 
        $("#tabs").append("<li><a class='tabs' href='#userTable" + tabIndex + "'>" + minColVal + ","+ minRowVal + "," + maxColVal + "," + maxRowVal + "<span class='deleteButton'>x</span></a></li>");

        $("#tableSpace").tabs("refresh");
        $("#tableSpace").tabs("option", "active", tabIndex);
    } else {
        handleTable.deletePrevTable();
    }
}

// validation for input values
jQuery.validator.addMethod("greaterThanCol", function(value, element, params) {
    let otherElemValue = $(params).val(); 
    return parseInt(value, 10) >= parseInt(otherElemValue, 10);
});

jQuery.validator.addMethod("greaterThanRow", function(value, element, params) {
    let otherElemValue = $(params).val(); 
    return parseInt(value, 10) >= parseInt(otherElemValue, 10);
});

jQuery.validator.addMethod("isDecimal", function(value, element) {
    return value.indexOf(".") == -1;
});

$(document).ready(function() {
    $("#appForm").validate({
        rules: {
            minColVal: {
                required: true,
                number: true,
                range: [-50, 50],
                isDecimal: true
            },
            minRowVal: {
                required: true,
                number: true,
                range: [-50, 50],
                isDecimal: true
            }, 
            maxColVal: {
                required: true,
                number: true,
                range: [-50, 50], 
                greaterThanCol: "#minColVal",
                isDecimal: true
            }, 
            maxRowVal: {
                required: true,
                number: true,
                range: [-50, 50],
                greaterThanRow: "#minRowVal",
                isDecimal: true
            }
        },
        messages: {
            minColVal: {
                range: "Must be a value between -50 and 50.",
                isDecimal: "Cannot be a decimal."
            },
            minRowVal: {
                range: "Must be a value between -50 and 50.",
                isDecimal: "Cannot be a decimal."
            }, 
            maxColVal: {
                range: "Must be a value between -50 and 50.",
                isDecimal: "Cannot be a decimal.",
                greaterThanCol: "Min col value must be greater than max."
            }, 
            maxRowVal: {
                range: "Must be a value between -50 and 50.",
                isDecimal: "Cannot be a decimal.", 
                greaterThanRow: "Min row value must be greater than max."
            }
        }, 
        errorPlacement: function(error, element) {
            var errorRow = $('<tr class="error-row"></tr>');
            var errorCell = $('<td></td>');
            errorCell.append(error);
            errorRow.append(errorCell);
            errorRow.insertAfter(element.closest('tr'));
        }
    });
});












// init sliders
$(function(){
    $("#minColSlider").slider({
        min: -11, 
        max: 11,
        value: 1
      });
    $("#maxColSlider").slider({
        min: -11, 
        max: 11,
        value: 5

      });
    $("#minRowSlider").slider({
        min: -11, 
        max: 11,
        value: 1
      });
    $("#maxRowSlider").slider({
        min: -11, 
        max: 11,
        value: 5
      });
});

// two way bind -> slider values to input values
$("#minColSlider").on( "slide", function() {
    var sliderVal = $("#minColSlider").slider("value");
    $("#minColVal").val(sliderVal);
});

$("#minRowSlider").on( "slide", function() {
    var sliderVal = $("#minRowSlider").slider("value");
    $("#minRowVal").val(sliderVal);
});

$("#maxColSlider").on( "slide", function() {
    var sliderVal = $("#maxColSlider").slider("value");
    $("#maxColVal").val(sliderVal);
});

$("#maxRowSlider").on( "slide", function() {
    var sliderVal = $("#maxRowSlider").slider("value");
    $("#maxRowVal").val(sliderVal);
});

// two way bind -> input values to slider values
$("#appForm").on("submit", function(){
    let minColVal = $("#minColVal").val();
    $("#minColSlider").slider("value", minColVal);

    let minRowVal = $("#minRowVal").val();
    $("#minRowSlider").slider("value", minRowVal);

    let maxColVal = $("#maxColVal").val();
    $("#maxColSlider").slider("value", maxColVal);

    let maxRowVal = $("#maxRowVal").val();
    $("#maxRowSlider").slider("value", maxRowVal);
});







$(document).on("click", ".deleteButton", function() {
    var listItem = $(this).closest("li");
    var tabIndex = listItem.index();
    $("#userTable" + tabIndex).remove();
    listItem.remove();
    $("#tableSpace").tabs("refresh");
  });