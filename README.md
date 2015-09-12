# tmux-pane-stream
Easy streamin' to and fro' tmux panes

Writing to pane is implemented using `tmux send-keys`, reading from pane is implemented using `tmux pipe-pane` and a TCP socket connection. Thus, input piped **into** the pane is also visible coming **out** of the pane, and if you have a pipe set already for a pane, it'll be replaced by this tool due to tmux limitations.

## Installing
`npm install tmux-pane-stream`

## Example usage
In both examples, `targetPane` is the same kind of string `tmux` accepts for specifying `target-pane` via `-t` command-line flag.

### CLI
```sh
echo "echo hello!" | tmux-pane-stream targetPane
```

`tmux-pane-stream` is also aliased as `tmuxps`.

### Programmatic
```js
var TmuxPaneStream = require('tmux-pane-stream');

process.stdin
.pipe(new TmuxPaneStream(targetPane))
.pipe(process.stdout);
```

## License
The MIT License (MIT)

Copyright (c) 2015 Raymond Hammarling

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
