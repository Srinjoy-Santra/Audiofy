import torch
import numpy as np
import scipy
import librosa
import youtube_dl
import os
import soundfile as sf
from IPython.display import Audio, display

#os.chdir('open-unmix-pytorch')
use_cuda = torch.cuda.is_available()
device = torch.device("cuda" if use_cuda else "cpu")
print(use_cuda, device)

from open_unmix_pytorch import my_test

start =   31 #@param {type:"number"}
stop = 60 #@param {type:"number"}
audio, rate = librosa.load(
    r'Z:\Music\PyMusic\Skillet - Hero (Official Video)-uGcsIdGOuZY.mp3',
    sr=44100,
    offset=start,
    duration=stop-start,
    mono=False
)
#display(Audio(audio, rate=rate))

estimates = my_test.separate(
    audio=audio.T,
    targets=['vocals', 'drums', 'bass', 'other'],
    residual_model=False,
    device=device,
    niter=1
)
for target, estimate in estimates.items():
    sf.write(target + '.wav', estimate, rate, subtype='PCM_16')
    
librosa.output.write_wav('file_trim_5s.wav', audio, rate)

print(estimates.items())