
class VoiceService {
  private static instance: VoiceService;
  private synth: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null;
  private speaking: boolean = false;
  
  private constructor() {
    this.synth = window.speechSynthesis;
  }
  
  public static getInstance(): VoiceService {
    if (!VoiceService.instance) {
      VoiceService.instance = new VoiceService();
    }
    return VoiceService.instance;
  }
  
  public speak(text: string, onEnd?: () => void): void {
    // Stop current speech if any
    this.stop();
    
    // Create new utterance
    this.utterance = new SpeechSynthesisUtterance(text);
    
    // Set properties
    this.utterance.rate = 0.9; // Slightly slower than default
    this.utterance.pitch = 1;
    this.utterance.volume = 1;
    
    // Try to use a good voice if available
    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes("Google") || voice.name.includes("Samantha") || voice.name.includes("Daniel")
    );
    
    if (preferredVoice) {
      this.utterance.voice = preferredVoice;
    }
    
    // Set event handlers
    if (onEnd) {
      this.utterance.onend = () => {
        this.speaking = false;
        onEnd();
      };
    }
    
    // Start speaking
    this.speaking = true;
    this.synth.speak(this.utterance);
  }
  
  public stop(): void {
    if (this.speaking) {
      this.synth.cancel();
      this.speaking = false;
    }
  }
  
  public isSpeaking(): boolean {
    return this.speaking;
  }
  
  public getVoices(): SpeechSynthesisVoice[] {
    return this.synth.getVoices();
  }
}

export default VoiceService;
