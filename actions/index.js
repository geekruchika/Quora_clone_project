import * as types from "../constants/constant";

export function fetchrecord() {
  return { type: types.START_CONTENT };
}

export function postrecord(payload) {
  return {
    type: types.POST_CONTENT,
    payload
  };
}

export function fetchquesans(payload) {
  return {
    type: types.QUES_ANS_CONTENT,
    payload
  };
}

export function fetchAnsRecord(payload) {
  return {
    type: types.ANS_CONTENT,
    payload
  };
}

export function fetchRenderAnsRecord(payload) {
  return {
    type: types.ANSWER_CONTENT,
    payload
  };
}

export function fetchChatRecord(payload) {
  return {
    type: types.CHAT_CONTENT_GET,
    payload
  };
}

export function fetchRenderChatRecord(payload) {
  return {
    type: types.CHAT_CONTENT,
    payload
  };
}

export function imageUpload(payload) {
  return {
    type: types.IMAGE_UPLOAD,
    payload
  };
}
