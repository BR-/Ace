"use strict";

import Ace from  "../../ace";
import { PluginDescription } from "../../plugin";

import newHTML = require("./aram.html");

export default (<PluginDescription>{
    name: "aram-mapname",
    version: "1.0.0",
    description: "Renames the 'ARAM' map to 'Howling Abyss' to match the others.",
    builtinDependencies: {
        "rcp-fe-lol-parties": "~0.0.598-any"
    },
    setup() {
        this.preinit("rcp-fe-lol-parties", () => {
            let unregister = this.hook("ember-component", Ember => {
                unregister();
                return Mixin(Ember, this.ace);
            }, "parties-game-type-select-wrapper");
        });
    }
});

const Mixin = (Ember: any, ace: Ace) => ({
    didInsertElement() {
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
