import { Play } from 'lucide-react';

const VideoSection = () => {
  return (
    <section id="video" className="relative h-[70vh] bg-cover bg-center flex items-center justify-center my-20" style={{backgroundImage: "url('https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/f911/4cf9/b7e0988953a37b08371bf36cbd977a08?Expires=1763337600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OMnSZ-XuLP~mb0pORzrsM6rH4MHMY7goeyFsiY1B9GK8yFWBqdYW5ALeYDQn7-b-Co2CGMvhfr2d3FGqgGq7oDBEnl6~JxMmdS0ekvcI2tSTmauogxTMkquz989MEu0IlKQdhp1U5~ZiF-9~6VrXX4FXmTTxwC3Ns2TOt3JtZ7qoURyuQQI4DSrnON9kEC9zQfpx-0CxZKa4BJ~i~5WxpYKwwJir9Iznshcj0qoiCRMUGNU13z5FeGuXNNllkJrTLrriLRDb2LwhrX9BdG3EHz~pF-Z7YJElUTAhZNeow5Svra4v~Std0bCUTttsNWwx0ns49H3gIiPmSeRUCTaIgQ__')"}}>
      <div className="absolute inset-0 bg-black/30"></div>
      <button className="relative w-32 h-32 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white transition-colors">
        <Play className="w-16 h-16 text-dark-text fill-dark-text ml-2" />
      </button>
    </section>
  );
};

export default VideoSection;
