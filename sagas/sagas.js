import watchPost from "./QuesAdd";
import watchAnswer from "./AnswAdd";
import chatData from "./ChatContent";
import chatgetData from "./ChatHistory";
import quesAns from "./UserGivenAnswer";
import atStart from "./GetAllQues";
import atStartAnswer from "./GetAllAnswer";

const rootSaga = function* rootSaga() {
  yield [
    watchPost(),
    watchAnswer(),
    atStart(),
    atStartAnswer(),
    chatData(),
    chatgetData(),
    quesAns()
  ];
};

export default rootSaga;
