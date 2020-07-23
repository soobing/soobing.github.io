import React from 'react'
import { graphql } from 'gatsby'

import { rhythm } from '../utils/typography'
import * as Lang from '../constants'

export default ({ data }) => {
  const resumes = data.allMarkdownRemark.edges

  const resume = resumes
    .filter(({ node }) => node.frontmatter.lang === Lang.ENGLISH)
    .map(({ node }) => node)[0]

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(0.5)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
          3 / 4
        )}`,
      }}
    >
      {/* <div dangerouslySetInnerHTML={{ __html: resume.html }} /> */}

      <h1>안녕하세요 박수빈 입니다.</h1>
      <p>
        <pre>
          " 노동 없는 삶은 부패한다.
          그러나 영혼 없는 노동은 삶을 질식시킨다. "
          _알베르 카뮈
        </pre>


        안녕하세요 박수빈 입니다. <code class="language-text">제가 만든 것이 누군가에게 편리함을 준다</code>는 것에 큰 동기부여를 얻습니다.

        함께 일하는 동료들과 자연스럽게 토론하고 모르는 것을 물어 볼 수 있는 분위기를 선호하며, 그런 환경이 제 뇌를 부드럽게 만들어 준다고 생각합니다.

        트렌디하고 항상 성장하는 사람이 되고 싶습니다.
      </p>



      <h1>Experience</h1>
      <p>에이블리 (2019.05 ~)</p>
      <p>스위트스팟 (2019.02 ~ 2020.05)</p>
      <p>오스템임플란트 (2016.11 ~ 2019.01)</p>

      <h1>Project</h1>
      <p><b>Sweetspot 공간 중개 플랫폼 개발</b> __ 2019.02 ~ 2020.05</p>
      <ul>
        <li>공간 등록, 행사대행(BTL), 편집샵, 플리마켓 신청, 마이페이지 개발</li>
        <li>사업자 전환 신청, 플리마켓 신청</li>
        <li>반응형 웹 및 애니메이션을 사용하여 개발</li>
      </ul>


      <p><b>Sweetspot 공간 중개 플랫폼 백오피스 개발</b></p>

      <p><b>Sweetspot 프로젝트 기여</b></p>
      <ul>
        <li>SSR 도입(Next.js)</li>
        <li>Storybook & TS 프로젝트에 도입</li>
        <li>next-bundle-analyzer를 이용하여 Bundle size 최적화</li>
        <li>Github Action을 이용하여 PR을 올리면 build 하도록 환경을 구축</li>
      </ul>
      <hr />
      <p><b>오스템임플란트 3D CT Viewer 개발 __ 2016.11 ~ 2019.01</b></p>
      <ul>
        <li>Cross-Section 페이지 개발, Management 페이지, Report 페이지, Setting 페이지 개발</li>
        <li>2D 소프트웨어 연동 개발</li>
        <li>Jenkins를 이용하여 빌드 및 패키징(NSIS) 자동화</li>
        <li>Intel IPP/MKL 2013에서 2017로 변경하여 Google Test 진행</li>
        <li>directX dpi 사용시 해상도의 크기에 맞게 사이즈 고정하도록 플랫폼 개선</li>
      </ul>

      <h1>OpenSource</h1>
      Mocha, Gatsby

      <h1>Awards</h1>
      <ul>
        <li>2019 공개SW 컨트리뷰톤(장려상) / 정보통신산업진흥원 __ 2019.12</li>
        <li>세종대학교 전자정보공과대학 아이디어톤(총장상) / 세종대학교 __ 2016.05</li>
        <li>ENERGY HACKATHON(대상) / ENCORED __ 2016.03</li>
      </ul>

      <h1>Education</h1>
      <p><b>세종대학교</b>   환경에너지공간융합학과 / 컴퓨터공학과(복수전공)   2013.03 ~ 2017.02</p>
      <ul>
        <li>2015 여대학(원)생 공학연구 사업 WISET</li>
        <li>멋쟁이사자처럼 4기   2016.03~2016.12</li>
        <li>Sejong Vivid Festival 2016 축제 소개 사이트 개발</li>
      </ul>
    </div>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { category: { eq: null } } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            lang
          }
        }
      }
    }
  }
`
