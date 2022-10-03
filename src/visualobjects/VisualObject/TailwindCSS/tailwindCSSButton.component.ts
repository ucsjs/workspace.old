import { VisualObject } from "../../Components/Core/VisualObject.component";
import { Font } from "../../Components/Style/Font.component";
import { Content } from "../../Components/HTML/Content.component";
import { Button } from "../../Components/Form/Button.component";

export class TailwindCSSButtonVisual extends VisualObject {
    //Matadata
    protected override __namespace = "Button";
    protected override __group = "TailwindCSS";
    protected override __icon = "fa-regular fa-hand-pointer";
    protected override __resizable = true;
    protected override __moveble = true;

    public _font: Font;
    public _content: Content;
    public _button: Button;
    
    constructor($argv){
        super($argv);

        this._class._content = { content: "inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" }; 
    }

    public content(){
        return `<button 
        :type="component.Button.type" 
        :disabled="component.Button.disabled" 
        :autofocus="component.Button.autofocus" 
        :name="component.Button.name" 
        :class="component.Class?.content?.content"
        >
            <font-awesome-icon 
                :icon="component.Button?.icon.icon" 
                v-if="component.Button?.icon.icon" 
                :style="{'margin-right': (component.Content?.text.content) ? '5px' : '0px' }" 
            />
            {{ component.Content?.text.content }}
        </button>`;
    }
}