rm -r *.bz2
cd deb
rm -r *.deb
cd ../projects

dpkg-deb -b -Zgzip "CustomCarrier"
dpkg-deb -b -Zgzip "NoPasscodeButtonLightup"

mv *.deb ../deb
cd ..
dpkg-scanpackages -m . /dev/null > Packages
bzip2 Packages