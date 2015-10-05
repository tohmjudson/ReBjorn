//Object sampler
function Sampler(audiocontext,samplefile,trackname) {
    this.context=context;
    this.buffer=null;
    this.start=null;
    this.end=null;
    this.amp=1;
    this.samplefile=samplefile;
    this.name=trackname;
    
    //Web audio object
    this.gain = this.context.createGain();
    
    this.gain.connect(this.context.destination);
};