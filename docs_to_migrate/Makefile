VERSION?=`(grep -m 1 version ../src/yields-core/pyproject.toml || echo "version = '0.0.0.dev0'") | tr -s ' ' | tr -d '"' | tr -d "'" | cut -d' ' -f3`

all:	clean	prepare	build

clean:
	rm -rf build

prepare:
	mkdir -p build/yields-core/html
	pip install \
	"sphinx~=8.2.3" \
	"furo~=2024.8.6" \
	"sphinx-autoapi~=3.6.0" \
	"sphinx-copybutton~=0.5.2" \
	"sphinx-inline-tabs~=2023.4.21"

.PHONY: build
build:
	VERSION=$(VERSION) sphinx-build . build/yields-core/html
	VERSION=$(VERSION) ./build.sh
