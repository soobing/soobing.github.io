---
title: package.json 설정 얼마나 알고있니?
date: '2025-01-05 00:00:00'
author: soobing
tags: package.json config 설정
categories: config
draft: false
---

개발자들이 `package.json` 파일을 접하는 순간은 주로 웹 애플리케이션을 개발할 때입니다. 대체로 의존성 관리를 위해서 사용하고, 특정 스크립트를 추가하거나 버전을 관리하는 정도로 활용되곤 하죠. 하지만 **라이브러리를 개발하다 보면 우리가 잘 사용하지 않던 설정**들이 있다는 것을 알게 됩니다. 이번 글에서는 공식문서를 기반으로 여러분이 잘 모르고 있을 수 있는 `package.json`의 설정을 자세히 알아보도록 하겠습니다.

![썸네일](./thumbnail.png)
### 1. `name`, `version`, `description`, `keywords`, `homepage`

웹 앱이 아닌 라이브러리를 만들 예정이라면(패키지를 npm 레지스트리에 배포할 계획이라면), `name`과 `version` 필드가 가장 중요하며 반드시 포함되어야 합니다. 이 두 필드는 함께 고유 식별자를 형성합니다. 패키지를 배포하지 않을 계획이라면, `name`과 `version` 필드는 선택 사항입니다.

- `name`: 패키지의 이름을 정의합니다.
- `version`: 패키지의 버전을 정의합니다.
    - [semver](https://github.com/npm/node-semver)을 따르며, [`npm-version`](https://docs.npmjs.com/cli/v8/commands/npm-version) cli를 통해 버전을 업데이트 할 수 있습니다.
- `description`: 패키지에 대한 간단한 설명을 추가합니다.
- `keywords`: npm 패키지 검색에 잘 노출되도록 도와주는 키워드 리스트를 정의합니다.
- `homepage`: 패키지의 공식 문서나 더 많은 정보를 얻을 수 있는 홈페이지 URL을 정의합니다.

```json
{
  "name": "your-library",
  "version": "1.0.0",
  "description": "This is a sample library.",
  "keywords": [
    "node",
    "library",
    "example"
  ],
  "homepage": "https://your-library-homepage.com"
}
```

### 2. `bugs`

`bugs` 속성에는 프로젝트 문제를 보고할 수 있는 버그 리포트 URL이나 이메일을 명시합니다. 이를 통해 사용자는 버그를 발견했을 때 어디로 보고해야 할지 알 수 있습니다. [`npm bugs <package-name>`](https://docs.npmjs.com/cli/v8/commands/npm-bugs) 명령어를 사용하면 해당 패키지의 명시된 버그 리포트 URL이 반환되어 어디로 리포팅 해야하는지 알 수 있습니다.

```json
{
  "bugs": {
    "url": "https://github.com/username/repository/issues",
    "email": "support@example.com"
  }
}
```

### 3. `license`

`license` 속성은 패키지의 라이선스 유형을 명시합니다. 이는 패키지를 사용할 수 있는 조건을 정의하며, 오픈 소스 커뮤니티에서는 매우 중요한 정보입니다.

- 단일 라이선스
    
    ```json
    {
      "license": "MIT"
    }
    ```
    
- 다중 라이선스
    - 다중 라이선스는 패키지가 여러 개의 라이선스를 제공하는 것을 의미하며, **사용자의 상황에 맞는 라이선스를 선택할 수 있도록** 유연성을 제공합니다.
    - 예를 들면, 오픈 소스 사용자는 무료로 사용할 수 있도록 MIT를 제공하고, 기업은 더 안전한 법적 보호를 위해 Apache-2.0을 선택할 수 있습니다.
    
    ```json
    {
      "license": "(MIT OR Apache-2.0)"
    }
    ```
    
- 커스텀 라이선스
    
    ```json
    {
      "license": "SEE LICENSE IN <filename>"
    }
    ```
    
- 비공개 패키지
    
    `license`를 `UNLICENSED`로 설정하고, `private: true`를 추가하여 **의도치 않은 배포를 방지**할 수 있습니다.
    
    - 회사 내부 전용, 개발 중인 경우, 외부에 배포되지 않는 저작권 보호를 받는 비공개 소스 코드인 경우에 다음과 같은 설정으로 의도치 않게 npm 레지스트리에 배포되는 경우를 방지할 수 있습니다.
    
    ```json
    {
      "license": "UNLICENSED",
      "private": true
    }
    ```
    

### 4. `author`와 `contributors`

`author`와 `contributors` 속성은 패키지의 저자와 기여자에 대한 정보를 제공합니다. 이를 통해 누가 패키지를 만들었고, 누가 기여했는지를 명확히 할 수 있습니다. 

단일 작성자의 경우 `author`를, 다중 작성자가 존재하는 경우 `contributors`를 사용하면 됩니다.

```json
{
  "author": "John Doe <john.doe@example.com> (https://johndoe.com)",
  "contributors": [
    "Jane Smith <jane.smith@example.com> (https://janesmith.com)",
    "Bob Johnson <bob.johnson@example.com> (https://bobjohnson.com)"
  ]
}
```

아래와 같이 작성해도 됩니다.  `name`, `email`, `url`은 모두 포함하지 않아도 되며, 선택 사항 입니다.

```json
{
  "author": {
    "name": "Barney Rubble",
    "email": "b@rubble.com",
    "url": "http://barnyrubble.tumblr.com/"
  },
  "contributors": [
    {
      "name": "Barney Rubble",
      "email": "b@rubble.com",
      "url": "http://barnyrubble.tumblr.com/"
    },
    {
      "name": "Fred Flintstone",
      "email": "f@flintstone.com"
    }
  ]
}
```

이를 통해 누가 패키지를 만들었고, 누가 기여했는지 명확히 할 수 있습니다.

### 5. `funding`

`funding` 속성은 패키지 개발을 위한 후원 정보를 제공합니다. `npm fund` 명령을 실행하면 `funding` 속성에 명시된 URL이 출력되어 후원 정보를 쉽게 확인할 수 있습니다.

```json
{
  "funding": [
    {
      "type": "individual",
      "url": "http://example.com/donate"
    },
    "http://example.com/donateAlso",
    {
      "type": "patreon",
      "url": "https://www.patreon.com/my-account"
    }
  ]
}
```

### 6. `files`

패키지를 배포할 때 어떤 파일들을 포함할지 지정합니다. 이를 통해 불필요한 파일이 배포되지 않도록 제어할 수 있어, 최종 패키지의 크기를 줄이고 보안을 강화할 수 있습니다. 

기본값은 `["*"]` 으로 모든 파일을 포함하며,  `.gitignore`와 유사한 파일 패턴으로 작성하면 됩니다. `.gitignore`에 의해 형상 관리에서 제외 되더라도, `files` 필드에 명시하면 배포됩니다. 또한, `files`는 항상 **포함할 파일**만 정의합니다. (제외할 파일은 여기서 정의하지 않음)

- **항상 포함되는 파일**:
    - `package.json`
    - `README`
    - `LICENSE` / `LICENCE`
    - `"main"` 필드의 파일
    - `"bin"` 필드의 파일
- **항상 제외되는 파일**:
    - `.orig`, `.DS_Store`, `.git`, `node_modules`, `package-lock.json`, 등.

```json
{
  "files": [
    "dist/**/*",
    "README.md"
  ]
}
```

### 7. `exports`와 `main`, `browser`

`exports`, `main`, `browser`는 패키지를 import 할 때, 어떤 파일을 로드할지 정의하는 핵심 필드입니다. `main`은 Node.js 환경에서 기본 진입점을 지정하고, `browser`는 브라우저 환경에서 사용할 별도의 진입점을 정의합니다. 최신 방식인 `exports`는 환경별로 세부적인 진입점 제어를 가능하게 하고, 모듈의 공개 인터페이스를 캡슐화합니다.

- `exports`: `main`의 모던한 방식의 대안으로, 여러 진입점을 정의하고 환경에 따라 조건부로 진입점을 해석하며, `exports`에 정의된 것 이외의 진입점을 차단합니다. 이러한 캡슐화를 통해 모듈 작성자는 패키지의 공개 인터페이스를 명확하게 정의할 수 있습니다.

```json

  "name": "my-package",
  "version": "1.0.0",
  "exports": {
    ".": "./dist/index.js",
    "./utils": "./dist/utils.js"
  }
}
```

- `main`: 해당 패키지를 불러올 때 (`require('패키지이름')` 또는 `import '패키지이름'`) 기본적으로 로드되는 파일을 지정합니다.  대부분의 모듈은 `main` 스크립트 하나만을 가지는 것이 가장 합리적입니다. `main`이 설정되지 않으면 기본적으로 패키지 루트 폴더의 `index.js`로 설정됩니다.
- `browser`: 모듈이 클라이언트 측에서 사용되도록 설계되었다면, `main` 필드 대신 `browser` 필드를 사용해야 합니다. 이는 해당 모듈이 Node.js 모듈에서 사용할 수 없는 `window`와 같은 브라우저 전용 기능에 의존할 수 있음을 사용자에게 알려주는 데 도움이 됩니다.

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "main": "lib/index.js",
  "browser": "lib/browser.js"
}

```

### 8.  `bin`

패키지 설치 시 실행 가능한 명령어를 시스템의 `PATH`에 추가하여, 터미널에서 해당 명령어를 직접 실행할 수 있도록 설정하는 데 사용됩니다. 이를 통해 패키지 개발자는 CLI(Command Line Interface) 도구를 사용자에게 제공할 수 있습니다. 패키지 사용자가 명령줄에서 직접 실행할 수 있는 도구를 손쉽게 배포할 수 있습니다.

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "bin": {
    "myapp": "bin/cli.js"
  }
}

```

### 9. `man`

패키지의 매뉴얼(manual) 페이지를 지정하는 데 사용됩니다. 이 필드를 통해 패키지를 설치한 사용자가 터미널에서 `man <패키지명>` 명령어를 입력하면, 해당 패키지의 사용 설명서를 확인할 수 있습니다.

```json
{
  "man": "./man/doc.1"
}
```

### 10. `directories`

`directories` 필드는 패키지의 주요 디렉터리 구조를 정의하여, 패키지 사용자가 중요한 파일 위치를 쉽게 파악할 수 있도록 돕습니다. CommonJS 패키지 사양에 따라 설계된 이 필드는 `lib`, `bin`, `man` 등 다양한 디렉터리를 지정하여 패키지의 구조와 목적을 명확히 설명합니다.

- `directories.lib`: 모듈의 라이브러리 파일들이 위치한 디렉터리
- `directories.bin`: 실행 파일들이 위치한 디렉터리
- `directories.man`: 매뉴얼 파일들이 위치한 디렉터리

```json
{
  "directories": {
    "lib": "./lib",
    "bin": "./bin"
    "man": "./man"
  }
}
```

### 11. `repository`

`repository` 속성은 패키지의 소스 코드가 어디에 있는지를 명시합니다. 프로젝트에 기여하고자 하는 사람들에게 코드의 위치를 알려주는 데 유용하며, 특히 npm 레지스트리에서 패키지를 검색할 때 해당 정보를 통해 소스 코드 저장소를 쉽게 찾을 수 있습니다.

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/username/repository.git"
  }
}
```

- `repository.directory` 속성: 모노레포(Monorepo)에서 사용
    - 하나의 저장소에 여러 패키지나 프로젝트를 포함하는 모노레포에서 `repository.url`만으로는 특정 패키지가 저장소의 어디에 위치하는지 알기 어렵기 때문에 해당 속성을 사용하여 정확한 경로를 명시할 수 있습니다.
    
    ```json
    
    {
      "repository": {
        "type": "git",
        "url": "git+https://github.com/사용자명/저장소명.git",
        "directory": "패키지/경로"
      }
    }
    ```
    

### 12. `scripts`

`scripts` 속성은 프로젝트에서 자주 사용하는 명령어들을 정의하는 데 사용됩니다. 빌드, 테스트, 시작 등 여러 작업을 쉽게 실행할 수 있도록 명령어를 작성 할 수 있습니다.

`start`와 `test` 스크립트는 `npm start`, `npm test`로 바로 실행할 수 있지만, 그 외의 스크립트는 `npm run 스크립트명` 형식으로 실행해야 한다.

```json
{
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "test": "jest",
    "start": "node server.js"
  }
}
```

- **스크립트 이름 앞에 `pre`나 `post`를 붙여** 특정 스크립트 전후에 실행될 명령어를 정의할 수 있습니다. 예를 들어, `prebuild`는 `build` 스크립트 전에, `postbuild`는 `build` 스크립트 후에 실행됩니다.
    
    ```json
    {
      "scripts": {
        "prebuild": "npm run clean",
        "build": "webpack --config webpack.config.js",
        "postbuild": "npm run deploy"
      }
    }
    ```
    

### 13. `config`

`config`는 위에서 알아 본 **`scripts`**에서 사용할 설정 매개변수를 정의하는 데 사용됩니다.

```json
{
  "name": "foo",
  "config": {
    "port": "8080"
  },
  "scripts": {
    "start": "node server.js"
  }
}
```

위와 같이 설정하면, `npm_package_config_port` 환경 변수를 통해 `port` 값에 접근할 수 있습니다. 이를 활용하여 `scripts` 섹션에서 해당 값을 참조할 수 있습니다. `server.js` 파일에서 `process.env.npm_package_config_port`를 통해 포트 번호를 가져올 수 있습니다.

```jsx
// server.js

const port = process.env.npm_package_config_port || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

사용자는 `npm config set foo:port 8001` 명령어를 통해 `port` 값을 재정의할 수 있습니다. 이렇게 하면 `npm_package_config_port`의 값이 `8001`로 설정되어, 패키지 스크립트나 코드에서 이를 참조할 때 변경된 값이 사용됩니다.

### 14. `dependencies`, `devDependencies`, `peerDependencies`, `optionalDependencies`, `bundleDependencies`

다음 속성들은 프로젝트의 다양한 **의존성을 관리**하는 데 사용되는 필드들로, 패키지 설치와 배포에 영향을 미칩니다. 이 필드들은 프로젝트에서 **필요한 패키지의 범위와 목적**을 명확히 구분하며, 개발 환경과 실행 환경의 요구사항을 효과적으로 관리할 수 있도록 도와줍니다. 또한, 선택적 설치나 배포 시 번들링 등의 고급 기능을 통해 의존성 관리의 유연성과 효율성을 제공합니다. 이러한 구조는 프로젝트의 일관성과 유지보수를 용이하게 만듭니다.

- `dependencies`: 프로젝트 실행 시 필요한 패키지
- `devDependencies`: 개발 및 테스트 환경에서만 필요한 패키지
- `peerDependencies`: 라이브러리를 사용하는 프로젝트에서 **반드시 설치**해야 하는 의존성
- `peerDependenciesMeta` `peerDependencies` 필드의 확장된 설정으로, 기본적으로 `peerDependencies`에 명시된 패키지는 **반드시 설치**되어야 하지만, `peerDependenciesMeta`를 사용하면 일부 의존성을 선택적으로 설치하도록 설정할 수 있습니다.
- `optionalDependencies`: 선택적으로 사용할 수 있는 의존성을 지정. **여기에 명시된 패키지가 설치되지 않거나 설치 중 오류가 발생하더라도, 전체 설치 프로세스는 실패하지 않고 계속 진행 됩니다.**
- `bundleDependencies`: 패키지를 배포(publish)할 때 함께 번들링할 의존 패키지들의 이름을 배열 형태로 정의

```json
{
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "webpack": "^5.0.0"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": true
    }
  }
  "optionalDependencies": {
    "fsevents": "^2.0.0"
  },
  "bundleDependencies": [
    "express"
  ]
}
```

**버전 범위 지정 방법**

- **정확한 버전:** 특정 버전과 정확히 일치하도록 지정합니다.
    
    ```json
    "dependencies": {
      "패키지명": "1.0.0"
    }
    ```
    
- **범위 지정:** 비교 연산자를 사용하여 버전 범위를 설정합니다.
    
    ```json
    "dependencies": {
      "패키지명": ">=1.0.0 <2.0.0"
    }
    ```
    
- **틸드(~) 연산자:** 지정된 버전의 패치 버전 범위 내에서 호환되는 최신 버전을 허용합니다.
    
    ```json
    "dependencies": {
      "패키지명": "~1.2.3" // 1.2.x 버전 허용, 1.3.0 제외
    }
    ```
    
- **캐럿(^) 연산자:** 지정된 버전의 마이너 버전 범위 내에서 호환되는 최신 버전을 허용합니다.
    
    ```json
    "dependencies": {
      "패키지명": "^1.2.3" // 1.x.x 버전 허용, 2.0.0 제외
    }
    ```
    
- **와일드카드(*):** 모든 버전을 허용합니다.
    
    ```json
    "dependencies": {
      "패키지명": "*"
    }
    ```
    
- **빈 문자열(""):** 와일드카드와 동일하게 모든 버전을 허용합니다.
    
    ```json
    "dependencies": {
      "패키지명": ""
    }
    ```
    

**의존성 지정 방법**

- **타르볼 URL:** 원격 서버에 있는 tar.gz 파일을 직접 지정하여 설치할 수 있습니다.
    
    ```json
    "dependencies": {
      "패키지명": "http://example.com/패키지.tar.gz"
    }
    ```
    
- **Git URL:** Git 저장소의 특정 커밋이나 브랜치를 지정하여 설치할 수 있습니다.
    
    ```json
    "dependencies": {
      "패키지명": "git+https://github.com/사용자명/저장소명.git#브랜치명"
    }
    ```
    
- **GitHub 단축 표기:** GitHub 저장소를 간단하게 지정할 수 있습니다.
    
    ```json
    "dependencies": {
      "패키지명": "사용자명/저장소명"
    }
    ```
    
- **로컬 경로:** 로컬 디렉터리에 있는 패키지를 의존성으로 추가할 수 있습니다.
    
    ```json
    "dependencies": {
      "패키지명": "file:../로컬_패키지_경로"
    }
    ```
    

### 15. `overrides`

`overrides` 속성은 특정 의존성의 버전을 강제로 지정할 때 사용됩니다.

1. **모든 의존성에서 특정 패키지 버전 고정**
    
    모든 의존성 트리에서 `foo` 패키지를 버전 `1.0.0`으로 고정하려면 다음과 같이 설정합니다.
    
    ```json
    {
      "overrides": {
        "foo": "1.0.0"
      }
    }
    
    ```
    
2. **특정 패키지의 하위 의존성 버전 고정**
    
    `foo` 패키지를 버전 `1.0.0`으로 고정하고, 그 하위 의존성인 `bar`도 버전 `1.0.0`으로 고정하려면 다음과 같이 설정합니다.
    
    ```json
    {
      "overrides": {
        "foo": {
          ".": "1.0.0",
          "bar": "1.0.0"
        }
      }
    }
    
    ```
    
3. **특정 상위 패키지의 하위 의존성 버전 고정**
    
    `bar`의 하위 의존성으로 존재하는 `foo`를 버전 `1.0.0`으로만 대체하려면 다음과 같이 설정합니다.
    
    ```json
    {
      "overrides": {
        "bar": {
          "foo": "1.0.0"
        }
      }
    }
    ```
    
4. **다중 중첩된 의존성 버전 고정**
    
    `baz`의 하위 의존성인 `bar`의 하위 의존성으로 존재하는 `foo`를 버전 `1.0.0`으로만 대체하려면 다음과 같이 설정합니다.
    
    ```json
    {
      "overrides": {
        "baz": {
          "bar": {
            "foo": "1.0.0"
          }
        }
      }
    }
    ```
    
5. **특정 버전의 상위 패키지에 대한 하위 의존성 버전 고정:**
    
    버전 `2.0.0`의 `bar` 패키지의 하위 의존성인 `foo`를 버전 `1.0.0`으로만 대체하려면 다음과 같이 설정합니다.
    
    ```json
    {
      "overrides": {
        "bar@2.0.0": {
          "foo": "1.0.0"
        }
      }
    }
    ```
    

**주의사항:**

- 직접 의존하는 패키지에 대해 `overrides`를 설정하려면, `dependencies`와 `overrides`의 버전이 정확히 일치해야 합니다.
    
    ```json
    {
      "dependencies": {
        "foo": "^1.0.0"
      },
      "overrides": {
        "foo": "^1.0.0" // 버전이 일치해야 함
      }
    }
    ```
    
- 또는, `$`를 사용하여 직접 의존성을 참조할 수 있습니다.
    
    ```json
    {
      "dependencies": {
        "foo": "^1.0.0"
      },
      "overrides": {
        "foo": "$foo" // dependencies의 foo 버전을 참조
      }
    }
    ```
    

### 16. `engines`, `os`, `cpu`, `devEngines`

해당 필드들은 프로젝트가 특정 환경에서만 동작하도록 제한하거나 권장하는 데 사용됩니다.

- `engines`: 프로젝트가 지원하는 Node.js 및 npm의 버전을 명시
    - 위 예시에서는 Node.js 버전 14.x를 지원하며, npm 버전 6.14.0을 권장하고 있습니다. 이 설정은 사용자가 해당 버전을 사용하지 않을 경우 경고를 표시하지만, `engine-strict` 설정이 활성화되지 않으면 설치를 막지는 않습니다.
- `os`: 프로젝트가 지원하거나 제외할 운영 체제를 지정합니다.
    - 특정 운영 체제를 제외하려면 `!`를 사용합니다.
- `cpu`: 프로젝트가 지원하거나 제외할 CPU 아키텍처를 지정합니다.
    - 특정 아키텍처를 제외하려면 `!`를 사용합니다.
- `devEngines`: 프로젝트를 개발하는 개발자들이 동일한 도구를 사용하도록 권장하는 데 사용됩니다. 이는 설치, CI, 실행 명령어 전에 실행되어 개발 환경을 통일하는 데 도움을 줍니다.

```json
{
  "engines": {
    "node": ">=14.0.0 <16",
    "npm": "~6.14.0"
  },
  "os": [
    "darwin",
    "linux",
    "!win32"
  ],
  "cpu": [
    "x64",
    "arm",
    "!mips"
  ],
  "devEngines": {
    "runtime": {
      "name": "node",
      "onFail": "error"
    },
    "packageManager": {
      "name": "npm",
      "onFail": "error"
    }
  }
}
```

### 17. `private`, `publishConfig`

`private`와 `publishConfig`는 패키지 배포와 관련된 중요한 설정입니다. 이 설정들을 통해 내부 레지스트리나 환경별 배포를 효율적으로 관리할 수 있습니다.

- **`private`**: `true`는 해당 패키지가 레지스트리에 배포되지 않도록 보호
    - 조직 내부에서만 사용하는 패키지나 비공개로 유지하고 싶은 프로젝트에 설정하여, 실수로 외부에 배포되지 않도록 막을 수 있습니다.

```json
{
  "private": true
}
```

- **`publishConfig`**: 특정 패키지를 특정 레지스트리에만 게시할 수 있도록 정의.

```json
{
  "publishConfig": {
    "registry": "https://your-internal-registry.com"
  }
}
```

`"private": true` 설정은 npm이 패키지를 게시하지 않도록 강제하지만, `publishConfig`는 패키지를 특정 레지스트리에 게시할 때 유용합니다.

### 18. `workspaces`

`workspaces` 속성은 모노레포(Monorepo) 환경에서 여러 패키지를 함께 관리하기 위해 사용됩니다. 이 필드는 설치 클라이언트가 심볼릭 링크를 생성하여 최상위 `node_modules` 폴더에 연결해야 하는 워크스페이스의 위치를 로컬 파일 시스템 내에서 찾을 수 있도록 파일 패턴의 배열을 정의합니다.

`workspaces` 필드는 워크스페이스로 사용할 폴더의 직접적인 경로를 지정하거나, 해당 폴더들을 포함하는 글로브 패턴을 정의할 수 있습니다.

예를 들어, 다음과 같이 `./packages` 폴더 내의 모든 폴더를 워크스페이스로 지정할 수 있습니다.

```json
{
  "workspaces": [
    "packages/*"
  ]
}
```

이렇게 설정하면, `./packages` 폴더 내에 있는 각 폴더가 유효한 `package.json` 파일을 포함하고 있는 한, 해당 폴더들은 워크스페이스로 처리됩니다.

이러한 설정을 통해 프로젝트 내에서 여러 패키지를 효율적으로 관리하고, 의존성 설치 시 각 패키지를 최상위 `node_modules` 폴더에 심볼릭 링크하여 개발 편의성을 높일 수 있습니다.

### 마무리

`package.json`은 단순히 의존성을 관리를 넘어, 프로젝트의 구조와 동작 방식을 체계적으로 정의하는 중요한 파일입니다. 이번에 소개한 다양한 속성들을 적절히 활용하면, 더욱 안전하고 효율적인 라이브러리나 웹 애플리케이션 개발이 가능해질 것입니다. 목적에 맞는 명확한 설정을 통해 프로젝트 관리와 배포 과정도 한층 더 간편하고 안정적으로 이루어질 수 있기를 바랍니다.