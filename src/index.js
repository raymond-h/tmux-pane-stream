import { spawn } from 'child_process';
import stream from 'stream';

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
