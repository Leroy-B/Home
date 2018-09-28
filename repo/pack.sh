find /projects \( -name .DS_Store -o -name ._.DS_Store \) -exec rm -f {} \+
rm -r *.bz2
cd deb
rm -r *.deb
cd ../projects

dpkg-deb -b -Zgzip "CustomStatusBar"
dpkg-deb -b -Zgzip "CustomCC"
dpkg-deb -b -Zgzip "NoPasscodeButtonLightup"
dpkg-deb -b -Zgzip "CustomSBIconList"
dpkg-deb -b -Zgzip "AlwaysRemindMe"

mv *.deb ../deb
cd ..
dpkg-scanpackages -m . /dev/null > Packages
bzip2 Packages
