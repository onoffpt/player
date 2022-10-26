/*
Copyright 2017 Google Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

"use strict";

// This code adapted from Eric Bidelman's demo at
// http://html5-demos.appspot.com/static/media-source.html

//var FILE = 'test.webm';
var FILE = "test.MP4";
var file,sourceBuffer;
var video = document.querySelector("video");
//const framesize = [5341,156,155,155,156,156,156,156,156,130818,95350,115225,81140,45106,30169,33943,26424,33682,24718,36097,31835,31002,33954,26541,19674];
const framesize = [
  5341, 156, 155, 155, 156, 156, 156, 156, 156, 130818, 95350, 115225, 81140,
  45106, 30169, 33943, 26424, 33682, 24718, 36097, 31835, 31002, 33954, 26541,
  19674, 19714, 10631, 1253, 11180, 21382, 10763, 8018, 8553, 10751, 10845,
  9273, 9957, 8085, 7460, 7758, 8451, 14798, 11025, 12238, 11639, 10140, 9789,
  7790, 7471, 7358, 7372, 7373, 7349, 7347, 7363, 7358, 7338, 7377, 7334, 7342,
  7369, 7331, 7354, 12325, 8439, 10535, 10037, 11930, 9623, 10128, 7733, 5260,
  3561, 5287, 7845, 6892, 6552, 6512, 6491, 6467, 6492, 6479, 6479, 6460, 6496,
  6477, 6496, 34627, 47234, 1561, 50209, 2742, 2359, 6365, 24296, 22578, 36274,
  29370, 41333, 27813, 29331, 48232, 23661, 36156, 21296, 25281, 21802, 7726,
  3500, 9072, 5482, 6431, 7300, 6754, 20008, 4178, 4400, 4429, 3108, 2670, 2577,
  2566, 2504, 3878, 2573, 2558, 2526, 2505, 2477, 2469, 5364, 5015, 2649, 5342,
  4995, 4135, 4019, 2513, 2536, 2554, 2547, 2549, 2538, 2529, 2612, 2576, 3196,
  3540, 2491, 2528, 2529, 2553, 2538, 2538, 2553, 2543, 2530, 2542, 2530, 2568,
  2550, 2527, 2491, 2557, 2568, 7230, 15890, 3022, 90570, 7375, 3101, 65764,
  4397, 3420, 4052, 24636, 3639, 3747, 17979, 29742, 2492, 9440, 2277, 8952,
  2272, 2292, 2294, 8173, 2251, 2201, 8250, 2282, 8882, 2274, 6125, 2201, 2241,
  2269, 39932, 3086, 14958, 1343, 985, 1184, 5971, 70810, 2085, 993, 1030, 1035,
  1028, 1023, 1070, 1020, 1018, 1021, 1038, 1027, 1016, 992, 1039, 1173, 1249,
  2834, 2586, 1306, 1273, 1236, 19476, 1410, 24608, 47351, 67982, 2579, 2011,
  1779, 1879, 3890, 6260, 10875, 10252, 8251, 3519, 4439, 12607, 7979, 10089,
  7002, 7925, 5056, 6309, 2143, 1965, 1964, 1963, 1976, 1961, 1964, 2030, 1953,
  1949, 1993, 1957, 1974, 1950, 1912, 1999, 1985, 3514, 4412, 2047, 2003, 1986,
  5117, 5721, 4629, 4912, 1988, 6775, 2120, 2655, 2324, 2122, 3414, 899, 9246,
  2153, 23399, 2874, 2250, 2313, 2023, 3140, 2771, 1591, 2751, 1557, 2609, 1293,
  1102, 3252, 1097, 1023, 1016, 1000, 1005, 980, 986, 1004, 986, 997, 958, 1497,
  2278, 1024, 2152, 916, 1844, 988, 994, 980, 983, 983, 987, 984, 967, 966,
  1004, 976, 959, 943, 1218, 2238, 1281, 1209, 1024, 3631, 1264, 3467, 2354,
  2798, 2020, 3180, 1599, 2761, 1493, 2973, 2682, 954, 1291, 2353, 1044, 1001,
  986, 969, 976, 988, 969, 969, 985, 978, 943, 1751, 1144, 991, 2768, 2219,
  1065, 999, 994, 982, 981, 980, 988, 979, 968, 984, 976, 943, 2855, 1526, 2255,
  2001, 499, 162, 662, 155, 585, 162, 510, 162, 843, 159, 569, 155, 920, 163,
  419, 160, 664, 155, 591, 155, 502, 155, 651, 155, 580, 155, 508, 162, 849,
  159, 569, 155, 246, 155, 1465, 163, 424, 160, 664, 155, 593, 159, 506, 155,
  654, 3554, 1356, 2382, 1773, 1874, 1080, 1716, 1378, 1293, 2003, 3808, 3661,
  2867, 2947, 1626, 2852, 1650, 3709, 2528, 1098, 2260, 1086, 1053, 1035, 1041,
  1028, 1029, 1030, 1025, 1013, 1017, 1033, 1000, 2601, 1553, 2284, 2191, 1042,
  1833, 2272, 1031, 1005, 991, 991, 992, 990, 982, 977, 969, 990, 989, 957, 872,
  1003, 2226, 1214, 1082, 1145, 1775, 1006, 999, 983, 984, 983, 981, 987, 965,
  968, 964, 971, 951, 945, 1682, 2826, 1545, 1187, 76290, 70750, 58904, 43061,
  7690, 5797, 6186, 7918, 10327, 8906, 11612, 12231, 10271, 12645, 12435, 9263,
  9707, 9221, 8027, 6627, 5127, 5710, 5515, 6407, 6184, 5729, 5463, 4889, 6085,
  6136, 5681, 5847, 5075, 6228, 6796, 5932, 5032,
];
var NUM_CHUNKS = framesize.length;
//const mimeType = 'video/mp4; codecs="avc1.4d401f,mp4a.40.2,avc1.640030"';

if (!window.MediaSource) {
  alert("The MediaSource API is not available on this platform");
}

var mediaSource = new MediaSource();

// document.querySelector("[data-num-chunks]").textContent = NUM_CHUNKS;

video.src = window.URL.createObjectURL(mediaSource);

mediaSource.addEventListener(
  "sourceopen",
  function () {
     sourceBuffer =
      //mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
      //mediaSource.addSourceBuffer('video/mp4; codecs="avc1.4d401f,mp4a.40.2"');
      mediaSource.addSourceBuffer('video/mp4; codecs="avc1.640030"');
    //if (MediaSource.isTypeSupported(mimeType)) {
    //console.info('Mimetype is', mimeType);
    // TODO ...
    //} else {
    //console.error('Mimetype not supported', mimeType);
    //}

    console.log(sourceBuffer);

    log("MediaSource readyState: " + this.readyState);

    get(FILE, function (uInt8Array) {
       file = new Blob([uInt8Array], {
        //type: 'video/webm'
        type: "video/mp4",
      });
      //var chunkSize = Math.ceil(file.size / NUM_CHUNKS);

      // Slice the video into NUM_CHUNKS and append each to the media element.

      log("Number of chunks: " + NUM_CHUNKS);
    });
  },
  false
);
var i = 0;
var chunkSize = framesize[0];
var startByte = 0;

function readChunk() {
  // eslint-disable-line no-shadow
  var reader = new FileReader();

  // Reads aren't guaranteed to finish in the same order they're started in,
  // so we need to read + append the next chunk after the previous reader
  // is done (onload is fired).
  reader.onload = function (e) {
    sourceBuffer.appendBuffer(new Uint8Array(e.target.result));
    log("Appending chunk: " + i);
    if (i === NUM_CHUNKS - 1) {
      sourceBuffer.addEventListener("updateend", function () {
        if (!sourceBuffer.updating && mediaSource.readyState === "open") {
          mediaSource.endOfStream();
        }
      });
    } else {
      if (video.paused) {
        video.play(); // Start playing after 1st chunk is appended.
      }
      ++i;
    }
  };

  //var startByte = chunkSize * i;
  var chunkSize = framesize[i];
  log("Chunk size: " + chunkSize + ", total size: " + file.size);
  log("Chunk size: " + chunkSize + ", startByte: " + startByte);
  var chunk = file.slice(startByte, startByte + chunkSize);
  startByte = startByte + chunkSize;
  reader.readAsArrayBuffer(chunk);
} // Start the recursive call by self calling.

mediaSource.addEventListener(
  "sourceended",
  function () {
    log("MediaSource readyState: " + this.readyState);
  },
  false
);

function get(url, callback) {
  var xhr = new XMLHttpRequest();
  //xhr.open('GET', "https://nickdesaulniers.github.io/netfix/demo/frag_bunny.mp4", true);
  xhr.open("GET", "./vnc1.MP4", true);
  xhr.responseType = "arraybuffer";
  xhr.send();

  xhr.onload = function () {
    if (xhr.status !== 200) {
      alert("Unexpected status code " + xhr.status + " for " + url);
      return false;
    }
    callback(new Uint8Array(xhr.response));
  };
}

function log(message) {
  document.getElementById("log").innerHTML += message + "<br /><br />";
}
