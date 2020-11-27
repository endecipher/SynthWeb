import React from "react"
import p5 from "./p5.min.js"

function p5sketches(){

//Define Keyboard Area
var keyboard=new window.p5(keyboardsketch);

//Define Pitch Bend Area
var pitcharea=new window.p5(pitchareasketch);

//Initiate first call to check for changes
setFromUI();


//This sketch canvas will be for keyboard



//this sketch will be for pitch area
var pitchareasketch=function(p){
p.x=100;
p.y=100;

p.setup=function() {
  p.canvas=p.createCanvas(100, 100);

  p.x=p.width/2;
  p.y=p.height/2;
  p.noStroke();
  p.background(51);
}

p.draw=function(){
  p.fill(255,0,200,25);
  p.noStroke();
  p.ellipse(p.x,p.y,48,48);

  p.x=p.x+p.random(-15,15);
  p.y=p.y+p.random(-15,15);
}  
}//sketch for pitch area ends



}

export default p5sketches
