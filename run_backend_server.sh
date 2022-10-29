#!/bin/bash
if [ ! -d "backend_server/.venv" ]
then
    deactivate
    python -m venv backend_server/.venv
    source backend_server/.venv/Scripts/activate
    python -m pip install --upgrade pip
    pip install -r backend_server/src/requirements.txt
fi

source backend_server/.venv/Scripts/activate
python backend_server/src/musical_backend_server.py