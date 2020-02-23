import {RXElement} from "../rxelement"
//import {addonTypyCaptionstInthneItem} from "../schemas/content/thst-inthne-item"

export class HTMLCaption extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlCaption'
    this.toolboxInfo.elementName = "td"
    this.className = 'HTMLCaption'

    this.editMarginStyle.padding = '10px'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'caption'
    this.label = "caption"
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.becomeToTextfield()
  }

  make(){
    return new HTMLCaption
  }

}
