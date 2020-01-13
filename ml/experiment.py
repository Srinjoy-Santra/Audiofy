from playsound import playsound
import matplotlib.pyplot as plt
import librosa

audio_path = r'../app/public/uploads/Starset_-_Telescope_(audio)-9vjewxPHq9I.mp3'

# display Spectrogram
X = librosa.stft(x)
Xdb = librosa.amplitude_to_db(abs(X))
plt.figure(figsize=(14, 5))
librosa.display.specshow(Xdb, sr=sr, x_axis='time', y_axis='hz')
# If to pring log of frequencies
# librosa.display.specshow(Xdb, sr=sr, x_axis='time', y_axis='log')
plt.colorbar()

playsound(audio_path)