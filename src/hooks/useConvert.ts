import axiosInstance from "../../axiosInstance";
import generateUMLFromJSON from "../utils/generateUMLFromJSON";

async function useConvert(HomeViewModel) {
  try {
    const response = await axiosInstance.post(
      "/api/v1/chat/convert",
      HomeViewModel.plantUMLSource
    );
    const mermaidSourceCode = generateUMLFromJSON(response.data);
    HomeViewModel.setMermaidSource(mermaidSourceCode);
  } catch (error) {
    console.error(error);
  }
};

export default useConvert;