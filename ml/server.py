from flask import Flask, send_file, render_template, request, jsonify, send_from_directory
import torch
import numpy as np
import scipy
import librosa
import youtube_dl
import os
import soundfile as sf
from flask_cors import CORS
from pydub import AudioSegment

#os.chdir('open_unmix_pytorch')
use_cuda = torch.cuda.is_available()
device = torch.device("cuda" if use_cuda else "cpu")
print(use_cuda, device)

from open_unmix_pytorch import my_test

app = Flask(__name__)  
CORS(app)

path = r"Z:\Documents\lyricist\ml\uploads"
count = 0
orgArr = []
vocArr = []

@app.route('/')  
def home():  
    return render_template("upload.html");
  

@app.route('/success', methods = ['POST', 'GET'])  
def success():
    # Create a folder
    if request.method == 'POST':  
        
        f = request.files['file']
        # ..\app\public
        global path, count
        path = r"Z:\Documents\lyricist\ml\uploads"
        path = path + "\\"+ f.filename.split('.')[0]
        if not os.path.exists(path):
            os.makedirs(path)
        f.save(path + "\\" + 'original.mp3')
        start = 31 #@param {type:"number"}
        stop = 60 #@param {type:"number"}
        audio, rate = librosa.load(
            path + "\\" + 'original.mp3',
            sr=44100,
            offset=start,
            duration=stop-start,
            mono=False
        )
        estimates = my_test.separate(
            audio=audio.T,
            targets=['vocals'],#, 'drums', 'bass', 'other'],
            residual_model=False,
            device=device,
            niter=1
        )
        
        for target, estimate in estimates.items():
            sf.write(path + "\\" + target + '.wav', estimate, rate, subtype='PCM_16')
        song = AudioSegment.from_wav(path + "\\vocals.wav")
        song.export(path + "\\vocals.mp3", format="mp3")
        if os.path.exists(path + "\\vocals.wav"):
            os.remove(path + "\\vocals.wav")
        else:
            print("The vocals.mp3 file does not exist")
        return jsonify({ 'fileName': 'vocals.mp3', 'filePath': path, 'id': count})
    #jsonify({ 'fileName': 'vocals.mp3', 'filePath': path})
    #send_file(path + "\\original.mp3")# + "\\..\\mg-cthu--1h_NN3nqzI-unsplash.jpg")
    #send_file(path + r'\vocals.wav', as_attachment=True)
    if request.method == 'GET':
        print('Fuck off', path)
        return send_file(path + "\\vocals.mp3")

@app.route('/track/<id>', methods = ['GET'])  
def getTrack(id):
    global count
    print(request, count, id, count is int(id))
    if request.method == 'GET':
        if count is int(id):
            try:
                return send_file(path + "\\vocals.mp3")
                count += 1
            except:
                print('File not found!')
                return send_file(path + "Starset - Unbecoming (Official Audio)-E2jFtRHjbPo\\vocals.mp3")
        print('id mismatch')    
        return "Fuck off"
    
@app.route('/data', methods = ['GET'])
def getData():
    global orgArr, vocArr
    if request.method == 'GET':
        jsonify({ 'original': orgArr, 'vocals': vocArr})
if __name__ =="__main__":  
    app.run(debug = True)  