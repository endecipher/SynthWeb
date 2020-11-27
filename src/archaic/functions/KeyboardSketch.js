export default function keyboardsketch(p){
  p.wkcolor=null;
  p.bkcolor=null;
  p.wkpcolor=null;
  p.bkpcolor=null;
  p.linestroke=3; //line sep stroke
  p.x=Math.trunc(840.00);
  p.y=Math.trunc(480.00);
  p.wkw=Math.trunc(p.x/7); //white key width
  p.wkh=Math.trunc(p.y); //white key height
  p.bkw=Math.trunc(72); //black key width         p.x/11.6667
  p.bkh=Math.trunc(p.y*0.65);

  let boolArr=[
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]

p.setup=function() {
  p.createCanvas(p.x, p.y);
  p.noStroke();
  p.background(255,255,255);
  p.wkcolor=p.color(150,150,150); //white key color rgb(value,value,value)
  p.bkcolor=p.color(35,35,35);
  p.wkpcolor=p.color(150,200,150); //whitekeypressed color
  p.bkpcolor=p.color(35,100,35);
}

p.draw=function(){  
  // //line creating 
  // p.fill(p.bkcolor);
  // p.stroke(p.linestroke);
  // p.line(1*p.wkw,0,1*p.wkw,p.y);
  // p.noStroke();

  if (boolArr[0] == true) {
    p.fill(p.wkpcolor);
    p.rect(0, 0, p.wkw-0.5*p.bkw, p.wkh);
    p.rect(p.wkw-0.5*p.bkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
  }else if(boolArr[0]==false){
    p.fill(p.wkcolor);
    p.rect(0, 0, p.wkw-0.5*p.bkw, p.wkh);
    p.rect(p.wkw-0.5*p.bkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
  }
  
  if (boolArr[1] == true) {
    p.fill(p.bkpcolor)
    p.rect(1*p.wkw-0.5*p.bkw,0,p.bkw,p.bkh);
  }else if(boolArr[1]==false){
    p.fill(p.bkcolor)
    p.rect(1*p.wkw-0.5*p.bkw,0,p.bkw,p.bkh);
  }
  
  if (boolArr[2] == true) {
    p.fill(p.wkpcolor)
    p.rect(p.wkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
    p.rect(p.wkw+0.5*p.bkw, 0, p.wkw-p.bkw, p.wkh);
    p.rect(2*p.wkw-0.5*p.bkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
  }else if(boolArr[2]==false){
    p.fill(p.wkcolor)
    p.rect(p.wkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
    p.rect(p.wkw+0.5*p.bkw, 0, p.wkw-p.bkw, p.wkh);
    p.rect(2*p.wkw-0.5*p.bkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
  }

  if (boolArr[3] == true) {
    p.fill(p.bkpcolor)
    p.rect(2*p.wkw-0.5*p.bkw,0,p.bkw,p.bkh);
  }else if(boolArr[3]==false){
    p.fill(p.bkcolor)
    p.rect(2*p.wkw-0.5*p.bkw,0,p.bkw,p.bkh);
  }

  if (boolArr[4] == true) {
    p.fill(p.wkpcolor)
    p.rect(2*p.wkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
    p.rect((2*p.wkw)+0.5*p.bkw, 0, p.wkw-0.5*p.bkw, p.wkh);
  }else if(boolArr[4]==false){
    p.fill(p.wkcolor)
    p.rect(2*p.wkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
    p.rect((2*p.wkw)+0.5*p.bkw, 0, p.wkw-0.5*p.bkw, p.wkh);
  }

  if (boolArr[5] == true) {
    p.fill(p.wkpcolor);
    p.rect(3*p.wkw, 0, p.wkw-0.5*p.bkw, p.wkh);
    p.rect(4*p.wkw-0.5*p.bkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
  }else if(boolArr[5]==false){
    p.fill(p.wkcolor);
    p.rect(3*p.wkw, 0, p.wkw-0.5*p.bkw, p.wkh);
    p.rect(4*p.wkw-0.5*p.bkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
  }
  
  if (boolArr[6] == true) {
    p.fill(p.bkpcolor)
    p.rect(4*p.wkw-0.5*p.bkw,0,p.bkw,p.bkh);
  }else if(boolArr[6]==false){
    p.fill(p.bkcolor)
    p.rect(4*p.wkw-0.5*p.bkw,0,p.bkw,p.bkh);
  }

  if (boolArr[7]== true) {
    p.fill(p.wkpcolor)
    p.rect(4*p.wkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
    p.rect(4*p.wkw+0.5*p.bkw, 0, p.wkw-p.bkw, p.wkh);
    p.rect(5*p.wkw-0.5*p.bkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
  }else if(boolArr[7]==false){
    p.fill(p.wkcolor)
    p.rect(4*p.wkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
    p.rect(4*p.wkw+0.5*p.bkw, 0, p.wkw-p.bkw, p.wkh);
    p.rect(5*p.wkw-0.5*p.bkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
  }

  if (boolArr[8] == true) {
    p.fill(p.bkpcolor)
    p.rect(5*p.wkw-0.5*p.bkw,0,p.bkw,p.bkh);
  }else if(boolArr[8]==false){
    p.fill(p.bkcolor)
    p.rect(5*p.wkw-0.5*p.bkw,0,p.bkw,p.bkh);
  }

  if (boolArr[9] == true) {
    p.fill(p.wkpcolor)
    p.rect(5*p.wkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
    p.rect(5*p.wkw+0.5*p.bkw, 0, p.wkw-p.bkw, p.wkh);
    p.rect(6*p.wkw-0.5*p.bkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
  }else if(boolArr[9]==false){
    p.fill(p.wkcolor)
    p.rect(5*p.wkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
    p.rect(5*p.wkw+0.5*p.bkw, 0, p.wkw-p.bkw, p.wkh);
    p.rect(6*p.wkw-0.5*p.bkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
  }

  if (boolArr[10] == true) {
    p.fill(p.bkpcolor)
    p.rect(6*p.wkw-0.5*p.bkw,0,p.bkw,p.bkh);
  }else if(boolArr[10]==false){
    p.fill(p.bkcolor)
    p.rect(6*p.wkw-0.5*p.bkw,0,p.bkw,p.bkh);
  }

  if (boolArr[11] == true) {
    p.fill(p.wkpcolor)
    p.rect(6*p.wkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
    p.rect((6*p.wkw)+0.5*p.bkw, 0, p.wkw-0.5*p.bkw, p.wkh);
  }else if(boolArr[11]==false){
    p.fill(p.wkcolor)
    p.rect(6*p.wkw,p.bkh,0.5*p.bkw,p.wkh-p.bkh);
    p.rect((6*p.wkw)+0.5*p.bkw, 0, p.wkw-0.5*p.bkw, p.wkh);
  }
  //p.x=p.x+p.random(-15,15);
  //p.y=p.y+p.random(-15,15);
}

/*
p.keyTyped=function() {
  if (p.key == 'a') {
    c=true;
    p.sendKey('a',true);
    //osm.addOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("C---------addOsc called");
  }
  if(p.key=='w'){
    cs=true;
    p.sendKey('w',true);
    //osm.addOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("C#---------addOsc called");  
  }
  if(p.key=='s'){
    d=true;
    //osm.addOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("D---------addOsc called");
  }
  if(p.key=='e'){
    ds=true;
    //osm.addOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("D#---------addOsc called");
  }
  if(p.key=='d'){
    e=true;
    //osm.addOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("E---------addOsc called");
  }
  if(p.key=='f'){
    f=true;
    //osm.addOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("F---------addOsc called");
  }
  if(p.key=='t'){
    fs=true;
    //osm.addOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("F#---------addOsc called");
  }
  if(p.key=='g'){
    g=true;
    //osm.addOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("G---------addOsc called");
  }
  if(p.key=='y'){
    gs=true;
    //osm.addOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("G#---------addOsc called");
  }
  if(p.key=='h'){
    a=true;
    //osm.addOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("A---------addOsc called");
  }
  if(p.key=='u'){
    as=true;
    //osm.addOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("A#---------addOsc called");
  }
  if(p.key=='j'){
    b=true;
    //osm.addOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("B---------addOsc called");
    
  }
  if(p.key=='1'){
    console.log("OSM Show Array>>>");
    //osm.showarr();
  } 
}

p.keyReleased=function(p) {
  if (p.key == 'a') {
    c = false;
    p.sendKey('a',false);
    //osm.removeOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("C--removeOsc called");
  }
  if(p.key=='w'){
    cs=false;
    p.sendKey('w',false)
    //osm.removeOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("C#---removeOsc called");
  }
  if(p.key=='s'){
    d=false;
    //osm.removeOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("D--removeOsc called");
  }
  if(p.key=='e'){
    ds=false;
    //osm.removeOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("D#--removeOsc called");
  }
  if(p.key=='d'){
    e=false;
    //osm.removeOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("E--removeOsc called");
  }
  if(p.key=='f'){
    f=false;
    //osm.removeOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("F--removeOsc called");
  }
  if(p.key=='t'){
    fs=false;
    //osm.removeOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("F#--removeOsc called");
  }
  if(p.key=='g'){
    g=false;
    //osm.removeOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("G--removeOsc called");
  }
  if(p.key=='y'){
    gs=false;
    //osm.removeOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("G#--removeOsc called");
  }
  if(p.key=='h'){
    a=false;
    //osm.removeOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("A--removeOsc called");
  }
  if(p.key=='u'){
    as=false;
    //osm.removeOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("A#--removeOsc called");
  }
  if(p.key=='j'){
    b=false;
    //osm.removeOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("B--removeOsc called");
  }
  if(p.key=='1'){
    //osm.removeOsc(createJSONDetails(osm.getOscNodeType(),getFreqForKey(p.key.toString().toLowerCase())));
    console.log("Released: OSM Show ARR");
  }
}
*/
p.myCustomRedrawAccordingToNewPropsHandler=function(newProps){
  if(newProps.pressedkeys){
    boolArr=newProps.pressedkeys
  }
}

}//sketch for keyboard ends
