// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var monthlyColumns = document.querySelector('.monthlyColumns');
var incomeMonthly = document.querySelector('.grid-header__one h3');
var incomeInput = document.querySelector('[name="income"]');
var incomeAmountNumber = document.querySelector('.income');
var columnAmount = monthlyColumns.querySelectorAll('.amount');
var moneyLeft = document.querySelector('.money-left');
var totalExpenses = document.querySelector('.total-expenses');
var shoppingList = document.querySelectorAll('.list');
var inputsOfPrizes = monthlyColumns.querySelectorAll("[name='sum']");
var inputsOfItems = document.querySelectorAll("input[data-item='item']"); // amount that I get every new month + the leftover from the previous month

var incomeAmount = 0; // sum for each column

var sumOfEveryColumn = {
  first: 0,
  second: 0,
  third: 0,
  fourth: 0,
  fifth: 0
}; // the list of item written down for each column

var itemsOfEveryColumn = {
  first: [],
  second: [],
  third: [],
  fourth: [],
  fifth: []
}; // add and show monthly income + the leftover from the previous month

function salaryAmount(e) {
  incomeAmount += parseFloat(e.currentTarget.value);
  if (!incomeAmount > 0) return;
  incomeAmountNumber.textContent = incomeAmount.toFixed(2);
  e.currentTarget.value = "";
  localStorage.setItem('Income', JSON.stringify(incomeAmount));
  sumAllColumns(sumOfEveryColumn);
} // get the sum that was written down in the column


function valueOfItemPrice(e) {
  // find active the input by data-name
  var sameAttr = e.currentTarget.dataset.name; // get the value from this input

  var priceOfItem = parseFloat(e.currentTarget.value); // loop over each column and check if data-name for the active
  // input is the same as p for this column,
  // then display new amount in p and sum it all up

  columnAmount.forEach(function (p) {
    if (p.getAttribute("data-name") === sameAttr) {
      // we take data-name and use it as objetct[key] to find correct column
      sumOfEveryColumn[sameAttr] += priceOfItem;
      p.textContent = sumOfEveryColumn[sameAttr].toFixed(2);
    }
  });
  e.target.value = "";
  addItemToList(priceOfItem, sameAttr);
  displayTheList(itemsOfEveryColumn);
  sumAllColumns(sumOfEveryColumn);
} // loop over each column and take total amount , then sum them all up


function sumAllColumns(objectOfSum) {
  // make temporare arr and loop over all columns and push values to arr
  var arrOfSumAllColumns = []; // loop over each key of Object to get value

  for (var _i = 0, _Object$entries = Object.entries(objectOfSum); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        _key = _Object$entries$_i[0],
        _value = _Object$entries$_i[1];

    arrOfSumAllColumns.push(_value);
  } // take only last 5 added values from the arr and sum it all


  var sumOfAllColumns = arrOfSumAllColumns.splice(arrOfSumAllColumns.length - 5).reduce(function (prev, cur) {
    return prev + cur;
  });
  countMoneyLeft(moneyLeft, incomeAmount, sumOfAllColumns); // moneyLeft.textContent = (incomeAmount - sumOfAllColumns).toFixed(2);
  // totalExpenses.textContent = sumOfAllColumns.toFixed(2);
}

function countMoneyLeft(moneyAll, income, allExpences) {
  moneyAll.textContent = (income - allExpences).toFixed(2);
  totalExpenses.textContent = allExpences.toFixed(2);
} // add items from input to the list for each column separately 


function addItemToList(inputValue, number) {
  for (var _i2 = 0, _Object$entries2 = Object.entries(itemsOfEveryColumn); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2);

    key = _Object$entries2$_i[0];
    value = _Object$entries2$_i[1];

    if (key === number && inputValue > 0) {
      value.push(inputValue);
      addToLocalStorage(itemsOfEveryColumn);
    }
  }
} // display the list all items for each column


function displayTheList(objectOfColumns) {
  for (var _i3 = 0, _Object$entries3 = Object.entries(objectOfColumns); _i3 < _Object$entries3.length; _i3++) {
    var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2);

    key = _Object$entries3$_i[0];
    value = _Object$entries3$_i[1];

    if (value.length > 0) {
      (function () {
        var html = value.map(function (item, id) {
          return "\n            <li class=\"item shopping-item\">\n                <span data-delete=\"".concat(id, "\" data-value=").concat(item, " class='delete'>x</span>\n                <span>").concat(item, "</span>\n            </li>  \n            ");
        }).join('');
        shoppingList.forEach(function (list) {
          if (list.dataset.name === key) {
            list.classList.add('open');
            list.innerHTML = html;
          }
        });
      })();
    } else {
      shoppingList.forEach(function (list) {
        if (list.dataset.name === key) {
          list.classList.remove('open');
          list.innerHTML = " ";
        }
      });
    }
  }
} // click x to delete item from list and from Object Array
// Arguments: id - x[id] , list is current list of column , and then our Object


function deleteItem(deletedValue, id, list, objectOfColumns) {
  var newArr;

  for (var _i4 = 0, _Object$entries4 = Object.entries(objectOfColumns); _i4 < _Object$entries4.length; _i4++) {
    var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
        _key2 = _Object$entries4$_i[0],
        _value2 = _Object$entries4$_i[1];

    if (_key2 === list.dataset.name) {
      newArr = _value2.filter(function (item, i) {
        return i !== id;
      });
      _value2 = newArr;
    }

    objectOfColumns[_key2] = _value2;
  }

  updateAmount(list, deletedValue);
  displayTheList(itemsOfEveryColumn);
  addToLocalStorage(objectOfColumns);
} // update all numbers after deleting items in columns


function updateAmount(numberOfList, deletedValue) {
  columnAmount.forEach(function (p) {
    var columnNumber = numberOfList.dataset.name;

    if (p.dataset.name === columnNumber) {
      // we take data-name and use it as objetct[key] to find correct column
      sumOfEveryColumn[columnNumber] -= deletedValue;
      p.textContent = sumOfEveryColumn[columnNumber].toFixed(2);
    }

    sumAllColumns(sumOfEveryColumn);
  });
} // set Local Storage


function addToLocalStorage(objectOfColumns) {
  for (var _i5 = 0, _Object$entries5 = Object.entries(objectOfColumns); _i5 < _Object$entries5.length; _i5++) {
    var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i5], 2),
        _key3 = _Object$entries5$_i[0],
        _value3 = _Object$entries5$_i[1];

    localStorage.setItem("column - ".concat(_key3), JSON.stringify(objectOfColumns[_key3]));
  }
}

function restoreFromLocalStorage(objectOfColumns) {
  var _loop = function _loop() {
    var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i6], 2),
        key = _Object$entries6$_i[0],
        value = _Object$entries6$_i[1];

    if (key) {
      var listItems = JSON.parse(localStorage.getItem("column - ".concat(key))) || [];

      if (listItems.length > 0) {
        var _objectOfColumns$key;

        (_objectOfColumns$key = objectOfColumns[key]).push.apply(_objectOfColumns$key, _toConsumableArray(listItems));

        displayTheList(itemsOfEveryColumn);
      }
    }

    columnAmount.forEach(function (p) {
      if (p.dataset.name === key && value.length > 0) {
        // we take data-name and use it as objetct[key] to find correct column
        var amountToDisplay = [];
        value.forEach(function (item) {
          return amountToDisplay.push(item);
        });
        var x = amountToDisplay.reduce(function (prev, next) {
          return prev + next;
        });
        sumOfEveryColumn[key] += x;
        p.textContent = sumOfEveryColumn[key].toFixed(2);
      }
    });
  };

  //pull the items from local storage
  for (var _i6 = 0, _Object$entries6 = Object.entries(objectOfColumns); _i6 < _Object$entries6.length; _i6++) {
    _loop();
  }

  var incomeStorage = JSON.parse(localStorage.getItem('Income')) || 0;
  incomeAmountNumber.textContent = incomeStorage;
  incomeAmount = incomeStorage;
  var arrOfSumAllColumns = []; // loop over each key of Object to get value

  for (var _i7 = 0, _Object$entries7 = Object.entries(sumOfEveryColumn); _i7 < _Object$entries7.length; _i7++) {
    var _Object$entries7$_i = _slicedToArray(_Object$entries7[_i7], 2),
        _key4 = _Object$entries7$_i[0],
        _value4 = _Object$entries7$_i[1];

    arrOfSumAllColumns.push(_value4);
  } // take only last 5 added values from the arr and sum it all


  var sumOfAllColumns = arrOfSumAllColumns.splice(arrOfSumAllColumns.length - 5).reduce(function (prev, cur) {
    return prev + cur;
  });
  countMoneyLeft(moneyLeft, incomeAmount, sumOfAllColumns); //countMoneyLeft(moneyLeft, incomeAmount, sumOfAllColumns)
}

inputsOfPrizes.forEach(function (input) {
  return input.addEventListener('change', valueOfItemPrice);
});
incomeInput.addEventListener('change', salaryAmount);
shoppingList.forEach(function (list) {
  list.addEventListener('click', function (e) {
    var btn = parseInt(e.target.dataset.delete);
    var chosenValue = parseFloat(e.target.dataset.value);

    if (btn || btn === 0) {
      deleteItem(chosenValue, btn, list, itemsOfEveryColumn);
    }
  });
});
restoreFromLocalStorage(itemsOfEveryColumn);
displayTheList(itemsOfEveryColumn);
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "4233" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map