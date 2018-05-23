TARGET = iphone:11.2:7.0
ARCHS = armv7 arm64
include $(THEOS)/makefiles/common.mk

TWEAK_NAME = CustomCarrier
CustomCarrier_FILES = Tweak.xm

include $(THEOS_MAKE_PATH)/tweak.mk

after-install::
	install.exec "killall -9 SpringBoard"

SUBPROJECTS += customcarrierpreferences

include $(THEOS_MAKE_PATH)/aggregate.mk
