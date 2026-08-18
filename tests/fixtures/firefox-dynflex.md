<!--
author: MINT-the-GAP
version: 1.0.0
language: de
mode: Textbook
comment: Browser-Regression für konfigurierte Bruchquizze innerhalb und außerhalb von DynFlex.

import: ../../README.md
import: https://raw.githubusercontent.com/MINT-the-GAP/lia-DynFlex/9ef8f05c0eae8b51e183efbfe34c5b38e41488c8/README.md
-->

# Firefox DynFlex Regression

Inline tally: @Strichliste(8)

| Party | Votes |
|:-----:|:------|
| A     | @Strichliste(17) |

<div data-regression-case="outside-circle">

@circleQuizC(2/5,`<!-- data-solution-button="2" -->`)

</div>

<div data-regression-case="outside-rect">

@rectQuizC(3/4,`<!-- data-solution-button="2" -->`)

</div>

<section class="dynFlex" data-regression-scope="dynflex">

<div class="flex-child" data-regression-case="inside-circle">

@circleQuizC(2/5,`<!-- data-solution-button="2" -->`)

</div>

<div class="flex-child" data-regression-case="inside-rect">

@rectQuizC(3/4,`<!-- data-solution-button="2" -->`)

</div>

</section>
