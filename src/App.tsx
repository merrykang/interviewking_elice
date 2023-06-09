import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import HomePage from "./pages/home/Homepage";
import Mypage from "./pages/mypage/Mypage";
import StudyList from "./pages/studylist/StudyList";
import Layout from "./components/layout/Layout";
import TestPage from "./components/modal/TestPage";
import LoginPage from "./pages/login/Login";
import SignupPage from "./pages/login/SignupPage";
import StudyApply from "./pages/mypage/components/StudyApply";
import UserInfo from "./pages/mypage/components/UserInfo";
import UserStudy from "./pages/mypage/components/UserStudy";
import { Feedback } from "./pages/study/Feedback";
import Information from "./pages/study/Information";
import CommunityCreatePage from "./pages/community/CommunityCreatePage";
import CommunityPage from "./pages/community/CommunityPage";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/mypage" element={<Mypage />}>
                <Route path="userstudy" element={<UserStudy />} />
                <Route path="studyapply" element={<StudyApply />} />
                <Route path="userinfo" element={<UserInfo />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login/signup" element={<SignupPage />} />
              <Route path="/studylist" element={<StudyList />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/study/info" element={<Information />} />
              {/* test 페이지 */}
              <Route path="/testpage" element={<TestPage />} />
              <Route path="/Community/CommunityPage" element={<CommunityPage />} />
              <Route path="/Community/CommunityCreatePage" element={<CommunityCreatePage />} />
            </Routes>
          </Layout>
        </QueryClientProvider>
      </Router>
    </RecoilRoot>
  );
}

export default App;
