import { Behaviour, serializable, PointerEventData, Renderer } from "@needle-tools/engine";
import { Color, Material } from "three";

export class toggle_material extends Behaviour {

    @serializable(Renderer) renderer?: Renderer;
    // Toggle flag to determine which material state to use
    private toggled = false;
    private defaultColor?: Color;
    // The toggle color (red in this case)
    private switchColor: Color = new Color(1, 0, 0);

    @serializable(Material)
    defaultMaterial?: Material;
    switchMaterial?: Material;

    awake() {
        if (!this.renderer) {
            const foundRenderer = this.gameObject.getComponent(Renderer);
            this.renderer = foundRenderer === null ? undefined : foundRenderer;
        }

        // Store the original color from the first material as a baseline
        if (this.renderer && this.renderer.sharedMaterials.length > 0) {
            this.defaultColor = this.renderer.sharedMaterials[0]["color"].clone();
        }

        this.defaultMaterial = this.renderer?.sharedMaterials[0];
        console.log("Default Material:", this.defaultMaterial);
    }

    onPointerClick(_args: PointerEventData): void {
        if (!this.renderer) return;

        // Toggle the state
        this.toggled = !this.toggled;

        if (this.toggled) {

            if (this.switchMaterial) {
                this.renderer.sharedMaterials[0] = this.switchMaterial;
            }
        } else {
            if (this.defaultMaterial)
                this.renderer.sharedMaterials[0] = this.defaultMaterial;
        }


        // Loop through all materials and update their color based on the toggled state
        for (let mat of this.renderer.sharedMaterials) {
            if (!mat || !mat["color"]) continue;

            if (this.toggled) {
                // mat["color"].copy(this.switchColor);
            } else if (this.defaultColor) {
                // mat["color"].copy(this.defaultColor);
            }
        }
    }

}