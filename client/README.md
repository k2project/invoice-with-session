

### FREE ONLINE PDF GENERATOR AND CMS



##### Tests to carry to handle unsaved changes with prompt:

There should be no prompt on:
1. updating the layout of details list,
2. no changes made in the submit form,
3. undoing chnages to the submit form to the initial state,
4. after form submition,
5. on reloading the page,
6. on represhing the page.

The prompt actions (block history):
A.DISCHARGING THE CHANGES:
1.redirect to the targeted path with window.location.replace (reloading clears the changes)
B.RETURNING TO THE FORM:
1.unblock history so the prompt is active

