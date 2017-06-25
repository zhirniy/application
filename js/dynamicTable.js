function sum(){
            var sum_req_num = 0;
            var equipment_req_num = document.getElementsByClassName("equipment_req_num");
            for(var i =0; i<equipment_req_num.length; i++){
                sum_req_num += +document.getElementsByClassName("equipment_req_num")[i].value;
            }
            
             document.getElementById("sum_req_num").value = sum_req_num.toFixed(2);

            var sum_req_price = 0;
            var equipment_req_price = document.getElementsByClassName("equipment_req_price");
            for(var j =0; j<equipment_req_price.length; j++){
                sum_req_price += +document.getElementsByClassName("equipment_req_price")[j].value;
            }
            document.getElementById("sum_req_price").value = sum_req_price.toFixed(2);


            var sum_req_sum = 0;
            var equipment_req_sum = document.getElementsByClassName("equipment_req_sum");
            for(var k =0; k<equipment_req_sum.length; k++){
                sum_req_sum += +document.getElementsByClassName("equipment_req_sum")[k].value ;
            }
            document.getElementById("sum_req_sum").value = sum_req_sum.toFixed(2);

        }

       


function getChar(event) {
      if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode) 
      }

      if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which) 
      }

      return null; 
    }



var formatPrice = function(event) {
    var e = event || windows.event;
    val = e.target.value
    if(e.target.value==""){
       e.target.value=="0.00";
    }
    else if (val.indexOf('.') != '-1' && val != '') {
        e.target.value = val.substring(0, val.indexOf('.') + 3);
    } else if (val != '') {
        e.target.value = val.substring(0, val.length) + '.00'
    }
};

var calculate_sum = function(e) {
    var evt = e || window.event;
    var trg = evt.target || evt.srcElement;
    var id = trg.name.substr(0, trg.name.indexOf('[', 1));
    num = document.getElementsByName(id + '[equipment_req_num]')[0].value;
    price = document.getElementsByName(id + '[equipment_req_price]')[0].value;
    document.getElementsByName(id + '[equipment_req_sum]')[0].value = (num * price).toFixed(2);
};

function setListeners(){
      var priceInputs = document.getElementsByClassName('equipment_req_price');
       for(var i =0; i<priceInputs.length; i++){
     priceInputs[i].onkeypress = function (e) {
    e = e || event;
     if (e.ctrlKey || e.altKey || e.metaKey) return;
     var chr = getChar(e);
     if (chr == null) return;
     if (chr < '0' || chr > '9') {
           return false; }
    }
    if(priceInputs[i].addEventListener){
    priceInputs[i].addEventListener("change", formatPrice);
     priceInputs[i].addEventListener("change", calculate_sum);
     priceInputs[i].addEventListener("change", sum);
 }
    else if(priceInputs[i].attachEvent){
    priceInputs[i].attachEvent("onchange", formatPrice);
    priceInputs[i].attachEvent("onchange", calculate_sum);
    priceInputs[i].addEventListener("change", sum);
}
             
        }
    var numberInputs = document.getElementsByClassName('equipment_req_num');
    for(var j =0; j<numberInputs.length; j++){
     numberInputs[j].onkeypress = function (e) {
    e = e || event;
     if (e.ctrlKey || e.altKey || e.metaKey) return;
     var chr = getChar(e);
     if (chr == null) return;
     if (chr < '0' || chr > '9') {
           return false; }
        }
     }
  sum();

}

var DynamicTable = (function(GLOB) {
    var RID = 0;
    return function(tBody) {
        /* Если ф-цию вызвали не как конструктор фиксим этот момент: */
        if (!(this instanceof arguments.callee)) {
            return new arguments.callee.apply(arguments);
        }
        //Делегируем прослушку событий элементу tbody
        tBody.onclick = function(e) {
            var evt = e || GLOB.event
              , trg = evt.target || evt.srcElement;
            if (trg.className && trg.className.indexOf("row_add") !== -1) {
                _addRow(trg.parentNode.parentNode, tBody);
            } else if (trg.className && trg.className.indexOf("row_del") !== -1) {
                tBody.rows.length > 1 && _delRow(trg.parentNode.parentNode, tBody);
            }
        }
        ;
        var _rowTpl = tBody.rows[0].cloneNode(true);
        // Корректируем имена элементов формы
        var _correctNames = function(row) {
            var elements = row.getElementsByTagName("*");
            for (var i = 0; i < elements.length; i += 1) {
                if (elements.item(i).name) {
                    if (elements.item(i).type && elements.item(i).type === "radio" && elements.item(i).className && elements.item(i).className.indexOf("glob") !== -1) {
                        elements.item(i).value = RID;
                    } else {
                        elements.item(i).name = RID + "[" + elements.item(i).name + "]";
                    }
                }
            }
            RID++;
            return row;
        };
        var _addRow = function(before, tBody) {
            var newNode = _correctNames(_rowTpl.cloneNode(true));
            tBody.insertBefore(newNode, before.nextSibling);
            _addNum(tBody);
            setListeners();
        };
        var _delRow = function(row, tBody) {
            tBody.removeChild(row);
            _addNum(tBody);
            setListeners();
        };
        var _addNum = function(tBody) {
            for (var i = 0; i < tBody.rows.length; i++) {
                rows = tBody.rows[i];
                cells = rows.cells[0].innerHTML = i + 1;
            }
        };

        _correctNames(tBody.rows[0]);
        _addNum(tBody);
        setListeners();

    }
    ;
})(this);
