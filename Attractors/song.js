function Song(tempo, lyrics, songFile) {
    this.tempo = tempo;
    this.lyrics = this.getLyricsArray(lyrics);
    this.songFile = songFile;
    var duration = songFile.duration();
    this.duration = duration;
    this.lyricPos = 0;
    console.log(this.lyrics);
  }
  
  Song.prototype.getLyricsArray = function(lyricsJsonFile) {
    var result = [];
    var parts = lyricsJsonFile.song;
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      var partType = part.type;
      var partName = part.type + "_" + i;
      var lyrics = part.lyrics;
      for (var j = 0; j < lyrics.length; j++) {
        var lyric = lyrics[j];
        result.push(
          new Lyric(lyric.text, lyric.begin, lyric.end, partType, partName)
        );
      }
    }
    return result;
  };
  
  Song.prototype.showLyrics = function() {
    this.currentLyric().show();
  };

  Song.prototype.currentLyric = function(){
    var currentTime = this.time();
  
    //console.log(currentTime);
    for (var i = 0; i < this.lyrics.length; i++) {
      var lyric = this.lyrics[i];
      if (lyric.begin <= currentTime && lyric.end >= currentTime) {
        return lyric;
      }
    }
    return {text:""};
  }
  
  Song.prototype.play = function() {
    console.log("play");
    this.songFile.play();
  };
  
  Song.prototype.pause = function() {
    console.log("pause");
    this.songFile.pause();
  };
  
  Song.prototype.stop = function() {
    console.log("stop");
    this.songFile.stop();
  };
  
  Song.prototype.jump = function(t) {
    console.log("jump " + t);
    this.songFile.jump(t);
  };
  
  Song.prototype.isPlaying = function() {
    return this.songFile.isPlaying();
  };
  
  Song.prototype.time = function() {
    return this.songFile.currentTime();
  };
  