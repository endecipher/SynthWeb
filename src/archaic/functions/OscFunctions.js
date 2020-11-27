export default{
	
	getFreqForKey(key){
	  if(key=='a'){
	    return 130.8;
	  }
	  if(key=='w'){
	    return 138.6;
	  }
	  if(key=='s'){
	    return 146.8;
	  }
	  if(key=='e'){
	    return 155.6;
	  }
	  if(key=='d'){
	    return 164.8;
	  }
	  if(key=='f'){
	    return 174.6;
	  }
	  if(key=='t'){
	    return 185.0;
	  }
	  if(key=='g'){
	    return 196.0;
	  }
	  if(key=='y'){
	    return 207.7;
	  }
	  if(key=='h'){
	    return 220.0;
	  }
	  if(key=='u'){
	    return 233.1;
	  }
	  if(key=='j'){
	    return 246.9;
	  }
	  return -1;
	},
	createJSONDetails(type,frequency,key){
	  return {"osctype":type, "oscfrequency":frequency, "key":key};
	},
	getIndexForKey(key){
		if(key=='a'){
	    return 0;
	  }
	  if(key=='w'){
	    return 1;
	  }
	  if(key=='s'){
	    return 2;
	  }
	  if(key=='e'){
	    return 3;
	  }
	  if(key=='d'){
	    return 4;
	  }
	  if(key=='f'){
	    return 5;
	  }
	  if(key=='t'){
	    return 6;
	  }
	  if(key=='g'){
	    return 7;
	  }
	  if(key=='y'){
	    return 8;
	  }
	  if(key=='h'){
	    return 9;
	  }
	  if(key=='u'){
	    return 10;
	  }
	  if(key=='j'){
	    return 11;
	  }
	  return -1;
	}
}