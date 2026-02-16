#!/bin/bash

mkdir -p ../dist

cat > build/yields-core/PKG-INFO <<EOF
Metadata-Version: 2.4
Name: yields-core
Version: ${VERSION}
Summary: Yields Library documentation.
License: Proprietary
Author: Edward Arghiroiu
Author-email: edward.arghiroiu@yields.io
Requires-Python: >=3.10
Classifier: License :: Other/Proprietary License
Classifier: Programming Language :: Python :: 3
Classifier: Programming Language :: Python :: 3.10
Classifier: Programming Language :: Python :: 3.11
Classifier: Programming Language :: Python :: 3.12
Classifier: Programming Language :: Python :: 3.13
Classifier: Programming Language :: Python :: 3.14
Project-URL: Repository, https://github.com/yields-io/y-analysis-core
EOF

tar cvzf ../dist/yields-core-${VERSION}-docs.tar.gz -C build yields-core
