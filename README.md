# React Minio Node Express Demo

Demo of how to use minio with react and node express to do file uploads and downloads

## Setup

run npm install on Client and Server folder

open 3 terminals

### in the first one
from the root of project run 'docker-compose up'
this will load minio.  After it finishes, go to this [url](http://localhost:9002).  Use 'PAS86XA3D23TYTO4TSVL' for the access key and 
'rGiALsHl237poM95Ix+XEHY+QeiN6L1B1C3BnZY83' for the secret key.  Create a bucket named 'test'

### in the second one
change to the server directory, run 'npm start'

### in the third one
change to the client directory, run 'npm start'

## Usage

just upload a file then click the reload button, will show the file in the list.  Click the view to redownload the file.
