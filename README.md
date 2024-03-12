# Prography 9th / FE 사전 과제

## 개발 언어 / 사용 라이브러리

Javascript, React, Axios, LazyLoadImage, QueryString

## Getting Started
```bash
1. npm install
2. npm start
```

## Commit Convention

- ✅ `[chore]` : 동작에 영향 없는 코드 or 변경 없는 변경사항(주석 추가 등)
- ✨ `[feat]` : 새로운 기능 구현
- ➕ `[add]` : Feat 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성
- 🔨 `[fix]` : 버그, 오류 해결
- ⚰️ `[del]` : 쓸모없는 코드 삭제
- 📝 `[docs]` : README나 WIKI 등의 문서 수정
- ✏️ `[correct]` : 주로 문법의 오류나 타입의 변경, 이름 변경시
- ⏪️ `[rename]` : 파일 이름 변경시
- ♻️ `[refactor]` : 전면 수정
- 🔀 `[merge]`: 다른 브랜치와 병합

ex) `commit -m "{#issue number} [feat] users API 구현”`

## 제약사항

- **개발 환경**
    - 웹 브라우저로 크롬 최신 버전을 사용하여 확인합니다.
- **사용 가능 언어**
    - 자바스크립트, 타입스크립트 중 택 1
- **라이브러리 및 프레임워크**
    - **React**를 사용해서 개발해 주세요 (Remix, Next.js 등 **프레임워크**의 사용은 **불가**)
    - MUI나 Ant Design 등 **이미 형태가 구성된 스타일링 라이브러리**의 사용은 **불가**합니다. 단, styled-components와 같은 CSS-in-JS, Tailwind CSS 등 스타일링 유틸리티 성격의 라이브러리 사용은 **자유**입니다.
    - axios, recoil 등 필요한 **라이브러리**는 자유롭게 **추가**하셔도 됩니다.

## 기능 요구사항   
- 메인 페이지: 카테고리 별 음식 목록을 제공

## API 스펙

- 전체 카테고리 조회
  GET www.themealdb.com/api/json/v1/1/categories.php
- 카테고리 별 음식 조회
  GET www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
    

## 구현 스펙

1. **전체 카테고리 조회 API**를 호출해 카테고리 리스트(`strCategory`)를 노출합니다. 
- www.themealdb.com/api/json/v1/1/categories.php의 api를 활용합니다.
    
    이때, 카테고리 리스트의 정렬은 `idCategory` **오름차순**입니다. 
    
    응답값은 다음과 같습니다.
    
    ```tsx
    {
    	categories: [
    		{
    			idCategory: "1",
    			strCategory: "카테고리이름",
    			strCategoryThumb: "카테고리이미지url"
    		}
    	]
    }
    ```
    
2. 카테고리를 클릭 시, **카테고리별 음식 조회 API**를 호출해 해당하는 카테고리의 음식 목록을 보여줍니다.
- 이 때, [https://www.themealdb.com/api/json/v1/1/filter.php?c=](https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood)${strCategory}의 api를 활용합니다. 
   카테고리를 선택하지 않은 상태에서는 아무런 목록도 보이지 않습니다. 
    
    필요한 응답 값은 다음과 같습니다.
    
    ```tsx
    {
      meals: [
    		{
    			strMeal: "음식이름";
    			strMealThumb: "음식이미지url";
    			idMeal:  "1";
    		}
    	] 
    }
    ```
    
    각각의 음식 이름(`strMeal`), 썸네일 이미지(`strMealThumb`)를 카드 형식으로 보여줍니다.
    

3.  선택한 카테고리와 선택하지 않은 카테고리의 스타일을 구분해주세요. (디자인은 자유롭게)

4. 카테고리는 **복수** **선택**이 가능하며, 클릭한 **모든 카테고리**에 대한 음식을 보여줍니다. 
선택된 카테고리를 다시 클릭 시, 해당 카테고리에 대한 음식은 제외되어야 합니다.

5. 카드의 갯수가 **20개** 초과 시 **인피니트 스크롤**을 통해 데이터를 추가적으로 보여줍니다.
이때, 음식 목록에 대한 정보는 프론트 단에 저장하고 있습니다.

6. 각각의 썸네일 이미지는 **lazy loading**이 되어야 합니다.

    
7. 음식 목록에 대한 결과를 사용자가 지정한 레이아웃을 통해 보여줍니다.
    
    <aside>
    <사용자 지정 레이아웃 기준>
    
    1. PC 버전
    : 2개씩 보기 / 4개씩 보기

    - 하나의 행에 4개씩 카드 데이터를 보여줍니다.
    - 사용자는 상단 **select 버튼**을 통해 **[2개씩 보기 / 4개씩 보기]**를 선택할 수 있습니다.
    - 2개씩 보기를 선택하면 하나의 행에는 2개의 음식 카드를 보여줍니다.
    
    2. Mobile 버전
    - 하나의 행에 **한 개**의 카드만 보여줍니다.
    - select 버튼이 사라집니다.
    
    </aside>
    
8. 음식에 대한 결과를 **필터링** 할 수 있습니다. 
필터링 조건은 다음과 같습니다.
    
    <aside>
    <필터링 기준>
    
    1. 최신 등록순
    : 이 때 최신 등록의 기준은 id(`idMeal`)의 값이 클수록 최신 데이터라고 가정합니다.
    
    2. 알파벳 오름차순
    : 음식의 이름(`strMeal`)을 알파벳 오름차순으로 정렬합니다.
    
    3. 알파벳 내림차순
    : 음식의 이름(`strMeal`)을 알파벳 내림차순으로 정렬합니다.
    
    </aside>

9. 쿼리스트링
    - **필터링** 시 url 쿼리스트링에 `filter=new / asc / desc`  **쿼리스트링**을 저장합니다.
    - **카테고리 선택** 시 url 쿼리스트링에 `category=선택된 카테고리 값` **쿼리스트링**을 저장합니다. (복수 선택 시 쉼표(`,`)로 구분)
    - 사용자가 `?category=chicken,Seafood&filter=asc` 와 같이 들어왔을 때, 페이지에 진입시, chicken과 seafood에 해당하는 음식을 볼 수 있어야 합니다. 이 때 **필터값**도 동일해야 합니다.
    - 예시 이미지
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/241897e0-7d0b-400e-8c3b-70dd7d456ef9/c5602929-1c3d-4812-9e71-4590476a2d27/Untitled.gif)
    

10. 이 외에 ux적으로 필요한 기능이 있으면 자유롭게 추가해주세요
