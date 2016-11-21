"use strict";

import { PluginDescription } from "../../plugin";

import newHTML = require("./aram.html");

export default (<PluginDescription>{
    name: "aram-mapname",
    version: "1.0.0",
    description: "Renames the 'ARAM' map to 'Howling Abyss' to match the others.",
    builtinDependencies: {
        "rcp-fe-lol-parties": "~0.0.598-any",
        "rcp-fe-l10n": "*"
    },
    setup() {
        let l10n: any;
        this.postinit("rcp-fe-l10n", p => {
            l10n = p.api;
        });
        this.preinit("rcp-fe-lol-parties", () => {
            let unregister = this.hook("ember-component", Ember => {
                unregister();
                return Mixin(Ember, l10n);
            }, "parties-game-type-select-wrapper");
        });
    }
});

const Mixin = (Ember: any, l10n: any) => ({
    didInsertElement() {
        (<any>window)['asd'] = l10n;
        this._super();
        Ember.run.scheduleOnce('afterRender', this, function() {
            const mapname = this.$(".map-12 > .parties-game-type-card-name")[0];
            if (mapname) {
                mapname.innerHTML = "Howling Abyss";
            }
            const queuetype = this.$(".map-12 + .parties-game-type-lower-half")[0];
            if (queuetype) {
                queuetype.innerHTML += newHTML;
            }
            const playercount = this.$(".map-12 > .parties-game-type-card-break")[0];
            if (playercount) {
                playercount.innerHTML = "5v5 ARAM";
            }
        });
    }
});
