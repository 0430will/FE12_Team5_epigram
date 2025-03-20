import axios from "axios";

const API_BASE_URL = "https://fe-project-epigram-api.vercel.app/12-5";

export interface Epigram {
  id: number;
  author: string;
  content: string;
  referenceTitle: string;
  referenceUrl: string;
  likeCount: number;
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

// 에피그램 목록 가져오기
export const fetchEpigrams = async (page: number, limit: number) => {
  const response = await axios.get(`${API_BASE_URL}/epigrams`, {
    params: { page, limit }
  });
  return response.data;
};

// 특정 에피그램의 댓글 가져오기
export const fetchComments = async (epigramId: number, page: number, limit: number = 4) => {
  const res = await api.get(`/epigrams/${epigramId}/comments?limit=${limit}&page=${page}`);
  return res.data;
};
