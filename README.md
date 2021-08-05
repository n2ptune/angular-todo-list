# Angular-Todo-List

Angular를 이용해서 Todo List Application을 작성하고 다른 프레임워크에서 사용 가능한 기술들을 Angular에서 어떻게 적용 가능한지 차이점을 비교하고 정리

## CLI

`create-react-app`이나 `@vue/cli`같은 오픈 소스는 React, Vue 프로젝트를 시작하는데에 매우 유용한 라이브러리지만, Angular CLI는 보다 강력한 기능을 제공한다. `nest`에도 있는 기능인데, 만들고 싶은 모듈에 대한 템플릿을 자동으로 만들어준다. 예를 들어 A라는 컴포넌트를 만들기 위해 Vue와 React에서는 프로젝트의 정해진 컨벤션대로 디렉터리 구조를 잡고 파일을 만들어 이를 연결시키는 방식이지만 Angular에서는 CLI에서 그 기능을 제공해준다.

```sh
ng g component some # or ng generate component some
```

그 외 CLI에서는 빌드, 린트, 테스트 등 다양한 기능을 제공한다. CLI을 사용하는 점에 있어서는 다른 프레임워크보다 편하다.

## 라우터

Angular에서는 라우터에 대한 내용을 모듈 개념으로 제공한다.

```typescript
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = []

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

처음 CLI을 통해서 어플리케이션을 초기화하면 위와 같은 형태로 라우터 모듈을 만들어 준다. `routes` 변수 내 라우터에 등록시킬 컴포넌트 및 메타데이터를 입력하면 된다.

### 등록

모든 라우팅 관련 컴포넌트는 라우팅 모듈에서 관리한다. 기본적으로 `app-routing.module.ts`라는 이름으로 생성된다. Vue CLI와 비슷한 폴더 구조로 만들어보도록 한다. `views` 폴더를 하나 만든다.

```sh
ng g c views/main
ng g c views/second
```

`/` 경로에 렌더링할 컴포넌트 `main` 컴포넌트를 하나 만든다. 여기서 기본적으로 `ng generate component` 명령어는 입력으로 오는 컴포넌트 이름에 대한 폴더를 하나 만들어서 그 안에 템플릿을 구성해주지만 `/`를 포함시켜 특정 폴더 내부에 생성되도록 할 수 있다. 또한 `--flat` 옵션을 통해 폴더가 새로 만들어지는 걸 막을 수 있다.

계속해서, `/second` 라는 경로를 하나 만들기 위해서 `second` 컴포넌트도 하나 만든다. 그리고 라우팅 모듈에 해당 컴포넌트를 등록시킨다.

```typescript
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainComponent } from './views/main/main.component'
import { SecondComponent } from './views/second/second.component'

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'second', component: SecondComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

Vue Router와 비슷한 구조를 가지고 있으며 `path`는 말 그대로 라우터 경로이며 이 안에 `children` 프로퍼티를 통해 중첩 경로를 구성할 수 있다. 타입은 `Routes`이며 실질적 타입은 `Route[]`가 된다. `children` 프로퍼티의 타입은 `Routes`다.

### 비동기 등록

라우팅 모듈에 등록시킨 컴포넌트들은 빌드될 때 메인 빌드 파일에 포함된다. 사용자가 해당 경로에 접근하지 않았음에도 해당 경로에서 필요한 컴포넌트 파일들을 불러와야한다. 여타 다른 프레임워크에서는 이 이슈를 비동기 컴포넌트 개념으로 해결한다.

#### React

경로의 메인 컴포넌트를 `lazy`로 묶는다.

```tsx
import React from 'react'

const Home = React.lazy(() => import('./views/Home'))
const About = React.lazy(() => import('./views/About'))
const Second = React.lazy(() => import('./views/Second'))
```

`lazy`는 리액트에서 컴포넌트를 비동기적으로 로드할 수 있게 도와주는 함수다. 위 처럼 묶은 컴포넌트들을 `Suspense` 내부에 위치시킨다.

```tsx
export const AppRouter: React.FC = ({ children }) => (
  <React.Suspense>
    <Router>
      {children}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/second" component={Second} />
      </Switch>
    </Router>
  </React.Suspense>
)
```

`Suspense`에 `fallback` 프로퍼티를 통해 로딩되는 동안 화면에 표시할 컴포넌트를 지정할 수 있다. 이러면 빌드할 때 각 경로에 대한 파일은 코드 분할이 되어 파일이 나뉘게 된다. 따라서 메인 페이지를 접근할 때 타 경로에 대한 필요없는 파일을 불러오지 않음으로써 첫 페이지 로드 속도를 개선할 수 있게된다.

#### Vue

리액트와 비슷하게 컴포넌트를 `Promise` 형태로 반환하는 함수를 작성하면 된다.

```js
import VueRouter from 'vue-router'

const Home = () => import('./views/Home')
const About = () => import('./views/About')
const Second = () => import('./views/Second')

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/second', component: Second }
  ]
})

export default router
```

위 파일은 어느정도 리액트와 비슷한데, 나중에 어플리케이션이 빌드될 때 비동기 컴포넌트들이 웹팩에 의해 코드 분할이 되면서 서로 다른 파일로 나뉘게된다.

때에 따라서, 중첩된 경로에서 자식 경로의 파일들이 부모 경로의 파일과 묶어져야하는 경우가 있다. 이런 경우 간단한 주석을 통해 옵션을 지정하면 웹팩에서 해당하는 `chunk`들을 묶어준다.

```js
const router = new VueRouter({
  routes: [
    {
      path: '/second',
      component: Second,
      children: [
        {
          path: '/a',
          component: () => import(/* webpackChunkName: "second-group-comp" */ 'SecondA.vue')
        },
        {
          path: '/b',
          component: () => import(/* webpackChunkName: "second-group-comp" */ 'SecondB.vue')
        }
      ]
    }
  ]
})
```

`webpackChunkName` 외 [여러 가지](https://webpack.js.org/api/module-methods/#magic-comments)를 사용할 수 있다.

#### Angular

Angular에서는 각각의 뷰가 서로 다른 모듈이라고 보면 된다. 예를 들어서 메인 페이지와, About 페이지, 그리고 Second 페이지를 작성한다고 하면, 메인 모듈, About 모듈, Second 모듈이 있다고 생각하면된다.

```sh
ng g module main --route main --module app.module
ng g module about --route about --module app.module
ng g module second --route second --module app.module
```

세 모듈을 만든다. 그러면 아래와 같이 최상단 라우팅 모듈이 업데이트된다.

```typescript
const routes: Routes = [
  { path: 'main', loadChildren: () => import('./main/main.module').then((m) => m.MainModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) },
  { path: 'second', loadChildren: () => import('./second/second.module').then((m) => m.SecondModule) }
]
```

테스트용으로 한번 빌드해본다.

```sh
ng build

Initial Chunk Files               | Names         |      Size
main.0e56622617e3279e276c.js      | main          | 206.06 kB
polyfills.2e53243b479e25d512f0.js | polyfills     |  35.98 kB
runtime.b06d8425ee2ee63c5e21.js   | runtime       |   2.74 kB
styles.31d6cfe0d16ae931b73c.css   | styles        |   0 bytes

                                  | Initial Total | 244.79 kB

Lazy Chunk Files                  | Names         |      Size
186.66f32b8876aed268766a.js       | -             | 770 bytes
511.8c178bf5be8fe62c599a.js       | -             | 768 bytes
514.d89b7cc8168c46c0312d.js       | -             | 765 byte
```

Lazy Chunk Files 탭에있는 파일들이 모듈별로 라우팅을 분할한 파일들인데, 해당 파일들은 지정된 경로에 접근했을 때 비로소 불러와지기 때문에 메인 페이지에 접근했을 때 한꺼번에 가져와지지 않는다. 그러므로 이렇게 코드 분할을 할 수 있다. 매우 쉽다. 모듈을 나누고 어떤 설정을 통해 해줘야되는 것이 아니라 CLI을 통해 이러한 이점을 누릴 수 있다.

### 파라미터 사용

`/todo` 경로는 모든 `TodoItem`을 모아 리스트 형태로 보여주는 곳이라고 한다면 `/todo/1`은 그 리스트 중 아이디 값이 1인 아이템의 디테일한 정보를 보여주는 경로라고 할 수 있다. Angular에서 이런 기능은 의존성 주입을 통해 가져올 수 있다.

```typescript
const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: ':id', component: TodoDetailComponent }
]
```

먼저 라우트 경로에 콜론과 파라미터 이름을 통해 경로에 어떤 파라미터를 지정할 건지에 대한 정의가 필요하다.

```typescript
import { ActivatedRoute, Router } from '@angular/router'
```

`@angular/router` 패키지에서 위 클래스를 가져온다. 그 후 컴포넌트 생성자에 매개변수로 등록해놓으면 알아서 컴포넌트에 의존성을 주입해준다. 그리고 컴포넌트 데이터에 가져온 파라미터 정보를 매핑시킬 수 있다.

```typescript
export class TodoDetailComponent implements OnInit {
  id: number = 0

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe((param) => {
      this.id = Number(param.get('id'))
    })
  }

  ngOnInit(): void {
    console.log(this.id) // /todo/1 -> 1
  }
}
```

`route`와 `router`는 컴포넌트에 지역적으로 선언하지 않아도 Angular에서 알아서 처리해준다. 따라서 `this.route`같은 형태로 사용해도 전혀 위화감이 없다.

사용자가 `/todo/3` 이라는 경로로 들어오면 컴포넌트의 `id` 필드는 `3`으로 초기화될 것이고, `/todo/2`라는 형태로 들어오면 `2`로 초기화되는 형태다. 또한 `route` 클래스 내부의 멤버들은 거의 모두 `Observable` 형태이므로 `subscribe` 함수를 호출해서 해당 값이 업데이트되도 다시 가져올 수 있다.

## Store

## Service

## Module
