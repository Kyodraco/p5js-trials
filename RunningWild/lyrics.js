function Lyric(text, begin, end, partType, partName) {
    this.text = text;
    this.begin = begin;
    this.end = end;
    this.partType = partType;
    this.partName = partName;
  }
  
  Lyric.prototype.show = function() {
    fill(255);
    textSize(20);
    textAlign(CENTER);
    text(this.text, width / 2, height / 2);
    //console.log(this.text);
  };
  