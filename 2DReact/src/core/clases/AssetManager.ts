type AssetType = 'image' | 'audio';

type AssetDescriptor = {
  key: string;
  src: string;
  type: AssetType;
};

type AssetMap = Map<string, any>;

export class AssetManager {
  private static instance: AssetManager;

  private assets: AssetMap = new Map();

  // ---------- AUDIO ----------
  private audioContext?: AudioContext;
  private gainNode?: GainNode;
  private volume: number = 0.7; // 0 → 1

  onLoadedCallbacks: (() => void)[] = [];

  private constructor() {}

  // ---------- SINGLETON ----------
  static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }

  // ---------- AUDIO INIT ----------
  private initAudio(): void {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();

      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = this.volume;
      this.gainNode.connect(this.audioContext.destination);
    }
  }

  // ---------- IMAGE ----------
  async loadImage(key: string, src: string): Promise<void> {
    const img = new Image();
    img.src = src;
    await img.decode();

    this.assets.set(key, img);
  }

  // ---------- AUDIO ----------
  async loadAudio(key: string, src: string): Promise<void> {
    this.initAudio();

    const response = await fetch(src);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);

    this.assets.set(key, audioBuffer);
  }

  // ---------- LOAD ALL ----------
  async loadAssets(assets: AssetDescriptor[]): Promise<void> {
    await Promise.all(
      assets.map((asset) => {
        switch (asset.type) {
          case 'image':
            return this.loadImage(asset.key, asset.src);
          case 'audio':
            return this.loadAudio(asset.key, asset.src);
        }
      })
    );

    this.onLoadedCallbacks.forEach((cb) => cb());
  }

  setOnLoaded(callback: () => void): void {
    this.onLoadedCallbacks.push(callback);
  }

  // ---------- ACCESS ----------
  get<T>(key: string): T {
    const asset = this.assets.get(key);
    if (!asset) {
      throw new Error(`Asset "${key}" not loaded`);
    }
    return asset as T;
  }

  has(key: string): boolean {
    return this.assets.has(key);
  }

  getAudioContext(): AudioContext {
    this.initAudio();
    return this.audioContext!;
  }

  // ---------- PLAY AUDIO ----------
  playAudio(buffer: AudioBuffer, volume: number = 1): void {
    this.initAudio();

    if (this.audioContext!.state === 'suspended') {
      this.audioContext!.resume();
    }

    const source = this.audioContext!.createBufferSource();
    source.buffer = buffer;

    // 🔊 per-sound volume
    const soundGain = this.audioContext!.createGain();
    soundGain.gain.value = Math.max(0, Math.min(1, volume));

    source.connect(soundGain);
    soundGain.connect(this.gainNode!); // master volume

    source.start();
  }

  // ---------- VOLUME ----------
  setVolume(value: number): void {
    this.volume = Math.max(0, Math.min(1, value));
    if (this.gainNode) {
      this.gainNode.gain.value = this.volume;
    }
  }

  getVolume(): number {
    return this.volume;
  }

  fadeVolume(target: number, duration = 0.3): void {
    if (!this.audioContext || !this.gainNode) return;

    const gain = this.gainNode.gain;
    gain.cancelScheduledValues(this.audioContext.currentTime);
    gain.linearRampToValueAtTime(
      Math.max(0, Math.min(1, target)),
      this.audioContext.currentTime + duration
    );
  }
}
