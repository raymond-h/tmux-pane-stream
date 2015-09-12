import { spawn } from 'child_process';
import net from 'net';
import stream from 'stream';

export class TmuxPaneReadable extends stream.Readable {
    constructor(targetPane) {
        super();
        this.targetPane = targetPane;

        this.server = net.createServer(::this.handleConnection);
        this.server.listen();

        const port = this.server.address().port;

        spawn('tmux', ['pipe-pane', '-t', this.targetPane,
            `node ${require.resolve('./pipe-pane-helper')} ${port}`
        ]);
    }

    _read() {
        // noop
    }

    handleConnection(c) {
        c.on('data', ::this.push);
    }
}

export class TmuxPaneWritable extends stream.Writable {
    constructor(targetPane) {
        super();
        this.targetPane = targetPane;
    }

    _write(chunk, encoding, done) {
        chunk = chunk.toString();

        const cp = spawn('tmux', ['send-keys', '-l', '-t', this.targetPane, chunk]);

        cp
        .once('exit', (code) => {
            if(code === 0) done();
        })
        .once('error', done);
    }
}
