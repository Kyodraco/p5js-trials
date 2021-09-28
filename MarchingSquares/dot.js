function Dot(x, y, value, index) {
  this.x = x * rez;
  this.y = y * rez;
  this.index = index;
  this.category = this.getCategory(value)
  this.setValue(value);
}

Dot.prototype.setBit = function(value) {
  this.bit = round(value);
}

Dot.prototype.setValue = function(value) {
  this.value = value;
  this.setBit(value)
  this.category = this.getCategory(value)
}

Dot.prototype.getCategory = function(value) {
  for (var c = 1; c < categories.length; c++) {
    if (value > categories[c - 1].val && value <= categories[c].val) {
      return categories[c];
    }
  }
}