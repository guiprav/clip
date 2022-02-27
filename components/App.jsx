import Crdt from 'crdt';
import d from '@dominant/core';
import qr from 'qr-image';
import ws from 'websocket-stream';
import { nanoid } from 'nanoid';

document.head.append(d.el('style', `
`));

let ls = localStorage;

class App {
  constructor() {
    window.app = this;

    this.did = ls.getItem('did');
    if (!this.did) { ls.setItem('did', this.did = nanoid()) }

    this.svg = qr.imageSync(this.did, { type: 'svg' });
    this.doc = new Crdt.Doc();
    this.docStream = this.doc.createStream();
    this.wss = ws('wss://protohub.guiprav.cc/crdt/clip/main');
    this.wss.pipe(this.docStream).pipe(this.wss);
    this.doc.on('row_update', () => d.update());
    this.uploads = new Set();
    this.owned = this.doc.createSeq('owner', this.did);
  }

  upload = (f, onProgress) => new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open('post', 'https://filet.guiprav.cc/clip/upload');

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState !== 4) { return }
      this.uploads.delete(xhr);

      if (xhr.status !== 200) {
        return reject(new Error(`HTTP response status: ${xhr.status}`));
      }

      resolve(JSON.parse(xhr.responseText));
    });

    onProgress && xhr.addEventListener(
      'progress', ev => ev.lengthMeasurable &&
      onProgress(f, Number((ev.loaded / ev.total).toFixed(2))),
    );

    let data = new FormData();
    data.append('file', f);
    xhr.send(data);
    this.uploads.add(xhr);
  });

  share(url) {
    this.doc.add({ type: 'file', owner: this.did, url });
  }

  render = () => (
    <div model={this} class="App">
      <div style={{ width: '20vw', margin: 'auto' }} innerHTML={this.svg} />
      {d.map(this.owned.asArray(), x => <div>{d.text(() => x.get('url'))}</div>)}
    </div>
  );
}

export default App;