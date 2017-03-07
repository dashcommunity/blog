### To do

**Bugs/Issues to fix**

Path cannot be empty (can't put files in root of repo)

Action button doesn't provide any feedback (fail/success)

CSS issues (sidebar spacing, font, etc)

[Links](http://www.wikipedia.com) (there's a link under "Links" there) don't show up in editor but they pass through to markdown (just another CSS issue, or something bigger?)

Highlight, ++underline++, and todo blocks [v] don't show up in markdown

Inline styling (**bold**, _italics_, etc) screw up if the styling extends into the spaces on either side, like **this **does.  When converted to markdown it adds meta characters

Local storage only saves sha of last loaded file,  and it overwrites it.  This causes problems when trying to save and overwrite fileB when fileA was the last thing loaded/saved (like when you load "file" then tweak some things, save it to "file.md" ), then try to save it to "file" as well for the non-markdown version.  Workaround is to give "file" then name "file2" instead

Empty new lines will throw the error: "Uncaught DOMException: Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range." when trying to convert to markdown.  **You can't have empty new lines**

**Features to add**

Some things I still need to do: 

Allow _any_ user to push and pull data to and from editor as long as they have proper permissions (they are part of the _bloggers_ group on dash community)

Basic form validation & error handling (with UI) 

**Other things to do**

Clean up UI (maybe just \`bootstrap\`)

See if Walker can load this remotely
