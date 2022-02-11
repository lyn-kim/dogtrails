---
name: Polish
about: Use this template for enhancing user experience of existing functionality.
title: "Polish"
---

## ✅ Task List

> ##### Commit checklist for tasks needed.

- [ ] Verify the consistency of the app's theme.
    - [ ] The `<title>` should fall in line with the site's overall purpose. `Final Project` is not specific enough.
    - [ ] If the site has a `favicon`, it should match the site's theme.
    - [ ] The site's brand (logo and/or text) should be visible and consistently placed on every page. Clicking the site's brand should navigate the user back to the home page.
    - [ ] A main heading (`<h1>`) should be visible near the top of every page. It should indicate which page the user is currently on. It should be consistently placed on every page (excluding the landing page, which may have it somewhere more prominent).
    - [ ] Site navigation links should be visible and consistently placed on every page of the site.
    - [ ] Every page of the site should use a consistent color pallette consisting of 2-5 colors (excluding images and videos). All text should either be light-text-on-dark-background or dark-text-on-light-background to keep text readable.
    - [ ] Check that every piece of the site is described obviously and accurately enough so a new user can figure out what it's for.
- [ ] Verify the site's HTML has good semantics. For any changes to the HTML structure, update the CSS as-needed to prevent the UI from breaking.
    - Each tabular list of things should be in a well-structured table (`<table>`).
    - Each non-tabular list of things (including, for example, site navigation or a grid of images) should be in a well-structured list (`<ul>` or `<ol>`).
    - Each input with special input restrictions should have an appropriate input type (`type="number"` for numbers, `type="email"` for emails, etc.).
    - Each clickable element that triggers a non-`GET` network request on a click should be a submit button (`type="submit"`) for a form (`<form>`).
    - Each clickable element that sets inputs back to their default state should be a reset button (`type="reset"`) for the form (`<form>`) containing those inputs.
    - Each clickable element that triggers navigation within the page or to another page/site should be an anchor tag (`<a>`).
    - Each clickable element that triggers other site functionality should be a normal button (`type="button"`).
    - Each image which is important to the content of the site (not just for visual appeal) should be an image tag (`<img>`).
- [ ] Verify the site's layout fits and effectively uses space on all commonly-used device sizes, including:
    - Wide-screen Desktop/Laptop (1920px-by-947px)
    - iPad (portrait and landscape)
    - iPhone X (portrait and landscape)
    - iPhone SE 2 (portrait and landscape), aka iPhone 6/7/8
- [ ] Verify that each interactive element on the site looks and feels interactive:
    - Links should be colored differently from surrounding text (if text is dark, the default blue usually works) to stand out. Hovering over a link should change the `cursor` to a `pointer`, and:
        - If the link only contains text (including font-based icons), either change the link's `color` or add/remove an `underline`.
        - If the link contains non-text content (such as an image), change the link's appearance in some way (`color`, `text-decoration`, `outline`, `box-shadow`, `background-color`, etc.). Make sure the link's overall size and position don't change.
    - Buttons should clearly stand out from the surrounding content, using a different `background-color` and/or a `border`. Hovering over a button should change the `cursor` to a `pointer` and change the button's appearance in some way (`color`, `text-decoration`, `outline`, `box-shadow`, `background-color`, etc.) without changing the button's overall size or position.
    - If a single link/button and a single input are associated with each other, while the user is `:focus`ed on the input, pressing Enter/Return should trigger the link/button.
- [ ] Verify that each API request (that isn't part of initial page load) handles network wait times and failures gracefully (test using inspector Network tab):
    - While an API call is in-progress, a loading message or animation should be displayed and related buttons should be disabled. When the API call stops (regardless of outcome), the loading message/spinner should disappear, and related buttons should re-enable (if they're still being displayed).
    - When a `GET` API call responds with an empty data set (no error), the client should display an appropriate message.
    - When an API call loses connection before completing, the client should let the user know there was a connection issue.
    - When an API call produces an error response, the client should communicate it to the user appropriately.
    - Regardless of the type of network failure, users should be able to easily retry the request without navigating back to the page or re-entering a bunch of form information.
- [ ] Verify that the following common issues are addressed:
    - Address any console errors (other than a missing `favicon`), if possible.
    - Ensure no images are stretched out of their natural aspect ratio, regardless of screen size.
    - API-generated lists/tables have a sort (of some...sort) applied to them to prevent records from shuffling around on re-render.
    - In tables, fixed-decimal columns (such as currencies) are right-aligned to keep decimal points aligned.
- [ ] For each page, run the automatic Accessibility tests (and only the those tests) in the [Lighthouse testing tool](https://developers.google.com/web/tools/lighthouse#devtools) on both Mobile and Desktop, fixing each issue that comes up. Re-run it until all issues are addressed.
