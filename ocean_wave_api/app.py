
# flask modules
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
import json

# data processing modules
import numpy as np
import pandas as pd

# wave modeling module
import wave_module as wm

# set up a flask app
app = Flask(__name__)

# set up a flask restful api on the flask app
CORS(app)


@app.route("/getwavematrixwparam", methods=['GET'])
def get_wavematrixwparam():

    if 'windspeed' in request.args:
        windSpeed = float(request.args['windspeed'])
        print(windSpeed)

    else:
        return "Error: No windspeed field provided. Please specify an windspeed."

    if 'angle' in request.args:
        angle = float(request.args['angle'])
        print(angle)
    else:
        return "Error: No angle field provided. Please specify an angle."

    # wind speed constants
    windSpeed = np.array(windSpeed, dtype=float)

    # wind direction vector
    windDirectionVect = [
        np.cos(np.deg2rad(angle)), np.sin(np.deg2rad(angle))
    ]
    windDirectionVect = windDirectionVect/np.linalg.norm(windDirectionVect)

    # make the waveVector Field
    spatialExtent = 10  # scene extent in meters
    waveFieldDelta = 2*np.pi/spatialExtent
    N = 64
    k = np.linspace(-N/2, N/2-1, N) * waveFieldDelta

    waveFieldKx, waveFieldKy = np.meshgrid(k, k)

    # make spatial axis
    spatialDelta = spatialExtent/N
    x = np.linspace(-N/2, N/2-1, N) * spatialDelta
    xGrid, yGrid = np.meshgrid(x, x)

    # process data
    spectrum, normWaveField = wm.phillipsSpectrum(
        waveFieldKx, waveFieldKy, windDirectionVect, windSpeed)

    initSpectrum = wm.initWaveSpectrum(spectrum)

    time = 153  # in seconds
    waveAtT = wm.makeWaveFieldAtTimeT(
        initSpectrum, normWaveField, waveFieldDelta, time)

    # add code to smooth wave

    # return as json (approach 2)
    #waveAtT = waveAtT.astype(np.float16)

    #waveData = pd.DataFrame(waveAtT).to_json(orient='values')
    # waveData = make_response(pd.DataFrame(
    #    waveAtT).to_json(orient='split'))
    # return waveData

    # force it to be real valued
    waveAtT = np.real(waveAtT)

    # reduce precision to 16 bit float
    waveAtT = waveAtT.astype(np.float16)

    result = {'data': waveAtT.tolist()}
    return jsonify(result)


# add endpoint route
#api.add_resource(returnWaveMatrixWParam, '/getwavematrixwparam/')

# if modules name is main (when code run directly) then run
# server at specified address
if __name__ == '__main__':
    app.run(
        debug=True,
        host='0.0.0.0',
        port=3000,
    )
