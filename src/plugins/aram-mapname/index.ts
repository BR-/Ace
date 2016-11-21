"use strict";

import Ace from  "../../ace";
import { PluginDescription } from "../../plugin";

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
            const controlDom = this.$(".map-12 > .parties-game-type-card-name")[0];
            controlDom.innerHTML = "Howling Abyss"; //TODO l10n
        });
    }
});
