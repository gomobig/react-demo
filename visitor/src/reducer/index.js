const START_UPLOAD = 0;

const reducer = (state, action) => {
  if (!state) {
    state = {
      imagePicker: {
        loading: false,
        uploadStatus: 0,
        imageTocke: null,
        text: '开始拍摄',
      }
    }
  }
  switch (action.type) {
    case START_UPLOAD:
      return { ...state, imagePicker: {...state.imagePicker, loading: true, text: '上传中'} };
    default:
      return state;
  }
}

const startUpload = () => ({type: START_UPLOAD});

export default reducer;
export {
  startUpload,
}