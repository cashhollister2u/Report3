#!/bin/bash
trap "kill 0" SIGINT
python Backend/flask_server.py &
cd report3frontend && npm run dev &
wait
