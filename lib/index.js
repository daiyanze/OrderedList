'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderedList = function () {
  function OrderedList(arrOfObj) {
    var idAttr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';

    _classCallCheck(this, OrderedList);

    this.idAttr = idAttr;
    this.data = this.makeOrderedMap(arrOfObj);
  }

  _createClass(OrderedList, [{
    key: 'makeOrderedMap',
    value: function makeOrderedMap() {
      var _this = this;

      var arrOfObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var data = arrOfObj.map(function (a) {
        return [a[_this.idAttr], a];
      });
      return Object.freeze(new Map(data));
    }
  }, {
    key: 'findOne',
    value: function findOne(index) {
      return this.data.get(index);
    }
  }, {
    key: 'findList',
    value: function findList(arrOfIndexes) {
      var res = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = arrOfIndexes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var i = _step.value;

          var item = this.data.get(i);
          if (item) {
            res.push(item);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return res;
    }
  }, {
    key: 'unshift',
    value: function unshift(arrOfObj) {
      this.data = this.makeOrderedMap(arrOfObj.concat(this.values));
      return this;
    }
  }, {
    key: 'push',
    value: function push(arrOfObj) {
      this.data = this.makeOrderedMap(this.values.concat(arrOfObj));
      return this;
    }
  }, {
    key: 'update',
    value: function update(arrOfObj) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = arrOfObj[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var a = _step2.value;

          if (this.data.get(a[this.idAttr])) {
            this.data.set(a[this.idAttr], a);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this;
    }
  }, {
    key: 'remove',
    value: function remove(arrOfIndexes) {
      if (!arrOfIndexes) {
        this.data.clear();
      } else {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = arrOfIndexes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var id = _step3.value;

            this.data.delete(id);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
      return this;
    }
  }, {
    key: 'mutateBy',
    value: function mutateBy(cb) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (cb) {
        var data = cb.call(null, this, args);
        if (data.length) {
          this.data = this.makeOrderedMap(data);
        }
      }
      return this;
    }
  }, {
    key: 'values',
    get: function get() {
      return Array.from(this.data.values());
    }
  }, {
    key: 'keys',
    get: function get() {
      return Array.from(this.data.keys());
    }
  }, {
    key: 'size',
    get: function get() {
      return this.data.size;
    }
  }, {
    key: 'length',
    get: function get() {
      return this.size;
    }
  }, {
    key: 'first',
    get: function get() {
      return this.values[0];
    }
  }, {
    key: 'last',
    get: function get() {
      return this.values[this.size - 1];
    }
  }]);

  return OrderedList;
}();

exports.default = OrderedList;