<!--
author:   MINT-the-GAP, Martin Lommatzsch, Jihad Hyadi
version:  0.0.2
language: en
edit: true
narrator: US English Female
comment:  Interactive math quizzes with inputs inside KaTeX formulas plus circle and rectangle fraction visualizations.

script:   ./dist/index.js

formula:  \liaquiz \htmlClass{lia-math-quiz-slot}{\vphantom{\rule{0pt}{1.5em}}\hspace{2.2em}}

@liaQuiz:  @liaQuiz_(@uid,@0)

@liaQuiz_
<span class='lia-math-quiz-source' data-lia-math-quiz='@0'></span>

[[@1]]
@end

@liaQuizC: @liaQuizC_(@uid,@0,@1)

@liaQuizC_
<span class='lia-math-quiz-source' data-lia-math-quiz='@0'></span>

@2
[[@1]]
@end

@circleQuiz: @circleQuiz_(@uid,@0)

@circleQuiz_
<div id='fq-circle-wrap-@0' class='fq-widget' data-fq-kind='circle' data-fq-uid='@0'>
  <div id='fq-circle-host-@0' class='fq-widget' data-fq-kind='circle' data-fq-uid='@0'>
    <div id='fq-circle-mount-@0' class='fq-mount'></div>

    <div id='fq-circle-range-@0' class='fq-range' data-label='Subdivisions'>
<input type='range' min='1' max='32' value='1' output='fq-c-n-@0'>
    </div>
  </div>
</div>

<script modify='false'>
const _api = window.__LIA_FRACTION_QUIZ__;
if (_api) _api.mountCircle('@0', String.raw`@1`);
</script>

<span class='fq-native-quiz-source' data-fq-quiz='@0' data-fq-answer='fqok@0' aria-hidden='true'></span>

[[fqok@0]]
@end

@circleQuizC: @circleQuizC_(@uid,@0,@1)

@circleQuizC_
<div id='fq-circle-wrap-@0' class='fq-widget' data-fq-kind='circle' data-fq-uid='@0'>
  <div id='fq-circle-host-@0' class='fq-widget' data-fq-kind='circle' data-fq-uid='@0'>
    <div id='fq-circle-mount-@0' class='fq-mount'></div>

    <div id='fq-circle-range-@0' class='fq-range' data-label='Subdivisions'>
<input type='range' min='1' max='32' value='1' output='fq-c-n-@0'>
    </div>
  </div>
</div>

<script modify='false'>
const _api = window.__LIA_FRACTION_QUIZ__;
if (_api) _api.mountCircle('@0', String.raw`@1`);
</script>

<span class='fq-native-quiz-source' data-fq-quiz='@0' data-fq-answer='fqok@0' aria-hidden='true'></span>

@2
[[fqok@0]]
@end



@rectQuiz: @rectQuiz_(@uid,@0)

@rectQuiz_
<div id='fq-rect-wrap-@0' class='fq-widget' data-fq-kind='rect' data-fq-uid='@0'>
  <div id='fq-rect-host-@0' class='fq-widget' data-fq-kind='rect' data-fq-uid='@0'>
    <div id='fq-rect-mount-@0' class='fq-mount'></div>

    <div id='fq-rect-rows-wrap-@0' class='fq-range' data-label='rows'>
<input type='range' min='1' max='20' value='1' output='fq-r-rows-@0'>
    </div>

    <div id='fq-rect-cols-wrap-@0' class='fq-range' data-label='columns'>
<input type='range' min='1' max='20' value='1' output='fq-r-cols-@0'>
    </div>
  </div>
</div>

<script modify='false'>
const _api = window.__LIA_FRACTION_QUIZ__;
if (_api) _api.mountRect('@0', String.raw`@1`);
</script>

<span class='fq-native-quiz-source' data-fq-quiz='@0' data-fq-answer='fqok@0' aria-hidden='true'></span>

[[fqok@0]]
@end

@rectQuizC: @rectQuizC_(@uid,@0,@1)

@rectQuizC_
<div id='fq-rect-wrap-@0' class='fq-widget' data-fq-kind='rect' data-fq-uid='@0'>
  <div id='fq-rect-host-@0' class='fq-widget' data-fq-kind='rect' data-fq-uid='@0'>
    <div id='fq-rect-mount-@0' class='fq-mount'></div>

    <div id='fq-rect-rows-wrap-@0' class='fq-range' data-label='rows'>
<input type='range' min='1' max='20' value='1' output='fq-r-rows-@0'>
    </div>

    <div id='fq-rect-cols-wrap-@0' class='fq-range' data-label='columns'>
<input type='range' min='1' max='20' value='1' output='fq-r-cols-@0'>
    </div>
  </div>
</div>

<script modify='false'>
const _api = window.__LIA_FRACTION_QUIZ__;
if (_api) _api.mountRect('@0', String.raw`@1`);
</script>

<span class='fq-native-quiz-source' data-fq-quiz='@0' data-fq-answer='fqok@0' aria-hidden='true'></span>

@2
[[fqok@0]]
@end

-->

# Fraction and Formula Quizzes

          --{{0}}--
Interactive inputs inside KaTeX formulas plus fraction quizzes with circle and rectangle
visualizations. Formula inputs remain native LiaScript quizzes, including checking,
solution reveal, attempts, and progress handling.

__Try it on LiaScript:__
https://liascript.github.io/course/?https://raw.githubusercontent.com/MINT-the-GAP/lia-Mathe/main/README.md

__See the project on GitHub:__
https://github.com/MINT-the-GAP/lia-Mathe

           {{1}}
1. Load the macros via

   `import: https://raw.githubusercontent.com/MINT-the-GAP/lia-Mathe/main/README.md`

   or pin to a specific version:

   `import: https://raw.githubusercontent.com/MINT-the-GAP/lia-Mathe/0.0.2/README.md`

2. Copy the definitions into your project

3. Clone this repository on GitHub

## `@circleQuiz`

          --{{0}}--
Displays an interactive pie chart. The student sets the number of sectors using a slider
and clicks the matching sectors to represent the fraction. Native LiaScript hints can be
added directly after the macro call.

``` markdown
@circleQuiz(3/8)
[[?]] Set the number of subdivisions to the denominator first.

@circleQuizC(3/8,`<!-- data-solution-button="2" -->`)
```

---

@circleQuiz(3/8)
[[?]] Set the number of subdivisions to the denominator first.

@circleQuizC(3/8,`<!-- data-solution-button="2" -->`)

## `@rectQuiz`

          --{{0}}--
Displays an interactive rectangle. The student sets rows and columns using sliders
and clicks the matching cells to represent the fraction. Native LiaScript hints can be
added directly after the macro call.

``` markdown
@rectQuiz(1/3)
[[?]] The product of rows and columns should match the denominator.

@rectQuizC(1/3,`<!-- data-solution-button="2" -->`)
```

---

@rectQuiz(1/3)
[[?]] The product of rows and columns should match the denominator.

@rectQuizC(1/3,`<!-- data-solution-button="2" -->`)

## Quiz input inside a formula

          --{{0}}--
Use `\liaquiz` at the position where the input belongs. Add
`@liaQuiz(solution)` directly after the formula, or use
`@liaQuizC(solution, comment)` for LiaScript quiz attributes. Both macros create
a native LiaScript quiz and mirror its input into the formula.

``` markdown
Bestimme den fehlenden Wert.

$\dfrac{\liaquiz}{3} = \dfrac{5}{15}$

@liaQuizC(1,`<!-- data-solution-button="2" -->`)
```

---

Bestimme den fehlenden Wert.

$\dfrac{\liaquiz}{3} = \dfrac{5}{15}$

@liaQuizC(1,`<!-- data-solution-button="2" -->`)

If JavaScript is unavailable or a placeholder cannot be matched, the native
LiaScript input remains visible as a usable fallback.

## Multiple inputs inside a formula

          --{{0}}--
Several placeholders can be paired in their written order. Add exactly one
macro per placeholder; every macro remains an independent native LiaScript quiz.

``` markdown
$\dfrac{\liaquiz}{3} = \dfrac{5}{\liaquiz}$

@liaQuiz(1)

@liaQuiz(15)
```

---

$\dfrac{\liaquiz}{3} = \dfrac{5}{\liaquiz}$

@liaQuiz(1)

@liaQuiz(15)

## Algebraic validation with Algebrite

          --{{0}}--
Formula inputs remain native LiaScript text quizzes, so external quiz validators
such as `@Algebrite.check` can be attached directly. Import both templates in
the consuming course and put the validator immediately after `@liaQuiz`:

``` markdown
<!--
import: https://raw.githubusercontent.com/MINT-the-GAP/lia-Mathe/main/README.md
import: https://raw.githubusercontent.com/LiaTemplates/algebrite/0.6.3/README.md
-->

Bestimme den fehlenden Wert.

$\dfrac{\liaquiz}{3} = \dfrac{5}{15}$

@liaQuiz(1)
@Algebrite.check(1)
```

Answers such as `1`, `2-1`, or `3/3` are then checked algebraically. Each
placeholder is an independent quiz and therefore needs its own validator.
Import Algebrite directly in the consuming course; nested template imports are
not resolved reliably by LiaScript.

## Implementation

          --{{0}}--
If you prefer not to use `import:`, copy the following block directly into the header of your LiaScript document.

``` markdown
script:   https://cdn.jsdelivr.net/gh/MINT-the-GAP/lia-Mathe@main/dist/index.js

formula:  \liaquiz \htmlClass{lia-math-quiz-slot}{\vphantom{\rule{0pt}{1.5em}}\hspace{2.2em}}

@liaQuiz:  @liaQuiz_(@uid,@0)

@liaQuiz_
<span class='lia-math-quiz-source' data-lia-math-quiz='@0'></span>

[[@1]]
@end

@liaQuizC: @liaQuizC_(@uid,@0,@1)

@liaQuizC_
<span class='lia-math-quiz-source' data-lia-math-quiz='@0'></span>

@2
[[@1]]
@end

@circleQuiz: @circleQuiz_(@uid,@0)

@circleQuiz_
<div id='fq-circle-wrap-@0' class='fq-widget' data-fq-kind='circle' data-fq-uid='@0'>
  <div id='fq-circle-host-@0' class='fq-widget' data-fq-kind='circle' data-fq-uid='@0'>
    <div id='fq-circle-mount-@0' class='fq-mount'></div>
    <div id='fq-circle-range-@0' class='fq-range' data-label='Subdivisions'>
<input type='range' min='1' max='32' value='1' output='fq-c-n-@0'>
    </div>
  </div>
</div>
<script modify='false'>
const _api = window.__LIA_FRACTION_QUIZ__;
if (_api) _api.mountCircle('@0', String.raw`@1`);
</script>
<span class='fq-native-quiz-source' data-fq-quiz='@0' data-fq-answer='fqok@0' aria-hidden='true'></span>

[[fqok@0]]
@end

@circleQuizC: @circleQuizC_(@uid,@0,@1)

@circleQuizC_
<div id='fq-circle-wrap-@0' class='fq-widget' data-fq-kind='circle' data-fq-uid='@0'>
  <div id='fq-circle-host-@0' class='fq-widget' data-fq-kind='circle' data-fq-uid='@0'>
    <div id='fq-circle-mount-@0' class='fq-mount'></div>
    <div id='fq-circle-range-@0' class='fq-range' data-label='Subdivisions'>
<input type='range' min='1' max='32' value='1' output='fq-c-n-@0'>
    </div>
  </div>
</div>
<script modify='false'>
const _api = window.__LIA_FRACTION_QUIZ__;
if (_api) _api.mountCircle('@0', String.raw`@1`);
</script>
<span class='fq-native-quiz-source' data-fq-quiz='@0' data-fq-answer='fqok@0' aria-hidden='true'></span>

@2
[[fqok@0]]
@end

@rectQuiz: @rectQuiz_(@uid,@0)

@rectQuiz_
<div id='fq-rect-wrap-@0' class='fq-widget' data-fq-kind='rect' data-fq-uid='@0'>
  <div id='fq-rect-host-@0' class='fq-widget' data-fq-kind='rect' data-fq-uid='@0'>
    <div id='fq-rect-mount-@0' class='fq-mount'></div>
    <div id='fq-rect-rows-wrap-@0' class='fq-range' data-label='rows'>
<input type='range' min='1' max='20' value='1' output='fq-r-rows-@0'>
    </div>
    <div id='fq-rect-cols-wrap-@0' class='fq-range' data-label='columns'>
<input type='range' min='1' max='20' value='1' output='fq-r-cols-@0'>
    </div>
  </div>
</div>
<script modify='false'>
const _api = window.__LIA_FRACTION_QUIZ__;
if (_api) _api.mountRect('@0', String.raw`@1`);
</script>
<span class='fq-native-quiz-source' data-fq-quiz='@0' data-fq-answer='fqok@0' aria-hidden='true'></span>

[[fqok@0]]
@end

@rectQuizC: @rectQuizC_(@uid,@0,@1)

@rectQuizC_
<div id='fq-rect-wrap-@0' class='fq-widget' data-fq-kind='rect' data-fq-uid='@0'>
  <div id='fq-rect-host-@0' class='fq-widget' data-fq-kind='rect' data-fq-uid='@0'>
    <div id='fq-rect-mount-@0' class='fq-mount'></div>
    <div id='fq-rect-rows-wrap-@0' class='fq-range' data-label='rows'>
<input type='range' min='1' max='20' value='1' output='fq-r-rows-@0'>
    </div>
    <div id='fq-rect-cols-wrap-@0' class='fq-range' data-label='columns'>
<input type='range' min='1' max='20' value='1' output='fq-r-cols-@0'>
    </div>
  </div>
</div>
<script modify='false'>
const _api = window.__LIA_FRACTION_QUIZ__;
if (_api) _api.mountRect('@0', String.raw`@1`);
</script>
<span class='fq-native-quiz-source' data-fq-quiz='@0' data-fq-answer='fqok@0' aria-hidden='true'></span>

@2
[[fqok@0]]
@end
```
