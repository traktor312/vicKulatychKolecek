var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var projectiles = [];
var units = [];
var score = 0;
var lvl = 1;
var phase = 0;

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}