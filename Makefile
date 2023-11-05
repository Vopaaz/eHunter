.PHONY: dep build

# Install dependency
dep:
	PYTHON=/usr/bin/python3 npm install --legacy-peer-deps

build:
	NODE_OPTIONS=--openssl-legacy-provider npm run build
