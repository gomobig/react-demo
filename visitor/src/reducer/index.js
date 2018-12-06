const SAVE_IMAGE_TOKEN = 0;
const CLEAR_IMAGE_TOKEN = 1;


const reducer = (state, action) => {
  if (!state) {
    state = {
      imageToken: '',
      id: '',
      visitorName: '',
    }
  }
  switch (action.type) {
    case SAVE_IMAGE_TOKEN:
      return { ...state, imageToken: action.payload };
    case CLEAR_IMAGE_TOKEN:
      return { ...state, imageToken: ''};
    default:
      return state;
  }
};

const saveVisitorInfo = visitor => ({type: SAVE_IMAGE_TOKEN, payload: visitor});
const clearImageToken = () => ({type: CLEAR_IMAGE_TOKEN});
export default reducer;
export {
  saveVisitorInfo,
  clearImageToken,
}