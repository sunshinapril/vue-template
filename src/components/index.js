import TextButton from './TElement/TextButton'
import TButton from './TElement/TButton'
import TPagination from './TElement/TPagination'
import TTable from './TElement/TTable'
import TDialog from './TElement/TDialog'
import TInput from './TElement/TInput'
import TSelect from './TElement/TSelect'
import TSwitch from './TElement/TSwitch'
import TTab from './TElement/TTab'
import TRadioGroup from './TElement/TRadioGroup'
import TTag from './TElement/TTag'
import TDatePicker from './TElement/TDatePicker'
import TAutoComplete from './TElement/TAutoComplete'
import TCascader from './TElement/TCascader'
import TSlider from './TElement/TSlider'
import THeader from './THeader'
import TBody from './TBody'
import ResetPasswordBox from '@/components/TResetPassword'

export default {
  install(Vue) {
    Vue.component(TextButton.name, TextButton)
    Vue.component(TButton.name, TButton)
    Vue.component(TPagination.name, TPagination)
    Vue.component(TTable.name, TTable)
    Vue.component(TDialog.name, TDialog)
    Vue.component(TInput.name, TInput)
    Vue.component(TSelect.name, TSelect)
    Vue.component(TSwitch.name, TSwitch)
    Vue.component(TTab.name, TTab)
    Vue.component(TRadioGroup.name, TRadioGroup)
    Vue.component(TTag.name, TTag)
    Vue.component(TDatePicker.name, TDatePicker)
    Vue.component(TAutoComplete.name, TAutoComplete)
    Vue.component(TCascader.name, TCascader)
    Vue.component(TSlider.name, TSlider)
    Vue.component(THeader.name, THeader)
    Vue.component(TBody.name, TBody)
    Vue.prototype.$resetPassword = ResetPasswordBox.alert
  }
}
