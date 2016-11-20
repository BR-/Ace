"use strict";

import { PluginDescription } from "../../plugin";

export default (<PluginDescription>{
    name: "aram-mapname",
    version: "1.0.0",
    description: "Renames the 'ARAM' map to 'Howling Abyss' to match the others.",
    builtinDependencies: {
        "rcp-fe-lol-parties": "~0.0.598-any"
    },
    setup() {
        let unregisterContent: () => void;
        
        this.postinit("rcp-fe-lol-parties", () => {
            unregisterContent = this.hook("template-content", (doc: DocumentFragment) => {
                if (doc.querySelector("#ember4218")) {
console.log("MODIFIED ARAM");
console.log(doc.querySelector("#ember4218"));
                    // Modify the template.
                    // TODO: use game_select_map_name_12 l10n
                    (<HTMLElement>doc.querySelector(".map-12 > .parties-game-type-card-name")).innerHTML = "Howling Abyss";
                    
                    // Immediately unregister, to make sure we do not modify the same template twice.
                    // This is mainly for performance reasons, not because it would cause issues.
                    unregisterContent();
                }
            });
        });
    }
});
