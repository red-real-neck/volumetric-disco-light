export type FrequencyRange = {
  high: number;
  mid: number;
  low: number;
  sub: number;
};

export class AudioController {
  private _context: AudioContext;
  private _analyser: AnalyserNode;
  private _spectrum: Uint8Array;
  private _source: MediaElementAudioSourceNode;
  private _audio: HTMLAudioElement;
  private _play: boolean = false;
  private _playBtn: HTMLElement;
  private _pauseBtn: HTMLElement;

  constructor() {
    this._playBtn = document.querySelector(".playBtn")!;
    this._pauseBtn = document.querySelector(".pauseBtn")!;
    document
      .querySelector(".play-pause-group")
      ?.addEventListener("click", () => {
        if (this._play) {
          this._playBtn.classList.remove("hidden");
          this._pauseBtn.classList.add("hidden");
        } else {
          this._playBtn.classList.add("hidden");
          this._pauseBtn.classList.remove("hidden");
        }
        if (!this._context) {
          this.createContext();
        }
        this.togglePlay();
      });
  }

  createContext() {
    this._audio = new Audio();
    this._audio.src = "./audio.mp3";

    this._context = new AudioContext();
    this._analyser = this._context.createAnalyser();
    this._analyser.smoothingTimeConstant = 0.8;
    this._analyser.fftSize = 64;
    this._spectrum = new Uint8Array(this._analyser.frequencyBinCount);
    this._source = this._context.createMediaElementSource(this._audio);

    this._audio.addEventListener("canplay", () => {
      this._source.connect(this._analyser);
      this._analyser.connect(this._context.destination);
      this._audio.play();
      this._play = true;
    });
  }

  get frequencyAnalyze(): FrequencyRange {
    this._analyser.getByteFrequencyData(this._spectrum);
    // console.log("this._spectrum:", this._spectrum);
    return {
      high:
        (Math.pow(this._spectrum[14] / 256, 2) +
          Math.pow(this._spectrum[15] / 256, 2) +
          Math.pow(this._spectrum[16] / 256, 2) +
          Math.pow(this._spectrum[17] / 256, 2) +
          Math.pow(this._spectrum[18] / 256, 2)) *
        0.5,
      mid:
        (Math.pow(this._spectrum[9] / 256, 2) +
          Math.pow(this._spectrum[10] / 256, 2) +
          Math.pow(this._spectrum[11] / 256, 2) +
          Math.pow(this._spectrum[12] / 256, 2) +
          Math.pow(this._spectrum[13] / 256, 2)) *
        0.4,
      low:
        (Math.pow(this._spectrum[4] / 256, 2) +
          Math.pow(this._spectrum[5] / 256, 2) +
          Math.pow(this._spectrum[6] / 256, 2) +
          Math.pow(this._spectrum[7] / 256, 2) +
          Math.pow(this._spectrum[8] / 256, 2)) *
        0.3,
      sub:
        (Math.pow(this._spectrum[0] / 256, 2) +
          Math.pow(this._spectrum[1] / 256, 2) +
          Math.pow(this._spectrum[2] / 256, 2) +
          Math.pow(this._spectrum[3] / 256, 2)) *
        0.2,
    };
  }

  get context(): AudioContext {
    return this._context;
  }

  togglePlay() {
    if (this._play) {
      this._audio.pause();
      this._play = false;
    } else {
      this._audio.play();
      this._play = true;
    }
  }
}
