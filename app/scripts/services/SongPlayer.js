(function() {
  function SongPlayer() {
    var SongPlayer = {};

    /**
    * @desc Song object
    * @type {object}
    */
    var currentSong = null;

    /**
    * @desc Buzz object audio file
    * @type {object}
    */
    var currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {object} song
    */
    var setSong = function(song) {
      if(currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    };

    /**
    * @function playSong
    * @desc play song and set playing to true
    * @param {object} song
    */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    }

    /**
    * @function play
    * @desc if currentSong is not song calls setSong and playSong. Otherwise checks if currentBuzzObject isPaused, if so calls playSong
    * @param {object} song
    */
    SongPlayer.play = function(song) {
      if(currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if(currentSong === song) {
          if(currentBuzzObject.isPaused()) {
            playSong(song);
          }
      }
    };

    /**
    * @function pause
    * @desc pauses song and sets playing to false
    * @param {object} song
    */
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };
    
    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer',SongPlayer);
})();
