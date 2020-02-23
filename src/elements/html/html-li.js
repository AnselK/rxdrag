import {RXElement} from "../rxelement"
import {addonTypyListInlineItem} from "../schemas/content/list-inline-item"

export class HTMLLi extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlLi'
    this.toolboxInfo.elementName = "li"
    this.className = 'HTMLLi'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'li'
    this.label = "li"
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol']
    this.becomeToTextfield()

    addonTypyListInlineItem(this)
  }

  make(){
    return new HTMLLi
  }

}
