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
var _items, _columnsTotal;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var monthlyColumns = document.querySelector('.monthlyColumns');
var incomeMonthly = document.querySelector('.grid-header__one h3');
var incomeInput = document.querySelector('[name="income"]');
var incomeAmountNumber = document.querySelector('.income');
var moneyLeft = document.querySelector('.money-left');
var totalExpenses = document.querySelector('.total-expenses');
var shoppingList = document.querySelectorAll('.list');
var inputsOfItems = document.querySelectorAll("input[data-item='item']");
var forms = document.querySelectorAll('form');
var columnAmount = monthlyColumns.querySelectorAll('.amount');
var priceInputs = monthlyColumns.querySelectorAll("[name='sum']");
var FOOD = 'food';
var COFFEE_AND_OUT = 'coffee_and_out';
var TRAVEL = 'travel';
var SHOPPING = 'shopping';
var OTHER = 'other'; // const MONTHS = {
//   may: {},
// }
// save('may', user) {
//     MONTHS['may'] = user
// }

var user = {
  income: 0,
  items: (_items = {}, _defineProperty(_items, FOOD, {
    list: []
  }), _defineProperty(_items, COFFEE_AND_OUT, {
    list: []
  }), _defineProperty(_items, TRAVEL, {
    list: []
  }), _defineProperty(_items, SHOPPING, {
    list: []
  }), _defineProperty(_items, OTHER, {
    list: []
  }), _items)
};
var columnsTotal = (_columnsTotal = {}, _defineProperty(_columnsTotal, FOOD, 0), _defineProperty(_columnsTotal, COFFEE_AND_OUT, 0), _defineProperty(_columnsTotal, TRAVEL, 0), _defineProperty(_columnsTotal, SHOPPING, 0), _defineProperty(_columnsTotal, OTHER, 0), _columnsTotal);

function salaryAmount(e) {
  user.income += +e.currentTarget.value;
  incomeAmountNumber.textContent = user.income.toFixed(2);
  e.currentTarget.value = '';
  localStorage.setItem('Income', JSON.stringify(user.income));
  sumAllColumns(columnsTotal);
}

function valueOfItemPrice(e) {
  e.preventDefault();
  var el = e.currentTarget.querySelector('[name="sum"]');
  var attr = el.dataset.name;
  var price = +el.value;
  var name = document.getElementById("".concat(attr)).value;
  var paragraph = document.querySelector("[data-name=".concat(attr, "]"));

  if (price > 0) {
    columnsTotal[attr] += price;
    paragraph.textContent = columnsTotal[attr].toFixed(2);
    addItemToList(price, name, attr);
    displayTheList(user.items);
    sumAllColumns(columnsTotal);
  }

  this.reset();
}

function sumAllColumns(objectOfSum) {
  var total = Object.values(objectOfSum).reduce(function (acc, cur) {
    return acc + cur;
  }, 0);
  countMoneyLeft(user.income, total);
}

function countMoneyLeft(income, allExpences) {
  moneyLeft.textContent = (income - allExpences).toFixed(2);
  totalExpenses.textContent = allExpences.toFixed(2);
}

function addItemToList(price, name, attribute) {
  var key = Object.keys(user.items).filter(function (key) {
    return key === attribute;
  });
  user.items[key].list.push({
    price: price,
    name: name
  });
  addToLocalStorage(user.items);
}

function displayTheList(columns) {
  Object.entries(columns).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        valuesList = _ref2[1].list;

    var list = document.querySelector("ul[data-name=".concat(key, "]"));

    if (valuesList.length) {
      var html = valuesList.map(generateListHTML).join('');
      list.classList.add('open');
      list.innerHTML = html;
    } else {
      list.classList.remove('open');
      list.innerHTML = "";
    }
  });
}

function generateListHTML(_ref3, id) {
  var name = _ref3.name,
      price = _ref3.price;
  return "\n    <li class=\"item shopping-item\">\n        <span data-delete=\"".concat(id, "\" data-value=").concat(price, " class='delete'>x</span>\n        <span>").concat(name, "</span>\n        <span>").concat(price, "</span>\n    </li>  \n    ");
}

function deleteItem(deletedValue, id, list) {
  var key = Object.keys(user.items).filter(function (key) {
    return key === list.dataset.name;
  });
  var newValue = user.items[key].list.filter(function (_, i) {
    return i !== parseFloat(id);
  });
  user.items[key].list = newValue;
  updateAmount(list, deletedValue);
  displayTheList(user.items);
  addToLocalStorage(user.items);
}

function updateAmount(list, deletedValue) {
  var name = list.dataset.name;
  var paragraph = document.querySelector("[data-name=".concat(name));
  columnsTotal[name] -= deletedValue;
  paragraph.textContent = columnsTotal[name].toFixed(2);
  sumAllColumns(columnsTotal);
}

function addToLocalStorage(columns) {
  Object.entries(columns).forEach(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 1),
        key = _ref5[0];

    return localStorage.setItem("column - ".concat(key), JSON.stringify(columns[key].list));
  });
}

function restoreFromLocalStorage(columns) {
  Object.entries(columns).forEach(function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
        key = _ref7[0],
        values = _ref7[1];

    if (key) {
      var _columns$key$list;

      var items = JSON.parse(localStorage.getItem("column - ".concat(key))) || [];

      (_columns$key$list = columns[key].list).push.apply(_columns$key$list, _toConsumableArray(items));

      displayTheList(columns);
    }

    var paragraph = document.querySelector("[data-name=".concat(key, "]"));
    var sum = values.list.reduce(function (acc, curr) {
      return acc + curr.price;
    }, 0);
    columnsTotal[key] += sum;
    paragraph.textContent = columnsTotal[key].toFixed(2);
  });
  user.income = JSON.parse(localStorage.getItem('Income')) || 0;
  incomeAmountNumber.textContent = user.income.toFixed(2);
  sumAllColumns(columnsTotal);
}

forms.forEach(function (form) {
  return form.addEventListener('submit', valueOfItemPrice);
});
incomeInput.addEventListener('change', salaryAmount);
shoppingList.forEach(function (list) {
  list.addEventListener('click', function (e) {
    var id = e.target.dataset.delete;
    var chosenValue = parseFloat(e.target.dataset.value);

    if (id) {
      deleteItem(chosenValue, id, list);
    }
  });
});
restoreFromLocalStorage(user.items);
displayTheList(user.items);
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53689" + '/');

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
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map