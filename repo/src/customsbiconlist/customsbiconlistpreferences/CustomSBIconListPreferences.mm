#import <Preferences/Preferences.h>

@interface CustomSBIconListPreferencesListController: PSListController @end

@implementation CustomSBIconListPreferencesListController

	- (id)specifiers {
		
		if(!_specifiers) {
			_specifiers = [[self loadSpecifiersFromPlistName:@"CustomSBIconListPreferences" target:self] retain];
		}
		
		return _specifiers;
	}
	
	- (void)getTwitterURL {
		
		if([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"twitter://"]]) {
			[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"twitter://user?screen_name=IDEK_a_Leroy"]];
		}
		
		else {
			[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"https://twitter.com/IDEK_a_Leroy"]];
		}
	}

@end
