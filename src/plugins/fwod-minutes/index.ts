"use strict";

import { PluginDesription } from "../../plugin";
import { RegisterElementParams } from "../../hook-providers/register-element";
import { wrap_method } from "../../util";

export default (<PluginDescription>{
	name: "fwod-minutes",
	version: "1.0.0",
	description: "Adds a minutes counter to the First Win of Day display",
	builtinDependencies: {
		"rcp-fe-lol-profiles": "~0.0.213-any"
	},
	setup() {
		let unregisterElement: () => void = () => {};

		this.preinit("rcp-fe-lol-profiles", () => {
			unregisterElement = this.hook("register-element", (args: RegisterElementParams) => {
				wrap_method(args.prototype, "fwodUnavailableString", function(original: any, [n]: any) {
					var fwod = this.get("fwodActive");
					if (!fwod) {
						var start = this.get("boosts.firstWinOfTheDayStartTime");
						var now = (new Date).toISOString();
						if (start > now) {
							
						}
					}
				});
			}, "profile-boosts-component");
		});

		this.postinit("rcp-fe-lol-profiles", unregisterElement);
	}
});




/* A:\plugins\rcp-fe-lol-profiles\global\default\bundle.js#15187
// c.default is moment.js
// l.translate is l10n probably
            fwodUnavailableString: s.Ember.computed("fwodActive", "tra.profile_perks_first_win_tooltip_message_unavailable", function() {
                var e = this.get("fwodActive");
                if (!e) {
                    var t = this.get("boosts.firstWinOfTheDayStartTime"),
                        n = (new Date).toISOString();
                    if (t > n) {
                        var r = Math.max(Math.round((0, c.default)(t).diff((0, c.default)(n), "hours", !0)), 1);
                        return (0, l.translate)(this, "profile_perks_first_win_tooltip_message_unavailable", {
                            nextFwod: r
                        })
                    }
                }
            }),

*/