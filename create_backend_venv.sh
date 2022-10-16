#!/bin/bash
rm -rf backend_server/.venv
python -m venv backend_server/.venv
source backend_server/.venv/Scripts/activate
python -m pip install --upgrade pip
pip install -r backend_server/src/requirements.txt