ARCHS = armv7 arm64

include $(THEOS)/makefiles/common.mk

BUNDLE_NAME = CustomCarrierPreferences
CustomCarrierPreferences_FILES = CustomCarrierPreferences.mm
CustomCarrierPreferences_INSTALL_PATH = /Library/PreferenceBundles
CustomCarrierPreferences_FRAMEWORKS = UIKit
CustomCarrierPreferences_PRIVATE_FRAMEWORKS = Preferences

include $(THEOS_MAKE_PATH)/bundle.mk

internal-stage::
	$(ECHO_NOTHING)mkdir -p $(THEOS_STAGING_DIR)/Library/PreferenceLoader/Preferences$(ECHO_END)
	$(ECHO_NOTHING)cp entry.plist $(THEOS_STAGING_DIR)/Library/PreferenceLoader/Preferences/CustomCarrierPreferences.plist$(ECHO_END)