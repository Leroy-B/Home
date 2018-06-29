TARGET = iphone:latest:7.0
# TARGET = simulator:clang::11.0

ARCHS = arm64
# ARCHS = x86_64

include $(THEOS)/makefiles/common.mk

TWEAK_NAME = CustomSBIconList
CustomSBIconList_FILES = Tweak.xm

include $(THEOS_MAKE_PATH)/tweak.mk


# comment out after this for "simulator"
after-install::
	install.exec "killall -9 SpringBoard"

SUBPROJECTS += customsbiconlistpreferences

include $(THEOS_MAKE_PATH)/aggregate.mk
