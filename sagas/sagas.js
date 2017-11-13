import watchPost from "./QuesAdd";
import watchAnswer from "./AnswAdd";
import chatData from "./ChatContent";
import chatgetData from "./ChatHistory";
import quesAns from "./UserGivenAnswer";
import atStart from "./GetAllQues";
import atStartAnswer from "./GetAllAnswer";
import imagePost from "./ImgUpload";
import user from "./UserDetail";
const rootSaga = function* rootSaga() {
  yield [
    watchPost(),
    watchAnswer(),
    atStart(),
    atStartAnswer(),
    chatData(),
    chatgetData(),
    quesAns(),
    imagePost(),
    user()
  ];
};

export default rootSaga;
