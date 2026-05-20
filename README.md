Plant Ecology and Remote Sensing lab website.
Admin: 
After adding new PDFs, run:
./update-pdf-index.sh
It scans uploads/papers/*.pdf, extracts the keys, and rewrites uploads/papers/index.json. The publications page fetches that JSON on load and activates PDF links automatically.
