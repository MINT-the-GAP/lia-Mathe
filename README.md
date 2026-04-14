<!--
author:   MINT-the-GAP
version:  0.0.1
language: en
edit: true
narrator: US English Female
comment:  Interactive fraction quizzes with circle and rectangle visualizations. Students set the division and mark the correct fraction using sliders.

script:   ./dist/index.js

@circleQuiz: @circleQuiz_(@uid,@0)

@circleQuiz_
<div id="fq-circle-wrap-@0" class="fq-widget" data-fq-kind="circle" data-fq-uid="@0">
  <div id="fq-circle-host-@0" class="fq-widget" data-fq-kind="circle" data-fq-uid="@0">
    <div id="fq-circle-mount-@0" class="fq-mount"></div>

    <div id="fq-circle-range-@0" class="fq-range" data-label="Subdivisions">
<input type="range" min="1" max="32" value="1" output="fq-c-n-@0">
    </div>
  </div>

  [[!]]
  <script>window.__LIA_FRACTION_QUIZ__ ? window.__LIA_FRACTION_QUIZ__.check("@0") : false</script>
</div>

<script modify="false">
const _api = window.__LIA_FRACTION_QUIZ__;
if (_api) _api.mountCircle("@0", String.raw`@1`);
</script>
@end



@rectQuiz: @rectQuiz_(@uid,@0)

@rectQuiz_
<div id="fq-rect-wrap-@0" class="fq-widget" data-fq-kind="rect" data-fq-uid="@0">
  <div id="fq-rect-host-@0" class="fq-widget" data-fq-kind="rect" data-fq-uid="@0">
    <div id="fq-rect-mount-@0" class="fq-mount"></div>

    <div id="fq-rect-rows-wrap-@0" class="fq-range" data-label="rows">
<input type="range" min="1" max="20" value="1" output="fq-r-rows-@0">
    </div>

    <div id="fq-rect-cols-wrap-@0" class="fq-range" data-label="columns">
<input type="range" min="1" max="20" value="1" output="fq-r-cols-@0">
    </div>
  </div>

  [[!]]
  <script>window.__LIA_FRACTION_QUIZ__ ? window.__LIA_FRACTION_QUIZ__.check("@0") : false</script>
</div>

<script modify="false">
const _api = window.__LIA_FRACTION_QUIZ__;
if (_api) _api.mountRect("@0", String.raw`@1`);
</script>
@end

-->

# Fraction Quiz

          --{{0}}--
Interactive fraction quizzes with circle and rectangle visualizations.
Students set the division using a slider and mark the correct fraction by clicking.

__Try it on LiaScript:__
https://liascript.github.io/course/?https://raw.githubusercontent.com/MINT-the-GAP/lia-Mathe/main/README.md

__See the project on GitHub:__
https://github.com/MINT-the-GAP/lia-Mathe

           {{1}}
1. Load the macros via

   `import: https://raw.githubusercontent.com/MINT-the-GAP/lia-Mathe/main/README.md`

   or pin to a specific version:

   `import: https://raw.githubusercontent.com/MINT-the-GAP/lia-Mathe/0.0.1/README.md`

2. Copy the definitions into your project

3. Clone this repository on GitHub

## `@circleQuiz`

          --{{0}}--
Displays an interactive pie chart. The student sets the number of sectors using a slider
and clicks the matching sectors to represent the fraction.

``` markdown
@circleQuiz(3/8)
```

---

@circleQuiz(3/8)

## `@rectQuiz`

          --{{0}}--
Displays an interactive rectangle. The student sets rows and columns using sliders
and clicks the matching cells to represent the fraction.

``` markdown
@rectQuiz(1/3)
```

---

@rectQuiz(1/3)

## Implementation

          --{{0}}--
If you prefer not to use `import:`, copy the following block directly into the header of your LiaScript document.

``` markdown
script:   https://cdn.jsdelivr.net/gh/MINT-the-GAP/lia-Mathe@0.0.1/dist/index.js

@circleQuiz: @circleQuiz_(@uid,@0)

@circleQuiz_
<div id="fq-circle-wrap-@0" class="fq-widget" data-fq-kind="circle" data-fq-uid="@0">
  <div id="fq-circle-host-@0" class="fq-widget" data-fq-kind="circle" data-fq-uid="@0">
    <div id="fq-circle-mount-@0" class="fq-mount"></div>
    <div id="fq-circle-range-@0" class="fq-range" data-label="Subdivisions">
<input type="range" min="1" max="32" value="1" output="fq-c-n-@0">
    </div>
  </div>
  [[!]]
  <script>window.__LIA_FRACTION_QUIZ__ ? window.__LIA_FRACTION_QUIZ__.check("@0") : false</script>
</div>
<script modify="false">
const _api = window.__LIA_FRACTION_QUIZ__;
if (_api) _api.mountCircle("@0", String.raw`@1`);
</script>
@end

@rectQuiz: @rectQuiz_(@uid,@0)

@rectQuiz_
<div id="fq-rect-wrap-@0" class="fq-widget" data-fq-kind="rect" data-fq-uid="@0">
  <div id="fq-rect-host-@0" class="fq-widget" data-fq-kind="rect" data-fq-uid="@0">
    <div id="fq-rect-mount-@0" class="fq-mount"></div>
    <div id="fq-rect-rows-wrap-@0" class="fq-range" data-label="rows">
<input type="range" min="1" max="20" value="1" output="fq-r-rows-@0">
    </div>
    <div id="fq-rect-cols-wrap-@0" class="fq-range" data-label="columns">
<input type="range" min="1" max="20" value="1" output="fq-r-cols-@0">
    </div>
  </div>
  [[!]]
  <script>window.__LIA_FRACTION_QUIZ__ ? window.__LIA_FRACTION_QUIZ__.check("@0") : false</script>
</div>
<script modify="false">
const _api = window.__LIA_FRACTION_QUIZ__;
if (_api) _api.mountRect("@0", String.raw`@1`);
</script>
@end
```
