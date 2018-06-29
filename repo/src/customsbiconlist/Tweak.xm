#import <UIKit/UIKit.h>

static NSString * const CustomSBIconListPreferencesFile = @"/var/mobile/Library/Preferences/com.leroy.CustomSBIconListPreferences.plist";

NSString *marginTopString = @"";
NSString *marginLeftString = @"";
BOOL enableTweak = YES;


%hook SBRootIconListView

    -(void)setFrame:(CGRect)arg1{
  
      NSDictionary *settings = [NSDictionary dictionaryWithContentsOfFile: CustomSBIconListPreferencesFile];

      if(settings) {
        enableTweak = [settings objectForKey: @"toggleSwitch"] ? [[settings objectForKey: @"toggleSwitch"] boolValue] : enableTweak;
        marginTopString = [settings objectForKey: @"marginTopPrefValue"] ? [settings objectForKey: @"marginTopPrefValue"] : marginTopString;
        marginLeftString = [settings objectForKey: @"marginLeftPrefValue"] ? [settings objectForKey: @"marginLeftPrefValue"] : marginLeftString;
      }
      
      double marginTop = [marginTopString doubleValue];
      double marginLeft = [marginLeftString doubleValue];
      
      if(enableTweak){
        CGRect newFrame = arg1;
        newFrame.origin.y = arg1.origin.y + marginTop;
        newFrame.origin.x = arg1.origin.x + marginLeft;
        %orig(newFrame);
      } else {
        %orig;
      }
}

%end

